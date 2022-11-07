import React, { useState, useEffect } from "react";
import SelectSearchListWCreateNew from "./SelectSearchListWCreateNew.component";
import FormControl from "./FormControl.component";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import CustomHeading from "./CustomHeading.component";
const IngrdntFormCtrlAndKeyFldsSubForm = (props) => {
  const {
    thisRecordId,
    getRndIntegerFn,
    currentGRFUser,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
    trimEnteredValueFn,
    validatePropFn,
    backEndHtmlRoot,
    onCreateNewRecordFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    thisStateObjBackup,
  } = props;
  const backupOfRecordToChange = thisStateObjBackup.thisRecord
    ? thisStateObjBackup.thisRecord.genRecipeIngredient.ingredient
    : {};
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            ingredient: {
              _id: null,
              photoURL: "",
              unitOfMeasure: null,
              weightType: null,
              brand: null,
              calories: 1,
              carbs: 1,
              protein: 1,
              fat: 1,
              fiber: 1,
            },
          },
          meal: {
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
        },
        recordChanged: false,
        justCreated: { ingredient: false },
        recordLoaded: false,
        userType: "viewer",
        editingForm: { ingredient: false },
        valErrors: { ingredient: [] },
        recordLoaded: false,
        ingrdntHasConnectedRecords: false,
      };
  const {
    thisRecord,
    justCreated,
    recordChanged,
    userType,
    editingForm,
    valErrors,
    arrayIndex,
    recordLoaded,
    ingrdntHasConnectedRecords,
  } = thisStateObj;
  const meal = thisRecord.meal;
  const { day, mealType } = meal;
  const { photoURL, unitOfMeasure, weightType, brand, name } =
    thisRecord.genRecipeIngredient.ingredient;
  const typeOfRecordToChange = "ingredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const saveDisabled =
    (userType.ingredient === "author" || userType.ingredient === "admin") &&
    editingForm.ingredient
      ? false
      : true;
  const fieldsDisabled = !editingForm.ingredient ? true : false;
  const deleteWarning =
    "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?";
  const saveWarning =
    "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?";
  const deleteChildrenWarning =
    "You cannot delete this Base Ingredient until all connected Recipe Ingredients have been disconnected from it.";
  const [localName, updateNameStateFn] = useState(name);
  const [nameHasDup, toggleNameHasDupStateFn] = useState(true);
  const [localSaveDisabled, toggleSaveDisabledStateFn] = useState(saveDisabled);
  const [nameValError, updateNameValErrorStateFn] = useState(
    valErrors ? valErrors.ingredient.name : null
  );
  function handleCreateNewUOMWghtTypOrBrndFn(
    newRecordName,
    typeOfRecordToCreate
  ) {
    const newRecordToSave = {
      name: newRecordName,
      GRFUser: currentGRFUser._id,
    };
    const newRecordForState = {
      _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
      name: newRecordName,
      GRFUser: currentGRFUser,
    };
    onCreateNewRecordFn(
      typeOfRecordToChange,
      typeOfRecordToCreate,
      "reactSelect",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newRecordForState,
      newRecordToSave
    );
  }
  useEffect(() => {
    if (nameHasDup || nameValError) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  return (
    <div className="ingrdntFrmHdr">
      <CustomHeading
        key={`custonBaseIngrdntHeadingFor${typeOfRecordToChange}${thisRecordId}`}
        headingLvl={6}
        recordLoaded={recordLoaded}
        headingText="Base Ingredient"
        hdngIsReqFormLbl={false}
        editingForm={editingForm}
        headingClasses="ingrdntHdr"
      />
      <FormControl
        key={`FormCtrlFor${typeOfRecordToChange}${thisRecordId}`}
        typeOfRecordToChange={typeOfRecordToChange}
        recordChanged={recordChanged.ingredient}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        arrayIndex={arrayIndex}
        userType={userType}
        editingForm={editingForm.ingredient}
        saveDisabled={localSaveDisabled}
        hasChildren={ingrdntHasConnectedRecords}
        saveWarning={saveWarning}
        deleteWarning={deleteWarning}
        deleteChildrenWarning={deleteChildrenWarning}
        recordLoaded={recordLoaded}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        onClickCopyFn={() => {}}
      />
      <SelectSearchListWCreateNew
        key={`SlctSrchLstWCreateForUOMFor${typeOfRecordToChange}${thisRecordId}`}
        options={allUnitOfMeasures}
        recordToSelect={unitOfMeasure}
        typeOfRecordToChange={"ingredient"}
        propNameSentenceCase={"UOM"}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"unitOfMeasure"}
        propType={"reactSelect"}
        arrayIndex={arrayIndex}
        currentGRFUser={currentGRFUser}
        inputClasses={"recipeSelect"}
        formGroupClasses="form-group mealIngrdntInputs ingrdntUOM"
        fieldDisabled={fieldsDisabled}
        valErrors={valErrors.ingredient.unitOfMeasure}
        validatePropFn={validatePropFn}
        onUpdatePropFn={onUpdatePropFn}
        onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
        trimEnteredValueFn={trimEnteredValueFn}
        isRequired={true}
        recordLoaded={recordLoaded}
        label="UOM"
        getRndIntegerFn={getRndIntegerFn}
      />
      <SelectSearchListWCreateNew
        key={`SlctSrchLstWCreateForWghtTypeFor${typeOfRecordToChange}${thisRecordId}`}
        options={allWeightTypes}
        recordToSelect={weightType}
        typeOfRecordToChange={"ingredient"}
        propNameSentenceCase={"Weight Type"}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"weightType"}
        propType={"reactSelect"}
        arrayIndex={arrayIndex}
        currentGRFUser={currentGRFUser}
        inputClasses={"recipeSelect"}
        formGroupClasses="form-group mealIngrdntInputs ingrdntWghtType"
        fieldDisabled={fieldsDisabled}
        valErrors={valErrors.ingredient.weightType}
        validatePropFn={validatePropFn}
        onUpdatePropFn={onUpdatePropFn}
        onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
        trimEnteredValueFn={trimEnteredValueFn}
        isRequired={false}
        recordLoaded={recordLoaded}
        getRndIntegerFn={getRndIntegerFn}
      />

      <div
        className="ingrdntPicDiv"
        style={
          !photoURL
            ? {
                backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
              }
            : {
                backgroundImage: `url(${photoURL})`,
              }
        }
      ></div>
      <SelectSearchListWCreateNew
        key={`SlctSrchLstWCreateForBrandFor${typeOfRecordToChange}${thisRecordId}`}
        options={allBrands}
        recordToSelect={brand}
        typeOfRecordToChange={"ingredient"}
        propNameSentenceCase={"Brand"}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"brand"}
        propType={"reactSelect"}
        arrayIndex={arrayIndex}
        currentGRFUser={currentGRFUser}
        inputClasses={"recipeSelect"}
        formGroupClasses="form-group mealIngrdntInputs ingrdntBrnd"
        fieldDisabled={fieldsDisabled}
        valErrors={valErrors.ingredient.brand}
        validatePropFn={validatePropFn}
        onUpdatePropFn={onUpdatePropFn}
        onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
        trimEnteredValueFn={trimEnteredValueFn}
        isRequired={false}
        recordLoaded={recordLoaded}
        getRndIntegerFn={getRndIntegerFn}
      />

      <InputWLocalStateAndVal
        key={`inputWLclStateNValForNameFor${typeOfRecordToChange}${thisRecordId}`}
        backupOfRecordToChange={backupOfRecordToChange}
        formGroupClasses={
          "form-group mealIngrdntInputs ingrdntName badge bg-primary"
        }
        label={"Ingredient Name"}
        propType="name"
        localPropValue={localName}
        typeOfRecordToChange={typeOfRecordToChange}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate="name"
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={nameValError}
        inputClasses={"form-control"}
        isRequired={true}
        backEndHtmlRoot={backEndHtmlRoot}
        propNameSentenceCase={"Name"}
        validatePropFn={validatePropFn}
        changeLocalPropStateFn={updateNameStateFn}
        togglePropValueHasDupStateFn={toggleNameHasDupStateFn}
        onUpdatePropFn={onUpdatePropFn}
        valErrorUpdateStateFn={updateNameValErrorStateFn}
        getRndIntegerFn={getRndIntegerFn}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
    </div>
  );
};

export default IngrdntFormCtrlAndKeyFldsSubForm;
