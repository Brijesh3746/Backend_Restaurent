const Post = require("../model/postsModel");

exports.fetchPost = async(req,res) =>{
    try{
        const fetchPost = await Post.find({});
        res.status(200).json({
            success:true,
            data:fetchPost,
            message:"fetch post from db"
        });
    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(404).json({
            success:false,
            message:"error on fetch post on db"
         });
    }
}