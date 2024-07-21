const mongoose=require("mongoose");

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        enum:["free", "silver", "gold"],
    },
    videoCredits:{
        type:Number,
        required:true,
    },
    textCredits:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
})

module.exports=mongoose.model("Plan", planSchema);