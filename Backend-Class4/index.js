// app.js
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;


// middleware
app.use(express.json());

const newBlog = require("./routes/blog");
// mount
app.use("/api/v1", newBlog);

require("./config/database").connectWithDb(); // Connect to the database

// start the server
app.listen(PORT, () => {
  console.log(`App is running successfully at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This Is My HomePage </h1>`);
});
