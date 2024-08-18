const Post = require("../model/postsModel");

exports.createPost =async(req,res) => {
    try{
        const {title,body,user} = req.body;
        const addPost = await Post.create({title,body,user});

        res.status(200).json({
            success:true,
            message: "Post created successfully!",
            data:addPost
        })
    }
    catch(err){
        console.error(err);
        console.log(err.message);

        res.status(500).json({
            success:false,
            message:"Server error!"
        })
    }
}