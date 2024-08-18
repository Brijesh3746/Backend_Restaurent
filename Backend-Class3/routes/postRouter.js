

const express = require("express");
const router = express.Router();

const {createPost}  = require("../controllers/createPost");
const {fetchPost} = require("../controllers/fetchPost");

router.post("/posts/create",createPost);
router.get("/posts", fetchPost)

module.exports = router;