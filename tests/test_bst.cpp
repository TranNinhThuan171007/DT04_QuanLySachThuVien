
#include "../src/bst/BST.h"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    BSTNode* root = nullptr;

    Book b1{"9780003", "Lap trinh C++", "Nguyen An",
            "NXB Tre", 2024, "Cong nghe"};
    Book b2{"9780001", "Cau truc du lieu", "Tran Binh",
            "NXB Giao Duc", 2023, "Giao trinh"};
    Book b3{"9780002", "Hoc C++ co ban", "Nguyen An",
            "NXB Kim Dong", 2022, "Cong nghe"};

    // 1. Them sach
    assert(insert(root, b1));
    assert(insert(root, b2));
    assert(insert(root, b3));
    std::cout << "PASS: Them 3 sach\n";

    // 2. Tu choi ISBN trung
    assert(!insert(root, b1));
    std::cout << "PASS: Khong them ISBN trung\n";

    // 3. Tim theo ISBN
    BSTNode* found = search(root, "9780002");
    assert(found != nullptr);
    assert(found->data.title == "Hoc C++ co ban");
    assert(search(root, "0000000") == nullptr);
    std::cout << "PASS: Tim sach theo ISBN\n";

    // 4. Tim theo ten sach
    std::vector<Book> results;
    searchByTitle(root, "C++", results);
    assert(results.size() == 2);
    std::cout << "PASS: Tim theo ten sach\n";

    // 5. Tim ten sach khong phan biet hoa thuong
    results.clear();
    searchByTitle(root, "lap trinh c++", results);
    assert(results.size() == 1);
    assert(results[0].isbn == "9780003");
    std::cout << "PASS: Tim ten sach khong phan biet hoa thuong\n";

    // 6. Tim theo tac gia
    results.clear();
    searchByAuthor(root, "Nguyen An", results);
    assert(results.size() == 2);
    std::cout << "PASS: Tim theo tac gia\n";

    // 7. Tim tac gia khong phan biet hoa thuong
    results.clear();
    searchByAuthor(root, "nguyen an", results);
    assert(results.size() == 2);
    std::cout << "PASS: Tim tac gia khong phan biet hoa thuong\n";

    // 8. Cap nhat thong tin
    Book updated{"9780002", "C++ nang cao", "Nguyen An",
                 "NXB Moi", 2025, "Cong nghe"};
    assert(updateBook(root, "9780002", updated));
    assert(search(root, "9780002")->data.title == "C++ nang cao");
    assert(!updateBook(root, "9999999", updated));
    std::cout << "PASS: Cap nhat sach\n";

    // 9. Xoa sach
    root = deleteBook(root, "9780001");
    assert(search(root, "9780001") == nullptr);
    assert(search(root, "9780002") != nullptr);
    std::cout << "PASS: Xoa sach\n";

    // 10. Duyet LNR
    std::cout << "\nDanh sach theo ISBN tang dan:\n";
    inorder(root);

    // Du lieu rieng cho cac test xoa
    BSTNode* testRoot = nullptr;
    Book t1{"2", "Sach 2", "Tac gia A", "NXB A", 2024, "CNTT"};
    Book t2{"1", "Sach 1", "Tac gia B", "NXB B", 2023, "CNTT"};
    Book t3{"3", "Sach 3", "Tac gia C", "NXB C", 2022, "CNTT"};

    // 11. Xoa nut la
    assert(insert(testRoot, t1));
    assert(insert(testRoot, t2));
    assert(insert(testRoot, t3));
    testRoot = deleteBook(testRoot, "1");
    assert(search(testRoot, "1") == nullptr);
    assert(search(testRoot, "2") != nullptr);
    assert(search(testRoot, "3") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut la\n";

    // 12. Xoa nut co mot con
    assert(insert(testRoot, t1));
    assert(insert(testRoot, t2));
    testRoot = deleteBook(testRoot, "1");
    assert(search(testRoot, "1") == nullptr);
    assert(search(testRoot, "2") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut co mot con\n";

    // 13. Xoa nut co hai con
    assert(insert(testRoot, t1));
    assert(insert(testRoot, t2));
    assert(insert(testRoot, t3));
    testRoot = deleteBook(testRoot, "2");
    assert(search(testRoot, "2") == nullptr);
    assert(search(testRoot, "1") != nullptr);
    assert(search(testRoot, "3") != nullptr);
    destroyTree(testRoot);
    testRoot = nullptr;
    std::cout << "PASS: Xoa nut co hai con\n";

    // 14. Tu choi sach khong co ISBN
    Book invalidBook{"", "Sach loi", "Nguyen An",
                     "NXB Tre", 2024, "Cong nghe"};
    assert(!isValidBook(invalidBook));
    assert(!insert(root, invalidBook));
    std::cout << "PASS: Tu choi sach khong co ISBN\n";

    // 15. Tu choi nam xuat ban khong hop le
    Book invalidYearBook{"9789999", "Sach loi", "Nguyen An",
                         "NXB Tre", 0, "Cong nghe"};
    assert(!isValidBook(invalidYearBook));
    assert(!insert(root, invalidYearBook));
    std::cout << "PASS: Tu choi nam xuat ban khong hop le\n";

    // 16. Xoa tren cay rong
    testRoot = deleteBook(testRoot, "999");
    assert(testRoot == nullptr);
    std::cout << "PASS: Xoa tren cay rong\n";

    // Giai phong bo nho
    destroyTree(root);
    root = nullptr;
    std::cout << "\nPASS: Giai phong BST\n";
    std::cout << "\nTAT CA KIEM THU DA THANH CONG!\n";

    return 0;
}
