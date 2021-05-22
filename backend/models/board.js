const mongoose = require('mongoose');

let boardSchema = new mongoose.Schema({
    name: String,
    ownerId: String,
    userIds: [String],
    taskIds: [String],
    taskCategories: [String]
});

module.exports = mongoose.model('Board', boardSchema);