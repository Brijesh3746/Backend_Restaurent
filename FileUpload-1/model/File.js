// model
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true

    },
    image:{
        type:String,
        // required:true
    },
    
    
});

// post middleware
fileSchema.post("save",async function(doc){
    try{
        
        console.log("Doc :",doc);
    
        // transporter
        // let transporter = nodemailer.createTransport({
        //     host:process.env.MAIL_HOST,
        //     auth:{
        //         user:process.env.MAIL_USER,
        //         pass:process.env.MAIL_PASS
        //     }

        // }); //send to the config file

        require("../config/transporter").transporter(doc);

       
    }
    catch(error){
        console.log(error.message);
    }
});




module.exports = mongoose.model("File",fileSchema);