const exists = false;

localStorage.clear();

document.getElementById("signupbutton").onclick = function() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;

    if(username.trim() != "" && password.trim() != "" 
    && first.trim() != "" && last.trim() != ""){
        console.log(username);
        console.log(password);
        console.log(first);
        console.log(last);
        let postObj = JSON.stringify({"username": username, "password": password, "firstname": first, "lastname": last});
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8888/API/V1/signup/", true);
        xhttp.setRequestHeader("Content-Type", "text/plain");
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 201){
                document.getElementById("Result").innerHTML = "";
                let successMess = document.createElement("h3");
                successMess.appendChild(document.createTextNode("Sign-Up Successful"));
                document.getElementById("Result").appendChild(successMess);
                document.getElementById("signup").style.display = "none";
                console.log("Sign-Up Success");
            }
            if(this.readyState == 4 && this.status == 409){
                document.getElementById("Result").innerHTML = "";
                let successMess = document.createElement("h3");
                successMess.style.color = "red";
                successMess.appendChild(document.createTextNode("Sign-Up Failed :: User with That Name Already Exists!"));
                document.getElementById("Result").appendChild(successMess);
                console.log("Sign-Up Fail");
            }
        }
        xhttp.send(postObj);
    } else {
        console.log("Sign-Up Failed :: Both Fields Must Be Filled In");
    }
};