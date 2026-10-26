#include "Menu.h"

#include "../storage/FileStorage.h"

#include <charconv>
#include <iostream>
#include <string>
#include <system_error>

namespace {
bool readLine(const std::string& prompt, std::string& value) {
    std::cout << prompt;
    if (!std::getline(std::cin, value)) return false;
    return true;
}

bool readYear(const std::string& prompt, int& year) {
    while (true) {
        std::string value;
        if (!readLine(prompt, value)) return false;
        const char* begin = value.data();
        const char* end = begin + value.size();
        const auto parsed = std::from_chars(begin, end, year);
        if (parsed.ec == std::errc{} && parsed.ptr == end && year > 0) return true;
        std::cout << "Năm xuất bản phải là số nguyên dương. Thử lại.\n";
    }
}

bool readBook(Book& book, bool includeISBN) {
    if (includeISBN && !readLine("ISBN: ", book.isbn)) return false;
    if (!readLine("Tên sách: ", book.title)) return false;
    if (!readLine("Tác giả: ", book.author)) return false;
    if (!readLine("Nhà xuất bản: ", book.publisher)) return false;
    if (!readYear("Năm xuất bản: ", book.year)) return false;
    return readLine("Thể loại: ", book.genre);
}

void showBooks(const std::vector<Book>& books) {
    if (books.empty()) {
        std::cout << "Không tìm thấy sách.\n";
        return;
    }
    for (std::size_t i = 0; i < books.size(); ++i) {
        std::cout << i + 1 << ". ";
        printBook(books[i]);
    }
}

bool persist(BSTNode* root, const std::filesystem::path& dataFile) {
    std::string error;
    if (saveBooksCSV(dataFile, getBooksInOrder(root), error)) {
        std::cout << "Đã lưu " << dataFile.string() << ".\n";
        return true;
    }
    std::cerr << "Không lưu được dữ liệu: " << error << '\n';
    return false;
}

bool chooseDelete(BSTNode*& root, const std::vector<Book>& matches,
                  const std::filesystem::path& dataFile) {
    if (matches.empty()) return false;
    std::string isbn;
    if (!readLine("Nhập ISBN của sách cần xóa (Enter để bỏ qua): ", isbn)) return false;
    if (isbn.empty()) return true;
    const auto selected = search(root, isbn);
    if (!selected) {
        std::cout << "ISBN không có trong cây.\n";
        return true;
    }
    bool isMatch = false;
    for (const auto& match : matches) {
        if (match.isbn == selected->data.isbn) isMatch = true;
    }
    if (!isMatch) {
        std::cout << "ISBN này không nằm trong kết quả vừa tìm.\n";
        return true;
    }
    const Book oldBook = selected->data;
    root = deleteBook(root, oldBook.isbn);
    if (!persist(root, dataFile)) insert(root, oldBook);
    return true;
}

void printMenu() {
    std::cout << "\n===== QUẢN LÝ DANH MỤC SÁCH =====\n"
              << "1. Xem danh mục (LNR)\n"
              << "2. Tìm theo ISBN\n"
              << "3. Tìm theo tên sách hoặc tác giả\n"
              << "4. Thêm sách\n"
              << "5. Cập nhật sách\n"
              << "6. Xóa theo ISBN\n"
              << "7. Xem các thứ tự duyệt cây\n"
              << "8. Lưu dữ liệu\n"
              << "0. Lưu và thoát\n";
}
}

void runMenu(BSTNode*& root, const std::filesystem::path& dataFile) {
    while (true) {
        printMenu();
        std::string choice;
        if (!readLine("Chọn chức năng: ", choice)) break;

        if (choice == "0") break;
        if (choice == "1") {
            showBooks(getBooksInOrder(root));
        } else if (choice == "2") {
            std::string isbn;
            if (!readLine("ISBN cần tìm: ", isbn)) break;
            const auto* found = search(root, isbn);
            if (found) printBook(found->data);
            else std::cout << "Không tìm thấy sách có ISBN đó.\n";
        } else if (choice == "3") {
            std::string field;
            if (!readLine("Tìm theo (1) tên sách hay (2) tác giả? ", field)) break;
            std::string query;
            if (!readLine("Từ khóa: ", query)) break;
            std::vector<Book> matches;
            if (field == "1") searchByTitle(root, query, matches);
            else if (field == "2") searchByAuthor(root, query, matches);
            else {
                std::cout << "Chọn 1 hoặc 2.\n";
                continue;
            }
            showBooks(matches);
            if (!matches.empty()) chooseDelete(root, matches, dataFile);
        } else if (choice == "4") {
            Book book{};
            if (!readBook(book, true)) break;
            book.isbn = normalizeISBN(book.isbn);
            if (!isValidBook(book)) {
                std::cout << "Thông tin không hợp lệ; kiểm tra ISBN, trường bắt buộc và năm xuất bản.\n";
                continue;
            }
            if (!insert(root, book)) {
                std::cout << "ISBN đã có trong danh mục.\n";
                continue;
            }
            if (!persist(root, dataFile)) root = deleteBook(root, book.isbn);
        } else if (choice == "5") {
            std::string isbn;
            if (!readLine("ISBN sách cần cập nhật: ", isbn)) break;
            auto* found = search(root, isbn);
            if (!found) {
                std::cout << "Không tìm thấy sách có ISBN đó.\n";
                continue;
            }
            Book updated = found->data;
            std::cout << "Nhập thông tin mới (ISBN được giữ nguyên).\n";
            if (!readBook(updated, false)) break;
            const Book oldBook = found->data;
            if (!updateBook(root, oldBook.isbn, updated)) {
                std::cout << "Thông tin mới không hợp lệ.\n";
                continue;
            }
            if (!persist(root, dataFile)) updateBook(root, oldBook.isbn, oldBook);
        } else if (choice == "6") {
            std::string isbn;
            if (!readLine("ISBN sách cần xóa: ", isbn)) break;
            auto* found = search(root, isbn);
            if (!found) {
                std::cout << "Không tìm thấy sách có ISBN đó.\n";
                continue;
            }
            const Book oldBook = found->data;
            root = deleteBook(root, oldBook.isbn);
            if (!persist(root, dataFile)) insert(root, oldBook);
        } else if (choice == "7") {
            std::cout << "NLR:\n"; preorder(root);
            std::cout << "LNR:\n"; inorder(root);
            std::cout << "LRN:\n"; postorder(root);
        } else if (choice == "8") {
            persist(root, dataFile);
        } else {
            std::cout << "Chức năng không hợp lệ. Chọn lại.\n";
        }
    }
    persist(root, dataFile);
    std::cout << "Đã kết thúc chương trình.\n";
}
