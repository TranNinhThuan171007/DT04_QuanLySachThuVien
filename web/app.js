"use strict";

const STORAGE_KEY = "muc-luc-library-catalog-v1";
const CURATED_MIGRATION_KEY = "muc-luc-library-curated-books-2026-v1";
const SAMPLE_METADATA_MIGRATION_KEY = "muc-luc-library-sample-metadata-2026-v1";
const READERS_STORAGE_KEY = "muc-luc-library-readers-v1";
const LOANS_STORAGE_KEY = "muc-luc-library-loans-v1";
const BORROW_REQUESTS_STORAGE_KEY = "muc-luc-library-borrow-requests-v1";
const FAVORITES_STORAGE_KEY = "muc-luc-library-favorites-v1";
const THEME_STORAGE_KEY = "muc-luc-library-theme-v1";
const CATALOG_VIEW_STORAGE_KEY = "muc-luc-library-catalog-view-v1";
const AUTH_SESSION_KEY = "muc-luc-library-demo-user-v1";
const REGISTERED_ACCOUNTS_KEY = "muc-luc-library-registered-accounts-v1";
const DEMO_ACCOUNTS = {
  admin: { username: "admin", password: "123456", role: "admin", roleLabel: "Quản trị viên" },
  docgia: { username: "docgia", password: "123456", role: "borrower", roleLabel: "Người mượn", readerId: "DG-DEMO-001" },
};

function readRegisteredAccounts() {
  try {
    const raw = window.localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistRegisteredAccounts(accounts) {
  try {
    window.localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Keep working even if storage fails.
  }
}

function getAllAccounts() {
  return { ...DEMO_ACCOUNTS, ...readRegisteredAccounts() };
}
const DEMO_BORROWER_READER = { id: "DG-DEMO-001", name: "Độc giả demo", phone: "", email: "" };
const SAMPLE_BOOKS = [
  { isbn: "9780321563842", title: "The C++ Programming Language", author: "Bjarne Stroustrup", publisher: "Addison-Wesley", year: 2013, category: "Lập trình" },
  { isbn: "9780134685991", title: "Effective Java", author: "Joshua Bloch", publisher: "Addison-Wesley", year: 2017, category: "Lập trình" },
  { isbn: "9780596007126", title: "Head First Design Patterns", author: "Eric Freeman và cộng sự", publisher: "O'Reilly Media", year: 2004, category: "Thiết kế phần mềm" },
  { isbn: "9780201633610", title: "Design Patterns", author: "Erich Gamma và cộng sự", publisher: "Addison-Wesley", year: 1994, category: "Thiết kế phần mềm" },
  { isbn: "9780131103627", title: "The C Programming Language", author: "Brian W. Kernighan và Dennis M. Ritchie", publisher: "Prentice Hall", year: 1988, category: "Cấu trúc dữ liệu" },
  { isbn: "9780321125217", title: "Domain-Driven Design", author: "Eric Evans", publisher: "Addison-Wesley", year: 2003, category: "Kiến trúc phần mềm" },
  { isbn: "9780132350884", title: "Clean Code", author: "Robert C. Martin", publisher: "Prentice Hall", year: 2008, category: "Lập trình" },
  { isbn: "9780135957059", title: "The Pragmatic Programmer", author: "David Thomas và Andrew Hunt", publisher: "Addison-Wesley", year: 2019, category: "Thiết kế phần mềm" },
  { isbn: "9781491950296", title: "Programming JavaScript Applications", author: "Eric Elliott", publisher: "O'Reilly Media", year: 2014, category: "Lập trình web" },
];
const CURATED_BOOKS = [
  { isbn: "9780262046305", title: "Introduction to Algorithms", author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest và Clifford Stein", publisher: "The MIT Press", year: 2022, category: "Thuật toán" },
  { isbn: "9780132847377", title: "Data Structures and Algorithm Analysis in C++", author: "Mark Allen Weiss", publisher: "Pearson", year: 2013, category: "Cấu trúc dữ liệu" },
  { isbn: "9781266045479", title: "Discrete Mathematics and Its Applications", author: "Kenneth H. Rosen", publisher: "McGraw Hill", year: 2025, category: "Toán rời rạc" },
  { isbn: "9780133970777", title: "Fundamentals of Database Systems", author: "Ramez Elmasri và Shamkant B. Navathe", publisher: "Pearson", year: 2015, category: "Cơ sở dữ liệu" },
  { isbn: "9780137503148", title: "Software Engineering", author: "Ian Sommerville", publisher: "Pearson", year: 2021, category: "Công nghệ phần mềm" },
  { isbn: "9780135415603", title: "Computer Networking: A Top-Down Approach", author: "James F. Kurose và Keith W. Ross", publisher: "Pearson", year: 2025, category: "Mạng máy tính" },
  { isbn: "9781119800361", title: "Operating System Concepts", author: "Abraham Silberschatz, Peter B. Galvin và Greg Gagne", publisher: "Wiley", year: 2021, category: "Hệ điều hành" },
  { isbn: "9780134610993", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell và Peter Norvig", publisher: "Pearson", year: 2020, category: "Trí tuệ nhân tạo" },
  { isbn: "9780134092669", title: "Computer Systems: A Programmer's Perspective", author: "Randal E. Bryant và David R. O'Hallaron", publisher: "Pearson", year: 2015, category: "Kiến trúc máy tính" },
];
const DEFAULT_BOOKS = [...SAMPLE_BOOKS, ...CURATED_BOOKS];
const BOOK_SOURCE_URLS = {
  "9780321563842": "https://www.stroustrup.com/4th.html",
  "9780134685991": "https://www.pearson.com/en-us/subject-catalog/p/effective-java/P200000000138/9780134685991",
  "9780596007126": "https://www.oreilly.com/library/view/head-first-design/0596007124/",
  "9780201633610": "https://www.pearson.com/en-us/subject-catalog/p/design-patterns-elements-of-reusable-object-oriented-software/P200000009480",
  "9780131103627": "https://www.pearson.com/en-au/subject-catalog/p/c-programming-language/P200000000368/9780131103627",
  "9780321125217": "https://www.pearson.com/en-gb/subject-catalog/p/domain-driven-design-tackling-complexity-in-the-heart-of-software/P200000009375/9780321125217",
  "9780132350884": "https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000009044/9780132350884",
  "9780135957059": "https://www.pearson.com/en-us/subject-catalog/p/pragmatic-programmer-the-your-journey-to-mastery-20th-anniversary-edition/P200000000337/9780135957059",
  "9781491950296": "https://www.oreilly.com/library/view/programming-javascript-applications/9781491950289/",
  "9780262046305": "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
  "9780132847377": "https://www.pearson.com/en-us/subject-catalog/p/data-structures-and-algorithm-analysis-in-c/P200000003459/9780133404180",
  "9781266045479": "https://www.mheducation.com/highered/product/discrete-mathematics-and-its-applications-rosen.html?isbn=9781266045479",
  "9780133970777": "https://www.pearson.com/en-us/subject-catalog/p/redirected-product/P200000003546/9780133970777",
  "9780137503148": "https://www.pearson.com/en-us/subject-catalog/p/software-engineering/P200000003258/9780137503148",
  "9780135415603": "https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000013385/9780135415603",
  "9781119800361": "https://www.wiley.com/en-us/operating-system-concepts-10th-edition-p-9781119800361",
  "9780134610993": "https://www.pearson.com/en-us/subject-catalog/p/artificial-intelligence-a-modern-approach/P200000003500/9780134610993",
  "9780134092669": "https://www.pearson.com/en-us/subject-catalog/p/computer-systems-a-programmers-perspective/P200000003479/9780134092669",
};
const PUBLISHER_COVER_URLS = {
  "9780321563842": "https://www.stroustrup.com/English4.jpg",
  "9780134685991": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1017-08-47-51-A101708475113-A101708475113-Lrg.jpg?context=bWFzdGVyfGltYWdlc3w0MDMxM3xpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2hlMi9oMGYvMTU0ODc2OTU4MTQ2ODYvc2l6ZV9XMzcwXy9BMTAxNy8wOC80Ny81MS9BMTAxNzA4NDc1MTEzL0ExMDE3MDg0NzUxMTNfTHJnLmpwZ3wxMDNlMjE2ODE5Nzk2OTg2MTQ4Nzg1ZTNlYzdkMDhkZDg3N2NlZmMxYjE2MTEwOWU4OGI0NzRhMzBiYTAwMjEw&imwidth=3840",
  "9780596007126": "https://www.oreilly.com/covers/urn%3Aorm%3Abook%3A0596007124/296w/?format=webp",
  "9780201633610": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1000-60-92-72-A100060927231-A100060927231-Lrg.jpg?context=bWFzdGVyfGltYWdlc3w1Njc3MHxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2hjMC9oYmQvMTU1MTE1ODYwMTMyMTQvc2l6ZV9XMzcwXy9BMTAwMC82MC85Mi83Mi9BMTAwMDYwOTI3MjMxL0ExMDAwNjA5MjcyMzFfTHJnLmpwZ3xhODkyYjliYTU4YzBkYWIyMmM1MmRkNzllMzA3NDE2ZmE5Y2Y4MmI0MWI5MjYwNjY4ZDVjZGY0MDE3MjY4NzZk&imwidth=3840",
  "9780131103627": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1000-60-79-25-A100060792564-A100060792564-Lrg.jpg?context=bWFzdGVyfGltYWdlc3wzMTY5NHxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkZC9oM2MvMTU0ODUzNTY0NzQzOTgvc2l6ZV9XMzcwXy9BMTAwMC82MC83OS8yNS9BMTAwMDYwNzkyNTY0L0ExMDAwNjA3OTI1NjRfTHJnLmpwZ3xjZjkwNmY5ZTExNmFlN2M1NWM3OGIwNTk1MmEwZWY0OTE4YWQ5MjdjY2RiMmQwOGFkOTczNDRjNTMxOTM5ZTJj&imwidth=3840",
  "9780321125217": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1000-61-16-28-A100061162837-A100061162837-Lrg.jpg?context=bWFzdGVyfGltYWdlc3w1NDkyMXxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2hhZS9oYzkvMTU0OTUzMTUwNjI4MTQvc2l6ZV9XMzcwXy9BMTAwMC82MS8xNi8yOC9BMTAwMDYxMTYyODM3L0ExMDAwNjExNjI4MzdfTHJnLmpwZ3w3M2FmNjIzOThjOGIyYmFlZjRmODA3YzUzYjFhMjgzNzkwNmY1NGI3NzE0NDlkOTkzMGM0YWRjNmFmOTNhYjhj&imwidth=3840",
  "9780132350884": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1000-60-93-90-A100060939014-A100060939014-Lrg.jpg?context=bWFzdGVyfGltYWdlc3wzMjIyNXxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNi9oYzcvMTU0OTcxODI1NDM5MDIvc2l6ZV9XMzcwXy9BMTAwMC82MC85My85MC9BMTAwMDYwOTM5MDE0L0ExMDAwNjA5MzkwMTRfTHJnLmpwZ3xlMzkxNWFiZjg2MWY4MGViOWVlY2I1NGY2MzA4OTZkMTQ0MGI5NDYwZTAzYjQ5MzJiMWY1NzQ5YjdlZTQzNjU4&imwidth=3840",
  "9780135957059": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1030-00-12-82-A103000128211-A103000128211-Lrg.jpg?context=bWFzdGVyfGltYWdlc3w3MjQ3MHxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2gzMy9oZmQvMTU1MTI1MTYzNjIyNzAvc2l6ZV9XMzcwXy9BMTAzMC8wMC8xMi84Mi9BMTAzMDAwMTI4MjExL0ExMDMwMDAxMjgyMTFfTHJnLmpwZ3xlMDBjN2MwNzdkYTk2YWZjNjZkOTBhNmZkMzJjNjkyYjRiMGE4NDZkN2QwZDBkOWYzMzU1YTQ4YzllYzlhYTVm&imwidth=3840",
  "9781491950296": "https://www.oreilly.com/covers/urn%3Aorm%3Abook%3A9781491950289/296w/?format=webp",
  "9780262046305": "https://mit-press-new-us.imgix.net/covers/9780262046305.jpg?auto=format&w=400",
  "9780132847377": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-bigcovers-0133404188.jpg?context=bWFzdGVyfGltYWdlc3w1MzQxM3xpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2gxYi9oNjMvMTUzMzE5NzM2OTM0NzAvc2l6ZV9XMzcwXy9iaWdjb3ZlcnMvMDEzMzQwNDE4OC5qcGd8NTUwMGNkZWFhOGFmODFlNjcyZjQ2ZTRmYmZkNmI0ZmYwMzIwYTc3YTI0ZDIyYzAyMzZjNTU1OTQ4ZmQwYWJhYQ&imwidth=3840",
  "9781266045479": "https://www.mheducation.com/cover-images/Webp_400-wide/1266045473.webp",
  "9780133970777": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-bigcovers-0133970779.jpg?context=bWFzdGVyfGltYWdlc3w4NTM0OXxpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2gxMy9oOTAvMTU0OTE4NzMyMTAzOTgvc2l6ZV9XMzcwXy9iaWdjb3ZlcnMvMDEzMzk3MDc3OS5qcGd8ZTExY2E0Mzc4ZDVmMTdkNjEyN2EyZGQ0MmYwYWU0Y2U4MjE3NzU1ZGQ4ODg0NmVjNTYyMThiYTU4ZTA0YzVmNg&imwidth=3840",
  "9780137503148": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1030-00-25-98-A103000259841-A103000259841-Lrg.jpg?context=bWFzdGVyfGltYWdlc3wyMzM0NzN8aW1hZ2UvanBlZ3xzeXMtbWFzdGVyL2ltYWdlcy9oODEvaGRlLzE1NDM5NTg4MjYxOTE4L3NpemVfVzM3MF8vQTEwMzAvMDAvMjUvOTgvQTEwMzAwMDI1OTg0MS9BMTAzMDAwMjU5ODQxX0xyZy5qcGd8NjAyYjk3NWJiNGQ2YTYzMWQ2ZTQyZGQ4MGE1ZjVmOTcyOGU2YjIyNTk5YTExZTllYjM1ZjJhNDk2OWMwNzA1NA&imwidth=3840",
  "9780135415603": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1030-00-40-63-A103000406341-A103000406341-Lrg.jpg?context=bWFzdGVyfGltYWdlc3wyMTMzMjN8aW1hZ2UvanBlZ3xzeXMtbWFzdGVyL2ltYWdlcy9oMDIvaDAyLzE1NTA3Mzg5MzE3MTUwL3NpemVfVzM3MF8vQTEwMzAvMDAvNDAvNjMvQTEwMzAwMDQwNjM0MS9BMTAzMDAwNDA2MzQxX0xyZy5qcGd8NTYzZTg4YjcyYThmNmJiYjEzNzlhMGY3NDU5NzYzNzc4OGY0OTMyMGE4NDZjNmY5MGEwMGYxM2YyODFjMjk3NA&imwidth=3840",
  "9781119800361": "https://media.wiley.com/product_data/coverImage300/66/11198003/1119800366.jpg",
  "9780134610993": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-A1017-04-64-16-A101704641637-A101704641637-Lrg.jpg?context=bWFzdGVyfGltYWdlc3wxNzQ4NTR8aW1hZ2UvanBlZ3xzeXMtbWFzdGVyL2ltYWdlcy9oNDYvaDZjLzE1NDk1NDUwMjYzNTgyL3NpemVfVzM3MF8vQTEwMTcvMDQvNjQvMTYvQTEwMTcwNDY0MTYzNy9BMTAxNzA0NjQxNjM3X0xyZy5qcGd8M2RjOTYxMDEwNTQ0YzlhZWRjMzAzNWI2N2UxMzZjYjQ5ODExNzcxN2UzOGZjN2QxMDA2YjY4NjYyMTkwNWJlZA&imwidth=3840",
  "9780134092669": "https://www.pearson.com/store/pmccommercewebservices/v2/medias/size-W370-bigcovers-013409266X.jpg?context=bWFzdGVyfGltYWdlc3wzMzcwN3xpbWFnZS9qcGVnfHN5cy1tYXN0ZXIvaW1hZ2VzL2g0Ni9oZGQvMTU1MDY1OTQyOTk5MzQvc2l6ZV9XMzcwXy9iaWdjb3ZlcnMvMDEzNDA5MjY2WC5qcGd8MmJiNTZlNGI4OThhZDMyOGFiMzE4MDk1NjVmMTMzNzMwMDA4NzI5MWViZDQ5MmU5MWE2ZjEwMjY3NGIxNzFkMQ&imwidth=3840",
};

const normalizeISBN = (value) => String(value ?? "").trim().replace(/[\s-]/g, "").toUpperCase();
const validISBNShape = (value) => /^\d{13}$/.test(normalizeISBN(value)) || /^\d{9}[\dX]$/.test(normalizeISBN(value));
function validISBN(value) {
  const isbn = normalizeISBN(value);
  if (/^\d{13}$/.test(isbn)) {
    const sum = [...isbn.slice(0, 12)].reduce((total, digit, index) =>
      total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
    return (10 - (sum % 10)) % 10 === Number(isbn[12]);
  }
  if (/^\d{9}[\dX]$/.test(isbn)) {
    const sum = [...isbn.slice(0, 9)].reduce((total, digit, index) =>
      total + Number(digit) * (10 - index), 0);
    return (sum + (isbn[9] === "X" ? 10 : Number(isbn[9]))) % 11 === 0;
  }
  return false;
}
function normalizeCoverUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

class BookBST {
  constructor(records) {
    this.root = null;
    this.size = 0;
    (records || []).forEach((book) => this.insert(book));
  }
  insert(book) {
    let inserted = false;
    const place = (node) => {
      if (!node) {
        inserted = true;
        return { book, left: null, right: null };
      }
      if (book.isbn === node.book.isbn) return node;
      if (book.isbn < node.book.isbn) node.left = place(node.left);
      else node.right = place(node.right);
      return node;
    };
    this.root = place(this.root);
    if (!inserted) throw new Error("ISBN đã tồn tại trong cây.");
    this.size += 1;
  }
  find(isbn) {
    const key = normalizeISBN(isbn);
    let node = this.root;
    while (node) {
      if (key === node.book.isbn) return node.book;
      node = key < node.book.isbn ? node.left : node.right;
    }
    return null;
  }
  update(book) {
    let node = this.root;
    while (node) {
      if (book.isbn === node.book.isbn) {
        node.book = book;
        return true;
      }
      node = book.isbn < node.book.isbn ? node.left : node.right;
    }
    return false;
  }
  remove(isbn) {
    const key = normalizeISBN(isbn);
    let removed = false;
    const takeMinimum = (node) => {
      if (!node.left) return node.right;
      node.left = takeMinimum(node.left);
      return node;
    };
    const erase = (node) => {
      if (!node) return null;
      if (key < node.book.isbn) node.left = erase(node.left);
      else if (key > node.book.isbn) node.right = erase(node.right);
      else {
        removed = true;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.book = successor.book;
        node.right = takeMinimum(node.right);
      }
      return node;
    };
    this.root = erase(this.root);
    if (removed) this.size -= 1;
    return removed;
  }
  traverse(order) {
    const result = [];
    const walk = (node) => {
      if (!node) return;
      if (order === "NLR") result.push(node.book);
      walk(node.left);
      if (order === "LNR") result.push(node.book);
      walk(node.right);
      if (order === "LRN") result.push(node.book);
    };
    walk(this.root);
    return result;
  }
  search(query) {
    const text = String(query ?? "").trim().toLocaleLowerCase("vi");
    const isbnPart = normalizeISBN(query);
    if (!text) return this.traverse("LNR");
    return this.traverse("LNR").filter((book) =>
      book.isbn.includes(isbnPart) ||
      [book.title, book.author, book.publisher, book.category]
        .some((value) => String(value).toLocaleLowerCase("vi").includes(text))
    );
  }
  height() {
    const measure = (node) => node ? 1 + Math.max(measure(node.left), measure(node.right)) : 0;
    return measure(this.root);
  }
}

function readBooks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return DEFAULT_BOOKS.map((book) => ({ ...book }));
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Dữ liệu lưu sai định dạng.");
    const seen = new Set();
    let records = parsed.filter((book) => {
      const isbn = normalizeISBN(book && book.isbn);
      // Keep older shape-valid records even if their check digit is wrong; never discard saved user data during upgrade.
      if (!book || !validISBNShape(isbn) || seen.has(isbn)) return false;
      seen.add(isbn);
      return true;
    })
      .map((book) => ({
        isbn: normalizeISBN(book.isbn),
        title: String(book.title ?? ""),
        author: String(book.author ?? ""),
        publisher: String(book.publisher ?? ""),
        year: book.year ? Number(book.year) : "",
        category: String(book.category ?? "Chưa phân loại"),
        coverUrl: normalizeCoverUrl(book.coverUrl) || "",
      }));
    const needsMetadataMigration = window.localStorage.getItem(SAMPLE_METADATA_MIGRATION_KEY) !== "done";
    const needsCuratedMigration = window.localStorage.getItem(CURATED_MIGRATION_KEY) !== "done";
    let needsSave = false;
    if (needsMetadataMigration) {
      records = records.map((book) => {
        if (book.isbn === "9781491950296" && book.title === "Learning JavaScript Design Patterns" && book.author === "Addy Osmani") {
          needsSave = true;
          return { ...book, title: "Programming JavaScript Applications", author: "Eric Elliott", publisher: "O'Reilly Media", year: 2014 };
        }
        return book;
      });
    }
    if (needsCuratedMigration) {
      const existing = new Set(records.map((book) => book.isbn));
      records = [...records, ...CURATED_BOOKS.filter((book) => !existing.has(book.isbn)).map((book) => ({ ...book }))];
      needsSave = true;
    }
    if (needsSave || needsMetadataMigration || needsCuratedMigration) {
      try {
        if (needsSave) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        if (needsMetadataMigration) window.localStorage.setItem(SAMPLE_METADATA_MIGRATION_KEY, "done");
        if (needsCuratedMigration) window.localStorage.setItem(CURATED_MIGRATION_KEY, "done");
      } catch {
        // Keep curated additions in memory if browser storage is unavailable.
      }
    }
    return records;
  } catch {
    return DEFAULT_BOOKS.map((book) => ({ ...book }));
  }
}

function readStoredArray(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
function readPreference(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

let books = readBooks();
let bst = new BookBST(books);
let readers = readStoredArray(READERS_STORAGE_KEY).filter((reader) => reader && reader.id && reader.name);
const needsDemoReaderSeed = !readers.some((reader) => reader.id === DEMO_BORROWER_READER.id);
if (needsDemoReaderSeed) readers = [...readers, { ...DEMO_BORROWER_READER }];
let loans = readStoredArray(LOANS_STORAGE_KEY).filter((loan) => loan && loan.id && loan.isbn && loan.readerId);
let borrowRequests = readStoredArray(BORROW_REQUESTS_STORAGE_KEY).filter((request) =>
  request && request.id && request.isbn && request.readerId && ["pending", "approved", "rejected"].includes(request.status)
);
let favorites = readStoredArray(FAVORITES_STORAGE_KEY).filter((favorite) => favorite && favorite.readerId && favorite.isbn);
let currentUser = null;
let activeView = "catalog";
let activeTraversal = "LNR";
const savedCatalogView = readPreference(CATALOG_VIEW_STORAGE_KEY, "grid");
let catalogView = ["list", "grid"].includes(savedCatalogView) ? savedCatalogView : "grid";
let favoritesOnly = false;
let editingISBN = null;
let deletingISBN = null;
let returnFocus = null;
let toastTimer = null;

const $ = (selector) => document.querySelector(selector);
const ui = {
  loginScreen: $("#login-screen"), appShell: $("#app-shell"),
  tabLogin: $("#tab-login"), tabRegister: $("#tab-register"),
  loginPanel: $("#login-panel"), registerPanel: $("#register-panel"),
  linkToRegister: $("#link-to-register"), linkToLogin: $("#link-to-login"),
  loginForm: $("#login-form"), loginUsername: $("#login-username"),
  loginPassword: $("#login-password"), loginError: $("#login-error"),
  togglePassword: $("#toggle-password"),
  registerForm: $("#register-form"), registerFullname: $("#register-fullname"),
  registerUsername: $("#register-username"), registerPhone: $("#register-phone"),
  registerEmail: $("#register-email"), registerPassword: $("#register-password"),
  registerPasswordConfirm: $("#register-password-confirm"), registerError: $("#register-error"),
  toggleRegisterPassword: $("#toggle-register-password"),
  accountName: $("#account-name"),
  roleBadge: $("#role-badge"), profileMark: $("#profile-mark"),
  logoutButton: $("#logout-button"), themeToggle: $("#theme-toggle"), themeToggleLabel: $("#theme-toggle-label"),
  nav: [...document.querySelectorAll(".nav-item[data-view]")],
  catalog: $("#catalog-view"), treeView: $("#tree-view"), breadcrumb: $("#breadcrumb-current"),
  circulation: $("#circulation-view"), myLoans: $("#my-loans-view"), analytics: $("#analytics-view"),
  search: $("#book-search"), clearSearch: $("#clear-search"), category: $("#category-filter"),
  authorFilter: $("#author-filter"), yearFilter: $("#year-filter"), sort: $("#catalog-sort"),
  catalogTable: $("#catalog-table"), bookGrid: $("#book-grid"), featuredBooks: $("#featured-books"),
  featuredCopy: $("#featured-copy"), listViewButton: $("#list-view-button"), gridViewButton: $("#grid-view-button"),
  favoritesFilter: $("#favorites-filter"), favoritesCount: $("#favorites-count"),
  rows: $("#book-rows"), empty: $("#empty-state"), emptyTitle: $("#empty-title"), emptyCopy: $("#empty-copy"),
  results: $("#results-meta"), visible: $("#visible-count"), booksCount: $("#stat-books"),
  authorsCount: $("#stat-authors"), categoriesCount: $("#stat-categories"), navCount: $("#nav-count"),
  storage: $("#storage-label"), bookDialog: $("#book-dialog"), form: $("#book-form"),
  dialogTitle: $("#book-dialog-title"), dialogEyebrow: $("#dialog-eyebrow"),
  isbn: $("#isbn-input"), title: $("#title-input"), author: $("#author-input"),
  publisher: $("#publisher-input"), year: $("#year-input"), categoryInput: $("#category-input"),
  coverUrl: $("#cover-url-input"),
  categoryOptions: $("#category-options"), formError: $("#form-error"), saveButton: $("#save-book-button"),
  deleteDialog: $("#delete-dialog"), deleteCopy: $("#delete-dialog-copy"),
  diagram: $("#bst-diagram"), treeEmpty: $("#tree-empty"), treeCount: $("#tree-node-count"),
  treeHeight: $("#tree-height"), traversalDescription: $("#traversal-description"),
  traversalList: $("#traversal-list"), toast: $("#toast"),
  importInput: $("#import-books-input"),
  activeLoansCount: $("#active-loan-count"), overdueLoansCount: $("#overdue-loan-count"),
  readersCount: $("#reader-count"), availableBooksCount: $("#available-book-count"),
  loanRows: $("#loan-rows"), loanEmpty: $("#loan-empty"), loanStatusFilter: $("#loan-status-filter"),
  requestRows: $("#request-rows"), requestEmpty: $("#request-empty"), pendingRequestCount: $("#pending-request-count"),
  myLoanRows: $("#my-loan-rows"), myLoanEmpty: $("#my-loan-empty"),
  myLoansCount: $("#my-loans-count"), myActiveLoansCount: $("#my-active-loans-count"),
  myOverdueLoansCount: $("#my-overdue-loans-count"), myPendingRequestsCount: $("#my-pending-requests-count"),
  readerRows: $("#reader-rows"), readerEmpty: $("#reader-empty"),
  analyticsBooks: $("#analytics-books"), analyticsActive: $("#analytics-active"),
  analyticsReturned: $("#analytics-returned"), analyticsOverdue: $("#analytics-overdue"),
  categoryChart: $("#category-chart"), popularList: $("#popular-books-list"), popularEmpty: $("#popular-empty"),
  readerDialog: $("#reader-dialog"), readerForm: $("#reader-form"), readerName: $("#reader-name-input"),
  readerPhone: $("#reader-phone-input"), readerEmail: $("#reader-email-input"), readerFormError: $("#reader-form-error"),
  loanDialog: $("#loan-dialog"), loanForm: $("#loan-form"), loanReader: $("#loan-reader-input"),
  loanBook: $("#loan-book-input"), loanDue: $("#loan-due-input"), loanFormError: $("#loan-form-error"),
};

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  ui.themeToggle.setAttribute("aria-pressed", String(isDark));
  ui.themeToggleLabel.textContent = isDark ? "Chế độ sáng" : "Chế độ tối";
  const label = isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
  ui.themeToggle.setAttribute("aria-label", label);
  ui.themeToggle.title = label;
}

applyTheme(readPreference(THEME_STORAGE_KEY, "light"));

function getAccountInitials(account) {
  if (!account) return "DG";
  if (account.role === "admin") return "AD";
  const name = account.fullname || (account.readerId ? getReaderName(account.readerId) : "") || account.username || "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  if (words.length === 1 && words[0].length >= 2) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return "DG";
}

function setAuthenticated(username) {
  const previousReaderId = currentUser?.readerId || "";
  currentUser = Object.values(getAllAccounts()).find((account) => account.username === username) || null;
  if (previousReaderId !== (currentUser?.readerId || "")) favoritesOnly = false;
  const authenticated = Boolean(currentUser);
  ui.loginScreen.hidden = authenticated;
  ui.appShell.hidden = !authenticated;
  $(".skip-link").href = authenticated ? "#main-content" : "#login-username";
  applyRolePermissions();
  if (authenticated) {
    ui.accountName.textContent = currentUser.role === "admin" ? currentUser.username : (currentUser.fullname || getReaderName(currentUser.readerId));
    ui.roleBadge.textContent = currentUser.roleLabel;
    ui.profileMark.textContent = getAccountInitials(currentUser);
    document.title = "Mục lục — Thư viện học đường";
    $("#main-content").focus();
  } else {
    document.title = "Đăng nhập — Thư viện học đường";
    ui.loginUsername.focus();
  }
}

function isAdmin() {
  return currentUser?.role === "admin";
}

function requireAdmin() {
  if (isAdmin()) return true;
  showToast("Chức năng này chỉ dành cho quản trị viên.", true);
  return false;
}

function applyRolePermissions() {
  document.querySelectorAll("[data-required-role]").forEach((element) => {
    element.hidden = !currentUser || element.dataset.requiredRole !== currentUser.role;
  });
  const adminControls = ["#add-book-button", "#import-books-button", "#export-books-button", "#empty-add-button", "#add-reader-button", "#add-loan-button", "#reset-sample-button"];
  adminControls.forEach((selector) => {
    const element = $(selector);
    if (element) element.hidden = !isAdmin();
  });
}

function readAuthenticatedUser() {
  try {
    const username = window.sessionStorage.getItem(AUTH_SESSION_KEY) || "";
    return Object.values(getAllAccounts()).some((account) => account.username === username) ? username : "";
  } catch {
    return "";
  }
}

function clearLoginError() {
  ui.loginError.textContent = "";
  ui.loginError.hidden = true;
}

function clearRegisterError() {
  if (ui.registerError) {
    ui.registerError.textContent = "";
    ui.registerError.hidden = true;
  }
}

function switchAuthTab(mode) {
  const isLogin = mode === "login";
  if (ui.tabLogin) {
    ui.tabLogin.classList.toggle("is-active", isLogin);
    ui.tabLogin.setAttribute("aria-selected", String(isLogin));
  }
  if (ui.tabRegister) {
    ui.tabRegister.classList.toggle("is-active", !isLogin);
    ui.tabRegister.setAttribute("aria-selected", String(!isLogin));
  }
  if (ui.loginPanel) ui.loginPanel.hidden = !isLogin;
  if (ui.registerPanel) ui.registerPanel.hidden = isLogin;
  clearLoginError();
  clearRegisterError();
  if (isLogin) {
    if (ui.loginUsername) ui.loginUsername.focus();
  } else {
    if (ui.registerFullname) ui.registerFullname.focus();
  }
}

if (ui.tabLogin) ui.tabLogin.addEventListener("click", () => switchAuthTab("login"));
if (ui.tabRegister) ui.tabRegister.addEventListener("click", () => switchAuthTab("register"));
if (ui.linkToRegister) ui.linkToRegister.addEventListener("click", () => switchAuthTab("register"));
if (ui.linkToLogin) ui.linkToLogin.addEventListener("click", () => switchAuthTab("login"));

ui.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = ui.loginUsername.value.trim().toLocaleLowerCase("vi");
  const password = ui.loginPassword.value;
  const accounts = getAllAccounts();
  const account = accounts[username];
  if (!account || password !== account.password) {
    ui.loginError.textContent = "Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.";
    ui.loginError.hidden = false;
    ui.loginPassword.focus();
    ui.loginPassword.select();
    return;
  }
  clearLoginError();
  try {
    window.sessionStorage.setItem(AUTH_SESSION_KEY, account.username);
  } catch {
    // Keep the demo usable for this page view if session storage is unavailable.
  }
  setAuthenticated(account.username);
  switchView("catalog");
  renderAll();
});

ui.loginForm.addEventListener("input", clearLoginError);
ui.togglePassword.addEventListener("click", () => {
  const showPassword = ui.loginPassword.type === "password";
  ui.loginPassword.type = showPassword ? "text" : "password";
  ui.togglePassword.textContent = showPassword ? "Ẩn" : "Hiện";
  ui.togglePassword.setAttribute("aria-label", showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu");
  ui.togglePassword.setAttribute("aria-pressed", String(showPassword));
});

if (ui.toggleRegisterPassword && ui.registerPassword) {
  ui.toggleRegisterPassword.addEventListener("click", () => {
    const showPassword = ui.registerPassword.type === "password";
    ui.registerPassword.type = showPassword ? "text" : "password";
    ui.toggleRegisterPassword.textContent = showPassword ? "Ẩn" : "Hiện";
    ui.toggleRegisterPassword.setAttribute("aria-label", showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    ui.toggleRegisterPassword.setAttribute("aria-pressed", String(showPassword));
  });
}

if (ui.registerForm) {
  ui.registerForm.addEventListener("input", clearRegisterError);

  ui.registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullname = ui.registerFullname.value.trim();
    const username = ui.registerUsername.value.trim().toLocaleLowerCase("vi");
    const phone = ui.registerPhone.value.trim();
    const email = ui.registerEmail.value.trim();
    const password = ui.registerPassword.value;
    const passwordConfirm = ui.registerPasswordConfirm.value;

    if (!fullname) {
      ui.registerError.textContent = "Vui lòng nhập họ và tên độc giả.";
      ui.registerError.hidden = false;
      ui.registerFullname.focus();
      return;
    }

    if (!username || username.length < 3) {
      ui.registerError.textContent = "Tên tài khoản phải có ít nhất 3 ký tự.";
      ui.registerError.hidden = false;
      ui.registerUsername.focus();
      return;
    }

    if (!/^[a-z0-9_.-]+$/.test(username)) {
      ui.registerError.textContent = "Tên tài khoản chỉ gồm chữ thường không dấu, số, dấu gạch ngang hoặc gạch dưới.";
      ui.registerError.hidden = false;
      ui.registerUsername.focus();
      return;
    }

    const allAccounts = getAllAccounts();
    if (allAccounts[username]) {
      ui.registerError.textContent = "Tên tài khoản này đã được sử dụng. Hãy chọn tên khác.";
      ui.registerError.hidden = false;
      ui.registerUsername.focus();
      return;
    }

    if (!password || password.length < 4) {
      ui.registerError.textContent = "Mật khẩu phải có độ dài tối thiểu 4 ký tự.";
      ui.registerError.hidden = false;
      ui.registerPassword.focus();
      return;
    }

    if (password !== passwordConfirm) {
      ui.registerError.textContent = "Xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại.";
      ui.registerError.hidden = false;
      ui.registerPasswordConfirm.focus();
      return;
    }

    // 1. Tạo hồ sơ độc giả mới trong hệ thống
    const newReaderId = "DG-" + Math.floor(1000 + Math.random() * 9000);
    const newReader = {
      id: newReaderId,
      name: fullname,
      phone: phone,
      email: email,
    };
    readers = [...readers, newReader];
    persistRecords(READERS_STORAGE_KEY, readers);

    // 2. Lưu tài khoản độc giả mới
    const newAccount = {
      username: username,
      password: password,
      role: "borrower",
      roleLabel: "Độc giả",
      readerId: newReaderId,
      fullname: fullname,
    };
    const registered = readRegisteredAccounts();
    registered[username] = newAccount;
    persistRegisteredAccounts(registered);

    // 3. Tự động đăng nhập
    try {
      window.sessionStorage.setItem(AUTH_SESSION_KEY, newAccount.username);
    } catch {
      // fallback
    }

    ui.registerForm.reset();
    if (ui.registerPassword) ui.registerPassword.type = "password";
    if (ui.toggleRegisterPassword) {
      ui.toggleRegisterPassword.textContent = "Hiện";
      ui.toggleRegisterPassword.setAttribute("aria-label", "Hiện mật khẩu");
      ui.toggleRegisterPassword.setAttribute("aria-pressed", "false");
    }
    clearRegisterError();
    switchAuthTab("login");
    setAuthenticated(newAccount.username);
    switchView("catalog");
    renderAll();
    showToast(`Đăng ký thành công! Chào mừng độc giả ${fullname}.`);
  });
}

ui.logoutButton.addEventListener("click", () => {
  try {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch {
    // The view still returns to the login screen when storage is unavailable.
  }
  ui.loginForm.reset();
  if (ui.registerForm) ui.registerForm.reset();
  switchAuthTab("login");
  ui.loginPassword.type = "password";
  ui.togglePassword.textContent = "Hiện";
  ui.togglePassword.setAttribute("aria-label", "Hiện mật khẩu");
  ui.togglePassword.setAttribute("aria-pressed", "false");
  clearLoginError();
  clearRegisterError();
  switchView("catalog");
  setAuthenticated("");
});

function persistBooks() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    ui.storage.textContent = "Đã lưu trong trình duyệt";
    return true;
  } catch {
    ui.storage.textContent = "Chỉ lưu trong phiên này";
    return false;
  }
}
function persistRecords(key, records) {
  try {
    window.localStorage.setItem(key, JSON.stringify(records));
    ui.storage.textContent = "Đã lưu trong trình duyệt";
    return true;
  } catch {
    ui.storage.textContent = "Chỉ lưu trong phiên này";
    return false;
  }
}
function createRecordId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function activeLoans() {
  return loans.filter((loan) => !loan.returnedOn);
}
function pendingBorrowRequests(isbn) {
  return borrowRequests.filter((request) => request.status === "pending" && (!isbn || request.isbn === isbn));
}
function isOverdue(loan) {
  return !loan.returnedOn && loan.dueDate < localDateISO(new Date());
}
function bookIsAvailable(isbn) {
  return !activeLoans().some((loan) => loan.isbn === isbn) && !pendingBorrowRequests(isbn).length;
}
function formatDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}
function getReaderName(id) {
  const reader = readers.find((item) => item.id === id);
  return reader ? reader.name : "Độc giả đã xóa";
}
function getBookTitle(isbn) {
  const book = bst.find(isbn);
  return book ? book.title : "Đầu sách đã xóa";
}
function showToast(message, error) {
  window.clearTimeout(toastTimer);
  ui.toast.textContent = message;
  ui.toast.classList.toggle("is-error", Boolean(error));
  ui.toast.hidden = false;
  toastTimer = window.setTimeout(() => { ui.toast.hidden = true; }, 3200);
}
function renderStats() {
  const authors = new Set(books.map((book) => book.author.trim()).filter(Boolean));
  const categories = new Set(books.map((book) => book.category.trim()).filter(Boolean));
  ui.booksCount.textContent = books.length.toLocaleString("vi-VN");
  ui.authorsCount.textContent = authors.size.toLocaleString("vi-VN");
  ui.categoriesCount.textContent = categories.size.toLocaleString("vi-VN");
  ui.navCount.textContent = books.length.toLocaleString("vi-VN");
}
function renderManagementStats() {
  if (!isAdmin()) {
    [ui.activeLoansCount, ui.overdueLoansCount, ui.readersCount, ui.availableBooksCount, ui.analyticsBooks, ui.analyticsActive, ui.analyticsReturned, ui.analyticsOverdue]
      .forEach((element) => { element.textContent = "—"; });
    return;
  }
  const active = activeLoans();
  const overdue = active.filter(isOverdue);
  const available = books.filter((book) => bookIsAvailable(book.isbn));
  ui.activeLoansCount.textContent = active.length.toLocaleString("vi-VN");
  ui.overdueLoansCount.textContent = overdue.length.toLocaleString("vi-VN");
  ui.readersCount.textContent = readers.length.toLocaleString("vi-VN");
  ui.availableBooksCount.textContent = available.length.toLocaleString("vi-VN");
  ui.analyticsBooks.textContent = books.length.toLocaleString("vi-VN");
  ui.analyticsActive.textContent = active.length.toLocaleString("vi-VN");
  ui.analyticsReturned.textContent = loans.filter((loan) => loan.returnedOn).length.toLocaleString("vi-VN");
  ui.analyticsOverdue.textContent = overdue.length.toLocaleString("vi-VN");
}
function updateSelect(select, values, placeholder, selected) {
  select.innerHTML = `<option value="">${escapeHTML(placeholder)}</option>` + values.map((value) =>
    `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`
  ).join("");
  if (values.includes(selected)) select.value = selected;
}
function renderOptions() {
  const selected = ui.category.value;
  const selectedAuthor = ui.authorFilter.value;
  const selectedYear = ui.yearFilter.value;
  const categories = [...new Set(books.map((book) => book.category.trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "vi"));
  const authors = [...new Set(books.map((book) => book.author.trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "vi"));
  const years = [...new Set(books.map((book) => String(book.year || "")).filter(Boolean))]
    .sort((a, b) => Number(b) - Number(a));
  updateSelect(ui.category, categories, "Tất cả thể loại", selected);
  updateSelect(ui.authorFilter, authors, "Tất cả tác giả", selectedAuthor);
  updateSelect(ui.yearFilter, years, "Tất cả năm", selectedYear);
  ui.categoryOptions.innerHTML = categories.map((value) => '<option value="' + escapeHTML(value) + '"></option>').join("");
}
function spineTheme(category) {
  const value = category.toLocaleLowerCase("vi");
  if (value.includes("cấu trúc") || value.includes("thuật toán")) return "spine-structure";
  if (value.includes("thiết kế")) return "spine-design";
  if (value.includes("kiến trúc")) return "spine-architecture";
  if (value.includes("web")) return "spine-web";
  if (value.includes("lập trình")) return "spine-programming";
  return "spine-default";
}
function bookAvailabilityMarkup(isbn) {
  if (activeLoans().some((loan) => loan.isbn === isbn)) return '<span class="status-chip is-loaned">Đang mượn</span>';
  if (pendingBorrowRequests(isbn).length) return '<span class="status-chip is-pending">Chờ duyệt</span>';
  return '<span class="status-chip is-available">Có sẵn</span>';
}
function borrowerRequestAction(book) {
  if (currentUser?.role !== "borrower") return "";
  const escapedTitle = escapeHTML(book.title);
  const ownActiveLoan = activeLoans().some((loan) => loan.isbn === book.isbn && loan.readerId === currentUser.readerId);
  if (ownActiveLoan) return '<button class="request-action" type="button" disabled>Đang mượn</button>';
  const ownPending = borrowRequests.some((request) => request.isbn === book.isbn && request.readerId === currentUser.readerId && request.status === "pending");
  if (ownPending) return '<button class="request-action" type="button" disabled>Chờ duyệt</button>';
  if (activeLoans().some((loan) => loan.isbn === book.isbn)) return '<button class="request-action" type="button" disabled>Đang mượn</button>';
  if (pendingBorrowRequests(book.isbn).length) return '<button class="request-action" type="button" disabled>Chờ duyệt</button>';
  if (!bookIsAvailable(book.isbn)) return '<button class="request-action" type="button" disabled>Chưa có sẵn</button>';
  return '<button class="request-action" type="button" data-request-book="' + escapeHTML(book.isbn) + '" aria-label="Yêu cầu mượn ' + escapedTitle + '">Yêu cầu mượn</button>';
}
function isFavorite(isbn) {
  return currentUser?.role === "borrower" && favorites.some((favorite) => favorite.readerId === currentUser.readerId && favorite.isbn === isbn);
}
function favoriteButtonMarkup(book) {
  if (currentUser?.role !== "borrower") return "";
  const selected = isFavorite(book.isbn);
  const label = selected ? `Bỏ ${book.title} khỏi yêu thích` : `Thêm ${book.title} vào yêu thích`;
  return `<button class="icon-button favorite-button${selected ? " is-favorite" : ""}" type="button" data-toggle-favorite="${escapeHTML(book.isbn)}" aria-label="${escapeHTML(label)}" aria-pressed="${selected}" title="${escapeHTML(label)}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m10 2.7 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L10 2.7Z" /></svg></button>`;
}
function bookActionMarkup(book, includeAdminActions = true) {
  if (isAdmin() && includeAdminActions) {
    const isbn = escapeHTML(book.isbn);
    const title = escapeHTML(book.title);
    return '<button class="icon-button edit-action" type="button" data-action="edit" data-isbn="' + isbn + '" aria-label="Sửa ' + title + '" title="Sửa đầu sách">' +
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m12.8 4.2 3 3M4 16l3.4-.7L16 6.7a1.8 1.8 0 0 0-2.5-2.5l-8.6 8.6L4 16Z" /></svg></button>' +
      '<button class="icon-button delete-action" type="button" data-action="delete" data-isbn="' + isbn + '" aria-label="Xóa ' + title + '" title="Xóa đầu sách">' +
      '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 5.5h12M7.5 5.5V3.8h5v1.7m-6.8 0 .8 10.7h7l.8-10.7M8.3 8.2v5.3m3.4-5.3v5.3" /></svg></button>';
  }
  if (currentUser?.role === "borrower") return favoriteButtonMarkup(book) + borrowerRequestAction(book);
  return "";
}
function bookSourceMarkup(book) {
  const sourceUrl = BOOK_SOURCE_URLS[book.isbn] || `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(`${book.title} ${book.author} ${book.isbn}`)}`;
  const sourceLabel = BOOK_SOURCE_URLS[book.isbn] ? "Trang sách" : "Tra cứu ISBN";
  return `<a class="book-source-link" href="${escapeHTML(sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(sourceLabel + ": " + book.title)}"><span>${sourceLabel}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 2.5h4.5V7M13.2 2.8 7.5 8.5M11.5 8.5v4h-8v-8h4" /></svg></a>`;
}
function bookCoverMarkup(book) {
  const theme = spineTheme(book.category).replace("spine-", "cover-");
  const initials = escapeHTML(book.title.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toLocaleUpperCase("vi"));
  const publisherCover = normalizeCoverUrl(book.coverUrl) || PUBLISHER_COVER_URLS[book.isbn];
  return `<div class="book-cover ${theme}" aria-hidden="true">${publisherCover ? `<img class="publisher-cover-image" src="${escapeHTML(publisherCover)}" alt="" loading="lazy" decoding="async">` : ""}<span class="cover-kicker">THƯ VIỆN HỌC ĐƯỜNG</span><span class="cover-ornament">${initials}</span><strong class="cover-title">${escapeHTML(book.title)}</strong><span class="cover-author">${escapeHTML(book.author)}</span><small class="cover-isbn">ISBN · ${escapeHTML(book.isbn)}</small></div>`;
}
function bookCardMarkup(book, featured = false) {
  const category = escapeHTML(book.category || "Chưa phân loại");
  const availability = bookAvailabilityMarkup(book.isbn);
  const actions = bookActionMarkup(book, !featured);
  return `<article class="book-card${featured ? " is-featured" : ""}" data-isbn="${escapeHTML(book.isbn)}">${bookCoverMarkup(book)}` +
    `<div class="book-card-content"><div class="book-card-tags"><span class="category-chip">${category}</span>${availability}</div>` +
    `<h3>${escapeHTML(book.title)}</h3><p class="book-card-author">${escapeHTML(book.author)}</p>` +
    `<p class="book-card-publisher">${escapeHTML(book.publisher || "Nhà xuất bản chưa cập nhật")}${book.year ? ` · ${escapeHTML(book.year)}` : ""}</p>` +
    `${bookSourceMarkup(book)}<div class="book-card-footer"><code class="isbn-code">${escapeHTML(book.isbn)}</code><span class="book-card-actions">${actions}</span></div></div></article>`;
}
function getFeaturedBooks() {
  const counts = new Map();
  loans.forEach((loan) => counts.set(loan.isbn, (counts.get(loan.isbn) || 0) + 1));
  const selected = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([isbn]) => bst.find(isbn)).filter(Boolean).slice(0, 4);
  const selectedIsbns = new Set(selected.map((book) => book.isbn));
  const latest = [...books].sort((a, b) => Number(b.year || 0) - Number(a.year || 0) || a.title.localeCompare(b.title, "vi"));
  latest.forEach((book) => {
    if (selected.length < 4 && !selectedIsbns.has(book.isbn)) {
      selected.push(book);
      selectedIsbns.add(book.isbn);
    }
  });
  return selected;
}
function renderFeaturedBooks() {
  const featured = getFeaturedBooks();
  ui.featuredBooks.innerHTML = featured.map((book) => bookCardMarkup(book, true)).join("");
  ui.featuredCopy.textContent = loans.length
    ? "Sách được mượn nhiều cùng một vài đầu sách mới trong thư viện."
    : "Gợi ý từ những đầu sách mới xuất bản trong danh mục.";
  ui.featuredBooks.closest(".featured-section").hidden = featured.length === 0;
}
function setCatalogView(view) {
  if (!["list", "grid"].includes(view)) return;
  catalogView = view;
  try { window.localStorage.setItem(CATALOG_VIEW_STORAGE_KEY, view); } catch { /* Keep the selected view for this session. */ }
  renderCatalog();
}
function toggleFavorite(isbn) {
  if (currentUser?.role !== "borrower") return;
  const book = bst.find(isbn);
  if (!book) return;
  const wasFavorite = isFavorite(isbn);
  favorites = wasFavorite
    ? favorites.filter((favorite) => favorite.readerId !== currentUser.readerId || favorite.isbn !== isbn)
    : [...favorites, { readerId: currentUser.readerId, isbn, savedOn: localDateISO(new Date()) }];
  persistRecords(FAVORITES_STORAGE_KEY, favorites);
  renderCatalog();
  showToast(wasFavorite ? "Đã bỏ sách khỏi danh sách yêu thích." : "Đã thêm sách vào danh sách yêu thích.");
}
function handleBookAction(event) {
  const favoriteButton = event.target.closest("button[data-toggle-favorite]");
  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.toggleFavorite);
    return;
  }
  const requestButton = event.target.closest("button[data-request-book]");
  if (requestButton) {
    requestBook(requestButton.dataset.requestBook);
    return;
  }
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) return;
  const book = bst.find(actionButton.dataset.isbn);
  if (!book) return;
  if (actionButton.dataset.action === "edit") openBookDialog(book, actionButton);
  if (actionButton.dataset.action === "delete") openDeleteDialog(book, actionButton);
}
function rowMarkup(book) {
  const isbn = escapeHTML(book.isbn);
  const title = escapeHTML(book.title);
  const author = escapeHTML(book.author);
  const publisher = escapeHTML(book.publisher || "—");
  const category = escapeHTML(book.category || "Chưa phân loại");
  const year = book.year ? escapeHTML(book.year) : "—";
  const availability = bookAvailabilityMarkup(book.isbn);
  const initials = escapeHTML(book.title.trim().slice(0, 2).toLocaleUpperCase("vi"));
  return '<tr data-isbn="' + isbn + '">' +
    '<td data-label="Đầu sách"><span class="mobile-label">Đầu sách</span>' +
    '<span class="book-cell"><span class="book-spine ' + spineTheme(book.category) + '" aria-hidden="true">' + initials + "</span>" +
    '<span class="book-title-group"><span class="book-title">' + title + '</span>' + bookSourceMarkup(book) + '</span></span></td>' +
    '<td data-label="ISBN"><span class="mobile-label">ISBN</span><code class="isbn-code">' + isbn + "</code></td>" +
    '<td data-label="Tác giả"><span class="mobile-label">Tác giả</span><span>' + author + "</span></td>" +
    '<td data-label="Nhà xuất bản"><span class="mobile-label">Nhà xuất bản</span><span>' + publisher + "</span></td>" +
    '<td data-label="Năm"><span class="mobile-label">Năm</span><span>' + year + "</span></td>" +
    '<td data-label="Thể loại"><span class="mobile-label">Thể loại</span><span class="category-chip">' + category + "</span></td>" +
    '<td data-label="Tình trạng"><span class="mobile-label">Tình trạng</span>' + availability + "</td>" +
    '<td data-label="Thao tác"><span class="mobile-label">Thao tác</span><span class="row-actions">' +
    bookActionMarkup(book) +
    "</span></td></tr>";
}
function renderCatalog() {
  renderOptions();
  const query = ui.search.value.trim();
  const selectedCategory = ui.category.value;
  const selectedAuthor = ui.authorFilter.value;
  const selectedYear = ui.yearFilter.value;
  const sortBy = ui.sort.value;
  let visible;
  if (!query) {
    visible = bst.traverse("LNR");
  } else if (validISBNShape(query)) {
    const exactMatch = bst.find(query);
    visible = exactMatch ? [exactMatch] : [];
  } else {
    visible = bst.search(query);
  }
  if (selectedCategory) visible = visible.filter((book) => book.category === selectedCategory);
  if (selectedAuthor) visible = visible.filter((book) => book.author === selectedAuthor);
  if (selectedYear) visible = visible.filter((book) => String(book.year) === selectedYear);
  const [sortKey, sortDirection] = sortBy.split("-");
  if (sortKey !== "isbn" || sortDirection === "desc") {
    const compare = sortKey === "isbn"
      ? (a, b) => a.isbn.localeCompare(b.isbn)
      : sortKey === "author"
        ? (a, b) => a.author.localeCompare(b.author, "vi")
        : sortKey === "category"
          ? (a, b) => a.category.localeCompare(b.category, "vi")
          : (a, b) => Number(a.year || 0) - Number(b.year || 0);
    visible.sort((a, b) => {
      const result = compare(a, b) || a.isbn.localeCompare(b.isbn);
      return sortDirection === "desc" ? -result : result;
    });
  }
  const filteredCount = visible.length;
  if (favoritesOnly && currentUser?.role === "borrower") visible = visible.filter((book) => isFavorite(book.isbn));
  ui.rows.innerHTML = visible.map(rowMarkup).join("");
  ui.bookGrid.innerHTML = visible.map((book) => bookCardMarkup(book)).join("");
  renderFeaturedBooks();
  const hasResults = visible.length > 0;
  ui.empty.hidden = hasResults;
  ui.catalogTable.hidden = !hasResults || catalogView !== "list";
  ui.bookGrid.hidden = !hasResults || catalogView !== "grid";
  ui.listViewButton.classList.toggle("is-active", catalogView === "list");
  ui.gridViewButton.classList.toggle("is-active", catalogView === "grid");
  ui.listViewButton.setAttribute("aria-pressed", String(catalogView === "list"));
  ui.gridViewButton.setAttribute("aria-pressed", String(catalogView === "grid"));
  ui.favoritesFilter.classList.toggle("is-active", favoritesOnly);
  ui.favoritesFilter.setAttribute("aria-pressed", String(favoritesOnly));
  ui.favoritesCount.textContent = String(favorites.filter((favorite) => favorite.readerId === currentUser?.readerId).length);
  ui.clearSearch.hidden = !query;
  ui.results.textContent = favoritesOnly
    ? `${visible.length} sách yêu thích trong ${filteredCount} kết quả phù hợp`
    : query || selectedCategory || selectedAuthor || selectedYear
      ? visible.length + " kết quả trên " + books.length + " đầu sách"
    : books.length + " đầu sách, " + ui.sort.options[ui.sort.selectedIndex].text.toLocaleLowerCase("vi");
  $(".sort-indicator span").textContent = `Sắp xếp: ${ui.sort.options[ui.sort.selectedIndex].text}`;
  $("#book-table-caption").textContent = `Danh mục sách, ${ui.sort.options[ui.sort.selectedIndex].text.toLocaleLowerCase("vi")}`;
  ui.visible.textContent = hasResults
    ? "Đang hiển thị " + visible.length + " đầu sách"
    : "Không có đầu sách để hiển thị";
  if (!hasResults) {
    ui.emptyTitle.textContent = favoritesOnly ? "Chưa có sách yêu thích phù hợp" : books.length ? "Chưa có sách phù hợp" : "Danh mục đang trống";
    ui.emptyCopy.textContent = favoritesOnly
      ? "Hãy đánh dấu sách bằng ngôi sao hoặc bỏ bộ lọc để xem toàn bộ danh mục."
      : books.length ? "Thử từ khóa hoặc thể loại khác để tìm sách." : "Thêm đầu sách đầu tiên để bắt đầu tạo danh mục.";
  }
}

const traversalText = {
  NLR: "NLR: node, cây con trái, cây con phải.",
  LNR: "LNR: cây con trái, node, cây con phải. Kết quả tăng dần theo ISBN.",
  LRN: "LRN: cây con trái, cây con phải, node.",
};
function renderTree() {
  const sorted = bst.traverse("LNR");
  const count = sorted.length;
  const height = bst.height();
  ui.treeCount.textContent = count.toLocaleString("vi-VN");
  ui.treeHeight.textContent = height.toLocaleString("vi-VN");
  ui.treeEmpty.hidden = count > 0;
  ui.diagram.hidden = count === 0;
  ui.diagram.setAttribute("aria-label", "Cây BST gồm " + count + " node, chiều cao " + height);
  const sequence = bst.traverse(activeTraversal);
  ui.traversalDescription.textContent = traversalText[activeTraversal];
  ui.traversalList.innerHTML = sequence.map((book, index) =>
    '<li><span class="sequence-number">' + String(index + 1).padStart(2, "0") +
    '</span><code title="' + escapeHTML(book.title) + '">' + escapeHTML(book.isbn) + "</code></li>"
  ).join("");
  document.querySelectorAll(".traversal-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.traversal === activeTraversal));
  });
  if (!count) {
    ui.diagram.innerHTML = "";
    return;
  }

  const ranks = new Map(sorted.map((book, index) => [book.isbn, index]));
  const width = Math.max(870, (count + 1) * 122);
  const gap = width / (count + 1);
  const positions = new Map();
  const position = (node, depth) => {
    if (!node) return;
    position(node.left, depth + 1);
    positions.set(node.book.isbn, { node, x: gap * (ranks.get(node.book.isbn) + 1), y: 48 + depth * 105 });
    position(node.right, depth + 1);
  };
  position(bst.root, 0);
  const diagramHeight = Math.max(190, height * 105 + 22);
  ui.diagram.setAttribute("viewBox", "0 0 " + width + " " + diagramHeight);
  ui.diagram.setAttribute("width", String(width));
  ui.diagram.setAttribute("height", String(diagramHeight));
  const visitRank = new Map(sequence.map((book, index) => [book.isbn, index + 1]));
  const edges = [];
  positions.forEach(({ node, x, y }) => {
    [node.left, node.right].filter(Boolean).forEach((child) => {
      const target = positions.get(child.book.isbn);
      edges.push('<line class="tree-edge" x1="' + x + '" y1="' + (y + 48) + '" x2="' + target.x + '" y2="' + (target.y - 7) + '" />');
    });
  });
  const nodes = sorted.map((book) => {
    const point = positions.get(book.isbn);
    const title = book.title.length > 19 ? book.title.slice(0, 18) + "…" : book.title;
    return '<g class="tree-node is-visited" transform="translate(' + (point.x - 60) + " " + point.y + ')">' +
      "<title>" + escapeHTML(book.isbn) + " — " + escapeHTML(book.title) + "</title>" +
      '<rect width="120" height="48" rx="8"></rect>' +
      '<text x="60" y="19" text-anchor="middle">' + escapeHTML(book.isbn) + "</text>" +
      '<text class="tree-title" x="60" y="36" text-anchor="middle">' + escapeHTML(title) + "</text>" +
      '<circle class="visit-badge" cx="112" cy="2" r="10"></circle>' +
      '<text class="visit-number" x="112" y="5">' + visitRank.get(book.isbn) + "</text></g>";
  }).join("");
  ui.diagram.innerHTML = '<title id="bst-svg-title">Sơ đồ cây nhị phân tìm kiếm theo ISBN</title>' +
    '<desc id="bst-svg-description">Cây gồm ' + count + " node, được sắp xếp theo ISBN.</desc>" +
    edges.join("") + nodes;
}
function renderLoans() {
  if (!isAdmin()) {
    ui.loanRows.replaceChildren();
    $("#loan-rows").closest("table").hidden = true;
    ui.loanEmpty.textContent = "";
    ui.loanEmpty.hidden = true;
    return;
  }
  const statusFilter = ui.loanStatusFilter.value;
  const visibleLoans = [...loans].sort((a, b) => b.borrowedOn.localeCompare(a.borrowedOn)).filter((loan) => {
    if (statusFilter === "active") return !loan.returnedOn;
    if (statusFilter === "overdue") return isOverdue(loan);
    if (statusFilter === "returned") return Boolean(loan.returnedOn);
    return true;
  });
  ui.loanRows.innerHTML = visibleLoans.map((loan) => {
    const status = loan.returnedOn
      ? '<span class="status-chip is-available">Đã trả</span>'
      : isOverdue(loan)
        ? '<span class="status-chip is-overdue">Quá hạn</span>'
        : '<span class="status-chip is-loaned">Đang mượn</span>';
    const action = loan.returnedOn ? "" : `<button class="text-action" type="button" data-return-loan="${escapeHTML(loan.id)}">Ghi nhận trả</button>`;
    return `<tr><td data-label="Đầu sách"><span class="loan-book-name">${escapeHTML(getBookTitle(loan.isbn))}</span><code class="isbn-code">${escapeHTML(loan.isbn)}</code></td>` +
      `<td data-label="Độc giả">${escapeHTML(getReaderName(loan.readerId))}</td><td data-label="Ngày mượn">${formatDate(loan.borrowedOn)}</td>` +
      `<td data-label="Hạn trả">${formatDate(loan.dueDate)}${loan.returnedOn ? `<small class="returned-date">Đã trả ${formatDate(loan.returnedOn)}</small>` : ""}</td>` +
      `<td data-label="Trạng thái">${status}</td><td data-label="Thao tác">${action}</td></tr>`;
  }).join("");
  const hasLoans = visibleLoans.length > 0;
  ui.loanEmpty.hidden = hasLoans;
  ui.loanEmpty.textContent = loans.length ? "Không có phiếu nào khớp bộ lọc." : "Chưa có phiếu mượn nào.";
  $("#loan-rows").closest("table").hidden = !hasLoans;
}

function renderBorrowRequests() {
  if (!isAdmin()) {
    ui.requestRows.replaceChildren();
    ui.requestEmpty.hidden = true;
    ui.requestRows.closest("table").hidden = true;
    ui.pendingRequestCount.textContent = "—";
    return;
  }
  const requests = [...borrowRequests].sort((a, b) => {
    const pendingOrder = Number(b.status === "pending") - Number(a.status === "pending");
    return pendingOrder || String(b.requestedOn || "").localeCompare(String(a.requestedOn || ""));
  });
  const pendingCount = pendingBorrowRequests().length;
  ui.pendingRequestCount.textContent = `${pendingCount} chờ duyệt`;
  ui.requestRows.innerHTML = requests.map((request) => {
    const status = request.status === "pending"
      ? '<span class="status-chip is-pending">Chờ duyệt</span>'
      : request.status === "approved"
        ? '<span class="status-chip is-available">Đã duyệt</span>'
        : '<span class="status-chip is-rejected">Đã từ chối</span>';
    const actions = request.status === "pending"
      ? `<div class="request-review-actions"><button class="text-action" type="button" data-approve-request="${escapeHTML(request.id)}">Duyệt</button><button class="text-action is-danger" type="button" data-reject-request="${escapeHTML(request.id)}">Từ chối</button></div>`
      : "—";
    return `<tr><td data-label="Đầu sách"><span class="loan-book-name">${escapeHTML(getBookTitle(request.isbn))}</span><code class="isbn-code">${escapeHTML(request.isbn)}</code></td>` +
      `<td data-label="Độc giả">${escapeHTML(getReaderName(request.readerId))}</td><td data-label="Ngày yêu cầu">${formatDate(request.requestedOn)}</td>` +
      `<td data-label="Trạng thái">${status}</td><td data-label="Thao tác">${actions}</td></tr>`;
  }).join("");
  const hasRequests = requests.length > 0;
  ui.requestEmpty.hidden = hasRequests;
  ui.requestRows.closest("table").hidden = !hasRequests;
}

function renderMyLoans() {
  if (currentUser?.role !== "borrower") {
    ui.myLoanRows.replaceChildren();
    ui.myLoanEmpty.hidden = true;
    $("#my-loan-rows").closest("table").hidden = true;
    ui.myLoansCount.textContent = "—";
    ui.myActiveLoansCount.textContent = "—";
    ui.myOverdueLoansCount.textContent = "—";
    ui.myPendingRequestsCount.textContent = "—";
    return;
  }
  const ownLoans = loans.filter((loan) => loan.readerId === currentUser.readerId)
    .sort((a, b) => b.borrowedOn.localeCompare(a.borrowedOn));
  const ownRequests = borrowRequests.filter((request) => request.readerId === currentUser.readerId && request.status !== "approved");
  const active = ownLoans.filter((loan) => !loan.returnedOn);
  ui.myLoansCount.textContent = ownLoans.length.toLocaleString("vi-VN");
  ui.myActiveLoansCount.textContent = active.length.toLocaleString("vi-VN");
  ui.myOverdueLoansCount.textContent = active.filter(isOverdue).length.toLocaleString("vi-VN");
  ui.myPendingRequestsCount.textContent = ownRequests.filter((request) => request.status === "pending").length.toLocaleString("vi-VN");
  const history = [
    ...ownLoans.map((loan) => ({ kind: "loan", record: loan, date: loan.borrowedOn })),
    ...ownRequests.map((request) => ({ kind: "request", record: request, date: request.requestedOn })),
  ].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  ui.myLoanRows.innerHTML = history.map(({ kind, record }) => {
    const isRequest = kind === "request";
    const status = isRequest
      ? record.status === "pending"
        ? '<span class="status-chip is-pending">Chờ admin duyệt</span>'
        : '<span class="status-chip is-rejected">Đã từ chối</span>'
      : record.returnedOn
        ? '<span class="status-chip is-available">Đã trả</span>'
        : isOverdue(record)
          ? '<span class="status-chip is-overdue">Quá hạn</span>'
          : '<span class="status-chip is-loaned">Đang mượn</span>';
    const date = isRequest ? record.requestedOn : record.borrowedOn;
    const dateLabel = isRequest ? "Ngày yêu cầu" : "Ngày mượn";
    const dueDate = isRequest ? "—" : `${formatDate(record.dueDate)}${record.returnedOn ? `<small class="returned-date">Đã trả ${formatDate(record.returnedOn)}</small>` : ""}`;
    return `<tr><td data-label="Đầu sách"><span class="loan-book-name">${escapeHTML(getBookTitle(record.isbn))}</span><code class="isbn-code">${escapeHTML(record.isbn)}</code></td>` +
      `<td data-label="Ngày yêu cầu / mượn"><span class="history-date-label">${dateLabel}</span>${formatDate(date)}</td><td data-label="Hạn trả">${dueDate}</td>` +
      `<td data-label="Trạng thái">${status}</td></tr>`;
  }).join("");
  const hasHistory = history.length > 0;
  ui.myLoanEmpty.textContent = "Bạn chưa gửi yêu cầu hoặc có phiếu mượn nào.";
  ui.myLoanEmpty.hidden = hasHistory;
  $("#my-loan-rows").closest("table").hidden = !hasHistory;
}

function renderReaders() {
  if (!isAdmin()) {
    ui.readerRows.replaceChildren();
    $("#reader-rows").closest("table").hidden = true;
    ui.readerEmpty.hidden = true;
    return;
  }
  const active = activeLoans();
  ui.readerRows.innerHTML = readers.map((reader) => {
    const count = active.filter((loan) => loan.readerId === reader.id).length;
    return `<tr><td data-label="Mã độc giả"><code class="isbn-code">${escapeHTML(reader.id)}</code></td>` +
      `<td data-label="Họ và tên"><strong>${escapeHTML(reader.name)}</strong></td><td data-label="Điện thoại">${escapeHTML(reader.phone || "—")}</td>` +
      `<td data-label="Email">${escapeHTML(reader.email || "—")}</td><td data-label="Đang mượn">${count}</td>` +
      `<td data-label="Thao tác"><button class="text-action is-danger" type="button" data-delete-reader="${escapeHTML(reader.id)}">Xóa</button></td></tr>`;
  }).join("");
  const hasReaders = readers.length > 0;
  ui.readerEmpty.hidden = hasReaders;
  $("#reader-rows").closest("table").hidden = !hasReaders;
}

function renderAnalytics() {
  if (!isAdmin()) {
    ui.categoryChart.replaceChildren();
    ui.popularList.replaceChildren();
    ui.popularEmpty.hidden = true;
    return;
  }
  const categories = new Map();
  books.forEach((book) => {
    const category = book.category.trim() || "Chưa phân loại";
    categories.set(category, (categories.get(category) || 0) + 1);
  });
  const categoryRows = [...categories].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "vi"));
  const maxCount = Math.max(1, ...categoryRows.map((entry) => entry[1]));
  ui.categoryChart.innerHTML = categoryRows.map(([category, count]) => {
    const width = Math.round((count / maxCount) * 100);
    return `<div class="bar-row" role="listitem"><div class="bar-label"><span>${escapeHTML(category)}</span><strong>${count}</strong></div><div class="bar-track"><span style="width:${width}%"></span></div></div>`;
  }).join("");
  if (!categoryRows.length) ui.categoryChart.innerHTML = '<p class="management-empty">Chưa có sách trong danh mục.</p>';

  const counts = new Map();
  loans.forEach((loan) => counts.set(loan.isbn, (counts.get(loan.isbn) || 0) + 1));
  const popular = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 5);
  ui.popularList.innerHTML = popular.map(([isbn, count], index) =>
    `<li><span class="popular-rank">${String(index + 1).padStart(2, "0")}</span><span class="popular-book"><strong>${escapeHTML(getBookTitle(isbn))}</strong><code>${escapeHTML(isbn)}</code></span><b>${count} lượt</b></li>`
  ).join("");
  ui.popularEmpty.hidden = popular.length > 0;
  ui.popularList.hidden = popular.length === 0;
}

function renderAll() {
  renderStats();
  renderCatalog();
  renderManagementStats();
  if (isAdmin()) {
    renderLoans();
    renderBorrowRequests();
    renderReaders();
    renderAnalytics();
    ui.myLoanRows.replaceChildren();
    ui.myLoanEmpty.hidden = true;
    $("#my-loan-rows").closest("table").hidden = true;
    ui.myLoansCount.textContent = "—";
    ui.myActiveLoansCount.textContent = "—";
    ui.myOverdueLoansCount.textContent = "—";
    ui.myPendingRequestsCount.textContent = "—";
  } else {
    renderLoans();
    renderBorrowRequests();
    renderReaders();
    renderAnalytics();
    renderMyLoans();
  }
  if (activeView === "tree") renderTree();
}
function canAccessView(view) {
  if (currentUser?.role === "admin") return ["catalog", "tree", "circulation", "analytics"].includes(view);
  if (currentUser?.role === "borrower") return ["catalog", "my-loans"].includes(view);
  return view === "catalog";
}
function switchView(view) {
  if (!canAccessView(view)) view = "catalog";
  activeView = view;
  const views = { catalog: ui.catalog, tree: ui.treeView, circulation: ui.circulation, "my-loans": ui.myLoans, analytics: ui.analytics };
  Object.entries(views).forEach(([name, element]) => { element.hidden = name !== view; });
  const labels = { catalog: "Danh mục", tree: "Cây BST", circulation: "Mượn / trả", "my-loans": "Lịch sử mượn của tôi", analytics: "Thống kê" };
  ui.breadcrumb.textContent = labels[view] || labels.catalog;
  ui.nav.forEach((button) => {
    const selected = button.dataset.view === view;
    button.classList.toggle("is-active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (view === "tree") renderTree();
  if (view === "circulation") { renderLoans(); renderBorrowRequests(); renderReaders(); }
  if (view === "my-loans") renderMyLoans();
  if (view === "analytics") renderAnalytics();
  try {
    window.history.replaceState(null, "", "#" + view);
  } catch {
    // The page still works when opened directly from a local file.
  }
}
function showFormError(message, input) {
  ui.formError.textContent = message;
  ui.formError.hidden = false;
  input?.focus();
}
function clearFormError() {
  ui.formError.textContent = "";
  ui.formError.hidden = true;
}
function openBookDialog(book, trigger) {
  if (!requireAdmin()) return;
  editingISBN = book ? book.isbn : null;
  returnFocus = trigger || $("#add-book-button");
  ui.form.reset();
  clearFormError();
  ui.dialogEyebrow.textContent = book ? "Cập nhật bản ghi" : "Bản ghi mới";
  ui.dialogTitle.textContent = book ? "Sửa thông tin sách" : "Thêm đầu sách";
  ui.saveButton.textContent = book ? "Lưu thay đổi" : "Lưu đầu sách";
  ui.isbn.value = book ? book.isbn : "";
  ui.isbn.readOnly = Boolean(book);
  ui.title.value = book ? book.title : "";
  ui.author.value = book ? book.author : "";
  ui.publisher.value = book ? book.publisher : "";
  ui.year.value = book ? book.year : "";
  ui.categoryInput.value = book ? book.category : "";
  ui.coverUrl.value = book ? (book.coverUrl || "") : "";
  ui.bookDialog.showModal();
  window.requestAnimationFrame(() => (book ? ui.title : ui.isbn).focus());
}
function closeBookDialog() {
  if (ui.bookDialog.open) ui.bookDialog.close();
}
function submitBook() {
  if (!requireAdmin()) return;
  const isbn = normalizeISBN(ui.isbn.value);
  const title = ui.title.value.trim();
  const author = ui.author.value.trim();
  const yearValue = ui.year.value.trim();
  const coverUrlInput = ui.coverUrl.value.trim();
  const coverUrl = normalizeCoverUrl(coverUrlInput);
  const isUnchangedLegacyISBN = editingISBN === isbn && validISBNShape(isbn);
  if (!validISBN(isbn) && !isUnchangedLegacyISBN) {
    showFormError("ISBN không hợp lệ. Hãy kiểm tra mã ISBN-10/ISBN-13 và số kiểm tra cuối mã.", ui.isbn);
    return;
  }
  if (!title) {
    showFormError("Nhập nhan đề của sách.", ui.title);
    return;
  }
  if (!author) {
    showFormError("Nhập tên tác giả.", ui.author);
    return;
  }
  if (coverUrlInput && !coverUrl) {
    showFormError("Link ảnh bìa phải là URL HTTPS hợp lệ từ trang nhà xuất bản.", ui.coverUrl);
    return;
  }
  const year = yearValue ? Number(yearValue) : "";
  if (yearValue && (!Number.isInteger(year) || year < 1400 || year > 2100)) {
    showFormError("Năm xuất bản cần nằm trong khoảng 1400–2100.", ui.year);
    return;
  }
  if (!editingISBN && bst.find(isbn)) {
    showFormError("ISBN này đã có trong danh mục. Hãy kiểm tra hoặc sửa bản ghi hiện có.", ui.isbn);
    return;
  }
  const record = {
    isbn, title, author,
    publisher: ui.publisher.value.trim(),
    year,
    category: ui.categoryInput.value.trim() || "Chưa phân loại",
    coverUrl: coverUrl || "",
  };
  if (editingISBN) {
    books = books.map((book) => book.isbn === editingISBN ? record : book);
    bst.update(record);
  } else {
    books = [...books, record];
    bst.insert(record);
  }
  const wasEditing = Boolean(editingISBN);
  persistBooks();
  renderAll();
  closeBookDialog();
  showToast(wasEditing ? "Đã cập nhật thông tin sách." : "Đã thêm đầu sách vào danh mục.");
  editingISBN = null;
}
function openDeleteDialog(book, trigger) {
  if (!requireAdmin()) return;
  deletingISBN = book.isbn;
  returnFocus = trigger;
  ui.deleteCopy.textContent = "“" + book.title + "” sẽ bị xóa khỏi danh mục trên thiết bị. Thao tác này không thể hoàn tác.";
  ui.deleteDialog.showModal();
}
function deleteBook() {
  if (!requireAdmin()) return;
  if (!deletingISBN) return;
  if (!bookIsAvailable(deletingISBN)) {
    const hasPendingRequest = pendingBorrowRequests(deletingISBN).length > 0;
    ui.deleteDialog.close();
    showToast(hasPendingRequest ? "Không thể xóa sách đang có yêu cầu mượn chờ duyệt." : "Không thể xóa sách đang được mượn. Hãy ghi nhận trả sách trước.", true);
    deletingISBN = null;
    return;
  }
  const removed = bst.find(deletingISBN);
  bst.remove(deletingISBN);
  books = books.filter((book) => book.isbn !== deletingISBN);
  persistBooks();
  renderAll();
  ui.deleteDialog.close();
  showToast(removed ? "Đã xóa “" + removed.title + "” khỏi danh mục." : "Đã xóa đầu sách.");
  deletingISBN = null;
}

function localDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function openReaderDialog() {
  if (!requireAdmin()) return;
  ui.readerForm.reset();
  ui.readerFormError.hidden = true;
  ui.readerFormError.textContent = "";
  ui.readerDialog.showModal();
  ui.readerName.focus();
}
function openLoanDialog() {
  if (!requireAdmin()) return;
  if (!readers.length) {
    showToast("Hãy thêm độc giả trước khi lập phiếu mượn.", true);
    return;
  }
  const available = bst.traverse("LNR").filter((book) => bookIsAvailable(book.isbn));
  if (!available.length) {
    showToast("Hiện không còn đầu sách nào có thể cho mượn.", true);
    return;
  }
  ui.loanForm.reset();
  ui.loanFormError.hidden = true;
  ui.loanFormError.textContent = "";
  ui.loanReader.innerHTML = '<option value="">Chọn độc giả</option>' + [...readers]
    .sort((a, b) => a.name.localeCompare(b.name, "vi"))
    .map((reader) => `<option value="${escapeHTML(reader.id)}">${escapeHTML(reader.name)} (${escapeHTML(reader.id)})</option>`).join("");
  ui.loanBook.innerHTML = '<option value="">Chọn đầu sách</option>' + available
    .map((book) => `<option value="${escapeHTML(book.isbn)}">${escapeHTML(book.title)} — ${escapeHTML(book.isbn)}</option>`).join("");
  const due = new Date();
  due.setDate(due.getDate() + 14);
  ui.loanDue.value = localDateISO(due);
  ui.loanDialog.showModal();
  ui.loanReader.focus();
}
function saveReader(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const name = ui.readerName.value.trim();
  if (!name) {
    ui.readerFormError.textContent = "Hãy nhập họ và tên độc giả.";
    ui.readerFormError.hidden = false;
    ui.readerName.focus();
    return;
  }
  if (ui.readerEmail.value && ui.readerEmail.validity.typeMismatch) {
    ui.readerFormError.textContent = "Địa chỉ email chưa đúng định dạng.";
    ui.readerFormError.hidden = false;
    ui.readerEmail.focus();
    return;
  }
  const reader = {
    id: createRecordId("DG"),
    name,
    phone: ui.readerPhone.value.trim(),
    email: ui.readerEmail.value.trim(),
  };
  readers = [...readers, reader];
  persistRecords(READERS_STORAGE_KEY, readers);
  renderAll();
  ui.readerDialog.close();
  showToast(`Đã thêm độc giả ${reader.name}.`);
}
function saveLoan(event) {
  event.preventDefault();
  if (!requireAdmin()) return;
  const readerId = ui.loanReader.value;
  const isbn = normalizeISBN(ui.loanBook.value);
  const dueDate = ui.loanDue.value;
  if (!readers.some((reader) => reader.id === readerId)) {
    ui.loanFormError.textContent = "Hãy chọn một độc giả trong danh sách.";
    ui.loanFormError.hidden = false;
    ui.loanReader.focus();
    return;
  }
  if (!bst.find(isbn) || !bookIsAvailable(isbn)) {
    ui.loanFormError.textContent = "Đầu sách này không còn sẵn để mượn. Hãy chọn sách khác.";
    ui.loanFormError.hidden = false;
    ui.loanBook.focus();
    return;
  }
  if (!dueDate || dueDate < localDateISO(new Date())) {
    ui.loanFormError.textContent = "Hạn trả phải là hôm nay hoặc một ngày trong tương lai.";
    ui.loanFormError.hidden = false;
    ui.loanDue.focus();
    return;
  }
  loans = [...loans, { id: createRecordId("PM"), isbn, readerId, borrowedOn: localDateISO(new Date()), dueDate, returnedOn: "" }];
  persistRecords(LOANS_STORAGE_KEY, loans);
  renderAll();
  ui.loanDialog.close();
  showToast("Đã tạo phiếu mượn sách.");
}
function requestBook(isbn) {
  if (currentUser?.role !== "borrower") {
    showToast("Chỉ tài khoản người mượn mới có thể gửi yêu cầu.", true);
    return;
  }
  const book = bst.find(isbn);
  if (!book) {
    showToast("Đầu sách không còn trong danh mục.", true);
    return;
  }
  const ownActiveLoan = activeLoans().some((loan) => loan.isbn === isbn && loan.readerId === currentUser.readerId);
  if (ownActiveLoan) {
    showToast("Bạn đang mượn đầu sách này rồi.", true);
    return;
  }
  if (borrowRequests.some((request) => request.isbn === isbn && request.readerId === currentUser.readerId && request.status === "pending")) {
    showToast("Yêu cầu của bạn đang chờ admin duyệt.", true);
    return;
  }
  if (!bookIsAvailable(isbn)) {
    showToast("Sách vừa được mượn hoặc đang có yêu cầu chờ duyệt.", true);
    renderAll();
    return;
  }
  borrowRequests = [...borrowRequests, {
    id: createRecordId("YC"), isbn, readerId: currentUser.readerId,
    requestedOn: localDateISO(new Date()), status: "pending", reviewedOn: "",
  }];
  persistRecords(BORROW_REQUESTS_STORAGE_KEY, borrowRequests);
  renderAll();
  showToast(`Đã gửi yêu cầu mượn “${book.title}”. Chờ admin duyệt nhé.`);
}
function approveBorrowRequest(id) {
  if (!requireAdmin()) return;
  const request = borrowRequests.find((item) => item.id === id && item.status === "pending");
  if (!request) return;
  if (!bst.find(request.isbn) || !readers.some((reader) => reader.id === request.readerId)) {
    showToast("Không thể duyệt vì sách hoặc hồ sơ độc giả không còn tồn tại.", true);
    return;
  }
  if (activeLoans().some((loan) => loan.isbn === request.isbn)) {
    showToast("Sách đã được cho mượn. Hãy từ chối yêu cầu này.", true);
    return;
  }
  const borrowedOn = localDateISO(new Date());
  const due = new Date();
  due.setDate(due.getDate() + 14);
  const loan = {
    id: createRecordId("PM"), isbn: request.isbn, readerId: request.readerId,
    borrowedOn, dueDate: localDateISO(due), returnedOn: "", requestId: request.id,
  };
  loans = [...loans, loan];
  request.status = "approved";
  request.reviewedOn = borrowedOn;
  request.loanId = loan.id;
  persistRecords(LOANS_STORAGE_KEY, loans);
  persistRecords(BORROW_REQUESTS_STORAGE_KEY, borrowRequests);
  renderAll();
  showToast(`Đã duyệt yêu cầu của ${getReaderName(request.readerId)}; hạn trả sau 14 ngày.`);
}
function rejectBorrowRequest(id) {
  if (!requireAdmin()) return;
  const request = borrowRequests.find((item) => item.id === id && item.status === "pending");
  if (!request) return;
  request.status = "rejected";
  request.reviewedOn = localDateISO(new Date());
  persistRecords(BORROW_REQUESTS_STORAGE_KEY, borrowRequests);
  renderAll();
  showToast("Đã từ chối yêu cầu mượn sách.");
}
function returnLoan(id) {
  if (!requireAdmin()) return;
  const loan = loans.find((item) => item.id === id && !item.returnedOn);
  if (!loan) return;
  loan.returnedOn = localDateISO(new Date());
  persistRecords(LOANS_STORAGE_KEY, loans);
  renderAll();
  showToast(`Đã ghi nhận trả “${getBookTitle(loan.isbn)}”.`);
}
function removeReader(id) {
  if (!requireAdmin()) return;
  if (id === DEMO_ACCOUNTS.docgia.readerId) {
    showToast("Không thể xóa hồ sơ gắn với tài khoản người mượn demo.", true);
    return;
  }
  if (activeLoans().some((loan) => loan.readerId === id)) {
    showToast("Độc giả đang mượn sách nên chưa thể xóa.", true);
    return;
  }
  if (pendingBorrowRequests().some((request) => request.readerId === id)) {
    showToast("Độc giả đang có yêu cầu mượn chờ duyệt nên chưa thể xóa.", true);
    return;
  }
  const reader = readers.find((item) => item.id === id);
  if (!reader || !window.confirm(`Xóa hồ sơ độc giả “${reader.name}”? Lịch sử mượn vẫn được lưu.`)) return;
  readers = readers.filter((item) => item.id !== id);
  persistRecords(READERS_STORAGE_KEY, readers);
  renderAll();
  showToast("Đã xóa hồ sơ độc giả.");
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
function exportBooksCSV() {
  if (!requireAdmin()) return;
  const header = ["ISBN", "Nhan đề", "Tác giả", "Nhà xuất bản", "Năm xuất bản", "Thể loại", "URL ảnh bìa nhà xuất bản"];
  const rows = bst.traverse("LNR").map((book) => [book.isbn, book.title, book.author, book.publisher, book.year, book.category, book.coverUrl || ""]);
  const csv = "\uFEFF" + [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `danh-muc-sach-${localDateISO(new Date())}.csv`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`Đã xuất ${rows.length} đầu sách thành CSV.`);
}
function parseCSV(text) {
  const firstLine = text.match(/^[^\r\n]*/)?.[0] || "";
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const delimiter = semicolonCount > commaCount ? ";" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted && char === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell); cell = "";
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (quoted) throw new Error("CSV có dấu ngoặc kép chưa đóng.");
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}
function normalizeCSVHeader(value) {
  return String(value).replace(/^\uFEFF/, "").trim().toLocaleLowerCase("vi")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}
async function importBooksCSV(file) {
  if (!requireAdmin()) return;
  try {
    const rows = parseCSV(await file.text());
    if (rows.length < 2) throw new Error("Tệp CSV cần có dòng tiêu đề và ít nhất một đầu sách.");
    const headers = rows[0].map(normalizeCSVHeader);
    const findColumn = (...names) => headers.findIndex((header) => names.includes(header));
    const columns = {
      isbn: findColumn("isbn"), title: findColumn("nhande", "nhane", "title"), author: findColumn("tacgia", "author"),
      publisher: findColumn("nhaxuatban", "publisher"), year: findColumn("namxuatban", "nam", "year"), category: findColumn("theloai", "category"),
      coverUrl: findColumn("urlanhbia", "urlanhbianhaxuatban", "anhbia", "anhbianhaxuatban", "coverurl", "coverimageurl", "imageurl", "cover"),
    };
    if ([columns.isbn, columns.title, columns.author].some((index) => index < 0)) {
      throw new Error("Thiếu cột bắt buộc ISBN, Nhan đề hoặc Tác giả.");
    }
    const existing = new Set(books.map((book) => book.isbn));
    let imported = 0;
    let skipped = 0;
    rows.slice(1).forEach((row) => {
      const value = (column) => column < 0 ? "" : String(row[column] || "").trim();
      const isbn = normalizeISBN(value(columns.isbn));
      const title = value(columns.title);
      const author = value(columns.author);
      const yearText = value(columns.year);
      const year = yearText ? Number(yearText) : "";
      const coverUrlText = value(columns.coverUrl);
      const coverUrl = normalizeCoverUrl(coverUrlText);
      if (!validISBN(isbn) || existing.has(isbn) || !title || !author ||
        (yearText && (!Number.isInteger(year) || year < 1400 || year > 2100)) || (coverUrlText && !coverUrl)) {
        skipped += 1;
        return;
      }
      existing.add(isbn);
      books.push({ isbn, title, author, publisher: value(columns.publisher), year, category: value(columns.category) || "Chưa phân loại", coverUrl: coverUrl || "" });
      imported += 1;
    });
    if (!imported) throw new Error(`Không có dòng hợp lệ để nhập; đã bỏ qua ${skipped} dòng.`);
    bst = new BookBST(books);
    persistBooks();
    renderAll();
    showToast(`Đã nhập ${imported} sách${skipped ? `, bỏ qua ${skipped} dòng lỗi hoặc trùng ISBN` : ""}.`);
  } catch (error) {
    showToast(error.message || "Không thể đọc tệp CSV.", true);
  }
}

document.addEventListener("error", (event) => {
  if (event.target.matches?.(".publisher-cover-image")) event.target.remove();
}, true);
ui.nav.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
$("#add-book-button").addEventListener("click", () => openBookDialog(null, null));
$("#empty-add-button").addEventListener("click", () => openBookDialog(null, null));
ui.search.addEventListener("input", renderCatalog);
ui.category.addEventListener("change", renderCatalog);
ui.authorFilter.addEventListener("change", renderCatalog);
ui.yearFilter.addEventListener("change", renderCatalog);
ui.sort.addEventListener("change", renderCatalog);
ui.listViewButton.addEventListener("click", () => setCatalogView("list"));
ui.gridViewButton.addEventListener("click", () => setCatalogView("grid"));
ui.favoritesFilter.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  renderCatalog();
});
ui.themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme); } catch { /* Theme remains active for this session. */ }
});
ui.loanStatusFilter.addEventListener("change", renderLoans);
ui.clearSearch.addEventListener("click", () => {
  ui.search.value = "";
  ui.search.focus();
  renderCatalog();
});
ui.rows.addEventListener("click", handleBookAction);
ui.bookGrid.addEventListener("click", handleBookAction);
ui.featuredBooks.addEventListener("click", handleBookAction);
$("#export-books-button").addEventListener("click", exportBooksCSV);
$("#import-books-button").addEventListener("click", () => ui.importInput.click());
ui.importInput.addEventListener("change", () => {
  const file = ui.importInput.files && ui.importInput.files[0];
  if (file) importBooksCSV(file);
  ui.importInput.value = "";
});
$("#add-reader-button").addEventListener("click", openReaderDialog);
$("#add-loan-button").addEventListener("click", openLoanDialog);
ui.readerForm.addEventListener("submit", saveReader);
ui.readerForm.addEventListener("input", () => { ui.readerFormError.hidden = true; });
ui.loanForm.addEventListener("submit", saveLoan);
ui.loanForm.addEventListener("input", () => { ui.loanFormError.hidden = true; });
$("#close-reader-dialog").addEventListener("click", () => ui.readerDialog.close());
$("#cancel-reader-dialog").addEventListener("click", () => ui.readerDialog.close());
$("#close-loan-dialog").addEventListener("click", () => ui.loanDialog.close());
$("#cancel-loan-dialog").addEventListener("click", () => ui.loanDialog.close());
ui.loanRows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-return-loan]");
  if (button) returnLoan(button.dataset.returnLoan);
});
ui.requestRows.addEventListener("click", (event) => {
  const approveButton = event.target.closest("button[data-approve-request]");
  const rejectButton = event.target.closest("button[data-reject-request]");
  if (approveButton) approveBorrowRequest(approveButton.dataset.approveRequest);
  else if (rejectButton) rejectBorrowRequest(rejectButton.dataset.rejectRequest);
});
ui.readerRows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-delete-reader]");
  if (button) removeReader(button.dataset.deleteReader);
});

$("#close-book-dialog").addEventListener("click", closeBookDialog);
$("#cancel-book-dialog").addEventListener("click", closeBookDialog);
ui.form.addEventListener("input", clearFormError);
ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitBook();
});
ui.bookDialog.addEventListener("close", () => {
  if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  else $("#add-book-button").focus();
  returnFocus = null;
});
ui.bookDialog.addEventListener("click", (event) => {
  if (event.target === ui.bookDialog) closeBookDialog();
});
$("#cancel-delete").addEventListener("click", () => ui.deleteDialog.close());
$("#confirm-delete").addEventListener("click", deleteBook);
ui.deleteDialog.addEventListener("close", () => {
  if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  returnFocus = null;
  deletingISBN = null;
});
ui.deleteDialog.addEventListener("click", (event) => {
  if (event.target === ui.deleteDialog) ui.deleteDialog.close();
});
document.querySelectorAll(".traversal-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeTraversal = button.dataset.traversal;
    renderTree();
  });
});
$("#reset-sample-button").addEventListener("click", () => {
  if (!requireAdmin()) return;
  if (pendingBorrowRequests().length) {
    showToast("Hãy duyệt hoặc từ chối các yêu cầu mượn trước khi khôi phục danh mục.", true);
    return;
  }
  if (activeLoans().length) {
    showToast("Hãy ghi nhận trả tất cả sách trước khi khôi phục dữ liệu mẫu.", true);
    return;
  }
  if (!window.confirm(`Khôi phục ${DEFAULT_BOOKS.length} đầu sách mẫu? Dữ liệu đang lưu trên thiết bị sẽ được thay thế.`)) return;
  books = DEFAULT_BOOKS.map((book) => ({ ...book }));
  bst = new BookBST(books);
  persistBooks();
  renderAll();
  showToast(`Đã khôi phục ${DEFAULT_BOOKS.length} đầu sách mẫu.`);
});

window.addEventListener("storage", (event) => {
  let changed = false;
  if (event.key === STORAGE_KEY) {
    books = readBooks();
    bst = new BookBST(books);
    changed = true;
  } else if (event.key === READERS_STORAGE_KEY) {
    readers = readStoredArray(READERS_STORAGE_KEY).filter((reader) => reader && reader.id && reader.name);
    changed = true;
  } else if (event.key === LOANS_STORAGE_KEY) {
    loans = readStoredArray(LOANS_STORAGE_KEY).filter((loan) => loan && loan.id && loan.isbn && loan.readerId);
    changed = true;
  } else if (event.key === BORROW_REQUESTS_STORAGE_KEY) {
    borrowRequests = readStoredArray(BORROW_REQUESTS_STORAGE_KEY).filter((request) =>
      request && request.id && request.isbn && request.readerId && ["pending", "approved", "rejected"].includes(request.status)
    );
    changed = true;
  } else if (event.key === FAVORITES_STORAGE_KEY) {
    favorites = readStoredArray(FAVORITES_STORAGE_KEY).filter((favorite) => favorite && favorite.readerId && favorite.isbn);
    changed = true;
  } else if (event.key === THEME_STORAGE_KEY) {
    applyTheme(readPreference(THEME_STORAGE_KEY, "light"));
  } else if (event.key === CATALOG_VIEW_STORAGE_KEY) {
    const nextView = readPreference(CATALOG_VIEW_STORAGE_KEY, "grid");
    if (["list", "grid"].includes(nextView)) catalogView = nextView;
    changed = true;
  }
  if (changed) renderAll();
});

if (needsDemoReaderSeed) persistRecords(READERS_STORAGE_KEY, readers);
setAuthenticated(readAuthenticatedUser());
const requestedView = window.location.hash.slice(1);
switchView(["catalog", "tree", "circulation", "my-loans", "analytics"].includes(requestedView) ? requestedView : "catalog");
renderAll();
try {
  if (window.localStorage.getItem(STORAGE_KEY) === null) persistBooks();
} catch {
  ui.storage.textContent = "Chỉ lưu trong phiên này";
}
