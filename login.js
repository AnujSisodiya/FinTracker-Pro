const loginForm = document.querySelector(".loginform");

loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const username =document.getElementById("username").value.trim();
    const password =document.getElementById("password").value.trim();

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
        alert("No account found. Please register first.");
        return;
    }

    if(username === user.username && password === user.password){
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "dashboard.html";
    }
    else {

        alert("Invalid Username or Password");

    }

})