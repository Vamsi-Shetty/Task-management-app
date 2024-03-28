const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {TaskModel} = require("../models/Task.model");

const taskController = Router();

taskController.get("/", async (req, res) => {
    const tasks = await TaskModel.find({userId : req.body.userId});
    res.send(tasks);
});

taskController.post("/create", async (req, res) => {
    const {title, description, userId} = req.body;
    const task = new TaskModel({title, description, completed: false, userId});
    try {
        await task.save();
        res.json({message: "Task created successfully"});
    } catch (error) {
        console.log(error)
        res.json({message :"Something went wrong"});
    }
});

taskController.patch("/edit/:taskId", async (req, res) => {
    const {taskId} = req.params;
    const updateTask = await TaskModel.findOneAndUpdate({_id: taskId, userId: req.body.userId}, req.body);
    if(updateTask) {
        res.json({message:"Task updated"});
    }
    else {
        res.json({message:"Unable to update"});
    }
});

taskController.delete("/delete/:taskId", async (req, res) => {
    const {taskId} = req.params;
    const deleteTask = await TaskModel.findOneAndDelete({_id: taskId, userId: req.body.userId});
    if(deleteTask) {
        res.json({message:"Task Deleted"});
    }
    else {
        res.json({message:"Unable to delete"});
    }
});

module.exports = {taskController};