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
let DayOfWeek=require('../models/dayOfWeek.model')
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate}=require('../backendServices/ssValidation');
router.route('/:id').get((req, res)=>{
    MealIngredient.findById(req.params.id)
        .populate({
            path: 'genRecipeIngredient',
            populate:{
                path: 'genRecipe',
                populate:{path:'availableMealType'}
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
        .populate({
            path: 'meal',
            populate:{
                path: 'day',
                populate:{path:'dayOfWeek'}
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
                populate:{path:'availableMealType'}
            }
        })
        .populate({
            path: 'genRecipeIngredient',
            populate:{
                path: 'genRecipe',
                populate:{path:'GRFUser'}
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
        .populate({
            path: 'meal',
            populate:{
                path: 'day',
                populate:{
                    path:'weekMealPlan',
                    populate:'GRFUser'
                }
            }
        })
        .populate({
            path: 'meal',
            populate:{
                path: 'mealType',
            }
        })
        .populate({
            path: 'meal',
            populate:{
                path: 'day',
                populate:{path:'dayOfWeek'}
            }
        })
            .then(mealIngredients=>res.json(mealIngredients))
            .catch(err=>res.status(400).json('Error: '+err));
    })
// router.route('/add').post((req,res)=>{
//     const qty=req.body.qty;
//     const genRecipeIngredient=req.body.genRecipeIngredient;
//     const meal=req.body.meal;
//     const newMealIngredient = new MealIngredient({
//         qty,
//         genRecipeIngredient,
//         meal
//     });
//     newMealIngredient.save()
//         .then(()=>res.json(newMealIngredient))
//         .catch(err=>res.status(400).json('Error: '+err));
// });
router.route('/:id').delete((req, res)=>{
    MealIngredient.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Meal Ingredient successfully deleted.'))
        .catch(err=>res.status(400).json('Error: '+err));
});
// router.route('/update/:id').put((req, res)=>{
//     MealIngredient.findById(req.params.id)
//         .then(mealIngredient=>{
//             mealIngredient.qty=req.body.qty;
//             mealIngredient.genRecipeIngredient=req.body.genRecipeIngredient._id;
//             mealIngredient.meal=req.body.meal._id;
//             mealIngredient.save()
//                 .then(()=>res.json(mealIngredient))
//                 .catch(err=>res.status(400).json('Error: '+err));
//         })
//         .catch(err=>res.status(400).json('Error: '+err));
// });
router.put('/update/:id/:justCreated?',auth,async(req,res)=>{
    const {
        qty,
        genRecipeIngredient,
        meal,
    }=req.body;
    const mealIngredientId=req.params.id
    const nameOfObjRefPropJustCreated=req.params.justCreated;
    const genRecipeIngredientId=genRecipeIngredient._id;
    const mealId=meal._id;
    const propsArray=[
        {thisPropsName:"qty",thisPropNameSentenceCase:"Qty",thisPropsValue:qty,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"genRecipeIngredient",thisPropNameSentenceCase:"Recipe Ingredient",thisPropsValue:genRecipeIngredient,thisPropTypeForVal:"objRef",PropObjModel:GenRecipeIngredient},
        {thisPropsName:"meal",thisPropNameSentenceCase:"Meal",thisPropsValue:meal,thisPropTypeForVal:"objRef",PropObjModel:Meal},
    ];
    const ssValResult=await ssValidate("Meal Ingredient", mealIngredientId, propsArray, nameOfObjRefPropJustCreated, req, res);
    if(ssValResult){
        MealIngredient.findById(mealIngredientId)
            .populate({
                path: 'meal',
                populate:{
                    path: 'day',
                    populate:{
                        path:'weekMealPlan',
                    }
                }
            })
            .then(mealIngredient=>{
                let authorId=mealIngredient.meal.day.weekMealPlan.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId)
                if(userCanEdit){
                    mealIngredient.qty=qty;
                    mealIngredient.genRecipeIngredient=genRecipeIngredientId;
                    mealIngredient.meal=mealId;
                    mealIngredient.save()
                        .then(()=>res.json({ok:true,msg:"success"}))
                        .catch((err)=>{
                            res.status(500).json({ok:false,errorMsg:"Server error - please try again in a moment"})
                        });
                }else{return}
            })
            .catch((err)=>{
                console.log(err);
                res.status(404).json({ok:false,errorMsg:"Meal Ingredient not found, it might have already been deleted"})
            });
    }else{return};
});
router.post('/add/:justCreated?',auth,async(req,res)=>{
    const {
        qty,
        genRecipeIngredient,
        meal,
    }=req.body;
    const nameOfObjRefPropJustCreated=req.params.justCreated;
    const genRecipeIngredientId=genRecipeIngredient._id;
    const mealId=meal._id;
    let authorId;
    const propsArray=[
        {thisPropsName:"qty",thisPropNameSentenceCase:"Qty",thisPropsValue:qty,thisPropTypeForVal:"float",PropObjModel:null},
        {thisPropsName:"genRecipeIngredient",thisPropNameSentenceCase:"Recipe Ingredient",thisPropsValue:genRecipeIngredient,thisPropTypeForVal:"objRef",PropObjModel:GenRecipeIngredient},
        {thisPropsName:"meal",thisPropNameSentenceCase:"Meal",thisPropsValue:meal,thisPropTypeForVal:"objRef",PropObjModel:Meal},
    ];
    const ssValResult=await ssValidate("Meal Ingredient", null, propsArray, nameOfObjRefPropJustCreated, req, res);
    if(ssValResult){
        Meal.findById(mealId)
            .populate('day')
            .populate({
                path:'day',
                populate:{path:'weekMealPlan'}
            })
            .populate({
                path:'day',
                populate:{
                    path:'weekMealPlan',
                    populate:'GRFUser'
                }
            })
            .then(meal=>{
                authorId=meal.day.weekMealPlan.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId);
                if(userCanEdit){
                    const newMealIngredient=new MealIngredient({
                        qty,
                        genRecipeIngredient:genRecipeIngredientId,
                        meal:mealId,
                    });
                    newMealIngredient.save()
                        .then(()=>res.json(newMealIngredient))
                        .catch(err=>res.status(400).json('Error: '+err));
                }else{return};
            })
            .catch((err)=>{
                res.status(404).json({ok:false,errorMsg:"Meal not found"})
            });   
    }else{return};
});
module.exports=router;