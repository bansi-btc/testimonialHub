const cloudinary=require("cloudinary").v2;
require("dotenv").config();

let cloudinaryConnect=async()=>{
    try{
        cloudinary.config({ 
            cloud_name: process.env.cloud_name, 
            api_key: process.env.api_key, 
            api_secret: process.env.api_secret // Click 'View Credentials' below to copy your API secret
        });
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports=cloudinaryConnect;