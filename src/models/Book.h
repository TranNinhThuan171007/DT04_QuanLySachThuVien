
#ifndef BOOK_H
#define BOOK_H

#include <string>

struct Book {
    std::string isbn;
    std::string title;
    std::string author;
    std::string publisher;
    int year;
    std::string genre;
};

// Kiem tra thong tin sach co hop le khong.
bool isValidBook(const Book& book);

// In day du thong tin sach.
void printBookInfo(const Book& book);

#endif
