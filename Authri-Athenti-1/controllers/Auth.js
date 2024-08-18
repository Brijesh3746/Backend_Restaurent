const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const  jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req, res) => {
    try{
        // read data
        const{name,email,password,role} = req.body;

        // check user already exist or not
        const  userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User is Already Exist"
            })
        }

        // secure the password
        let hasPassword;
        try{                            // (var,no of round)    
            hasPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message:"Error in Hashing Password"
            })
        }

        // create the user
        const user = await User.create({
            name,email,password:hasPassword,role
        });

        return res.status(200).json({
            success:true,
            message:"User Created Successfully"
        })

    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Signup form ",
        })
    }
}

exports.login = async(req,res) => {
    try {


        const { email, password } = req.body;

        // Find user by email
        let user = await User.findOne({ email });

        // email or passsword empty
        if (!user || !password ){
            return  res.status(401).json({
                success: false,
                message:'Please  provide an Email and a Password'
            })
        }
        

        // user not found
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        const payload = {
            id: user._id,
            email:user.email,
            role:user.role
        }

                            //  (req.body,database password)
        if (await bcrypt.compare(password, user.password)) {
        //  password Matched
        let token =  jwt.sign(payload,process.env.JWT_SECRET,
                                                {
                                                    expiresIn: "2h"//Token will expire after
                                                });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // user.role = undefined; iska matlab hai ye apko db per show nahi karenge
            // user.email = undefined;

            const options = {
                httpOnly : true ,
                expires: new Date(Date.now() + 24*60*60*1000)
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged In Successfully",
                user,
                token,
            })

            

        }
        
        else{
        //  password Not Matched
            return res.status(401).json({ 
                error: 'Invalid password'
             });
        }
    
        
      } 

      catch (error) {
        console.error(error);
        return res.status(500).json({
            success:"false",
            message: 'Login Failed'
        });
      }
    };


// // Signup route
// exports.signup = async (req, res) => {
//     try {
//       const { name, email, password,role } = req.body;
  
//       // Check if email is in correct format
//       const emailRegex = /^[a-z0-9._]+@gmail\.com$/;
//       if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: 'Invalid email format. Only Gmail addresses are allowed.' });
//       }
  
//       // Check if user with given email already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
  
//       // Check if name contains only allowed characters
//       const nameRegex = /^[a-zA-Z0-9_\.]+$/;
//       if (!nameRegex.test(name)) {
//         return res.status(400).json({ error: 'Invalid name format. Only alphanumeric characters, underscore, and full stop are allowed.' });
//       }
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create new user
//       const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         role
//       });
  
//       await newUser.save();
//       res.status(201).json({ message: 'Signup successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  
//   // Login route
// exports.login = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Check if email is in correct format

//       const emailRegex = /^[a-z0-9._]+@gmail\.com$/;
//       if (!emailRegex.test(email)) {
//         return res.status(400).json({ error: 'Invalid email format. Only Gmail addresses are allowed.' });
//       }
  
//       // Find user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Check password
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }
  
//       res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  