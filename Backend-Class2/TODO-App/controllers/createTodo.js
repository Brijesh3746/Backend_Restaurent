// first you can create an createTodo obj so you can required first todoSchema 
// import from models
const Todo = require("../models/Todo");

// define route handler
// new way to exports
exports.createTodo = async(req,res) => {
    try{
        // extract title and description form request body
        const {title,description} = req.body;

        // create a new Todo obj and insert into DB
        const response = await Todo.create({title,description});

        // send a json response with success flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Entry Created Successfully"
            }
        )
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal server Error",
            message:err.message,
        })
    }
}