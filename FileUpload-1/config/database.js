const mongoose = require("mongoose");
require("dotenv").config();

exports.connetDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {console.log("DB CONNECTION SUCCESSFULLY")})
    .catch((error) => {
        console.log(`Error connecting to the database. ${error}`);
        process.exit(1);
    });

}