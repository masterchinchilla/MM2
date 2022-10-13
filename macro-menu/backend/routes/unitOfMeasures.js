const router = require('express').Router();
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
const auth = require('../middleware/auth');
const {ssValidate}=require('../backendServices/ssValidation');
router.route('/').get((req, res)=>{
    UnitOfMeasure.find().populate("GRFUser")
        .then(unitOfMeasure=>res.json(unitOfMeasure))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.post('/add/:justCreated?',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    if(requestorUser){
        const {
            name,
            GRFUser
        }=req.body;
        const nameOfObjRefPropJustCreated=req.params.justCreated;
        const authorId=GRFUser._id;
        const propsArray=[
            {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:UnitOfMeasure},
            {thisPropsName:"GRFUser",thisPropNameSentenceCase:"User",thisPropsValue:GRFUser,thisPropTypeForVal:"objRef",PropObjModel:GRFUserModel}
        ];
        const ssValResult=await ssValidate("Unit of Measure", null, propsArray, nameOfObjRefPropJustCreated, req, res);
        if(ssValResult){
            const newUnitOfMeasure=new UnitOfMeasure({
                name,
                GRFUser: authorId
            });
            newUnitOfMeasure.save()
                .then(()=>res.json(newUnitOfMeasure))
                .catch(err=>res.status(400).json('Error: '+err));
        }else{return};
    }else{
        res.status(401).json({ok:false,errorMsg:"You must be logged-in to create new records"});
        return};
    
});
module.exports=router;