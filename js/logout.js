document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
  e.preventDefault();

  // ❌ KHÔNG xoá users
  // localStorage.clear();

  // ✅ Chỉ xoá trạng thái đăng nhập
  localStorage.removeItem("currentUser");
  localStorage.removeItem("rememberMe");

  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("userEmail");

  window.location.href = "login.html";
});
