var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

let tasks = [];
let completed = [];

app.get('/', function(request, response){
    // ToDo.find(function(err, todo){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         tasks = [];
    //         completed = [];
    //         for( let i=0; i<todo.length; i++){
    //             if(todo[i].done){
    //                 completed.push(todo[i]);
    //             } else {
    //                 tasks.push(todo[i]);
    //             }
    //         }
    //         response.render('index', {tasks: tasks, completed: completed});
    //     }
    // })
    response.render('index', {tasks: tasks, completed: completed});
});

app.post('/addToDo', function(req, res){
    console.log(req)
    tasks.push(req.body.newtodo)
    res.redirect('/');
});

app.post('/removeToDo', function(req, res){
    const remove = req.body.check;
    if(typeof remove === 'string'){
        tasks.splice(tasks.indexOf(remove),1)
        completed.push(remove);
    } else if(typeof remove === "object"){
        for( var i=0; i< remove.length; i++){
            tasks.splice(tasks.indexOf(remove[i]),1);
            completed.push(remove[i])
        }
    }
    res.redirect('/')
});

app.post('/deleteToDo', function(req, res){
    const deleteTask = req.body.delete;
    if(typeof deleteTask === 'string'){
        completed.splice(completed.indexOf(deleteTask),1)
    } else if(typeof deleteTask === "object"){
        for( var i=0; i< deleteTask.length; i++){
            completed.splice(completed.indexOf(deleteTask[i]),1);
        }
    }
    res.redirect('/')
});

app.listen(3000, function(){
    console.log('App is running on port 3000')
});



