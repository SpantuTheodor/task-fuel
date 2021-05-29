const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    name: String,
    boardId: String,
    taskIds: [String]
});

module.exports = mongoose.model('Task', taskSchema);