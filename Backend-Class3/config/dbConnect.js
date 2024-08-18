
const mongoose = require("mongoose");
const { connectWithDb } = require("../../Backend-Class4/config/database");

require("dotenv").config();

const dbConnect1 = () =>{
    mongoose.connect(process.env.URL,{

    }).then(()=> console.log('MongoDB Connected...'))
    .catch((err)=>console.error(err));
}

module.exports = connectWithDb;