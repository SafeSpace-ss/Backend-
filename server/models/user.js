 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        default: null,
        required: true
    },
    last_name: { 
        type: String, 
        default: null,
        required: true
    },
    email: { 
        type: String,
        default: null,
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
     },
    token: { type: String },
 });

 module.exports =  mongoose.model("user", userSchema);