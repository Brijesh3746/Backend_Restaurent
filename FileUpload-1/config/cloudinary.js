const cloudinary  = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    // Set up Cloudinary
    try {
        cloudinary.config({
            cloud_name: process.env.CLOULD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    } catch (error) {
        console.log(error);
    }
}