// controller
const File = require("../model/File");
const { options } = require("../routes/FileUpload");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req,res) => {
    try {
        // const {name,email,tags,image} = req.body;
        // fetch file
        const file = req.files.file;
        console.log("file is -> ",file);

        let path = __dirname + "/files/" + Date.now() + `.${ file.name.split(".")[1]}`;
        console.log(path);
        console.log(`${ file.name.split(".")[1]}`);

        file.mv(path ,(err) => {
            console.log("error",err);
        });

        // const saveData = await File.create({name,email,tags,image:path});
        res.json({
            success:true,
            message:"File upload successfully in local server",
            // saveData
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error in controller"
        })
    }
}

function isFileSupported(type,supportedFile){
    return supportedFile.includes(type);
}
// include ye check krta hay ki apki file iske under hay ki nahi

// upload krna hai is liye async function banaya hai 
async function fileUploadCloudinary(file, folder,quality) {
    const options = { 
        folder, 
        resource_type: "auto" ,
        // transformation: [
        //     {gravity: "face", height: 200, width: 200, crop: "thumb"},
        //     {radius: "max"},
        //     {fetch_format: "auto"}
            // ] //for shape change
        }; // Corrected the variable name and added resource_type

    if(quality){
        options.quality = quality;
    }

    console.log("temp path", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) => {
    try {
        // all data fetch
        const {name,email,tags}  = req.body;
        console.log(name,email,tags);

        const file = req.files.imageFile;
        console.log(file);

    

        const supportedFile = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type  :",fileType);

        if(!isFileSupported(fileType,supportedFile)){
           return res.status(400).json({
                success:false,
                message:"file is not supported"
            });
        }

        
        // file formet supported 
        
        const response = await fileUploadCloudinary(file,"RealWorld");
        console.log(response);



        // db ke under entry
        const fileData  = await File.create({
            name,tags,email,image:response.secure_url
        })

        res.json({
            success:true,
            message:"Image upload Successfully in cloudinary"
        })


    } 
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"error in image Upload in cloudinary"
        })
        
    }
}

exports.videoUpload = async (req, res) => {
    try{
        // fetch the data
        const{name,email,tags} = req.body;

        // fetch videofile
        const fileOfVideo = req.files.videoFile;

        
        // check the size of video file  
        const maxSize = 5 * 1024 * 1024;

        if(fileOfVideo.size > maxSize){
            return res.status(400).json({
                success:false,
                message:"your file is too large"
            })
        }

        // file type is valid or not
        const supportedFile = ['mp4','mov','mkv'];
        const fileType = fileOfVideo.name.split(".")[1].toLowerCase();
        console.log(fileType);

        if(!isFileSupported(fileType,supportedFile)){
            return res.status(404).json({
                success:false,
                message:"supported Datatype is not found"
            })
        }
        
        console.log("level 1");
        // upload to cloudinary
        const response = await fileUploadCloudinary(fileOfVideo,"RealWorld");
        
        console.log("response is : ",response);

        // save into database
        const userData = await File.create({
            name,
            email,
            tags,
            image:response.secure_url
        });
        console.log("level 3");

        return res.status(200).json({
            success:true,
            message:"fileuploded successfully in cloud",
            image:response.secure_url
            
        })

    }
    catch (error) {
        console.error(error.message);
        // Respond with error message
        return res.status(400).json({
            success: false,
            message: "Error uploading video to Cloudinary",
        });
    }
};

exports.imageReducerUpload = async(req,res) =>{
    try {
        // all data fetch
        const {name,email,tags}  = req.body;
        console.log(name,email,tags);

        const file = req.files.imageFile;
        console.log(file);

        const supportedFile = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("file type  :",fileType);

        if(!isFileSupported(fileType,supportedFile)){
           return res.status(400).json({
                success:false,
                message:"file is not supported"
            });
        }



        
        // file formet supported 
        
        const response = await fileUploadCloudinary(file,"RealWorld",90);
        console.log(response);



        // db ke under entry
        const fileData  = await File.create({
            name,tags,email,image:response.secure_url
        })

        res.json({
            success:true,
            message:"Image upload with size reduce Successfully in cloudinary"
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"error finding in image Reducer"
        })
    }
}