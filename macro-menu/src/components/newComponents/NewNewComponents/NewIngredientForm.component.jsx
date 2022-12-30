import React, { useState, useEffect } from "react";
import NewIngrdntFormCtrlAndKeyFldsSubForm from "./NewIngrdntFormCtrlAndKeyFldsSubForm.component";

const NewIngredientForm = (props) => {
  const typeOfRecordToChange = "ingredient";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot } = commonData;
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
  } = commonMethods;
  const {
    thisStateObj,
    thisStateObjBackup,
    thisGRFUser,
    thisDayOfWeekCode,
    thisMealTypeCode,
  } = specificData;
  //   thisStateObj.recordLoaded = false;
  if (!thisStateObj.recordLoaded) {
    thisStateObj.thisRecord.genRecipeIngredient.ingredient = {
      name: "",
      _id: getRndIntegerFn(10000000, 99999999),
      createdAt: "",
      updatedAt: "",
      calories: 0.0,
      carbs: 0.0,
      protein: 0.0,
      fat: 0.0,
      fiber: 0.0,
      unitOfMeasure: {
        name: "",
        _id: getRndIntegerFn(10000000, 99999999),
        createdAt: "",
        updatedAt: "",
        GRFUser: thisGRFUser,
      },
      weightType: {
        name: "",
        _id: getRndIntegerFn(10000000, 99999999),
        createdAt: "",
        updatedAt: "",
        GRFUser: thisGRFUser,
      },
      photoURL: "",
      GRFUser: thisGRFUser,
      brand: {
        name: "",
        _id: getRndIntegerFn(10000000, 99999999),
        createdAt: "",
        updatedAt: "",
        GRFUser: thisGRFUser,
      },
    };
    thisStateObj.valErrors.ingredient = {
      _id: [],
      createdAt: [],
      updatedAt: [],
      name: [],
      calories: [],
      carbs: [],
      protein: [],
      fat: [],
      fiber: [],
      unitOfMeasure: [],
      weightType: [],
      photoURL: [],
      GRFUser: [],
      brand: [],
    };
  }
  //   console.log(thisStateObj);
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
  const { _id, createdAt, updatedAt, photoURL } = thisRecord;
  const thisRecordId = _id;
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors.ingredient.name
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
  function handleCancelEditFn() {
    updateNameValErrorsStateFn([]);
    onCancelEditFn();
  }
  return (
    <form
      className={
        justCreated.ingredient
          ? "ingrdntFrm subCardHeaderFocused"
          : "ingrdntFrm"
      }
    >
      <NewIngrdntFormCtrlAndKeyFldsSubForm
        commonProps={{
          commonData: {
            backEndHtmlRoot: backEndHtmlRoot,
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: handleCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            trimEnteredValueFn: trimEnteredValueFn,
            onCreateNewRecordFn: onCreateNewRecordFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisStateObj,
            thisStateObjBackup: thisStateObjBackup,
            nameValErrors: nameValErrors,
            saveDisabled: localSaveDisabled,
          },
          specificMethods: {
            updateNameValErrorsStateFn: updateNameValErrorsStateFn,
          },
        }}
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
          <br />
          Empty IngrdntMacrosSubForm
          {/* <IngrdntMacrosSubForm
            key={`ingrdntMacrosSubFormFor${typeOfRecordToChange}${thisRecordId}`}
            thisRecordId={thisRecordId}
            onUpdatePropFn={onUpdatePropFn}
            // thisStateObj={thisStateObj}
            getRndIntegerFn={getRndIntegerFn}
          /> */}
          <br />
          Empty IngrdntDisabledFieldsSubForm
          {/* <IngrdntDisabledFieldsSubForm
            key={`IngrdntDisabledFieldsSubFormFor${typeOfRecordToChange}${thisRecordId}`}
            thisRecordId={thisRecordId}
            // thisStateObj={thisStateObj}
          /> */}
        </div>
      </div>
    </form>
  );
};

export default NewIngredientForm;
