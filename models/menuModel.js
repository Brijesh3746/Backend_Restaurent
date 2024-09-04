const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

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
        enum:["Punjabi","Gujrati"],
    },
    available:{
        type:Boolean,
        default:true,
    }
});

module.exports = mongoose.model("Menu",menuItem);