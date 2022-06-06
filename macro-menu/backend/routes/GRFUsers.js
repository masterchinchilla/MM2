const router = require('express').Router();
const _ =require('lodash');
const bcrypt=require('bcrypt');
let GRFUserModel = require('../models/GRFUser.model')

router.route('/').get((req, res) => {
    GRFUserModel.find()
        .then(GRFUsers => res.json(GRFUsers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
    const email = req.body.email;
    let existingUser=await GRFUserModel.findOne({email:email});
    if(existingUser){
        return res.status(400).send('User already registered.');
    }else{
        
        const newGRFUser = new GRFUserModel(_.pick(req.body,[
            'namePrefix',
            'givenName',
            'middleName',
            'familyName',
            'nameSuffix',
            'email',
            'password',
            'handle',
            'certURL',
            'certName',
            'verified'
        ]));
        const salt = await bcrypt.genSalt(10);
        newGRFUser.password=await bcrypt.hash(newGRFUser.password,salt)
        // const namePrefix = req.body.namePrefix;
        // const givenName = req.body.givenName;
        // const middleName = req.body.middleName;
        // const familyName = req.body.familyName;
        // const nameSuffix = req.body.nameSuffix;
        // const password = req.body.password;
        // const handle = req.body.handle;
        // const certURL = req.body.certURL;
        // const certName = req.body.certName;
        // const verified = req.body.verified;
        // let savedNewGRFUser;
        // savedNewGRFUser = 
        await newGRFUser.save();
        res.json(_.pick(newGRFUser,['_id']));
        // newGRFUser.save()
        //     .then(() => res.json(newGRFUser))
        //     .catch(err => res.status(400).json('Error: ' + err));
    }
    
})
router.route('/:id').delete((req, res) => {
    GRFUserModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('GRF User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/:id').get((req, res) => {
    GRFUserModel.findById(req.params.id)
        .then(GRFUser => res.json(GRFUser))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    GRFUserModel.findById(req.params.id)
        .then(thisGRFUser => {
            thisGRFUser.namePrefix = req.body.namePrefix;
            thisGRFUser.givenName = req.body.givenName;
            thisGRFUser.middleName = req.body.middleName;
            thisGRFUser.familyName = req.body.familyName;
            thisGRFUser.nameSuffix = req.body.nameSuffix;
            thisGRFUser.email = req.body.email;
            thisGRFUser.password = req.body.password;
            thisGRFUser.handle = req.body.handle;
            thisGRFUser.certURL = req.body.certURL;
            thisGRFUser.certName = req.body.certName;
            thisGRFUser.verified = req.body.verified;
            thisGRFUser.save()
                .then(() => res.json('GRF User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;