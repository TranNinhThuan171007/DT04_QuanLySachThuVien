
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

#endif
