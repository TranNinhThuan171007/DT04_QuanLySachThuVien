cmake_minimum_required(VERSION 3.16)
project(QuanLySachThuVien LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_library(library_core
    src/models/Book.cpp
    src/bst/BST.cpp
    src/storage/FileStorage.cpp
    src/ui/Menu.cpp
)
target_include_directories(library_core PUBLIC src)

add_executable(library_app src/main.cpp)
target_link_libraries(library_app PRIVATE library_core)

if(MSVC)
    target_compile_options(library_core PRIVATE /W4 /utf-8)
    target_compile_options(library_app PRIVATE /W4 /utf-8)
else()
    target_compile_options(library_core PRIVATE -Wall -Wextra -Wpedantic)
    target_compile_options(library_app PRIVATE -Wall -Wextra -Wpedantic)
endif()

include(CTest)
if(BUILD_TESTING)
    add_executable(test_bst tests/test_bst.cpp)
    target_link_libraries(test_bst PRIVATE library_core)
    add_test(NAME bst COMMAND test_bst)

    add_executable(test_storage tests/test_storage.cpp)
    target_link_libraries(test_storage PRIVATE library_core)
    add_test(NAME storage COMMAND test_storage)
endif()
