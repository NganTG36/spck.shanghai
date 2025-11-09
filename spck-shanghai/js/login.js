(() => {
  // Kiểm tra nếu đã đăng nhập thì chuyển sang trang chủ
  if (localStorage.getItem("currentUser")) {
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const raw = localStorage.getItem("users");
    if (!raw) {
      alert("Chưa có tài khoản nào được đăng ký. Vui lòng đăng ký trước!");
      window.location.href = "register.html";
      return;
    }

    let users = [];
    try {
      users = JSON.parse(raw);
    } catch (err) {
      console.error("Không thể đọc dữ liệu người dùng từ localStorage", err);
      alert("Có lỗi xảy ra. Vui lòng đăng ký lại!");
      return;
    }

    // Kiểm tra email tồn tại
    const existingUser = users.find((u) => u.email.toLowerCase() === email);
    if (!existingUser) {
      alert(
        "Email này chưa được đăng ký! Vui lòng kiểm tra lại hoặc đăng ký mới."
      );
      return;
    }

    // Kiểm tra mật khẩu
    if (existingUser.password !== password) {
      alert("Mật khẩu không chính xác! Vui lòng thử lại.");
      document.getElementById("password").value = "";
      return;
    }

    // Đăng nhập thành công
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: existingUser.name,
        email: existingUser.email,
      })
    );
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userEmail", existingUser.email);

    // Chuyển đến trang chủ
    window.location.href = "index.html";
  });
})();
