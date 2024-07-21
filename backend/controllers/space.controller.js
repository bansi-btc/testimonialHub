const Space=require("../models/space.model");
const User=require("../models/user.model");

exports.createSpace=async(req, res)=>{
    try{
        const {spaceName, spaceLogo, header, questions, testimonialType,darkMode }=req.body;
        const createdBy=req.body.id;
        const existingUser=await User.findOne({_id:createdBy}).populate([
            {path:"spaces"},
            {path:"plan"}
        ]);
        

        let planVideo=existingUser.plan.videoCredits;
        let planText=existingUser.plan.textCredits;

        let text=0;
        let video=0;
        // console.log(videoTestCnt, textTestCnt);
        for(let value of existingUser.spaces){
            if(value.testimonialType==="text"){
                text+=value.length;
            }
            else if(value.testimonialType==="video"){
                text+=value.length;
            }
            else{
                text+=value.length;
                video+=value.length;
            }
        }

        if(text>=planText || video>=planVideo){
            return res.status(400).status({
                success:false,
                message:"Plan limit reached please upgrade plan",
            })
        }

        const newSpace=await Space.create({spaceName, spaceLogo, header, questions, testimonialType, darkMode});
        const updatedUser=await User.findByIdAndUpdate({_id:createdBy}, 
            {$push : {spaces:newSpace._id}},
            {new:true},
            )

        return res.status(200).json({
            success:true,
            newSpace,
            updatedUser,
        })




    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.updateSpace=async(req, res)=>{
    try{
        const {spaceId,spaceName, spaceLogo, header, questions, testimonialType }=req.body;
        // console.log({spaceId,spaceName, spaceLogo, header, questions, testimonialType })


        const updatedSpace=await Space.findByIdAndUpdate({_id:spaceId}, {
            spaceName,
            spaceLogo, 
            header,
            questions,
            testimonialType,
        }, {new:true})

        return res.status(200).json({
            success:true,
            updatedSpace
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.deleteSpace=async (req, res)=>{
    try{
        const {spaceId}=req.body;
        const createdBy=req.body.id;

        const deletedSpace=await Space.findByIdAndDelete({_id:spaceId}, {new:true})

        const updatedUser=await User.findByIdAndUpdate({_id:createdBy}, 
            {$pull : {spaces:deletedSpace._id}},
            {new:true}
            ).populate([
                {
                    path:"plan"
                },
                {
                    path:"spaces"
                },
            ]);

        return res.status(200).json({
            success:true,
            deletedSpace,
            updatedUser
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getSpaceDetails=async(req, res)=>{
    try{
        const userId=req.body.id;

        const {spaceId}=req.body;


        const spaceDetails=await Space.findOne({_id:spaceId}).populate([
            {
                path:"testimonials"
            }
        ]);

        return res.status(200).json({
            success:true,
            spaceDetails,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}