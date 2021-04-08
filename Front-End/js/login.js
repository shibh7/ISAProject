const exists = true;

localStorage.clear();

document.getElementById("adminLog").onclick = function() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.trim() != "" && password.trim() != ""){
        if(exists){
            console.log(username);
            console.log(password);
            let postObj = JSON.stringify({"username": username, "password": password});
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8888/API/V1/login", true);
            xhttp.setRequestHeader("Content-Type", "text/plain");
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    let userID = this.responseText;
                    localStorage.setItem("userID", userID);
                    window.location.replace("home.html");
                }
            }
            xhttp.send(postObj);
        } else {
            console.log("User does not exist.");
        }

    } else {
        console.log("Login Failed :: Both Fields Must Be Filled In");
    }
};