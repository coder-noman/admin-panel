const validUsername = "admin";
const validPassword = "1745#";
const validClientUsername = "rakesh";
const validClientPassword = "rakesh007#";

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  if (usernameInput === validUsername && passwordInput === validPassword) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "admin");
    localStorage.setItem("loginTime", Date.now().toString());
    window.location.href = "./app/index.html";
  } else if (usernameInput === validClientUsername && passwordInput === validClientPassword) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "client");
    localStorage.setItem("loginTime", Date.now().toString());
    window.location.href = "./app/client.html";
  } else {
    alert("Incorrect username or password!");
    window.location.reload();
  }
});