import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import FormControl from "./FormControl.component";
import InputCore from "./InputCore.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
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
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
          qty: 1,
          genRecipeIngredient: null,
        },
        justCreated: { mealIngredient: false },
        arrayIndex: 0,
        recordLoaded: false,
        recordChanged: false,
        userType: { mealIngredient: null },
        editingForm: { mealIngredient: false },
        valErrors: { mealIngredient: { qty: null } },
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
    editingForm.meal
      ? false
      : true;
  const deleteWarning =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  const fieldsDisabled = !editingForm.genRecipeIngredient ? true : false;
  const mealIngrdntValErrors = valErrors.mealIngredient;
  return (
    <form className="mlIngrdntFrm">
      <div className="mlIngrdntFrmHdr">
        <h6 className="mlIngrdntHdr doubleHeightLabel">
          {editingForm.genRecipeIngredient ? (
            <span className="requiredFldLbl">* </span>
          ) : null}
          Qty
        </h6>
        <FormControl
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm.genRecipeIngredient}
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
          formGroupClasses=""
          label=""
          propType="float"
          inputTypeForHtml="number"
          propValue={qty ? qty : 1}
          onUpdatePropFn={onUpdatePropFn}
          inputOnKeyUpFn={() => {}}
          typeOfRecordToChange="mealIngredient"
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate={"qty"}
          arrayIndex={arrayIndex}
          selectedFrom={[]}
          fieldDisabled={!editingForm.genRecipeIngredient ? true : false}
          valError={mealIngrdntValErrors.qty ? mealIngrdntValErrors.qty : null}
          inputClasses="form-control mlIngrdntQty"
          isRequired={true}
          recordLoaded={recordLoaded}
          excludeLabel={true}
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
              <h6 className="mealIngrdntHdr">Custom Ingredient</h6>
              <ReadOnlyInputCore
                key={`readOnlyInputForRecipeIngrdntForMealIngrdnt${thisRecordId}`}
                formGroupClasses={"ingrdntFrmGrpWBttmPddng"}
                label="Recipe Ingredient "
                inputClasses="form-control"
                propType="text"
                propValue={
                  genRecipeIngredient
                    ? genRecipeIngredient.ingredient.name
                    : null
                }
                recordLoaded={recordLoaded}
              />
            </div>
            <ReadOnlyInputCore
              key={`readOnlyInputForMealForMealIngrdnt${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Meal "
              inputClasses="form-control"
              propType="text"
              propValue={meal ? `${meal.day.name} ${meal.mealType.name}` : null}
              recordLoaded={recordLoaded}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForCreatedDtForMealIngrdnt${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
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
              key={`readOnlyInputForUpdatedDtForMealIngrdnt${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
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
              key={`readOnlyInputForIdForMealIngrdnt${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Record ID "
              inputClasses="form-control"
              propType="text"
              propValue={_id ? thisRecordId : null}
              recordLoaded={recordLoaded}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealIngredientForm;
