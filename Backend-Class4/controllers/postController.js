const Post = require("../model/postModel");

// business logic

exports.createPost = async(req, res) => {
    try{
        const {title,body} = req.body;

        const newPost  = new Post({
            title,body
        });

        const savePost = await  newPost.save();

        // const newPost = await Post.create({title,body});

        res.json({
            post:newPost
        });
    }
    catch(err){
       return res.status(504).json({
            err:"Error found in creating a post"
        });
    }
};

// adding like then test
exports.fetchAllPost = async(req, res) => {
    try{
        
        const posts = await Post.find()
                    .populate("likes")
                    .populate("comments")
                    .exec();

        res.status(200).json({
            posts
        });
    }
    catch(err){
       return res.status(504).json({
            err:"Error found in fetching a post"
        });
    }
};
