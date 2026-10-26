
#include "../src/bst/BST.h"

#include <cassert>
#include <iostream>
#include <vector>

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

    // 5. Tim theo tac gia
    results.clear();
    searchByAuthor(root, "Nguyen An", results);
    assert(results.size() == 2);
    std::cout << "PASS: Tim theo tac gia\n";

    // 6. Cap nhat thong tin
    Book updated{"9780002", "C++ nang cao", "Nguyen An",
                 "NXB Moi", 2025, "Cong nghe"};
    assert(updateBook(root, "9780002", updated));
    assert(search(root, "9780002")->data.title == "C++ nang cao");
    assert(!updateBook(root, "9999999", updated));
    std::cout << "PASS: Cap nhat sach\n";

    // 7. Xoa sach
    root = deleteBook(root, "9780001");
    assert(search(root, "9780001") == nullptr);
    assert(search(root, "9780002") != nullptr);
    std::cout << "PASS: Xoa sach\n";

    // 8. Duyet LNR
    std::cout << "\nDanh sach theo ISBN tang dan:\n";
    inorder(root);

    destroyTree(root);
    root = nullptr;

    std::cout << "\nPASS: Giai phong BST\n";
    std::cout << "\nTAT CA KIEM THU DA THANH CONG!\n";

    return 0;
}
