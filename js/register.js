if (localStorage.getIteam("curentUser")) {
  location.href = "index.html";
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();
  let username = document.getElementById("username").value.trim();

  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  if (username.length < 6) {
    alert("Tên đăng nhập phải có ít nhất 6 ký tự.");
  } else if (password.length < 8) {
    alert("Mật khẩu phải có ít nhất 8 ký tự.");
  } else if (!password.match(lowerCaseLetters)) {
    alert("Mật khẩu phải chứa ít nhất một chữ cái viết thường.");
  } else if (!password.match(upperCaseLetters)) {
    alert("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
  } else if (!password.match(numbers)) {
    alert("Mật khẩu phải chứa ít nhất một chữ số.");
  } else {
    if (loacalStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users"));

      users.push({
        email,
        password,
        username,
      });

      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            email,
            password,
            username,
          },
        ])
      );
    }
    location.href = "login.html";
  }
});

// Lưu user vào localStorage (key: "users") và chuyển về login sau khi đăng ký thành công
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) {
    console.error("Không tìm thấy form #registerForm trong register.html");
    return;
  }

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
    console.log("Đã lưu users:", users);
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
      alert("Mật khẩu cần chữ thường");
      return;
    }
    if (!reUpper.test(password)) {
      alert("Mật khẩu cần chữ hoa");
      return;
    }
    if (!reNumberOrSpecial.test(password)) {
      alert("Mật khẩu cần số hoặc ký tự đặc biệt");
      return;
    }
    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    const users = loadUsers();
    if (users.find((u) => (u.email || "").toLowerCase() === email)) {
      alert("Email này đã được đăng ký.");
      return;
    }

    const newUser = { name, email, password, createdAt: Date.now() };
    users.push(newUser);

    try {
      saveUsers(users);
    } catch (err) {
      console.error("Lỗi lưu users", err);
      alert("Lỗi khi lưu dữ liệu. Kiểm tra console.");
      return;
    }

    alert("Đăng ký thành công. Mời bạn đăng nhập.");
    // chuyển về trang login để người dùng đăng nhập
    window.location.href = "login.html";
  });
});
