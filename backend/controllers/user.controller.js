const User=require('../models/user.model');
const Plan=require('../models/plan.model');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.singUp=async(req, res)=>{
    try{
        const {name, email, password}=req.body;

        
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Al fields are required",
            })
        }

        const existingUser=await User.findOne({email});
        // console.log(existingUser)

        if(existingUser){
            return res.status(200).json({
                success:false,
                message:"Email already exists",
            })
        }

        const hashedPass=await bcrypt.hash(password, 10);
        const freePlan=await Plan.findOne({name:"free"});
        // console.log(freePlan)
        // console.log(hashedPass)

        const newUser=await User.create({name, email, password:hashedPass, plan:freePlan._id });

        return res.status(200).json({
            success:true,
            newUser,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.login=async(req, res)=>{
    try{
        const {email, password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Al fields are required",
            })
        }

        const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exists",
            })
        }

        const result=await bcrypt.compare(password, existingUser.password);

        if(!result){
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            })
        }
        const payload={
            id:existingUser._id, 
        }

        const token=await jwt.sign(payload, process.env.JWT_SECRET);

        return res.cookie("token", token).status(200).json({
            success:true,
            message:"logged in successfully",
            token
        })




    }
    catch(err){
        return res.status(400).json({
            success:true,
            message:err.message,
        })
    }
}

exports.getUserDetails=async(req, res)=>{
    try{
        const id=req.body.id;

        const userDetails=await User.findOne({_id:id}).populate([
            {
                path:"plan"
            },
            {
                path:"spaces"
            },
        ]);

        return res.status(200).json({
            success:true,
            userDetails,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}