const mongoose = require( 'mongoose' );

require("dotenv").config();

exports.connectWithDb = () =>{
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

