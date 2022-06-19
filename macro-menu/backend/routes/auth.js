const config=require('config');
const jwt = require('jsonwebtoken');
const Joi=require('joi');
const router = require('express').Router();
const _ =require('lodash');
const bcrypt=require('bcrypt');

let GRFUserModel = require('../models/GRFUser.model');
const schema=Joi.object({
        email:Joi.string().trim().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
validateForm=(account)=>{
    const result = schema.validate(account, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
}
router.post('/',async (req, res)=>{
    // const {error}=schema.validate(req.body);
    const errors=validateForm(req.body);
    if(errors)return res.status(400).send(errors);
    let existingUser=await GRFUserModel.findOne({email:req.body.email});
    if(!existingUser){return res.status(401).json({errors:{email: 'Invalid email or password.',
        password: 'Invalid email or password.'}})}else{
            const validPassword= await bcrypt.compare(req.body.password,existingUser.password);
    if(!validPassword){return res.status(401).json({errors:{email: 'Invalid email or password.',
        password: 'Invalid email or password.'}})}else{
const currentGRFUser=_.pick(existingUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
    const token=jwt.sign({currentGRFUser},config.get('jwtPrivateKey'));
    res
        .header('x-auth-token',token)
        .header('access-control-expose-headers','x-auth-token')
        .send(currentGRFUser);
        };
        };
})
//register:POST /users
//Login:POST /logins

module.exports=router;