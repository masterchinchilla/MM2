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

router.route('/').get((req, res)=>{
    Meal.find().populate('day')
        .populate({
            path: 'genRecipe',
            populate: { path: 'GRFUser' }
        }).populate('mealType')
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
        .then(meals => res.json(meals))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res)=>{
    const meal=new Meal(req.body);
    meal.save()
        .then((meal)=>res.json(meal))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/update/:id').put((req, res)=>{
    Meal.findById(req.params.id)
        .then(meal=>{
            meal.day = req.body.day;
            meal.genRecipe = req.body.genRecipe;
            meal.mealType = req.body.mealType;
            meal.save()
                .then(()=>res.json(meal))
                .catch(err=>res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/:id').delete((req, res)=>{
    Meal.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Meal successfully deleted.'))
        .catch(err=>res.status(400).json('Error :'+err));
});
module.exports=router;