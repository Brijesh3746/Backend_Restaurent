const nodemailer = require("nodemailer");


exports.transporter = (doc) =>{
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }

    });

    //send the mail
    let info = transporter.sendMail({
        from:"Brijesh ",
        to:doc.email,
        subject:"File Upload ",
        html:`<h2>Cloud Uploading</h2><p>It's a testing in cloudinary via email</p>
                view here : <a href=${doc.image}>${doc.image}</a><br>
                <li value=${doc.name}>${doc.name}</li>
                <li value=${doc.tags}>${doc.tags}</li>`
       }) 
    
       console.log("INFO:",info);
}