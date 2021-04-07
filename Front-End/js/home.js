//UID gotten from local storage after login.
let uid = parseInt(JSON.parse(localStorage.getItem("userID")).userID);

//Test data
let obj = {"todoID": "1", "date": "2002-19-15", "name":"Chore List", "todolist": [{"itemID" : 5, "description": "Do the laundry"}, {"itemID" : 6, "description": "Walk the dog"}]};
let obj2 = {"todoID": "2", "date": "2008-49-13", "name":"Things to do before school", "todolist": [{"itemID" : 7, "description": "Write down schedule"}, {"itemID" : 8, "description": "Pay tuition"}]};
let todolist = {"todo": [obj, obj2]};

//Modal closing events.
document.getElementById("close").onclick = function(){
    document.getElementById("myModal").style.display = "none";
    document.getElementById("itemEdit").innerHTML = "";
    document.getElementById("buttonHolder").innerHTML = "";
}

document.getElementById("close2").onclick = function(){
    document.getElementById("myModal2").style.display = "none";
    document.getElementById("itemEdit2").innerHTML = "";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal") 
    || event.target == document.getElementById("myModal2")) {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("itemEdit").innerHTML = "";
        document.getElementById("buttonHolder").innerHTML = "";
        document.getElementById("myModal2").style.display = "none";
        document.getElementById("itemEdit2").innerHTML = "";
    }
  }

console.log(todolist)

//Calls an xmlhttp request, and returns the result.
function getTodos(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://kaushalanimesh.com/API/V1/user/" + uid, true);
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            return JSON.parse(this.responseText);
        }
    }
    xhttp.send();
    }

//Takes in a todo list item, and populates a modal using it.
function showModal(todo){
    console.log(todo);
    let list = todo.todolist;
    document.getElementById("itemEdit").innerHTML = "";
    document.getElementById("buttonHolder").innerHTML = "";
    let nameText = document.createElement("textarea");
    nameText.appendChild(document.createTextNode(todo.name));
    document.getElementById("itemEdit").appendChild(nameText);
    document.getElementById("itemEdit").appendChild(document.createElement("br"));
    document.getElementById("itemEdit").appendChild(document.createElement("br"));
    for(let j = 0; j < list.length; j++){
        let textValue = document.createElement("textarea");
        textValue.id = "" + todo.todoID + list[j].itemID;
        let deleteButton = document.createElement("button");
        deleteButton.onclick = function(){
            /** Represents the deletion of an item. */
           let sentObj = JSON.stringify({"todoID": todo.todoID, "itemID": list[j].itemID});
           console.log("Deleted Item " + sentObj);
           console.log("Update Modal/Todo Data");
           alert("Deleted Todo List Item: " + sentObj);
        }
        deleteButton.appendChild(document.createTextNode("Delete Item"));
        let updateButton = document.createElement("button");
        updateButton.appendChild(document.createTextNode("Update Item"));
        updateButton.onclick = function(){
            let textID = "" + todo.todoID + list[j].itemID;
            let nameVal = document.getElementById(textID).value;
            let sentObj = JSON.stringify({"todoID": todo.todoID, "itemID": list[j].itemID, "description": nameVal});
            console.log("Updated Item " + sentObj);
            console.log("Update Modal/Todo Data");
            alert("Updated Todo List Item to: " + sentObj);
        }
        textValue.appendChild(document.createTextNode(list[j].description));
        document.getElementById("itemEdit").appendChild(textValue);
        document.getElementById("itemEdit").appendChild(deleteButton);
        document.getElementById("itemEdit").appendChild(updateButton);
        document.getElementById("itemEdit").appendChild(document.createElement("br"));
    }
    let addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Add Item"));
    addButton.onclick = function(){
        console.log(document.getElementsByName("newItem").length);
        if(document.getElementsByName("newItem").length == 0){
            let newText = document.createElement("textarea");
            newText.id = "newItem";
            newText.name = "newItem";
            newText.style.backgroundColor = "red";
            let adderButton = document.createElement("button");
            adderButton.id = "addButton1";
            adderButton.appendChild(document.createTextNode("Add New Item"));
            adderButton.onclick = function(){
                let value = document.getElementById("newItem").value;
                let addObj = JSON.stringify({"todoID": todo.todoID, "description": value});
                alert("Added new item: " + addObj);
                document.getElementById("newItem").remove();
                document.getElementById("addButton1").remove();
            }
            document.getElementById("itemEdit").appendChild(newText);
            document.getElementById("itemEdit").appendChild(adderButton);
        } else {
            alert("You Must Fill in first");
        }
    }
    document.getElementById("buttonHolder").appendChild(addButton);
    let deleteButton2 = document.createElement("button");
    deleteButton2.appendChild(document.createTextNode("Delete Todo"));
    deleteButton2.onclick = function() {
        let sentObj = JSON.stringify({"todoID": todo.todoID});
        console.log("Deleted Todo " + sentObj);
    }
    document.getElementById("buttonHolder").appendChild(deleteButton2);
    document.getElementById("myModal").style.display = "block";
}

function DisplayTodos(todoObj){
    let todo = todoObj.todo;
    for(let i = 0; i < todo.length; i++){
        let todoDiv = document.createElement("div");
        let name = document.createElement("h4");
        let unorderedList = document.createElement("ul");
        name.appendChild(document.createTextNode(todo[i].name));
        todoDiv.appendChild(name);
        let list = todo[i].todolist;
        for(let j = 0; j < list.length; j++){
            let tName = document.createElement("li");
            tName.appendChild(document.createTextNode(list[j].description));
            unorderedList.appendChild(tName);
        }
        todoDiv.appendChild(unorderedList);
        let date = document.createElement("p");
        date.appendChild(document.createTextNode("Must be completed by " + todo[i].date));
        date.style.fontWeight = "bold";
        todoDiv.appendChild(date);
        todoDiv.style.backgroundColor = "yellow";
        todoDiv.style.width = "30%";
        todoDiv.onclick = function(){
            showModal(todo[i])
        };
        document.getElementById("todo").appendChild(todoDiv);
    }
}

//This function deletes accounts
document.getElementById("accDel").onclick = function(){
    console.log("Delete All Todo Items From Account");
    console.log("Delete the actual account");
    alert("Account Deleted");
    console.log("Go to previous page");
}

document.getElementById("editAcc").onclick = function(){
    let textarea1 = document.createElement("textarea");
    let textarea2 = document.createElement("textarea");
    let textarea3 = document.createElement("textarea");
    let textarea4 = document.createElement("textarea");
    let updateButton1 = document.createElement("button");
    let updateButton2 = document.createElement("button");
    let updateButton3 = document.createElement("button");
    let updateButton4 = document.createElement("button");
    textarea1.appendChild(document.createTextNode("UserName"));
    textarea2.appendChild(document.createTextNode("Password"));
    textarea3.appendChild(document.createTextNode("FirstName"));
    textarea4.appendChild(document.createTextNode("LastName"));
    updateButton1.appendChild(document.createTextNode("Update Username"));
    updateButton1.onclick = function(){
        let newValue = textarea1.value;
        alert("Username Updated to " + newValue);
    }
    updateButton2.appendChild(document.createTextNode("Update Password"));
    updateButton2.onclick = function(){
        let newValue = textarea2.value;
        alert("Password Updated to " + newValue);
    }
    updateButton3.appendChild(document.createTextNode("Update First Name"));
    updateButton3.onclick = function(){
        let newValue = textarea3.value;
        alert("Firstname Updated to " + newValue);
    }
    updateButton4.appendChild(document.createTextNode("Update Last Name"));
    updateButton4.onclick = function(){
        let newValue = textarea4.value;
        alert("Lastname Updated to " + newValue);
    }
    document.getElementById("itemEdit2").appendChild(textarea1);
    document.getElementById("itemEdit2").appendChild(updateButton1);
    document.getElementById("itemEdit2").appendChild(document.createElement("br"));
    document.getElementById("itemEdit2").appendChild(textarea2);
    document.getElementById("itemEdit2").appendChild(updateButton2);
    document.getElementById("itemEdit2").appendChild(document.createElement("br"));
    document.getElementById("itemEdit2").appendChild(textarea3);
    document.getElementById("itemEdit2").appendChild(updateButton3);
    document.getElementById("itemEdit2").appendChild(document.createElement("br"));
    document.getElementById("itemEdit2").appendChild(textarea4);
    document.getElementById("itemEdit2").appendChild(updateButton4);
    document.getElementById("itemEdit2").appendChild(document.createElement("br"));
    document.getElementById("myModal2").style.display = "block";
}

DisplayTodos(todolist);