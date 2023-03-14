const router = require('express').Router();

const UnitOfMeasure=require('../models/unitOfMeasure.model');

const auth = require('../middleware/auth');

const {rcrdOrFldNameCaseValPrpTypNPropObjMod} =require( "../ssStaticRefs/rcrdOrFldNameCaseValPrpTypNPropObjMod");

const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="unitOfMeasure";

const ThisRecordObjModel=UnitOfMeasure;

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

router.get('/',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find().populate("GRFUser");
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
router.get('/:id/:recordType?',async(req, res)=>{
    // const recordType=req.params.recordType;
    const recordType=typeOfRecordToChange;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        const matchingRecord=await LocalObjModel.findById(req.params.id).populate("GRFUser");
        res.json(matchingRecord);
    } catch (errs) {
        res.status(500).json([{all:`Record lookup failed, refresh, wait a moment and try again`}])
    }
});
router.post('/add/:recordType?',auth,async(req,res)=>{
    // const recordType=req.params.recordType;
    const receivedRecord=req.body;
    const recordType=typeOfRecordToChange;
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