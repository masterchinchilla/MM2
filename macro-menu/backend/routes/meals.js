const router = require('express').Router();
const { response } = require('express');
let Meal = require('../models/meal.model');
router.route('/').get((req, res)=>{
    Meal.find().populate('day')
        .populate({
            path: 'genRecipe',
            populate: { path: 'GRFUser' }
        })
        .then(meals=>res.json(meals))
        .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/mealsofthisday/:id').get((req, res)=>{
    Meal.find({day: req.params.id}).populate('day')
        .populate({
            path: 'genRecipe',
            populate: { path: 'GRFUser' }
        })
        .then(meals => res.json(meals))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res)=>{
    const meal=new Meal(req.body);
    meal.save()
        .then(()=>res.json(meal))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router;