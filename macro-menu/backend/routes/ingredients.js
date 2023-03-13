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
        res.status(500).json([{all:`Record lookup failed, refresh, wait a moment and try again`}])
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
        res.status(500).json([{all:`Lookup by name failed, refresh, wait a moment and try again`}])
    }
});
router.get('/findbyname/:name',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findOne({name:req.params.name});
        const searchByNameResult=matchingRecord?"exists":"ok";
        res.json(searchByNameResult);
    } catch (errs) {
        res.status(500).json([{all:`Lookup by name failed, refresh, wait a moment and try again`}])
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    try {
        const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
        if(ssValResult){
            try {
                const foundRecord=await ThisRecordObjModel.findById(recordId)
                    .populate('GRFUser')
                const authorId=foundRecord.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId)
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
                        res.json("success");
                    } catch (errs) {
                        res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                    }
                }else{
                    res.status(401).json([{all:`You do not have access to edit this ${typeOfRecordToChange}`}]);
                }
            } catch (errs) {
                res.status(500).json([{all:`${typeOfRecordToChange} not found, it might have already been deleted`}])
            }
        }else{return};
    } catch (errs) {
        res.status(500).json([{all:`Validator call failed, refresh, wait a moment and try again`}])
    }
});
router.post('/add',auth,async(req,res)=>{
    const authorId=req.currentGRFUser._id;
    const record=req.body;
    try {
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
                res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
            }
        }else{return}; 
    } catch (errs) {
        res.status(500).json([{all:`Validator call failed, refresh, wait a moment and try again`}])
    }
});
module.exports=router;