const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        required:true,
    },
    spaces:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Space",
        }
    ],
})

module.exports=mongoose.model("User", userSchema)