# Ma trận yêu cầu và bằng chứng nghiệm thu

Ma trận này tách yêu cầu của đề khỏi kế hoạch thực hiện. Dự án đã xác định 5 thành viên chính thức và đang triển khai các phần việc theo đúng ma trận yêu cầu.

## Đề tài 04

| Mã | Yêu cầu đề tài | Cách đáp ứng dự kiến | Bằng chứng cần có | Phụ trách |
|---|---|---|---|---|
| T04-01 | BST quản lý danh mục theo ISBN | ISBN chuẩn hóa làm khóa duy nhất; từ chối khóa trùng | Mã BST, mô tả API, ca trùng ISBN | Phan Thế Hiệp (M2) |
| T04-02 | Duyệt NLR, LNR, LRN | Cài đủ ba phép duyệt đệ quy; LNR cho thứ tự ISBN tăng dần | Mã, cây ví dụ và kết quả console | Phan Thế Hiệp (M2) |
| T04-03 | Tìm kiếm trên BST | Tìm ISBN theo đường đi BST, phân tích theo chiều cao h | Mã, ví dụ tìm thấy/không thấy, phân tích O(h) | Phan Thế Hiệp (M2) |
| T04-04 | Xóa theo tên/tác giả | Duyệt lọc theo tên/tác giả; hiển thị các kết quả; chọn ISBN để xóa khỏi BST | Demo có kết quả trùng và xóa đúng ISBN | Phan Thế Hiệp (M2), Huỳnh Văn Lĩnh (M3) |
| T04-05 | Xuất danh mục tăng dần, O(N) | LNR thăm mỗi node đúng một lần | Ca kiểm tra thứ tự trên cây không cân bằng | Phan Thế Hiệp (M2) |
| T04-06 | Đệ quy, con trỏ node, không rò rỉ | BST sở hữu node cấp phát động; destructor/clear giải phóng; erase xử lý mọi dạng node | Giải thích sở hữu bộ nhớ, rà soát code, bằng chứng chạy | Phan Thế Hiệp (M2) |

## Yêu cầu chung bắt buộc

| Mã | Yêu cầu | Bằng chứng phải hoàn tất | Vị trí trong workspace | Chủ trì |
|---|---|---|---|---|
| YC01 | Git/GitHub, commit cá nhân, nhánh, README | Remote GitHub; commit của đủ 5 tài khoản; lịch sử/PR đúng đóng góp; hướng dẫn build/run | README.md, repository Git, ảnh/URL GitHub | Trần Ninh Thuận (M1) |
| YC02 | Jira theo dõi người, hạn, trạng thái, % | Board có đủ task và thành viên, cập nhật hằng ngày; export/ảnh cuối | docs/plan/backlog.csv, jira-setup.md, docs/plan/evidence/ | Trần Ninh Thuận (M1) |
| YC03 | Báo cáo LaTeX 40–50 trang | Đúng cấu trúc 4 chương, trích dẫn, mã chọn lọc, độ phức tạp, thử nghiệm và phụ lục phân công | Nhóm tự làm và quản lý báo cáo riêng theo phân bổ trang trong kế hoạch tổng thể | Trần Ninh Thuận (M1); Phan Thế Hiệp (M2), Huỳnh Văn Lĩnh (M3), Lê Cường Bảo (M4), Phạm Đức Cường (M5) viết phần |
| YC04 | C++ hoàn chỉnh, lưu file, xử lý lỗi, slide/demo | Bản chạy ổn định, dữ liệu bền vững, ca demo/kiểm thử, mọi người hiểu hệ thống | src/, data/sample/, tests/, docs/demo/; slide do nhóm tự làm riêng | Phan Thế Hiệp (M2), Huỳnh Văn Lĩnh (M3), Lê Cường Bảo (M4), Phạm Đức Cường (M5) |

## Trạng thái khởi tạo

- Repository Git cục bộ đã được khởi tạo; các thành viên nhóm tự tạo nhánh và commit theo đúng yêu cầu ghi nhận đóng góp.
- Backlog CSV đã cập nhật người phụ trách (M1–M5) để nhập vào Jira theo dõi tiến độ.
- Không giữ khung báo cáo trong workspace; nhóm tự làm báo cáo riêng. Nội dung và tổng số trang cuối cần được kiểm tra theo đề.
- Ca kiểm thử/demo mới là kế hoạch; không có kết quả Pass nào được khai báo trước khi chạy thật.
