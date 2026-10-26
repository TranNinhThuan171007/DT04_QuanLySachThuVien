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

- Trước khi commit, mỗi thành viên đặt tên và email Git theo tài khoản của mình để lịch sử ghi đúng người thực hiện.
- Làm việc trên nhánh riêng theo nhiệm vụ, rồi mở pull request để nhóm xem lại trước khi nhập vào `main`.
- Danh sách việc ban đầu nằm trong `docs/plan/backlog.csv`. Nhóm dùng Jira để theo dõi tiến độ và cập nhật khi trạng thái công việc thay đổi.
- Viết tiêu đề commit ngắn, nêu việc đã làm và mã task, chẳng hạn `feat(DSA-04): add ISBN search`.

## Chạy và triển khai bản demo web

Để xem demo trên máy, mở `web/index.html` trong trình duyệt. Cài thêm thư viện hoặc công cụ build là không cần thiết. Khi GitHub Pages được đặt dùng **GitHub Actions**, workflow `.github/workflows/pages.yml` sẽ đăng nội dung trong `web/` sau mỗi lần cập nhật `main`.

Demo lưu dữ liệu riêng trong trình duyệt đang mở. Đăng nhập và phân quyền chỉ phục vụ trình diễn; hiện chưa có máy chủ hay cơ sở dữ liệu chung. Không dùng bản này để quản lý dữ liệu thư viện thật.

Phần C++ hiện có mô hình sách và các thao tác BST cùng chương trình kiểm thử. Trên Windows, tạo thư mục `build` rồi biên dịch bằng MinGW g++:

```powershell
New-Item -ItemType Directory -Force build | Out-Null
g++ -std=c++17 -Wall -Wextra -Wpedantic src/models/Book.cpp src/bst/BST.cpp tests/test_bst.cpp -o build/test_bst
```

Lệnh này tạo chương trình kiểm tra BST. Menu console và phần đọc/ghi tệp chưa được tích hợp.

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
