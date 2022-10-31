import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import InputCore from "./InputCore.component";
import SelectSearchListWCreateNew from "./SelectSearchListWCreateNew.component";
import FormControl from "./FormControl.component";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const IngredientForm = (props) => {
  const {
    getRndIntegerFn,
    currentGRFUser,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
    trimEnteredValueFn,
    validatePropFn,
    notifyFn,
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
  } = thisStateObj;
  const meal = thisRecord.meal;
  const { day, mealType } = meal;
  const {
    _id,
    photoURL,
    unitOfMeasure,
    weightType,
    brand,
    name,
    calories,
    carbs,
    protein,
    fat,
    fiber,
    GRFUser,
    createdAt,
    updatedAt,
  } = thisRecord.genRecipeIngredient.ingredient;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "ingredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const saveDisabled =
    (userType.ingredient === "author" || userType.ingredient === "admin") &&
    editingForm.ingredient
      ? false
      : true;
  const fieldsDisabled = !editingForm.ingredient ? true : false;
  const ingrdntValErrors = valErrors.ingredient;
  const deleteWarning =
    "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?";
  const saveWarning =
    "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?";
  const thisRecordChanged = recordChanged.ingredient;
  const [ingrdntHasConnectedRecords, updateingrdntHasConnectedRecords] =
    useState(true);
  const [localRecordChanged, updateLocalRecordChangedStateFn] =
    useState(thisRecordChanged);
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
  return (
    <form
      className={
        justCreated.ingredient
          ? "ingrdntFrm subCardHeaderFocused"
          : "ingrdntFrm"
      }
    >
      <div className="ingrdntFrmHdr">
        <h6 className="ingrdntHdr">Base Ingredient</h6>
        <FormControl
          key={`FormCtrlForGenRecipeIngrdnt${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm.ingredient}
          saveDisabled={saveDisabled}
          hasChildren={false}
          saveWarning={saveWarning}
          deleteWarning={deleteWarning}
          deleteChildrenWarning={null}
          recordLoaded={recordLoaded}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onClickCopyFn={() => {}}
        />
        <SelectSearchListWCreateNew
          key={`SlctSrchLstWCreateForUOMForIngrdnt${thisRecordId}`}
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
          fieldDisabled={!editingForm.ingredient}
          valErrors={ingrdntValErrors.unitOfMeasure}
          validatePropFn={validatePropFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
          trimEnteredValueFn={trimEnteredValueFn}
          isRequired={true}
          recordLoaded={recordLoaded}
          label="UOM"
        />
        <SelectSearchListWCreateNew
          key={`SlctSrchLstWCreateForWghtTypeForIngrdnt${thisRecordId}`}
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
          fieldDisabled={!editingForm.ingredient}
          valErrors={ingrdntValErrors.weightType}
          validatePropFn={validatePropFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
          trimEnteredValueFn={trimEnteredValueFn}
          isRequired={false}
          recordLoaded={recordLoaded}
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
          key={`SlctSrchLstWCreateForBrandForIngrdnt${thisRecordId}`}
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
          fieldDisabled={!editingForm.ingredient}
          valErrors={ingrdntValErrors.brand}
          validatePropFn={validatePropFn}
          onUpdatePropFn={onUpdatePropFn}
          onCreateNewRecordFn={handleCreateNewUOMWghtTypOrBrndFn}
          trimEnteredValueFn={trimEnteredValueFn}
          isRequired={false}
          recordLoaded={recordLoaded}
        />
      </div>
      <InputWLocalStateAndVal
        key={`inputWLclStateNValForNameForIngrdnt${thisRecordId}`}
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
        validateProp={nameValError}
        changeLocalPropStateFn={updateNameStateFn}
        togglePropValueHasDupStateFn={toggleNameHasDupStateFn}
        onUpdatePropFn={onUpdatePropFn}
        valErrorUpdateStateFn={updateNameValErrorStateFn}
        getRndIntegerFn={getRndIntegerFn}
        recordLoaded={recordLoaded}
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
          <div className="accordion-body ingrdntInnrAccrdn">
            <InputCore
              key={`inputForCalsForIngrdnt${thisRecordId}`}
              formGroupClasses="form-group mealIngrdntInputs"
              label="Calories"
              propType="float"
              inputTypeForHtml={"number"}
              propValue={calories}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"calories"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.calories
                  ? valErrors.ingredient.calories
                  : null
              }
              inputClasses="form-control"
              isRequired={true}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <InputCore
              key={`inputForCarbsForIngrdnt${thisRecordId}`}
              formGroupClasses="form-group mealIngrdntInputs"
              label="Carbs"
              propType="float"
              inputTypeForHtml={"number"}
              propValue={carbs}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"carbs"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.carbs ? valErrors.ingredient.carbs : null
              }
              inputClasses="form-control"
              isRequired={true}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <InputCore
              key={`inputForProteinForIngrdnt${thisRecordId}`}
              formGroupClasses="form-group mealIngrdntInputs"
              label="Protein"
              propType="float"
              inputTypeForHtml={"number"}
              propValue={protein}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"protein"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.protein
                  ? valErrors.ingredient.protein
                  : null
              }
              inputClasses="form-control"
              isRequired={true}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <InputCore
              key={`inputForFatForIngrdnt${thisRecordId}`}
              formGroupClasses="form-group mealIngrdntInputs"
              label="Fat"
              propType="float"
              inputTypeForHtml={"number"}
              propValue={fat}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"fat"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.fat ? valErrors.ingredient.fat : null
              }
              inputClasses="form-control"
              isRequired={true}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <InputCore
              key={`inputForFiberForIngrdnt${thisRecordId}`}
              formGroupClasses="form-group mealIngrdntInputs"
              label="Fiber"
              propType="float"
              inputTypeForHtml={"number"}
              propValue={fiber}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"fiber"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.fiber ? valErrors.ingredient.fiber : null
              }
              inputClasses="form-control"
              isRequired={true}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <InputCore
              formGroupClasses="form-group mealIngrdntInputs"
              label="Photo URL"
              propType="url"
              inputTypeForHtml={"url"}
              propValue={photoURL ? photoURL : ""}
              onUpdatePropFn={onUpdatePropFn}
              inputOnKeyUpFn={() => {}}
              recordToChange="ingredient"
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              propToUpdate={"photoURL"}
              arrayIndex={arrayIndex}
              selectedFrom={[]}
              fieldDisabled={fieldsDisabled}
              valError={
                valErrors.ingredient.photoURL
                  ? valErrors.ingredient.photoURL
                  : null
              }
              inputClasses="form-control"
              isRequired={false}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
          </div>
          <div
            className="accordion accordion-flush ingrdntAdminMenu"
            id={"ingrdntAdminMenuAccrdnFull" + thisRecordId}
          >
            <div className="accordion-item genRecipeAdminMenuBttn">
              <h2
                className="accordion-header"
                id={"ingrdntAdminMenuAccrdnHdr" + thisRecordId}
              >
                <button
                  className="accordion-button collapsed mealAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#ingrdntAdminMenuAccrdnBdy" + thisRecordId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"ingrdntAdminMenuAccrdnBdy" + thisRecordId}
              className="accordion-collapse collapse"
              aria-labelledby={"#ingrdntAdminMenuAccrdnHdr" + thisRecordId}
              data-bs-parent={"#ingrdntAdminMenuAccrdnFull" + thisRecordId}
            >
              <div className="accordion-body ingrdntInnerAccrdn">
                <ReadOnlyInputCore
                  key={`readOnlyInputForAuthorForIngrdnt${thisRecordId}`}
                  formGroupClasses={"form-group mealIngrdntInputs"}
                  label="Author "
                  inputClasses="form-control"
                  propType="text"
                  propValue={GRFUser ? GRFUser.handle : ""}
                  recordLoaded={recordLoaded}
                />
                <div className="accordion-body ingrdntInnerAccrdn">
                  <ReadOnlyInputCore
                    key={`readOnlyInputForCreatedForIngrdnt${thisRecordId}`}
                    formGroupClasses={"form-group mealIngrdntInputs"}
                    label="Created "
                    inputClasses="form-control"
                    propType="text"
                    propValue={
                      createdAt
                        ? dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")
                        : null
                    }
                    recordLoaded={recordLoaded}
                  />
                  <ReadOnlyInputCore
                    key={`readOnlyInputForUpdatedForIngrdnt${thisRecordId}`}
                    formGroupClasses={"form-group mealIngrdntInputs"}
                    label="Last Update "
                    inputClasses="form-control"
                    propType="text"
                    propValue={
                      updatedAt
                        ? dayjs(updatedAt).format("dddd, MMMM D, YYYY h:mm A")
                        : null
                    }
                    recordLoaded={recordLoaded}
                  />
                  <ReadOnlyInputCore
                    key={`readOnlyInputForIdForIngrdnt${thisRecordId}`}
                    formGroupClasses={"form-group mealIngrdntInputs"}
                    label="Record ID "
                    inputClasses="form-control"
                    propType="text"
                    propValue={_id ? _id : thisRecordId}
                    recordLoaded={recordLoaded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default IngredientForm;
