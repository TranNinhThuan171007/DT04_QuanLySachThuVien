# Kế hoạch tổng thể — Đề tài 04

## 1. Đầu ra theo đề

1. **GitHub:** repository có mã nguồn, README hướng dẫn; nhánh/commit phản ánh đúng đóng góp từng người.
2. **Jira:** backlog có người phụ trách, hạn, trạng thái và % hoàn thành, được cập nhật liên tục.
3. **Báo cáo LaTeX 40–50 trang:** bìa, lời nói đầu, mục lục, 4 chương, kết luận, tài liệu tham khảo, phụ lục phân công.
4. **Ứng dụng C++:** giao diện tương tác, BST, thao tác danh mục, đọc/ghi tệp bền vững, xử lý lỗi và giải phóng bộ nhớ.
5. **Slide và demo:** có dữ liệu mẫu, kịch bản và ca kiểm thử.

## 2. Phạm vi và tiêu chí nghiệm thu

- ISBN đã chuẩn hóa là khóa duy nhất của BST; thông tin sách gồm tên, tác giả, nhà xuất bản, năm xuất bản và thể loại.
- Có thêm/tìm theo ISBN/cập nhật/xóa; tra cứu theo tên hoặc tác giả; nạp và lưu tệp.
- Tên/tác giả có thể trùng. Khi tìm theo tên/tác giả ra nhiều sách, hiển thị các kết quả và yêu cầu chọn ISBN; xóa cuối cùng gọi thao tác BST theo ISBN.
- LNR xuất danh mục tăng dần ISBN trong O(N). NLR/LRN dùng để minh họa các kiểu duyệt cây.
- Xóa xử lý node lá, một con, hai con và gốc. Node bị xóa được giải phóng; toàn bộ cây được giải phóng khi kết thúc.
- Lỗi nhập liệu hoặc file phải có thông báo rõ, không làm chương trình thoát bất ngờ.
- Nạp lại dữ liệu sau khi lưu phải khôi phục đúng bản ghi. Nhóm cần chốt schema và chính sách dòng lỗi trước khi cài đặt.

## 3. Giả định thiết kế cần thống nhất

Đề vừa nói quản lý theo ISBN vừa yêu cầu xóa theo tên/tác giả. Vì BST có một khóa chính, nhóm dùng ISBN làm khóa; tìm tên/tác giả duyệt toàn cây O(N), sau đó chọn ISBN để xóa. Ghi giả định này trong báo cáo và xác nhận với giảng viên nếu lớp diễn giải khác.

## 4. Phân công 5 người

Danh sách 5 thành viên chính thức và phân công trách nhiệm:

| Mã | Thành viên | Vai trò chính | Đầu ra chịu trách nhiệm | Review chéo |
|---|---|---|---|---|
| M1 | Trần Ninh Thuận | Trưởng nhóm: Điều phối, yêu cầu, tích hợp | README, phạm vi, kiến trúc, Git/PR; Chương 1 | Review Ch.4 M5; tích hợp cùng M2 |
| M2 | Phan Thế Hiệp | Cấu trúc BST và thuật toán | Book, node, insert/search/erase, NLR/LNR/LRN, giải phóng cây; Chương 2 | Review M3 |
| M3 | Huỳnh Văn Lĩnh | Nghiệp vụ và giao diện | Menu console, CRUD, tìm tên/tác giả; phần cài đặt Chương 3 | Review M4 |
| M4 | Lê Cường Bảo | Persistence và dữ liệu | Đọc/ghi CSV/text, kiểm tra lỗi, dữ liệu mẫu; phần cài đặt Chương 3 | Review M2 |
| M5 | Phạm Đức Cường | Chất lượng và trình bày | Ca kiểm thử/kết quả, độ phức tạp Chương 4, slide, demo | Review M1/M2 |

Mỗi module có một người thực hiện và một người review khác. Trước demo, cả 5 người phải giải thích được khóa BST, xóa đủ 3 dạng, lưu/đọc file, độ phức tạp và luồng tổng thể. Người review không commit thay người thực hiện.

## 5. Lịch đến hạn 01/11/2026

| Ngày | Mốc | Dẫn dắt | Đầu ra |
|---|---|---|---|
| 24/10 | Chốt thành viên, repository, Jira, phạm vi | M1 (Trần Ninh Thuận), cả nhóm | Tài khoản, backlog, khóa ISBN thống nhất |
| 25/10 | Chốt schema, API BST, file, báo cáo | M1 (Trần Ninh Thuận), M2 (Phan Thế Hiệp), M4 (Lê Cường Bảo) | Sơ đồ, interface, dữ liệu mẫu, dàn ý |
| 26/10 | Hoàn tất lõi BST và bắt đầu UI/storage | M2–M4 | Insert/search/delete/traversal có commit |
| 27/10 | Ghép CRUD, tìm tên/tác giả, persistence | M2–M4 | Bản tích hợp đầu tiên, review chéo |
| 28/10 | Xử lý lỗi, chạy thử nội bộ lần 1 | M3–M5 | Bảng kết quả ca kiểm thử và lỗi cần sửa |
| 29/10 | Đóng băng tính năng; viết Ch.1–3 | M1–M4 | Bản ứng dụng ổn định, báo cáo có sơ đồ |
| 30/10 | Ch.4, slide, demo; kiểm tra số trang | M5 (Phạm Đức Cường), cả nhóm | Báo cáo hoàn chỉnh, slide và kịch bản |
| 31/10 | Tổng duyệt và đóng gói | Cả nhóm | Release candidate, chia phần trả lời, sao lưu |
| 01/11 | Nộp sớm, kiểm tra gói nộp | M1 (Trần Ninh Thuận), M5 (Phạm Đức Cường) | Xác nhận nộp và lưu bản cuối |

Mỗi người cập nhật Jira và nêu vướng mắc trước 21:00 mỗi ngày; M1 (Trần Ninh Thuận) họp nhanh 10–15 phút để xử lý phụ thuộc. Nếu trễ, giảm tính năng phụ trước; không bỏ BST, persistence, báo cáo, slide/demo hay bằng chứng đóng góp.

## 6. Phân bổ trang báo cáo

Mục tiêu khoảng **46 trang**, kiểm tra PDF cuối nằm trong 40–50 trang theo cách tính của giảng viên.

| Phần | Trang mục tiêu | Phụ trách chính |
|---|---:|---|
| Bìa, lời nói đầu, mục lục | 3 | M1 (Trần Ninh Thuận) |
| Chương 1 — Nghiệp vụ và phân tích | 7 | M1 (Trần Ninh Thuận) |
| Chương 2 — Thiết kế CTDL và giải thuật | 10 | M2 (Phan Thế Hiệp) |
| Chương 3 — Cài đặt chi tiết và code mẫu C++ | 15 | M3 (Huỳnh Văn Lĩnh), M4 (Lê Cường Bảo) |
| Chương 4 — Độ phức tạp và kết quả thử nghiệm | 6 | M5 (Phạm Đức Cường) |
| Kết luận, tài liệu tham khảo | 2 | Cả nhóm (M1 chủ trì) |
| Phụ lục phân công, hướng dẫn chạy, kết quả bổ sung | 3 | M1 (Trần Ninh Thuận), M5 (Phạm Đức Cường) |
| **Tổng** | **46** | |

Nội dung cần có giải thích thiết kế, ví dụ thao tác, sơ đồ, bảng kết quả và đoạn mã cốt lõi có chú thích; tránh kéo dài bằng mã nguyên khối.

## 7. Checklist hoàn thành

- [x] Đã chốt danh sách 5 thành viên (Trần Ninh Thuận, Phan Thế Hiệp, Huỳnh Văn Lĩnh, Lê Cường Bảo, Phạm Đức Cường); cập nhật tài khoản Git/Jira và cam kết commit cá nhân đúng đóng góp.
- [ ] Jira thể hiện nhiệm vụ, người, hạn, trạng thái, %; lưu export/ảnh cuối.
- [ ] C++ chạy theo README; có CRUD, ISBN trùng/không thấy, xóa đủ trường hợp, tìm tên/tác giả, lưu/đọc, lỗi đầu vào.
- [ ] BST giải phóng node; danh mục LNR tăng dần; mô tả O(h), trung bình O(log N) khi cây cân đối tương đối, xấu nhất O(N); tìm tên/tác giả O(N).
- [ ] Báo cáo đúng bố cục, 40–50 trang, có trích dẫn và phụ lục phân công.
- [ ] Slide/demo chạy từ thư mục sạch với dữ liệu mẫu; ghi kết quả thật, không điền trước Pass.
- [ ] Cả 5 thành viên diễn tập và trả lời về code/CTDL/độ phức tạp.
- [ ] Jira thể hiện nhiệm vụ, người, hạn, trạng thái, %; lưu export/ảnh cuối.
- [ ] C++ chạy theo README; có CRUD, ISBN trùng/không thấy, xóa đủ trường hợp, tìm tên/tác giả, lưu/đọc, lỗi đầu vào.
- [ ] BST giải phóng node; danh mục LNR tăng dần; mô tả O(h), trung bình O(log N) khi cây cân đối tương đối, xấu nhất O(N); tìm tên/tác giả O(N).
- [ ] Báo cáo đúng bố cục, 40–50 trang, có trích dẫn và phụ lục phân công.
- [ ] Slide/demo chạy từ thư mục sạch với dữ liệu mẫu; ghi kết quả thật, không điền trước Pass.
- [ ] Cả 5 thành viên diễn tập và trả lời về code/CTDL/độ phức tạp.
