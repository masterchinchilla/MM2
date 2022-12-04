import httpService from "./httpService";
import config from "../config.json";
import valSchema from"../components/universalJoiValSchemaCS";
const Joi =require("joi");
const backEndHtmlRoot=config.backEndHtmlRoot;
export function csValidateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
    console.log(error);
    let valErrorDetails = error ? error.details : [];
    let valErrorsArray = [];
    if (valErrorDetails) {
      valErrorDetails.map((valError) => {
        valErrorsArray.push(valError.message);
      });
    }
    return valErrorsArray;
};    
export async function csValidate(typeOfRecordToChange, typeOfRcrdToChngSntncCase, recordId, propsArray){
    const valErrorsArray=[];
    let valErrorsObj={};
    for(let i=0;i<propsArray.length;i++){
        let {thisPropsName,thisPropNameSentenceCase,thisPropsValue,thisPropTypeForVal}=propsArray[i];
        let thisPropsValErrsArray=[];
        if(thisPropTypeForVal==="objRef"){
            let thisPropsValueId=thisPropsValue._id;
            let apiEndpoint=`${backEndHtmlRoot}${thisPropsName}s/`
            if(thisPropsName==="GRFUser"){
                try {await httpService.get(`${apiEndpoint}${thisPropsValueId}`);
                } catch
                (err) {
                    let errResponse = err.response ? err.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    thisPropsValErrsArray.push(errData);
                }
            }else{
                try {
                    const foundRecord=await httpService.get(`${apiEndpoint}${thisPropsValueId}`);
                    if(!foundRecord){
                        // valErrorsArray.push({[thisPropsName]:[`${thisPropNameSentenceCase} not found`]})
                        thisPropsValErrsArray.push(`${thisPropNameSentenceCase} not found`)
                    };
                } catch (err) {
                    let errResponse = err.response ? err.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    // valErrorsArray.push({[thisPropsName]:[errData]})
                    thisPropsValErrsArray.push(errData);
                }
            };
        }else{
            let validationResults=csValidateProp(thisPropsName, thisPropsValue, thisPropTypeForVal);
            if(validationResults.length>0){
                for(let i=0;i<validationResults.length;i++){
                  thisPropsValErrsArray.push(validationResults[i])
                }
                
            };
            if(thisPropsName==="name"){
                let apiEndpoint=`${backEndHtmlRoot}${typeOfRecordToChange}s/`
                try {
                    const matchingRecords=await httpService.get(`${apiEndpoint}findbyname/${thisPropsValue}`);
                    let nameError;
                    for(let i=0;i<matchingRecords.length;i++){
                        if(!(matchingRecords[i]._id.equals(recordId))){
                            nameError=`Another ${typeOfRcrdToChngSntncCase} is already using that name`}
                    };
                    if(nameError){thisPropsValErrsArray.push(nameError)};
                    
                } catch (errs) {
                    let errResponse = errs.response ? errs.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    thisPropsValErrsArray.push(errData)
                }
            }
            // valErrorsArray.push({[thisPropsName]:thisPropsValErrsArray})
            
        };
        valErrorsObj[thisPropsName]=thisPropsValErrsArray;
    };
    return valErrorsObj;
};

export default {csValidateProp,csValidate};