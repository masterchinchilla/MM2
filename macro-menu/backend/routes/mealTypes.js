const router = require('express').Router();

const MealType = require('../models/mealType.model');

const ThisRecordObjModel=MealType;

router.get('/',(req, res)=>{
    try {
        const matchingRecords=ThisRecordObjModel.find().populate(`GRFUser`);
        res.json(matchingRecords);
    } catch (errs) {
        res.status(500).json([{all:`Records lookup failed, refresh, wait a moment and try again`}])
    }
});
module.exports=router;