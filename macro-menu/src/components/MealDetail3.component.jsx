import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import GenRecipe from "./GenRecipe.component";
import MealIngredientParent from "./MealIngredientParent.component";
import MacrosTable2 from "./MacrosTable2.component";

const MealDetail2 = (props) => {
  const thisMeal = props.thisMeal;
  const mealsIngrdnts = thisMeal.thisMealsIngrdnts;
  const mealFormState = thisMeal.thisMealFormState;
  const genRecipeFormState = thisMeal.thisGenRecipeFormState;
  const mealUserType = thisMeal.thisMealUserType;
  const genRecipeUserType = thisMeal.thisGenRecipeUserType;
  const deleteMsg =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  function renderMealIngrdnts() {
    if (mealsIngrdnts.length > 0 && thisMeal.thisMealJustCreated !== true) {
      return mealsIngrdnts.map((mealIngredient, index) => {
        return (
          // <MealIngredientParent
          //   key={mealIngredient.thisMealIngrdnt._id}
          //   thisMealIngredient={mealIngredient}
          //   allGRFUsers={props.allGRFUsers}
          //   allGenRecipeIngredients={props.allGenRecipeIngredients}
          //   thisRecipesIngrdnts={props.thisRecipesIngrdnts}
          //   allMeals={props.allMeals}
          //   allIngredients={props.allIngredients}
          //   thisMealsTypesRecipes={props.thisMealsTypesRecipes}
          //   allUnitOfMeasures={props.allUnitOfMeasures}
          //   allWeightTypes={props.allWeightTypes}
          //   allBrands={props.allBrands}
          //   updateProp={props.updateProp}
          //   mealIngrdntsArrayIndex={index}
          //   onSubmitFormChange={props.handleSubmitMealIngredientFormChange}
          //   onClickEditMealIngrdntForms={props.onClickEditMealIngrdntForms}
          //   onCancel={props.onCancelEditMealIngrdntForms}
          //   onDelete={props.onDeleteMeal}
          //   deleteMsg={deleteMsg}
          //   defaultMealIngrdntFormsState={defaultFormState}
          //   defaultMealIngrdntsFormsUserType={defaultUserType}
          // />
          <h1>Content</h1>
        );
      });
    } else {
      if (mealUserType === "viewer") {
        return <em>This meal does not have any ingredients...</em>;
      } else {
        if (
          thisMeal.thisRecipesIngrdnts.length < 1 ||
          thisMeal.thisMealJustCreated === true
        ) {
          return <em>This recipe does not have any ingredients...</em>;
        } else {
          if (thisMeal.thisMealJustCreated === true) {
            return;
          } else {
            return (
              <div className="form-group mt-4 mb-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    props.populateNewMealIngredients(
                      props.thisMeal.thisMeal.mealType.code,
                      props.thisMeal.thisMeal.genRecipe._id
                    );
                  }}
                >
                  Populate Ingredients
                </button>
              </div>
            );
          }
        }
      }
    }
  }
  return thisMeal.data === false ? (
    <div className="spinner-border text-primary" role="status"></div>
  ) : (
    <div
      className="accordion accordionNotFlush mealDetailTopAccrdn"
      id={"mealOuterAccordionFull" + props.thisMeal.thisMeal._id}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + props.thisMeal.thisMeal._id}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + props.thisMeal.thisMeal._id}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>
              {props.thisMeal.thisMeal.day.dayOfWeek +
                " " +
                props.thisMeal.thisMeal.mealType.name}
            </h5>
          </button>
        </h2>
      </div>
      <div
        id={"mealOuterAccrdn" + props.thisMeal.thisMeal._id}
        className="accordion-collapse collapse show"
        aria-labelledby={
          "#mealOuterAccordionHeader" + props.thisMeal.thisMeal._id
        }
        data-bs-parent={"#mealOuterAccordionFull" + props.thisMeal.thisMeal._id}
      >
        <div className="macroTblCntnr">
          <MacrosTable2
            key={"MTbleForMeal" + props.thisMeal.thisMeal._id}
            tableType={"Meal Macros"}
            macrosBudget={props.thisMeal.thisMealsMacrosBudget}
            breakfastIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "breakfast"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            snack1Ingrdnts={
              props.thisMeal.thisMeal.mealType.code === "snack1"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            lunchIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "lunch"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            snack2Ingrdnts={
              props.thisMeal.thisMeal.mealType.code === "snack2"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            dinnerIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "dinner"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            dessertIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "dessert"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
          />
        </div>
        <div className="accordion-body wkDaysAccrdnBdy">
          <form className="card mt-3 mb-3">
            <div className="card-header mealCardHeader">
              <div className="mealGenRecipeSctnHdr">
                <h5 className="formSctnTitle">Meal</h5>
                <EditOptions
                  key={"EOptionsForMeal" + props.thisMeal.thisMeal._id}
                  parentObj={props.oldThisMealType}
                  stateObj={"meal"}
                  userType={mealUserType}
                  thisFormState={mealFormState}
                  onSubmitFormChange={props.onSubmitMealFormChange}
                  onClickEdit={handleClickEditMealOrRecipe}
                  recordChanged={props.thisMeal.recordChanged}
                  onCancel={handleCancel}
                  onDelete={props.onDeleteMeal}
                  deleteMsg={deleteMsg}
                />
              </div>
              <div
                className={
                  props.thisMeal.thisMealJustCreated === true
                    ? "mealHeader mealHdrFcsd"
                    : "mealHeader"
                }
              >
                <h5 className="recipeSelectHeader">Recipe:</h5>
                <select
                  // ref="userInput": React prevents this, but I don't know what it does anyway...
                  required
                  className="form-control form-select recipeSelect"
                  value={props.thisMeal.thisMeal.genRecipe._id}
                  disabled={
                    props.thisMeal.thisMealFormState === "viewing"
                      ? true
                      : false
                  }
                  //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                  onChange={(e) =>
                    props.onChangeMealRecipe(
                      props.thisMeal.thisMeal.mealType.code,
                      e
                    )
                  }
                >
                  {props.thisMealTypesGenRecipes.map(function (genRecipe) {
                    return (
                      <option key={genRecipe._id} value={genRecipe._id}>
                        {genRecipe.name}
                      </option>
                    );
                  })}
                </select>
                {props.thisMeal.userChangedThisMealsRecipe === true &&
                props.thisMeal.thisMealJustCreated === false ? (
                  <div
                    className="alert alert-warning recipeWarning"
                    role="alert"
                  >
                    CAUTION: If you save a change to this Meal's Recipe, your
                    meal ingredient custom qtys will be reset.
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body mealCardBody">
              <div
                className="accordion accordion-flush"
                id={"mealAdminAccordionFull" + props.thisMeal.thisMeal._id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={
                      "mealAdminAccordionHeader" + props.thisMeal.thisMeal._id
                    }
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#mealAdminAccrdn" + props.thisMeal.thisMeal._id
                      }
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      disabled={genRecipeUserType === "admin" ? false : true}
                    >
                      {genRecipeUserType === "admin" ? (
                        <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                      )}
                    </button>
                  </h2>
                </div>
                <div
                  id={"mealAdminAccrdn" + props.thisMeal.thisMeal._id}
                  className="accordion-collapse collapse"
                  aria-labelledby={
                    "#mealAdminAccordionHeader" + props.thisMeal.thisMeal._id
                  }
                  data-bs-parent={
                    "#mealAdminAccordionFull" + props.thisMeal.thisMeal._id
                  }
                >
                  <div className="accordion-body mealInnerAccordion">
                    <div className="form-group mealImputs">
                      <label>Day</label>
                      <select
                        // ref="userInput"
                        required
                        className="form-control form-select"
                        value={JSON.stringify(props.thisMeal.thisMeal.day)}
                        disabled={
                          props.thisMeal.thisMealFormState === "viewing"
                            ? true
                            : false
                        }
                        //updateProp = (stateObj, mealType, propToUpdate, arrayIndex, e)
                        onChange={(e) =>
                          props.updateProp(
                            "meal",
                            props.thisMeal.thisMeal.mealType.code,
                            "day",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allDays.map(function (day) {
                          return (
                            <option key={day._id} value={JSON.stringify(day)}>
                              {day.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mealImputs">
                      <label>Meal Type</label>
                      <select
                        // ref="userInput"
                        required
                        className="form-control form-select"
                        value={JSON.stringify(props.thisMeal.thisMeal.mealType)}
                        disabled={
                          props.thisMeal.thisMealFormState == "viewing"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          props.updateProp(
                            "meal",
                            props.thisMeal.thisMeal.mealType.code,
                            "mealType",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allMealTypes.map(function (mealType) {
                          return (
                            <option
                              key={"allMealTypesListItem" + mealType.code}
                              value={JSON.stringify(mealType)}
                            >
                              {mealType.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mealImputs">
                      <label>Record ID</label>
                      <input
                        className="form-control"
                        type="text"
                        value={props.thisMeal.thisMeal._id}
                        disabled={true}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <GenRecipe
            key={thisMeal.thisMeal.genRecipe._id}
            //data objects
            thisMeal={thisMeal}
            allGRFUsers={props.allGRFUsers}
            allMealTypes={props.allMealTypes}
            //methods
            updateProp={props.updateProp}
            onClickEdit={handleClickEditMealOrRecipe}
            onCancel={handleCancel}
          />
          <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
          <div className="mlIngrdntsCntnr">{renderMealIngrdnts()}</div>
        </div>
      </div>
    </div>
  );
};
export default MealDetail2;
