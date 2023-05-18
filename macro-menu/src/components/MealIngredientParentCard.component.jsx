import React from "react";
import MealIngredientChildForm from "./MealIngredientChildForm.component";
import NewGenRecipeIngredientForm from "./NewGenRecipeIngredientForm.component";
import NewIngredientForm from "./NewIngredientForm.component";
const MealIngredientParentCard = (props) => {
  const typeOfRecordToChange = "mealIngredient";
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
  const { _id, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id;
  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIngrdntCrdBttmSctn">
        <MealIngredientChildForm
          key={`MealIngredientChildForm for mealIngredient ${thisRecordId}`}
          commonProps={{
            commonData: {
              backEndHtmlRoot: backEndHtmlRoot,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
            },
            commonMethods: {
              getRndIntegerFn: getRndIntegerFn,
              returnElementKey: returnElementKey,
              onUpdatePropFn: onUpdatePropFn,
              onSaveChangesFn: onSaveChangesFn,
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onDeleteObjFn: onDeleteObjFn,
              trimEnteredValueFn: trimEnteredValueFn,
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisStateObj,
              thisStateObjBackup: thisStateObjBackup,
              userChangedThisMealRecipe: userChangedThisMealRecipe,
            },
            specificMethods: {},
          }}
        />
        <NewGenRecipeIngredientForm
          key={`NewGenRecipeIngredientForm for mealIngredient ${thisRecordId}`}
          commonProps={{
            commonData: {
              backEndHtmlRoot: backEndHtmlRoot,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
            },
            commonMethods: {
              getRndIntegerFn: getRndIntegerFn,
              returnElementKey: returnElementKey,
              onUpdatePropFn: onUpdatePropFn,
              onSaveChangesFn: onSaveChangesFn,
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              trimEnteredValueFn: trimEnteredValueFn,
              onCreateNewRecordFn: onCreateNewRecordFn,
              onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisStateObj,
              thisStateObjBackup: thisStateObjBackup,
              thisGenRecipe: thisGenRecipe,
            },
            specificMethods: {},
          }}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <NewIngredientForm
          key={`NewIngredientForm for mealIngredient ${thisRecordId}`}
          commonProps={{
            commonData: {
              backEndHtmlRoot: backEndHtmlRoot,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
              allUnitOfMeasures: allUnitOfMeasures,
              allWeightTypes: allWeightTypes,
              allBrands: allBrands,
            },
            commonMethods: {
              getRndIntegerFn: getRndIntegerFn,
              returnElementKey: returnElementKey,
              onUpdatePropFn: onUpdatePropFn,
              onSaveChangesFn: onSaveChangesFn,
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              trimEnteredValueFn: trimEnteredValueFn,
              onCreateNewRecordFn: onCreateNewRecordFn,
              onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisStateObj,
              thisStateObjBackup: thisStateObjBackup,
              thisGRFUser: thisGRFUser,
              userChangedThisMealRecipe: userChangedThisMealRecipe,
            },
            specificMethods: {},
          }}
        />
      </div>
    </div>
  );
};

export default MealIngredientParentCard;
