const express=require("express");
const { singUp, login, getUserDetails } = require("../controllers/user.controller");
const {auth}=require("../middlewares/auth.middle")
const router=express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post("/signup",upload.none(), singUp);
router.post("/login",upload.none(), login);
router.post("/getUserDetails",upload.none(),auth, getUserDetails);

module.exports=router;