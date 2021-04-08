//UID gotten from local storage after login.
let uid = parseInt(JSON.parse(localStorage.getItem("userID")).userID);

console.log(uid);

function createTodos(){
    document.getElementById("todo-list").innerHTML = "";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8888/API/V1/user/" + uid, true);
    xhttp.setRequestHeader("api-key", "sup3rAp1K3y");
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let todos = JSON.parse(this.responseText);
            console.log(todos);
            let list = todos.todo;
            for(let i = 0 ; i < list.length; i++){
                let listOfItems = list[i].todolist;
                let todoDiv = document.createElement("div");
                todoDiv.style.backgroundColor = "yellow";
                todoDiv.style.width = "30%";
                let title = document.createElement("h4");
                title.appendChild(document.createTextNode(list[i].name));
                todoDiv.appendChild(title);
                let unorderedlist = document.createElement("ul");
                for(let j = 0; j < listOfItems.length; j++){
                    let litem = document.createElement("li");
                    litem.appendChild(document.createTextNode(listOfItems[j].description));
                    unorderedlist.appendChild(litem);
                }
                todoDiv.appendChild(unorderedlist);
                let dateName = document.createElement("h4");
                dateName.appendChild(document.createTextNode(list[i].date))
                todoDiv.appendChild(dateName);
                todoDiv.onclick = function(){
                    let todoItem = JSON.stringify(list[i]);
                    localStorage.setItem("editItem", todoItem);
                    window.location.href = "./editorpage.html";
                }
                document.getElementById("todo-list").appendChild(todoDiv);
                let deleteButton  = document.createElement("button");
                deleteButton.appendChild(document.createTextNode("Delete Todo"));
                deleteButton.onclick = function(){
                    let xhttp2 = new XMLHttpRequest();
                    xhttp2.open("DELETE", "http://localhost:8888/API/V1/usertodo/" + uid + "/" + list[i].todoID, true);
                    xhttp2.setRequestHeader("api-key", "sup3rAp1K3y");
                    xhttp2.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            createTodos();
                        }
                    }
                    xhttp2.send();
                }
                document.getElementById("todo-list").appendChild(deleteButton);
            }
        }
    }
    xhttp.send();
}
createTodos();

document.getElementById("adder").onclick = function(){
    window.location.href = "./addpage.html";
}