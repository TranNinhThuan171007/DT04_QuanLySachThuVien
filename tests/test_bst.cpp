
#include "../src/bst/BST.h"
#include <stdexcept>
#include <iostream>
#include <vector>
#include <string>

#define REQUIRE(condition) do { if (!(condition)) throw std::runtime_error("Test failed: " #condition); } while (false)

int main() {
    BSTNode* root = nullptr;

    Book b1{"9780306406157", "Lap trinh C++", "Nguyen An",
            "NXB Tre", 2024, "Cong nghe"};
    Book b2{"9780131103627", "Cấu trúc dữ liệu", "Trần Bình",
            "NXB Giao Duc", 2023, "Giao trinh"};
    Book b3{"9780201633610", "Hoc C++ co ban", "Nguyen An",
            "NXB Kim Dong", 2022, "Cong nghe"};

    // 1. Them sach
    REQUIRE(insert(root, b1));
    REQUIRE(insert(root, b2));
    REQUIRE(insert(root, b3));
    std::cout << "PASS: Them 3 sach\n";

    // 2. Tu choi ISBN trung
    REQUIRE(!insert(root, b1));
    Book sameBookWithISBN10{"0-13-110362-8", "C language", "Kernighan", "Prentice Hall", 1988, "CNTT"};
    REQUIRE(!insert(root, sameBookWithISBN10));
    REQUIRE(search(root, "0131103628") == search(root, "9780131103627"));
    std::cout << "PASS: Khong them ISBN trung\n";

    // 3. Tim theo ISBN
    BSTNode* found = search(root, "978-0-201-63361-0");
    REQUIRE(found != nullptr);
    REQUIRE(found->data.title == "Hoc C++ co ban");
    REQUIRE(search(root, "0000000") == nullptr);
    std::cout << "PASS: Tim sach theo ISBN\n";

    // 4. Tim theo ten sach
    std::vector<Book> results;
    searchByTitle(root, "C++", results);
    REQUIRE(results.size() == 2);
    std::cout << "PASS: Tim theo ten sach\n";

    // 5. Tim ten sach khong phan biet hoa thuong
    results.clear();
    searchByTitle(root, "lap trinh c++", results);
    REQUIRE(results.size() == 1);
    REQUIRE(results[0].isbn == "9780306406157");
    std::cout << "PASS: Tim ten sach khong phan biet hoa thuong\n";

    results.clear();
    searchByTitle(root, "CẤU TRÚC", results);
    REQUIRE(results.size() == 1);
    REQUIRE(results[0].isbn == "9780131103627");
    std::cout << "PASS: Tim ten tieng Viet co dau khong phan biet hoa thuong\n";

    // 6. Tim theo tac gia
    results.clear();
    searchByAuthor(root, "Nguyễn An", results);
    REQUIRE(results.size() == 2);
    std::cout << "PASS: Tim theo tac gia\n";

    // 7. Tim tac gia khong phan biet hoa thuong
    results.clear();
    searchByAuthor(root, "nguyễn an", results);
    REQUIRE(results.size() == 2);
    std::cout << "PASS: Tim tac gia khong phan biet hoa thuong\n";

    // 8. Cap nhat thong tin
    Book updated{"978-0-201-63361-0", "C++ nang cao", "Nguyen An",
                 "NXB Moi", 2025, "Cong nghe"};
    REQUIRE(updateBook(root, "9780201633610", updated));
    REQUIRE(search(root, "9780201633610")->data.title == "C++ nang cao");
    Book invalidUpdate{"9780201633610", "", "Nguyen An", "NXB Moi", 2025, "Cong nghe"};
    REQUIRE(!updateBook(root, "9780201633610", invalidUpdate));
    REQUIRE(!updateBook(root, "9999999", updated));
    std::cout << "PASS: Cap nhat sach\n";

    // 9. Xoa sach
    root = deleteBook(root, "978-0-131-10362-7");
    REQUIRE(search(root, "9780131103627") == nullptr);
    REQUIRE(search(root, "9780201633610") != nullptr);
    std::cout << "PASS: Xoa sach\n";

    // 10. Duyet LNR
    std::cout << "\nDanh sach theo ISBN tang dan:\n";
    inorder(root);

    // Du lieu rieng cho cac test xoa
    BSTNode* testRoot = nullptr;
    Book t1{"9780201633610", "Sach giua", "Tac gia A", "NXB A", 2024, "CNTT"};
    Book t2{"9780131103627", "Sach nho", "Tac gia B", "NXB B", 2023, "CNTT"};
    Book t3{"9780306406157", "Sach lon", "Tac gia C", "NXB C", 2022, "CNTT"};

    // 11. Xoa nut la
    REQUIRE(insert(testRoot, t1));
    REQUIRE(insert(testRoot, t2));
    REQUIRE(insert(testRoot, t3));
    testRoot = deleteBook(testRoot, "9780306406157");
    REQUIRE(search(testRoot, "9780306406157") == nullptr);
    REQUIRE(search(testRoot, "9780201633610") != nullptr);
    REQUIRE(search(testRoot, "9780131103627") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut la\n";

    // 12. Xoa nut co mot con
    REQUIRE(insert(testRoot, t1));
    REQUIRE(insert(testRoot, t2));
    testRoot = deleteBook(testRoot, "9780201633610");
    REQUIRE(search(testRoot, "9780201633610") == nullptr);
    REQUIRE(search(testRoot, "9780131103627") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut co mot con\n";

    // 13. Xoa nut co hai con
    REQUIRE(insert(testRoot, t1));
    REQUIRE(insert(testRoot, t2));
    REQUIRE(insert(testRoot, t3));
    testRoot = deleteBook(testRoot, "9780201633610");
    REQUIRE(search(testRoot, "9780201633610") == nullptr);
    REQUIRE(search(testRoot, "9780131103627") != nullptr);
    REQUIRE(search(testRoot, "9780306406157") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut co hai con\n";

    // 14. Tu choi sach khong co ISBN
    Book invalidBook{"", "Sach loi", "Nguyen An",
                     "NXB Tre", 2024, "Cong nghe"};
    REQUIRE(!isValidBook(invalidBook));
    REQUIRE(!insert(root, invalidBook));
    std::cout << "PASS: Tu choi sach khong co ISBN\n";

    // 15. Tu choi nam xuat ban khong hop le
    Book invalidYearBook{"9780306406157", "Sach loi", "Nguyen An",
                         "NXB Tre", 0, "Cong nghe"};
    REQUIRE(!isValidBook(invalidYearBook));
    REQUIRE(!insert(root, invalidYearBook));
    std::cout << "PASS: Tu choi nam xuat ban khong hop le\n";

    // 16. Xoa tren cay rong
    testRoot = deleteBook(testRoot, "999");
    REQUIRE(testRoot == nullptr);
    std::cout << "PASS: Xoa tren cay rong\n";

    // Giai phong bo nho
    destroyTree(root);
    root = nullptr;
    std::cout << "\nPASS: Giai phong BST\n";
    std::cout << "\nTAT CA KIEM THU DA THANH CONG!\n";

    return 0;
}
