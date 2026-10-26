#ifndef LIBRARY_MENU_H
#define LIBRARY_MENU_H

#include "../bst/BST.h"

#include <filesystem>

void runMenu(BSTNode*& root, const std::filesystem::path& dataFile);

#endif
