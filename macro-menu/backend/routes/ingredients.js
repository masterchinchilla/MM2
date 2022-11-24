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
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate}=require('../backendServices/ssValidation');
router.route('/').get((req, res)=>{
    Ingredient.find()
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
        .then(ingredients=>res.json(ingredients))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/ingredientsByName/:name').get((req, res)=>{
    Ingredient.find({name:new RegExp(req.params.name,"i")})
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
        .then(ingredients=>res.json(ingredients))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/findbyname/:name').get((req, res)=>{
    Ingredient.findOne({name:req.params.name})
        .then((ingredient)=>{
            if(ingredient){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
});
router.put('/update/:id/:objRefPropsJustCreatedArray?',auth,async(req,res)=>{
    const {
        name,
        calories,
        carbs,
        protein,
        fat,
        fiber,
        photoURL,
        unitOfMeasure,
        weightType,
        GRFUser,
        brand
    }=req.body;
    const ingredientId=req.params.id
    const unitOfMeasureId=unitOfMeasure._id;
    const weightTypeId=weightType._id;
    const brandId=brand._id;
    const authorId=GRFUser._id;
    const uomJustCreated=objRefPropsJustCreatedArray.filter(objRefProp=>objRefProp==="unitOfMeasure");
    const weightTypeJustCreated=objRefPropsJustCreatedArray.filter(objRefProp=>objRefProp==="weightType");
    const brandJustCreated=objRefPropsJustCreatedArray.filter(objRefProp=>objRefProp==="brand");
    const propsArray=[
        {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:Ingredient,justCreated:null},
        {thisPropsName:"calories",thisPropNameSentenceCase:"Calories",thisPropsValue:calories,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"carbs",thisPropNameSentenceCase:"Carbs",thisPropsValue:carbs,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"protein",thisPropNameSentenceCase:"Protein",thisPropsValue:protein,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"fat",thisPropNameSentenceCase:"Fat",thisPropsValue:fat,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"fiber",thisPropNameSentenceCase:"Fiber",thisPropsValue:fiber,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"photoURL",thisPropNameSentenceCase:"Photo URL",thisPropsValue:photoURL,thisPropTypeForVal:"url",PropObjModel:null,justCreated:null},
        {thisPropsName:"unitOfMeasure",thisPropNameSentenceCase:"Unit Of Measure",thisPropsValue:unitOfMeasure,thisPropTypeForVal:"objRef",PropObjModel:UnitOfMeasure,justCreated:uomJustCreated?true:false},
        {thisPropsName:"weightType",thisPropNameSentenceCase:"Weight Type",thisPropsValue:weightType,thisPropTypeForVal:"objRef",PropObjModel:WeightType,justCreated:weightTypeJustCreated?true:false},
        {thisPropsName:"GRFUser",thisPropNameSentenceCase:"User",thisPropsValue:GRFUser,thisPropTypeForVal:"objRef",PropObjModel:GRFUserModel,justCreated:null},
        {thisPropsName:"brand",thisPropNameSentenceCase:"Brand",thisPropsValue:brand,thisPropTypeForVal:"objRef",PropObjModel:Brand,justCreated:brandJustCreated?true:false},
    ];
    const ssValResult=await ssValidate("Ingredient", ingredientId, propsArray, null, req, res);
    if(ssValResult){
        const userCanEdit=authEditThisRecord(req,res,authorId)
        if(userCanEdit){
            Ingredient.findById(ingredientId)
                .then(ingredient=>{
                    ingredient.name=name;
                    ingredient.calories=calories;
                    ingredient.carbs=carbs;
                    ingredient.protein=protein;
                    ingredient.fat=fat;
                    ingredient.fiber=fiber;
                    ingredient.photoURL=photoURL;
                    ingredient.unitOfMeasure=unitOfMeasureId;
                    ingredient.weightType=weightTypeId;
                    ingredient.GRFuser=authorId;
                    ingredient.brand=brandId;
                    ingredient.save()
                        .then(()=>res.json({ok:true,msg:"success"}))
                        .catch((err)=>{
                            res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
                        });
                }).catch((err)=>{
                    res.status(404).json({ok:false,errorMsg:"Ingredient not found, it might have already been deleted"})
                });
        }else{
            return;
        }
    }else{
        return;
    }
});
router.post('/add',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    if(requestorUser){
        const {
            name,
            calories,
            carbs,
            protein,
            fat,
            fiber,
            photoURL,
            unitOfMeasure,
            weightType,
            GRFUser,
            brand
        }=req.body;
        const unitOfMeasureId=unitOfMeasure._id;
        const weightTypeId=weightType._id;
        const brandId=brand._id;
        const authorId=GRFUser._id;
        const propsArray=[
            {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:Ingredient,justCreated:null},
            {thisPropsName:"calories",thisPropNameSentenceCase:"Calories",thisPropsValue:calories,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
            {thisPropsName:"carbs",thisPropNameSentenceCase:"Carbs",thisPropsValue:carbs,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
            {thisPropsName:"protein",thisPropNameSentenceCase:"Protein",thisPropsValue:protein,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
            {thisPropsName:"fat",thisPropNameSentenceCase:"Fat",thisPropsValue:fat,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
            {thisPropsName:"fiber",thisPropNameSentenceCase:"Fiber",thisPropsValue:fiber,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
            {thisPropsName:"photoURL",thisPropNameSentenceCase:"Photo URL",thisPropsValue:photoURL,thisPropTypeForVal:"url",PropObjModel:null,justCreated:null},
            {thisPropsName:"unitOfMeasure",thisPropNameSentenceCase:"Unit Of Measure",thisPropsValue:unitOfMeasure,thisPropTypeForVal:"objRef",PropObjModel:UnitOfMeasure,justCreated:null},
            {thisPropsName:"weightType",thisPropNameSentenceCase:"Weight Type",thisPropsValue:weightType,thisPropTypeForVal:"objRef",PropObjModel:WeightType,justCreated:null},
            {thisPropsName:"GRFUser",thisPropNameSentenceCase:"User",thisPropsValue:GRFUser,thisPropTypeForVal:"objRef",PropObjModel:GRFUserModel,justCreated:null},
            {thisPropsName:"brand",thisPropNameSentenceCase:"Brand",thisPropsValue:brand,thisPropTypeForVal:"objRef",PropObjModel:Brand,justCreated:null},
        ];
        const ssValResult=await ssValidate("Ingredient", null, propsArray, req, res);
        if(ssValResult){
            const newIngredient=new Ingredient({
                name,
                calories,
                carbs,
                protein,
                fat,
                fiber,
                unitOfMeasure: unitOfMeasureId,
                weightType: weightTypeId,
                photoURL,
                GRFUser: authorId,
                brand: brandId
            });
            newIngredient.save()
                .then(()=>res.json(newIngredient))
                .catch(err=>res.status(400).json('Error: '+err));
        }else{return};
    }else{
        res.status(401).json({ok:false,errorMsg:"You must be logged-in to create new records"});
        return};
    
});
module.exports=router;