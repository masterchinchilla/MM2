const config=require('config');
const jwt = require('jsonwebtoken');
// const Joi=require('joi');
const router = require('express').Router();
// const _ =require('lodash');
const bcrypt=require('bcrypt');

const GRFUserModel = require('../models/GRFUser.model');
// const schema=Joi.object({
//         email:Joi.string().min(5).max(255).required().email(),
//         password:Joi.string().min(5).max(255).required()
//     });
const ThisRecordObjModel=GRFUserModel;

router.post('/',async (req, res)=>{
    // const {error}=schema.validate(req.body);
    // if(error){res.status(400).json(error.details[0].message)
    // }else{
        try {
        let existingUser=await ThisRecordObjModel.findOne({email:req.body.email});
        try {
            const validPassword= await bcrypt.compare(req.body.password,existingUser.password);
            if(validPassword){
                const currentGRFUser={
                    _id: existingUser._id,
                    namePrefix: existingUser.namePrefix
                        ? existingUser.namePrefix
                        : "",
                    givenName: existingUser.givenName,
                    middleName: existingUser.middleName
                        ? existingUser.middleName
                        : "",
                    familyName:existingUser.familyName,
                    nameSuffix:existingUser.nameSuffix
                        ? existingUser.nameSuffix
                        : "",
                    email:existingUser.email,
                    handle: existingUser.handle,
                    certURL:existingUser.certURL
                        ? existingUser.certURL
                        : "",
                    certName: existingUser.certName
                        ? existingUser.certName
                        : "",
                    verified: existingUser.verified
                        ? existingUser.verified
                        : false,
                    photoURL: existingUser.photoURL
                        ? existingUser.photoURL
                        : "",
                    createdAt: existingUser.createdAt
                        ? existingUser.createdAt
                        : "",
                    updatedAt: existingUser.updatedAt
                        ? existingUser.updatedAt
                        : "",
                    isAdmin: existingUser.isAdmin
                        ? existingUser.isAdmin
                        : false
                }
                // const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","verified","createdAt","updatedAt","isAdmin"]);
                const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
                res
                    .header('x-auth-token',token)
                    .header('access-control-expose-headers','x-auth-token')
                    .send(currentGRFUser);
            }else{
                res.status(400).json([{all:`Invalid email or password`}])
            }
        } catch (error) {
            res.status(400).json([{all:`Invalid email or password`}])
        }
        } catch (error) {
            return res.status(401).json([{all:`Invalid email or password`}])
        }
    // }     
})
// router.post('/', (req, res)=>{
//     const {error}=schema.validate(req.body);
//     if(error){
//         return res.status(400).json(error.details[0].message)
//     }else{
//         GRFUserModel.findOne({email:req.body.email})
//             .then((existingUser)=>{
//                 bcrypt.compare(req.body.password,existingUser.password)
//                     .then((validPassword)=>{
//                         const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
//                         const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
//                         return res
//                             .header('x-auth-token',token)
//                             .header('access-control-expose-headers','x-auth-token')
//                             .send(currentGRFUser);
//                     })
//                     .catch((err)=>{
//                         return res.status(400).json('Invalid email or password')
//                     })
//             })
//             .catch((err)=>{
//                 return res.status(401).json('Invalid email or password')
//             })     
// }});
//register:POST /users
//Login:POST /logins

module.exports=router;