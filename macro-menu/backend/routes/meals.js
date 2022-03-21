const router = require('express').Router();
const { response } = require('express');
let Meal = require('../models/meal.model');
router.route('/').get((req, res)=>{
    Meal.find().populate('day').populate('genRecipe')
        .then(meals=>res.json(meals))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/mealsofthisday/:id').get((req, res)=>{
    Meal.find({day: req.params.id}).populate('day').populate('genRecipe')
        .then(meals => res.json(meals))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports=router;