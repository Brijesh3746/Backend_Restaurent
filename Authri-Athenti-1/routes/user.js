const express = require("express");
const router = express.Router();
const User = require("../model/userModel");

//  Require controller modules.
const{login,signup} = require("../controllers/Auth");
const {auth,isStudent,isAdmin}  = require("../middleware/auth");



//   API routes.
router.post("/login",login);
router.post("/signup",signup);

// testing protected routes 
router.get("/test",auth,(req,res) => {
    res.json({
        success:true,
        message:"Welcome To Protected route for Test"
    })
} )

// protected routes for Auth
router.get("/student",auth,isStudent,(req,res) => {
    res.json({
        success:true,
        message:"Welcome To Protected route for students"
    })
} )

router.get("/admin",auth,isAdmin,(req,res) => {
    res.json({
        success:true,
        message:"Welcome To Protected route for Admin"
    })
} )

router.get("/getEmail", auth , async( req , res )=> {
    try{
        const id =req.user.id;
        const user = await User.findById(id);
        console.log(id);
        return  res.status(200).json({
            success:true,
            message:"Using Id through fatching data pass in auth  middleware ",
            user,
        });

    }catch(error){
        return  res.status(500).json({ success: false, 
            error:error.message,
            message: 'Internal server error' });
    }

});

// export's

module.exports = router;