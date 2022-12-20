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
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate}=require('../backendServices/ssValidation');

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
                path: 'availableMealType',
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
router.route('/genRcpIngrdntsPerIngrdnt/:id').get((req, res)=>{
    GenRecipeIngredient.find({ingredient:req.params.id})
        .then(genRecipeIngredients=>res.json(genRecipeIngredients.length))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/thisGenRecipesGenRecipeIngredients/:id').get((req, res)=>{
    GenRecipeIngredient.find({genRecipe: req.params.id})
        .populate({
            path: 'genRecipe',
            populate:{
                path: 'GRFUser',
            }
        })
        .populate({
            path: 'genRecipe',
            populate:{
                path: 'availableMealType',
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
// router.route('/update/:id').put((req, res)=>{
router.put('/update/:id',auth,async(req,res)=>{
    const {
        defaultQty,
        ingredient,
        genRecipe
    }=req.body;
    const genRecipeIngredientId=req.params.id
    const ingredientId=ingredient._id
    const genRecipeId=genRecipe._id;
    
    let authorId;
    const propsArray=[
        {thisPropsName:"defaultQty",thisPropNameSentenceCase:"Default Qty",thisPropsValue:defaultQty,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"ingredient",thisPropNameSentenceCase:"Ingredient",thisPropsValue:ingredient,thisPropTypeForVal:"objRef",PropObjModel:Ingredient,justCreated:null},
        {thisPropsName:"genRecipe",thisPropNameSentenceCase:"Base Recipe",thisPropsValue:genRecipe,thisPropTypeForVal:"objRef",PropObjModel:GenRecipe,justCreated:null},
    ]
    const ssValResult=await ssValidate("Recipe Ingredient", genRecipeIngredientId, propsArray, null, req, res);
    
    if(ssValResult){
        GenRecipeIngredient.findById(genRecipeIngredientId)
            .populate({
                path: 'genRecipe',
                populate:{
                    path: 'GRFUser',
                }
            })
            .then(genRecipeIngredient=>{
                authorId=genRecipeIngredient.genRecipe.GRFUser._id;
                console.log(authorId);
                const userCanEdit=authEditThisRecord(req,res,authorId)
                if(userCanEdit){
                    genRecipeIngredient.defaultQty=defaultQty;genRecipeIngredient.ingredient=ingredientId;
                    genRecipeIngredient.genRecipe=genRecipeId;
                    genRecipeIngredient.save()
                        .then(()=>res.json({ok:true,msg:"success"}))
                        .catch((err)=>{
                            res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
                        });
                }else{return}
            })
            .catch((err)=>{
                console.log(err);
                res.status(404).json({ok:false,errorMsg:"Recipe Ingredient not found, it might have already been deleted"})
            });
    }else{return};
    // GenRecipeIngredient.findById(req.params.id)
    //     .then(genRecipeIngredient=>{
    //         genRecipeIngredient.defaultQty=req.body.defaultQty;
    //         genRecipeIngredient.ingredient=req.body.ingredient._id;
    //         genRecipeIngredient.genRecipe=req.body.genRecipe._id;
    //         genRecipeIngredient.defaultPrepInstructions="";
    //         genRecipeIngredient.save()
    //             .then(()=>res.json(genRecipeIngredient))
    //             .catch(err=>res.status(400).json('Error: '+err));
    //     })
    //     .catch(err=>res.status(400).json('Error: '+err));
})
// router.route('/add').post((req,res)=>{
router.post('/add',auth,async(req,res)=>{
// /:justCreated?
    const {
        defaultQty,
        ingredient,
        genRecipe
    }=req.body;
    // const nameOfObjRefPropJustCreated=req.params.justCreated;
    const genRecipeIngredientId=req.params.id
    const ingredientId=ingredient._id
    const genRecipeId=genRecipe._id;
    let authorId;
    const propsArray=[
        {thisPropsName:"defaultQty",thisPropNameSentenceCase:"Default Qty",thisPropsValue:defaultQty,thisPropTypeForVal:"float",PropObjModel:null,justCreated:null},
        {thisPropsName:"ingredient",thisPropNameSentenceCase:"Ingredient",thisPropsValue:ingredient,thisPropTypeForVal:"objRef",PropObjModel:Ingredient,justCreated:null},
    ];
    const ssValResult=await ssValidate("Recipe Ingredient", genRecipeIngredientId, propsArray, req, res);
    if(ssValResult){
        GenRecipe.findById(genRecipeId)
            .populate('GRFUser')
            .then(genRecipe=>{
                authorId=genRecipe.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId);
                if(userCanEdit){
                    const newGenRecipeIngredient=new GenRecipeIngredient({
                        defaultQty,
                        ingredient:ingredientId,
                        genRecipe:genRecipeId
                    });
                    newGenRecipeIngredient.save()
                        .then(()=>res.json(newGenRecipeIngredient))
                        .catch(err=>res.status(400).json('Error: '+err));
                }else{return};
            })
            .catch((err)=>{res.status(404).json({ok:false,errorMsg:"Base Recipe not found"})}); 
    }else{return};
    // const newGenRecipeIngredient=new GenRecipeIngredient({
    //     defaultQty,
    //     ingredient,
    //     genRecipe
    // });
    // newGenRecipeIngredient.save()
    //     .then(()=>res.json(newGenRecipeIngredient))
    //     .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/:id').delete((req, res)=>{
    GenRecipeIngredient.findByIdAndDelete(req.params.id)
        .then(()=>{res.json("GenRecipeIngredient successfully deleted")})
        .catch(err=>res.status(400).json('Error: '+err));
})
module.exports=router;