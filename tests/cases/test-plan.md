# Kế hoạch ca kiểm thử — chưa chạy

Điền kết quả sau khi có chương trình tích hợp. Không đánh dấu Pass nếu chưa chạy và lưu bằng chứng.

| ID | Trường hợp | Kết quả mong đợi |
|---|---|---|
| BST-01 | Cây rỗng, tìm/xóa ISBN | Không crash; báo không có bản ghi |
| BST-02 | Thêm ISBN mới rồi tìm | Tìm thấy đúng các trường |
| BST-03 | Thêm ISBN trùng | Từ chối hoặc yêu cầu cập nhật; không tạo node trùng |
| BST-04 | Xóa node lá | Node biến mất, phần còn lại vẫn tìm được |
| BST-05 | Xóa node có một con | Nối đúng cây con; không mất bản ghi khác |
| BST-06 | Xóa node có hai con | Thay bằng successor/predecessor hợp lệ; thứ tự BST giữ nguyên |
| BST-07 | Xóa gốc ở cả ba dạng con | Gốc mới hợp lệ; không dùng con trỏ đã giải phóng |
| BST-08 | LNR trên cây không cân bằng | ISBN tăng dần |
| BST-09 | NLR và LRN | Thứ tự thăm đúng định nghĩa |
| SEARCH-01 | Tìm tên/tác giả không trùng | Trả đúng bản ghi; mô tả O(N) |
| SEARCH-02 | Tên/tác giả trùng nhiều ISBN | Hiển thị đủ kết quả và xóa đúng ISBN chọn |
| IO-01 | Lưu rồi nạp lại | Nội dung và số lượng khớp |
| IO-02 | File không tồn tại/không mở được | Báo lỗi rõ, dữ liệu đang có không bị mất |
| IO-03 | Dòng thiếu trường hoặc năm sai | Báo dòng/lỗi; xử lý theo chính sách đã chốt |
| UI-01 | Nhập chữ ở menu số, chuỗi rỗng, ISBN sai | Báo lỗi và tiếp tục ở luồng nhập an toàn |

## Ghi kết quả thực tế

| ID | Ngày chạy | Máy/compiler | Pass/Fail | Bằng chứng hoặc lỗi |
|---|---|---|---|---|
| [ID] | [ngày] | [môi trường] | Chưa chạy | [đường dẫn ảnh/log hoặc mô tả] |
