const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("npmlog");





// signup

exports.signUp = async(req,res) => {
    try {
        // fetch details from request body
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber} = req.body;

        // check the email is not null
        if(!email || !firstName || !lastName || !password|| !confirmPassword || !contactNumber){
            res.status(400).json({
                success:false,
                message:"Please fill data correctly",
            })
        }
       
        // email validation
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        // how to validate the email
        if(!emailRegex.test(email)){
            res.status(400).json({
                success:false,
                message:"Please enter valid email"
                })
        }

        // find from database it's availabe or not
        const userEmail = await User.findOne({email});

        // if user found then return
        if(userEmail){ 
          return  res.status(400).json({
                success:false,
                message:"User already registerd"
            })
        }        


        // password match
        if(password !== confirmPassword){
            res.status(400).json({
                success:false,
                message:"Password not match"
            })
        }
      
         
        // hash the password  
        const hashPassword = await bcrypt.hash(password,10);
        console.log("running passwrod",hashPassword);
        // // save in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            contactNumber,
            accountType,
            // additionalDetails:profileDetails._id,
            // image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,


        });
        console.log(`user is : ${user}`);  

       return res.status(200).json({
            success:true,
            message:"User registerd successfully"
        })
    
    } catch (error) {
        console.log(error); 
        return res.status(400).json({
            success:false,
            message:"User does not registerd successfully"

        })
    }
}

// login

exports.login = async(req,res) => {

    try {
        
        // fetch email and password
        const {email,password} = req.body;
        // validate
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Please enter email and password"

            })
        }
        // email check 
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not logged in , please signup first"
            })
        }
        console.log("r1"); 
        // jwt token after compare password
        if(await bcrypt.compare(password,user.password)){
            const paylod = {
                email:user.email,
                id:user._id,
                role:user.accountType, 
            }
            const token = jwt.sign(paylod,process.env.JWT_SECRATE,{
                expiresIn:"2h"
            })
 
            user.token = token;
            user.password = undefined;
 
            const options = {
                expires:new Date(Date.now() + 3 * 24 * 60 * 60 *1000),
                httpOnly:true,
                
            }
            // create cookie
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"logged in successfully"
                })
        } 
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password "
            })
        }    
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login failure , try again"
        })
    }
}

// changePass

exports.changePassword = async(req,res) => {
    try {
        // get data from req ki body
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;
        
        // validation
        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
                })
        }

        // check if email is valid
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Email is not valid"
                })
        }
        // oldPassword match with dbPass
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Old Password is Incorrect"
            })
        }
        // new password match with old  password
        if(oldPassword == newPassword){
            return res.status(401).json({
                success:false,
                message:"oldPassword same as newPassword, change newPassword"
            })
        }

        // newPass and confirm newPass check
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"newPassword and confirmNewPassword not match"
            })
        }
        
        // hash new Password
        const hashPassword = await bcrypt.hash(newPassword,10);
        
        // update password in db
        user.password = hashPassword;

        // send mail - pass updated
        require("../utils/mailSender").mailSender(email,"Password Change","Password change successfully");
        // return response 
        await user.save();
        res.status(200).json({
            success:true,
            user,
            message:"Password Updated Successfully"
            })
            
    
    } 
    catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Error Occured during Change Password"
            })
        } 
}