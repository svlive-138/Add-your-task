const express=require("express");

const bodyParser=require("body-parser");
var app=express();
    app.set("view engine","ejs");
    app.use(express.urlencoded({extended:true}));
     
    var items =[];
    
    app.use(express.static("public"));
    
   

    app.get("/",function(req,res){
        res.render("list",{ejes:items})
    });
    app.post("/",function(req,res){
        var item=req.body.task;
        items.push(item);
        res.redirect("/");
        });
        app.post("/delete", function(req, res) {
            const taskToDelete = req.body.task;
            // Remove the first occurrence of the task
            const index = items.indexOf(taskToDelete);
            if (index > -1) {
                items.splice(index, 1);
            }
            res.redirect("/");
        });
        app.listen(3000,function(){
            console.log("server started on port 3000");
        })


