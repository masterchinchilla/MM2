import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealIngredientChild = (props) => {
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  const thisMealIngrdntObj = props.thisMealIngrdntObj;
  const thisObj = props.thisObj;

  const thisDayOfWeekCode = thisObj.meal.day.dayOfWeek.code;
  const thisObjId = thisObj._id;
  const thisMealTypeCode = thisObj.meal.mealType.code;
  const userType = props.userType;
  // const userType = "admin";
  const thisFormState = props.thisFormState;
  // const thisFormState = "editingOrig";
  const recordChanged = thisMealIngrdntObj.mealIngrdntRecordChanged;
  const thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  const thisMealTypesMeals = props.thisMealTypesMeals;
  let deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="mlIngrdntFrm">
      <div className="mlIngrdntFrmHdr">
        <label className="mlIngrdntHdr doubleHeightLabel">
          <h6>Qty</h6>
        </label>
        <EditOptions
          className="mlIngrdntFrmIcns"
          parentObj={thisMealIngrdntObj}
          objType={"mealIngredient"}
          key={"mealIngrdntEditOptns" + thisObjId}
          userType={userType}
          thisFormState={thisFormState}
          recordChanged={recordChanged}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
          deleteMsg={deleteMsg}
        />
        <input
          type={"number"}
          className="form-control mlIngrdntQty"
          value={thisObj.qty}
          onChange={(e) =>
            props.onUpdateProp(
              "mealIngredient",
              thisDayOfWeekCode,
              thisMealTypeCode,
              "qty",
              mealIngrdntsArrayIndex,
              "number",
              e
            )
          }
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"mlIngrdntFrmAccrdnFll" + thisObjId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"mlIngrdntFrmAccrdnHdr" + thisObjId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#mlIngrdntFrmAccrdn" + thisObjId}
              aria-expanded="true"
              aria-controls="collapseOne"
              disabled={userType === "admin" ? false : true}
            >
              {userType === "admin" ? (
                <FontAwesomeIcon icon="fa-solid fa-lock-open" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-lock" />
              )}
            </button>
          </h2>
        </div>
        <div
          id={"mlIngrdntFrmAccrdn" + thisObjId}
          className="accordion-collapse collapse"
          aria-labelledby={"#mlIngrdntFrmAccrdnHdr" + thisObjId}
          data-bs-parent={"#mlIngrdntFrmAccrdnFll" + thisObjId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <h6 className="mealIngrdntHdr">Custom Ingredient</h6>
              <label>Recipe Ingredient</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(thisObj.genRecipeIngredient)}
                disabled={thisFormState === "viewing" ? true : false}
                //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                onChange={(e) => {
                  props.onUpdateProp(
                    "mealIngredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "genRecipeIngredient",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  );
                }}
              >
                {thisRecipesIngrdnts.map(function (genRecipeIngredient) {
                  return (
                    <option
                      key={genRecipeIngredient._id}
                      value={JSON.stringify(genRecipeIngredient)}
                    >
                      {genRecipeIngredient.ingredient.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Meal</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(thisObj.meal)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.onUpdateProp(
                    "mealIngredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "meal",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  )
                }
              >
                {thisMealTypesMeals.map(function (meal) {
                  return (
                    <option key={meal._id} value={JSON.stringify(meal)}>
                      {meal.day.name + " - " + meal.mealType.name}
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

export default MealIngredientChild;
