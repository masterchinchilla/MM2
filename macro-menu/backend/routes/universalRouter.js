const router = require('express').Router();

const auth = require('../middleware/auth');

const {ssValidate2}=require('../backendServices/ssValidation');

const {rcrdOrFldNameCaseValPrpTypNPropObjMod} =require( "../ssStaticRefs/rcrdOrFldNameCaseValPrpTypNPropObjMod");
const {rcrdKeysToExcldFrmUpdtOrAdd} =require( "../ssStaticRefs/rcrdKeysToExcldFrmUpdtOrAdd");
const {rcrdTypsWhichReqParentAuthorPrmssns} =require( "../ssStaticRefs/rcrdTypsWhichReqParentAuthorPrmssns");

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
function hndlDtrmnDBSrchPrmsFn(srchParam,srchParamVal,action){
    let dbSearchParamsObj=null;
    if(action===`getSimilar`){srchParamVal=new RegExp(srchParamVal,"i")};
    if(srchParam!=="all"){dbSearchParamsObj={[srchParam]:srchParamVal}};
    return dbSearchParamsObj;
}
function updateRcrdWNewVals(recordToUpdate,reqBody){
    const recordKeys = Object.keys(reqBody);
    for(let i=0;i<recordKeys.length;i++){
        let thisRecordKey=recordKeys[i];
        let MatchingKeyValsToExcldFrmUpdt=rcrdKeysToExcldFrmUpdtOrAdd.filter(keyToExcld=>keyToExcld===thisRecordKey);
        if(MatchingKeyValsToExcldFrmUpdt.length<1){
            let thisRecordKeysPropType=rcrdOrFldNameCaseValPrpTypNPropObjMod[thisRecordKey]["propTypeForVal"];
            if(thisRecordKeysPropType==="objRef"){
                recordToUpdate[thisRecordKey]=reqBody[thisRecordKey]["_id"];
            }else{
                recordToUpdate[thisRecordKey]=reqBody[thisRecordKey]
            }
        }
    }
    return recordToUpdate;
}
async function findAndPopulate(recordType,LocalObjModel,dbSearchParamsObj){
    let matchingRecords;
    switch(recordType){
        case"GRFUser":
            matchingRecords=await LocalObjModel.find(dbSearchParamsObj);
            break;
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
    return matchingRecords;
}
function dtrmnIfUsrCanEditThisRcrd(recordType,thisRecord,requestorUser,res){
    const requestorUserIsAdmin=requestorUser.isAdmin?true:false;
    let rcrdOrPrntRcrdAthrOk=true;
    if(!requestorUserIsAdmin){
        let rcrdOfPrntRcrdAthrId;
        const requestorUsersId=requestorUser._id;
        console.log(`univRouter Line 283: dtrmnIfUsrCanEditThisRcrd Fn received params: ${recordType} & ${requestorUsersId}`);
        const rcrdReqParentAuthorPrmssn=rcrdTypsWhichReqParentAuthorPrmssns.filter(rcrdTyp=>rcrdTyp===recordType);
        console.log(`univRouter Line 286: rcrdReqParentAuthorPrmssn is: `);
        console.log(rcrdReqParentAuthorPrmssn);
        let parentTypeOfRecord;
        if(rcrdReqParentAuthorPrmssn.length>0){
            const prntRcrdProps=dtrnmPrntRcrdProps(recordType,thisRecord);
            console.log(`univRouter Line 293: prntRcrdProps: `);
            console.log(prntRcrdProps);
            rcrdOfPrntRcrdAthrId=prntRcrdProps.prntRcrdAthrId;
            console.log(`univRouter Line 296: rcrdOfPrntRcrdAthrId: `);
            console.log(rcrdOfPrntRcrdAthrId);
            parentTypeOfRecord=prntRcrdProps.parentTypeOfRecord;
            console.log(`univRouter Line 299: parentTypeOfRecord: ${parentTypeOfRecord}`);
        }else{
            rcrdOfPrntRcrdAthrId=thisRecord.GRFUser._id;
            console.log(`univRouter Line 302: ${rcrdOfPrntRcrdAthrId}`)
        } 
        // if(!rcrdOfPrntRcrdAthrId.equals(requestorUsersId)){rcrdOrPrntRcrdAthrOk=false};
        if(rcrdOfPrntRcrdAthrId!=requestorUsersId){rcrdOrPrntRcrdAthrOk=false};
        console.log(`univRouter Line 305: ${rcrdOrPrntRcrdAthrOk}`);
        if(!rcrdOrPrntRcrdAthrOk){
            if(parentTypeOfRecord){
                res.status(401).json([{all:`You do not have access to edit ${recordType}s under this ${parentTypeOfRecord}`}]);
            }else{
                res.status(401).json([{all:`You do not have access to edit this ${recordType}`}]);
            } 
        }
    }
    return rcrdOrPrntRcrdAthrOk;
}    
router.delete(`/delete/:recordType/:id`,auth,async(req,res)=>{
    const {params,currentGRFUser}=req;
    const {recordType,id}=params;
    const recordId=id;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        const dbSearchParamsObj=hndlDtrmnDBSrchPrmsFn("_id",recordId,`delete`);
        const matchingRecords=await findAndPopulate(recordType,LocalObjModel,dbSearchParamsObj);
        const foundRecord=matchingRecords[0];
        const rcrdOrPrntRcrdAthrOk=dtrmnIfUsrCanEditThisRcrd(recordType,foundRecord,currentGRFUser,res)
        if(!rcrdOrPrntRcrdAthrOk){return}else{
            try {
                await LocalObjModel.findByIdAndDelete(recordId);
                res.status(200).json(`success`);
            } catch (errs) {
                res.status(500).json([{all:`Server error, refresh, wait a moment and try again`}]);
            }
        }
    } catch (errs) {
        res.status(500).json([{all:`${recordType} not found, it might have already been deleted`}])
    }
});
router.put(`/update/:recordType/:id`,auth,async(req,res)=>{
    const {params,body,currentGRFUser}=req;
    const {recordType,id}=params;
    const recordId=id;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        const ssValResult=await ssValidate2(recordType, body, req, res);
        if(ssValResult){
            try {
                const dbSearchParamsObj=hndlDtrmnDBSrchPrmsFn("_id",recordId,`update`);
                const matchingRecords=await findAndPopulate(recordType,LocalObjModel,dbSearchParamsObj);
                const foundRecord=matchingRecords[0];
                const rcrdOrPrntRcrdAthrOk= dtrmnIfUsrCanEditThisRcrd(recordType,foundRecord,currentGRFUser,res)
                if(!rcrdOrPrntRcrdAthrOk){return}else{
                    try {
                        await updateRcrdWNewVals(foundRecord,body).save();
                        res.status(200).json(`success`);
                    } catch (errs) {
                        res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                    }
                }
            } catch (errs) {
                res.status(500).json([{all:`${recordType} not found, it might have already been deleted`}])
            }
        }else{return};
    } catch (errs) {
        res.status(500).json([{all:`Validator call failed, refresh, wait a moment and try again`}])
    }
});
router.post('/add/:recordType',auth,async(req,res)=>{
    const {params,body,currentGRFUser}=req;
    const {recordType}=params;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        const ssValResult=await ssValidate2(recordType, body, req, res);
        if(ssValResult){
            try {
                const rcrdOrPrntRcrdAthrOk= dtrmnIfUsrCanEditThisRcrd(recordType,body,currentGRFUser,res)
                console.log(`univRouter line 378 - rcrdOrPrntRcrdAthrOk = ${rcrdOrPrntRcrdAthrOk}`);
                if(!rcrdOrPrntRcrdAthrOk){return}else{
                    const recordToUpdate=updateRcrdWNewVals({},body);
                    const newRecord=new LocalObjModel(recordToUpdate);
                    try {
                        await newRecord.save();
                        res.json(newRecord);
                    } catch (errs) {
                        res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                    }
                }
            } catch (errs) {
                res.status(500).json([{all:`${recordType} not found, it might have already been deleted`}])
            }
        }else{return};
    } catch (errs) {
        res.status(500).json([{all:`Validator call failed, refresh, wait a moment and try again`}])
    }
});
router.post('/copy/:recordType/:id',auth,async(req,res)=>{
    const Meal=rcrdOrFldNameCaseValPrpTypNPropObjMod["meal"]["PropObjModel"];
    const Day=rcrdOrFldNameCaseValPrpTypNPropObjMod["day"]["PropObjModel"];
    const WeekMealPlan=rcrdOrFldNameCaseValPrpTypNPropObjMod["weekMealPlan"]["PropObjModel"];
    const MealIngredient=rcrdOrFldNameCaseValPrpTypNPropObjMod["mealIngredient"]["PropObjModel"];
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
router.get('/getSimilar/:recordType?/:srchParam?/:srchParamVal?',async(req, res)=>{
    const {params}=req;
    const {recordType}=params;
    const srchParam=params.srchParam?params.srchParam:"all";
    const srchParamVal=params.srchParamVal?params.srchParamVal:null;
    const dbSearchParamsObj=params.srchParam?hndlDtrmnDBSrchPrmsFn(srchParam,srchParamVal,`getSimilar`):null;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        let matchingRecords=await findAndPopulate(recordType,LocalObjModel,dbSearchParamsObj);
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
router.get('/:recordType?/:srchParam?/:srchParamVal?',async(req, res)=>{
    const {params}=req;
    const {recordType}=params;
    const srchParam=params.srchParam?params.srchParam:"all";
    const srchParamVal=params.srchParamVal?params.srchParamVal:null;
    const dbSearchParamsObj=params.srchParam?hndlDtrmnDBSrchPrmsFn(srchParam,srchParamVal,`get`):null;
    const LocalObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[recordType]["PropObjModel"];
    try {
        let matchingRecords=await findAndPopulate(recordType,LocalObjModel,dbSearchParamsObj);
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});

module.exports=router;