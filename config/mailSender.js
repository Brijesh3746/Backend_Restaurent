const nodemailer = require("nodemailer");
require("dotenv").config();

exports.transporter = (doc) => {
    let transporter = nodemailer.createTransport({
        host:process.env.host,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }
    })

    let info = transporter.sendMail({
        from:"Brijesh Varsani",
        to:doc.email,
        subject:"User is Created",
        text:"User is created successfully",
    })
}