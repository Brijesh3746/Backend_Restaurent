const express = require("express");
const router = express.Router();

const { createUser, getUser, updateUser, deleteUser } = require("../controllers/userDetails");
const { createMenu, getMenu, getMenuById, updateMenu, deleteMenu } = require("../controllers/menuDetails");




// User
router.post("/users",createUser);
router.get("/users/:id",getUser);
router.put("/users/:id",updateUser);
router.delete("/users/:id",deleteUser);

// Menu
router.post("/create/menu",createMenu);
router.get("/get/menu/:id",getMenuById);
router.get("/get/allmenu",getMenu);
router.put("/update/menu/:id",updateMenu);
router.delete("/delete/menu/:id",deleteMenu);



module.exports = router;