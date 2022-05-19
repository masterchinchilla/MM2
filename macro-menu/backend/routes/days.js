const router = require('express').Router();
const { response } = require('express');
let Day = require('../models/day.model');
let WeekMealPlan = require('../models/weekMealPlan.model');

router.route('/').get((req, res) => {
    Day.find().populate("weekMealPlan")
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
        .populate("weekMealPlan").populate({
            path:'weekMealPlan',
            populate:{
                path:'GRFUser',
            }
        })
        .then(days => res.json(days))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
    const dayOfWeek = req.body.dayOfWeek;
    const name = req.body.name;
    const weekMealPlan = req.body.weekMealPlan;
    const newDay = new Day({
        dayOfWeek,
        name,
        weekMealPlan
    });
    newDay.save()
        .then(() => res.json(newDay))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/:id').get((req, res) => {
    Day.findById(req.params.id).populate("weekMealPlan").populate({
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