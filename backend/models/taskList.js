const mongoose = require('mongoose');

let taskListSchema = new mongoose.Schema({
    name: String,
    boardId: String,
    taskIds: [String]
});

module.exports = mongoose.model('TaskList', taskListSchema);