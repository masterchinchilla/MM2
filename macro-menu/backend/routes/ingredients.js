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
const Joi=require('joi');
const jwtDecode = require('jwt-decode');
const { validate } = require('../models/unitOfMeasure.model');
const valSchema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
    floatPercent: Joi.number().min(0).max(100).required(),
    float: Joi.number().min(0).max(9999.99).required(),
    //string is the only primitive in Joi that doesn't allow an empty value. That's why you explicitly have to allow empty strings like this: Joi.string().allow("").
    textBox: Joi.string().trim().max(3000).allow(""),
    url: Joi.string().trim().uri().max(3000).allow(""),
  });
function validateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
    return error ? error.details[0].message : null;
  };
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
router.put('/update/:id',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    // const requestorUserId=requestorUser._id;
    requestorUser.isAdmin=false;
    // const requestorUserId="629e5328f4e89945aea6a206";
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
    // const fiber=-10;
    // const name="Salmon";
    // const authorId=GRFUser._id;
    const ingredientId=req.params.id
    const unitOfMeasureId=unitOfMeasure._id;
    const weightTypeId=weightType._id;
    const brandId=brand._id;
    // const authorId="629e5328f4e89945aea6a206";
    // GRFUser._id="61315698953e9eba8c11a03a";
    // requestorUser.isAdmin=false;
    const propsArray=[
        {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:Ingredient},
        {thisPropsName:"calories",thisPropNameSentenceCase:"Calories",thisPropsValue:calories,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"carbs",thisPropNameSentenceCase:"Carbs",thisPropsValue:carbs,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"protein",thisPropNameSentenceCase:"Protein",thisPropsValue:protein,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"fat",thisPropNameSentenceCase:"Fat",thisPropsValue:fat,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"fiber",thisPropNameSentenceCase:"Fiber",thisPropsValue:fiber,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"photoURL",thisPropNameSentenceCase:"Photo URL",thisPropsValue:photoURL,thisPropTypeForVal:"url",PropObjModel:null},
        {thisPropsName:"unitOfMeasure",thisPropNameSentenceCase:"Unit Of Measure",thisPropsValue:unitOfMeasure,thisPropTypeForVal:"objRef",PropObjModel:UnitOfMeasure},
        {thisPropsName:"weightType",thisPropNameSentenceCase:"Weight Type",thisPropsValue:weightType,thisPropTypeForVal:"objRef",PropObjModel:WeightType},
        {thisPropsName:"GRFUser",thisPropNameSentenceCase:"User",thisPropsValue:GRFUser,thisPropTypeForVal:"objRef",PropObjModel:GRFUserModel},
        {thisPropsName:"brand",thisPropNameSentenceCase:"Brand",thisPropsValue:brand,thisPropTypeForVal:"objRef",PropObjModel:Brand},
    ];
    const ssValResult=await ssValidate("Ingredient", ingredientId, propsArray, req, res);
    if(ssValResult){
        const userCanEdit=authEditThisRecord(req,res)
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
                            console.log(err);
                            res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
                        });
                }).catch((err)=>{
                    console.log(err);
                    res.status(404).json({ok:false,errorMsg:"Ingredient not found, it might have already been deleted"})
                });
        }else{
            return;
        }
    }else{
        return;
    }
    // const foundAuthor= await GRFUserModel.findById(authorId);
    // if(!foundAuthor){
    //     res.status(404).json({ok:false,errorMsg:"Invalid author"});
    //     return;
    // };
    // if(requestorUserId===authorId||requestorUser.isAdmin===true){
    //     const unitOfMeasureId=unitOfMeasure._id;
    //     // const unitOfMeasureId="629e5328f4e89945aea6a206";
    //     const weightTypeId=weightType._id;
    //     const brandId=brand._id;
    //     const foundUOM=await UnitOfMeasure.findById(unitOfMeasureId);
    //     if(!foundUOM){
    //         res.status(404).json({ok:false,errorMsg:"Unit of Measure not found"});
    //         return;
    //     };
    //     const foundWeightType = await WeightType.findById(weightTypeId);
    //     if(!foundWeightType){
    //         res.status(404).json({ok:false,errorMsg:"Weight Type not found"});
    //         return;
    //     };
    //     const foundBrand= await Brand.findById(brandId);
    //     if(!foundBrand){
    //         res.status(404).json({ok:false,errorMsg:"Brand not found"});
    //         return;
    //     };
    //     const valErrorsArray=[];
    //     let nameError=validateProp("name",name,"name");
    //     let caloriesError=validateProp("calories",calories,"float");
    //     if(caloriesError){valErrorsArray.push({calories:caloriesError})};
    //     let carbsError=validateProp("carbs",carbs,"float");
    //     if(carbsError){valErrorsArray.push({carbs:carbsError})};
    //     let proteinError=validateProp("protein",protein,"float");
    //     if(proteinError){valErrorsArray.push({protein:proteinError})};
    //     let fatError=validateProp("fat",fat,"float");
    //     if(fatError){valErrorsArray.push({fat:fatError})};
    //     let fiberError=validateProp("fiber",fiber,"float");
    //     if(fiberError){valErrorsArray.push({fiber:fiberError})};
    //     let photoURLError=validateProp("photoURL",photoURL,"url");
    //     if(photoURLError){valErrorsArray.push({photoURL:photoURLError})};
    //     const ingredientId=req.params.id;
    //     // const ingredientId="629e5328f4e89945aea6a206";
    //     Ingredient.find({name:new RegExp(name,"i")})
    //         .then(ingredients=>{
    //             for(let i=0;i<ingredients.length;i++){
    //                 if(ingredients[i].name===name){
    //                     if(!(ingredients[i]._id.equals(ingredientId))){
    //                         nameError="Another Ingredient is already using that name"}
    //                 }
    //             };
    //             if(nameError){valErrorsArray.push({name:nameError})};
    //             if(valErrorsArray.length>0){  
    //                 res.status(400).json({ok:false,valErrorsArray:valErrorsArray});
    //             }else{
    //                 Ingredient.findById(ingredientId)
    //                     .then(ingredient=>{
    //                         ingredient.name=name;
    //                         ingredient.calories=calories;
    //                         ingredient.carbs=carbs;
    //                         ingredient.protein=protein;
    //                         ingredient.fat=fat;
    //                         ingredient.fiber=fiber;
    //                         ingredient.photoURL=photoURL;
    //                         ingredient.unitOfMeasure=unitOfMeasureId;
    //                         ingredient.weightType=weightTypeId;
    //                         ingredient.GRFuser=authorId;
    //                         ingredient.brand=brandId;
    //                         ingredient.save()
    //                             .then(()=>res.json({ok:true,msg:"success"}))
    //                             .catch((err)=>{
    //                                 console.log(err);
    //                                 res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
    //                             });
    //                     }).catch((err)=>{
    //                         console.log(err);
    //                         res.status(404).json({ok:false,errorMsg:"Ingredient not found, it might have already been deleted"})
    //                     });
    //             }});
    // }else{
    //     res.status(401).json({ok:false,errorMsg:"You do not have access to edit this record"});
    //     return;
    // };
});
router.route('/add').post((req, res)=>{
    const name=req.body.name;
    const calories=req.body.calories;
    const carbs=req.body.carbs;
    const protein=req.body.protein;
    const fat=req.body.fat;
    const fiber=req.body.fiber;
    const unitOfMeasure=req.body.unitOfMeasure;
    const weightType=req.body.weightType;
    const photoURL=req.body.photoURL;
    const GRFUser=req.body.GRFUser;
    const brand=req.body.brand;
    const newIngredient=new Ingredient({
        name,
        calories,
        carbs,
        protein,
        fat,
        fiber,
        unitOfMeasure,
        weightType,
        photoURL,
        GRFUser,
        brand
    });
    newIngredient.save()
        .then(()=>res.json(newIngredient))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router;