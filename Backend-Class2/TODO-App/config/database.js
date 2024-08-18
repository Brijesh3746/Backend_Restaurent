
const mongoose = require("mongoose");

require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {console.log("Db connection successfully")})
    .catch((error) => {
        console.log(`Error connecting to the database. ${error}`);
        process.exit(1);
    });
}

module.exports = dbConnect;
 // this is promise then return then and catch error block;
