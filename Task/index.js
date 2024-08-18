const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000 ; 

// add middleware
app.use(express.json());

const task = require("./routes/task");

app.use("/api/v1",task);

require("./config/database").dbConnect();

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})