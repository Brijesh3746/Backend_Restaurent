const dob = require("../model/dob");

exports.User = async(req,res) =>{
    try {
        const{name,dob} = req.body;
        
        console.log("name:",name);

        // console.log("Date of birth is :",dob);

        const dateParts = dob.split("/");
        console.log(dateParts);

        const date = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        const current = new Date();
        let age  = current.getFullYear()-year;
        console.log(age);
    //     const curDate = today.getDate();
    //     console.log(curDate)
    // 
    } 
    catch (error) {
        console.log("error in controller",error);
        console.log(error.message);

        res.status(500).json({
            success:false,
            message: "Controller  Error",
        })
    }
}