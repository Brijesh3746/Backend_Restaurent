const Todo = require("../models/Todo");

// define route handler
// new way to exports
exports.deleteTodo = async(req,res) => {
    try{
       const {id} = req.params;
       const todos = await  Todo.findByIdAndDelete(id);

       res.status(200).json({
        success:true,
        data:todos,
        message: "Deleted todo successfully",
       })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err,
            message:"error aaya hi in delete funciton"
        })
    }
}
