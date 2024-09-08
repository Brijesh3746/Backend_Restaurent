const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());


const PORT = process.env.PORT || 5000;

// export route
const routesUser = require("./routes/userRoutes");
app.use("/api/v1",routesUser);

// export d
require("./config/database").dbConnect();

app.get('/',(req,res) => {
    res.send(`hello`);
})

app.listen(PORT,() => {
    console.log(`Server Start Successfully at : ${PORT}`);
})