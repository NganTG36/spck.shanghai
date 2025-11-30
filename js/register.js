// Đăng ký tài khoản + icon mắt cho password
document.addEventListener("DOMContentLoaded", () => {
  // Nếu đã login rồi thì không cho vào lại
  if (
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser")
  ) {
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("registerForm");
  if (!form) {
    console.error("Không tìm thấy form #registerForm trong register.html");
    return;
  }

  // Icon mắt cho password & confirm
  const toggleIcons = document.querySelectorAll(".password-toggle");
  toggleIcons.forEach((icon) => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (!input) return;

    icon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.textContent = isHidden ? "🙈" : "👁";
    });
  });

  const reLower = /[a-z]/;
  const reUpper = /[A-Z]/;
  const reNumberOrSpecial = /[0-9\W_]/;

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch (e) {
      console.error("Lỗi parse users", e);
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.getElementById("name")?.value || "").trim();
    const email = (document.getElementById("email")?.value || "")
      .trim()
      .toLowerCase();
    const password = (document.getElementById("password")?.value || "").trim();
    const confirm = (document.getElementById("confirm")?.value || "").trim();

    if (!name || !email || !password || !confirm) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (name.length < 6) {
      alert("Tên phải có ít nhất 6 ký tự!");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    if (!reLower.test(password)) {
      alert("Mật khẩu cần ít nhất 1 chữ thường!");
      return;
    }
    if (!reUpper.test(password)) {
      alert("Mật khẩu cần ít nhất 1 chữ hoa!");
      return;
    }
    if (!reNumberOrSpecial.test(password)) {
      alert("Mật khẩu cần số hoặc ký tự đặc biệt!");
      return;
    }
    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const users = loadUsers();
    if (users.find((u) => (u.email || "").toLowerCase() === email)) {
      alert("Email này đã được đăng ký.");
      return;
    }

    users.push({ name, email, password, createdAt: Date.now() });
    saveUsers(users);

    alert("Đăng ký thành công. Mời bạn đăng nhập.");
    window.location.href = "login.html";
  });
});
