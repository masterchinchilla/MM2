const Joi =require("joi");
const valSchema=require("../universalJoiValSchemaSS");
const {rcrdOrFldNameCaseValPrpTypNPropObjMod} =require( "../ssStaticRefs/rcrdOrFldNameCaseValPrpTypNPropObjMod");
function ssValidateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
    // console.log(error);
    return error ? error.details[0].message : null;
};

async function ssValidateObject(objTypeSnglrSntncCase, recordId, propsArray, req, res){
    const valErrorsArray=[];
    for(let i=0;i<propsArray.length;i++){
        let {thisPropsName,thisPropNameSentenceCase,thisPropsValue,thisPropTypeForVal,PropObjModel,justCreated}=propsArray[i];
        if(thisPropTypeForVal==="objRef"){
            let thisPropsValueId=thisPropsValue._id;
            if(thisPropsName==="GRFUser"){
                const foundAuthor=await PropObjModel.findById(thisPropsValueId);
                if(!foundAuthor){
                    valErrorsArray.push({GRFUser:["Invalid author"]})
                    // res.status(404).json({ok:false,errorMsg:"Invalid author"});
                    res.status(404).json({ok:false,valErrorsArray:valErrorsArray});
                    return false;
                };
            }
            else{
                if(!justCreated){
                    const foundRecord=await PropObjModel.findById(thisPropsValueId);
                    if(!foundRecord){
                        valErrorsArray.push({thisPropsName:[`${thisPropNameSentenceCase} not found`]})
                        // res.status(404).json({ok:false,errorMsg:`${thisPropNameSentenceCase} not found`});
                        res.status(404).json({ok:false,valErrorsArray:valErrorsArray});
                        return false;
                    };
                }; 
            };
        }else if(
            thisPropsName==="createdAt"||
            thisPropsName==="updatedAt"||
            thisPropsName==="_id"||
            thisPropsName==="__v"
        ){}else{
            let thisPropsErrs=[];
            let thisPropsValError=ssValidateProp(thisPropsName, thisPropsValue, thisPropTypeForVal);
            if(thisPropsValError){thisPropsErrs.push(thisPropsValError)};
            // console.log(thisPropsErrs);
            if(thisPropsName==="name"&&objTypeSnglrSntncCase!=="Day"){
                let matchingRecords=[];
                try {
                    matchingRecords=await PropObjModel.find({name:new RegExp(thisPropsValue,"i")});
                } catch (error) {
                    res.status(500).json({ok:false,valErrorsArray:[{all:"Server error - please try again in a moment"}]})
                }
                let nameError;
                for(let i=0;i<matchingRecords.length;i++){
                        if(!(matchingRecords[i]._id.equals(recordId))){
                            nameError=`Another ${objTypeSnglrSntncCase} is already using that name`}
                    }
                if(nameError){thisPropsErrs.push(nameError)};
            };
            if(thisPropsErrs.length>0){valErrorsArray.push({[thisPropsName]:thisPropsErrs})};
        }
    };
    if(valErrorsArray.length>0){  
        res.status(400).json({ok:false,valErrorsArray:valErrorsArray});
        return false;
    }else{
        return true
    };
};
async function ssValidate2(typeOfRecordToChange, recordToUpdate, req, res){
    
    let typeOfRcrdToChngSntncCase= rcrdOrFldNameCaseValPrpTypNPropObjMod[typeOfRecordToChange]["nameSntncCase"];
    let recordId=recordToUpdate._id;
    let propsArray=[];
    let recordKeys = Object.keys(recordToUpdate);
    for(let i=0;i<recordKeys.length;i++){
        // console.log(recordKeys[i])
        let thisRecordKey=recordKeys[i];
        let PropObjModel;
        if(thisRecordKey==="name"){
            PropObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[typeOfRecordToChange]["PropObjModel"]
        }else{PropObjModel=rcrdOrFldNameCaseValPrpTypNPropObjMod[thisRecordKey]["PropObjModel"]}
        let thisPropObj={
            thisPropsName: thisRecordKey,
            thisPropNameSentenceCase: rcrdOrFldNameCaseValPrpTypNPropObjMod[thisRecordKey]["nameSntncCase"],
            thisPropsValue: recordToUpdate[thisRecordKey],
            thisPropTypeForVal: rcrdOrFldNameCaseValPrpTypNPropObjMod[thisRecordKey]["propTypeForVal"],
            PropObjModel:PropObjModel,
            justCreated:null
        };
        propsArray.push(thisPropObj)
    };
return await ssValidateObject(typeOfRcrdToChngSntncCase, recordId, propsArray, req, res);
// return true;
}
async function ssValidate(objTypeSnglrSntncCase, recordId, propsArray, req, res){
return await ssValidateObject(objTypeSnglrSntncCase, recordId, propsArray, req, res)
}
module.exports= {ssValidateProp,ssValidate2,ssValidate};