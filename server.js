// Import necessary modules
const mongoose = require('mongoose');
const express = require('express');
const  bodyParser = require('body-parser');


var app= express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
// Define a schema for the items
const itemSchema = new mongoose.Schema({
    name:  String,  
    priority: String
});
// Create a model based on the schema
const item = mongoose.model('task',itemSchema);
//get the item form user 
app.get('/', async function(req, res) {
    try {
        const foundItems = await item.find({});
        res.render('list', { ejes: foundItems });
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send("Database error");
    }

});
// Handle form submission to add a new item
app.post("/", async function(req, res) {
    try {
        const taskName = req.body.task;
        const priority = req.body.priority; // Get the priority from the form
        if (taskName && taskName.trim() !== "") {
            const newtask = new item({
                name: taskName.trim()
                , priority: priority // Save the priority
            });
            await newtask.save();
        }
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});
// Handle form submission to delete an item
app.post("/delete", async function(req, res) {
    try {
        const taskToDelete = req.body.task;
        await item.deleteOne({ name: taskToDelete });
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});
//to edit the item
app.post("/edit", async function(req, res) {
    try {
        const taskToEdit = req.body.task;
        const newTaskName = req.body.newTaskName;
        if (newTaskName && newTaskName.trim() !== "") {
            await item.updateOne({ name: taskToEdit }, { name: newTaskName.trim() });
        }
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
});
// onclicking the edit button, the input field will be displayed













app.listen(3000, function() {
    console.log("Server started on port 3000");
});



