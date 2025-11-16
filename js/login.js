// Xác thực đăng nhập với users lưu trong localStorage và chuyển sang index.html
(() => {
  // Nếu đã login thì chuyển thẳng
  if (localStorage.getItem("currentUser")) {
    console.log("Đã có currentUser -> chuyển tới index.html");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("loginForm");
  if (!form) {
    console.error(
      "Không tìm thấy form #loginForm trong trang. Kiểm tra login.html"
    );
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = (document.getElementById("email")?.value || "")
      .trim()
      .toLowerCase();
    const password = (document.getElementById("password")?.value || "").trim();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const raw = localStorage.getItem("users");
    if (!raw) {
      alert("Chưa có tài khoản. Vui lòng đăng ký trước!");
      window.location.href = "register.html";
      return;
    }

    let users = [];
    try {
      users = JSON.parse(raw);
    } catch (err) {
      console.error("Lỗi đọc users:", err);
      alert("Dữ liệu người dùng bị lỗi. Vui thử đăng ký lại.");
      return;
    }

    const existingUser = users.find(
      (u) => (u.email || "").toLowerCase() === email
    );
    if (!existingUser) {
      alert("Email chưa được đăng ký.");
      return;
    }

    if (existingUser.password !== password) {
      alert("Mật khẩu không đúng.");
      document.getElementById("password").value = "";
      document.getElementById("password").focus();
      return;
    }

    // Đăng nhập thành công: lưu currentUser và redirect
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: existingUser.name, email: existingUser.email })
    );
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userEmail", existingUser.email);

    console.log("Đăng nhập thành công:", existingUser.email);
    // điều hướng tới index.html
    window.location.href = "index.html";
  });
})();
