// first you can create an createTodo obj so you can required first todoSchema 
// import from models
const Todo = require("../models/Todo");

// define route handler
// new way to exports
exports.getTodo = async(req,res) => {
    try{
        // fetch all item from database
        // const id = req.params.id;
        const todos = await  Todo.find({}); //here in place of Todo your model name is required but here Todo is model name

        // response
        res.status(200).json({
            success:true,
            data:todos,
            message:"All Data will fetch"
        });
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

exports.getTodoById = async (req,res)=>{
   try{
    // extract data with specific id
    const id = req.params.id;
    const todo = await  Todo.findById({_id : id});

    // data for given id is not found
    if(!todo){
        res.status(404).json({
            success: false,
            message: "No Todo found with this ID!"
         });
    }

    //data for given id is found 
    res.status(200).json({
        success: true,
        data:todo,
        message:`Data of ${id} is found in given todos`
    });

   }
   catch(err){
    res.status(500).jso({
        succes: false,
        data: err,
        message: 'Error retriving the data'
    })
   }
}