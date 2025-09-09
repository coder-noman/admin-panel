
const validUsername = "admin";
const validPassword = "1234";

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    if (usernameInput === validUsername && passwordInput === validPassword) {
        window.location.href = "./app/index.html";
    } else {
        alert("Incorrect username or password!");
        window.location.reload();
    }
});
