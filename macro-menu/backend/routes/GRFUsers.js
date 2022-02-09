const router = require('express').Router();
let GRFUserModel = require('../models/GRFUser.model')

router.route('/').get((req, res) => {
    GRFUserModel.find()
        .then(GRFUsers => res.json(GRFUsers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const namePrefix = req.body.namePrefix;
    const givenName = req.body.givenName;
    const middleName = req.body.middleName;
    const familyName = req.body.familyName;
    const nameSuffix = req.body.nameSuffix;
    const email = req.body.email;
    const password = req.body.password;
    const handle = req.body.handle;
    const certURL = req.body.certURL;
    const certName = req.body.certName;
    const verified = req.body.verified;

    const newGRFUserModel = new GRFUserModel({
        namePrefix,
        givenName,
        middleName,
        familyName,
        nameSuffix,
        email,
        password,
        handle,
        certURL,
        certName,
        verified
    });

    newGRFUserModel.save()
        .then(() => res.json('GRF User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;