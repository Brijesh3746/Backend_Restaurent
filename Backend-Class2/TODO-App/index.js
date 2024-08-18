
// const express = require("express");
// const app = express();

// // load config env file
// require("dotenv").config();

// const PORT = process.env.PORT || 4000; 

// // middle ware to parse json request body
// app.use(express.json());

// // imports routes for todo api
// const todoRoutes = require("./routes/todos");


// // mount the todo Apis
// app.use("api/v1",todoRoutes);

// app.listen(PORT,() =>{
//     console.log(`Server is started at : ${PORT}`);
// })  

// const dbConnect = require("./config/dbConnect");
// dbConnect();

// app.get("/",(req,res) => {
//     res.send(`<h1>This is home page </h1>`)
// })
const express = require("express");
const app = express();

// load config env file
require("dotenv").config();

const PORT = process.env.PORT || 4000; 

// middle ware to parse json request body
app.use(express.json());

// imports routes for todo api
const todoRoutes = require("./routes/todos");

// mount the todo APIs with the correct route path
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is started at : ${PORT}`);
});

const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is home page </h1>`);
});
