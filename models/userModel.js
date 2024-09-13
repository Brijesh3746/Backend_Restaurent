const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Staff","Customer"],
    }
});

userSchema.post('save',async function(doc){
    try {
        console.log("doc : ",doc);

        require("../config/mailSender").transporter(doc);

    } catch (error) {
        console.error("Error While Mailing to User:",error);
    }
})

module.exports = mongoose.model("User",userSchema);
