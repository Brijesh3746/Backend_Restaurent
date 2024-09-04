const { message } = require("statuses");
const Menu = require("../models/menuModel");
const User = require("../models/userModel");



exports.createMenu = async(req,res) => {
    try {
        const {name,email,description,price,category,available} = req.body;

        const emailCheck = await User.findOne({email});

        if(!emailCheck){
            return res.status(400).json({msg:"You Can't create Menu"})
        }

        if(emailCheck.role != "Admin"){
            return res.status(400).json({
                message:"You are not Admin",
            })
        }
        // email=undefined;
        const menuDetails = await Menu.create({name,email,description,price,category,available});


        return res.status(200).json({
            success:true,
            message:"Menu is created",
            menuDetails
        })



    } catch (error) {
        res.json({
            success:false,
            message:"Error While Creating Menu"
        });
        console.error("Error Menu",error);
        process.exit(1);
    }
}

exports.getMenuById = async(req,res) => {
    try {
        const id = req.params.id;

        const menuDetails = await Menu.findById(id);

        return res.status(200).json({
            success:true,
            message:"Select Menu By Id",
            menuDetails
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:"Error While Geting Menu"
        });
        console.error("Error Get Menu",error);
        process.exit(1);
    }
}

exports.getMenu = async(req,res) => {
    try {
      

        const menuDetails = await Menu.find();;

        return res.status(200).json({
            success:true,
            message:"Getting All Menus",
            menuDetails
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:"Error While Geting All Menu"
        });
        console.error("Error Get Menu",error);
        process.exit(1);
    }
}

exports.updateMenu = async(req,res) => {
    try {
        const id = req.params.id;
        const {email,description,price,category,available} = req.body;

        const emailCheck = await User.findOne({email});

        if(!emailCheck){
            return res.status(400).json({msg:"You Can't create Menu"})
        }

        if(emailCheck.role != "Admin"){
            return res.status(400).json({
                message:"You are not Admin,So U Can't Chagne Menu",
            })
        }

        const updateMenu = await Menu.findByIdAndUpdate(id,{description:description,price:price,category:category,available:available},{new:true});

        return res.status(200),json({
            success:true,
            message:"Menu Updated Successfully",
        })
    } catch (error) {
        res.json({
            success:false,
            message:"Error While Updating  Menu"
        });
        console.error("Error Update Menu",error);
        process.exit(1);
    }
}