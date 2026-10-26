#include "bst/BST.h"
#include "storage/FileStorage.h"
#include "ui/Menu.h"

#include <filesystem>
#include <iostream>
#include <cstdlib>
#include <system_error>

#ifdef _WIN32
#include <windows.h>
#endif

namespace {
void configureConsoleUtf8() {
#ifdef _WIN32
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
#endif
}

struct TreeCleanup {
    BSTNode*& root;
    ~TreeCleanup() { destroyTree(root); }
};
}

int main(int argc, char* argv[]) {
    configureConsoleUtf8();
    const std::filesystem::path dataFile = argc > 1
        ? std::filesystem::path(argv[1])
        : std::filesystem::path("data/sample/books.csv");

    BSTNode* root = nullptr;
    TreeCleanup cleanup{root};

    std::cout << "QUẢN LÝ DANH MỤC SÁCH THƯ VIỆN\n"
              << "Tệp dữ liệu: " << dataFile.string() << '\n';
    const BookLoadResult loaded = loadBooksCSV(dataFile);
    if (!loaded.opened) {
        for (const auto& error : loaded.errors) std::cerr << "CSV: " << error << '\n';
        std::error_code pathError;
        const bool pathExists = std::filesystem::exists(dataFile, pathError);
        if (pathExists || pathError) {
            std::cerr << "Không đọc được tệp dữ liệu hiện có; dừng để tránh ghi đè.\n";
            return EXIT_FAILURE;
        }
        std::cerr << "Chưa nạp được dữ liệu. Chương trình sẽ mở danh mục trống; "
                  << "tệp sẽ được tạo khi lưu thành công.\n";
    }
    if (loaded.opened && !loaded.errors.empty()) {
        for (const auto& error : loaded.errors) std::cerr << "CSV: " << error << '\n';
        std::cerr << "Không mở danh mục có lỗi để tránh ghi đè tệp gốc. "
                  << "Hãy sửa CSV hoặc truyền đường dẫn đến tệp khác.\n";
        return EXIT_FAILURE;
    }
    for (const auto& book : loaded.books) {
        if (!insert(root, book)) {
            std::cerr << "Bỏ qua sách không hợp lệ hoặc ISBN trùng: " << book.isbn << '\n';
        }
    }
    std::cout << "Đã nạp " << getBooksInOrder(root).size() << " đầu sách.\n";

    runMenu(root, dataFile);
    return 0;
}
