import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import FormControl from "./FormControl.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const MealChildCard = (props) => {
  const {
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
  } = props;
  const thisStateObj = props.thisStateObj.userType
    ? props.thisStateObj
    : {
        recordChanged: false,
        thisRecord: {
          _id: null,
          day: { dayOfWeek: null },
          mealType: null,
          createdAt: null,
          updatedAt: null,
        },
        userType: "",
        editingForm: false,
        thisMealsIngrdnts: [],
        thisMealJustCreated: false,
        userChangedThisMealsRecipe: false,
      };
  const {
    recordChanged,
    thisRecord,
    userType,
    editingForm,
    thisMealsIngrdnts,
    thisMealJustCreated,
    userChangedThisMealsRecipe,
  } = thisStateObj;
  const { _id, day, mealType, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "meal";
  const thisDayOfWeekCode = day.dayOfWeek ? day.dayOfWeek.code : "";
  const thisMealTypeCode = mealType ? mealType.code : "";
  const arrayIndex = 0;
  const saveDisabled =
    (userType === "author" || userType === "admin") && editingForm
      ? false
      : true;
  const hasChildren = thisMealsIngrdnts.length > 0 ? true : false;
  const saveWarning = null;
  const deleteWarning =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  const deleteChildrenWarning =
    "You must delete all this meals's ingredients before you can delete this meal";
  return (
    <form className="card mt-3 mb-3">
      <div className="card-header mealCardHeader">
        <div className="mealGenRecipeSctnHdr">
          <h5 className="formSctnTitle">Meal</h5>
          <FormControl
            typeOfRecordToChange={typeOfRecordToChange}
            recordChanged={recordChanged}
            thisDayOfWeekCode={thisDayOfWeekCode}
            thisMealTypeCode={thisMealTypeCode}
            arrayIndex={arrayIndex}
            userType={userType}
            editingForm={editingForm}
            saveDisabled={saveDisabled}
            hasChildren={hasChildren}
            saveWarning={saveWarning}
            deleteWarning={deleteWarning}
            deleteChildrenWarning={deleteChildrenWarning}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            onClickCopyFn={() => {}}
          />
        </div>
        <div
          className={
            thisMealJustCreated
              ? "subCardHeader cardHeaderFocused"
              : "subCardHeader"
          }
        >
          <h5 className="recipeSelectHeader">Recipe:</h5>
          {/* <SelectSearchListWCreate
            required
            objToSelect={thisGenRecipeObj}
            dayOfWeekCode={dayOfWeek.code}
            mealType={thisObj.mealType}
            arrayIndex={0}
            onUpdateProp={onUpdateProp}
            thisFormState={mealFormState}
            objType="meal"
            objTypeToChange="genRecipe"
            options={thisMealTypesRecipes}
            thisGRFUser={thisGRFUser}
            onCreateRecord={onCreateRecord}
            styleClasses="recipeSelect"
          /> */}
          {userChangedThisMealsRecipe && !thisMealJustCreated ? (
            <div className="alert alert-warning recipeWarning" role="alert">
              CAUTION: If you save a change to this Meal's Recipe, your meal
              ingredient custom qtys will be reset.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="card-body mealCardBody">
        <div
          className="accordion accordion-flush"
          id={"mealHiddenAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"mealHiddenAccordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button collapsed mealAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#mealHiddenAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"mealHiddenAccrdn" + thisRecordId}
            className="accordion-collapse collapse"
            aria-labelledby={"#mealHiddenAccordionHeader" + thisRecordId}
            data-bs-parent={"#mealHiddenAccordionFull" + thisRecordId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={
                  createdAt
                    ? dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={
                  updatedAt
                    ? dayjs(updatedAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id ? thisRecordId : null}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealChildCard;
