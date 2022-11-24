const router = require('express').Router();
const { response } = require('express');
let Day = require('../models/day.model');
let WeekMealPlan = require('../models/weekMealPlan.model');
let DayOfWeek=require('../models/dayOfWeek.model');
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate}=require('../backendServices/ssValidation');
router.route('/').get((req, res) => {
    Day.find()
        .populate("dayOfWeek")
        .populate("weekMealPlan")
        .populate({
            path:'weekMealPlan',
            populate:{
                path:'GRFUser',
            }
        })
        .then(days => res.json(days))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/daysofthiswmp/:id').get((req, res) => {
    Day.find({weekMealPlan: req.params.id})
        .populate("dayOfWeek")
        .populate("weekMealPlan")
        .populate({
            path:'weekMealPlan',
            populate:{
                path:'GRFUser',
            }
        })
        .then(days => res.json(days))
        .catch(err => res.status(400).json('Error: ' + err));
});
// router.route('/add').post((req, res) => {
//     const dayOfWeek = req.body.dayOfWeek;
//     const name = req.body.name;
//     const weekMealPlan = req.body.weekMealPlan;
//     const newDay = new Day({
//         dayOfWeek,
//         name,
//         weekMealPlan
//     });
//     newDay.save()
//         .then(() => res.json(newDay))
//         .catch(err => res.status(400).json('Error: ' + err));
// })
router.post('/add/:objRefPropsJustCreatedArray?',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    if(requestorUser){
        const {
            name,
      dayOfWeek,
      weekMealPlan,
        }=req.body;
        
        DayOfWeek.findOne({name:dayOfWeek.name})
        .then(async(dayOfWeek)  => {
            const dayOfWeekId=dayOfWeek._id;
            const wmpId=weekMealPlan._id;
            const objRefPropsJustCreatedArray=req.params.objRefPropsJustCreatedArray?objRefPropsJustCreatedArray:[];
            const wmpJustCreated=objRefPropsJustCreatedArray.filter(objRefProp=>objRefProp==="weekMealPlan");
            const propsArray=[
            {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:Day,justCreated:null},
            {thisPropsName:"weekMealPlan",thisPropNameSentenceCase:"Week Meal Plan",thisPropsValue:weekMealPlan,thisPropTypeForVal:"objRef",PropObjModel:WeekMealPlan,justCreated:wmpJustCreated?true:false},
        ];
        const ssValResult=await ssValidate("Day", null, propsArray, req, res);
        if(ssValResult){
            const newDay=new Day({
                name,
                dayOfWeek:dayOfWeekId,
                weekMealPlan:wmpId
            });
            newDay.save()
                .then(()=>res.json(newDay))
                .catch(err=>res.status(400).json('Error: '+err));
        }else{return};
        })
        .catch(err=>res.status(404).json({ok:false,errorMsg:"Day of Week not found"}))
        
    }else{
        res.status(401).json({ok:false,errorMsg:"You must be logged-in to create new records"});
        return};
    
});
router.route('/:id').get((req, res) => {
    Day.findById(req.params.id).populate("weekMealPlan").populate("dayOfWeek").populate({
            path:'weekMealPlan',
            populate:{
                path:'GRFUser',
            }
        })
        .then(day => res.json(day))
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').get((req, res) => {
//     Day.findById(req.params.id).populate("GRFUser")
//         .then(day => res.json(day))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').delete((req, res) => {
    console.log(req.params);
    Day.findByIdAndDelete(req.params.id)
        .then(() => res.json('Day deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Day.findById(req.params.id)
        .then(day => {
            day.weekMealPlan = req.body.weekMealPlan;
            day.dayOfWeek = req.body.dayOfWeek;

            day.save()
                .then(() => res.json('Day updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;