const router = require('express').Router();
let WeekMealPlan = require('../models/weekMealPlan.model')

router.route('/').get((req, res) => {
    WeekMealPlan.find()
        .then(weekMealPlans => res.json(weekMealPlans))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const GRFUser = req.body.GRFUser;

    const newweekMealPlan = new WeekMealPlan({
        name,
        GRFUser
    });

    newweekMealPlan.save()
        .then(() => res.json('Week Meal Plan added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/:id').get((req, res) => {
    WeekMealPlan.findById(req.params.id)
        .then(weekMealPlan => res.json(weekMealPlan))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
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