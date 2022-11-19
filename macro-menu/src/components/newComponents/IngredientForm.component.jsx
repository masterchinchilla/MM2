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
              photoURL: "",
            },
          },
          meal: {
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
        },
        justCreated: { ingredient: false },
        valErrors: {
          ingredient: {
            name: [],
            calories: [],
            carbs: [],
            protein: [],
            fat: [],
            fiber: [],
            photoURL: [],
          },
        },
      };
  const { justCreated, valErrors, thisRecord, arrayIndex } = thisStateObj;
  const meal = thisRecord.meal;
  const { day, mealType } = meal;
  const { _id, photoURL } = thisRecord.genRecipeIngredient.ingredient;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "ingredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors ? valErrors.ingredient.name : []
  );
  const [localSaveDisabled, toggleSaveDisabledStateFn] = useState(true);
  useEffect(() => {
    let photoURLValErrors = photoURL ? valErrors.ingredient.photoURL : [];
    if (
      nameValErrors.length > 0 ||
      photoURLValErrors.length > 0 ||
      valErrors.ingredient.calories.length > 0 ||
      valErrors.ingredient.carbs.length > 0 ||
      valErrors.ingredient.protein.length > 0 ||
      valErrors.ingredient.fat.length > 0 ||
      valErrors.ingredient.fiber.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  function handleClickCancelFn() {
    updateNameValErrorsStateFn([]);
    onClickCancelFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex
    );
  }
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
        onClickCancelFn={handleClickCancelFn}
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
        localSaveDisabled={localSaveDisabled}
        nameValErrors={nameValErrors}
        updateNameValErrorsStateFn={updateNameValErrorsStateFn}
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
            getRndIntegerFn={getRndIntegerFn}
          />
          <IngrdntDisabledFieldsSubForm
            key={`IngrdntDisabledFieldsSubFormFor${typeOfRecordToChange}${thisRecordId}`}
            thisRecordId={thisRecordId}
            thisStateObj={thisStateObj}
          />
        </div>
      </div>
    </form>
  );
};

export default IngredientForm;
