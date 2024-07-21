const express=require("express");
const { createPlan, getPlans } = require("../controllers/plan.controller");

const router=express.Router();

router.post('/createPlan', createPlan);
router.get('/getPlans', getPlans);

module.exports=router;