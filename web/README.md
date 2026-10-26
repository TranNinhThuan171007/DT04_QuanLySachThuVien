# Giao diện quản lý danh mục sách

Mở index.html trong trình duyệt hiện đại. Không cần cài framework, build tool hoặc backend.

## Triển khai demo

Repo có workflow GitHub Pages tại `.github/workflows/pages.yml`. Chọn **Settings → Pages → Build and deployment → GitHub Actions**. Sau khi workflow chạy thành công trên `main`, GitHub Pages cung cấp URL demo.

### Vercel

Khi import repo vào Vercel, dùng **Root Directory** mặc định là thư mục gốc, chọn **Other** làm framework preset và để trống Build Command. Tệp `vercel.json` ở thư mục gốc xuất bản nội dung `web/`; không cần cài dependencies. Sau khi kết nối GitHub, mỗi lần push lên `main` sẽ tạo deployment production; pull request tạo preview deployment.

Ứng dụng chỉ lưu dữ liệu trên trình duyệt và không có backend; dùng cho trình diễn, không dùng với dữ liệu thư viện thật.

## Đăng nhập & Đăng ký

- **Đăng ký tài khoản mới:** Người dùng có thể đăng ký tài khoản độc giả trực tiếp bằng cách chọn tab **Đăng ký độc giả** trên màn hình xác thực. Dữ liệu độc giả và tài khoản mới được tự động tạo và lưu trữ trên trình duyệt (`localStorage`).
- **Tài khoản quản trị viên mặc định:** `admin` / `123456`.
- **Tài khoản độc giả mẫu:** `docgia` / `123456`, gắn với hồ sơ mẫu `DG-DEMO-001`.
- Hộp thoại "Tài khoản dùng thử" trên màn hình đăng nhập đã được ẩn đi để tăng tính chuyên nghiệp và thẩm mỹ cho giao diện.
- Trạng thái đăng nhập lưu trong `sessionStorage` của tab hiện tại; dùng nút **Đăng xuất** trên thanh đầu trang để kết thúc phiên.
- Quản trị viên được thêm, sửa, xóa sách; nhập/xuất CSV; quản lý độc giả; duyệt hoặc từ chối yêu cầu mượn; ghi nhận trả sách; xem cây BST và thống kê.
- Người mượn chỉ được tra cứu danh mục, gửi yêu cầu mượn sách còn sẵn và xem yêu cầu/phiếu mượn của hồ sơ mình; không được xem hồ sơ người khác hoặc sửa dữ liệu thư viện.
- Khi admin duyệt yêu cầu, ứng dụng tạo phiếu mượn với hạn trả sau 14 ngày. Yêu cầu đang chờ sẽ giữ chỗ đầu sách; admin có thể từ chối để sách sẵn sàng cho yêu cầu khác.
- Để thử quy trình: đăng nhập `docgia`, gửi yêu cầu mượn; đăng xuất, vào `admin` và duyệt trong **Yêu cầu mượn sách**; sau đó đăng xuất và vào `docgia` để xem trạng thái đã duyệt và hạn trả.
- Có thể mở độc giả và admin ở hai tab của cùng trình duyệt để theo dõi thay đổi. Dữ liệu không tự đồng bộ sang thiết bị khác.
- Đây là đăng nhập và phân quyền mô phỏng phía trình duyệt để trình diễn. Dữ liệu vẫn lưu trên thiết bị; bảo vệ dữ liệu thật cần backend, tài khoản riêng và kiểm tra quyền ở máy chủ.

## Tính năng

- Chuyển danh mục giữa dạng bảng và lưới thẻ; 18 sách mẫu dùng ảnh bìa thật được ghép theo ISBN. Cần có Internet để tải ảnh; nếu nguồn ảnh không hoạt động, ứng dụng hiện bìa CSS dự phòng. Khi thêm sách, có thể nhập URL HTTPS trực tiếp đến ảnh bìa từ nhà xuất bản; URL này cũng được lưu khi xuất/nhập CSV.
- Khu vực sách nổi bật tự xếp sách được mượn nhiều lên trước và bổ sung sách mới xuất bản nếu chưa có đủ gợi ý.
- Độc giả đánh dấu/bỏ đánh dấu sách yêu thích, lọc danh mục theo danh sách yêu thích; lựa chọn lưu theo hồ sơ độc giả trong trình duyệt.
- Chuyển giao diện sáng/tối; lựa chọn và kiểu hiển thị danh mục được lưu trên thiết bị.
- Thẻ sách có chuyển động nhẹ khi xuất hiện/rê chuột; tự giảm chuyển động theo cài đặt trợ năng của hệ điều hành.
- Tra cứu theo ISBN, nhan đề và tác giả; lọc thể loại.
- Lọc thêm theo tác giả và năm xuất bản; sắp xếp theo ISBN, tác giả, thể loại hoặc năm.
- Thêm, sửa và xóa sách; ISBN không được trùng.
- Quản lý hồ sơ độc giả; lập phiếu mượn, theo dõi hạn trả, nhận diện sách quá hạn và ghi nhận trả sách.
- Xem thống kê số sách theo thể loại, số lượt mượn, sách phổ biến và các phiếu quá hạn.
- Nhập và xuất danh mục sách dạng CSV. Nhập CSV sẽ gộp sách mới vào danh mục và bỏ qua ISBN đã có.
- Lưu dữ liệu trong localStorage của trình duyệt hiện tại.
- Dùng BST theo ISBN để tìm, xóa và duyệt NLR/LNR/LRN; LNR xuất danh mục tăng dần.
- Danh mục mẫu có 18 đầu sách, gồm 9 đầu sách gốc và 9 đầu sách học thuật được bổ sung.
- Khi mở bản cập nhật lần đầu, 9 sách mới được gộp vào danh mục trên thiết bị; ISBN đã có và dữ liệu người dùng không bị ghi đè.
- Mỗi sách trong danh mục có liên kết **Trang sách** tới nguồn nhà xuất bản/tác giả; sách tự thêm hoặc nhập CSV chưa có nguồn riêng sẽ mở tra cứu Google Books theo nhan đề, tác giả và ISBN.

Đây là giao diện demo chạy trên một thiết bị, chưa đồng bộ dữ liệu giữa người dùng và chưa thay thế chương trình C++ theo yêu cầu học phần.

### CSV danh mục sách

Tệp nhập cần có dòng tiêu đề với các cột `ISBN`, `Nhan đề`, `Tác giả`; có thể thêm `Nhà xuất bản`, `Năm xuất bản`, `Thể loại` và `URL ảnh bìa nhà xuất bản`. Link ảnh bìa phải dùng HTTPS; ISBN được kiểm tra cả độ dài lẫn số kiểm tra. Khi xuất, trang tạo đủ bảy cột theo thứ tự này. Mỗi ISBN chỉ đại diện một đầu sách/bản ghi, nên một đầu sách chỉ được mượn cho một độc giả tại một thời điểm.

### Liên kết tra cứu cho 18 sách mẫu

Các liên kết mở trang thông tin sách của nhà xuất bản hoặc tác giả. Đây là trang giới thiệu/tra cứu sách, không nhất thiết cung cấp toàn văn miễn phí.

#### 9 đầu sách gốc

- [The C++ Programming Language — Bjarne Stroustrup](https://www.stroustrup.com/4th.html) — ISBN `9780321563842`.
- [Effective Java — Pearson](https://www.pearson.com/en-us/subject-catalog/p/effective-java/P200000000138/9780134685991) — ISBN `9780134685991`.
- [Head First Design Patterns — O'Reilly](https://www.oreilly.com/library/view/head-first-design/0596007124/) — ISBN `9780596007126`.
- [Design Patterns — Pearson / Addison-Wesley](https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480) — ISBN `9780201633610`.
- [The C Programming Language — Pearson](https://www.pearson.com/en-au/subject-catalog/p/c-programming-language/P200000000368/9780131103627) — ISBN `9780131103627`.
- [Domain-Driven Design — Pearson](https://www.pearson.com/en-gb/subject-catalog/p/domain-driven-design-tackling-complexity-in-the-heart-of-software/P200000009375/9780321125217) — ISBN `9780321125217`.
- [Clean Code — Pearson](https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000009044/9780132350884) — ISBN `9780132350884`.
- [The Pragmatic Programmer — Pearson](https://www.pearson.com/en-us/subject-catalog/p/pragmatic-programmer-the-your-journey-to-mastery-20th-anniversary-edition/P200000000337/9780135957059) — ISBN `9780135957059`.
- [Programming JavaScript Applications — O'Reilly](https://www.oreilly.com/library/view/programming-javascript-applications/9781491950289/) — ISBN `9781491950296`.

#### 9 đầu sách học thuật được bổ sung

- [Introduction to Algorithms — The MIT Press](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) — ISBN `9780262046305`.
- [Data Structures and Algorithm Analysis in C++ — Pearson](https://www.pearson.com/en-us/subject-catalog/p/data-structures-and-algorithm-analysis-in-c/P200000003459/9780133404180) — ISBN bản in `9780132847377`.
- [Discrete Mathematics and Its Applications — McGraw Hill](https://www.mheducation.com/highered/product/discrete-mathematics-and-its-applications-rosen.html?isbn=9781266045479) — ISBN `9781266045479`.
- [Fundamentals of Database Systems — Pearson](https://www.pearson.com/en-us/subject-catalog/p/redirected-product/P200000003546/9780133970777) — ISBN `9780133970777`.
- [Software Engineering — Pearson](https://www.pearson.com/en-us/subject-catalog/p/software-engineering/P200000003258/9780137503148) — ISBN `9780137503148`.
- [Computer Networking: A Top-Down Approach — Pearson](https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000013385/9780135415603) — ISBN `9780135415603`.
- [Operating System Concepts — Wiley](https://www.wiley.com/en-us/operating-system-concepts-10th-edition-p-9781119800361) — ISBN `9781119800361`.
- [Artificial Intelligence: A Modern Approach — Pearson](https://www.pearson.com/en-us/subject-catalog/p/artificial-intelligence-a-modern-approach/P200000003500/9780134610993) — ISBN `9780134610993`.
- [Computer Systems: A Programmer's Perspective — Pearson](https://www.pearson.com/en-us/subject-catalog/p/computer-systems-a-programmers-perspective/P200000003479/9780134092669) — ISBN `9780134092669`.
