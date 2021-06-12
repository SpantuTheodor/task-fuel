const mongoose = require('mongoose');

let logEntrySchema = new mongoose.Schema({
    method: String,
    boardId: String,
    taskName: String,
    date: Date
});

module.exports = mongoose.model('LogEntry', logEntrySchema);