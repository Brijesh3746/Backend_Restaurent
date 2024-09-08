const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");


exports.paymentOfOrder = async(req,res) => {
    try {
        const id = req.params.id;

        try {
            const userOrders = await Order.find({user:id,status:"Completed"});

            const userDetails = await User.findById(id);

            
            
            if (userOrders.length === 0) {
                return res.status(404).json({ message: 'No orders found for this user.' });
            }
            
            
            const totalBill = userOrders.reduce((acc,odrBill) => acc+odrBill.total , 0);

            const bill = await Payment.create({username:userDetails.name,Bill:totalBill});
            
            return res.status(200).json({
                message: 'Payment Generate successful',
                bill
            })
            
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching orders.' });
        }

        return res.status(200).json({
            success:true,
            orderDetails
        })
    } catch (error) {
        
    }
}