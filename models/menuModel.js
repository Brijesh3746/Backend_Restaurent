const mongoose = require("mongoose");

const menuItem = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:["Punjabi","Gujarati"],
    },
    available:{
        type:Boolean,
        default:true,
    }
});

module.exports = mongoose.model("Menu",menuItem);