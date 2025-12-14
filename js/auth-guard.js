if (
  !localStorage.getItem("currentUser") &&
  !sessionStorage.getItem("currentUser")
) {
  window.location.href = "login.html";
}
