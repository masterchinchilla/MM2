const router = require('express').Router();
const { response } = require('express');
let UnitOfMeasure=require('../models/unitOfMeasure.model');
let WeightType=require('../models/weightType.model');
let Brand=require('../models/brand.model');
let GRFUserModel=require('../models/GRFUser.model');
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
router.route('/mealsPerGenRcp/:id').get((req, res)=>{
    Meal.find({genRecipe:req.params.id})
        .then(meals=>res.json(meals.length))
        .catch(err=>res.status(400).json('Error: '+err));
})
// router.route('/add').post((req, res)=>{
//     const meal=new Meal(req.body);
//     meal.save()
//         .then((meal)=>res.json(meal))
//         .catch(err=>res.status(400).json('Error: '+err));
// });
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
router.put('/update/:id',auth,async(req,res)=>{
// /:justCreated?
    const {
        day,
        genRecipe,
        mealType
    }=req.body;
    const mealId=req.params.id;
    // const nameOfObjRefPropJustCreated=req.params.justCreated;
    const dayId=day._id;
    const genRecipeId=genRecipe._id;
    const mealTypeId=mealType._id;
    const authorId=day.weekMealPlan.GRFUser._id;
    const propsArray=[
        {thisPropsName:"day",thisPropNameSentenceCase:"Day",thisPropsValue:day,thisPropTypeForVal:"objRef",PropObjModel:Day,justCreated:null},
        {thisPropsName:"genRecipe",thisPropNameSentenceCase:"Recipe",thisPropsValue:genRecipe,thisPropTypeForVal:"objRef",PropObjModel:GenRecipe,justCreated:null},
        {thisPropsName:"mealType",thisPropNameSentenceCase:"Meal Type",thisPropsValue:mealType,thisPropTypeForVal:"objRef",PropObjModel:MealType,justCreated:null},
    ];
    const ssValResult=await ssValidate("Meal", mealId, propsArray, req, res);
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
router.post('/add',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    if(requestorUser){
        const {
            day,
            genRecipe,
            mealType
        }=req.body;
        const dayId=day._id;
        const genRecipeId=genRecipe._id;
        const mealTypeId=mealType._id;
        const propsArray=[
            {thisPropsName:"day",thisPropNameSentenceCase:"Day",thisPropsValue:day,thisPropTypeForVal:"objRef",PropObjModel:Day,justCreated:null},
            {thisPropsName:"genRecipe",thisPropNameSentenceCase:"Recipe",thisPropsValue:genRecipe,thisPropTypeForVal:"objRef",PropObjModel:GenRecipe,justCreated:null},
            {thisPropsName:"mealType",thisPropNameSentenceCase:"Meal Type",thisPropsValue:mealType,thisPropTypeForVal:"objRef",PropObjModel:MealType,justCreated:null},
        ];
        const ssValResult=await ssValidate("meal", null, propsArray, req, res);
        if(ssValResult){
            const newMeal=new Meal({
                day: dayId,
                genRecipe: genRecipeId,
                mealType: mealTypeId
            });
            newMeal.save()
                .then(()=>res.json(newMeal))
                .catch(err=>res.status(400).json('Error: '+err));
        }else{return};
    }else{
        res.status(401).json({ok:false,errorMsg:"You must be logged-in to create new records"});
        return};
    
});
module.exports=router;