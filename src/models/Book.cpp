#include "Book.h"

#include <iostream>
#include <string>

bool isValidBook(const Book& book) {
    return !book.isbn.empty()
        && !book.title.empty()
        && !book.author.empty()
        && !book.publisher.empty()
        && book.year > 0
        && !book.genre.empty();
}

void printBookInfo(const Book& book) {
    std::cout << "ISBN: " << book.isbn
              << " | Ten sach: " << book.title
              << " | Tac gia: " << book.author
              << " | Nha xuat ban: " << book.publisher
              << " | Nam xuat ban: " << book.year
              << " | The loai: " << book.genre
              << '\n';
}