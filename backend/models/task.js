const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    assigneeId: String,
    collaboratorIds: [String],
    taskListId: String,
    location: String,
    status: String,
    resource: String
});

module.exports = mongoose.model('Task', taskSchema);