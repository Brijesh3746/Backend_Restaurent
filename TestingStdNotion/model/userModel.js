
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
         
    },
   
    accountType:{
        type:String,
        enum:["Student","Admin","Instructor"],
        required:true,
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    // image:{
    //     type:String,
    //     // required:true
    // },
    

   
});

module.exports = mongoose.model("User",userSchema)