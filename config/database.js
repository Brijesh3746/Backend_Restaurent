const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL,{

    })
    .then(() => console.log("DB Connect Successfully"))
    .catch((e) => {
        console.log("Error While Connect DB",e);
    })
}