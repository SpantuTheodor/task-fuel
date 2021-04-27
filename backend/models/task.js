const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    assigneeId: String
});

module.exports = mongoose.model('Task', taskSchema);