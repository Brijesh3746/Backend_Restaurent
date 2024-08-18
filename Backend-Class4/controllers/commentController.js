
// import the  required module
const Post = require("../model/postModel");
const Comment = require("../model/commentModel");

// business logic
exports.createComment = async(req,res) =>{
    try{
        const{post,user,body} = req.body;

        // insert the data into database using save method
        // 1 step: create comment obj
        const comment = new Comment({
            post,user,body
        });

        // 2nd step
        const saveComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments: saveComment._id}},{new : true})
                                    .populate("comments") //populate meaning fully object show in Post but if remove populate then only show id in comments
                                    .exec();
        
        res.json({
            post:updatedPost
        });
        

    }
    catch(err){
        return res.status(500).json({
            err:"this is error on creating an comment"
        });
    }
}


// export
