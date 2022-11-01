import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import FormControl from "./FormControl.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import SelectSearchListWCreateNew from "./SelectSearchListWCreateNew.component";
import AsyncSearchSelectWCreateNew from "./AsyncSearchSelectWCreateNew.component";
const MealChildCard = (props) => {
  const {
    currentGRFUser,
    backEndHtmlRoot,
    notifyFn,
    validatePropFn,
    onUpdatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        recordChanged: { meal: false },
        thisRecord: {
          _id: null,
          day: { dayOfWeek: null },
          genRecipe: { name: null },
          mealType: null,
          createdAt: null,
          updatedAt: null,
        },
        userType: { meal: "" },
        editingForm: { meal: false },
        justCreated: { meal: false },
        thisMealsIngrdnts: [],
        userChangedThisMealsRecipe: false,
        thisRecipesIngrdnts: [],
        valErrors: { genRecipe: { name: null } },
        recordLoaded: false,
      };
  const {
    recordChanged,
    thisRecord,
    userType,
    editingForm,
    justCreated,
    thisMealsIngrdnts,
    userChangedThisMealsRecipe,
    thisRecipesIngrdnts,
    valErrors,
    recordLoaded,
  } = thisStateObj;
  const genRecipeValErrors = valErrors.genRecipe;
  const { _id, day, mealType, genRecipe, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "meal";
  const thisDayOfWeekCode = day.dayOfWeek ? day.dayOfWeek.code : "";
  const thisMealTypeCode = mealType ? mealType.code : "";
  const arrayIndex = 0;
  const saveDisabled =
    (userType.meal === "author" || userType.meal === "admin") &&
    editingForm.meal
      ? false
      : true;
  const hasChildren = thisMealsIngrdnts.length > 0 ? true : false;
  const saveWarning = null;
  const deleteWarning =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  const deleteChildrenWarning =
    "You must delete all this meals's ingredients before you can delete this meal";
  function handleCreateNewRecipeFn(newRecipeName) {
    const newRecordToSave = {
      name: newRecipeName,
      GRFUser: currentGRFUser._id,
      defaultPrepInstructions: "",
      photoURL: "",
      availableMealType: mealType._id,
    };
    const newRecordForState = {
      _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
      name: newRecipeName,
      GRFUser: currentGRFUser,
      defaultPrepInstructions: "",
      photoURL: "",
      availableMealType: mealType,
    };
    onCreateNewRecordFn(
      typeOfRecordToChange,
      "genRecipe",
      "reactSelect",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newRecordForState,
      newRecordToSave
    );
  }
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
            editingForm={editingForm.meal}
            saveDisabled={saveDisabled}
            hasChildren={hasChildren}
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
        </div>
        <div
          className={
            justCreated.meal
              ? "subCardHeader cardHeaderFocused"
              : "subCardHeader"
          }
        >
          <h5 className="recipeSelectHeader">
            {editingForm.meal ? (
              <span className="requiredFldLbl">*</span>
            ) : null}
            Recipe:
          </h5>
          {/* change this into an async search component! */}
          <AsyncSearchSelectWCreateNew
            formGroupClasses=""
            typeOfRecordToChange={"meal"}
            thisDayOfWeekCode={thisDayOfWeekCode}
            thisMealTypeCode={thisMealTypeCode}
            arrayIndex={0}
            recordToSelect={genRecipe}
            propType={"reactSelect"}
            propToUpdateSentenceCase={"Recipe"}
            propToUpdate={"recipe"}
            trimEnteredValueFn={trimEnteredValueFn}
            fetchDataUrl={`${backEndHtmlRoot}genRecipes/findbyname/`}
            validatePropFn={validatePropFn}
            valErrors={genRecipeValErrors}
            notifyFn={notifyFn}
            onUpdatePropFn={onUpdatePropFn}
            onCreateNewRecordFn={handleCreateNewRecipeFn}
            fieldDisabled={!editingForm.meal}
            inputClasses={"recipeSelect"}
            recordLoaded={recordLoaded}
            excludeLabel={true}
            isRequired={true}
          />
          {/* <SelectSearchListWCreateNew
            options={thisRecipesIngrdnts}
            recordToSelect={genRecipe}
            typeOfRecordToChange={"Meal"}
            propNameSentenceCase={"Recipe"}
            thisDayOfWeekCode={thisDayOfWeekCode}
            thisMealTypeCode={thisMealTypeCode}
            propToUpdate={"genRecipe"}
            propType={"reactSelect"}
            arrayIndex={arrayIndex}
            currentGRFUser={currentGRFUser}
            inputClasses={"recipeSelect"}
            formGroupClasses=""
            fieldDisabled={!editingForm.meal}
            valError={genRecipeValErrors.name}
            validatePropFn={validatePropFn}
            onUpdatePropFn={onUpdatePropFn}
            onCreateNewRecordFn={handleCreateNewRecipeFn}
            trimEnteredValueFn={trimEnteredValueFn}
            isRequired={true}
            recordLoaded={recordLoaded}
          /> */}
          {userChangedThisMealsRecipe && !justCreated.meal ? (
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
                recordLoaded={recordLoaded}
                excludeLabel={false}
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
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id ? thisRecordId : null}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealChildCard;
