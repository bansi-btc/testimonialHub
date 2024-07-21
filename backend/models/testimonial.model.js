const mongoose=require("mongoose")

const testimonialSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
    customerImg:{
        type:String,
    },
    review:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    videoUrl:{
        type:String,
        // required:true,
    },
    space:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Space",
        required:true,
    },
    usePermission:{
        type:Boolean,
        default:false,
    },
    liked:{
        type:Boolean,
        default:false,
    }

}, {timestamps:true})

module.exports=mongoose.model("Testimonial", testimonialSchema);