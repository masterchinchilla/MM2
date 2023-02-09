const router = require('express').Router();

let Ingredient=require('../models/ingredient.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const {defaultWeightType,defaultBrand}=require('../ssStaticRefs/newRecordTemplates');

const typeOfRecordToChange="ingredient";

const ThisRecordObjModel=Ingredient;

router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
            .populate('GRFUser')
            .populate({
                path:'unitOfMeasure',
                populate:{
                    path:'GRFUser',
                }
            })
            .populate({
                path:'weightType',
                populate:{
                    path:'GRFUser',
                }
            })
            .populate({
                path:'brand',
                populate:{
                    path:'GRFUser',
                }
            })
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/ingredientsByName/:name',async(req,res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({name:new RegExp(req.params.name,"i")})
            .populate('GRFUser')
            .populate({
                path:'unitOfMeasure',
                populate:{
                    path:'GRFUser',
                }
            })
            .populate({
                path:'weightType',
                populate:{
                    path:'GRFUser',
                }
            })
            .populate({
                path:'brand',
                populate:{
                    path:'GRFUser',
                }
            })
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/findbyname/:name',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findOne({name:req.params.name});
        const searchByNameResult=matchingRecord?"exists":"ok";
        res.json(searchByNameResult);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    console.log(record)
    const recordId=req.params.id;
    console.log(recordId)
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    console.log(ssValResult)
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId)
                .populate('GRFUser')
                console.log(foundRecord);
            const authorId=foundRecord.GRFUser._id;
            console.log(authorId)
            const userCanEdit=authEditThisRecord(req,res,authorId)
            console.log(userCanEdit)
            if(userCanEdit){
                foundRecord.name=record.name;
                foundRecord.calories=record.calories;
                foundRecord.carbs=record.carbs;
                foundRecord.protein=record.protein;
                foundRecord.fat=record.fat;
                foundRecord.fiber=record.fiber;
                foundRecord.unitOfMeasure=record.unitOfMeasure;
                foundRecord.weightType=record.weightType?record.weightType._id:defaultWeightType;
                foundRecord.photoURL=record.photoURL?record.photoURL:"";
                foundRecord.GRFUser=record.GRFUser._id;
                foundRecord.brand=record.brand?record.brand._id:defaultBrand;
                try {
                    await foundRecord.save();
                    res.json({ok:true,msg:"success"});
                } catch (errs) {
                    res.status(500).json({ok:false,valErrorsArray:[{all:`Record save to DB failed, refresh, wait a moment and try again`}]})
                }
            }else{return}
        } catch (errs) {
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange} not found, it might have already been deleted`}]})
        }
    }else{return};
});
router.post('/add',auth,async(req,res)=>{
    const authorId=req.currentGRFUser._id;
    const record=req.body;
    const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
    if(ssValResult){
        const newRecord=new ThisRecordObjModel({
            name:record.name,
            calories:record.calories,
            carbs:record.carbs,
            protein:record.protein,
            fat:record.fat,
            fiber:record.fiber,
            unitOfMeasure:record.unitOfMeasure._id,
            weightType:record.weightType._id,
            photoURL:record.photoURL,
            GRFUser: authorId,
            brand:record.brand._id
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