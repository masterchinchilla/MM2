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

router.post('/',async (req, res)=>{
    const {error}=schema.validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let existingUser=await GRFUserModel.findOne({email:req.body.email});
    if(!existingUser)return res.status(400).send('Invalid email or password.');
    const validPassword= await bcrypt.compare(req.body.password,existingUser.password);
    if(!validPassword)return res.status(400).send('Password hash check failed');
    const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
    const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
    res
        .header('x-auth-token',token)
        .header('access-control-expose-headers','x-auth-token')
        .send(currentGRFUser);
})
//register:POST /users
//Login:POST /logins

module.exports=router;