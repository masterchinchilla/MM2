const router = require('express').Router();
const dayjs = require('dayjs');
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
router.route('/update/:id').post((req, res)=>{
    GenRecipe.findById(req.params.id)
        .then(genRecipe=>{
            genRecipe.name = req.body.name;
            genRecipe.availableMealType = req.body.availableMealType;
            genRecipe.GRFUser = req.body.GRFUser;
            genRecipe.defaultPrepInstructions = req.body.defaultPrepInstructions;
            genRecipe.photoURL = req.body.photoURL;
            genRecipe.save()
                .then(()=>res.json("General Recipe Updated!"))
                .catch(err=>res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
})
module.exports=router; 