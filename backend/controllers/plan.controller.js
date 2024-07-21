const Plan=require("../models/plan.model");

exports.createPlan=async(req, res)=>{
    try{
        const{name, videoCredits, textCredits, price}=req.body;
        // console.log(name, textCredits, videoCredits, price)

        if(!name || !videoCredits || !textCredits || price===null){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const existingPlan=await Plan.findOne({name});
        if(existingPlan){
            return res.status(400).json({
                success:false,
                message:"Plan already exists",
            })
        }

        const newPlan = await Plan.create({name, videoCredits, textCredits, price});

        return res.status(200).json({
            success:true,
            newPlan,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }

}

exports.getPlans=async(req, res)=>{
    try{
        const allPlans=await Plan.find({});

        return res.status(200).json({
            success:true,
            allPlans,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }

}