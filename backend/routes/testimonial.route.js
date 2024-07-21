const express=require("express");
const { addTestimonial, addTestimonalToWall, removeTestimonalFromWall, deleteTestimonial, handleLike } = require("../controllers/testimonial.controller");
const multer = require('multer');
const path = require('path');
const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post("/addTestimonial",upload.single("customerImg"), addTestimonial);
router.post("/handleLike",upload.none(), handleLike);
router.post("/deleteTestimonial",upload.none(), deleteTestimonial);
router.post("/addTestimonialToWall",addTestimonalToWall);
router.post("/removeTestimonialFromWall",removeTestimonalFromWall);

module.exports=router;