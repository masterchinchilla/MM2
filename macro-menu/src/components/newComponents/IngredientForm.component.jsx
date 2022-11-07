import React, { useState, useEffect } from "react";
import IngrdntDisabledFieldsSubForm from "./IngrdntDisabledFieldsSubForm.component";
import IngrdntFormCtrlAndKeyFldsSubForm from "./IngrdntFormCtrlAndKeyFldsSubForm.component";
import IngrdntMacrosSubForm from "./IngrdntMacrosSubForm.component";

const IngredientForm = (props) => {
  const {
    getRndIntegerFn,
    onUpdatePropFn,
    currentGRFUser,
    backEndHtmlRoot,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    trimEnteredValueFn,
    onClickDeleteFn,
    validatePropFn,
    onCreateNewRecordFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    thisStateObjBackup,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            ingredient: {
              _id: null,
            },
          },
        },
        justCreated: { ingredient: false },
      };
  const { justCreated } = thisStateObj;
  const thisRecord = thisStateObj.thisRecord.genRecipeIngredient.ingredient;
  const { _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "ingredient";
  return (
    <form
      className={
        justCreated.ingredient
          ? "ingrdntFrm subCardHeaderFocused"
          : "ingrdntFrm"
      }
    >
      <IngrdntFormCtrlAndKeyFldsSubForm
        key={`ingrdntFormCtrlAndKeyFldsSubFormFor${typeOfRecordToChange}${thisRecordId}`}
        thisRecordId={thisRecordId}
        thisStateObj={thisStateObj}
        getRndIntegerFn={getRndIntegerFn}
        currentGRFUser={currentGRFUser}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        onUpdatePropFn={onUpdatePropFn}
        trimEnteredValueFn={trimEnteredValueFn}
        validatePropFn={validatePropFn}
        backEndHtmlRoot={backEndHtmlRoot}
        onCreateNewRecordFn={onCreateNewRecordFn}
        allUnitOfMeasures={allUnitOfMeasures}
        allWeightTypes={allWeightTypes}
        allBrands={allBrands}
        thisStateObjBackup={thisStateObjBackup}
      />
      <div
        className="accordion accordion-flush"
        id={"ingrdntAccrdnFull" + thisRecordId}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"ingrdntAccrdnHdr" + thisRecordId}
          >
            <button
              className={
                justCreated.ingredient
                  ? "accordion-button mealInnerAccrdnBttn open"
                  : "accordion-button mealInnerAccrdnBttn collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAccrdnBdy" + thisRecordId}
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAccrdnBdy" + thisRecordId}
          className={
            justCreated.ingredient
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#ingrdntAccrdnHdr" + thisRecordId}
          data-bs-parent={"#ingrdntAccrdnFull" + thisRecordId}
        >
          <IngrdntMacrosSubForm
            key={`ingrdntMacrosSubFormFor${typeOfRecordToChange}${thisRecordId}`}
            thisRecordId={thisRecordId}
            onUpdatePropFn={onUpdatePropFn}
            thisStateObj={thisStateObj}
          />
          <IngrdntDisabledFieldsSubForm
            key={`IngrdntDisabledFieldsSubFormFor${typeOfRecordToChange}${thisRecordId}`}
            thisRecordId={thisRecordId}
            thisStateObj={thisStateObj}
            getRndIntegerFn={getRndIntegerFn}
          />
        </div>
      </div>
    </form>
  );
};

export default IngredientForm;
