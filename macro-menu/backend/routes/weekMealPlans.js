const router = require('express').Router();
let WeekMealPlan = require('../models/weekMealPlan.model');
let Day = require('../models/day.model');

router.route('/').get((req, res) => {
    WeekMealPlan.find().populate("GRFUser")
        .then(weekMealPlans => res.json(weekMealPlans))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/findwmpbyname/:name').get((req, res)=>{
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
    const GRFUser = req.body.GRFUser;
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
router.route('/:id').get((req, res) => {
    WeekMealPlan.findById(req.params.id).populate("GRFUser")
        .then(weekMealPlan => res.json(weekMealPlan))
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

router.route('/update/:id').put((req, res) => {
    WeekMealPlan.findById(req.params.id)
        .then(weekMealPlan => {
            weekMealPlan.name = req.body.name;
            weekMealPlan.GRFUser = req.body.GRFUser;
            weekMealPlan.breakfastWeight=req.body.breakfastWeight;
            weekMealPlan.snack1Weight=req.body.snack1Weight;
            weekMealPlan.lunchWeight=req.body.lunchWeight;
            weekMealPlan.snack2Weight=req.body.snack2Weight;
            weekMealPlan.dinnerWeight=req.body.dinnerWeight;
            weekMealPlan.dessertWeight=req.body.dessertWeight;
            weekMealPlan.calsBudget=req.body.calsBudget;
            weekMealPlan.carbsBudget=req.body.carbsBudget;
            weekMealPlan.proteinBudget=req.body.proteinBudget;
            weekMealPlan.fatBudget=req.body.fatBudget;
            weekMealPlan.fiberBudget=req.body.fiberBudget;
            weekMealPlan.save()
                .then(() => res.json(weekMealPlan))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;