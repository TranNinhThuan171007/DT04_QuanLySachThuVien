#include "BST.h"

#include <cstdint>
#include <iostream>
#include <string>

using namespace std;

// Chuyển chữ ASCII và chữ tiếng Việt UTF-8 sang chữ thường.
static string toLowerCase(string text) {
    string lowered;
    lowered.reserve(text.size());
    for (std::size_t i = 0; i < text.size();) {
        const auto first = static_cast<unsigned char>(text[i]);
        std::uint32_t codePoint = first;
        std::size_t width = 1;
        if ((first & 0xE0) == 0xC0 && i + 1 < text.size()) {
            codePoint = first & 0x1F;
            width = 2;
        } else if ((first & 0xF0) == 0xE0 && i + 2 < text.size()) {
            codePoint = first & 0x0F;
            width = 3;
        } else if (first >= 0xF0 && first <= 0xF4 && i + 3 < text.size()) {
            codePoint = first & 0x07;
            width = 4;
        }
        bool valid = width == 1 ? first < 0x80 : first >= 0xC2;
        for (std::size_t j = 1; valid && j < width; ++j) {
            const auto continuation = static_cast<unsigned char>(text[i + j]);
            if ((continuation & 0xC0) != 0x80) valid = false;
            else codePoint = (codePoint << 6) | (continuation & 0x3F);
        }
        if (valid && width == 3) {
            const auto second = static_cast<unsigned char>(text[i + 1]);
            if ((first == 0xE0 && second < 0xA0) ||
                (first == 0xED && second >= 0xA0)) valid = false;
        }
        if (valid && width == 4) {
            const auto second = static_cast<unsigned char>(text[i + 1]);
            if ((first == 0xF0 && second < 0x90) ||
                (first == 0xF4 && second > 0x8F)) valid = false;
        }
        if (!valid) {
            lowered.push_back(text[i++]);
            continue;
        }

        if ((codePoint >= 'A' && codePoint <= 'Z') ||
            (codePoint >= 0x00C0 && codePoint <= 0x00D6) ||
            (codePoint >= 0x00D8 && codePoint <= 0x00DE) ||
            codePoint == 0x0102 || codePoint == 0x0110 ||
            codePoint == 0x0128 || codePoint == 0x0168 ||
            codePoint == 0x01A0 || codePoint == 0x01AF ||
            (codePoint >= 0x1EA0 && codePoint <= 0x1EF8 && codePoint % 2 == 0)) {
            ++codePoint;
        }

        if (codePoint <= 0x7F) {
            lowered.push_back(static_cast<char>(codePoint));
        } else if (codePoint <= 0x7FF) {
            lowered.push_back(static_cast<char>(0xC0 | (codePoint >> 6)));
            lowered.push_back(static_cast<char>(0x80 | (codePoint & 0x3F)));
        } else if (codePoint <= 0xFFFF) {
            lowered.push_back(static_cast<char>(0xE0 | (codePoint >> 12)));
            lowered.push_back(static_cast<char>(0x80 | ((codePoint >> 6) & 0x3F)));
            lowered.push_back(static_cast<char>(0x80 | (codePoint & 0x3F)));
        } else {
            lowered.push_back(static_cast<char>(0xF0 | (codePoint >> 18)));
            lowered.push_back(static_cast<char>(0x80 | ((codePoint >> 12) & 0x3F)));
            lowered.push_back(static_cast<char>(0x80 | ((codePoint >> 6) & 0x3F)));
            lowered.push_back(static_cast<char>(0x80 | (codePoint & 0x3F)));
        }
        i += width;
    }
    return lowered;
}

static string trimQuery(string text) {
    const auto first = text.find_first_not_of(" \t\r\n");
    if (first == string::npos) return {};
    const auto last = text.find_last_not_of(" \t\r\n");
    return text.substr(first, last - first + 1);
}

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
    Book normalizedBook = book;
    normalizedBook.isbn = normalizeISBN(book.isbn);
    if (!isValidBook(normalizedBook)) {
        return false;
    }

    if (root == nullptr) {
        root = new BSTNode(normalizedBook);
        return true;
    }
    if (normalizedBook.isbn < root->data.isbn) {
        return insert(root->left, normalizedBook);
    }

    if (normalizedBook.isbn > root->data.isbn) {
        return insert(root->right, normalizedBook);
    }

    // ISBN da ton tai
    return false;
}

// Tim sach theo ISBN
BSTNode* search(BSTNode* root, const string& isbn) {
    const string key = normalizeISBN(isbn);
    while (root != nullptr && root->data.isbn != key) {
        root = key < root->data.isbn ? root->left : root->right;
    }
    return root;
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
    const string key = normalizeISBN(isbn);
    if (root == nullptr) {
        return nullptr;
    }

    if (key < root->data.isbn) {
        root->left = deleteBook(root->left, key);
    } else if (key > root->data.isbn) {
        root->right = deleteBook(root->right, key);
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

    Book normalizedUpdate = updatedBook;
    normalizedUpdate.isbn = normalizeISBN(updatedBook.isbn);
    if (node == nullptr || normalizedUpdate.isbn != node->data.isbn ||
        !isValidBook(normalizedUpdate)) {
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

static void collectInOrder(BSTNode* root, vector<Book>& books) {
    if (root == nullptr) return;
    collectInOrder(root->left, books);
    books.push_back(root->data);
    collectInOrder(root->right, books);
}

vector<Book> getBooksInOrder(BSTNode* root) {
    vector<Book> books;
    collectInOrder(root, books);
    return books;
}

static void collectByTitle(BSTNode* root, const string& lowerTitle,
                           vector<Book>& results) {
    if (root == nullptr) return;
    collectByTitle(root->left, lowerTitle, results);
    if (toLowerCase(root->data.title).find(lowerTitle) != string::npos)
        results.push_back(root->data);
    collectByTitle(root->right, lowerTitle, results);
}

// Tìm theo tên sách, không phân biệt hoa thường với chữ ASCII và tiếng Việt.
void searchByTitle(BSTNode* root, const string& title,
                   vector<Book>& results) {
    const string query = toLowerCase(trimQuery(title));
    if (!query.empty()) collectByTitle(root, query, results);
}

static void collectByAuthor(BSTNode* root, const string& lowerAuthor,
                            vector<Book>& results) {
    if (root == nullptr) return;
    collectByAuthor(root->left, lowerAuthor, results);
    if (toLowerCase(root->data.author).find(lowerAuthor) != string::npos)
        results.push_back(root->data);
    collectByAuthor(root->right, lowerAuthor, results);
}

// Tìm theo tác giả, không phân biệt hoa thường với chữ ASCII và tiếng Việt.
void searchByAuthor(BSTNode* root, const string& author,
                    vector<Book>& results) {
    const string query = toLowerCase(trimQuery(author));
    if (!query.empty()) collectByAuthor(root, query, results);
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
