const config=require('config');
const jwt = require('jsonwebtoken');
const Joi=require('joi');
const router = require('express').Router();
const _ =require('lodash');
const bcrypt=require('bcrypt');

let GRFUserModel = require('../models/GRFUser.model');
const schema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });

// router.post('/',async (req, res)=>{
//     const {error}=schema.validate(req.body);
//     if(error){res
//         .status(400)
//         .header('x-auth-errors',error.details[0].message)
//         .header('access-control-expose-headers','x-auth-errors')
//         .send()}else{
//             try {
//             let existingUser=await GRFUserModel.findOne({email:req.body.email});
//             try {
//                 const validPassword= await bcrypt.compare(req.body.password,existingUser.password);
//                 const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
//                 const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
//                 res
//                 .header('x-auth-token',token)
//                 .header('access-control-expose-headers','x-auth-token')
//                 .send(currentGRFUser);
//             } catch (error) {
//                 res.status(400).send(error);
//             }
//         } catch (error) {
//             res.status(401).send(error);
//         }
//         }
        
// })
router.post('/', (req, res)=>{
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json(error.details[0].message)
    }else{
        GRFUserModel.findOne({email:req.body.email})
            .then((existingUser)=>{
                bcrypt.compare(req.body.password,existingUser.password)
                    .then((validPassword)=>{
                        const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
                        const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
                        return res
                            .header('x-auth-token',token)
                            .header('access-control-expose-headers','x-auth-token')
                            .send(currentGRFUser);
                    })
                    .catch((err)=>{
                        return res.status(400).json('Invalid email or password')
                    })
            })
            .catch((err)=>{
                return res.status(401).json('Invalid email or password')
            })     
}});
//register:POST /users
//Login:POST /logins

module.exports=router;