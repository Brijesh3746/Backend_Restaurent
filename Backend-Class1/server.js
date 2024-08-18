// // server is created
// const express = require('express');
// const app = express();

// // used to parse req.body in express -> PUT or POST 
// const bodyParser = require('body-parser');

// // specifically pass JSON data & add it to the request.body object
// app.use(bodyParser.json());


// // server is live
// app.listen(3000,() =>{
//     console.log("Server is running on port 3000");
// });

// // Routes
// app.get('/',(req,res) =>{
//     res.send("Hello BhaiLog Aur Beginner Lallu Log");
// });

// app.post("/api/cars",(req,res) =>{
//     const {name,brand} = req.body;
//     console.log(name);
//     console.log(brand);
//     res.send("Detailng Of Cars Is Fetched");
// });

// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/Cars", { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// })
// .then(() => {console.log("Connected To MongoDB")})
// .catch((err) =>{console.log("error is finding")});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

app.listen(4000, () => {
    console.log("Server is running on port 3000");
});

app.get('/', (req, res) => {
    res.send("Hello Bhai Log Aur Beginner Lallu Log");
});

app.post("/api/cars", (req, res) => {
    const { name, brand } = req.body;
    console.log(name);
    console.log(brand);
    res.send("Details Of Cars Is Fetched");
});

// const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/newDb")
//     .then(() => {
//         console.log("Connected To MongoDB");
//     })
//     .catch((err) => {
//         console.error("Error connecting to MongoDB:", err.message);
//     });
