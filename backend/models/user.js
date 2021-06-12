const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    boardIds: [String]
});

module.exports = mongoose.model('User', userSchema);