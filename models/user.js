const mongoose = require('../db');

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

module.exports = mongoose.model('User', userSchema);
