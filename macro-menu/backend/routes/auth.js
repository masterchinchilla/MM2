const router = require('express').Router();

router.route('/').post((req, res)=>{
    console.log("response")
})

//register:POST /users
//Login:POST /logins

module.exports=router;