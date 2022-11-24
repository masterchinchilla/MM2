import React, { useState, useEffect } from "react";
import SelectSearchListWCreateNew from "./SelectSearchListWCreateNew.component";
import FormControl from "./FormControl.component";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import CustomHeading from "./CustomHeading.component";
import InputWSearchUniqueNew from "./InputWSearchUniqueNew.component";
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
    localSaveDisabled,
    updateNameValErrorsStateFn,
    nameValErrors,
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
        recordsJustCreated: { ingredient: false },
        recordLoaded: false,
        userType: "viewer",
        editingForm: { ingredient: false },
        valErrors: {
          ingredient: {
            name: [],
            _id: [],
            photoURL: [],
            unitOfMeasure: [],
            weightType: [],
            brand: [],
            calories: [],
            carbs: [],
            protein: [],
            fat: [],
            fiber: [],
          },
        },
        recordLoaded: false,
        ingrdntHasConnectedRecords: false,
      };
  const {
    thisRecord,
    recordsJustCreated,
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
  const fieldsDisabled = !editingForm.ingredient ? true : false;
  const deleteWarning =
    "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?";
  const saveWarning =
    "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?";
  const deleteChildrenWarning =
    "You cannot delete this Base Ingredient until all connected Recipe Ingredients have been disconnected from it.";
  const [localName, updateNameStateFn] = useState(name);
  function handleCreateNewUOMWghtTypOrBrndFn(
    newRecordName,
    typeOfRecordToCreate,
    typeOfRecordToCreateSentenceCase
  ) {
    const newRecord = {
      _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
      name: newRecordName,
      GRFUser: currentGRFUser,
    };
    onCreateNewRecordFn(
      typeOfRecordToChange,
      typeOfRecordToCreate,
      typeOfRecordToCreateSentenceCase,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newRecord,
      []
    );
  }
  function handleClickCancelFn() {
    updateNameStateFn(backupOfRecordToChange.name);
    onClickCancelFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex
    );
  }
  return (
    <div className="ingrdntFrmHdr">
      <CustomHeading
        key={`custonBaseIngrdntHeadingFor${typeOfRecordToChange}${thisRecordId}`}
        headingLvl={6}
        recordLoaded={recordLoaded}
        headingText="Base Ingredient"
        hdngIsReqFormLbl={false}
        editingForm={editingForm.ingredient}
        headingClasses="ingrdntHdr"
      />
      <FormControl
        key={`FormCtrlFor${typeOfRecordToChange}${thisRecordId}`}
        typeOfRecordToChange={typeOfRecordToChange}
        recordChanged={recordChanged.ingredient}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        arrayIndex={arrayIndex}
        userType={userType.ingredient}
        editingForm={editingForm.ingredient}
        saveDisabled={localSaveDisabled}
        hasChildren={ingrdntHasConnectedRecords}
        saveWarning={saveWarning}
        deleteWarning={deleteWarning}
        deleteChildrenWarning={deleteChildrenWarning}
        recordLoaded={recordLoaded}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={handleClickCancelFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        onClickCopyFn={() => {}}
      />
      <SelectSearchListWCreateNew
        key={`SlctSrchLstWCreateForUOMFor${typeOfRecordToChange}${thisRecordId}`}
        options={allUnitOfMeasures}
        recordToSelect={unitOfMeasure}
        typeOfRecordToChange={typeOfRecordToChange}
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
        typeOfRecordToChange={typeOfRecordToChange}
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
        typeOfRecordToChange={typeOfRecordToChange}
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
      <InputWSearchUniqueNew
        key={`inputWSrchUniqueForNameFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs ingrdntName badge bg-primary"
        label="Ingredient Name"
        propType="name"
        localPropValue={localName}
        changeLocalPropFn={updateNameStateFn}
        origPropValue={
          backupOfRecordToChange ? backupOfRecordToChange.name : ""
        }
        typeOfRecordToChange={typeOfRecordToChange}
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate="name"
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        inputClasses="form-control"
        isRequired={true}
        backEndHtmlRoot={backEndHtmlRoot}
        propNameSentenceCase="Name"
        valErrors={nameValErrors}
        changeParentPropFn={onUpdatePropFn}
        getRndIntegerFn={getRndIntegerFn}
        recordLoaded={recordLoaded}
        thisRecordId={thisRecordId}
        trimEnteredValueFn={trimEnteredValueFn}
        excludeLabel={false}
        validatePropFn={validatePropFn}
        updatePropValErrorsStateFn={updateNameValErrorsStateFn}
      />
      {/* <InputWLocalStateAndVal
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
        valErrors={nameValErrors}
        inputClasses={"form-control"}
        isRequired={true}
        backEndHtmlRoot={backEndHtmlRoot}
        propNameSentenceCase={"Name"}
        validatePropFn={validatePropFn}
        changeLocalPropStateFn={updateNameStateFn}
        togglePropValueHasDupStateFn={toggleNameHasDupStateFn}
        onUpdatePropFn={onUpdatePropFn}
        valErrorUpdateStateFn={updateNameValErrorsStateFn}
        getRndIntegerFn={getRndIntegerFn}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      /> */}
    </div>
  );
};

export default IngrdntFormCtrlAndKeyFldsSubForm;
