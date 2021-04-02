console.log(localStorage.getItem("userID"));
let obj = {"todoID": "1", "date": "2002-19-15", "name":"Chore List", "todolist": [{"itemID" : 5, "description": "Do the laundry"}, {"itemID" : 6, "description": "Walk the dog"}]};
let obj2 = {"todoID": "2", "date": "2008-49-13", "name":"Things to do before school", "todolist": [{"itemID" : 7, "description": "Write down schedule"}, {"itemID" : 8, "description": "Pay tuition"}]};
let todolist = {"todo": [obj, obj2]};

document.getElementById("close").onclick = function(){
    document.getElementById("myModal").style.display = "none";
    document.getElementById("itemEdit").innerHTML = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("itemEdit").innerHTML = "";
    }
  }

console.log(todolist)

function showModal(todo){
    let nameText = document.createElement("textarea");
    nameText.appendChild(document.createTextNode(todo.name));
    document.getElementById("itemEdit").appendChild(nameText);
    document.getElementById("itemEdit").appendChild(document.createElement("br"));
    document.getElementById("itemEdit").appendChild(document.createElement("br"));
    for(let j = 0; j < list.length; j++){
        let textValue = document.createElement("textarea");
        let deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Delete Item"));
        textValue.appendChild(document.createTextNode(list[j].description));
        document.getElementById("itemEdit").appendChild(textValue);
        document.getElementById("itemEdit").appendChild(deleteButton);
        document.getElementById("itemEdit").appendChild(document.createElement("br"));
    }
    let addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Add Item"));
    let updateButton = document.createElement("button");
    updateButton.appendChild(document.createTextNode("Update Todo"));
    document.getElementById("itemEdit").appendChild(addButton);
    document.getElementById("itemEdit").appendChild(updateButton);
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
            let nameText = document.createElement("textarea");
            nameText.appendChild(document.createTextNode(todo[i].name));
            document.getElementById("itemEdit").appendChild(nameText);
            document.getElementById("itemEdit").appendChild(document.createElement("br"));
            document.getElementById("itemEdit").appendChild(document.createElement("br"));
            for(let j = 0; j < list.length; j++){
                let textValue = document.createElement("textarea");
                let deleteButton = document.createElement("button");
                deleteButton.appendChild(document.createTextNode("Delete Item"));
                textValue.appendChild(document.createTextNode(list[j].description));
                document.getElementById("itemEdit").appendChild(textValue);
                document.getElementById("itemEdit").appendChild(deleteButton);
                document.getElementById("itemEdit").appendChild(document.createElement("br"));
            }
            let addButton = document.createElement("button");
            addButton.appendChild(document.createTextNode("Add Item"));
            let updateButton = document.createElement("button");
            updateButton.appendChild(document.createTextNode("Update Todo"));
            document.getElementById("itemEdit").appendChild(addButton);
            document.getElementById("itemEdit").appendChild(updateButton);
            document.getElementById("myModal").style.display = "block";
        };
        document.getElementById("todo").appendChild(todoDiv);
    }
}

DisplayTodos(todolist);