const jwt=require("jsonwebtoken");
const config=require("config");
const _ = require("lodash");
module.exports=function auth(req, res, next){
    if(!config.get("requiresAuth"))return next();
    const token=req.header("x-auth-token");
    if(!token)return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        const currentGRFUser=_.pick(decoded.currentGRFUser,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","verified","createdAt","updatedAt","isAdmin"]);
        req.currentGRFUser=currentGRFUser;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};