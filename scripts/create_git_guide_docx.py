import os
import sys

# Ensure local imports work
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from docx_builder import DocxBuilder

def build_document():
    doc = DocxBuilder()

    # Title & Header
    doc.p("BÀI TẬP LỚN CẤU TRÚC DỮ LIỆU & GIẢI THUẬT (C++)", bold=True, color="1E3A8A", size=24, align="center", before=100, after=60)
    doc.p("ĐỀ TÀI 04: QUẢN LÝ DANH MỤC SÁCH THƯ VIỆN BẰNG CÂY NHỊ PHÂN TÌM KIẾM (BST)", bold=True, color="0F172A", size=28, align="center", before=60, after=120)
    doc.p("TÀI LIỆU HƯỚNG DẪN QUY TRÌNH PUSH GITHUB CHI TIẾT CHO TỪNG THÀNH VIÊN", bold=True, color="2563EB", size=32, align="center", before=120, after=120)
    doc.p("Hướng dẫn phân chia file, câu lệnh từng bước cho 5 thành viên, tránh xung đột (Merge Conflict) & ghi nhận đúng 100% đóng góp trên GitHub/Jira", italic=True, color="64748B", size=21, align="center", before=60, after=280)

    # Phần I
    doc.heading("I. NGUYÊN TẮC BẮT BUỘC TRƯỚC KHI ĐẨY CODE (QUAN TRỌNG)", level=1)
    doc.alert_box(
        "CẢNH BÁO QUAN TRỌNG VỀ ĐÁNH GIÁ ĐÓNG GÓP",
        "Giảng viên chấm điểm bài tập lớn dựa trên biểu đồ Insights/Contributors, Network Graph và lịch sử Pull Request trên GitHub. TUYỆT ĐỐI KHÔNG để một người gom toàn bộ file rồi commit lên nhánh main. Mỗi thành viên phải dùng máy tính hoặc tài khoản Git cá nhân, tạo nhánh riêng và commit các file thuộc trách nhiệm của mình.",
        kind="WARNING"
    )

    doc.bullet("Quy tắc 1 (Cấu hình danh tính):", "Mỗi thành viên trước khi gõ lệnh commit PHẢI cấu hình git config user.name và git config user.email trùng khớp với tài khoản GitHub cá nhân đã đăng ký với nhóm.")
    doc.bullet("Quy tắc 2 (Không commit trực tiếp lên main):", "Nhánh 'main' (hoặc 'master') chỉ dùng để tích hợp. Mọi tính năng, sửa đổi đều phải thực hiện trên nhánh con (feature branch) rồi tạo Pull Request (PR).")
    doc.bullet("Quy tắc 3 (Quy chuẩn đặt tên nhánh):", "Đặt theo cú pháp: feature/<tên-tính-năng>, test/<tên-module>, docs/<tên-tài-liệu> (ví dụ: feature/bst-core, feature/console-ui, test/test-plan).")
    doc.bullet("Quy tắc 4 (Quy chuẩn đặt thông điệp Commit):", "Commit message phải có mã Task Jira tương ứng: feat(DSA-xx): <mô tả> hoặc test(DSA-xx): <mô tả>.")
    doc.bullet("Quy tắc 5 (Review chéo trước khi Merge):", "Người phụ trách task tạo PR, người được phân công review chéo vào kiểm tra code và bấm 'Approve' trước khi Trưởng nhóm bấm nút Merge.")

    # Phần II
    doc.heading("II. BẢNG PHÂN CHIA FILE & NHÁNH CỦA 5 THÀNH VIÊN", level=1)
    doc.p("Dưới đây là ma trận phân công nhiệm vụ và danh mục file tương ứng trong thư mục dự án:")

    headers = ["Mã", "Thành viên", "Nhiệm vụ chính", "Task Jira", "Tên nhánh", "File phụ trách đẩy", "Review chéo"]
    rows = [
        [
            "M1",
            "Trần Ninh Thuận\n(Trưởng nhóm)",
            "Khởi tạo repo, quản lý, kiến trúc, ghép LaTeX Ch.1 & tổng thể",
            "DSA-01\nDSA-02\nDSA-11\nDSA-15\nDSA-17",
            "init/project-setup\ndocs/planning",
            ".gitignore, README.md, docs/plan/*, docs/architecture/*, docs/meetings/README.md, src/main.cpp",
            "Review Ch.4 (M5); Tích hợp cùng M2"
        ],
        [
            "M2",
            "Phan Thế Hiệp",
            "Cấu trúc BST, Node, Thao tác Insert, Search, Erase, Duyệt cây, Giải phóng bộ nhớ, Ch.2",
            "DSA-03\nDSA-04\nDSA-05\nDSA-06\nDSA-12",
            "feature/bst-core\nfeature/book-model",
            "src/models/Book.h, Book.cpp\nsrc/bst/BSTNode.h, BST.h, BST.cpp\nsrc/include/Common.h\nassets/diagrams/*",
            "Review M3\n(Huỳnh Văn Lĩnh)"
        ],
        [
            "M3",
            "Huỳnh Văn Lĩnh",
            "Giao diện console, menu CRUD, tìm kiếm theo tên/tác giả, Web demo mượn sách, Ch.3",
            "DSA-07\nDSA-13\nDSA-18",
            "feature/console-ui\nfeature/web-demo",
            "src/ui/Menu.h, Menu.cpp\nsrc/ui/ConsoleHelper.*\nweb/index.html, styles.css, app.js, README.md",
            "Review M4\n(Lê Cường Bảo)"
        ],
        [
            "M4",
            "Lê Cường Bảo",
            "Persistence lưu/đọc CSV/text, nạp dữ liệu, xử lý file lỗi, chuẩn bị dữ liệu mẫu, Ch.3",
            "DSA-08\nDSA-09\nDSA-13",
            "feature/file-storage\ndata/sample-data",
            "src/storage/FileStorage.h, FileStorage.cpp\ndata/sample/README.md, data/sample/books.csv\nscripts/*",
            "Review M2\n(Phan Thế Hiệp)"
        ],
        [
            "M5",
            "Phạm Đức Cường",
            "Bảo đảm chất lượng, ca kiểm thử, kịch bản demo, độ phức tạp Ch.4, slide",
            "DSA-10\nDSA-14\nDSA-16",
            "test/quality-assurance\ndocs/demo-presentation",
            "tests/cases/test-plan.md, tests/cases/*\ndocs/demo/kich-ban-demo.md\ntests/results/*, docs/plan/evidence/*",
            "Review M1 & M2"
        ]
    ]
    doc.table(headers, rows, [600, 1500, 1800, 900, 1500, 2100, 1000])

    # Phần III
    doc.heading("III. HƯỚNG DẪN CHI TIẾT TỪNG DÒNG LỆNH CHO TỪNG THÀNH VIÊN", level=1)

    # 3.1 M1
    doc.heading("1. Thành viên M1 — Trần Ninh Thuận (Khởi tạo dự án & Đẩy khung quản lý)", level=2)
    doc.p("M1 là người đầu tiên tạo repository trên GitHub, thiết lập nhánh main và đẩy khung cấu trúc thư mục cùng các tài liệu quản lý dự án.")
    doc.bullet("Danh sách file M1 cần đẩy:", "")
    doc.p("- .gitignore\n- README.md\n- docs/plan/ke-hoach-tong-the.md\n- docs/plan/phan-cong.md\n- docs/plan/ma-tran-yeu-cau.md\n- docs/plan/jira-setup.md\n- docs/plan/backlog.csv\n- docs/architecture/decisions.md\n- docs/meetings/README.md\n- Các file giữ chỗ: assets/diagrams/.gitkeep, scripts/.gitkeep, src/*/.gitkeep")
    
    doc.p("Các câu lệnh M1 chạy trên máy của mình (PowerShell hoặc Git Bash):", bold=True, color="1E3A8A")
    doc.code_box([
        "# 1. Mở terminal tại thư mục gốc dự án: c:\\hoctap\\baitapctdlvagt\\BTL_CTDL&GT_QuanLySachThuVien",
        "cd c:\\hoctap\\baitapctdlvagt\\BTL_CTDL&GT_QuanLySachThuVien",
        "",
        "# 2. Cấu hình danh tính Git cá nhân của M1 (thay email và tên thật)",
        'git config user.name "Tran Ninh Thuan"',
        'git config user.email "thuan.tran@example.com"',
        "",
        "# 3. Khởi tạo Git nếu chưa khởi tạo, đổi tên nhánh mặc định thành main",
        "git init",
        "git branch -M main",
        "",
        "# 4. Thêm các file cấu hình và tài liệu quản lý của M1",
        "git add .gitignore README.md docs/ architecture/ assets/ scripts/.gitkeep src/ tests/results/.gitkeep",
        "",
        "# 5. Tạo commit khởi tạo chuẩn Conventional Commits",
        'git commit -m "chore(DSA-02): initialize project structure, README, .gitignore and management docs"',
        "",
        "# 6. Liên kết với remote repository trên GitHub (tạo trước trên github.com)",
        "# Thay link dưới đây bằng link repo thật của nhóm (HTTPS hoặc SSH)",
        "git remote add origin https://github.com/<tai_khoan_hoac_to_chuc>/BTL_CTDL-GT_QuanLySachThuVien.git",
        "",
        "# 7. Đẩy nhánh main lên GitHub",
        "git push -u origin main"
    ])
    doc.alert_box("Sau khi M1 hoàn tất:", "M1 gửi link repository GitHub cho 4 thành viên còn lại để các bạn bắt đầu clone/pull về và làm việc trên nhánh riêng.", kind="TIP")

    # 3.2 M2
    doc.heading("2. Thành viên M2 — Phan Thế Hiệp (Cấu trúc BST và Thuật toán)", level=2)
    doc.p("M2 chịu trách nhiệm về mô hình Book và toàn bộ cấu trúc dữ liệu BST (Node, các hàm insert, search, xóa 3 trường hợp, duyệt cây và giải phóng bộ nhớ).")
    doc.bullet("Danh sách file M2 phụ trách đẩy:", "")
    doc.p("- src/models/Book.h, src/models/Book.cpp\n- src/bst/BSTNode.h, src/bst/BST.h, src/bst/BST.cpp\n- src/include/Common.h (nếu có định nghĩa mã lỗi / cấu trúc phụ)\n- assets/diagrams/ (ảnh sơ đồ thuật toán cây BST, sơ đồ xóa node lá / 1 con / 2 con)")

    doc.p("Các câu lệnh M2 chạy trên máy của mình:", bold=True, color="1E3A8A")
    doc.code_box([
        "# 1. Clone repository về máy cá nhân (nếu chưa clone)",
        "git clone https://github.com/<tai_khoan_hoac_to_chuc>/BTL_CTDL-GT_QuanLySachThuVien.git",
        "cd BTL_CTDL-GT_QuanLySachThuVien",
        "",
        "# 2. Cấu hình danh tính Git của M2",
        'git config user.name "Phan The Hiep"',
        'git config user.email "hiep.phan@example.com"',
        "",
        "# 3. Đảm bảo nhánh main đang cập nhật mới nhất từ M1",
        "git checkout main",
        "git pull origin main",
        "",
        "# 4. Tạo và chuyển sang nhánh riêng của M2",
        "git checkout -b feature/bst-core",
        "",
        "# 5. Sau khi lập trình và tạo các file thuộc module BST, kiểm tra trạng thái",
        "git status",
        "",
        "# 6. Thêm các file của M2 vào danh sách commit",
        "git add src/models/ src/bst/ src/include/ assets/diagrams/",
        "",
        "# 7. Commit có gắn mã task Jira tương ứng",
        'git commit -m "feat(DSA-03,DSA-04): implement Book model and core BST insertion and search"',
        "",
        "# (Nếu commit bổ sung phần xóa cây và duyệt):",
        "# git add src/bst/BST.cpp src/bst/BST.h",
        '# git commit -m "feat(DSA-05,DSA-06): implement BST 3-case erase and LNR/NLR/LRN traversals"',
        "",
        "# 8. Đẩy nhánh feature/bst-core lên GitHub",
        "git push -u origin feature/bst-core"
    ])
    doc.alert_box("Hành động tiếp theo của M2:", "Vào giao diện web GitHub, tạo Pull Request từ feature/bst-core vào main. Gán Assignee là chính mình, gán Reviewer là M3 (Huỳnh Văn Lĩnh).", kind="TIP")

    # 3.3 M3
    doc.heading("3. Thành viên M3 — Huỳnh Văn Lĩnh (Nghiệp vụ Console & Module Web Demo)", level=2)
    doc.p("M3 chịu trách nhiệm về menu console, luồng nghiệp vụ thêm/sửa/tìm kiếm sách theo tên/tác giả, và mã nguồn mô phỏng trên nền Web (HTML/CSS/JS).")
    doc.bullet("Danh sách file M3 phụ trách đẩy:", "")
    doc.p("- src/ui/Menu.h, src/ui/Menu.cpp\n- src/ui/ConsoleHelper.h, src/ui/ConsoleHelper.cpp\n- web/index.html\n- web/styles.css\n- web/app.js\n- web/README.md")

    doc.p("Các câu lệnh M3 chạy trên máy của mình:", bold=True, color="1E3A8A")
    doc.code_box([
        "# 1. Di chuyển vào thư mục dự án và cấu hình danh tính M3",
        "cd c:\\path\\to\\BTL_CTDL-GT_QuanLySachThuVien",
        'git config user.name "Huynh Van Linh"',
        'git config user.email "linh.huynh@example.com"',
        "",
        "# 2. Cập nhật nhánh main mới nhất",
        "git checkout main",
        "git pull origin main",
        "",
        "# 3. Tạo nhánh riêng cho UI và Web",
        "git checkout -b feature/console-ui",
        "",
        "# 4. Thêm các file console UI",
        "git add src/ui/",
        'git commit -m "feat(DSA-07): implement interactive console menu and search by title/author"',
        "",
        "# 5. Thêm các file web demo (theo task DSA-18)",
        "git add web/index.html web/styles.css web/app.js web/README.md",
        'git commit -m "feat(DSA-18): add interactive web catalog with borrow request flow"',
        "",
        "# 6. Đẩy nhánh lên GitHub",
        "git push -u origin feature/console-ui"
    ])
    doc.alert_box("Hành động tiếp theo của M3:", "Tạo Pull Request trên GitHub từ nhánh feature/console-ui vào main. Gán Reviewer là M4 (Lê Cường Bảo). Đồng thời vào PR của M2 (Phan Thế Hiệp) để review và bấm Approve.", kind="TIP")

    # 3.4 M4
    doc.heading("4. Thành viên M4 — Lê Cường Bảo (Persistence & Dữ liệu mẫu)", level=2)
    doc.p("M4 chịu trách nhiệm về module nạp/lưu file (CSV/text), xử lý dòng lỗi, khôi phục dữ liệu bền vững và chuẩn bị các tập dữ liệu mẫu.")
    doc.bullet("Danh sách file M4 phụ trách đẩy:", "")
    doc.p("- src/storage/FileStorage.h, src/storage/FileStorage.cpp (hoặc CSVStorage)\n- data/sample/README.md\n- data/sample/books.csv (hoặc data/sample/books.txt, dữ liệu UTF-8 mẫu)\n- scripts/ (nếu có file script tạo dữ liệu ngẫu nhiên hoặc kiểm tra format)")

    doc.p("Các câu lệnh M4 chạy trên máy của mình:", bold=True, color="1E3A8A")
    doc.code_box([
        "# 1. Di chuyển vào thư mục dự án và cấu hình danh tính M4",
        "cd c:\\path\\to\\BTL_CTDL-GT_QuanLySachThuVien",
        'git config user.name "Le Cuong Bao"',
        'git config user.email "bao.le@example.com"',
        "",
        "# 2. Cập nhật nhánh main mới nhất",
        "git checkout main",
        "git pull origin main",
        "",
        "# 3. Tạo nhánh riêng của M4",
        "git checkout -b feature/file-storage",
        "",
        "# 4. Thêm file đọc ghi file và dữ liệu mẫu",
        "git add src/storage/ data/sample/ scripts/",
        "",
        "# 5. Commit có mã task Jira DSA-08, DSA-09",
        'git commit -m "feat(DSA-08,DSA-09): implement CSV persistence engine and sample datasets"',
        "",
        "# 6. Đẩy nhánh lên GitHub",
        "git push -u origin feature/file-storage"
    ])
    doc.alert_box("Hành động tiếp theo của M4:", "Tạo Pull Request trên GitHub từ feature/file-storage vào main. Gán Reviewer là M2 (Phan Thế Hiệp). Đồng thời vào PR của M3 (Huỳnh Văn Lĩnh) để review code và bấm Approve.", kind="TIP")

    # 3.5 M5
    doc.heading("5. Thành viên M5 — Phạm Đức Cường (Kiểm thử, Demo & Slide)", level=2)
    doc.p("M5 chịu trách nhiệm về kế hoạch và ca kiểm thử, kịch bản demo phân vai, bằng chứng chạy thực nghiệm và slide thuyết trình.")
    doc.bullet("Danh sách file M5 phụ trách đẩy:", "")
    doc.p("- tests/cases/test-plan.md, tests/cases/*\n- docs/demo/kich-ban-demo.md\n- tests/results/ (file log kết quả, ảnh chụp minh chứng pass/fail)\n- docs/plan/evidence/ (ảnh chụp tiến độ Jira, báo cáo hoàn thành task)\n- slide/ (file slide thuyết trình nếu nhóm lưu trong repository)")

    doc.p("Các câu lệnh M5 chạy trên máy của mình:", bold=True, color="1E3A8A")
    doc.code_box([
        "# 1. Di chuyển vào thư mục dự án và cấu hình danh tính M5",
        "cd c:\\path\\to\\BTL_CTDL-GT_QuanLySachThuVien",
        'git config user.name "Pham Duc Cuong"',
        'git config user.email "cuong.pham@example.com"',
        "",
        "# 2. Cập nhật nhánh main mới nhất",
        "git checkout main",
        "git pull origin main",
        "",
        "# 3. Tạo nhánh riêng cho QA và Demo",
        "git checkout -b test/quality-assurance",
        "",
        "# 4. Thêm file kế hoạch test và kịch bản demo",
        "git add tests/cases/test-plan.md docs/demo/kich-ban-demo.md",
        'git commit -m "test(DSA-10): setup test plan and demo presentation scenarios"',
        "",
        "# 5. Sau khi chạy thử có kết quả thực tế và minh chứng Jira:",
        "# git add tests/results/ docs/plan/evidence/",
        '# git commit -m "test(DSA-14,DSA-16): record actual test logs and Jira sprint evidence"',
        "",
        "# 6. Đẩy nhánh lên GitHub",
        "git push -u origin test/quality-assurance"
    ])
    doc.alert_box("Hành động tiếp theo của M5:", "Tạo Pull Request từ nhánh test/quality-assurance vào main. Gán Reviewer là M1 (Trần Ninh Thuận) hoặc M2 (Phan Thế Hiệp).", kind="TIP")

    # Phần IV
    doc.heading("IV. QUY TRÌNH REVIEW CHÉO VÀ MERGE PULL REQUEST TRÊN GITHUB", level=1)
    doc.p("Để lịch sử Git của nhóm đẹp, chuyên nghiệp và có đầy đủ bằng chứng đánh giá đóng góp, nhóm thực hiện theo 4 bước chuẩn:")
    doc.bullet("Bước 1 (Mở PR):", "Sau khi push nhánh, vào GitHub sẽ thấy banner màu vàng 'Compare & pull request'. Bấm vào đó, điền tiêu đề có mã Task (ví dụ: [DSA-04] Implement BST core) và mô tả ngắn các file đã thêm.")
    doc.bullet("Bước 2 (Gán Reviewer):", "Ở cột bên phải, chọn đúng người review chéo theo phân công ở Mục II.")
    doc.bullet("Bước 3 (Thực hiện Review):", "Người review mở tab 'Files changed', đọc kỹ code xem có vi phạm cấu trúc hoặc rò rỉ bộ nhớ không. Nếu ổn, chọn 'Review changes' -> tick 'Approve' -> bấm 'Submit review'.")
    doc.bullet("Bước 4 (Merge vào main):", "Trưởng nhóm M1 (hoặc người tạo PR sau khi đủ Approve) bấm nút 'Merge pull request'. CHÚ Ý: Chọn chế độ 'Create a merge commit' (hoặc Rebase and merge), KHÔNG nên chọn 'Squash and merge' nếu muốn giữ lại từng commit của từng bạn.")

    # Phần V
    doc.heading("V. CẨM NANG XỬ LÝ 6 LỖI GIT THƯỜNG GẶP (TRÁNH BỊ LỖI)", level=1)

    doc.heading("Lỗi 1: Đẩy code bị từ chối [rejected - non-fast-forward / fetch first]", level=3)
    doc.p("Nguyên nhân: Nhánh main trên remote đã có thành viên khác vừa merge code mới vào, máy bạn chưa có phần code đó.")
    doc.p("Cách khắc phục an toàn từng bước:", bold=True)
    doc.code_box([
        "# Đang ở trên nhánh feature của bạn, lưu thay đổi tạm thời:",
        "git pull --rebase origin main",
        "# Nếu không có xung đột, tiếp tục đẩy:",
        "git push origin <ten-nhanh-cua-ban>"
    ])

    doc.heading("Lỗi 2: Xung đột mã nguồn (Merge Conflict)", level=3)
    doc.p("Nguyên nhân: Hai người cùng sửa một dòng code trong cùng một file.")
    doc.p("Dấu hiệu nhận biết: Trong file xuất hiện các ký hiệu lạ:")
    doc.code_box([
        "<<<<<<< HEAD",
        "// Code hiện tại trên nhánh của bạn",
        "=======",
        "// Code của thành viên khác từ nhánh main kéo về",
        ">>>>>>> main"
    ])
    doc.p("Cách xử lý: Mở file bị conflict bằng VS Code. Bấm chọn 'Accept Current Change', 'Accept Incoming Change' hoặc chỉnh sửa lại cho đúng ý cả hai. Sau đó xóa bỏ các ký hiệu <<<<<<<, =======, >>>>>>> rồi chạy:")
    doc.code_box([
        "git add <file-da-sua-xong>",
        "git rebase --continue  # (hoặc git commit nếu đang dùng merge)"
    ])

    doc.heading("Lỗi 3: Lỡ commit sai tên hoặc sai email (không hiện avatar trên GitHub)", level=3)
    doc.p("Nguyên nhân: Chưa chạy lệnh git config user.name / user.email trước khi commit.")
    doc.p("Cách khắc phục (khi CHƯA push lên GitHub):", bold=True)
    doc.code_box([
        'git config user.name "Ten Dung Cua Ban"',
        'git config user.email "email_dung_cua_ban@example.com"',
        "git commit --amend --reset-author --no-edit"
    ])

    doc.heading("Lỗi 4: Đang code dở nhưng muốn kéo code mới nhất từ main về", level=3)
    doc.p("Cách xử lý dùng stash (cất tạm thời rồi lấy lại):", bold=True)
    doc.code_box([
        "git stash            # Cất tạm code dở vào ngăn chứa bí mật",
        "git checkout main",
        "git pull origin main # Kéo code mới nhất",
        "git checkout <nhanh-cua-ban>",
        "git merge main       # Hoặc git rebase main",
        "git stash pop        # Mở ngăn chứa, lấy lại code dở ra làm tiếp"
    ])

    doc.heading("Lỗi 5: Lỡ add nhầm file rác / file biên dịch (.exe, .o, build/)", level=3)
    doc.p("Cách xử lý gỡ file ra khỏi Git mà không xóa file thật trên máy tính:", bold=True)
    doc.code_box([
        "git rm --cached <ten-file-lo-add>",
        "# Hoặc gỡ cả thư mục:",
        "git rm -r --cached build/",
        "# Kiểm tra lại .gitignore xem đã có *.exe, *.o chưa, sau đó commit:",
        'git commit -m "chore: remove untracked build artifacts from git index"'
    ])

    doc.heading("Lỗi 6: Lỗi fatal: refusing to merge unrelated histories", level=3)
    doc.p("Nguyên nhân: Tạo repo trên GitHub có tick tạo sẵn README, trong khi máy local cũng đã commit riêng.")
    doc.p("Cách xử lý:", bold=True)
    doc.code_box([
        "git pull origin main --allow-unrelated-histories"
    ])

    # Phần VI
    doc.heading("VI. BẢNG TRA CỨU NHANH CÁC LỆNH GIT THƯỜNG DÙNG", level=1)
    cheat_headers = ["Mục đích", "Lệnh Git"]
    cheat_rows = [
        ["Kiểm tra trạng thái các file (đã sửa, đã stage)", "git status"],
        ["Xem danh sách các commit gần nhất", "git log --oneline --graph --decorate"],
        ["Tạo và chuyển sang nhánh mới", "git checkout -b <ten-nhanh>"],
        ["Chuyển qua lại giữa các nhánh", "git checkout <ten-nhanh>"],
        ["Đưa file vào danh sách chuẩn bị commit", "git add <duong-dan-file> (hoặc git add .)"],
        ["Tạo commit với mô tả", 'git commit -m "loai(task): noi dung"'],
        ["Kéo cập nhật mới nhất từ nhánh main", "git pull origin main"],
        ["Đẩy nhánh lên GitHub lần đầu tiên", "git push -u origin <ten-nhanh>"],
        ["Hủy bỏ các sửa đổi chưa stage trong file", "git checkout -- <file> (hoặc git restore <file>)"]
    ]
    doc.table(cheat_headers, cheat_rows, [3800, 5600])

    # Footer note
    doc.p("Chúc nhóm hoàn thành xuất sắc đồ án Cấu trúc Dữ liệu & Giải thuật!", bold=True, color="0F3B66", size=24, align="center", before=200, after=60)
    doc.p("Tài liệu được khởi tạo đồng bộ với backlog Jira và ma trận phân công của Đề tài 04.", italic=True, color="64748B", size=20, align="center", before=40, after=120)

    # Save to both paths
    target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Huong_Dan_Day_Code_GitHub_Tung_Thanh_Vien.docx"))
    doc.save(target_path)
    
    docs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "plan", "Huong_Dan_Day_Code_GitHub_Tung_Thanh_Vien.docx"))
    doc.save(docs_path)
    print(f"File created at:\n1. {target_path}\n2. {docs_path}")

if __name__ == '__main__':
    build_document()
