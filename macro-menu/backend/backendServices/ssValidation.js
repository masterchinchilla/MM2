const Joi =require("joi");
const valSchema=require("../universalJoiValSchema");
function ssValidateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
    return error ? error.details[0].message : null;
};
async function ssValidate(objTypeSnglrSntncCase, recordId, propsArray, req, res){
    const valErrorsArray=[];
    let authorId;
    for(let i=0;i<propsArray.length;i++){
        let {thisPropsName,thisPropNameSentenceCase,thisPropsValue,thisPropTypeForVal,PropObjModel}=propsArray[i];
        if(thisPropTypeForVal==="objRef"){
            if(thisPropsName==="GRFUser"){
                authorId=thisPropsValue._id;
                const foundAuthor=await PropObjModel.findById(authorId);
                if(!foundAuthor){
                    res.status(404).json({ok:false,errorMsg:"Invalid author"});
                    return false;
                };
            }else{
                let thisPropsValueId=thisPropsValue._id;
                const foundRecord=await PropObjModel.findById(thisPropsValueId);
                if(!foundRecord){
                    res.status(404).json({ok:false,errorMsg:`${thisPropNameSentenceCase} not found`});
                    return false;
                };
            }
        }else{
            let thisPropsValError=ssValidateProp(thisPropsName, thisPropsValue, thisPropTypeForVal);
            if(thisPropsValError){valErrorsArray.push({[thisPropsName]:thisPropsValError})};
        }
        if(thisPropsName==="name"){
            PropObjModel.find({name:new RegExp(thisPropsValue,"i")})
            .then(matchingRecords=>{
                let nameError;
                for(let i=0;i<matchingRecords.length;i++){
                    if(matchingRecords[i].name===thisPropsValue){
                        if(!(matchingRecords[i]._id.equals(recordId))){
                            nameError=`Another ${objTypeSnglrSntncCase} is already using that name`}
                    }
                };
                if(nameError){valErrorsArray.push({name:nameError})};
            })
        }
    };
    if(valErrorsArray.length>0){  
        res.status(400).json({ok:false,valErrorsArray:valErrorsArray});
        return false;
    }else{
        return true
    };
};
module.exports= {ssValidateProp,ssValidate};