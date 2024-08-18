const Todo = require("../models/Todo");

// define route handler
// new way to exports
exports.updateTodo = async(req,res) => {
    try{
        const {id} = req.params; // Another method to fatch the id from url parameter
        const {title,description} = req.body;

        const todos = await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updateAt:Date.now}            
            );

        // data is not found in this id 
        if(!todos){
            res.status(404).json({
                success:false,
                message:`data is not update on this ${id}`
            });
        }

        // data found in this id 
        res.status(200).json({
            success:true,
            data:todos,
            message:`data is update on this ${id}`
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err,
            message:"error aaya hi"
        })
    }
}
