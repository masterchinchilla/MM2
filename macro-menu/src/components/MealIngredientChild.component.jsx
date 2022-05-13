import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealIngredientChild = (props) => {
  let thisMealIngredient = props.thisMealIngredient;
  let thisMealType = thisMealIngredient.thisMealIngrdnt.meal.mealType.code;
  let thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  let allMeals = props.allMeals;
  let mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  let userType = props.userType;
  let thisFormState = props.thisFormState;
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
          parentObj={thisMealIngredient}
          stateObj={"mealIngredient"}
          key={thisMealIngredient.thisMealIngrdnt._id}
          userType={userType}
          thisFormState={thisFormState}
          onSubmitFormChange={props.onSubmitFormChange}
          onClickEdit={props.onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          deleteMsg={deleteMsg}
        />
        <input
          type={"number"}
          className="form-control mlIngrdntQty"
          value={thisMealIngredient.thisMealIngrdnt.qty}
          onChange={(e) =>
            props.updateProp(
              "mealIngredient",
              thisMealType,
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
        id={"mlIngrdntFrmAccrdnFll" + thisMealIngredient.thisMealIngrdnt._id}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={
              "mlIngrdntFrmAccrdnHdr" + thisMealIngredient.thisMealIngrdnt._id
            }
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={
                "#mlIngrdntFrmAccrdn" + thisMealIngredient.thisMealIngrdnt._id
              }
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
          id={"mlIngrdntFrmAccrdn" + thisMealIngredient.thisMealIngrdnt._id}
          className="accordion-collapse collapse"
          aria-labelledby={
            "#mlIngrdntFrmAccrdnHdr" + thisMealIngredient.thisMealIngrdnt._id
          }
          data-bs-parent={
            "#mlIngrdntFrmAccrdnFll" + thisMealIngredient.thisMealIngrdnt._id
          }
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <h6 className="mealIngrdntHdr">Custom Ingredient</h6>
              <label>Recipe Ingredient</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(
                  thisMealIngredient.thisMealIngrdnt.genRecipeIngredient
                )}
                disabled={thisFormState === "viewing" ? true : false}
                //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                onChange={(e) => {
                  props.updateProp(
                    "mealIngredient",
                    thisMealType,
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
                value={JSON.stringify(thisMealIngredient.thisMealIngrdnt.meal)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  this.props.updateProp(
                    "mealIngredient",
                    thisMealType,
                    "meal",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  )
                }
              >
                {allMeals.map(function (meal) {
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
                value={thisMealIngredient.thisMealIngrdnt._id}
                disabled={true}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealIngredientChild;
