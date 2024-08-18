// // create instate
// const express = require("express");
// const app = express();

// // middleware

// app.use(express.json());

// const post = require("./routes/posts");

// app.use("/api/v1", post);

// require("dotenv").config();
// const PORT = process.env.PORT || 9000 ;

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// require("./config/dbConnect").dbConnect();

// app.get( "/" , (req, res) => {
//     console.log("Welcome to the blog API");
// });



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
const todoRoutes = require("./routes/postRouter");

// mount the todo APIs with the correct route path
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is started at : ${PORT}`);
});

require("./config/dbConnect").dbConnect1();

app.get("/", (req, res) => {
    res.send(`<h1>This is home page </h1>`);
});
