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
    GenRecipeIngredient.find()
        .populate({
            path: 'genRecipe',
            populate:{
                path: 'GRFUser',
            }
        })
        .populate({
            path: 'genRecipe',
            populate:{
                path: 'mealType',
            }
        })
        .populate({
            path: 'ingredient',
            populate:{
                path: 'GRFUser',
            }
        })
        .populate({
            path: 'ingredient',
            populate:{
                path: 'unitOfMeasure',
                populate:{path: 'GRFUser'}
            }
        })
        .populate({
            path:'ingredient',
            populate:{
                path:'weightType',
                populate:{path:'GRFUser'}
            }
        })
        .populate({
            path:'ingredient',
            populate:{
                path:'brand',
                populate:{path:'GRFUser'}
            }
        })
        .then(genRecipeIngredients=>res.json(genRecipeIngredients))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/thisGenRecipesGenRecipeIngredients/:id').get((req, res)=>{
    GenRecipeIngredient.find({genRecipe: req.params.id})
        .populate({
            path: 'genRecipe',
            populate:{
                path: 'GRFUser',
            }
        })
        .populate({
            path: 'ingredient',
            populate:{
                path: 'GRFUser',
            }
        })
        .populate({
            path: 'ingredient',
            populate:{
                path: 'unitOfMeasure',
                populate:{path: 'GRFUser'}
            }
        })
        .populate({
            path:'ingredient',
            populate:{
                path:'weightType',
                populate:{path:'GRFUser'}
            }
        })
        .populate({
            path:'ingredient',
            populate:{
                path:'brand',
                populate:{path:'GRFUser'}
            }
        })
        .then(genRecipeIngredients=>res.json(genRecipeIngredients))
        .catch(err=>res.status(400).json('Error: '+err));
})
module.exports=router;