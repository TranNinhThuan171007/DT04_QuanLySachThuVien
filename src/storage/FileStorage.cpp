#include "FileStorage.h"

#include <fstream>
#include <sstream>
#include <system_error>
#include <unordered_set>
#include <utility>

namespace {
struct CSVRecord {
    std::vector<std::string> fields;
    std::size_t line{};
};

bool parseCSV(const std::string& input, std::vector<CSVRecord>& records,
              std::string& error) {
    std::vector<std::string> fields;
    std::string field;
    bool quoted = false;
    bool quoteClosed = false;
    std::size_t line = 1;
    std::size_t recordLine = 1;

    auto finishRecord = [&]() {
        fields.push_back(field);
        field.clear();
        records.push_back({std::move(fields), recordLine});
        fields.clear();
        recordLine = line + 1;
        quoteClosed = false;
    };

    for (std::size_t i = 0; i < input.size(); ++i) {
        const char ch = input[i];
        if (quoted) {
            if (ch == '"') {
                if (i + 1 < input.size() && input[i + 1] == '"') {
                    field.push_back('"');
                    ++i;
                } else {
                    quoted = false;
                    quoteClosed = true;
                }
            } else {
                field.push_back(ch);
                if (ch == '\n') ++line;
            }
            continue;
        }

        if (quoteClosed) {
            if (ch == ' ' || ch == '\t') continue;
            if (ch != ',' && ch != '\r' && ch != '\n') {
                error = "Ký tự không hợp lệ sau dấu ngoặc kép ở dòng " + std::to_string(line);
                return false;
            }
        }

        if (ch == '"') {
            if (!field.empty()) {
                error = "Dấu ngoặc kép không hợp lệ ở dòng " + std::to_string(line);
                return false;
            }
            quoted = true;
            quoteClosed = false;
        } else if (ch == ',') {
            fields.push_back(field);
            field.clear();
            quoteClosed = false;
        } else if (ch == '\r' || ch == '\n') {
            if (ch == '\r' && i + 1 < input.size() && input[i + 1] == '\n') ++i;
            finishRecord();
            ++line;
        } else {
            field.push_back(ch);
        }
    }

    if (quoted) {
        error = "Tệp CSV có trường chưa đóng dấu ngoặc kép (bắt đầu ở dòng " +
                std::to_string(recordLine) + ")";
        return false;
    }
    if (!field.empty() || !fields.empty() || quoteClosed) finishRecord();
    return true;
}

std::string trim(std::string value) {
    const auto first = value.find_first_not_of(" \t\r\n");
    if (first == std::string::npos) return {};
    const auto last = value.find_last_not_of(" \t\r\n");
    return value.substr(first, last - first + 1);
}

std::string csvCell(const std::string& value) {
    if (value.find_first_of(",\"\r\n") == std::string::npos) return value;
    std::string escaped = "\"";
    for (char ch : value) {
        if (ch == '"') escaped.push_back('"');
        escaped.push_back(ch);
    }
    escaped.push_back('"');
    return escaped;
}

bool parseYear(const std::string& value, int& year) {
    std::istringstream input(trim(value));
    input >> year;
    return input && input.peek() == std::char_traits<char>::eof();
}
}

BookLoadResult loadBooksCSV(const std::filesystem::path& filePath) {
    BookLoadResult result;
    std::ifstream file(filePath, std::ios::binary);
    if (!file) {
        result.errors.push_back("Không mở được tệp: " + filePath.string());
        return result;
    }
    result.opened = true;

    std::ostringstream buffer;
    buffer << file.rdbuf();
    std::vector<CSVRecord> records;
    std::string parseError;
    if (!parseCSV(buffer.str(), records, parseError)) {
        result.errors.push_back(parseError);
        return result;
    }
    if (records.empty()) {
        result.errors.push_back("Tệp CSV đang trống.");
        return result;
    }

    auto header = records.front().fields;
    if (!header.empty() && header[0].size() >= 3 &&
        static_cast<unsigned char>(header[0][0]) == 0xEF &&
        static_cast<unsigned char>(header[0][1]) == 0xBB &&
        static_cast<unsigned char>(header[0][2]) == 0xBF) {
        header[0].erase(0, 3);
    }
    const std::vector<std::string> expected{
        "ISBN", "Title", "Author", "Publisher", "Year", "Genre"};
    if (header.size() != expected.size()) {
        result.errors.push_back("Header CSV cần đúng 6 cột: ISBN,Title,Author,Publisher,Year,Genre.");
        return result;
    }
    for (std::size_t i = 0; i < expected.size(); ++i) {
        if (trim(header[i]) != expected[i]) {
            result.errors.push_back("Header CSV không đúng định dạng tại cột " + std::to_string(i + 1) + ".");
            return result;
        }
    }

    std::unordered_set<std::string> seen;
    for (std::size_t i = 1; i < records.size(); ++i) {
        const auto& record = records[i];
        if (record.fields.size() == 1 && trim(record.fields[0]).empty()) continue;
        if (record.fields.size() != 6) {
            result.errors.push_back("Dòng " + std::to_string(record.line) + " cần đúng 6 cột.");
            continue;
        }
        Book book{
            normalizeISBN(trim(record.fields[0])),
            trim(record.fields[1]),
            trim(record.fields[2]),
            trim(record.fields[3]),
            0,
            trim(record.fields[5])};
        if (!parseYear(record.fields[4], book.year) || !isValidBook(book)) {
            result.errors.push_back("Dữ liệu sách không hợp lệ ở dòng " + std::to_string(record.line) + ".");
            continue;
        }
        if (!seen.insert(book.isbn).second) {
            result.errors.push_back("ISBN trùng ở dòng " + std::to_string(record.line) + ": " + book.isbn);
            continue;
        }
        result.books.push_back(std::move(book));
    }
    return result;
}

bool saveBooksCSV(const std::filesystem::path& filePath,
                  const std::vector<Book>& books,
                  std::string& errorMessage) {
    std::error_code ec;
    if (!filePath.parent_path().empty()) {
        std::filesystem::create_directories(filePath.parent_path(), ec);
        if (ec) {
            errorMessage = "Không tạo được thư mục lưu: " + ec.message();
            return false;
        }
    }

    auto temporaryPath = filePath;
    temporaryPath += ".tmp";
    {
        std::ofstream file(temporaryPath, std::ios::binary | std::ios::trunc);
        if (!file) {
            errorMessage = "Không tạo được tệp tạm để lưu: " + temporaryPath.string();
            return false;
        }
        file << "ISBN,Title,Author,Publisher,Year,Genre\r\n";
        std::unordered_set<std::string> seen;
        for (const auto& book : books) {
            const std::string isbn = normalizeISBN(book.isbn);
            if (!isValidBook(book) || !seen.insert(isbn).second) {
                errorMessage = "Không lưu được: danh sách có bản ghi không hợp lệ hoặc ISBN trùng.";
                file.close();
                std::filesystem::remove(temporaryPath, ec);
                return false;
            }
            file << csvCell(isbn) << ','
                 << csvCell(book.title) << ',' << csvCell(book.author) << ','
                 << csvCell(book.publisher) << ',' << book.year << ','
                 << csvCell(book.genre) << "\r\n";
        }
        file.flush();
        if (!file) {
            errorMessage = "Lỗi khi ghi dữ liệu vào tệp tạm.";
            file.close();
            std::filesystem::remove(temporaryPath, ec);
            return false;
        }
    }

    const auto backupPath = std::filesystem::path(filePath.string() + ".bak");
    const bool hadOriginal = std::filesystem::exists(filePath, ec) && !ec;
    if (hadOriginal) {
        std::filesystem::remove(backupPath, ec);
        ec.clear();
        std::filesystem::rename(filePath, backupPath, ec);
        if (ec) {
            errorMessage = "Không thể tạo bản sao lưu trước khi thay tệp: " + ec.message();
            std::filesystem::remove(temporaryPath, ec);
            return false;
        }
    }

    std::filesystem::rename(temporaryPath, filePath, ec);
    if (ec) {
        errorMessage = "Không thể thay tệp dữ liệu: " + ec.message();
        if (hadOriginal) {
            std::error_code restoreError;
            std::filesystem::rename(backupPath, filePath, restoreError);
            if (restoreError) errorMessage += " Bản cũ còn tại " + backupPath.string() + ".";
        }
        std::filesystem::remove(temporaryPath, ec);
        return false;
    }
    if (hadOriginal) std::filesystem::remove(backupPath, ec);
    errorMessage.clear();
    return true;
}
