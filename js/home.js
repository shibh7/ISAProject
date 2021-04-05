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
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("itemEdit").innerHTML = "";
    }
  }

console.log(todolist)

//Takes in a todo list item, and populates a modal using it.
function showModal(todo){
    console.log(todo);
    let list = todo.todolist;
    document.getElementById("itemEdit").innerHTML = "";
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
            /** 
            let xhttp2 = new XMLHttpRequest();
            xhttp2.open("DELETE", "https://kaushalanimesh.com/user/" + uid + "/" + todo.todoID + "/" + list[j].itemID, true);
            xhttp2.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){

                }
            }
            xhttp2.send();
            */
           let sentObj = JSON.stringify({"todoID": todo.todoID, "itemID": list[j].itemID});
           console.log("Deleted Item " + sentObj);
        }
        deleteButton.appendChild(document.createTextNode("Delete Item"));
        let updateButton = document.createElement("button");
        updateButton.appendChild(document.createTextNode("Update Item"));
        updateButton.onclick = function(){
            let textID = "" + todo.todoID + list[j].itemID;
            let nameVal = document.getElementById(textID).value;
            let sentObj = JSON.stringify({"todoID": todo.todoID, "itemID": list[j].itemID, "description": nameVal});
            console.log("Updated Item " + sentObj);
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
        
    }
    document.getElementById("itemEdit").appendChild(addButton);
    let deleteButton2 = document.createElement("button");
    deleteButton2.appendChild(document.createTextNode("Delete Todo"));
    deleteButton2.onclick = function() {
        let sentObj = JSON.stringify({"todoID": todo.todoID});
        console.log("Deleted Todo " + sentObj);
    }
    document.getElementById("itemEdit").appendChild(deleteButton2);
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

DisplayTodos(todolist);


//An http request to get all of the todos for the current user.
let xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://kaushalanimesh.com/API/V1/user/" + uid, true);
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
    }
}
xhttp.send();