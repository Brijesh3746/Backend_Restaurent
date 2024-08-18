const express = require("express");
const router = express.Router();

//  Require controller modules.
const{login,signUp,changePassword} = require("../controllers/Auth");



//   API routes.
router.post("/login",login)
router.post("/signup",signUp)
router.post("/changePassword",changePassword)


// export's

module.exports = router;