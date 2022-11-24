import React, { useState, useEffect } from "react";
import FormControl from "./FormControl.component";
import InputCore from "./InputCore.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import AsyncSearchSelectWCreateNew from "./AsyncSearchSelectWCreateNew.component";
import CustomHeading from "./CustomHeading.component";
const GenRecipeIngredientForm = (props) => {
  const {
    currentGRFUser,
    defaultIngredient,
    getRndIntegerFn,
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
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            _id: null,
            defaultQty: 1,
            genRecipe: { name: "" },
            ingredient: { name: "" },
          },
          meal: {
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
        },
        recordsJustCreated: { genRecipeIngredient: false },
        arrayIndex: 0,
        recordLoaded: false,
        recordChanged: false,
        userType: { genRecipeIngredient: null },
        editingForm: { genRecipeIngredient: false },
        valErrors: {
          genRecipeIngredient: { defaultQty: [], ingredient: [] },
        },
      };
  const {
    thisRecord,
    recordLoaded,
    recordChanged,
    arrayIndex,
    userType,
    editingForm,
    valErrors,
    recordsJustCreated,
  } = thisStateObj;
  const { meal, genRecipeIngredient } = thisRecord;
  const { day, mealType } = meal;
  const { _id, defaultQty, genRecipe, ingredient, createdAt, updatedAt } =
    genRecipeIngredient;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "genRecipeIngredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const fieldsDisabled = !editingForm.genRecipeIngredient ? true : false;
  const deleteWarning =
    "If you delete this ingredient from the Recipe, it will be removed everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  const saveWarning =
    "Changes made to this Recipe Ingredient will be applied everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  function handleCreateNewIngredientFn(newIngredientName) {
    defaultIngredient.name = newIngredientName;
    onCreateNewRecordFn(
      typeOfRecordToChange,
      "ingredient",
      "Ingredient",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      defaultIngredient,
      []
    );
  }
  const [localSaveDisabled, toggleSaveDisabledStateFn] = useState(true);
  useEffect(() => {
    if (
      valErrors.genRecipeIngredient.defaultQty.length > 0 ||
      valErrors.genRecipeIngredient.ingredient.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  return (
    <form className="gnRcpIngrdntFrm">
      <div className="gnRcpIngrdntFrmHdr">
        <CustomHeading
          key={`custonDfltQtyHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={6}
          recordLoaded={recordLoaded}
          headingText="Default Qty"
          hdngIsReqFormLbl={true}
          editingForm={editingForm.genRecipeIngredient}
          headingClasses="gnRcpIngrdntHdr doubleHeightLabel"
        />
        <FormControl
          key={`FormCtrlForGenRecipeIngrdnt${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged.genRecipeIngredient}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType.genRecipeIngredient}
          editingForm={editingForm.genRecipeIngredient}
          saveDisabled={localSaveDisabled}
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
        <InputCore
          key={`inputForDfltQtyForGenRecipeIngrdnt${thisRecordId}`}
          formGroupClasses=""
          label=""
          propType="float"
          inputTypeForHtml="number"
          propValue={defaultQty}
          onUpdatePropFn={onUpdatePropFn}
          inputOnKeyUpFn={() => {}}
          typeOfRecordToChange="genRecipeIngredient"
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate={"defaultQty"}
          arrayIndex={arrayIndex}
          selectedFrom={[]}
          fieldDisabled={fieldsDisabled}
          valErrors={valErrors.genRecipeIngredient.defaultQty}
          inputClasses="form-control mlIngrdntQty"
          isRequired={true}
          recordLoaded={recordLoaded}
          excludeLabel={true}
          getRndIntegerFn={getRndIntegerFn}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#gnRcpIngrdntFrmAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisRecordId}
          className={
            recordsJustCreated.genRecipeIngredient
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <div
              className={
                recordsJustCreated.genRecipeIngredient
                  ? "form-group mealIngrdntInputs subCardHeaderFocused"
                  : "form-group mealIngrdntInputs"
              }
            >
              <CustomHeading
                key={`custonRecipeIngrdntHeadingFor${typeOfRecordToChange}${thisRecordId}`}
                headingLvl={6}
                recordLoaded={recordLoaded}
                headingText="Recipe Ingredient"
                hdngIsReqFormLbl={true}
                editingForm={editingForm.genRecipeIngredient}
                headingClasses="genRecipeIngrdntHdr"
              />
              <AsyncSearchSelectWCreateNew
                key={`AsyncSrchSlctWCrtNewForIngrdntFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses=""
                typeOfRecordToChange={"genRecipeIngredient"}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                recordToSelect={ingredient}
                propType={"reactSelect"}
                propToUpdateSentenceCase={"Ingredient"}
                propToUpdate={"ingredient"}
                trimEnteredValueFn={trimEnteredValueFn}
                fetchDataUrl={`${backEndHtmlRoot}ingredients/ingredientsByName`}
                validatePropFn={validatePropFn}
                valErrors={valErrors.genRecipeIngredient.ingredient}
                notifyFn={notifyFn}
                onUpdatePropFn={onUpdatePropFn}
                onCreateNewRecordFn={handleCreateNewIngredientFn}
                fieldDisabled={fieldsDisabled}
                inputClasses={""}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                isRequired={true}
                getRndIntegerFn={getRndIntegerFn}
              />
            </div>
            <ReadOnlyInputCore
              key={`readOnlyInputForRecipeFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Recipe "
              inputClasses="form-control"
              propType="text"
              propValue={genRecipe.name}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForCreatedDtFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Created "
              inputClasses="form-control"
              propType="text"
              propValue={createdAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForUpdatedDtFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Last Update "
              inputClasses="form-control"
              propType="text"
              propValue={updatedAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForIdFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Record ID "
              inputClasses="form-control"
              propType="text"
              propValue={_id}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default GenRecipeIngredientForm;
