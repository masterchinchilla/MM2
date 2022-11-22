const router = require('express').Router();
const { response } = require('express');
let UnitOfMeasure=require('../models/unitOfMeasure.model');
let WeightType=require('../models/weightType.model');
let Brand=require('../models/brand.model');
let GRFUser=require('../models/GRFUser.model');
let GenRecipeIngredient=require('../models/genRecipeIngredient.model');
let GenRecipe=require('../models/genRecipe.model');
let Ingredient=require('../models/ingredient.model');
let Meal=require('../models/meal.model');
let Day=require('../models/day.model');
let WeekMealPlan=require('../models/weekMealPlan.model');
let MealIngredient=require('../models/mealIngredient.model');
let DayOfWeek=require('../models/dayOfWeek.model');
let MealType=require('../models/mealType.model');
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate}=require('../backendServices/ssValidation');
router.route('/').get((req, res)=>{
    Meal.find().populate('day')
        .populate({
            path: 'genRecipe',
            populate: { path: 'GRFUser' }
        }).populate('mealType')
        .populate({
            path: 'day',
            populate: { path: 'dayOfWeek' }
        })
        .then(meals=>res.json(meals))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/mealsofthisday/:id').get((req, res)=>{   
    Meal.find({day: req.params.id})
        .populate('day')
        .populate({
            path:'day',
            populate:{path:'weekMealPlan'}
        })
        .populate({
            path:'day',
            populate:{
                path:'weekMealPlan',
                populate:'GRFUser'
            }
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
        .populate({
            path: 'day',
            populate: { path: 'dayOfWeek' }
        })
        .then(meals => res.json(meals))
        .catch(err => res.status(400).json('Error: '+err));
});
// router.route('/add').post((req, res) => {
//     Note that the above worked in the prior version of the app, the below WILL NOT. The below needs the extra slash to accomodate add routes that take an optional param at the end ":justCreated"
router.route('/add/').post((req, res)=>{
    const meal=new Meal(req.body);
    meal.save()
        .then((meal)=>res.json(meal))
        .catch(err=>res.status(400).json('Error: '+err));
});
// router.route('/update/:id').put((req, res)=>{
//     Meal.findById(req.params.id)
//         .then(meal=>{
//             meal.day = req.body.day;
//             meal.genRecipe = req.body.genRecipe;
//             meal.mealType = req.body.mealType;
//             meal.save()
//                 .then(()=>res.json(meal))
//                 .catch(err=>res.status(400).json('Error: '+err));
//         })
//         .catch(err=>res.status(400).json('Error: '+err));
// });
router.put('/update/:id/:justCreated?',auth,async(req,res)=>{
    const {
        day,
        genRecipe,
        mealType
    }=req.body;
    const mealId=req.params.id;
    const nameOfObjRefPropJustCreated=req.params.justCreated;
    const dayId=day._id;
    const genRecipeId=genRecipe._id;
    const mealTypeId=mealType._id;
    const authorId=day.weekMealPlan.GRFUser._id;
    const propsArray=[
        {thisPropsName:"day",thisPropNameSentenceCase:"Day",thisPropsValue:day,thisPropTypeForVal:"objRef",PropObjModel:Day},
        {thisPropsName:"genRecipe",thisPropNameSentenceCase:"Recipe",thisPropsValue:genRecipe,thisPropTypeForVal:"objRef",PropObjModel:GenRecipe},
        {thisPropsName:"mealType",thisPropNameSentenceCase:"Meal Type",thisPropsValue:mealType,thisPropTypeForVal:"objRef",PropObjModel:MealType},
    ];
    const ssValResult=await ssValidate("Meal", mealId, propsArray, nameOfObjRefPropJustCreated, req, res);
    if(ssValResult){
        const userCanEdit=authEditThisRecord(req,res,authorId)
        if(userCanEdit){
            Meal.findById(mealId)
                .then(meal=>{
                    meal.day = dayId;
                    meal.genRecipe = genRecipeId;
                    meal.mealType = mealTypeId;
                    meal.save()
                        .then(()=>res.json({ok:true,msg:"success"}))
                        .catch((err)=>{
                            res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
                        });
                }).catch((err)=>{
                    res.status(404).json({ok:false,errorMsg:"Meal not found, it might have already been deleted"})
                });
        }else{
            return;
        }
    }else{
        return;
    }
});
router.route('/:id').delete((req, res)=>{
    Meal.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Meal successfully deleted.'))
        .catch(err=>res.status(400).json('Error :'+err));
});
module.exports=router;