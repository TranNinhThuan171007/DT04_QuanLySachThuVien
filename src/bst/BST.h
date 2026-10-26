
#ifndef BST_H
#define BST_H

#include "BSTNode.h"
#include <string>
#include <vector>

bool insert(BSTNode*& root, const Book& book);
BSTNode* search(BSTNode* root, const std::string& isbn);
BSTNode* findMin(BSTNode* root);
BSTNode* deleteBook(BSTNode* root, const std::string& isbn);
bool updateBook(BSTNode* root, const std::string& isbn,
                const Book& updatedBook);

void printBook(const Book& book);
void inorder(BSTNode* root);
void preorder(BSTNode* root);
void postorder(BSTNode* root);
std::vector<Book> getBooksInOrder(BSTNode* root);

void searchByTitle(BSTNode* root, const std::string& title,
                   std::vector<Book>& results);
void searchByAuthor(BSTNode* root, const std::string& author,
                    std::vector<Book>& results);

void destroyTree(BSTNode* root);

#endif
