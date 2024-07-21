const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req, res, next)=>{
    try{
        const token=req.cookies.token || req.body.token;
        // console.log(token);

        const decode=await jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decode);
        // return;

        req.body.id=decode.id;

        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}