#include "Book.h"

#include <cctype>
#include <iostream>

namespace {
std::string stripISBN(const std::string& value) {
    std::string isbn;
    isbn.reserve(value.size());
    for (unsigned char ch : value) {
        if (std::isspace(ch) || ch == '-') continue;
        isbn.push_back(static_cast<char>(std::toupper(ch)));
    }
    return isbn;
}
}

std::string normalizeISBN(const std::string& value) {
    std::string isbn = stripISBN(value);
    if (isbn.size() == 10 && isValidISBN(isbn)) {
        const std::string isbn13 = "978" + isbn.substr(0, 9);
        int sum = 0;
        for (std::size_t i = 0; i < isbn13.size(); ++i) {
            sum += (isbn13[i] - '0') * (i % 2 == 0 ? 1 : 3);
        }
        isbn += static_cast<char>('0' + (10 - sum % 10) % 10);
        return isbn13 + isbn.back();
    }
    return isbn;
}

bool isValidISBN(const std::string& value) {
    const std::string isbn = stripISBN(value);
    if (isbn.size() == 13) {
        int sum = 0;
        for (std::size_t i = 0; i < 12; ++i) {
            if (!std::isdigit(static_cast<unsigned char>(isbn[i]))) return false;
            sum += (isbn[i] - '0') * (i % 2 == 0 ? 1 : 3);
        }
        return std::isdigit(static_cast<unsigned char>(isbn[12])) &&
               (10 - sum % 10) % 10 == isbn[12] - '0';
    }
    if (isbn.size() == 10) {
        int sum = 0;
        for (std::size_t i = 0; i < 9; ++i) {
            if (!std::isdigit(static_cast<unsigned char>(isbn[i]))) return false;
            sum += (isbn[i] - '0') * static_cast<int>(10 - i);
        }
        const char check = isbn[9];
        if (!(std::isdigit(static_cast<unsigned char>(check)) || check == 'X')) return false;
        sum += check == 'X' ? 10 : check - '0';
        return sum % 11 == 0;
    }
    return false;
}

bool isValidBook(const Book& book) {
    return isValidISBN(book.isbn)
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
              << " | NXB: " << book.publisher
              << " | Nam: " << book.year
              << " | The loai: " << book.genre
              << '\n';
}
