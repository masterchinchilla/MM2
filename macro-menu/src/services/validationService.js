import httpService from "./httpService";
import config from "../config.json";
import valSchema from"../components/universalJoiValSchemaCS";
import rcrdOrFldNameSntncCaseAndPropTypForVal from "../staticRefs/rcrdOrFldNameSntncCaseAndPropTypForVal";
const Joi =require("joi");
const backEndHtmlRoot=config.backEndHtmlRoot;
const propNamesForLookup={
    brand:"brand",
    day:"day",
    dayOfWeek:"dayOfWeek",
    genRecipe:"genRecipe",
    genRecipeIngredient:"genRecipeIngredient",
    GRFUser:"GRFUser",
    ingredient:"ingredient",
    meal:"meal",
    mealIngredient:"mealIngredient",
    mealType:"mealType",
    availableMealType:"mealType",
    unitOfMeasure:"unitOfMeasure",
    weekMealPlan:"weekMealPlan",
    weightType:"weightType"
}
// const rcrdOrFldNameSntncCaseAndPropTypForVal = {
//       GRFUser: {nameSntncCase:"Author",propTypeForVal:"objRef"},
//       weekMealPlan: {nameSntncCase:"Week Meal Plan",propTypeForVal:"objRef"},
//       day: {nameSntncCase:"Day",propTypeForVal:"objRef"},
//       meal: {nameSntncCase:"Meal",propTypeForVal:"objRef"},
//       genRecipe: {nameSntncCase:"Recipe",propTypeForVal:"objRef"},
//       mealIngredient: {nameSntncCase:"Meal Ingredient",propTypeForVal:"objRef"},
//       genRecipeIngredient: {nameSntncCase:"Recipe Ingredient",propTypeForVal:"objRef"},
//       ingredient: {nameSntncCase:"Base Ingredient",propTypeForVal:"objRef"},
//       unitOfMeasure: {nameSntncCase:"UOM",propTypeForVal:"objRef"},
//       weightType: {nameSntncCase:"Weight Type",propTypeForVal:"objRef"},
//       brand: {nameSntncCase:"Brand",propTypeForVal:"objRef"},
//       name: {nameSntncCase:"Name",propTypeForVal:"name"},
//       qty: {nameSntncCase:"Qty",propTypeForVal:"float"},
//       defaultQty: {nameSntncCase:"Default Qty",propTypeForVal:"float"},
//       photoURL: {nameSntncCase:"Photo URL",propTypeForVal:"url"},
//       dayOfWeek: {nameSntncCase:"Day of Week",propTypeForVal:"objRef"},
//       mealType: {nameSntncCase:"Meal Type",propTypeForVal:"objRef"},
//       defaultMealType: {nameSntncCase:"Meal Type",propTypeForVal:"objRef"},
//       defaultPrepInstructions: {nameSntncCase:"Prep Instructions",propTypeForVal:"textBox"},
//       calories: {nameSntncCase:"Calories",propTypeForVal:"float"},
//       calsBudget:{nameSntncCase:"Calories Budget",propTypeForVal:"float"},
//       carbs: {nameSntncCase:"Carbs",propTypeForVal:"float"},
//       carbsBudget: {nameSntncCase:"Carbs Budget",propTypeForVal:"float"},
//       protein: {nameSntncCase:"Protein",propTypeForVal:"float"},
//       proteinBudget: {nameSntncCase:"Protein Budget",propTypeForVal:"float"},
//       fat: {nameSntncCase:"Fat",propTypeForVal:"float"},
//       fatBudget: {nameSntncCase:"Fat Budget",propTypeForVal:"float"},
//       fiber: {nameSntncCase:"Fiber",propTypeForVal:"float"},
//       fiberBudget: {nameSntncCase:"Fiber Budget",propTypeForVal:"float"},
//       createdAt: {nameSntncCase:"Date Created",propTypeForVal:null},
//       updatedAt: {nameSntncCase:"Last Update",propTypeForVal:null},
//       _id:{nameSntncCase:"ID",propTypeForVal:null}
//     };
export function csValidateProp(propName, value, propTypeForVal) {
    const rule = valSchema.extract(propTypeForVal);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
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
            let validationResults=csValidateProp(thisPropsName, thisPropsValue, thisPropTypeForVal);
            if(validationResults.length>0){
                for(let i=0;i<validationResults.length;i++){
                  thisPropsValErrsArray.push(validationResults[i])
                }
                
            };
            if(thisPropsName==="name"&&thisPropsValue){
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
            
        };
        valErrorsArray.push({[thisPropsName]:thisPropsValErrsArray})
    };
    return valErrorsArray;
};

export default {csValidateProp,csValidate,csValidateObj};