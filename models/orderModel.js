const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[{
        menu:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Menu",
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        }
    }],
    total:{
        type:Number,
    },
    status:{
        type:String,
        enum:['Pending', 'Preparing', 'Completed'],
        default:'Pending',
    }

})


module.exports = mongoose.model("Order",orderSchema);