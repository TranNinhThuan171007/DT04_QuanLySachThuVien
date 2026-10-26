# KẾ HOẠCH KIỂM THỬ HỆ THỐNG QUẢN LÝ SÁCH THƯ VIỆN

- Người phụ trách: Phạm Đức Cường (M5)
- Hạng mục: QA / Testing
- Cấu trúc dữ liệu: Binary Search Tree (BST)
- Nhánh Git: test/quality-assurance

## 1. Mục tiêu
- Kiểm tra các chức năng quản lý danh mục sách.
- Kiểm tra thao tác thêm, tìm kiếm, xóa và duyệt BST.
- Kiểm tra các trường hợp dữ liệu đặc biệt.
- Ghi nhận kết quả thực tế và so sánh với kết quả mong đợi.

## 2. Danh sách trường hợp kiểm thử

| Mã | Chức năng | Dữ liệu kiểm thử | Kết quả mong đợi |
|---|---|---|---|
| TC01 | Thêm sách | Thêm sách có mã mới | Sách được thêm thành công |
| TC02 | Thêm trùng mã | Thêm mã sách đã tồn tại | Không tạo sách trùng mã |
| TC03 | Tìm kiếm | Tìm mã tồn tại | Tìm thấy đúng sách |
| TC04 | Tìm kiếm | Tìm mã không tồn tại | Thông báo không tìm thấy |
| TC05 | Duyệt inorder | Thêm nhiều mã sách | Mã tăng dần nếu BST sắp xếp theo mã |
| TC06 | Xóa nút lá | Xóa sách ở nút lá | Sách bị xóa |
| TC07 | Xóa nút một con | Xóa sách có một con | BST vẫn hợp lệ |
| TC08 | Xóa nút hai con | Xóa sách có hai con | BST vẫn hợp lệ |
| TC09 | Cây rỗng | Tìm kiếm hoặc duyệt cây rỗng | Chương trình xử lý an toàn |
| TC10 | Hiển thị | Hiển thị danh mục sách | Thông tin được hiển thị chính xác |

## 3. Quy trình kiểm thử
1. Chuẩn bị dữ liệu đầu vào.
2. Thực hiện chức năng cần kiểm tra.
3. Ghi nhận kết quả thực tế.
4. So sánh với kết quả mong đợi.
5. Đánh dấu PASS, FAIL hoặc NOT RUN.
6. Ghi chú lỗi nếu có.

## 4. Quy ước kết quả
- PASS: Kết quả thực tế đúng như mong đợi.
- FAIL: Kết quả thực tế không đúng như mong đợi.
- NOT RUN: Chưa thực hiện kiểm thử.

## 5. Lưu ý
Đây là kế hoạch ban đầu. Cần đối chiếu các trường hợp với chức năng thực tế trong mã nguồn. Chỉ đánh dấu PASS sau khi đã chạy và xác nhận kết quả.
