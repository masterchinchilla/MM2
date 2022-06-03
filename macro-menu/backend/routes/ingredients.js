const router = require('express').Router();
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
router.route('/update/:id').put((req, res)=>{
    Ingredient.findById(req.params.id)
        .then(ingredient=>{
            ingredient.name=req.body.name;
            ingredient.calories=req.body.calories;
            ingredient.carbs=req.body.carbs;
            ingredient.protein=req.body.protein;
            ingredient.fat=req.body.fat;
            ingredient.fiber=req.body.fiber;
            ingredient.unitOfMeasure?ingredient.unitOfMeasure=req.body.unitOfMeasure._id:"";
            ingredient.weightType?ingredient.weightType=req.body.weightType._id:"";
            ingredient.photoURL=req.body.photoURL;
            ingredient.GRFUser=req.body.GRFUser._id;
            ingredient.brand?ingredient.brand=req.body.brand._id:"";
            ingredient.save()
                .then(()=>res.json(ingredient))
                .catch(err=>res.status(400).json('Error: '+err));
        })
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