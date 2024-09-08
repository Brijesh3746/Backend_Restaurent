const mongoose = require("mongoose");

const paymentSchma = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    Bill:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true
    }
});


module.exports = mongoose.model("Payment",paymentSchma);