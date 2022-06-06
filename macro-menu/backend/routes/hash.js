const router = require('express').Router();
const _ =require('lodash');
const bcrypt=require('bcrypt');
async function run(){
    const salt = await bcrypt.genSalt(10);
    const hashedPWord=await bcrypt.hash('abc12345',salt)
    console.log(hashedPWord);
}
run();