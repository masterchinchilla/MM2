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
    Brand.find().populate('GRFUser')
        .then(brands=>res.json(brands))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req, res)=>{
    const name=req.body.name;
    const GRFUser=req.body.GRFUser;
    const newBrand=new Brand({
        name,
        GRFUser
    });
    newBrand.save()
        .then(()=>res.json(newBrand))
        .catch(err=>res.status(400).json('Error: '+err));
})
module.exports=router;