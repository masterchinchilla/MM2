import React, { useState } from "react";
import CustomHeading from "../CustomHeading.component";
import NewFormControl from "./NewFormControl.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
const NewIngrdntFormCtrlAndKeyFldsSubForm = (props) => {
  const typeOfRecordToChange = "ingredient";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot, thisDayOfWeekCode, thisMealTypeCode } = commonData;
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
  const { thisStateObj, thisStateObjBackup, nameValErrors, saveDisabled } =
    specificData;
  const { updateNameValErrorsStateFn } = specificMethods;
  const {
    recordLoaded,
    // thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
    arrayIndex,
  } = thisStateObj;
  const thisRecord = thisStateObj.thisRecord.genRecipeIngredient.ingredient;
  const { _id, createdAt, updatedAt, name, photoURL } = thisRecord;
  const thisRecordId = _id;
  const fieldsDisabled = editingForm.ingredient ? false : true;
  const [localName, updateNameStateFn] = useState(name);
  //   console.log(thisStateObjBackup);
  //   const origName = "";
  const origName = thisStateObjBackup.thisRecord
    ? thisStateObjBackup.thisRecord.genRecipeIngredient.ingredient.name
    : name;
  function handleCreateNewRecordFn(typeOfRecordToCreate, newName) {
    onCreateNewRecordFn(
      typeOfRecordToCreate,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newName
    );
  }
  function handleCancelEditFn() {
    updateNameStateFn(origName);
    onCancelEditFn();
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
      <NewFormControl
        key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
        commonProps={{
          commonData: {},
          commonMethods: {
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: handleCancelEditFn,
            onSaveChangesFn: onSaveChangesFn,
            onDeleteObjFn: onDeleteObjFn,
            onCopyWMPFn: () => {},
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            recordChanged: recordChanged.ingredient,
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            arrayIndex: arrayIndex,
            userType: userType.ingredient,
            editingForm: editingForm.ingredient,
            saveDisabled: saveDisabled,
            hasChildren: hasChildren.ingredient,
            saveWarning:
              "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?",
            deleteWarning:
              "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?",
            deleteChildrenWarning:
              "You cannot delete this Base Ingredient until all connected Recipe Ingredients have been disconnected from it.",
            recordLoaded: recordLoaded,
          },
          specificMethods: {},
        }}
      />
      Empty SlctSrchLstWCreateForUOM
      <br />
      {/* <SelectSearchListWCreateNew
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
      /> */}
      Empty SlctSrchLstWCreateForWghtType
      <br />
      {/* <SelectSearchListWCreateNew
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
      /> */}
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
      Empty SlctSrchLstWCreateForBrand
      {/* <SelectSearchListWCreateNew
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
      /> */}
      {/* <InputWSearchUniqueNew
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
      /> */}
      <NewInputWSearchUniqueNew
        commonProps={{
          commonData: { backEndHtmlRoot: backEndHtmlRoot },
          commonMethods: {
            onUpdatePropFn: onUpdatePropFn,
            returnElementKey: returnElementKey,
            getRndIntegerFn: getRndIntegerFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses:
              "form-group mealIngrdntInputs ingrdntName badge bg-primary",
            label: "Name",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: "name",
            arrayIndex: arrayIndex,
            fieldDisabled: fieldsDisabled,
            valErrors: nameValErrors,
            inputClasses: "form-control",
            isRequired: true,
            recordLoaded: recordLoaded,
            propNameSentenceCase: "Name",
            localPropValue: localName,
            origPropValue: origName,
          },
          specificMethods: {
            changeLocalPropFn: updateNameStateFn,
            updatePropValErrorsStateFn: updateNameValErrorsStateFn,
          },
        }}
      />
    </div>
  );
};

export default NewIngrdntFormCtrlAndKeyFldsSubForm;
