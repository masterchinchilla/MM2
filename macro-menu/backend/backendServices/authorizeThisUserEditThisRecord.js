
module.exports=function authEditThisRecord(req,res,authorId){
    const requestorUser=req.currentGRFUser;
    const requestorUserId=requestorUser._id;
    if(requestorUserId===authorId||requestorUser.isAdmin===true){
        return true;
    }else{
        res.status(401).json({ok:false,errorMsg:"You do not have access to edit this record"});
        return false;
    }
};