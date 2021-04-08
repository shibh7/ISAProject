let uid = parseInt(JSON.parse(localStorage.getItem("userID")).userID);
console.log(uid);

let textBoxNum = 1;

let textName = document.createElement("textarea");
textName.id = "textName";
textName.placeholder = "Todo Title";
let textDate = document.createElement("textarea");
textDate.id = "textDate";
textDate.placeholder = "Date";
let firstItem = document.createElement("textarea");
firstItem.id = "item0";
firstItem.placeholder = "Item";
let breakItem = document.createElement("br");
breakItem.id = "break0";

document.getElementById("titleDiv").appendChild(textName);
document.getElementById("addDiv").appendChild(firstItem);
document.getElementById("addDiv").appendChild(breakItem);
document.getElementById("dateDiv").appendChild(textDate);

function addItem(){
    let newItem = document.createElement("textarea");
    let newBreak = document.createElement("br");
    newBreak.id = "break" + textBoxNum;
    newItem.id = "item" + textBoxNum;
    newItem.placeholder = "Item";
    document.getElementById("addDiv").appendChild(newItem);
    document.getElementById("addDiv").appendChild(newBreak);
    textBoxNum++;
}

function removeItem(){
    if(textBoxNum != 1){
        textBoxNum--;
        document.getElementById("item" + textBoxNum).remove();
        document.getElementById("break" + textBoxNum).remove();
    }
}

function addTodo(){
    let todoTitle = document.getElementById("textName").value;
    if(todoTitle.trim() == ""){
        console.log("All Fields Must Be Filled!")
        return;
    }
    let todoArray = [];
    let todoDate = document.getElementById("textDate").value;
    if(todoDate.trim() == ""){
        console.log("All Fields Must Be Filled!")
        return;
    }
    for(let i = 0; i < textBoxNum; i++){
        let itemText = document.getElementById("item" + i).value;
        if(itemText.trim() == ""){
            console.log("All Fields Must Be Filled!")
            return;
        }
        let object2 = {"description": itemText};
        todoArray.push(object2);
    }

    let obj = JSON.stringify({"todo": {"name": todoTitle, "date": todoDate, "todolist": todoArray}});
    console.log(obj);

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://kaushalanimesh.com/API/V1/usertodo/" + uid, true);
    xhttp.setRequestHeader("api-key", "sup3rAp1K3y");
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 201){
            console.log("added todo");
            window.location.href = "./home.html";
        }
    }
    xhttp.send(obj);
}
