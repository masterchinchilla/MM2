const router = require('express').Router();

const Brand=require('../models/brand.model');

const auth = require('../middleware/auth');

const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="brand";

const ThisRecordObjModel=Brand;

router.get('/',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find().populate("GRFUser");
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id).populate("GRFUser");
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.post('/add',auth,async(req,res)=>{
    const authorId=req.currentGRFUser._id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
    if(ssValResult){
        const newRecord=new ThisRecordObjModel({
            name:req.body.name,
            GRFUser: authorId
        });
        try {
            await newRecord.save();
            res.json(newRecord);
        } catch (errs) {
            res.status(400).json('Error: '+errs)
        }
    }else{return}; 
});
module.exports=router;