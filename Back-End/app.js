const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "/API/v1/"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_data"
});

db.promise = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) 
            {reject (new Error());}
            else
            {resolve(result)}
        });
    });
};

app.use(cors());
app.options("*", cors());

app.use(function(req, res, next) {
    //res.header('Access-Control-Allow-Orign', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
})

//update stats
const addStats = (id) => {
    let sql = `UPDATE stats SET requestCount = requestCount + 1 WHERE endID = ${id}`
    db.promise(sql)
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })
}

//User Signup URI
app.post(endPointRoot + "signup/", (req, res) => {

    addStats(1);
    
    let body = '';
    console.log(req)
    req.on('data', function (chunk){
        if(chunk != null){
            body += chunk.toString('utf8');
            console.log(body);
        }
    });

    req.on('end', function(){
        console.log(body);
        console.log(typeof(body));
        let jsonObj = JSON.parse(body);
        
        if( (jsonObj.username == null) ||  (jsonObj.username == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.password == null) ||  (jsonObj.password == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.firstName == null) || (jsonObj.firstName == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.lastName == null) || (jsonObj.lastName == "") ){
            res.status(401).send("Bad request");
        }else{
            let username = jsonObj.username;
            let paswword = jsonObj.password;
            let firstName = jsonObj.firstName;
            let lastName = jsonObj.lastName;
            let sql = `SELECT * FROM users WHERE username = "${username}"`;
            db.promise(sql)
            .then((result) => {
                if(result.length == 0){
                    let sql2 = `INSERT INTO users VALUES (NULL, "${username}", "${paswword}", "${firstName}", "${lastName}")`;
                    db.promise(sql2)
                    .then((result2) => {
                        console.log(result2);
                        res.status(201).end()
                        //user added
                    }).catch((err2) => {
                        console.log(err2);
                    })
                }else {
                    console.log("username is already taken");
                    res.status(409).send('username already taken')
                }
            }).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
        
    })
})

// User login URI
app.post(endPointRoot + "login/", (req, res) => {
    addStats(2);
    let body = '';
    console.log(req)
    req.on('data', function (chunk){
        if(chunk != null){
            body += chunk.toString('utf8');
            console.log(body);
        }
    })

    req.on('end', function(){
        let jsonObj = JSON.parse(body);

        if( (jsonObj.username == null) ||  (jsonObj.username == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.password == null) ||  (jsonObj.password == "") ){
            res.status(401).send("Bad request");
        }else{
            let username = jsonObj.username;
            let paswword = jsonObj.password;
            let sql = `SELECT * FROM users WHERE username = "${username}" AND password = "${paswword}"`;
            db.promise(sql)
            .then((result) => {
                if(result.length == 0){
                    res.status(401).send("invalid username or passwrod");
                }else {
                    console.log(result)
                    let resobj = {"userID": result[0].userID};
                    res.status(200).send(JSON.stringify(resobj));
                }
            }).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
                res.status(500).send("Internal Error");
            })

        }  
    })
})

//Get stats
app.post(endPointRoot + "adminHome/", (req, res) => {

    addStats(3);
    let body = '';
    req.on('data', function (chunk){
        if(chunk != null){
            body += chunk.toString('utf8');
            console.log(body);
        }
    })

    req.on('end', function(){
        let jsonObj = JSON.parse(body);

        if( (jsonObj.username == null) ||  (jsonObj.username == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.password == null) ||  (jsonObj.password == "") ){
            res.status(401).send("Bad request");
        }else{
            let username = jsonObj.username;
            let paswword = jsonObj.password;
            let sql = `SELECT * FROM admin WHERE username = "${username}" AND password = "${paswword}"`;
            db.promise(sql)
            .then((result) => {
                if(result.length == 0){
                    res.status(401).send("invalid username or passwrod");
                }else {
                    let sql2 = "SELECT * FROM stats";
                    db.promise(sql2)
                    .then((result) => {
                        let stats = [];
                        for(let i = 0; i < result.length; i++){
                            let obj = {"endID": result[i].endID, "method": result[i].method, "endpoint": result[i].endpoint, "requestCount": result[i].requestCount};
                            stats[i] = obj;
                            if( i == (result.length - 1)){
                                let retobj = {"stats": stats}
                                res.status(200).send(JSON.stringify(retobj))
                            }
                        }  
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).send("Internal Error");
                    })
                    
                }
            }).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
                res.status(500).send("Internal Error");
            })

        }  
    })
    
})

//Get all Todos
app.get(endPointRoot + "user/:id", (req, res) => {

    addStats(4);

    let userCheck = `SELECT * FROM users WHERE userID = ${req.params.id}`;
    db.promise(userCheck)
    .then((result) => {
        if(result.length == 0){
            res.status(400).send("404 Not Found");
        }else{
                let sql = `SELECT * FROM todolist WHERE userID = ${req.params.id}`;
                let todo = []
                db.promise(sql)
                .then((result) => {  
                    console.log(result);
                    if(result.length == 0){
                        let resobj = {"todo": todo}
                        console.log(resobj);
                        res.status(200).send(JSON.stringify(resobj));
                    }else{
                        for(let i = 0; i < result.length; i++){
                            let todolist = []
                            let sql2 = `SELECT * FROM todoitems WHERE todoID = ${result[i].todoID}`;
                            db.promise(sql2)
                            .then((result2) => {
                                for(let j = 0; j < result2.length; j++){
                                    let obj3 = {"itemID": result2[j].itemID, "description": result2[j].description}
                                    todolist[j] = obj3;
                                } 
                                let obj2 = {"todoID": result[i].todoID, "date": result[i].date, "name": result[i].name, "todolist": todolist};
                                todo[i] = obj2;
                                if(i == (result.length - 1)){
                                    console.log(todo)
                                    let resobj = {"todo": todo}
                                    console.log(resobj);
                                    res.status(200).send(JSON.stringify(resobj));
                                }
                            })
                            
                        }
                    }
                    
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send("Internal Error");
                })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal Error");
    })
    
})

//Add Todo
app.post(endPointRoot + "usertodo/:id", (req, res) => {

    addStats(5);

    let body = '';
    console.log(req)
    req.on('data', function (chunk){
        if(chunk != null){
            body += chunk.toString('utf8');
            console.log(body);
        }
    });

    req.on('end', function(){
        let jsonObj = JSON.parse(body);
        console.log(jsonObj)
        if( (jsonObj.todo.name == null) ||  (jsonObj.todo.name == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.todo.date == null) ||  (jsonObj.todo.date == "") ){
            res.status(401).send("Bad request");
        }else if( (jsonObj.todo.todolist == null)  ){
            res.status(401).send("Bad request");
        }else{
            let sql = `INSERT INTO todolist VALUES (NULL, ${req.params.id}, "${jsonObj.todo.name}", "${jsonObj.todo.date}")`;
            db.promise(sql)
            .then((result) => {
                let todoID = result.insertId;
                for(let i = 0; i < jsonObj.todo.todolist.length; i++){
                    let sql2 = `INSERT INTO todoitems VALUES (NULL, ${todoID}, "${jsonObj.todo.todolist[i].description}")`;
                    db.promise(sql2);
                    if(i == (jsonObj.todo.todolist.length - 1)){
                        res.status(201).send("To Do Added");
                    }
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send("Internal Error");
            })
        }
    })
})

//edit Todo
app.put(endPointRoot + "usertodo/:id/:todoid", (req, res) => {

    addStats(6);

    console.log(req.params.id);
    console.log(req.params.todoid);

    let check = `SELECT * FROM todolist WHERE userID = ${req.params.id} AND todoID = ${req.params.todoid}`;
    db.promise(check)
    .then((result) => {
        if(result.length == 0){
            res.status(401).send("Bad request");
        }else{
            let body = '';
            console.log(req)
            req.on('data', function (chunk){
                if(chunk != null){
                    body += chunk.toString('utf8');
                    console.log(body);
                }
            });
        
            req.on('end', function(){
                let jsonObj = JSON.parse(body);
                console.log(jsonObj)
                if( (jsonObj.name == null) ||  (jsonObj.name == "") ){
                    res.status(401).send("Bad request");
                }else{
                    let sql2 = 'UPDATE todolist SET name = "' + jsonObj.name + '" WHERE todoID = ' + req.params.todoid;
                    db.promise(sql2)
                    .then((result2) => {
                        res.status(204).send("Record Updated");
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).send("Internal Error");
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal Error");
    })

})

//edit Todo item
app.put(endPointRoot + "usertodo/:id/:todoid/:itemid", (req, res) => {

    addStats(7);

    console.log(req.params.itemid);
    console.log(req.params.todoid);

    let check = `SELECT * FROM todoitems WHERE itemID = ${req.params.itemid} AND todoID = ${req.params.todoid}`;
    db.promise(check)
    .then((result) => {
        if(result.length == 0){
            res.status(401).send("Bad request");
        }else{
            let body = '';
            console.log(req)
            req.on('data', function (chunk){
                if(chunk != null){
                    body += chunk.toString('utf8');
                    console.log(body);
                }
            });
        
            req.on('end', function(){
                let jsonObj = JSON.parse(body);
                console.log(jsonObj)
                if( (jsonObj.description == null) ||  (jsonObj.description == "") ){
                    res.status(401).send("Bad request");
                }else{
                    let sql2 = 'UPDATE todoitems SET description = "' + jsonObj.description + '" WHERE todoID = ' + req.params.todoid + ' AND itemID = ' + req.params.itemid;
                    db.promise(sql2)
                    .then((result2) => {
                        res.status(204).send("Record Updated");
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).send("Internal Error");
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal Error");
    })

})

//delete todoitem
app.delete(endPointRoot + "usertodo/:id/:todoid/:itemid", (req, res) => {
    
    addStats(8);

    console.log(req.params.itemid);
    console.log(req.params.todoid);

    let check = `SELECT * FROM todoitems WHERE itemID = ${req.params.itemid} AND todoID = ${req.params.todoid}`;
    db.promise(check)
    .then((result) => {
        if(result.length == 0){
            res.status(401).send("Bad request");
        }else{
            let sql2 = `DELETE FROM todoitems WHERE todoID = ${req.params.todoid} AND itemID = ${req.params.itemid}`;
            return db.promise(sql2)
        }
    }).then((result) => {
        console.log(result);
        res.status(200).send("Record Deleted");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal Error");
    })

})

//delete todo
app.delete(endPointRoot + "usertodo/:id/:todoid", (req, res) => {
    
    addStats(9);
    
    console.log(req.params.itemid);
    console.log(req.params.todoid);

    let check = `SELECT * FROM todolist WHERE userID = ${req.params.id} AND todoID = ${req.params.todoid}`;
    db.promise(check)
    .then((result) => {
        if(result.length == 0){
            res.status(401).send("Bad request");
        }else{
            let sql2 = `DELETE FROM todoitems WHERE todoID = ${req.params.todoid}`;
            return db.promise(sql2)
        }
    }).then((result2) => {
        console.log(result2);
        let sql3 = `DELETE FROM todolist WHERE todoID = ${req.params.todoid}`;
        db.promise(sql3)
        .then((result3) => {
            res.status(200).send("Record Deleted");
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Internal Error");
    })

})


// module.export = app;
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`listening to port ${PORT}`);
})


