#ifndef BST_NODE_H
#define BST_NODE_H

#include "../models/Book.h"

struct BSTNode {
    Book data;
    BSTNode* left;
    BSTNode* right;

    explicit BSTNode(const Book& book)
        : data(book), left(nullptr), right(nullptr) {}
};

#endif
