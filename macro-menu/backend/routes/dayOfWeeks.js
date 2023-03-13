const router = require('express').Router();

const DayOfWeek = require('../models/dayOfWeek.model');

const ThisRecordObjModel=DayOfWeek;

router.get('/',(req, res)=>{
    try {
        const matchingRecords=ThisRecordObjModel.find().populate(`GRFUser`);
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
module.exports=router;