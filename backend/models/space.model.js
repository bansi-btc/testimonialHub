const mongoose=require("mongoose");

const spaceSchema=new mongoose.Schema({
    spaceName:{
        type:String,
        required:true,
    },
    spaceLogo:{
        type:String,
        required:true,
    },
    header:{
        type:String,
        required:true,
    },
    questions:[
        {
            type:String
        }
    ],
    testimonials:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Testimonial",
    }],
    wallOfLove:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Testimonial",
        }
    ],
    testimonialType:{
        type:String,
        required:true,
        enum:["text", "video", "both"],
    },
    daskMode:{
        type:Boolean,
        default:false,
    }

})

module.exports=mongoose.model("Space", spaceSchema)