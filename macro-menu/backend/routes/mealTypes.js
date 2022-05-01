const router = require('express').Router();
const { response } = require('express');
let MealType = require('../models/mealType.model');
router.route('/').get((req, res)=>{
    MealType.find()
        .then(mealTypes=>res.json(mealTypes))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router;