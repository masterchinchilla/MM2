const jwt =require('jsonwebtoken');
const config=require('config');
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
        return res.status(400).json('User already registered.');
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
            'photoURL',
            'certURL',
            'certName',
            'verified'
        ]));
        const salt = await bcrypt.genSalt(10);
        newGRFUser.password=await bcrypt.hash(newGRFUser.password,salt)
        const savedNewUser = await newGRFUser.save();
        const currentGRFUser=_.pick(savedNewUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","photoURL","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
        const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
        res
            .header('x-auth-token',token)
            .header('access-control-expose-headers','x-auth-token')
            .send(currentGRFUser);
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
        .catch(err => res.status(400).json("Invalid Author"));
});
router.route('/findbyname/:valueForSearch').get((req, res)=>{
    GRFUserModel.findOne({handle:req.params.valueForSearch})
        .then((user)=>{
            if(user){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
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
            thisGRFUser.password = thisGRFUser.password;
            thisGRFUser.handle = req.body.handle;
            thisGRFUser.photoURL=req.body.photoURL;
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