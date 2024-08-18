const express = require("express");
const router = express.Router();


// Import Controller    
const {dummyController} = require('../controllers/dummyController');
const {createComment} = require('../controllers/commentController')
const {createPost, fetchAllPost}  = require("../controllers/postController");
const {likePost,unlikePost} = require("../controllers/likeController");


// mapping With Controller
router.get("/dummyRoutes",dummyController);
router.post("/comment/create",createComment);
router.post('/posts/create', createPost)
router.get('/posts', fetchAllPost);
router.post('/likes/like',likePost);
router.post('/likes/unlike',unlikePost);




// export 
module.exports = router;