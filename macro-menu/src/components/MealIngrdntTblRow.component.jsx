import React from "react";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";
const MealIngrdntTblRow = (props) => {
  const typeOfRecordToChange = `mealIngredient`;
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    backEndHtmlRoot,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    mode,
  } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
    onCreateNewRecordFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const {
    thisStateObj,
    thisStateObjBackup,
    thisGenRecipe,
    thisGRFUser,
    userChangedThisMealRecipe,
  } = specificData;
  const {} = specificMethods;
  const {
    recordLoaded,
    thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
  } = thisStateObj;
  const { _id, createdAt, updatedAt, qty, genRecipeIngredient } = thisRecord;
  const { defaultQty, ingredient } = genRecipeIngredient;
  const { unitOfMeasure, brand, weightType, name } = ingredient;
  const thisRecordId = _id;
  const saveDisabled = valErrors.mealIngredient.qty.length > 0 ? true : false;
  const fieldsDisabled = !editingForm.mealIngredient ? true : false;
  function inputOnKeyUpFn() {}
  return (
    <>
      <tr className={`sprdshtBrdrdTblTr`}>
        <td>
          <div className={`twoSidedTdDiv`}>
            <NewInputCore
              key={`NewInputCore for qty for mealIngredient ${thisRecordId}`}
              commonProps={{
                commonData: { mode: mode },
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
                  formGroupClasses: "",
                  label: "",
                  thisDayOfWeekCode: thisDayOfWeekCode,
                  thisMealTypeCode: thisMealTypeCode,
                  propToUpdate: "qty",
                  arrayIndex: arrayIndex,
                  fieldDisabled: fieldsDisabled,
                  valErrors: valErrors.mealIngredient.qty,
                  inputClasses: `form-control mlIngrdntQty${
                    mode === `spreadsheet` ? ` sprdshtInput` : ``
                  }`,
                  isRequired: true,
                  recordLoaded: recordLoaded,
                  excludeLabel: true,
                  inputTypeForHtml: "number",
                  propValue: qty,
                  propLineage: `mealIngredient ${thisRecordId}`,
                },
                specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
              }}
            />
            <NewFormControl
              key={`NewFormControl for mealIngredient ${thisRecordId}`}
              commonProps={{
                commonData: { mode: mode },
                commonMethods: {
                  onStartEditingFn: onStartEditingFn,
                  onCancelEditFn: onCancelEditFn,
                  onSaveChangesFn: onSaveChangesFn,
                  onDeleteObjFn: onDeleteObjFn,
                  onCopyWMPFn: () => {},
                },
              }}
              specificProps={{
                specificData: {
                  typeOfRecordToChange: typeOfRecordToChange,
                  recordChanged: recordChanged.mealIngredient,
                  thisDayOfWeekCode: thisDayOfWeekCode,
                  thisMealTypeCode: thisMealTypeCode,
                  arrayIndex: arrayIndex,
                  userType: userType.mealIngredient,
                  editingForm: editingForm.mealIngredient,
                  saveDisabled: saveDisabled,
                  hasChildren: hasChildren.mealIngredient,
                  saveWarning: null,
                  deleteWarning: `Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?`,
                  deleteChildrenWarning: "",
                  recordLoaded: recordLoaded,
                  formControlLineage: `mealIngredient ${thisRecordId}`,
                  formControlClasses: `sprdshtFrmCtrl`,
                  thisRecordId: thisRecordId,
                  justCreated: justCreated.mealIngredient,
                },
                specificMethods: {},
              }}
            />
          </div>
        </td>
        <td>{defaultQty}</td>
        <td>{unitOfMeasure.name}</td>
        <td>{brand ? brand.name : ``}</td>
        <td>{weightType ? weightType.name : ``}</td>
        <td>{name}</td>
      </tr>
    </>
  );
};

export default MealIngrdntTblRow;
