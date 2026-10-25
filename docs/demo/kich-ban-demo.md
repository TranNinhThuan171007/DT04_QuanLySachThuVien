# Kịch bản demo

Chạy trên bản build sạch và dữ liệu trong data/sample/.

1. Khởi động, nạp dữ liệu mẫu, hiển thị số bản ghi.
2. Thêm ISBN mới; thử thêm lại ISBN đó để chứng minh tính duy nhất.
3. Tìm ISBN có tồn tại và không tồn tại.
4. Tra cứu tên/tác giả có nhiều kết quả; chọn một ISBN và xóa đúng sách.
5. Minh họa xóa node lá, node một con, node hai con và node gốc (dùng bộ dữ liệu riêng nếu cần).
6. Xuất LNR, chỉ ra thứ tự ISBN tăng dần; giải thích NLR/LRN nếu được hỏi.
7. Cập nhật sách, lưu file, thoát và chạy lại để xác nhận dữ liệu được khôi phục.
8. Nhập ISBN sai/trường thiếu và đường dẫn file không tồn tại; cho thấy thông báo lỗi và chương trình vẫn chạy.
9. Mỗi thành viên giải thích phần mình phụ trách; cả nhóm trả lời về khóa BST, xóa hai con, O(h)/O(N), tìm tên/tác giả, quản lý bộ nhớ và persistence.

## Phân công trình bày demo

- **Trần Ninh Thuận (M1):** Mở đầu, giới thiệu tổng quan đề tài, kiến trúc hệ thống và quy trình quản lý/tích hợp Git & Jira.
- **Phan Thế Hiệp (M2):** Trình diễn các thao tác trên cây BST (thêm, tìm kiếm theo ISBN, các kiểu duyệt NLR/LNR/LRN, xóa 3 trường hợp node lá/một con/hai con/gốc).
- **Huỳnh Văn Lĩnh (M3):** Trình diễn menu điều khiển console, các nghiệp vụ CRUD, tìm kiếm theo tên/tác giả và chọn ISBN xóa khi có nhiều kết quả trùng.
- **Lê Cường Bảo (M4):** Trình diễn tính năng persistence, đọc/ghi tệp dữ liệu CSV/text, xử lý dữ liệu lỗi và khôi phục trạng thái.
- **Phạm Đức Cường (M5):** Trình diễn bộ ca kiểm thử, đánh giá độ phức tạp thuật toán O(h)/O(N), tổng kết demo và slide.

Sau khi chạy thật, ghi ngày, máy/compiler, người demo, kết quả từng bước và ảnh trong tests/results/. Không ghi kết quả chưa chạy.
