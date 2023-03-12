const config=require('config');
const router = require('express').Router();
const _ =require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

let GRFUserModel = require('../models/GRFUser.model')

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="GRFUser";

const ThisRecordObjModel=GRFUserModel;

router.get('/:id',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findById(req.params.id)
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json([{all:`Record lookup failed, refresh, wait a moment and try again`}])
    }
});
router.get('/findbyhandle/:handle',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findOne({handle:req.params.handle});
        // const searchByHandleResult=matchingRecord?"exists":"ok";
        res.json(matchingRecord);
    } catch (errs) {
        res.status(400).json([{all:`Handle lookup failed,refresh, wait a moment and try again`}])
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId)
            const authorId=foundRecord._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.namePrefix = record.namePrefix;
                foundRecord.givenName = record.givenName;
                foundRecord.middleName = record.middleName;
                foundRecord.familyName = record.familyName;
                foundRecord.nameSuffix = record.nameSuffix;
                foundRecord.email = record.email;
                foundRecord.handle = record.handle;
                foundRecord.photoURL=record.photoURL;
                foundRecord.certURL = record.certURL;
                foundRecord.certName = record.certName;
                foundRecord.verified = record.verified;
                try {
                    await foundRecord.save();
                    res.json(foundRecord);
                } catch (errs) {
                    res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                }
            }else{return}
        } catch (errs) {
            res.status(404).json([{all:`${typeOfRecordToChange} not found, it might have already been deleted`}])
        }
    }else{return};
});
router.post('/add',auth,async(req,res)=>{
    const record=req.body;
    const email = record.email;
    try {
        const existingUser=await ThisRecordObjModel.findOne({email:email});
        if(existingUser){
            res.status(400).json([{all:`User already registered.`}]);
        }else{
            const ssValResult=await ssValidate2(typeOfRecordToChange, req.body, req, res);
            if(ssValResult){
                const newRecord=new ThisRecordObjModel({
                    namePrefix : record.namePrefix,
                    givenName : record.givenName,
                    middleName : record.middleName,
                    familyName : record.familyName,
                    nameSuffix : record.nameSuffix,
                    email : email,
                    password:record.password,
                    handle : record.handle,
                    photoURL:record.photoURL,
                    certURL : record.certURL,
                    certName : record.certName,
                    verified : record.verified
                });
                const salt = await bcrypt.genSalt(10);
                newRecord.password=await bcrypt.hash(newRecord.password,salt)
                try {
                    await newRecord.save();
                    const newRecordSansPWord=_.pick(newRecord,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","photoURL","certURL","certName","verified","isAdmin","createdAt","updatedAt"]);
                    const token=jwt.sign({newRecordSansPWord},config.get('jwtPrivateKey'));
                    res
                        .header('x-auth-token',token)
                        .header('access-control-expose-headers','x-auth-token')
                        .json(newRecordSansPWord);
                } catch (errs) {
                    res.status(500).json([{all:`Record save to DB failed, refresh, wait a moment and try again`}])
                }
            }else{return}
        }
    } catch (errs) {
        res.status(500).json([{all:`Email lookup failed, refresh, wait a moment and try again`}])
    }
});

module.exports = router;

// router.route('/').get((req, res) => {
//     GRFUserModel.find()
//         .then(GRFUsers => res.json(GRFUsers))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/findbyhandle/:valueForSearch').get((req, res)=>{
//     GRFUserModel.findOne({handle:req.params.valueForSearch})
//         .then((user)=>{
//             if(user){res.json("exists")}else{res.json("ok")}
//         })
//         .catch(err=>res.status(404).json('Error:'+err));
// });
// router.route('/update/:id').put((req, res) => {
//     GRFUserModel.findById(req.params.id)
//         .then(thisGRFUser => {
//             thisGRFUser.namePrefix = req.body.namePrefix;
//             thisGRFUser.givenName = req.body.givenName;
//             thisGRFUser.middleName = req.body.middleName;
//             thisGRFUser.familyName = req.body.familyName;
//             thisGRFUser.nameSuffix = req.body.nameSuffix;
//             thisGRFUser.email = req.body.email;
//             thisGRFUser.password = thisGRFUser.password;
//             thisGRFUser.handle = req.body.handle;
//             thisGRFUser.photoURL=req.body.photoURL;
//             thisGRFUser.certURL = req.body.certURL;
//             thisGRFUser.certName = req.body.certName;
//             thisGRFUser.verified = req.body.verified;
//             thisGRFUser.save()
//                 .then((savedRecord) => {
//                     const currentGRFUser=_.pick(savedRecord,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","photoURL","certURL","certName","verified","createdAt","updatedAt","isAdmin"]);
//         const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
//         res
//             .header('x-auth-token',token)
//             .header('access-control-expose-headers','x-auth-token')
//             .send(currentGRFUser);
//                 })
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });
// router.post('/add', async (req, res) => {
//     const email = req.body.email;
//     let existingUser=await GRFUserModel.findOne({email:email});
//     if(existingUser){
//         return res.status(400).json('User already registered.');
//     }else{
//         const newGRFUser = new GRFUserModel(_.pick(req.body,[
//             'namePrefix',
//             'givenName',
//             'middleName',
//             'familyName',
//             'nameSuffix',
//             'email',
//             'password',
//             'handle',
//             'photoURL',
//             'certURL',
//             'certName',
//             'verified'
//         ]));
//         const salt = await bcrypt.genSalt(10);
//         newGRFUser.password=await bcrypt.hash(newGRFUser.password,salt)
//         const savedNewUser = await newGRFUser.save();
//         const currentGRFUser=_.pick(savedNewUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","photoURL","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
//         const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
//         res
//             .header('x-auth-token',token)
//             .header('access-control-expose-headers','x-auth-token')
//             .send(currentGRFUser);
//     }
// })
// router.route('/:id').delete((req, res) => {
//     GRFUserModel.findByIdAndDelete(req.params.id)
//         .then(() => res.json('GRF User deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// })
// router.route('/:id').get((req, res) => {
//     GRFUserModel.findById(req.params.id)
//         .then(GRFUser => res.json(GRFUser))
//         .catch(err => res.status(400).json('Error: '+err));
// });