const express=require("express");
const { createSpace, updateSpace, deleteSpace, getSpaceDetails } = require("../controllers/space.controller");
const { auth } = require("../middlewares/auth.middle");

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

router.post('/getSpaceDetails',upload.none(),auth, getSpaceDetails );
router.post('/createSpace',upload.none(),auth, createSpace );
router.post('/updateSpace',upload.none(),auth, updateSpace );
router.post('/deleteSpace',upload.none(),auth, deleteSpace );

module.exports=router;