const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.DB_URL, {
    })
    .then(console.log("DB Connection SUCCESSFULLY"))
    .catch( (error) => {
        console.log("Error occured during db Connection",error);
        process.exit(1);
    })
}