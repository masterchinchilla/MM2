const router = require('express').Router();

const GenRecipe = require('../models/genRecipe.model');
const GenRecipeIngredient=require('../models/genRecipeIngredient.model');
const MealType=require('../models/mealType.model');
const GRFUserModel=require('../models/GRFUser.model');

const auth = require('../middleware/auth');

const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate,ssValidate2}=require('../backendServices/ssValidation');

const typeOfRecordToChange="genRecipe"
const typesOfChildRecords="genRecipeIngredient";

const ThisRecordObjModel=GenRecipe;
const ChildRecordObjModel=GenRecipeIngredient;

router.get('/',async(req, res)=>{
    try {
        const matchingRecords=await ThisRecordObjModel.find()
            .populate('GRFUser')
            .populate('availableMealType')
        res.json(matchingRecords);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.get('/findbyname/:name',async(req, res)=>{
    try {
        const matchingRecord=await ThisRecordObjModel.findOne({name:req.params.name});
        const searchByNameResult=matchingRecord?"exists":"ok";
        res.json(searchByNameResult);
    } catch (errs) {
        res.status(400).json('Errors: ' + errs)
    }
});
router.put('/update/:id',auth,async(req,res)=>{
    const record=req.body;
    const recordId=req.params.id;
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){
        try {
            const foundRecord=await ThisRecordObjModel.findById(recordId).populate('GRFUser')
            const authorId=foundRecord.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.name=record.name;
                foundRecord.availableMealType=record.availableMealType._id;
                foundRecord.GRFUser=record.GRFUser._id;
                foundRecord.defaultPrepInstructions=record.defaultPrepInstructions;
                foundRecord.photoURL=record.photoURL;
                try {
                    await foundRecord.save();
                    res.json({ok:true,msg:"success"});
                } catch (errs) {
                    res.status(500).json({ok:false,valErrorsArray:[{all:`Record save to DB failed, refresh, wait a moment and try again`}]})
                }
            }else{return}
        } catch (errs) {
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange} not found, it might have already been deleted`}]})
        }
    }else{return};
});
router.post('/add',auth,async(req,res)=>{
    const requestorUser=req.currentGRFUser;
    if(requestorUser){
        const {
            name,
            availableMealType,
            GRFUser,
            defaultPrepInstructions,
            photoURL
        }=req.body;
        const availableMealTypeId=availableMealType._id;
        const authorId=GRFUser._id;
        const propsArray=[
            {thisPropsName:"name",thisPropNameSentenceCase:"Name",thisPropsValue:name,thisPropTypeForVal:"name",PropObjModel:GenRecipe,justCreated:null},
            {thisPropsName:"availableMealType",thisPropNameSentenceCase:"Meal Type",thisPropsValue:availableMealType,thisPropTypeForVal:"objRef",PropObjModel:MealType,justCreated:null},
            {thisPropsName:"GRFUser",thisPropNameSentenceCase:"User",thisPropsValue:GRFUser,thisPropTypeForVal:"objRef",PropObjModel:GRFUserModel,justCreated:null},
            {thisPropsName:"defaultPrepInstructions",thisPropNameSentenceCase:"Default Prep Instructions",thisPropsValue:defaultPrepInstructions,thisPropTypeForVal:"textBox",PropObjModel:null,justCreated:null},
            {thisPropsName:"photoURL",thisPropNameSentenceCase:"Photo URL",thisPropsValue:photoURL,thisPropTypeForVal:"url",PropObjModel:null,justCreated:null},
        ];
        const ssValResult=await ssValidate("Recipe", null, propsArray, req, res);
        if(ssValResult){
            const newGenRecipe=new GenRecipe({
                name,
                availableMealType:availableMealTypeId,
                GRFUser: authorId,
                defaultPrepInstructions,
                photoURL
            });
            newGenRecipe.save()
                .then(()=>res.json(newGenRecipe))
                .catch(err=>res.status(400).json('Error: '+err));
        }else{return};
    }else{
        res.status(401).json({ok:false,errorMsg:"You must be logged-in to create new records"});
        return};
    
});
module.exports=router;

// const record={
//   _id: "633b20a495667aee0c89794f",
//   name: null,
//   availableMealType: {
//     _id: "626dd6fc21888432c0fe3e90",
//     code: "breakfast",
//     name: "Breakfast"
//   },
//   GRFUser: {
//     userGroups: "GRFUser",
//     _id: "609f3e444ee536749c75c729",
//     givenName: "John",
//     familyName: "Doe",
//     email: "johndoe@gmail.com",
//     password: "$2b$10$qgJS0TaXFGkrgv6AbU5.WeA3HsHzuuhJgZd7WOuUdGHrOmhlO8iHG",
//     handle: "uAdmin@GRF2022",
//     __v: 0,
//     updatedAt: "2022-08-26T03:19:48.481Z",
//     verified: false,
//     photoURL: "https://i.pravatar.cc/300",
//     certName: "",
//     certURL: "",
//     middleName: "D",
//     namePrefix: "",
//     nameSuffix: "",
//     isAdmin: true
//   },
//   defaultPrepInstructions: "Some instructions",
//   photoURL: "cms-assets.viking.com/mar_content/recipes/Belgian_Waffles_Horiz_3840_16x9.jpg",
//   createdAt: "2022-10-03T17:49:24.750Z",
//   updatedAt: "2022-10-03T18:01:17.245Z",
//   __v: 0
// }