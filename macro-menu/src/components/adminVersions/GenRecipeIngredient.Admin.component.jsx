import React, { useState, Component } from "react";
import EditOptionsAdmin from "./EditOptions.Admin.component";
import AsyncSearchSelectListWCreate from "../AsyncSearchSelectListWCreate.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GenRecipeIngredientAdmin = (props) => {
  const thisMealIngrdntObj = props.thisMealIngrdntObj;
  const thisObj = props.thisObj;
  const thisObjId = thisObj._id;
  const thisMealType = thisObj.genRecipe.availableMealType.code;
  const thisDayOfWeekCode =
    thisMealIngrdntObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  // const allIngredients = props.allIngredients;
  const thisMealTypesRecipes = props.thisMealTypesRecipes;
  const userType = props.userType;
  // const userType = "admin";
  const thisFormState = props.thisFormState;
  // const thisFormState = "editingOrig";
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
        <EditOptionsAdmin
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
              // className="accordion-button collapsed mealAdminAccrdnBttn"
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
              // className="form-group mealIngrdntInputs"
            >
              <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
              <label>Base Ingredient</label>
              <AsyncSearchSelectListWCreate
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
              {/* <select
                required
                className="form-control form-select"
                value={thisObj.ingredient._id}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.onUpdateProp(
                    "genRecipeIngredient",
                    thisDayOfWeekCode,
                    thisMealType,
                    "ingredient",
                    mealIngrdntsArrayIndex,
                    "select",
                    e,
                    allIngredients
                  )
                }
              >
                {allIngredients.map(function (ingredient) {
                  return (
                    <option key={ingredient._id} value={ingredient._id}>
                      {ingredient.name}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Recipe</label>
              <select
                required
                className="form-control form-select"
                value={thisObj.genRecipe._id}
                disabled={
                  thisFormState === "viewing" && userType === "admin"
                    ? true
                    : false
                }
                onChange={(e) =>
                  props.onUpdateProp(
                    "genRecipeIngredient",
                    thisDayOfWeekCode,
                    thisMealType,
                    "genRecipe",
                    mealIngrdntsArrayIndex,
                    "select",
                    e,
                    thisMealTypesRecipes
                  )
                }
              >
                {thisMealTypesRecipes.map(function (genRecipe) {
                  return (
                    <option key={genRecipe._id} value={genRecipe._id}>
                      {genRecipe.name}
                    </option>
                  );
                })}
              </select>
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

export default GenRecipeIngredientAdmin;
