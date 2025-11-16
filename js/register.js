(() => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  // Định nghĩa các regex kiểm tra mật khẩu
  const reLower = /[a-z]/; // chữ thường
  const reUpper = /[A-Z]/; // chữ hoa
  const reNumberOrSpecial = /[0-9\W_]/; // số hoặc ký tự đặc biệt

  // Đọc danh sách người dùng từ localStorage
  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }

  // Lưu danh sách người dùng vào localStorage
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    if (!name || !email || !password || !confirm) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra các điều kiện đăng ký
    if (name.length < 6) {
      alert("Tên phải có ít nhất 6 ký tự!");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    if (!reLower.test(password)) {
      alert("Mật khẩu phải chứa ít nhất 1 chữ thường!");
      return;
    }
    if (!reUpper.test(password)) {
      alert("Mật khẩu phải chứa ít nhất 1 chữ hoa!");
      return;
    }
    if (!reNumberOrSpecial.test(password)) {
      alert("Mật khẩu phải chứa ít nhất 1 số hoặc ký tự đặc biệt!");
      return;
    }
    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const users = loadUsers();
    if (users.find((u) => u.email === email)) {
      alert("Email này đã được đăng ký!");
      return;
    }

    // Lưu người dùng mới
    users.push({
      name,
      email,
      password,
      createdAt: Date.now(),
    });
    saveUsers(users);

    // Chuyển đến trang chủ
    window.location.href = "index.html";
  });
})();
