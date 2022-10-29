import React, { useState, useEffect } from "react";
import GenRecipeIngredientForm from "./GenRecipeIngredientForm.component";
import IngredientForm from "./IngredientForm.component";
import MealIngredientForm from "./MealIngredientForm.component";
const MealIngredientCard = (props) => {
  const {
    currentGRFUser,
    thisStateObj,
    arrayIndex,
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    thisStateObjBackup,
    validateProp,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
    onCreateNewRecordFn,
    getRndIntegerFn,
  } = props;
  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIgrdntCrdTpSctn">
        <MealIngredientForm
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          validateProp={validateProp}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecord={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
        />
        <GenRecipeIngredientForm
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          validateProp={validateProp}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecord={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <IngredientForm
          currentGRFUser={currentGRFUser}
          thisStateObj={thisStateObj}
          arrayIndex={arrayIndex}
          backEndHtmlRoot={backEndHtmlRoot}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          thisStateObjBackup={thisStateObjBackup}
          validateProp={validateProp}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecord={onCreateNewRecordFn}
          getRndIntegerFn={getRndIntegerFn}
        />
      </div>
    </div>
  );
};

export default MealIngredientCard;
