
#include "BST.h"

#include <iostream>

using namespace std;

// In day du thong tin sach
void printBook(const Book& book) {
    cout << "ISBN: " << book.isbn
         << " | Ten: " << book.title
         << " | Tac gia: " << book.author
         << " | NXB: " << book.publisher
         << " | Nam: " << book.year
         << " | The loai: " << book.genre << '\n';
}

// Them sach; ISBN phai duy nhat
bool insert(BSTNode*& root, const Book& book) {
    if (root == nullptr) {
        root = new BSTNode(book);
        return true;
    }

    if (book.isbn < root->data.isbn) {
        return insert(root->left, book);
    }

    if (book.isbn > root->data.isbn) {
        return insert(root->right, book);
    }

    // ISBN da ton tai
    return false;
}

// Tim sach theo ISBN
BSTNode* search(BSTNode* root, const string& isbn) {
    if (root == nullptr || root->data.isbn == isbn) {
        return root;
    }

    if (isbn < root->data.isbn) {
        return search(root->left, isbn);
    }

    return search(root->right, isbn);
}

// Tim node co ISBN nho nhat trong cay con
BSTNode* findMin(BSTNode* root) {
    if (root == nullptr) {
        return nullptr;
    }

    while (root->left != nullptr) {
        root = root->left;
    }

    return root;
}

// Xoa sach theo ISBN
BSTNode* deleteBook(BSTNode* root, const string& isbn) {
    if (root == nullptr) {
        return nullptr;
    }

    if (isbn < root->data.isbn) {
        root->left = deleteBook(root->left, isbn);
    } else if (isbn > root->data.isbn) {
        root->right = deleteBook(root->right, isbn);
    } else {
        // Khong co con trai
        if (root->left == nullptr) {
            BSTNode* temp = root->right;
            delete root;
            return temp;
        }

        // Khong co con phai
        if (root->right == nullptr) {
            BSTNode* temp = root->left;
            delete root;
            return temp;
        }

        // Co hai con: thay bang node nho nhat ben phai
        BSTNode* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteBook(root->right, temp->data.isbn);
    }

    return root;
}

// Cap nhat thong tin sach, khong thay doi ISBN
bool updateBook(BSTNode* root, const string& isbn,
                const Book& updatedBook) {
    BSTNode* node = search(root, isbn);

    if (node == nullptr) {
        return false;
    }

    node->data.title = updatedBook.title;
    node->data.author = updatedBook.author;
    node->data.publisher = updatedBook.publisher;
    node->data.year = updatedBook.year;
    node->data.genre = updatedBook.genre;

    return true;
}

// Duyet LNR: ISBN tang dan
void inorder(BSTNode* root) {
    if (root == nullptr) {
        return;
    }

    inorder(root->left);
    printBook(root->data);
    inorder(root->right);
}

// Duyet NLR
void preorder(BSTNode* root) {
    if (root == nullptr) {
        return;
    }

    printBook(root->data);
    preorder(root->left);
    preorder(root->right);
}

// Duyet LRN
void postorder(BSTNode* root) {
    if (root == nullptr) {
        return;
    }

    postorder(root->left);
    postorder(root->right);
    printBook(root->data);
}

// Tim theo ten sach (khong phan biet chu hoa, chu thuong)

void searchByTitle(BSTNode* root, const string& title,
                   vector<Book>& results) {
    if (root == nullptr) return;

    searchByTitle(root->left, title, results);

    if (root->data.title.find(title) != string::npos) {
        results.push_back(root->data);
    }

    searchByTitle(root->right, title, results);
}


// Tim theo tac gia
void searchByAuthor(BSTNode* root, const string& author,
                    vector<Book>& results) {
    if (root == nullptr) {
        return;
    }

    searchByAuthor(root->left, author, results);

    if (root->data.author.find(author) != string::npos) {
        results.push_back(root->data);
    }

    searchByAuthor(root->right, author, results);
}

// Giai phong toan bo cay
void destroyTree(BSTNode* root) {
    if (root == nullptr) {
        return;
    }

    destroyTree(root->left);
    destroyTree(root->right);
    delete root;
}
