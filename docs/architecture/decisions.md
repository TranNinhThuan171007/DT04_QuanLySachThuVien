# Quyết định thiết kế

## ADR-01 — Khóa BST

- **Trạng thái:** Đề xuất, cần cả nhóm thống nhất ngày 24–25/10.
- **Quyết định:** ISBN đã chuẩn hóa là khóa duy nhất.
- **Lý do:** đề tài nêu quản lý theo ISBN và xuất danh mục tăng dần; tên/tác giả có thể trùng.
- **Hệ quả:** tìm ISBN O(h); tìm tên/tác giả duyệt cây O(N). Nếu có nhiều kết quả, chọn sách bằng ISBN trước khi xóa.

## ADR-02 — Sở hữu bộ nhớ

- **Đề xuất:** BST sở hữu node cấp phát động bằng con trỏ; destructor/clear() giải phóng đệ quy; UI và storage không giữ Node* lâu dài. Trả về giá trị Book hoặc danh sách giá trị.
- **Lý do:** yêu cầu kỹ thuật của đề nhấn mạnh con trỏ node cây và giải phóng bộ nhớ.
- **Hệ quả:** mô tả rõ quyền sở hữu; mọi nhánh erase phải nối cây đúng rồi delete node; copy BST cần bị cấm hoặc cài đặt sâu để tránh double-free.

## ADR-03 — Dữ liệu tệp

- **Đề xuất:** CSV UTF-8 có header; kiểm tra ISBN, năm và số trường. Quy định escape dấu phẩy/ngoặc kép hoặc chọn định dạng phân tách ít mơ hồ.
- **Cần chốt:** có tạo bản sao .bak trước khi ghi không; dòng sai sẽ bị bỏ qua có báo cáo hay từ chối toàn file.
