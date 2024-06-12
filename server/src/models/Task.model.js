const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean},
    userId: {type: String}
});

const TaskModel = mongoose.model("task",taskSchema);

module.exports = {TaskModel};