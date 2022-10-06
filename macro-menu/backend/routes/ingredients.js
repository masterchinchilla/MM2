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
const Joi=require('joi');
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
    const rule = this.valSchema.extract(propTypeForVal);
    console.log(rule);
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
})
router.route('/findbyname/:name').get((req, res)=>{
    Ingredient.findOne({name:req.params.name})
        .then((ingredient)=>{
            if(ingredient){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
})
router.route('/update/:id').put((req, res)=>{
    const {name,calories,carbs,protein,fat,fiber,unitOfMeasure,weightType,photoURL,GRFUser,brand}=req.body;
    const valErrors={form:null,name:null,calories:null,carbs:null,protein:null,fat:null,fiber:null,unitOfMeasure:null,weightType:null,photoURL:null,GRFUser:null,brand:null};
    const thisIngredient={};
    Ingredient.findById(req.params.id).then((foundIngredient)=>{
        thisIngredient=foundIngredient;
        Ingredient.find({name:new RegExp(name,"i")})
        .then((ingredient)=>{
            if(ingredient){
                valErrors[name]="'Name' must be unique";
                res.json(valErrors)}else{
                valErrors.calories=validateProp("calories",calories,"float");
                valErrors.carbs=validateProp("carbs",carbs,"float");
                valErrors.protein=validateProp("protein",protein,"float");
                valErrors.fat=validateProp("fat",fat,"float");
                valErrors.fiber=validateProp("fiber",fiber,"float");
                valErrors.photoURL=validateProp("photoURL",photoURL,"url");
                if(valErrors.calories||valErrors.carbs||valErrors.protein||valErrors.fat||valErrors.fiber||valErrors.photoURL){
                    res.json(valErrors);
                }else{
                    UnitOfMeasure.findById(unitOfMeasure._id)
                        .catch(valErrors.unitOfMeasure="Selected Unit of Measure not found");
                    WeightType.findById(weightType._id)
                        .catch(valErrors.weightType="Selected Weight Type not found");
                    Brand.findById(brand._id)
                        .catch(valErrors.brand="Selected Brand not found");
                    GRFUserModel.findById(GRFUser._id)
                        .catch(valErrors.GRFUser="Selected GRFUser not found");
                    if(valErrors.unitOfMeasure||valErrors.weightType||valErrors.brand||valErrors.GRFUser){
                        res.json(valErrors)
                    }else{
                        thisIngredient.name=name;
            thisIngredient.calories=calories;
            thisIngredient.carbs=carbs;
            thisIngredient.protein=protein;
            thisIngredient.fat=fat;
            thisIngredient.fiber=fiber;
            thisIngredient.unitOfMeasure?thisIngredient.unitOfMeasure=unitOfMeasure._id:"";
            thisIngredient.weightType?thisIngredient.weightType=weightType._id:"";
            thisIngredient.photoURL=photoURL;
            thisIngredient.GRFUser=GRFUser._id;
            thisIngredient.brand=brand._id;
            thisIngredient.save()
                .then(()=>res.json(thisIngredient))
                .catch(err=>res.status(400).json('Error: '+err));
                    }
                }
            }
        })
        .catch(err=>res.status(404).json('Error:'+err));
    }).catch(res.status(404).json(valErrors.form="Ingredient not found"))
    
    // Ingredient.findById(req.params.id)
    //     .then(ingredient=>{
    //         ingredient.name=req.body.name;
    //         ingredient.calories=req.body.calories;
    //         ingredient.carbs=req.body.carbs;
    //         ingredient.protein=req.body.protein;
    //         ingredient.fat=req.body.fat;
    //         ingredient.fiber=req.body.fiber;
    //         ingredient.unitOfMeasure?ingredient.unitOfMeasure=req.body.unitOfMeasure._id:"";
    //         ingredient.weightType?ingredient.weightType=req.body.weightType._id:"";
    //         ingredient.photoURL=req.body.photoURL;
    //         ingredient.GRFUser=req.body.GRFUser._id;
    //         ingredient.brand=req.body.brand._id;
    //         ingredient.save()
    //             .then(()=>res.json(ingredient))
    //             .catch(err=>res.status(400).json('Error: '+err));
    //     })
        .catch(err=>res.status(400).json('Error: '+err));
})
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