const router = require('express').Router();
const { response } = require('express');
let DayOfWeek = require('../models/dayOfWeek.model');
router.route('/').get((req, res)=>{
    DayOfWeek.find()
        .then(dayOfWeeks=>res.json(dayOfWeeks))
        .catch(err=>res.status(400).json('Error: '+err));
});
module.exports=router;