const router = require('express').Router();

const Meal=require('../models/meal.model');
const MealIngredient=require('../models/mealIngredient.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="meal";
const parentTypeOfRecord="day";
const typesOfChildRecords="mealIngredient";

const ThisRecordObjModel=Meal;
const ChildRecordObjModel=MealIngredient;

router.get('/mealsofthisday/:id',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({[parentTypeOfRecord]: req.params.id})
            .populate({
                path:'day',
                populate:{
                    path:'weekMealPlan',
                    populate:'GRFUser'
                }
            })
            .populate({
                path: 'day',
                populate: { path: 'dayOfWeek' }
            })
            .populate('mealType')
            .populate({
                path: 'genRecipe',
                populate: { path: 'GRFUser' }
            })
            .populate({
                path: 'genRecipe',
                populate: { path: 'availableMealType' }
            })
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId)
                .populate({
                    path:'day',
                    populate:{
                        path:'weekMealPlan',
                        populate:'GRFUser'
                    }
                });
            const authorId=foundRecord.day.weekMealPlan.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.day=record.day._id;
                foundRecord.genRecipe=record.genRecipe._id;
                foundRecord.mealType=record.mealType._id;
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
router.delete('/:id',auth,async(req,res)=>{
    const recordId=req.params.id;
    try {
        const connectedRecords=await ChildRecordObjModel.find({[typeOfRecordToChange]:recordId});
        if(connectedRecords.length>0){
            res.status(400).json({ok:false,valErrorsArray:[{all:`Cannot delete: Remove connected children (${typesOfChildRecords}) before attempting to delete ${typeOfRecordToChange}`}]});
        }else{
            try {
                const thisRecord=await ThisRecordObjModel.findById(recordId)
                    .populate({
                        path:'day',
                        populate:{
                            path:'weekMealPlan',
                            populate:'GRFUser'
                        }
                    });
                const authorId=thisRecord.day.weekMealPlan.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId);
                if(userCanEdit){
                    try {
                        await ThisRecordObjModel.findByIdAndDelete(recordId);
                        res.status(200).json({ok:true,message:`Record successfully deleted`});
                    } catch (errs) {
                        res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
                    }
                }
            } catch (errs) {
                res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
            }
        }
    } catch (errs) {
        console.log(errs);
        res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
    }
});
router.post('/add',auth,async(req,res)=>{
    const {day,genRecipe,mealType}=req.body;
    const parentRecordAuthorId=day.weekMealPlan.GRFUser._id;
    const authorId=req.currentGRFUser._id;
    if(parentRecordAuthorId===authorId){
        const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
        if(ssValResult){
            const newRecord=new ThisRecordObjModel({
                day:day._id,
                genRecipe:genRecipe._id,
                mealType:mealType._id,
            });
            try {
                await newRecord.save();
                res.json(newRecord);
            } catch (errs) {
                res.status(400).json('Error: '+errs)
            }
        }else{return}; 
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to add Meals to this Day"});
    }
});
module.exports=router;