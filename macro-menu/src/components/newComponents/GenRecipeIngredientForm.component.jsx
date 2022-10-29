import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import FormControl from "./FormControl.component";
import InputCore from "./InputCore.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const GenRecipeIngredientForm = (props) => {
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
          genRecipeIngredient: {
            _id: null,
            defaultQty: 1,
            genRecipe: null,
          },
          meal: {
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
        },
        justCreated: { genRecipeIngredient: false },
        arrayIndex: 0,
        recordLoaded: false,
        recordChanged: false,
        userType: { genRecipeIngredient: null },
        editingForm: { genRecipeIngredient: false },
        valErrors: { genRecipeIngredient: { defaultQty: null } },
      };
  const {
    thisRecord,
    recordLoaded,
    recordChanged,
    arrayIndex,
    userType,
    editingForm,
    valErrors,
    justCreated,
  } = thisStateObj;
  const { meal, genRecipeIngredient } = thisRecord;
  const { day, mealType } = meal;
  const { _id, defaultQty, genRecipe, createdAt, updatedAt } =
    genRecipeIngredient;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "genRecipeIngredient";
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const saveDisabled =
    (userType.genRecipeIngredient === "author" ||
      userType.genRecipeIngredient === "admin") &&
    editingForm.genRecipeIngredient
      ? false
      : true;
  const fieldsDisabled = !editingForm.genRecipeIngredient ? true : false;
  const genRecipeIngrdntValErrors = valErrors.genRecipeIngredient;
  const deleteWarning =
    "If you delete this ingredient from the Recipe, it will be removed everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  const saveWarning =
    "Changes made to this Recipe Ingredient will be applied everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  return (
    <form className="gnRcpIngrdntFrm">
      <div className="gnRcpIngrdntFrmHdr">
        <h6 className="gnRcpIngrdntHdr doubleHeightLabel">
          {editingForm.genRecipeIngredient ? (
            <span className="requiredFldLbl">* </span>
          ) : null}
          Default Qty
        </h6>
        <FormControl
          key={`FormCtrlForGenRecipeIngrdnt${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm.genRecipeIngredient}
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
        <InputCore
          key={`inputForDfltQtyForGenRecipeIngrdnt${thisRecordId}`}
          formGroupClasses=""
          label=""
          propType="float"
          inputTypeForHtml="number"
          propValue={defaultQty ? defaultQty : 1}
          onUpdatePropFn={onUpdatePropFn}
          inputOnKeyUpFn={() => {}}
          typeOfRecordToChange="mealIngredient"
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate={"qty"}
          arrayIndex={arrayIndex}
          selectedFrom={[]}
          fieldDisabled={!editingForm.genRecipeIngredient ? true : false}
          valError={
            genRecipeIngrdntValErrors.defaultQty
              ? genRecipeIngrdntValErrors.defaultQty
              : null
          }
          inputClasses="form-control mlIngrdntQty"
          isRequired={true}
          recordLoaded={recordLoaded}
          excludeLabel={true}
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
            justCreated.genRecipeIngredient
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <div
              className={
                justCreated.genRecipeIngredient
                  ? "form-group mealIngrdntInputs subCardHeaderFocused"
                  : "form-group mealIngrdntInputs"
              }
            >
              <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
              {/*Async search select list w create*/}
            </div>
            <ReadOnlyInputCore
              key={`readOnlyInputForRecipeForGenRecipeIngrdnt${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Recipe "
              inputClasses="form-control"
              propType="text"
              propValue={genRecipe ? genRecipe.name : null}
              recordLoaded={recordLoaded}
            />
            <ReadOnlyInputCore
              key={`readOnlyInputForCreatedDtForGenRecipeIngrdnt${thisRecordId}`}
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
              key={`readOnlyInputForUpdatedDtForGenRecipeIngrdnt${thisRecordId}`}
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
              key={`readOnlyInputForIdForGenRecipeIngrdnt${thisRecordId}`}
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

export default GenRecipeIngredientForm;
