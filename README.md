# Quản lý danh mục sách thư viện (Đề tài 04)

Đồ án môn **Cấu trúc dữ liệu & Giải thuật**, ngôn ngữ C++. Mục tiêu là xây dựng ứng dụng quản lý danh mục sách dùng cây nhị phân tìm kiếm (BST), đồng thời trình bày thiết kế, cài đặt, độ phức tạp và kết quả chạy.

## Phạm vi dự kiến

- Quản lý sách với ISBN duy nhất làm khóa BST; thông tin gồm tên sách, tác giả, nhà xuất bản, năm xuất bản và thể loại.
- Thêm, tìm theo ISBN, cập nhật thông tin, xóa sách, nhập/xuất dữ liệu tệp.
- Tra cứu theo tên/tác giả bằng duyệt cây; nếu có nhiều kết quả thì chọn bản ghi bằng ISBN để thao tác xóa.
- Duyệt LNR để xuất danh mục tăng dần theo ISBN; có thể thêm NLR/LRN để minh họa các phép duyệt được yêu cầu.
- Cấp phát node động và giải phóng toàn bộ cây khi kết thúc.

## Cấu trúc thư mục

```text
src/                  Mã nguồn C++: model, BST, lưu trữ, giao diện console
  include/            Khai báo dùng chung
  models/             Mô hình Book
  bst/                Cây BST và các thao tác/duyệt
  storage/            Đọc/ghi dữ liệu
  ui/                 Menu và luồng nghiệp vụ
data/sample/          Dữ liệu mẫu có thể chia sẻ
web/                  Giao diện quản lý danh mục và minh họa BST
docs/plan/            Kế hoạch, phân công, backlog
docs/architecture/    Sơ đồ và quyết định thiết kế
docs/meetings/        Biên bản họp, cập nhật tiến độ
docs/demo/            Kịch bản demo và tiêu chí nghiệm thu
tests/cases/          Danh sách ca kiểm thử
tests/results/        Bằng chứng/kết quả chạy sau khi kiểm thử
assets/diagrams/      Sơ đồ dùng trong báo cáo/slide
scripts/              Lệnh hỗ trợ build hoặc chuẩn hóa dữ liệu
```

## Git và cộng tác

- Mỗi người cấu hình `user.name`/`user.email` Git của chính mình và tự tạo commit cho phần việc mình thực hiện.
- Tạo nhánh theo tính năng, ví dụ `feature/bst-core`, `feature/file-storage`, `docs/planning`; tích hợp qua pull request hoặc review chéo.
- Dùng Jira theo yêu cầu môn học; `docs/plan/backlog.csv` là nguồn công việc ban đầu để nhập/đối chiếu. Cập nhật Jira ít nhất mỗi ngày trong tuần cuối.
- Commit nhỏ, nêu rõ hành động và mã task, ví dụ `feat(DSA-04): add ISBN search`.

## Chạy và triển khai bản demo web

Mở `web/index.html` trong trình duyệt hiện đại để chạy demo cục bộ. Không cần framework hoặc máy chủ. Nếu bật GitHub Pages với nguồn **GitHub Actions**, workflow `.github/workflows/pages.yml` sẽ triển khai nội dung `web/` mỗi khi có thay đổi trên `main`.

Demo lưu danh mục và trạng thái trong `localStorage` của trình duyệt. Đăng nhập/phân quyền cũng mô phỏng phía trình duyệt; ứng dụng chưa có backend, cơ sở dữ liệu dùng chung hay bảo vệ dữ liệu thật. Vì vậy GitHub Pages chỉ phù hợp để trình diễn, không dùng vận hành thư viện thực tế.

Mã C++ trong `src/` là phần đồ án BST. Build thủ công phần model/BST/test với C++17:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic src/models/Book.cpp src/bst/BST.cpp tests/test_bst.cpp -o build/test_bst
```

Chương trình menu console và module persistence chưa được tích hợp đầy đủ; không xem lệnh trên là bản build ứng dụng hoàn chỉnh.

## Nộp bài

Hạn theo đề: **01/11/2026**. Trước khi nộp, nhóm cần hoàn tất chương trình, báo cáo 40–50 trang, slide, kịch bản demo, dữ liệu mẫu và rà soát lịch sử đóng góp Git/Jira. Xem checklist trong `docs/plan/ke-hoach-tong-the.md`.

## Nhóm thực hiện

Dự án gồm 5 thành viên:

| STT | Mã | Họ và tên | Vai trò chính |
|:---:|:---:|---|---|
| 1 | M1 | **Trần Ninh Thuận** | Trưởng nhóm: Điều phối, kiến trúc, yêu cầu, tích hợp & Chương 1 |
| 2 | M2 | **Phan Thế Hiệp** | Cấu trúc dữ liệu BST, thuật toán thao tác cây & Chương 2 |
| 3 | M3 | **Huỳnh Văn Lĩnh** | Nghiệp vụ ứng dụng, giao diện điều khiển console/CRUD & Chương 3 |
| 4 | M4 | **Lê Cường Bảo** | Persistence, lưu/đọc dữ liệu tệp CSV/text & Chương 3 |
| 5 | M5 | **Phạm Đức Cường** | Đảm bảo chất lượng, kịch bản kiểm thử, slide/demo & Chương 4 |

Chi tiết phân công, tài khoản GitHub/Jira và quy tắc cộng tác xem tại [docs/plan/phan-cong.md](docs/plan/phan-cong.md) và [docs/plan/ke-hoach-tong-the.md](docs/plan/ke-hoach-tong-the.md). Báo cáo và slide được nhóm tự quản lý riêng, không nằm trong workspace này.
