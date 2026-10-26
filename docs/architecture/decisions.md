# Quyết định thiết kế

## ADR-01 — Khóa BST

- **Trạng thái:** Đã áp dụng.
- **Quyết định:** ISBN đã chuẩn hóa là khóa duy nhất.
- **Lý do:** đề tài nêu quản lý theo ISBN và xuất danh mục tăng dần; tên/tác giả có thể trùng.
- **Hệ quả:** tìm ISBN O(h); tìm tên/tác giả duyệt cây O(N). Nếu có nhiều kết quả, chọn sách bằng ISBN trước khi xóa.

## ADR-02 — Sở hữu bộ nhớ

- **Quyết định:** BST sở hữu node cấp phát động bằng con trỏ; `destroyTree()` giải phóng đệ quy; UI và storage không giữ `BSTNode*` lâu dài. Các hàm tra cứu theo tên/tác giả trả về danh sách `Book`.
- **Lý do:** yêu cầu kỹ thuật của đề nhấn mạnh con trỏ node cây và giải phóng bộ nhớ.
- **Hệ quả:** mô tả rõ quyền sở hữu; mọi nhánh erase phải nối cây đúng rồi delete node; copy BST cần bị cấm hoặc cài đặt sâu để tránh double-free.

## ADR-03 — Dữ liệu tệp

- **Quyết định:** CSV UTF-8 có header sáu cột `ISBN,Title,Author,Publisher,Year,Genre`; dấu phẩy và ngoặc kép được escape theo quy tắc CSV. Dòng lỗi được báo số dòng; khi tệp có lỗi, chương trình không mở chế độ sửa để tránh ghi đè dữ liệu nguồn.
- **Ghi tệp:** Ghi tệp tạm, đổi tệp cũ thành `.bak`, sau đó thay bằng bản mới; khôi phục bản cũ nếu bước thay thế thất bại.
