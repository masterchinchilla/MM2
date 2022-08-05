const router = require('express').Router();
const dayjs = require('dayjs');
let GenRecipe = require('../models/genRecipe.model');
let MealType=require('../models/mealType.model');

router.route('/').get((req, res)=>{
    GenRecipe.find().populate('GRFUser').populate('availableMealType')
        .then(recipes=>res.json(recipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/:id').get((req, res)=>{
    GenRecipe.findById(req.params.id).populate('GRFUser').populate('availableMealType')
        .then(recipe=>res.json(recipe))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/findbyname/:name').get((req, res)=>{
    GenRecipe.findOne({name:req.params.name})
        .then((recipe)=>{
            if(recipe){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
})
router.route('/thisMealTypesGenRecipes/:mealType').get((req, res)=>{
    GenRecipe.find({availableMealType:req.params.mealType._id}).populate('GRFUser').populate('availableMealType')
        .then(mealTypesRecipes=>res.json(mealTypesRecipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/genRecipesByMealTypeAndName/:name').get((req, res)=>{
    // '/genRecipesByMealTypeAndName/:mealTypeId:name'
    GenRecipe.find({
        name:new RegExp(req.params.name,"i")
    }).populate('GRFUser').populate('availableMealType')
        .then(recipe=>res.json(recipe))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/update/:id').put((req, res)=>{
    GenRecipe.findById(req.params.id)
        .then(genRecipe=>{
            genRecipe.name = req.body.name;
            genRecipe.availableMealType = req.body.availableMealType._id;
            genRecipe.GRFUser = req.body.GRFUser._id;
            genRecipe.defaultPrepInstructions = req.body.defaultPrepInstructions;
            genRecipe.photoURL = req.body.photoURL;
            genRecipe.save()
                .then(()=>res.json(genRecipe))
                .catch(err=>res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/add').post((req, res)=>{
    const name=req.body.name;
    const availableMealType=req.body.availableMealType;
    const GRFUser=req.body.GRFUser;
    const defaultPrepInstructions=req.body.defaultPrepInstructions;
    const photoURL=req.body.photoURL;
    const newGenRecipe=new GenRecipe({
        name,
        availableMealType,
        GRFUser,
        defaultPrepInstructions,
        photoURL
    });
    newGenRecipe.save()
        .then(()=>res.json(newGenRecipe))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router; 