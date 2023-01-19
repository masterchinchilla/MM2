const router = require('express').Router();
const dayjs = require('dayjs');
let GenRecipe = require('../models/genRecipe.model');
let MealType=require('../models/mealType.model');
let GRFUserModel=require('../models/GRFUser.model');
const auth = require('../middleware/auth');
const authEditThisRecord=require('../backendServices/authorizeThisUserEditThisRecord');
const {ssValidate,ssValidate2}=require('../backendServices/ssValidation');
const typeOfRecordToChange="genRecipe"
router.route('/').get((req, res)=>{
    GenRecipe.find().populate('GRFUser').populate('availableMealType')
        .then(recipes=>res.json(recipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/:id').get((req, res)=>{
    GenRecipe.findById(req.params.id).populate('GRFUser').populate('availableMealType')
        .then(recipe=>res.json(recipe))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/findbyname/:name').get((req, res)=>{
    GenRecipe.findOne({name:req.params.name})
        .then((recipe)=>{
            if(recipe){res.json("exists")}else{res.json("ok")}
        })
        .catch(err=>res.status(404).json('Error:'+err));
})
router.route('/thisMealTypesGenRecipes/:mealType').get((req, res)=>{
    GenRecipe.find({availableMealType:req.params.mealType._id}).populate('GRFUser').populate('availableMealType')
        .then(mealTypesRecipes=>res.json(mealTypesRecipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
router.route('/genRecipesByMealTypeAndName/:mealType/:name').get((req, res)=>{
    GenRecipe.find({
        name:new RegExp(req.params.name,"i"),
        availableMealType:req.params.mealType
    }).populate('GRFUser').populate('availableMealType')
        .then(recipes=>res.json(recipes))
        .catch(err=>res.status(400).json('Error: '+err));
})
// router.route('/update/:id').put((req, res)=>{
//     GenRecipe.findById(req.params.id)
//         .then(genRecipe=>{
//             genRecipe.name = req.body.name;
//             genRecipe.availableMealType = req.body.availableMealType._id;
//             genRecipe.GRFUser = req.body.GRFUser._id;
//             genRecipe.defaultPrepInstructions = req.body.defaultPrepInstructions;
//             genRecipe.photoURL = req.body.photoURL;
//             genRecipe.save()
//                 .then(()=>res.json(genRecipe))
//                 .catch(err=>res.status(400).json('Error: '+err));
//         })
//         .catch(err=>res.status(400).json('Error: '+err));
// })
router.put('/update/:id',auth,async(req,res)=>{
    // const record=req.body;
    const record={
  _id: "633b20a495667aee0c89794f",
  name: null,
  availableMealType: {
    _id: "626dd6fc21888432c0fe3e90",
    code: "breakfast",
    name: "Breakfast"
  },
  GRFUser: {
    userGroups: "GRFUser",
    _id: "609f3e444ee536749c75c729",
    givenName: "John",
    familyName: "Doe",
    email: "johndoe@gmail.com",
    password: "$2b$10$qgJS0TaXFGkrgv6AbU5.WeA3HsHzuuhJgZd7WOuUdGHrOmhlO8iHG",
    handle: "uAdmin@GRF2022",
    __v: 0,
    updatedAt: "2022-08-26T03:19:48.481Z",
    verified: false,
    photoURL: "https://i.pravatar.cc/300",
    certName: "",
    certURL: "",
    middleName: "D",
    namePrefix: "",
    nameSuffix: "",
    isAdmin: true
  },
  defaultPrepInstructions: "Some instructions",
  photoURL: "cms-assets.viking.com/mar_content/recipes/Belgian_Waffles_Horiz_3840_16x9.jpg",
  createdAt: "2022-10-03T17:49:24.750Z",
  updatedAt: "2022-10-03T18:01:17.245Z",
  __v: 0
}
    const {
        name,
        availableMealType,
        GRFUser,
        defaultPrepInstructions,
        photoURL
    }=record;
    const recordId=req.params.id;
    // const recordId="12345";
    const ssValResult=await ssValidate2(typeOfRecordToChange, record, req, res);
    if(ssValResult){GenRecipe.findById(recordId)
        .populate("GRFUser")
        .then(foundRecord=>{
            let authorId=foundRecord.GRFUser._id;
            const userCanEdit=authEditThisRecord(req,res,authorId)
            if(userCanEdit){
                foundRecord.name=name,
                foundRecord.availableMealType=availableMealType,
                foundRecord.GRFUser=GRFUser,
                foundRecord.defaultPrepInstructions=defaultPrepInstructions,
                foundRecord.photoURL=photoURL,
                foundRecord.save()
                    .then(()=>res.json({ok:true,msg:"success"}))
                    .catch((err)=>{
                        res.status(500).json({ok:false,valErrorsArray:[{all:"Server error - please try again in a moment"}]})
                    });
            }else{return}
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).json({ok:false,valErrorsArray:[{all:`${typeOfRecordToChange}not found, it might have already been deleted`}]})
        });
    }else{return};
})
// router.route('/add/').post((req, res)=>{
//     const name=req.body.name;
//     const availableMealType=req.body.availableMealType;
//     const GRFUser=req.body.GRFUser;
//     const defaultPrepInstructions=req.body.defaultPrepInstructions;
//     const photoURL=req.body.photoURL;
//     const newGenRecipe=new GenRecipe({
//         name,
//         availableMealType,
//         GRFUser,
//         defaultPrepInstructions,
//         photoURL
//     });
//     newGenRecipe.save()
//         .then(()=>res.json(newGenRecipe))
//         .catch(err=>res.status(400).json('Error: '+err));
// });
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