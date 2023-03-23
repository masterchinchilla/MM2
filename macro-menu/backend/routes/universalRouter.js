const router = require('express').Router();

const UnitOfMeasure=require('../models/unitOfMeasure.model');
const WeightType=require('../models/weightType.model');
const Brand=require('../models/brand.model');
const GRFUserModel=require('../models/GRFUser.model');
const GenRecipeIngredient=require('../models/genRecipeIngredient.model');
const GenRecipe=require('../models/genRecipe.model');
const Ingredient=require('../models/ingredient.model');
const Meal=require('../models/meal.model');
const Day=require('../models/day.model');
const WeekMealPlan=require('../models/weekMealPlan.model');
const MealIngredient=require('../models/mealIngredient.model');
const DayOfWeek=require('../models/dayOfWeek.model');
const MealType=require('../models/mealType.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const {rcrdOrFldNameCaseValPrpTypNPropObjMod} =require( "../ssStaticRefs/rcrdOrFldNameCaseValPrpTypNPropObjMod");

const typeOfRecordToChange="unitOfMeasure";

const rcrdTypsWhichReqParentAuthorPrmssns=[
    "meal","mealIngredient","day","genRecipeIngredient"
]

function dtrnmPrntRcrdProps(childRecordType,childRecord){
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
    return {prntRcrdAthrId:prntRcrdAthrId,parentTypeOfRecord:parentTypeOfRecord};
}
function hndlDtrmnDBSrchPrmsFn(srchParam,srchParamVal){
    let dbSearchParamsObj="";
    if(srchParam==="name"){srchParamVal=new RegExp(srchParamVal,"i")};
    if(srchParam!=="all"){dbSearchParamsObj={[srchParam]:srchParamVal}};
    return dbSearchParamsObj;
}
router.delete(`delete/:recordType/:id`,auth,async(req,res)=>{
    console.log("deleted");
});
router.put(`update/:recordType/:id`,auth,async(req,res)=>{
    console.log("updated");
});
router.post('add/:recordType',auth,async(req,res)=>{
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
router.post('copy/:recordType/:id',auth,async(req,res)=>{
    const origWMPId=req.params.id;
    const thisGRFUser=req.currentGRFUser;
    let origWMP;
    try {
        origWMP=await WeekMealPlan.findById(origWMPId);
    } catch (errs) {
        logSSError(errs);
        return;
    }
    const newWMP=_.omit(origWMP,["_id","__v","createdAt","updatedAt","GRFUser","name"]);
    newWMP.GRFUser=thisGRFUser;
    let newWMPsName=`${thisGRFUser.handle}'s Copy of ${origWMP.name}`;
    let sameNameWMPs;
    try {
        sameNameWMPs=await WeekMealPlan.find({name:new RegExp(newWMPsName,"i")});
    } catch (errs) {
        logSSError(errs);
        return;
    }
    if(sameNameWMPs.length>0){
        let nameUnique=false;
        let nameDupsCount=1;
        while(!nameUnique){
            let newWMPNameOption=`${newWMPsName} ${nameDupsCount++}`;
            let matchingNameWMPs;
            try {
                matchingNameWMPs=await WeekMealPlan.find({name:new RegExp(newWMPNameOption,"i")});
                if(matchingNameWMPs.length<1){
                    newWMPsName=newWMPNameOption;
                    nameUnique=true;
                }    
            } catch (errs) {
                logSSError(errs);
                return;
            } 
        }
    }
    newWMP.name=newWMPsName;
    let savedNewWMP;
    try {
        savedNewWMP=await WeekMealPlan.create(newWMP);
    } catch (errs) {
        logSSError(errs);
        return;
    }
    let savedNewWMPId=savedNewWMP._id;
    let origWMPsDays;
    try {
        origWMPsDays=await Day.find({weekMealPlan:origWMPId}).populate("dayOfWeek");
        console.log(origWMPsDays);
    } catch (errs) {
        logSSError(errs);
        return;
    }
    for(let i=0;i<origWMPsDays.length;i++){
        let thisOrigWMPDay=origWMPsDays[i];
        let thisOrigWMPDayOfWeek=thisOrigWMPDay.dayOfWeek;
        let copyOfThisDay={
            dayOfWeek:thisOrigWMPDayOfWeek._id,
            weekMealPlan:savedNewWMPId,
            name:`${newWMPsName} - ${thisOrigWMPDayOfWeek.name}`
        };
        let savedCopyOfThisDay;
        try {
            savedCopyOfThisDay=await Day.create(copyOfThisDay);
        } catch (errs) {
            logSSError(errs);
            return;
        }
        let savedDayCopyId=savedCopyOfThisDay._id;
        let thisOrigWMPDayId=thisOrigWMPDay._id;
        let thisOrigDaysMeals;
        try {
            thisOrigDaysMeals=await Meal.find({day:thisOrigWMPDayId}).populate("mealType");
            console.log(thisOrigDaysMeals);
        } catch (errs) {
            logSSError(errs);
            return;
        }
        for(let i=0;i<thisOrigDaysMeals.length;i++){
            let thisOrigMeal=thisOrigDaysMeals[i];
            console.log(thisOrigMeal);
            let thisOrigMealId=thisOrigMeal._id;
            console.log(thisOrigMealId);
            let thisMealCopy=_.pick(thisOrigMeal,["genRecipe","mealType"]);
            thisMealCopy.day=savedDayCopyId;
            console.log(thisMealCopy);
            let savedCopyOfThisMeal;
            try {
                savedCopyOfThisMeal=await Meal.create(thisMealCopy);
                console.log(savedCopyOfThisMeal);
            } catch (errs) {
                logSSError(errs);
                return;
            }
            let savedMealCopyId=savedCopyOfThisMeal._id;
            console.log(savedMealCopyId);
            let origMealsIngrdnts;
            try {
                origMealsIngrdnts=await MealIngredient.find({meal:thisOrigMealId});
                console.log(origMealsIngrdnts);
            } catch (errs) {
                logSSError(errs);
                return;
            };
            for(let i=0;i<origMealsIngrdnts.length;i++){
                let thisOrigMealIngrdnt=origMealsIngrdnts[i];
                console.log(thisOrigMealIngrdnt);
                let thisMealIngrdntCopy=_.pick(thisOrigMealIngrdnt,["qty","genRecipeIngredient"]);
                thisMealIngrdntCopy.meal=savedMealCopyId;
                console.log(thisMealIngrdntCopy);
                let savedMealIngrdntCopy;
                try {
                    savedMealIngrdntCopy=await MealIngredient.create(thisMealIngrdntCopy);
                    console.log(savedMealIngrdntCopy);
                } catch (errs) {
                    logSSError(errs);
                    return;
                }
            }
        }
    }
    res.json(savedNewWMP)
})
router.get('/:recordType?/:srchParam?/:srchParamVal?',async(req, res)=>{
    const params=req.params;
    const recordType=params.recordType?params.recordType:typeOfRecordToChange;
    const srchParam=params.srchParam?params.srchParam:"all";
    const srchParamVal=params.srchParamVal?params.srchParamVal:null;
    const dbSearchParamsObj=hndlDtrmnDBSrchPrmsFn(srchParam,srchParamVal);
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        let matchingRecords;
        switch(recordType){
            case"day":
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
                    .populate("dayOfWeek")
                    .populate({
                        path:'weekMealPlan',
                        populate:{
                            path:'GRFUser',
                        }
                    })
                break;
            case"meal":
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
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
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
                    .populate('GRFUser')
                    .populate('availableMealType')
                break;
            case"mealIngredient":
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
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
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
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
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
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
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
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
                matchingRecords=await LocalObjModel.find(dbSearchParamsObj)
                    .populate("GRFUser");
        }
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
module.exports=router;