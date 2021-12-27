const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    isActive:{
        type:Boolean, required:true, default:true
    }
})

const user = mongoose.model("user", userSchema)

module.exports = user;