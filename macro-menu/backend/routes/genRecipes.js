const router = require('express').Router();
let GenRecipe = require('../models/genRecipe.model');

router.route('/').get((req, res)=>{
    GenRecipe.find().populate('GRFUser')
        .then(recipes=>res.json(recipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/thisMealTypesGenRecipes/:mealType').get((req, res)=>{
    GenRecipe.find({availableMealType:req.params.mealType}).populate('GRFUser')
        .then(mealTypesRecipes=>res.json(mealTypesRecipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
module.exports=router; 