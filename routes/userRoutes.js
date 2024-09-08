const express = require("express");
const router = express.Router();

const { createUser, getUser, updateUser, deleteUser } = require("../controllers/userDetails");
const { createMenu, getMenu, getMenuById, updateMenu, deleteMenu } = require("../controllers/menuDetails");
const { createOrder, getOrderById, updateOrder, deleteOrder } = require("../controllers/orderDetails");
const { paymentOfOrder } = require("../controllers/payment");




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

// order
router.post("/create/order",createOrder);
router.get("/get/order/:id",getOrderById);
router.put("/update/order/:id",updateOrder);
router.delete("/delete/order/:id",deleteOrder);


// totalBill
router.get("/get/totalBill/:id",paymentOfOrder);


module.exports = router;