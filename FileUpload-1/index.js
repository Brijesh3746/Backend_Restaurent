const express = require("express");
const app = express();

// find port
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// add middleware
app.use(express.json()); // for parsing application/json
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true, // Use temporary files for uploaded files
    tempFileDir: '/tmp/' // Specify the directory for temporary files
}));

// connect With database
require("./config/database").connetDb();

// connect with cloud
require("./config/cloudinary").cloudinaryConnect();

// here cloudinary use for store data in cloud
// and express fileupload is used for store data in local Server

// import routes from other files
const Upload = require("./routes/FileUpload");
// // mount
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});