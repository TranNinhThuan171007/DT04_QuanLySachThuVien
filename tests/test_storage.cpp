#include "../src/storage/FileStorage.h"

#include <chrono>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <stdexcept>

#define REQUIRE(condition) do { if (!(condition)) throw std::runtime_error("Test failed: " #condition); } while (false)

int main() {
    const auto nonce = std::chrono::steady_clock::now().time_since_epoch().count();
    const auto folder = std::filesystem::temp_directory_path() /
                        ("library-csv-test-" + std::to_string(nonce));
    const auto csvPath = folder / "books.csv";

    std::vector<Book> books{
        {"978-0-201-63361-0", "Mẫu, có dấu phẩy", "Tác giả \"A\"", "NXB Một", 2024, "CNTT"},
        {"9780131103627", "Sách tiếng Việt", "Tác giả B", "NXB Hai", 2023, "Cấu trúc dữ liệu"},
    };
    std::string error;
    REQUIRE(saveBooksCSV(csvPath, books, error));
    REQUIRE(error.empty());

    const BookLoadResult loaded = loadBooksCSV(csvPath);
    REQUIRE(loaded.opened);
    REQUIRE(loaded.errors.empty());
    REQUIRE(loaded.books.size() == 2);
    REQUIRE(loaded.books[0].isbn == "9780201633610");
    REQUIRE(loaded.books[0].title == "Mẫu, có dấu phẩy");
    REQUIRE(loaded.books[0].author == "Tác giả \"A\"");

    const std::vector<Book> duplicateBooks{
        books[0], {"0131103628", "Trùng ISBN", "Tác giả", "NXB", 2024, "CNTT"},
        {"9780131103627", "Cùng ISBN-13", "Tác giả", "NXB", 2024, "CNTT"}};
    REQUIRE(!saveBooksCSV(csvPath, duplicateBooks, error));
    REQUIRE(!error.empty());
    const BookLoadResult afterDuplicateSave = loadBooksCSV(csvPath);
    REQUIRE(afterDuplicateSave.errors.empty());
    REQUIRE(afterDuplicateSave.books.size() == 2);

    {
        std::ofstream malformed(csvPath, std::ios::binary | std::ios::trunc);
        malformed << "ISBN,Title,Author,Publisher,Year,Genre\n"
                  << "9780201633610,Valid,Author,Publisher,2024,Genre\n"
                  << "9780000000000,Invalid,Author,Publisher,2024,Genre\n";
    }
    const BookLoadResult partial = loadBooksCSV(csvPath);
    REQUIRE(partial.opened);
    REQUIRE(partial.books.size() == 1);
    REQUIRE(partial.errors.size() == 1);

    {
        std::ofstream malformed(csvPath, std::ios::binary | std::ios::trunc);
        malformed << "ISBN,Title,Author,Publisher,Year,Genre\n"
                  << "9780201633610,\"Unclosed,Author,Publisher,2024,Genre\n";
    }
    const BookLoadResult broken = loadBooksCSV(csvPath);
    REQUIRE(broken.opened);
    REQUIRE(broken.books.empty());
    REQUIRE(broken.errors.size() == 1);

    std::error_code cleanupError;
    std::filesystem::remove_all(folder, cleanupError);
    REQUIRE(!cleanupError);
    std::cout << "Storage checks completed.\n";
    return 0;
}
