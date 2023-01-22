const _ =require('lodash');
const router = require('express').Router();
const WeekMealPlan = require('../models/weekMealPlan.model');
const Day = require('../models/day.model');
const Meal=require('../models/meal.model');
const MealIngredient=require('../models/mealIngredient.model');
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');
const {logSSError}=require('../backendServices/ssLogger');
const typeOfRecordToChange="weekMealPlan";
router.route('/').get((req, res) => {
    WeekMealPlan.find().populate("GRFUser")
        .then(weekMealPlans => res.json(weekMealPlans))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/findbyname/:name').get((req, res)=>{
    WeekMealPlan.findOne({name:req.params.name})
        .then((wmp)=>{
            if(wmp){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
});
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
// router.route('/:id').get((req, res) => {
//     WeekMealPlan.findById(req.params.id).populate("GRFUser")
//         .then(weekMealPlan => res.json(weekMealPlan))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
router.route('/:id').get((req, res) => {
    WeekMealPlan.find({_id:req.params.id}).populate("GRFUser")
        .then(weekMealPlans => res.json(weekMealPlans))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').get((req, res) => {
    WeekMealPlan.findById(req.params.id).populate("GRFUser")
        .then(weekMealPlan => res.json(weekMealPlan))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    WeekMealPlan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Week Meal Plan deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').put((req, res) => {
//     WeekMealPlan.findById(req.params.id)
//         .then(weekMealPlan => {
//             weekMealPlan.name = req.body.name.trim();
//             weekMealPlan.GRFUser = req.body.GRFUser;
//             weekMealPlan.breakfastWeight=req.body.breakfastWeight;
//             weekMealPlan.snack1Weight=req.body.snack1Weight;
//             weekMealPlan.lunchWeight=req.body.lunchWeight;
//             weekMealPlan.snack2Weight=req.body.snack2Weight;
//             weekMealPlan.dinnerWeight=req.body.dinnerWeight;
//             weekMealPlan.dessertWeight=req.body.dessertWeight;
//             weekMealPlan.calsBudget=req.body.calsBudget;
//             weekMealPlan.carbsBudget=req.body.carbsBudget;
//             weekMealPlan.proteinBudget=req.body.proteinBudget;
//             weekMealPlan.fatBudget=req.body.fatBudget;
//             weekMealPlan.fiberBudget=req.body.fiberBudget;
//             weekMealPlan.save()
//                 .then(() => 
//                 res.json(weekMealPlan))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
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
    const {
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
        fiberBudget}=record;
    const recordId=req.params.id;
    // const recordId="12345";
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){WeekMealPlan.findById(recordId)
        .populate("GRFUser")
        .then(foundRecord=>{
            let authorId=foundRecord.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.name=name,
                foundRecord.GRFUser=GRFUser,
                foundRecord.breakfastWeight=breakfastWeight,
                foundRecord.snack1Weight=snack1Weight,
                foundRecord.lunchWeight=lunchWeight,
                foundRecord.snack2Weight=snack2Weight,
                foundRecord.dinnerWeight=dinnerWeight,
                foundRecord.dessertWeight=dessertWeight,
                foundRecord.calsBudget=calsBudget,
                foundRecord.carbsBudget=carbsBudget,
                foundRecord.proteinBudget=proteinBudget,
                foundRecord.fatBudget=fatBudget,
                foundRecord.fiberBudget=fiberBudget,
                foundRecord.save()
                    .then(()=>res.json({ok:true,msg:"success"}))
                    .catch((err)=>{
                        res.status(500).json({ok:false,valErrorsArray:[{all:"Server error - please try again in a moment"}]})
                    });
            }else{return}
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange}not found, it might have already been deleted`}]})
        });
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
    const newWMP=_.pick(origWMP,[
        "breakfastWeight",
        "snack1Weight",
        "lunchWeight",
        "snack2Weight",
        "dinnerWeight",
        "dessertWeight",
        "calsBudget",
        "carbsBudget",
        "proteinBudget",
        "fatBudget",
        "fiberBudget"
    ]);
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
            thisOrigDaysMeals=Meal.find({day:thisOrigWMPDayId}).populate("mealType");
        } catch (errs) {
            logSSError(errs);
            return;
        }
        for(let i=0;i<thisOrigDaysMeals.length;i++){
            let thisOrigMeal=thisOrigDaysMeals[i];
            // let thisOrigMealsType=thisOrigMeal.mealType;
            let thisOrigMealId=thisOrigMeal._id;
            let thisMealCopy=_.pick(thisOrigMeal,["genRecipe","mealType"]);
            thisMealCopy.day=savedDayCopyId;
            let savedCopyOfThisMeal;
            try {
                savedCopyOfThisMeal=await Meal.create(thisMealCopy);
            } catch (errs) {
                logSSError(errs);
                return;
            }
            let savedMealCopyId=savedCopyOfThisMeal._id;
            let origMealsIngrdnts;
            try {
                origMealsIngrdnts=await MealIngredient.find({meal:thisOrigMealId});
            } catch (errs) {
                logSSError(errs);
                return;
            };
            for(let i=0;i<origMealsIngrdnts.length;i++){
                let thisOrigMealIngrdnt=origMealsIngrdnts[i];
                // let thisOrigMealIngrdntId=thisOrigMealIngrdnt._id;
                let thisMealIngrdntCopy=_.pick(thisOrigMealIngrdnt,["qty","genRecipeIngredient"]);
                thisMealIngrdntCopy.meal=savedMealCopyId;
                let savedMealIngrdntCopy;
                try {
                    savedMealIngrdntCopy=await MealIngredient.create(thisMealIngrdntCopy);
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