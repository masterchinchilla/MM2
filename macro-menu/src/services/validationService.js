import httpService from "./httpService";
import apiService from "./apiService";
import config from "../config.json";
import valSchema from"../staticRefs/universalJoiValSchemaCS";
import rcrdOrFldNameSntncCaseAndPropTypForVal from "../staticRefs/rcrdOrFldNameSntncCaseAndPropTypForVal";
const Joi =require("joi");
const backEndHtmlRoot=config.backEndHtmlRoot;
export function csValidateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    console.log(objToValidate);
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
export async function csValidateObj(typeOfRecordToChange,
        recordToUpdate){
            console.log(recordToUpdate)
    let typeOfRcrdToChngSntncCase=rcrdOrFldNameSntncCaseAndPropTypForVal[typeOfRecordToChange]["nameSntncCase"];
    let recordId=recordToUpdate._id;
    let propsArray=[];
    let recordKeys = Object.keys(recordToUpdate);
    for(let i=0;i<recordKeys.length;i++){
        let thisPropObj={
            thisPropsName: recordKeys[i],
            thisPropNameSentenceCase: rcrdOrFldNameSntncCaseAndPropTypForVal[recordKeys[i]]["nameSntncCase"],
            thisPropsValue: recordToUpdate[recordKeys[i]],
            thisPropTypeForVal: rcrdOrFldNameSntncCaseAndPropTypForVal[recordKeys[i]]["propTypeForVal"],
        };
        propsArray.push(thisPropObj)
    };
    console.log(typeOfRecordToChange, typeOfRcrdToChngSntncCase, recordId, propsArray)
    const valErrorsArray=csValidate(typeOfRecordToChange, typeOfRcrdToChngSntncCase, recordId, propsArray);
    return valErrorsArray;
}
export async function csValidate(typeOfRecordToChange, typeOfRcrdToChngSntncCase, recordId, propsArray){
    const valErrorsArray=[];
    for(let i=0;i<propsArray.length;i++){
        let {thisPropsName,thisPropNameSentenceCase,thisPropsValue,thisPropTypeForVal}=propsArray[i];
        let thisPropsValErrsArray=[];
        if(thisPropTypeForVal==="objRef"){
            let thisPropsValueId=thisPropsValue._id;
            let thisPropsNameForLookup=thisPropsName==="availableMealType"?"mealType":thisPropsName;
            let apiEndpoint=`${backEndHtmlRoot}${thisPropsNameForLookup}s/`
            if(thisPropsName==="GRFUser"){
                try {await httpService.get(`${apiEndpoint}${thisPropsValueId}`);
                } catch
                (err) {
                    let errResponse = err.response ? err.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    thisPropsValErrsArray.push("Invalid Author");
                    console.log(errData);
                }
            }else{
                try {await httpService.get(`${apiEndpoint}${thisPropsValueId}`);
                } catch (err) {
                    let errResponse = err.response ? err.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    thisPropsValErrsArray.push(`${thisPropNameSentenceCase} not found`);
                    console.log(errData);
                }
            };
        }else{
            let validationResults=thisPropTypeForVal?csValidateProp(thisPropsName, thisPropsValue, thisPropTypeForVal):[];
            if(validationResults.length>0){
                for(let i=0;i<validationResults.length;i++){
                  thisPropsValErrsArray.push(validationResults[i])
                }
            };
            if(thisPropsName==="name"&&thisPropsValue){
                // let apiEndpoint=`${backEndHtmlRoot}${typeOfRecordToChange}s/`;
                try {
                    // const matchingRecords=await httpService.get(`${apiEndpoint}findbyname/${thisPropsValue}`);
                    // callApi(action, recordType, srchParam, srchParamVal, payload);
                    const backEndReqResponse = await apiService(
                        "get",
                        typeOfRecordToChange,
                        "name",
                        thisPropsValue,
                        null
                    );
                    const matchingRecords = backEndReqResponse.data;
                    let nameError;
                    for(let i=0;i<matchingRecords.length;i++){
                        if(!(matchingRecords[i]._id==recordId)){
                            nameError=`Another ${typeOfRcrdToChngSntncCase} is already using that name`}
                    };
                    if(nameError){thisPropsValErrsArray.push(nameError)};
                    
                } catch (errs) {
                    let errResponse = errs.response ? errs.response : null;
                    let errData = errResponse.data ? errResponse.data : { data: null };
                    thisPropsValErrsArray.push(errData)
                }
            }
            
        };
        valErrorsArray.push({[thisPropsName]:thisPropsValErrsArray})
    };
    return valErrorsArray;
};

export default {csValidateProp,csValidate,csValidateObj};