const Menu = require("../models/menuModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

const calculateTotalPrice = async(items) => {
    let totalPrice = 0;

    for(const oneItem of items){
        
        const menuDetails = await Menu.findById(oneItem.menu);

        if(!menuDetails){
            throw new Error("Menu is not found");
        }

        let itemPrice = menuDetails.price * oneItem.quantity;

        totalPrice = itemPrice + totalPrice;
    }

    return totalPrice;
}


exports.createOrder = async(req,res) => {
    try {
        const {user,items} = req.body;
        const totalPrice = await calculateTotalPrice(items);

        const orderDetails = await Order.create({user,items,total:totalPrice,status:"Pending"});



        return res.status(200).json({
            message:"Order created successfully",
            order:orderDetails,
        })
    } catch (error) {
        res.status(500).json({
            message:"Error While Create Order"
        })
        console.error("Creating order",error);
        process.exit(1);
    }
}

exports.getOrderById = async(req,res) => {
    try {
        const id = req.params.id;

        const orderDetails = await Order.findById(id)
            .populate({
                path: 'user',      // Populating the user field
                select: 'name -_id' // show only name excluding id
            })
            .populate({
                path: 'items.menu',
                select: 'description -_id' // show only description excluding id
            }).exec();

        return res.status(200).json({
            success:true,
            message:"Order Details",
            orderDetails
        })

    } catch (error) {
        res.status(500).json({
            message:"Error While Get the Order"
        })
        console.error("Get the order",error);
        process.exit(1);
    }
}

exports.updateOrder = async(req,res) => {
    try {
        const id = req.params.id;
        const {status} = req.body;

        const orderUpdated = await Order.findByIdAndUpdate(id,{status:status},{new:true});

        return res.status(200).json({
            success:true,
            message:"Order Updated Successfully",
            orderUpdated
        })
    } catch (error) {
        res.status(500).json({
            message:"Error While Update Order"
        })
        console.error("Update order",error);
        process.exit(1);
    }
}

exports.deleteOrder = async(req,res) => {
    try {
        const id = req.params.id;

        const orderDeleted = await Order.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"Order Deleted Successfully",
            orderDeleted
        })
    } catch (error) {
        res.status(500).json({
            message:"Error While Deleted Order"
        })
        console.error("Deleted order",error);
        process.exit(1);
    }
}
