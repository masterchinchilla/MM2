import React from "react";
import NewInputCore from "./NewInputCore.component";
const NewIngrdntMacrosSubForm = (props) => {
  const typeOfRecordToChange = "ingredient";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot, thisDayOfWeekCode, thisMealTypeCode, arrayIndex } =
    commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { thisStateObj, thisStateObjBackup } = specificData;
  const {} = specificMethods;
  const {
    recordLoaded,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
  } = thisStateObj;
  const thisRecord = thisStateObj.thisRecord.genRecipeIngredient.ingredient;
  const {
    _id,
    createdAt,
    updatedAt,
    photoURL,
    calories,
    carbs,
    protein,
    fat,
    fiber,
  } = thisRecord;
  const fieldsDisabled = !editingForm.ingredient ? true : false;
  const thisRecordId = _id;
  function inputOnKeyUpFn() {}
  return (
    <div
      className={
        justCreated.ingredient
          ? "accordion-body ingrdntInnrAccrdn cardHeaderFocused"
          : "accordion-body ingrdntInnrAccrdn"
      }
      // className="accordion-body ingrdntInnrAccrdn"
    >
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "calories",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Calories (g)",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "calories",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.calories,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "number",
            propValue: calories,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "carbs",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Carbs (g)",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "carbs",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.carbs,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "number",
            propValue: carbs,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "protein",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Protein (g)",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "protein",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.protein,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "number",
            propValue: protein,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "fat",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Fat (g)",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "fat",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.fat,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "number",
            propValue: fat,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "fiber",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Fiber (g)",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "fiber",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.fiber,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "number",
            propValue: fiber,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "photoURL",
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "form-group mealIngrdntInputs",
            label: "Photo URL",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "photoURL",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: valErrors.ingredient.photoURL,
            inputClasses: "form-control",
            isRequired: false,
            recordLoaded: recordLoaded,
            excludeLabel: false,
            inputTypeForHtml: "url",
            propValue: photoURL,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
    </div>
  );
};

export default NewIngrdntMacrosSubForm;
