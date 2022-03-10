const router = require('express').Router();
let WeekMealPlan = require('../models/weekMealPlan.model');
let Day = require('../models/day.model');

router.route('/').get((req, res) => {
    WeekMealPlan.find().populate("GRFUser")
        .then(weekMealPlans => res.json(weekMealPlans))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const GRFUser = req.body.GRFUser;

    const newWeekMealPlan = new WeekMealPlan({
        name,
        GRFUser
    });

    newWeekMealPlan.save()
        .then(() => res.json('Week Meal Plan added!'))
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
    console.log(req.params);
    WeekMealPlan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Week Meal Plan deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    WeekMealPlan.findById(req.params.id)
        .then(weekMealPlan => {
            weekMealPlan.name = req.body.name;
            weekMealPlan.GRFUser = req.body.GRFUser;

            weekMealPlan.save()
                .then(() => res.json('Week Meal Plan updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;