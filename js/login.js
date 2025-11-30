// Login + Remember me + icon mắt show/hide password
(() => {
  // Nếu đã có user trong session hoặc remember thì cho qua luôn
  const rememberedUser = localStorage.getItem("currentUser");
  const sessionUser = sessionStorage.getItem("currentUser");
  if (rememberedUser || sessionUser) {
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("loginForm");
  if (!form) {
    console.error("Không tìm thấy form #loginForm trong login.html");
    return;
  }

  // Xử lý icon con mắt show/hide password
  document.querySelectorAll(".password-toggle").forEach((icon) => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (!input) return;

    icon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.textContent = isHidden ? "🙈" : "👁"; // đổi icon cho dễ nhìn
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = (document.getElementById("email")?.value || "")
      .trim()
      .toLowerCase();
    const password = (document.getElementById("password")?.value || "").trim();
    const rememberMe = document.getElementById("remember")?.checked || false;

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch (err) {
      console.error("Lỗi đọc users:", err);
      alert("Dữ liệu người dùng bị lỗi. Vui lòng đăng ký lại.");
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
      const passInput = document.getElementById("password");
      if (passInput) {
        passInput.value = "";
        passInput.focus();
      }
      return;
    }

    // Đăng nhập thành công
    const userInfo = { name: existingUser.name, email: existingUser.email };

    // Luôn lưu cho phiên hiện tại
    sessionStorage.setItem("currentUser", JSON.stringify(userInfo));
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("userEmail", existingUser.email);

    // Nếu chọn Remember me thì lưu thêm vào localStorage
    if (rememberMe) {
      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("rememberMe");
    }

    window.location.href = "index.html";
  });
})();
