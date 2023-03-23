const router = require('express').Router();

// const UnitOfMeasure=require('../models/unitOfMeasure.model');
// const WeekMealPlan = require('../models/weekMealPlan.model');
// const Day = require('../models/day.model');
// const Meal=require('../models/meal.model');
// const MealIngredient=require('../models/mealIngredient.model');

const auth = require('../middleware/auth');

const {rcrdOrFldNameCaseValPrpTypNPropObjMod} =require( "../ssStaticRefs/rcrdOrFldNameCaseValPrpTypNPropObjMod");

const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="unitOfMeasure";

// const ThisRecordObjModel=UnitOfMeasure;

const rcrdTypsWhichReqParentAuthorPrmssns=[
    "meal","mealIngredient","day","genRecipeIngredient"
]
function dtrnmPrntRcrdProps(childRecordType,childRecord){
// function dtrmnPrntRcrdAthrId(childRecordType,childRecord){
    let prntRcrdAthrId;
    let parentTypeOfRecord;
    switch(childRecordType){
        case"meal":
            prntRcrdAthrId=childRecord.day.weekMealPlan.GRFUser._id;
            parentTypeOfRecord="day";
            break;
        case"mealIngredient":
            prntRcrdAthrId=childRecord.meal.day.weekMealPlan.GRFUser._id;
            parentTypeOfRecord="meal";
            break;
        case"day":
            prntRcrdAthrId=childRecord.weekMealPlan.GRFUser._id;
            parentTypeOfRecord="weekMealPlan";
            break;
        default:
            prntRcrdAthrId=childRecord.genRecipe.GRFUser._id;
            parentTypeOfRecord="genRecipe";
    }
    // return prntRcrdAthrId;
    return {prntRcrdAthrId:prntRcrdAthrId,parentTypeOfRecord:parentTypeOfRecord};
}

router.get('/id:?/:recordType?',async(req, res)=>{
    const params=req.params;
    const recordType=params.recordType?params.recordType:typeOfRecordToChange;
    const recordId=params.id;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        let matchingRecords;
        switch(recordType){
            case"day":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
                    .populate("dayOfWeek")
                    .populate({
                        path:'weekMealPlan',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                break;
            case"meal":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
                    .populate({
                        path:'day',
                        populate:{
                            path:'weekMealPlan',
                            populate:'GRFUser'
                        }
                    })
                    .populate({
                        path: 'day',
                        populate: { path: 'dayOfWeek' }
                    })
                    .populate('mealType')
                    .populate({
                        path: 'genRecipe',
                        populate: { path: 'GRFUser' }
                    })
                    .populate({
                        path: 'genRecipe',
                        populate: { path: 'availableMealType' }
                    })
                break;
            case "genRecipe":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
                    .populate('GRFUser')
                    .populate('availableMealType')
                break;
            case"mealIngredient":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
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
                            populate:{
                                path:'weekMealPlan',
                                populate:'GRFUser'
                            }
                        }
                    })
                    .populate({
                        path: 'meal',
                        populate:{
                            path: 'genRecipe',
                            populate:{path:'GRFUser'}
                        }
                    })
                    .populate({
                        path: 'meal',
                        populate:{
                            path: 'genRecipe',
                            populate:{path:'availableMealType'}
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
                break;
            case"genRecipeIngredient":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
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
                break;
            case"ingredient":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
                    .populate('GRFUser')
                    .populate({
                        path:'unitOfMeasure',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                    .populate({
                        path:'weightType',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                    .populate({
                        path:'brand',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                break;
            case"pantryItem":
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
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
                break;
            default:
                matchingRecords=await LocalObjModel.find(recordId?{_id:recordId}:"")
                    .populate("GRFUser");
        }
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
// router.get('/:id/:recordType?',async(req, res)=>{
//     // const recordType=req.params.recordType;
//     const recordType=typeOfRecordToChange;
//     const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
//     try {
//         const matchingRecord=await LocalObjModel.findById(req.params.id).populate("GRFUser");
//         res.json(matchingRecord);
//     } catch (errs) {
//         res.status(500).json([{all:`Record lookup failed, refresh, wait a moment and try again`}])
//     }
// });
router.post('/add/:recordType?',auth,async(req,res)=>{
    const params=req.params;
    const recordType=params.recordType?params.recordType:typeOfRecordToChange;
    const receivedRecord=req.body;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    const authorId=req.currentGRFUser._id;
    const rcrdReqParentAuthorPrmssn=rcrdTypsWhichReqParentAuthorPrmssns.filter(rcrdTyp=>rcrdTyp===recordType);
    let parentRcrdAthrOk=true;
    let parentTypeOfRecord;
    if(rcrdReqParentAuthorPrmssn.length>0){
        const prntRcrdProps=dtrnmPrntRcrdProps(recordType,receivedRecord);
        const prntRcrdAthrId=prntRcrdProps.prntRcrdAthrId;
        parentTypeOfRecord=prntRcrdProps.parentTypeOfRecord;
        if(prntRcrdAthrId!==authorId){parentRcrdAthrOk=false};
    }
    if(parentRcrdAthrOk){
        try {
            const ssValResult=await ssValidate2(typeOfRecordToChange, receivedRecord, req, res);
            if(ssValResult){
                let recordToMake={};
                const recordKeys = Object.keys(receivedRecord);
                for(let i=0;i<recordKeys.length;i++){
                    let thisRecordKey=recordKeys[i];
                    let thisRecordKeysPropType=rcrdOrFldNameCaseValPrpTypNPropObjMod[thisRecordKey]["propTypeForVal"];
                    if(thisRecordKeysPropType==="objRef"){
                        recordToMake[thisRecordKey]=receivedRecord[thisRecordKey]["_id"];
                    }else{
                        recordToMake[thisRecordKey]=receivedRecord[thisRecordKey]
                    }
                }
                const newRecord=new LocalObjModel(recordToMake);
                try {
                    await newRecord.save();
                    res.json(newRecord);
                } catch (errs) {
                    res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                }
            }else{return}; 
        } catch (errs) {
            res.status(500).json([{all:`Validator call failed, refresh, wait a moment and try again`}])
        }
    }else{
        res.status(401).json([{all:`You do not have access to add ${typeOfRecordToChange} to this ${parentTypeOfRecord}`}]);
    }
});
module.exports=router;