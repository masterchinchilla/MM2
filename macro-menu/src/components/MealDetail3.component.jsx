import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import GenRecipe from "./GenRecipe.component";
import MealIngredientParent from "./MealIngredientParent.component";
import MacrosTable2 from "./MacrosTable2.component";

const MealDetail3 = (props) => {
  const thisStateObj = props.thisStateObj;
  const recordChanged = thisStateObj.mealRecordChanged;
  const thisMealJustCreated = thisStateObj.thisMealJustCreated;
  const thisObj = thisStateObj.thisMeal;
  const dayOfWeek = thisObj.day.dayOfWeek;
  const thisMealTypeCode = thisObj.mealType.code;
  const thisObjId = thisObj._id;
  const mealsIngrdnts = thisStateObj.thisMealsIngrdnts;
  const nestedMealIngrdntArray = [mealsIngrdnts];
  const thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  const thisMealTypesRecipes = props.thisMealTypesRecipes;
  const thisMealWeight = props.thisMealWeight;
  const mealFormState = thisStateObj.thisMealFormState;
  // const mealFormState = "editingOrig";
  const mealUserType = thisStateObj.thisMealUserType;
  // const mealUserType = "admin";
  const deleteMsg =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  function renderMealIngrdnts() {
    if (mealsIngrdnts.length > 0 && thisStateObj.thisMealJustCreated !== true) {
      return mealsIngrdnts.map((mealIngredient, index) => {
        mealIngredient.mealIngrdntsArrayIndex = index;

        return (
          <MealIngredientParent
            //Specific Props
            //Data
            key={"mealIngrdntParent" + mealIngredient.thisMealIngrdnt._id}
            thisMealTypesRecipes={props.thisMealTypesRecipes}
            //Methods

            //Common Props
            //Data
            thisMealIngrdntObj={mealIngredient}
            mealIngrdntsArrayIndex={index}
            allGRFUsers={props.allGRFUsers}
            allGenRecipeIngredients={props.allGenRecipeIngredients}
            thisRecipesIngrdnts={thisRecipesIngrdnts}
            thisMealTypesMeals={props.thisMealTypesMeals}
            allIngredients={props.allIngredients}
            allUnitOfMeasures={props.allUnitOfMeasures}
            allWeightTypes={props.allWeightTypes}
            allBrands={props.allBrands}
            //Methods
            onClickEditForm={props.onClickEditForm}
            onCancelEditForm={props.onCancelEditForm}
            onSaveFormChanges={props.onSaveFormChanges}
            onDeleteRecord={props.onDeleteRecord}
            onUpdateProp={props.onUpdateProp}
          />
        );
      });
    } else {
      if (mealUserType === "viewer") {
        return (
          <div className="alert alert-secondary" role="alert">
            This meal does not have any ingredients...
          </div>
        );
      } else {
        if (
          thisStateObj.thisRecipesIngrdnts.length < 1 ||
          thisMealJustCreated === true
        ) {
          return (
            <div className="alert alert-secondary" role="alert">
              This Recipe does not have any ingredients...
            </div>
          );
        } else {
          if (thisMealJustCreated === true) {
            return;
          } else {
            return (
              <div className="form-group mt-4 mb-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    props.populateNewMealIngredients(
                      thisObj.thisGenRecipeUserType,
                      dayOfWeek.code,
                      thisMealTypeCode,
                      thisObj.genRecipe
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
  return thisStateObj.dataLoaded === false ? (
    <div className="spinner-border text-primary" role="status"></div>
  ) : (
    <div
      className="accordion accordionNotFlush mealDetailTopAccrdn"
      id={"mealOuterAccordionFull" + thisObjId}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + thisObjId}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + thisObjId}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>{thisObj.day.dayOfWeek.name + " " + thisObj.mealType.name}</h5>
          </button>
        </h2>
      </div>
      <div
        id={"mealOuterAccrdn" + thisObjId}
        className="accordion-collapse collapse show"
        aria-labelledby={"#mealOuterAccordionHeader" + thisObjId}
        data-bs-parent={"#mealOuterAccordionFull" + thisObjId}
      >
        <div className="macroTblCntnr">
          <MacrosTable2
            key={"MTbleForMeal" + thisObjId}
            thisMealWeight={thisMealWeight}
            tableType={"Meal Macros"}
            macrosBudget={props.macrosBudget}
            theseIngrdnts={nestedMealIngrdntArray}
          />
        </div>
        <div className="accordion-body wkDaysAccrdnBdy">
          <form className="card mt-3 mb-3">
            <div className="card-header mealCardHeader">
              <div className="mealGenRecipeSctnHdr">
                <h5 className="formSctnTitle">Meal</h5>
                <EditOptions
                  key={"EOptionsForMeal" + thisObjId}
                  parentObj={thisStateObj}
                  objType={"meal"}
                  userType={mealUserType}
                  thisFormState={mealFormState}
                  onSaveFormChanges={props.onSaveFormChanges}
                  onClickEditForm={props.onClickEditForm}
                  onCancelEditForm={props.onCancelEditForm}
                  onDeleteRecord={props.onDeleteRecord}
                  recordChanged={recordChanged}
                  deleteMsg={deleteMsg}
                />
              </div>
              <div
                className={
                  thisStateObj.thisMealJustCreated === true
                    ? "mealHeader mealHdrFcsd"
                    : "mealHeader"
                }
              >
                <h5 className="recipeSelectHeader">Recipe:</h5>
                <select
                  // ref="userInput": React prevents this, but I don't know what it does anyway...
                  required
                  className="form-control form-select recipeSelect"
                  value={JSON.stringify(thisObj.genRecipe)}
                  disabled={mealFormState === "viewing" ? true : false}
                  //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                  //onUpdateProp = (stateObj, dayOfWeekCode, mealTypeCode, propToUpdate, arrayIndex, e)
                  onChange={(e) =>
                    props.onUpdateProp(
                      "meal",
                      dayOfWeek.code,
                      thisMealTypeCode,
                      "genRecipe",
                      0,
                      "select",
                      e
                    )
                  }
                >
                  {thisMealTypesRecipes.map((genRecipe) => {
                    return (
                      <option
                        key={genRecipe._id}
                        value={JSON.stringify(genRecipe)}
                      >
                        {genRecipe.name}
                      </option>
                    );
                  })}
                </select>
                {thisStateObj.userChangedThisMealsRecipe === true &&
                thisMealJustCreated === false ? (
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
                id={"mealAdminAccordionFull" + thisObjId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"mealAdminAccordionHeader" + thisObjId}
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#mealAdminAccrdn" + thisObjId}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      disabled={mealUserType === "admin" ? false : true}
                    >
                      {mealUserType === "admin" ? (
                        <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                      )}
                    </button>
                  </h2>
                </div>
                <div
                  id={"mealAdminAccrdn" + thisObjId}
                  className="accordion-collapse collapse"
                  aria-labelledby={"#mealAdminAccordionHeader" + thisObjId}
                  data-bs-parent={"#mealAdminAccordionFull" + thisObjId}
                >
                  <div className="accordion-body mealInnerAccordion">
                    <div className="form-group mealImputs">
                      <label>Day</label>
                      <select
                        // ref="userInput"
                        required
                        className="form-control form-select"
                        value={JSON.stringify(thisObj.thisDay)}
                        disabled={mealFormState === "viewing" ? true : false}
                        //onUpdateProp = (stateObj, dayOfWeekCode, mealTypeCode, propToUpdate, arrayIndex, e)
                        onChange={(e) =>
                          props.onUpdateProp(
                            "meal",
                            dayOfWeek.code,
                            thisMealTypeCode,
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
                        value={JSON.stringify(thisObj.mealType)}
                        disabled={mealFormState == "viewing" ? true : false}
                        onChange={(e) =>
                          props.onUpdateProp(
                            "meal",
                            dayOfWeek.code,
                            thisMealTypeCode,
                            "mealType",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.mealTypes.map(function (mealType) {
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
                        value={thisObjId}
                        disabled={true}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <GenRecipe
            //Specific props
            key={thisObj.genRecipe._id}
            mealStateObj={thisStateObj}
            thisMealTypesRecipes={thisMealTypesRecipes}
            //Common Props
            //Data
            allGRFUsers={props.allGRFUsers}
            mealTypes={props.mealTypes}
            //Methods
            onClickEditForm={props.onClickEditForm}
            onCancelEditForm={props.onCancelEditForm}
            onSaveFormChanges={props.onSaveFormChanges}
            onDeleteRecord={props.onDeleteRecord}
            onUpdateProp={props.onUpdateProp}
          />
          <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
          <div className="mlIngrdntsCntnr">{renderMealIngrdnts()}</div>
        </div>
      </div>
    </div>
  );
};
export default MealDetail3;
