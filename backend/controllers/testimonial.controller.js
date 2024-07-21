const Testimonial=require("../models/testimonial.model");
const Space=require("../models/space.model");
const cloudinary=require("cloudinary").v2;

exports.addTestimonial=async(req, res)=>{
    try{
        const {name, email, review, rating, space, usePermission}=req.body;
        const customerImg=req.file;
        // console.log(customerImg);
        // return;
        
        const uploadedImage=await cloudinary.uploader.upload(customerImg.path, {
            resource_type:"auto",
        })

        // console.log(uploadedImage)

        // console.log(uploadedVideoFile);
        const newTestimonial=await Testimonial.create({name, email, review, rating, space, usePermission,
        customerImg:uploadedImage.secure_url});

        const updatedSpace=await  Space.findByIdAndUpdate({_id:space},
            {$push:{testimonials:newTestimonial._id}},
            {new:true}
            )

        return res.status(200).json({
            success:true,
            newTestimonial,
            updatedSpace,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.addTestimonalToWall=async(req, res)=>{
    try{
        const {space} = req.body;

        const updatedSpace=await Space.findByIdAndUpdate({_id:space}, 
            {$push:{wallOfLove:space}},
            {new:true}
            )

        return res.status(200).json({
            success:true,
            message:"Testimonial added to wallOfLove",
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

exports.removeTestimonalFromWall=async(req, res)=>{
    try{
        const {space} = req.body;

        const updatedSpace=await Space.findByIdAndUpdate({_id:space}, 
            {$pull:{wallOfLove:space}},
            {new:true}
            )

        return res.status(200).json({
            success:true,
            message:"Testimonial added to wallOfLove",
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

exports.deleteTestimonial=async(req, res)=>{
    try{
        const {testimonialId, spaceId}=req.body;


        const deletedTestimonial=await Testimonial.findByIdAndDelete({_id:testimonialId});

        const updatedSpace=await Space.findByIdAndUpdate({_id:spaceId}, 
            {
                $pull:{testimonials:deletedTestimonial._id}
            },
            {new:true}).populate([
                {
                    path:"testimonials"
                }
            ])

        return res.status(200).json({
            success:true,
            deletedTestimonial,
            updatedSpace,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.handleLike=async(req, res)=>{
    try{
        const {testimonialId, spaceId}=req.body;

        const prevTesti=await Testimonial.findOne({_id:testimonialId});
        const updatedTestimonial=await Testimonial.findByIdAndUpdate({_id:testimonialId},{liked:!prevTesti.liked}, {new:true});

        const updatedSpace=await Space.findById({_id:spaceId}).populate([
            {
                path:"testimonials"
            }
        ])

        return res.status(200).json({
            success:true,
            updatedTestimonial, 
            updatedSpace,
        })
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}