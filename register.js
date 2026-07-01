const registerForm = document.querySelector(".loginform");

registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "" || password === ""){
        alert("Please fill all the fields.");
        return;
    }

    const user = {
        username, 
        password
    };

    localStorage.setItem("user",JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "login.html";
});