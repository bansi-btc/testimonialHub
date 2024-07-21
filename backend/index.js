const express=require("express");

const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors");

app.use(express.json())
app.use(cookieParser());
app.use(cors());

require("dotenv").config();

const PORT= process.env.PORT;

const planRoutes=require("./routes/plan.route");
app.use('/api/v1', planRoutes);

const userRoutes=require("./routes/user.route");
app.use('/api/v1', userRoutes);

const spaceRoutes=require("./routes/space.route");
app.use('/api/v1', spaceRoutes);

const testimonialRoutes=require("./routes/testimonial.route");
app.use('/api/v1', testimonialRoutes);

app.listen(PORT, ()=>{
    console.log(`App started at PORT ${PORT}`);
})

const dbConnect=require("./config/database");
dbConnect();

const cloudinaryConnect=require("./config/cloudinary");
cloudinaryConnect();



