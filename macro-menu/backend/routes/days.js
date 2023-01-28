const router = require('express').Router();

const Day = require('../models/day.model');
const Meal=require('../models/meal.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="day";
const parentTypeOfRecord="weekMealPlan";
const typesOfChildRecords="meal";

const ThisRecordObjModel=Day;
const ChildRecordObjModel=Meal;

router.get('/daysofthiswmp/:id',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find({[parentTypeOfRecord]: req.params.id})
        .populate("dayOfWeek")
        .populate({
            path:'weekMealPlan',
            populate:{
                path:'GRFUser',
            }
        })
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
            .populate("dayOfWeek")
            .populate({
                path:'weekMealPlan',
                populate:{
                    path:'GRFUser',
                }
            })
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.post('/add',auth,async(req,res)=>{
    const {name,dayOfWeek,weekMealPlan}=req.body;
    const parentRecordAuthorId=weekMealPlan.GRFUser._id;
    const authorId=req.currentGRFUser._id;
    if(parentRecordAuthorId===authorId){
        const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
        if(ssValResult){
            const newRecord=new ThisRecordObjModel({
                name:name,
                dayOfWeek:dayOfWeek._id,
                weekMealPlan:weekMealPlan._id,
            });
            try {
                await newRecord.save();
                res.json(newRecord);
            } catch (errs) {
                res.status(400).json('Error: '+errs)
            }
        }else{return}; 
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to add Days to this Week Meal Plan"});
    }
});
router.delete('/:id',auth,async(req,res)=>{
    const recordId=req.params.id;
    try {
        const connectedRecords=await ChildRecordObjModel.find({[typeOfRecordToChange]:recordId});
        if(connectedRecords.length>0){
            res.status(400).json({ok:false,valErrorsArray:[{all:`Cannot delete: Remove connected children (${typesOfChildRecords}) before attempting to delete ${typeOfRecordToChange}`}]});
        }else{
            try {
                const thisRecord=await ThisRecordObjModel.findById(recordId)
                    .populate({
                        path:'weekMealPlan',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                const authorId=thisRecord.weekMealPlan.GRFUser._id;
                const userCanEdit=authEditThisRecord(req,res,authorId);
                if(userCanEdit){
                    try {
                        await ThisRecordObjModel.findByIdAndDelete(recordId);
                        res.status(200).json({ok:true,message:`Record successfully deleted`});
                    } catch (errs) {
                        res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
                    }
                }
            } catch (errs) {
                res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
            }
        }
    } catch (errs) {
        console.log(errs);
        res.status(500).json({ok:false,valErrorsArray:[{all:`Server error, refresh, wait a moment and try again`}]});
    }
});

module.exports = router;