# KẾT QUẢ KIỂM THỬ — QUẢN LÝ SÁCH THƯ VIỆN

- Người phụ trách QA: Phạm Đức Cường (M5)
- Người kiểm tra môi trường: Codex
- Ngày kiểm tra: 26/10/2026
- Mã nguồn: working tree sau `5afab23` (chưa commit)
- Môi trường biên dịch: g++ 15.2.0, C++17, Windows
- Ghi chú: hai chương trình test biên dịch thành công; Windows Application Control chặn chạy file `.exe`, nên chưa có kết quả PASS/FAIL.

## 1. Bảng ghi nhận kết quả

| Mã test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Ghi chú |
|---|---|---|---|---|
| TC01 | Thêm sách thành công | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC02 | Không tạo sách trùng mã | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC03 | Tìm thấy đúng sách | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC04 | Báo không tìm thấy sách | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC05 | Duyệt inorder đúng thứ tự | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC06 | Xóa nút lá đúng | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC07 | Xóa nút có một con đúng | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC08 | Xóa nút có hai con đúng | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC09 | Xử lý cây rỗng an toàn | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC10 | Hiển thị thông tin sách đúng | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC11 | CSV giữ nguyên dấu phẩy và ngoặc kép | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC12 | CSV sai không làm mất tệp dữ liệu gốc | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC13 | ISBN-10 tương đương không tạo khóa trùng | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC14 | Tìm chữ tiếng Việt có dấu không phân biệt hoa thường | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |
| TC15 | Từ chối lưu ISBN-10/13 trùng và giữ tệp cũ | Chưa xác định | SKIPPED | Không chạy test do Windows chặn thực thi chương trình |

## 2. Tổng kết

- Tổng số trường hợp: 15
- PASS: 0
- FAIL: 0
- SKIPPED: 15

## 3. Lỗi phát hiện

Chưa xác định do các test chưa thực thi được. Không thể kết luận chương trình không có lỗi.

## 4. Kết luận

Các test được bỏ qua trong lần kiểm tra này vì Windows chặn thực thi binary. Chạy lại trên môi trường cho phép thực thi để ghi nhận kết quả thực tế.
