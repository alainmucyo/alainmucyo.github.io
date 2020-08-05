firebase.auth().onAuthStateChanged(function (user) {
    // var loginMenu=document.getElementById("login");

    if (user) {
        window.location="index.html";
    }
});

function login(event) {
    event.preventDefault();
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var loginBtn = document.getElementById("login_btn");
    var loginBtnText = document.getElementById("login_btn_text");
    var loaderImg = document.getElementById("loader_img");

    loginBtnText.innerText = "Logging in.....";
    loaderImg.style.display = "inline-block";
    loginBtn.style.justifyContent = "space-between";
    var email = emailInput.value;
    var password = passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (resp) {
            location = "index.html";
        })
        .catch(function (error) {
            document.getElementById("invalid").style.display = "inline-block";
            emailInput.classList.add("invalid");
            passwordInput.classList.add("invalid");
            loginBtnText.innerText = "Login";
            loaderImg.style.display = "none";
            loginBtn.style.justifyContent = "center";
        });
}
