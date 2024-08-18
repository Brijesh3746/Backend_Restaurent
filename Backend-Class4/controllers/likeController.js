
// import the module
const Post = require("../model/postModel");
const Like = require("../model/likeModel");

// business logic

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        const like = new Like({
            post,
            user
        });

        const saveLike = await like.save();

        // update the post collection 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: saveLike._id } }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            post: updatedPost,
            message: "Liked Successfully"
        });
    } catch (err) {
        return res.status(500).json({
            err: "Error occurred while creating a like"
        });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const {post,like} = req.body;
        // find and delete
        const deletedLikes = await Like.findOneAndDelete({post:post,_id:like});
       
        // update the post inner post is represnt the hame post ki id pe delete krna hai 
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLikes._id}},{new:true});

        // likes:deletedLikes._id -> iska matlab likes ke under is(deletedLikes._id ) ko delete krna chahta hu

        res.json({
            post:updatedPost,
        })

    } catch (err) {
        return res.status(501).json({
            err: "Error occurred while unlike a like"
        });
    }
};
