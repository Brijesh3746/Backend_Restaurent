const { config } = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();



PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cookieParser()) // Adds middleware that parses cookies and exposes them on req.cookies

require("./config/database").connectWithDb();


// Routes ko Import karo
const user = require("./routes/user");
app.use("/api/v1", user);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
