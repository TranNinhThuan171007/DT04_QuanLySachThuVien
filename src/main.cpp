/**
 * @file main.cpp
 * @brief Điểm khởi nhập chương trình Quản lý danh mục sách thư viện (Đề tài 04)
 * @author Trần Ninh Thuận (M1 - Trưởng nhóm)
 * @date 2026-10-25
 * 
 * Học phần: Cấu trúc dữ liệu và Giải thuật (C++)
 * Nhóm thực hiện:
 *   - M1: Trần Ninh Thuận (Trưởng nhóm: Điều phối, kiến trúc, Chương 1 & LaTeX)
 *   - M2: Phan Thế Hiệp (BST, cấu trúc dữ liệu, thuật toán cây & Chương 2)
 *   - M3: Huỳnh Văn Lĩnh (Nghiệp vụ, menu console/CRUD & Chương 3)
 *   - M4: Lê Cường Bảo (Persistence, đọc/ghi tệp CSV & Chương 3)
 *   - M5: Phạm Đức Cường (Đảm bảo chất lượng, ca kiểm thử & Chương 4)
 */

#include <iostream>
#include <string>
#include <cstdlib>

#ifdef _WIN32
#include <windows.h>
#endif

// Khai báo placeholder cho các module (M2, M3, M4 sẽ hoàn thiện cài đặt)
// #include "models/Book.h"
// #include "bst/BST.h"
// #include "storage/FileStorage.h"
// #include "ui/Menu.h"

void configureConsoleUtf8() {
#ifdef _WIN32
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
#endif
}

void printBanner() {
    std::cout << "======================================================================\n";
    std::cout << "   TRƯỜNG ĐẠI HỌC - KHOA CÔNG NGHỆ THÔNG TIN                          \n";
    std::cout << "   BÀI TẬP LỚN: CẤU TRÚC DỮ LIỆU & GIẢI THUẬT (C++)                   \n";
    std::cout << "   ĐỀ TÀI 04: QUẢN LÝ DANH MỤC SÁCH THƯ VIỆN BẰNG CÂY NHỊ PHÂN (BST) \n";
    std::cout << "======================================================================\n";
    std::cout << " Thành viên nhóm 04:\n";
    std::cout << "   [M1] Trần Ninh Thuận (Trưởng nhóm - Kiến trúc & Điều phối)\n";
    std::cout << "   [M2] Phan Thế Hiệp   (Lõi BST & Thuật toán cây)\n";
    std::cout << "   [M3] Huỳnh Văn Lĩnh  (Nghiệp vụ ứng dụng & Giao diện Console)\n";
    std::cout << "   [M4] Lê Cường Bảo    (Lưu trữ tệp & Dữ liệu mẫu)\n";
    std::cout << "   [M5] Phạm Đức Cường  (Kiểm thử QA & Báo cáo thực nghiệm)\n";
    std::cout << "----------------------------------------------------------------------\n";
}

int main(int argc, char* argv[]) {
    configureConsoleUtf8();
    printBanner();

    std::cout << "[INFO] Khởi tạo kiến trúc hệ thống thành công.\n";
    std::cout << "[INFO] Cấu trúc module C++:\n";
    std::cout << "  - models/  : Mô hình dữ liệu Sách (Book)\n";
    std::cout << "  - bst/     : Cây nhị phân tìm kiếm theo ISBN (BST, BSTNode)\n";
    std::cout << "  - storage/ : Đọc/ghi dữ liệu tệp CSV bền vững (FileStorage)\n";
    std::cout << "  - ui/      : Giao diện dòng lệnh tương tác (Menu)\n\n";

    std::cout << "[INFO] Hệ thống đã sẵn sàng để tích hợp mã nguồn từ các thành viên M2, M3, M4.\n";
    std::cout << "[INFO] Sẵn sàng biên dịch và chạy thử.\n";

    return 0;
}
