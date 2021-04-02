const tempUName = "admin";
const tempPWord = "password";
const tempData = {"stats": [{ "uri": "get", "method" : "xyz", "count": 5 },
{ "uri": "post", "method" : "abc", "count": 5 }]};

localStorage.clear();

function loadStatistics(statistic){
    console.log(statistic);
    let table = document.createElement("table");
    table.id = "mainTable";
    table.cellSpacing = 30;
    let titleRow = document.createElement("tr");
    let cell1 = document.createElement("td");
    cell1.appendChild(document.createTextNode("Method"));
    let cell2 = document.createElement("td");
    cell2.appendChild(document.createTextNode("Endpoint"));
    let cell3 = document.createElement("td");
    cell3.appendChild(document.createTextNode("Requests"));
    titleRow.appendChild(cell1);
    titleRow.appendChild(cell2);
    titleRow.appendChild(cell3);
    table.appendChild(titleRow);

    let statArray = statistic.stats;

    for(let i = 0; i < statArray.length; i++){
        let newRow = document.createElement("tr");
        let method = document.createElement("td");
        let endpoint = document.createElement("td");
        let req = document.createElement("td");
        method.appendChild(document.createTextNode(statArray[i].method));
        endpoint.appendChild(document.createTextNode(statArray[i].endpoint));
        req.appendChild(document.createTextNode(statArray[i].requestCount));
        newRow.appendChild(method);
        newRow.appendChild(endpoint);
        newRow.appendChild(req);
        table.appendChild(newRow);
    }
    document.getElementById("statistic-list").appendChild(table);
}

document.getElementById("adminLog").onclick = function() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.trim() != "" && password.trim() != ""){
        console.log(username);
        console.log(password);
        if(username == tempUName && password == tempPWord){
            document.getElementById("login").style.display = "none";
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://kaushalanimesh.com/API/V1/adminHome/", true);
            xhttp.setRequestHeader("Content-Type", "text/plain");
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    loadStatistics(JSON.parse(this.responseText));
                }
            }
            xhttp.send();
        } else {
            console.log("Login Failed :: Incorrect Password");
        }
    } else {
        console.log("Login Failed :: Both Fields Must Be Filled In");
    }
};