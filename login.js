<!doctype html>
<html lang="vi">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Login</title>
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
            color: #e6eef8;
        }

        body {
            background: url('namkinh.png') center/cover no-repeat fixed;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 28px 48px;
            gap: 20px;
            pointer-events: none;
        }

        .nav {
            display: flex;
            gap: 28px;
            align-items: center;
            pointer-events: auto;
        }

        .nav a {
            color: rgba(255, 255, 255, 0.92);
            text-decoration: none;
            font-weight: 600;
            padding: 10px 14px;
            border-radius: 6px;
            transition: background .18s, transform .12s;
        }

        .nav a:hover {
            background: rgba(255, 255, 255, 0.04);
            transform: translateY(-2px);
        }

        .modal-wrap {
            min-height: calc(100vh - 160px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        /* MẠNH HÓA KHUNG: nền sáng hơn, bo-shadow sâu hơn, chữ và input rõ nét */
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

        .glass:hover {
            transform: translateY(-4px);
            box-shadow: 0 26px 70px rgba(2,6,23,0.7);
        }

        /* làm lớp overlay nhẹ hơn để không che chữ */
        .glass::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.04));
            pointer-events: none;
            mix-blend-mode: normal;
        }

        .close-btn {
            position: absolute;
            right: 14px;
            top: 10px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: inline-grid;
            place-items: center;
            background: rgba(15, 23, 36, 0.9);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.06);
            cursor: pointer;
            z-index: 5;
        }

        h1 {
            margin: 6px 0 18px;
            text-align: center;
            font-size: 28px;
            color: #071226;
            text-shadow: none;
            font-weight: 800;
        }

        form .field {
            margin: 18px 6px;
            position: relative;
        }

        label {
            display: block;
            font-size: 13px;
            color: rgba(7, 18, 38, 0.75);
            margin-bottom: 8px;
        }

        /* INPUT rõ ràng hơn: nền trắng, viền, bóng nhẹ; highlight khi focus */
        input[type="email"],
        input[type="password"] {
            width: 100%;
            background: #ffffff;
            border: 1px solid rgba(11, 17, 32, 0.12);
            padding: 12px 38px 10px 10px;
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

        input[type="email"]:focus,
        input[type="password"]:focus {
            border-color: #0f1724;
            box-shadow: 0 8px 28px rgba(15, 23, 36, 0.12);
            transform: translateY(-1px);
            background: #fff;
        }

        .icon {
            position: absolute;
            right: 8px;
            top: 34px;
            opacity: 0.9;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(7, 18, 38, 0.6);
        }

        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            gap: 12px;
            flex-wrap: wrap;
        }

        .checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(7, 18, 38, 0.7);
            font-size: 14px;
        }

        .forgot {
            color: rgba(7, 18, 38, 0.75);
            font-weight: 700;
            text-decoration: none;
            font-size: 13px;
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
            box-shadow: 0 10px 32px rgba(2, 6, 23, 0.45);
        }

        .small {
            margin-top: 14px;
            font-size: 13px;
            color: rgba(7, 18, 38, 0.7);
            text-align: center;
        }

        .small a {
            color: rgba(7, 18, 38, 0.95);
            font-weight: 700;
            text-decoration: none;
        }

        .hidden {
            display: none !important;
        }

        @media (max-width:520px) {
            .topbar {
                padding: 16px;
            }

            .glass {
                padding: 22px;
                border-radius: 14px;
            }
        }
    </style>
</head>

<body>
    <header class="topbar">
        <div class="logo"></div>
        <nav class="nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <a id="openLogin" href="#"
                style="border:1px solid rgba(255,255,255,0.22); padding:8px 14px; border-radius:8px;">Login</a>
        </nav>
    </header>

    <main class="modal-wrap">
        <section id="loginModal" class="glass" role="dialog" aria-labelledby="loginTitle">
            <button class="close-btn" id="closeBtn" aria-label="Close">✕</button>

            <h1 id="loginTitle">Login</h1>

            <form id="loginForm" autocomplete="on" novalidate>
                <div class="field">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="your@email.com" required>
                    <span class="icon" aria-hidden="true">📧</span>
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="••••••••" required>
                    <span class="icon" aria-hidden="true">🔒</span>
                </div>

                <div class="row">
                    <label class="checkbox"><input type="checkbox" name="remember"> Remember me</label>
                    <a class="forgot" href="#">Forget Password?</a>
                </div>

                <button class="btn" type="submit">Login</button>

                <div class="small">Don't have an account? <a id="registerLink" href="register.html"
                        style="font-weight:700">Register</a></div>
            </form>
        </section>
    </main>

    <script>
        // modal open/close
        const modal = document.getElementById('loginModal');
        const closeBtn = document.getElementById('closeBtn');
        const openBtn = document.getElementById('openLogin');
        const registerLink = document.getElementById('registerLink');

        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // xử lý đăng nhập: kiểm tra với users trong localStorage, lưu currentUser và chuyển tới index.html
        document.addEventListener('DOMContentLoaded', () => {
          // nếu đã đăng nhập -> chuyển thẳng tới index
          if (localStorage.getItem('currentUser')) {
            location.href = 'index.html';
            return;
          }

          const form = document.getElementById('loginForm');
          if (!form) return;

          function readUsers() {
            try { return JSON.parse(localStorage.getItem('users') || '[]'); }
            catch { return []; }
          }

          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = (document.getElementById('email') || {}).value?.trim().toLowerCase() || '';
            const password = (document.getElementById('password') || {}).value || '';

            if (!email || !password) { alert('Vui lòng nhập email và mật khẩu.'); return; }

            const users = readUsers();
            if (!users.length) { alert('Chưa có người dùng nào. Vui lòng đăng ký trước.'); return; }

            const user = users.find(u => (u.email || '').toLowerCase() === email && u.password === password);
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              // tùy muốn: cũng lưu session để hiển thị tên trên index
              sessionStorage.setItem('userEmail', user.email);
              sessionStorage.setItem('loggedIn', '1');
              location.href = 'index.html';
            } else {
              alert('Email hoặc mật khẩu không đúng.');
            }
          });
        });
    </script>
</body>

</html>