<!doctype html>
<html lang="vi">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Register</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent: #1f2937;
            --glass-border: rgba(11, 17, 32, 0.08);
            --glass-bg: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,250,250,0.96));
        }

        html,
        body {
            height: 100%;
            margin: 0;
            font-family: 'Nunito', system-ui, Arial;
            color: #071226;
            background: url('namkinh.png') center/cover no-repeat fixed;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
        }

        .glass {
            width: 420px;
            max-width: 92%;
            border-radius: 18px;
            background: var(--glass-bg);
            border: 1.5px solid var(--glass-border);
            box-shadow: 0 18px 50px rgba(2, 6, 23, 0.65), inset 0 1px 0 rgba(255,255,255,0.6);
            padding: 34px 36px 26px;
            position: relative;
            color: #071226;
            backdrop-filter: blur(6px) saturate(120%);
            -webkit-backdrop-filter: blur(6px) saturate(120%);
            overflow: hidden;
            transition: transform .18s, box-shadow .18s;
        }

        h1 {
            margin: 6px 0 18px;
            text-align: center;
            font-size: 28px;
            color: #071226;
            font-weight: 800;
        }

        form .field {
            margin: 14px 6px;
            position: relative;
        }

        label {
            display: block;
            font-size: 13px;
            color: rgba(7, 18, 38, 0.75);
            margin-bottom: 8px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            background: #ffffff;
            border: 1px solid rgba(11, 17, 32, 0.12);
            padding: 12px 12px;
            font-size: 15px;
            outline: none;
            color: #071226;
            border-radius: 8px;
            box-shadow: inset 0 1px 0 rgba(0,0,0,0.03);
            transition: border-color .15s, box-shadow .15s, transform .12s;
        }

        input::placeholder {
            color: rgba(7, 18, 38, 0.35);
        }

        input:focus {
            border-color: #0f1724;
            box-shadow: 0 8px 28px rgba(15, 23, 36, 0.12);
            transform: translateY(-1px);
            background: #fff;
        }

        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            gap: 12px;
            flex-wrap: wrap;
        }

        .btn {
            margin-top: 18px;
            width: 100%;
            display: inline-block;
            background: #0f1724;
            color: #fff;
            padding: 12px 16px;
            border-radius: 8px;
            text-align: center;
            font-weight: 700;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 32px rgba(2, 6, 23, 0.25);
        }

        .muted {
            margin-top: 14px;
            font-size: 13px;
            color: rgba(7, 18, 38, 0.7);
            text-align: center;
        }

        .muted a {
            color: rgba(7, 18, 38, 0.95);
            font-weight: 700;
            text-decoration: none;
        }

        .back-link {
            display: inline-block;
            margin-top: 12px;
            color: rgba(7,18,38,0.9);
            text-decoration: none;
            font-weight: 700;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid rgba(11,17,32,0.06);
            background: rgba(255,255,255,0.6);
        }

        @media (max-width:520px) {
            .glass { padding: 22px; border-radius: 14px; }
        }
    </style>
</head>

<body>
    <section class="glass" role="dialog" aria-labelledby="registerTitle">
        <h1 id="registerTitle">Register</h1>

        <form id="registerForm" autocomplete="on" novalidate>
            <div class="field">
                <label for="rname">Full name</label>
                <input id="rname" name="name" type="text" placeholder="Your full name" required>
            </div>

            <div class="field">
                <label for="remail">Email</label>
                <input id="remail" name="email" type="email" placeholder="your@email.com" required>
            </div>

            <div class="field">
                <label for="rpassword">Password</label>
                <input id="rpassword" name="password" type="password" placeholder="••••••••" required>
            </div>

            <button class="btn" type="submit">Create account</button>

            <div class="muted">Already have an account? <a href="login.html" id="backToLogin" style="font-weight:700">Login</a></div>
            <div style="text-align:center"><a class="back-link" href="login.html">← Back to Login</a></div>
        </form>
    </section>

    <script>
        // If already logged in -> go to index.html
if (localStorage.getItem("currentUser")) {
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }

  function saveUsers(list) {
    localStorage.setItem("users", JSON.stringify(list));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (document.getElementById("rname") || {}).value?.trim() || "";
    const email = (document.getElementById("remail") || {}).value?.trim() || "";
    const password = (document.getElementById("rpassword") || {}).value || "";

    // basic validations (the same as in hình)
    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /[0-9\W]/;

    if (name.length < 6) { alert('Tên đầy đủ phải ít nhất 6 ký tự'); return; }
    if (password.length < 8) { alert('Mật khẩu phải ít nhất 8 ký tự'); return; }
    if (!lower.test(password)) { alert('Mật khẩu phải chứa ít nhất 1 ký tự thường'); return; }
    if (!upper.test(password)) { alert('Mật khẩu phải chứa ít nhất 1 ký tự hoa'); return; }
    if (!number.test(password)) { alert('Mật khẩu phải chứa ít nhất 1 số hoặc ký tự đặc biệt'); return; }
    if (!email) { alert('Vui lòng cung cấp email'); return; }

    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert("Email này đã được sử dụng. Vui lòng dùng email khác hoặc đăng nhập.");
      return;
    }

    const user = { name, email, password }; // demo: lưu password thô (không dùng cho production)
    users.push(user);
    saveUsers(users);

    // set current user and session flags then redirect to index.html
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("loggedIn", "1");

    // small delay for UX then redirect
    setTimeout(() => {
      location.href = "index.html";
    }, 250);
  });
});

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  let lowerCaseLetter = /[a-z]/g;
  let upperCaseLetter = /[A-Z]/g;
  let numbers = /[0-9]/g;

  if (username.length < 6) {
    alert("Username must be at least 6 characters");
  } else if (password.length < 8) {
    alert("Password must be at least 8 characters");
  } else if (!password.match(lowerCaseLetter)) {
    alert("Password must contain a lowercase letter");
  } else if (!password.match(upperCaseLetter)) {
    alert("Password must contain an uppercase letter");
  } else if (!password.match(numbers)) {
    alert("Password must contain a number or special character");
  } else {
    if (localStorage.getItem("users")) {
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

    location.href = "./login/login.html";
  }
});
    </script>
</body>

</html>