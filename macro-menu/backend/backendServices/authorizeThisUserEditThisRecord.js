
module.exports=function authEditThisRecord(req,res){
    const requestorUser=req.currentGRFUser;
    const requestorUserId=requestorUser._id;
    // const requestorUserId="629e5328f4e89945aea6a206";
    const authorId=req.body.GRFUser._id;
    if(requestorUserId===authorId||requestorUser.isAdmin===true){
        return true;
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to edit this record"});
        return false;
    }
};