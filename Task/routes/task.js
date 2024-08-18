const express = require("express");
const router = express.Router();

const{User} = require("../controllers/User")

router.post("/user",User);

module.exports = router;