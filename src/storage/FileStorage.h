#ifndef FILE_STORAGE_H
#define FILE_STORAGE_H

#include "../models/Book.h"

#include <filesystem>
#include <string>
#include <vector>

struct BookLoadResult {
    std::vector<Book> books;
    std::vector<std::string> errors;
    bool opened{};
};

BookLoadResult loadBooksCSV(const std::filesystem::path& filePath);
bool saveBooksCSV(const std::filesystem::path& filePath,
                  const std::vector<Book>& books,
                  std::string& errorMessage);

#endif
