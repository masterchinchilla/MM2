import React, { Component } from "react";
import EditOptions from "./EditOptions.component";
import AsyncSelectList from "./AsyncSelectList.component";
import dayjs from "dayjs";

const GenRecipeIngredient = (props) => {
  const thisMealIngrdntObj = props.thisMealIngrdntObj;
  const thisObj = props.thisObj;
  const thisObjId = thisObj._id;
  const thisMealType = thisObj.genRecipe.availableMealType.code;
  const thisDayOfWeekCode =
    thisMealIngrdntObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  const userType = props.userType;
  const thisFormState = props.thisFormState;
  const recordChanged = thisMealIngrdntObj.genRecipeIngrdntRecordChanged;
  const thisGenRecipeIngrdntJustCreated =
    thisMealIngrdntObj.thisGenRecipeIngrdntJustCreated;
  const thisGRFUser = props.thisGRFUser;
  const deleteMsg =
    "If you delete this ingredient from the Recipe, it will be removed everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  const saveMsg =
    "Changes made to this Recipe Ingredient will be applied everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?";
  return (
    <form className="gnRcpIngrdntFrm">
      <div className="gnRcpIngrdntFrmHdr">
        <label className="gnRcpIngrdntHdr doubleHeightLabel">
          <h6>Default Qty</h6>
        </label>
        <EditOptions
          className="gnRcpIngrdntFrmIcns"
          parentObj={thisMealIngrdntObj}
          objType={"genRecipeIngredient"}
          key={"genRecipeIngrdntEditOptns" + thisObjId}
          userType={userType}
          thisFormState={thisFormState}
          recordChanged={recordChanged}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
          saveMsg={saveMsg}
        />
        <input
          type={"number"}
          className="form-control gnRcpIngrdntQty"
          value={thisObj.defaultQty}
          onChange={(e) =>
            props.onUpdateProp(
              "genRecipeIngredient",
              thisDayOfWeekCode,
              thisMealType,
              "defaultQty",
              mealIngrdntsArrayIndex,
              "number",
              e,
              []
            )
          }
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"gnRcpIngrdntFrmAccrdnFll" + thisObjId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisObjId}
          >
            <button
              className={
                thisGenRecipeIngrdntJustCreated === true
                  ? "accordion-button open mealAdminAccrdnBttn"
                  : "accordion-button collapsed mealAdminAccrdnBttn"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#gnRcpIngrdntFrmAccrdn" + thisObjId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisObjId}
          className={
            thisGenRecipeIngrdntJustCreated === true
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisObjId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisObjId}
        >
          <div className="accordion-body">
            <div
              className={
                thisGenRecipeIngrdntJustCreated === true
                  ? "form-group mealIngrdntInputs subCardHeaderFocused"
                  : "form-group mealIngrdntInputs"
              }
            >
              <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
              <label>Base Ingredient</label>
              <AsyncSelectList
                objToSelect={thisObj.ingredient}
                dayOfWeekCode={thisDayOfWeekCode}
                mealTypeCode={thisMealType}
                arrayIndex={mealIngrdntsArrayIndex}
                onUpdateProp={props.onUpdateProp}
                onCreateRecord={props.onCreateRecord}
                thisFormState={thisFormState}
                className="form-control form-select"
                objType="genRecipeIngredient"
                objTypeToChange="ingredient"
                styleClasses=""
                url="http://localhost:5000/ingredients/ingredientsByName/"
                thisGRFUser={thisGRFUser}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Recipe</label>
              <input
                type={"text"}
                className="form-control"
                value={thisObj.genRecipe.name}
                disabled={true}
                onChange={() => {}}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Created</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                value={dayjs(thisObj.createdAt).format(
                  "dddd, MMMM D, YYYY h:mm A"
                )}
                onChange={() => {}}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Last Update</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                value={dayjs(thisObj.updatedAt).format(
                  "dddd, MMMM D, YYYY h:mm A"
                )}
                onChange={() => {}}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Record ID</label>
              <input
                type={"text"}
                className="form-control"
                value={thisObjId}
                disabled={true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GenRecipeIngredient;
