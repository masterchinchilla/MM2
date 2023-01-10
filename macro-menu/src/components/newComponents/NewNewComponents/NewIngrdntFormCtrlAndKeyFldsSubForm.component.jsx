import React, { useEffect, useState } from "react";
import newRecordTemplates from "../../../staticRefs/newRecordTemplates";
import CustomHeading from "../CustomHeading.component";
import NewFormControl from "./NewFormControl.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
import NewNewSelectSearchListWCreate from "./NewNewSelectSearchListWCreate.component";
const NewIngrdntFormCtrlAndKeyFldsSubForm = (props) => {
  const typeOfRecordToChange = "ingredient";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    backEndHtmlRoot,
    thisDayOfWeekCode,
    thisMealTypeCode,
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
    trimEnteredValueFn,
    onCreateNewRecordFn,
  } = commonMethods;
  const {
    thisStateObj,
    thisStateObjBackup,
    nameValErrors,
    saveDisabled,
    userChangedThisMealRecipe,
  } = specificData;
  const { updateNameValErrorsStateFn } = specificMethods;
  const {
    recordLoaded,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
    arrayIndex,
  } = thisStateObj;
  const thisRecord = thisStateObj.thisRecord.genRecipeIngredient.ingredient;
  const { _id, createdAt, updatedAt, name, photoURL, unitOfMeasure } =
    thisRecord;
  const weightType = thisRecord.weightType
    ? thisRecord.weightType
    : newRecordTemplates.defaultWeightType;
  const brand = thisRecord.brand
    ? thisRecord.brand
    : newRecordTemplates.defaultBrand;
  const thisRecordId = _id;
  const fieldsDisabled = editingForm.ingredient ? false : true;
  const [localName, updateNameStateFn] = useState(name);
  const origName =
    thisStateObjBackup.thisRecord.genRecipeIngredient.ingredient.name;
  // const currentGenRecipe = thisStateObj.thisRecord.meal.genRecipe;
  // const origGenRecipe = thisStateObjBackup.thisRecord.meal.genRecipe;
  function handleCreateNewRecordFn(typeOfRecordToCreate, newName) {
    console.log(
      typeOfRecordToCreate,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newName
    );
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
  useEffect(() => {
    if (!editingForm.ingredient) {
      updateNameStateFn(name);
    }
  });
  return (
    <div
      className={
        justCreated.ingredient
          ? "ingrdntFrmHdr cardHeaderFocused"
          : "ingrdntFrmHdr"
      }
      // className="ingrdntFrmHdr"
    >
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
            onDeleteObjFn: () => {},
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
      <NewNewSelectSearchListWCreate
        commonProps={{
          commonData: {
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            arrayIndex: arrayIndex,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
            onCreateNewRecordFn: handleCreateNewRecordFn,
          },
        }}
        specificProps={{
          specificData: {
            formGroupClasses: "form-group mealIngrdntInputs ingrdntUOM",
            defaultOptions: allUnitOfMeasures,
            valErrors: valErrors.ingredient.unitOfMeasure,
            propToUpdate: "unitOfMeasure",
            selectedRecord: unitOfMeasure,
            label: "UOM",
            excludeLabel: false,
            fieldDisabled: fieldsDisabled,
            isRequired: true,
            inputClasses: "recipeSelect",
            recordLoaded: recordLoaded,
            typeOfRecordToChange: typeOfRecordToChange,
          },
          specificMethods: {},
        }}
      />
      <NewNewSelectSearchListWCreate
        commonProps={{
          commonData: {
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            arrayIndex: arrayIndex,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
            onCreateNewRecordFn: handleCreateNewRecordFn,
          },
        }}
        specificProps={{
          specificData: {
            formGroupClasses: "form-group mealIngrdntInputs ingrdntWghtType",
            defaultOptions: allWeightTypes,
            valErrors: valErrors.ingredient.weightType,
            propToUpdate: "weightType",
            selectedRecord: weightType,
            label: "Weight Type",
            excludeLabel: false,
            fieldDisabled: fieldsDisabled,
            isRequired: false,
            inputClasses: "recipeSelect",
            recordLoaded: recordLoaded,
            typeOfRecordToChange: typeOfRecordToChange,
          },
          specificMethods: {},
        }}
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
      <NewNewSelectSearchListWCreate
        commonProps={{
          commonData: {
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            arrayIndex: arrayIndex,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
            onCreateNewRecordFn: handleCreateNewRecordFn,
          },
        }}
        specificProps={{
          specificData: {
            formGroupClasses: "form-group mealIngrdntInputs ingrdntBrnd",
            defaultOptions: allBrands,
            valErrors: valErrors.ingredient.brand,
            propToUpdate: "brand",
            selectedRecord: brand,
            label: "Brand",
            excludeLabel: false,
            fieldDisabled: fieldsDisabled,
            isRequired: false,
            inputClasses: "recipeSelect",
            recordLoaded: recordLoaded,
            typeOfRecordToChange: typeOfRecordToChange,
          },
          specificMethods: {},
        }}
      />
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
