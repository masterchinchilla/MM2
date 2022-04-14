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
router.route('/:id').get((req, res)=>{
    MealIngredient.findById(req.params.id)
        .populate({
            path: 'genRecipeIngredient',
            populate:{
                path: 'genRecipe',
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
                populate:{path:'weekMealPlan'}
            }
        })
            .then(mealIngredient=>res.json(mealIngredient))
            .catch(err=>res.status(400).json('Error: '+err));
    });
router.route('/thisMealsMealIngredients/:id').get((req, res)=>{
    MealIngredient.find({meal:req.params.id})
        .populate({
            path: 'genRecipeIngredient',
            populate:{
                path: 'genRecipe',
                // path: 'ingredient',
                // populate:{path: 'unitOfMeasure, weightType, brand, GRFUser'}
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
                populate:{path:'weekMealPlan'}
            }
        })
            .then(mealIngredients=>res.json(mealIngredients))
            .catch(err=>res.status(400).json('Error: '+err));
    })
router.route('/add').post((req,res)=>{
    const qty=req.body.qty;
    const genRecipeIngredient=req.body.genRecipeIngredient;
    const meal=req.body.meal;
    const newMealIngredient = new MealIngredient({
        qty,
        genRecipeIngredient,
        meal
    });
    newMealIngredient.save()
        .then(()=>res.json(newMealIngredient))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/:id').delete((req, res)=>{
    MealIngredient.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Meal Ingredient successfully deleted.'))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router;