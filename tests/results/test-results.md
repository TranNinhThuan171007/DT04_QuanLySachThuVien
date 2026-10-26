# KẾT QUẢ KIỂM THỬ — QUẢN LÝ SÁCH THƯ VIỆN

- Người thực hiện: Phạm Đức Cường (M5)
- Ngày kiểm tra: 26/10/2026
- Mã nguồn: working tree sau `5afab23` (chưa commit)
- Môi trường biên dịch: g++ 15.2.0, C++17, Windows
- Ghi chú: hai chương trình test biên dịch thành công; Windows Application Control chặn chạy file `.exe`, nên chưa có kết quả PASS/FAIL.

## 1. Bảng ghi nhận kết quả

| Mã test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Ghi chú |
|---|---|---|---|---|
| TC01 | Thêm sách thành công | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC02 | Không tạo sách trùng mã | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC03 | Tìm thấy đúng sách | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC04 | Báo không tìm thấy sách | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC05 | Duyệt inorder đúng thứ tự | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC06 | Xóa nút lá đúng | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC07 | Xóa nút có một con đúng | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC08 | Xóa nút có hai con đúng | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC09 | Xử lý cây rỗng an toàn | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC10 | Hiển thị thông tin sách đúng | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC11 | CSV giữ nguyên dấu phẩy và ngoặc kép | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC12 | CSV sai không làm mất tệp dữ liệu gốc | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC13 | ISBN-10 tương đương không tạo khóa trùng | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC14 | Tìm chữ tiếng Việt có dấu không phân biệt hoa thường | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |
| TC15 | Từ chối lưu ISBN-10/13 trùng và giữ tệp cũ | Chưa xác định | BLOCKED | Windows chặn chạy chương trình test |

## 2. Tổng kết

- Tổng số trường hợp: 15
- PASS: 0
- FAIL: 0
- BLOCKED: 15

## 3. Lỗi phát hiện

Chưa xác định do các test chưa thực thi được. Không thể kết luận chương trình không có lỗi.

## 4. Kết luận

Chạy lại các chương trình test trên môi trường cho phép thực thi binary, rồi thay `BLOCKED` bằng kết quả thực tế.
