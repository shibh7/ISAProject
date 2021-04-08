let data = JSON.parse(localStorage.getItem("editItem"));
let uid = parseInt(JSON.parse(localStorage.getItem("userID")).userID);
console.log(data);
console.log(uid);

function generateEditor(dataItems){
    let name = document.createElement("textarea");
    name.appendChild(document.createTextNode(dataItems.name));
    name.id = "nameEdit";
    let updateNameButton = document.createElement("button");
    updateNameButton.appendChild(document.createTextNode("Update Todo Name"));
    updateNameButton.onclick = function(){
        let text = document.getElementById("nameEdit").value;
        let obj = JSON.stringify({"name": text});
        let xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "http://localhost:8888/API/V1/usertodo/" + uid + "/" + dataItems.todoID, true);
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 204){
                console.log("Update Successful");
            }
        }
        xhttp.send(obj);
    }
    document.getElementById("editorDiv").appendChild(name);
    document.getElementById("editorDiv").appendChild(updateNameButton);
    document.getElementById("editorDiv").appendChild(document.createElement("br"));
    let list = dataItems.todolist;
    for(let i = 0; i < list.length; i++){
        console.log(list[i]);
        let textarea = document.createElement("textarea");
        textarea.appendChild(document.createTextNode(list[i].description));
        let updateItemButton = document.createElement("button");
        updateItemButton.appendChild(document.createTextNode("Update Item"));
        updateItemButton.onclick = function(){
            let textVal = textarea.value;
            console.log(textVal);
            let obj = JSON.stringify({"name": textVal});
            let xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "http://localhost:8888/API/V1/usertodo/" + uid + "/" + dataItems.todoID + "/" + list[i].itemID, true);
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 204){
                    console.log("Update Success");
                }
            }
            xhttp.send(obj);
        }
        let deleteItemButton = document.createElement("button");
        deleteItemButton.onclick = function(){
            let xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "http://localhost:8888/API/V1/usertodo/" + uid + "/" + dataItems.todoID + "/" + list[i].itemID, true);
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log("Item Deleted");
                }
            }
            xhttp.send();
        }
        deleteItemButton.appendChild(document.createTextNode("Delete Item"));
        document.getElementById("editorDiv").appendChild(textarea);
        document.getElementById("editorDiv").appendChild(updateItemButton);
        document.getElementById("editorDiv").appendChild(deleteItemButton);
        document.getElementById("editorDiv").appendChild(document.createElement("br"));
    }
}

generateEditor(data);