import React from "react";
import GenRecipeIngredientForm from "./GenRecipeIngredientForm.component";
import IngredientForm from "./IngredientForm.component";
import MealIngredientForm from "./MealIngredientForm.component";
const MealIngredientCard = (props) => {
  const {
    currentGRFUser,
    arrayIndex,
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    thisStateObjBackup,
    defaultIngredient,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
    onCreateNewRecordFn,
    getRndIntegerFn,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: { _id: null },
      };
  const { thisRecord } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "mealIngredient";
  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIgrdntCrdTpSctn">
        <MealIngredientForm
          key={`mealIngrdntFormFor${typeOfRecordToChange}${thisRecordId}`}
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          validatePropFn={validatePropFn}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
        />
        <GenRecipeIngredientForm
          key={`genRecipeIngrdntFormFor${typeOfRecordToChange}${thisRecordId}`}
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          defaultIngredient={defaultIngredient}
          validatePropFn={validatePropFn}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
          trimEnteredValueFn={trimEnteredValueFn}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <IngredientForm
          key={`ingrdntFormFor${typeOfRecordToChange}${thisRecordId}`}
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          validatePropFn={validatePropFn}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
          trimEnteredValueFn={trimEnteredValueFn}
        />
      </div>
    </div>
  );
};

export default MealIngredientCard;
