const router = require('express').Router();

let GenRecipeIngredient=require('../models/genRecipeIngredient.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const parentTypeOfRecord="genRecipe";
const typeOfRecordToChange="genRecipeIngredient"

const ThisRecordObjModel=GenRecipeIngredient;

router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
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
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/thisGenRecipesGenRecipeIngredients/:id',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({[parentTypeOfRecord]:req.params.id})
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
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId)
                .populate({
                    path: 'genRecipe',
                    populate:{
                        path: 'GRFUser',
                    }
                })
            const authorId=foundRecord.genRecipe.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.defaultQty=record.defaultQty,
                foundRecord.ingredient=record.ingredient._id,
                foundRecord.genRecipe=record.genRecipe._id
                try {
                    await foundRecord.save();
                    res.json({ok:true,msg:"success"});
                } catch (errs) {
                    res.status(500).json({ok:false,valErrorsArray:[{all:`Record save to DB failed, refresh, wait a moment and try again`}]})
                }
            }else{return}
        } catch (errs) {
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange} not found, it might have already been deleted`}]})
        }
    }else{return};
});
router.post('/add',auth,async(req,res)=>{
    const {defaultQty,
        ingredient,
        genRecipe}=req.body;
    const parentRecordAuthorId=genRecipe.GRFUser._id;
    const authorId=req.currentGRFUser._id;
    if(parentRecordAuthorId===authorId){
        const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
        if(ssValResult){
            const newRecord=new ThisRecordObjModel({
                defaultQty:defaultQty,
                ingredient:ingredient._id,
                genRecipe:genRecipe._id,
            });
            try {
                await newRecord.save();
                res.json(newRecord);
            } catch (errs) {
                res.status(400).json('Error: '+errs)
            }
        }else{return}; 
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to add Ingredients to this Recipe"});
    }
});

module.exports=router;