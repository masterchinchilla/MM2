import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import FormControl from "./FormControl.component";
import InputCore from "./InputCore.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import CustomHeading from "./CustomHeading.component";
const MealIngredientForm = (props) => {
  const {
    getRndIntegerFn,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: null,
          meal: {
            day: { name: "", dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast", name: "" },
          },
          qty: 1,
          genRecipeIngredient: { ingredient: { name: null } },
        },
        justCreated: { mealIngredient: false },
        arrayIndex: 0,
        recordLoaded: false,
        recordChanged: false,
        userType: { mealIngredient: null },
        editingForm: { mealIngredient: false },
        valErrors: { mealIngredient: { qty: [] } },
      };
  const {
    thisRecord,
    recordLoaded,
    recordChanged,
    arrayIndex,
    userType,
    editingForm,
    valErrors,
  } = thisStateObj;
  const { _id, meal, qty, genRecipeIngredient, createdAt, updatedAt } =
    thisRecord;
  const { day, mealType } = meal;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "mealIngredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const saveDisabled =
    (userType.mealIngredient === "author" ||
      userType.mealIngredient === "admin") &&
    editingForm.mealIngredient
      ? false
      : true;
  const deleteWarning =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  const fieldsDisabled = !editingForm.genRecipeIngredient ? true : false;
  return (
    <form className="mlIngrdntFrm">
      <div className="mlIngrdntFrmHdr">
        <CustomHeading
          key={`customQtyHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={6}
          recordLoaded={recordLoaded}
          headingText="Qty"
          hdngIsReqFormLbl={true}
          editingForm={editingForm.mealIngredient}
          headingClasses="mlIngrdntHdr doubleHeightLabel"
        />
        <FormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged.mealIngredient}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType.mealIngredient}
          editingForm={editingForm.mealIngredient}
          saveDisabled={saveDisabled}
          hasChildren={false}
          saveWarning={null}
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
          key={`inputCoreForQtyFor${typeOfRecordToChange}${thisRecordId}`}
          formGroupClasses=""
          label=""
          propType="float"
          inputTypeForHtml="number"
          propValue={qty}
          onUpdatePropFn={onUpdatePropFn}
          inputOnKeyUpFn={() => {}}
          typeOfRecordToChange="mealIngredient"
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate={"qty"}
          arrayIndex={arrayIndex}
          selectedFrom={[]}
          fieldDisabled={fieldsDisabled}
          valErrors={valErrors.mealIngredient.qty}
          inputClasses="form-control mlIngrdntQty"
          isRequired={true}
          recordLoaded={recordLoaded}
          excludeLabel={true}
          getRndIntegerFn={getRndIntegerFn}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"mlIngrdntFrmAccrdnFll" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"mlIngrdntFrmAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#mlIngrdntFrmAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"mlIngrdntFrmAccrdn" + thisRecordId}
          className="accordion-collapse collapse"
          aria-labelledby={"#mlIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#mlIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <CustomHeading
                key={`custonIngrdntHeadingFor${typeOfRecordToChange}${thisRecordId}`}
                headingLvl={6}
                recordLoaded={recordLoaded}
                headingText="Custom Ingredient"
                hdngIsReqFormLbl={false}
                editingForm={editingForm.mealIngredient}
                headingClasses="mealIngrdntHdr"
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForRecipeIngrdntFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"ingrdntFrmGrpWBttmPddng"}
                label="Recipe Ingredient "
                inputClasses="form-control"
                propType="text"
                propValue={genRecipeIngredient.ingredient.name}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
            </div>
            <ReadOnlyInputCore
              key={`readOnlyInputForMealFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Meal "
              inputClasses="form-control"
              propType="text"
              propValue={`${meal.day.name} ${meal.mealType.name}`}
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

export default MealIngredientForm;
