const router = require('express').Router();

const PantryItem=require('../models/pantryItem.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="pantryItem"

const ThisRecordObjModel=PantryItem;

router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
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
            .populate('GRFUser')
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json([{all:`Record lookup failed, refresh, wait a moment and try again`}])
    }
});
router.get('/thisUsersPantry/:id',async(req,res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({GRFUser:req.params.id})
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
            .populate('GRFUser')
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
})
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId)
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
                .populate('GRFUser')
            const authorId=foundRecord.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.qtyHave=record.qtyHave,
                foundRecord.ingredient=record.ingredient._id,
                foundRecord.GRFUser=record.GRFUser._id
                try {
                    await foundRecord.save();
                    res.json("success");
                } catch (errs) {
                    res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                }
            }else{return}
        } catch (errs) {
            res.status(404).json([{all:`${typeOfRecordToChange} not found, it might have already been deleted`}])
        }
    }else{return};
});
router.post('/add',auth,async(req,res)=>{
    const {qtyHave,
    ingredient,
    GRFUser}=req.body;
    const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
    if(ssValResult){
        const newRecord=new ThisRecordObjModel({
            qtyHave:qtyHave,
            ingredient:ingredient._id,
            GRFUser:GRFUser._id,
        });
        try {
            await newRecord.save();
            res.json(newRecord);
        } catch (errs) {
            res.status(400).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
        }
    }else{return};
});

module.exports=router;