const router = require('express').Router();

const _ =require('lodash');

const WeekMealPlan = require('../models/weekMealPlan.model');
const Day = require('../models/day.model');
const Meal=require('../models/meal.model');
const MealIngredient=require('../models/mealIngredient.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');
const {logSSError}=require('../backendServices/ssLogger');

const typeOfRecordToChange="weekMealPlan";
const typesOfChildRecords="days";

const ThisRecordObjModel=WeekMealPlan;
const ChildRecordObjModel=Day;

// const record = {
    //   _id: "609f3e444ee536749c75c72a",
    //   name: "JD Hypertrophy Week Alpha F",
    //   GRFUser: {
    //     userGroups: "GRFUser",
    //     _id: "609f3e444ee536749c75c729",
    //     givenName: "John",
    //     familyName: "Doe",
    //     email: "johndoe@gmail.com",
    //     password:
    //       "$2b$10$qgJS0TaXFGkrgv6AbU5.WeA3HsHzuuhJgZd7WOuUdGHrOmhlO8iHG",
    //     handle: "uAdmin@GRF2022",
    //     __v: 0,
    //     updatedAt: "2022-08-26T03:19:48.481Z",
    //     verified: false,
    //     photoURL: "https://i.pravatar.cc/300",
    //     certName: "",
    //     certURL: "",
    //     middleName: "D",
    //     namePrefix: "",
    //     nameSuffix: "",
    //     isAdmin: true,
    //   },
    //   createdAt: "2021-05-15T03:21:40.285Z",
    //   updatedAt: "2023-01-14T04:16:08.251Z",
    //   __v: 0,
    //   breakfastWeight: 200,
    //   calsBudget: 2499,
    //   carbsBudget: -9,
    //   dessertWeight: 6,
    //   dinnerWeight: 11,
    //   fatBudget: 997.99,
    //   fiberBudget: 98.99,
    //   lunchWeight: 19,
    //   proteinBudget: 201,
    //   snack1Weight: 21,
    //   snack2Weight: 22,
    // };
router.get('/',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find().populate("GRFUser");
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
})
router.get('/findbyname/:name',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findOne({name:req.params.name});
        const searchByNameResult=matchingRecord?"exists":"ok";
        res.json(searchByNameResult);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
})
router.route('/wmpsofthisuser/:id').get((req, res) => {
    WeekMealPlan.find({GRFUser: req.params.id})
        .then(wmps => res.json(wmps))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const GRFUser = req.body.GRFUser._id;
    const breakfastWeight=req.body.breakfastWeight;
    const snack1Weight=req.body.snack1Weight;
    const lunchWeight=req.body.lunchWeight;
    const snack2Weight=req.body.snack2Weight;
    const dinnerWeight=req.body.dinnerWeight;
    const dessertWeight=req.body.dessertWeight;
    const calsBudget=req.body.calsBudget;
    const carbsBudget=req.body.carbsBudget;
    const proteinBudget=req.body.proteinBudget;
    const fatBudget=req.body.fatBudget;
    const fiberBudget=req.body.fiberBudget; 
    const newWeekMealPlan = new WeekMealPlan({
        name,
        GRFUser,
        breakfastWeight,
        snack1Weight,
        lunchWeight,
        snack2Weight,
        dinnerWeight,
        dessertWeight,
        calsBudget,
        carbsBudget,
        proteinBudget,
        fatBudget,
        fiberBudget,
    });
    newWeekMealPlan.save()
        .then(() => res.json(newWeekMealPlan))
        .catch(err => res.status(400).json('Error: ' + err));
})
//NOTE on get record get: frontend expects to recieve an array, but findById returns an object, so need to nest result in an array;
router.get('/:id',async(req,res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
            .populate("GRFUser")
        res.json([matchingRecord]);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
})
router.delete('/:id',auth,async(req,res)=>{
    const recordId=req.params.id;
    try {
        const connectedRecords=await ChildRecordObjModel.find({[typeOfRecordToChange]:recordId});
        if(connectedRecords.length>0){
            res.status(400).json({ok:false,valErrorsArray:[{all:`Cannot delete: Remove connected children (${typesOfChildRecords}) before attempting to delete ${typeOfRecordToChange}`}]});
        }else{
            try {
                const thisRecord=await ThisRecordObjModel.findById(recordId);
                const authorId=thisRecord.GRFUser;
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
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId).populate("GRFUser");
            const authorId=foundRecord.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.name=record.name;
                foundRecord.GRFUser=record.GRFUser._id;
                foundRecord.breakfastWeight=record.breakfastWeight;
                foundRecord.snack1Weight=record.snack1Weight;
                foundRecord.lunchWeight=record.lunchWeight;
                foundRecord.snack2Weight=record.snack2Weight;
                foundRecord.dinnerWeight=record.dinnerWeight;
                foundRecord.dessertWeight=record.dessertWeight;
                foundRecord.calsBudget=record.calsBudget;
                foundRecord.carbsBudget=record.carbsBudget;
                foundRecord.proteinBudget=record.proteinBudget;
                foundRecord.fatBudget=record.fatBudget;
                foundRecord.fiberBudget=record.fiberBudget;
                try {
                    await foundRecord.save();
                    res.json({ok:true,msg:"success"});
                } catch (errs) {
                    res.status(500).json({ok:false,valErrorsArray:[{all:`Record save to DB failed, refresh, wait a moment and try again`}]})
                }
            }else{return}
        } catch (errs) {
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange}not found, it might have already been deleted`}]})
        }
    }else{return};
})
router.post('/copy/:id',auth,async(req,res)=>{
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
    res.json({ok:true,wmpCopy:savedNewWMP})
})

module.exports = router;