const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },

    userDP: {
        type: String
    },

    info: {
        location: String,
        phone: String,
        work: String,
        about: String,
        education: String,
        birthday: String
    }
    
});

module.exports = User = mongoose.model('User',UserSchema);