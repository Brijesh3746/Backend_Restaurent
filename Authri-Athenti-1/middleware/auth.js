// auth,isStudent,isAdmin

const jwt = require("jsonwebtoken");
const { login } = require("../controllers/Auth");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        // fetch the token from body
        console.log("cookie",req.cookies.token);
        console.log("body",req.body.token);
        console.log("heaer",req.header("Authorization"));
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ","");

        if(!token || token == undefined){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }

        // verify the token 
        try{

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected routes for Students"
            })
        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User Role is not matching"
        })

    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected routes for Admin"
            })

        }
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"User Role is not matching"
        })

    }
}