const router = require('express').Router();

const MealIngredient=require('../models/mealIngredient.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="mealIngredient";
const parentTypeOfRecord="meal";

const ThisRecordObjModel=MealIngredient;

router.get('/thisMealsMealIngredients/:id',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({[parentTypeOfRecord]: req.params.id})
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'availableMealType'}
                }
            })
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'ingredient',
                    populate:{path: 'unitOfMeasure'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'weightType'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'brand'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'day',
                    populate:{
                        path:'weekMealPlan',
                        populate:'GRFUser'
                    }
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'availableMealType'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'mealType',
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'day',
                    populate:{path:'dayOfWeek'}
                }
            })
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'availableMealType'}
                }
            })
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'genRecipeIngredient',
                populate:{
                    path: 'ingredient',
                    populate:{path: 'unitOfMeasure'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'weightType'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'brand'}
                }
            })
            .populate({
                path:'genRecipeIngredient',
                populate:{
                    path:'ingredient',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'day',
                    populate:{
                        path:'weekMealPlan',
                        populate:'GRFUser'
                    }
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'GRFUser'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'genRecipe',
                    populate:{path:'availableMealType'}
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'mealType',
                }
            })
            .populate({
                path: 'meal',
                populate:{
                    path: 'day',
                    populate:{path:'dayOfWeek'}
                }
            })
        res.json(matchingRecord);
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
                    path: 'meal',
                    populate:{
                        path: 'day',
                        populate:{
                            path:'weekMealPlan',
                            populate:'GRFUser'
                        }
                    }
                })
            const authorId=foundRecord.meal.day.weekMealPlan.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.qty=record.qty;
                foundRecord.genRecipeIngredient=record.genRecipeIngredient._id;
                foundRecord.meal=record.meal._id;
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
    const {qty,
        genRecipeIngredient,
        meal}=req.body;
    const parentRecordAuthorId=meal.day.weekMealPlan.GRFUser._id;
    const authorId=req.currentGRFUser._id;
    if(parentRecordAuthorId===authorId){
        const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
        if(ssValResult){
            const newRecord=new ThisRecordObjModel({
                qty:qty,
                genRecipeIngredient:genRecipeIngredient._id,
                meal:meal._id,
            });
            try {
                await newRecord.save();
                res.json(newRecord);
            } catch (errs) {
                res.status(400).json('Error: '+errs)
            }
        }else{return}; 
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to add Meal Ingredients to this Meal"});
    }
});
router.delete('/:id',auth,async(req,res)=>{
    const recordId=req.params.id;
        try {
            const thisRecord=await ThisRecordObjModel.findById(recordId)
                .populate({
                    path: 'meal',
                    populate:{
                        path: 'day',
                        populate:{
                            path:'weekMealPlan',
                            populate:'GRFUser'
                        }
                    }
                })
            const authorId=thisRecord.meal.day.weekMealPlan.GRFUser._id;
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
});
module.exports=router;