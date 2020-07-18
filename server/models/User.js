const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:false
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('User',UserSchema);