const User = require("../models/userModel");
const bcrypt = require("bcrypt");


exports.createUser = async(req,res) => {
    try {
        const {name,email,password,role} = req.body;

       const userInfo = await User.findOne({email});

        if(userInfo) {
            res.status(400).json({
                status: 'fail',
                message: 'Your Are Already Registred',
            })
        }

        let hashPwd =await bcrypt.hash(password,10);

        const user = await User.create({name,email,password:hashPwd,role});
        
        return res.status(200).json({
            status: 'success',
            message:"User Create Succesfully",
            data: user,
        })
    
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error While create User",
        })
        console.error("Error create user:",error);
        process.exit(1);
    } 
}

exports.getUser = async(req,res) => {
    try {
        const id = req.params.id;

        const userDetails = await User.findById(id);

        return res.status(200).json({
            success:true,
            message:"User Fatch Successfully",
            userDetails
        })

    } catch (error) {
        res.json({
            message:"Error in getUser",
        })
        console.error("Error get user: ",error);
        process.exit(1);
    }
}

exports.updateUser = async(req,res)=>{
    try {

        const id = req.params.id;
        const {name,email} = req.body;

        const userDetails = await User.findByIdAndUpdate(id,{
            name,email
        },{new:true})

        return res.status(200).json({
            success:true,
            message:"Update the user",
            userDetails
        })

    } catch (error) {
        res.json({
            message:"Error in update user",
        })
        console.error("Error update user: ",error);
        process.exit(1);
    }
}


exports.deleteUser = async(req,res) => {
    try {
        const id = req.params.id;

        const userDetails = await User.findByIdAndDelete(id);

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Id is not found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Deleted",
            userDetails
        })

        
    } catch (error) {
        res.json({
            message:"Error in Delete user process",
        })
        console.error("Error Delete user: ",error);
        process.exit(1);
    }
}