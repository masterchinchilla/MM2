const jwt=require("jsonwebtoken");
const config=require("config");
module.exports=function auth(req, res, next){
    if(!config.get("requiresAuth"))return next();
    const token=req.header("x-auth-token");
    console.log(token);
    if(!token)return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        // console.log(decoded);
        // const currentGRFUser=_.pick(decoded,["_id","namePrefix","givenName","middleName","familyName","nameSuffix","email","handle","certURL","certName","userGroups","verified","createdAt","updatedAt"]);
        req.currentGRFUser=decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};