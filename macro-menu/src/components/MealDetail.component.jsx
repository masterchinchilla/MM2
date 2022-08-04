import React, { Component } from "react";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import GenRecipe from "./GenRecipe.component";
import MealIngredientParent from "./MealIngredientParent.component";
import MacrosTable from "./MacrosTable.component";
import SelectSearchListWCreate from "./SelectSearchListWCreate.component";

const MealDetail = (props) => {
  const thisStateObj = props.thisStateObj;
  const thisGRFUser = props.thisGRFUser;
  const userCanEditRecipe =
    thisStateObj.thisGenRecipeUserType === "author" ||
    thisStateObj.thisGenRecipeUserType === "admin"
      ? true
      : false;
  const recordChanged = thisStateObj.mealRecordChanged;
  const thisMealJustCreated = thisStateObj.thisMealJustCreated;
  const thisObj = thisStateObj.thisMeal;
  const thisGenRecipeObj = thisObj.genRecipe;
  const dayOfWeek = thisObj.day.dayOfWeek;
  const thisMealTypeCode = thisObj.mealType.code;
  const thisObjId = thisObj._id;
  const mealsIngrdnts = thisStateObj.thisMealsIngrdnts;

  const nestedMealIngrdntArray = [mealsIngrdnts];
  const thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  let allowPopulateIngrdnts =
    mealsIngrdnts.length < 1 && thisRecipesIngrdnts > 0 ? true : false;
  const thisMealTypesRecipes = props.thisMealTypesRecipes;
  const thisMealWeight = props.thisMealWeight;
  const mealFormState = thisStateObj.thisMealFormState;
  const mealUserType = thisStateObj.thisMealUserType;
  const defaultIngredient = {
    _id: "627b329721ff100fa01edcaf",
    name: "",
    calories: 0.0,
    carbs: 0.0,
    protein: 0.0,
    fat: 0.0,
    fiber: 0.0,
    unitOfMeasure: "627691779fa56aa1fe318390",
    GRFUser: "62577a533813f4f21c27e1c7",
  };
  const deleteMsg =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  function renderMealIngrdnts() {
    if (mealsIngrdnts.length > 0) {
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
            thisGRFUser={thisGRFUser}
            thisMealIngrdntObj={mealIngredient}
            mealIngrdntsArrayIndex={index}
            // allGRFUsers={props.allGRFUsers}
            allGenRecipeIngredients={props.allGenRecipeIngredients}
            thisRecipesIngrdnts={thisRecipesIngrdnts}
            // thisMealTypesMeals={props.thisMealTypesMeals}
            // allIngredients={props.allIngredients}
            allUnitOfMeasures={props.allUnitOfMeasures}
            allWeightTypes={props.allWeightTypes}
            allBrands={props.allBrands}
            //Methods
            onClickEditForm={props.onClickEditForm}
            onCancelEditForm={props.onCancelEditForm}
            onSaveFormChanges={props.onSaveFormChanges}
            onDeleteRecord={props.onDeleteRecord}
            onUpdateProp={props.onUpdateProp}
            onCreateRecord={props.onCreateRecord}
          />
        );
      });
    } else {
      if (thisStateObj.mealUserType === "viewer") {
        return (
          <div className="alert alert-secondary" role="alert">
            This meal does not have any ingredients...
          </div>
        );
      } else {
        if (thisRecipesIngrdnts.length > 0) {
          return (
            <div className="form-group mt-4 mb-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  props.populateNewMealIngredients(
                    thisStateObj.thisGenRecipeUserType,
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
        } else {
          return (
            <div className="alert alert-secondary" role="alert">
              This Recipe does not have any ingredients...
            </div>
          );
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
          <MacrosTable
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
                    ? "subCardHeader cardHeaderFocused"
                    : "subCardHeader"
                }
              >
                <h5 className="recipeSelectHeader">Recipe:</h5>
                <SelectSearchListWCreate
                  required
                  objToSelect={thisGenRecipeObj}
                  dayOfWeekCode={dayOfWeek.code}
                  mealType={thisObj.mealType}
                  arrayIndex={0}
                  onUpdateProp={props.onUpdateProp}
                  thisFormState={mealFormState}
                  objType="meal"
                  objTypeToChange="genRecipe"
                  options={thisMealTypesRecipes}
                  thisGRFUser={thisGRFUser}
                  onCreateRecord={props.onCreateRecord}
                  styleClasses="recipeSelect"
                />
                {/* <select
                  // ref="userInput": React prevents this, but I don't know what it does anyway...
                  required
                  className="form-control form-select recipeSelect"
                  value={thisObj.genRecipe._id}
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
                      e,
                      thisMealTypesRecipes
                    )
                  }
                >
                  {thisMealTypesRecipes.map((genRecipe) => {
                    return (
                      <option key={genRecipe._id} value={genRecipe._id}>
                        {genRecipe.name}
                      </option>
                    );
                  })}
                </select> */}
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
                id={"mealHiddenAccordionFull" + thisObjId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"mealHiddenAccordionHeader" + thisObjId}
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#mealHiddenAccrdn" + thisObjId}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"mealHiddenAccrdn" + thisObjId}
                  className="accordion-collapse collapse"
                  aria-labelledby={"#mealHiddenAccordionHeader" + thisObjId}
                  data-bs-parent={"#mealHiddenAccordionFull" + thisObjId}
                >
                  <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
                      <label>Record Id</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={true}
                        value={thisObjId}
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
            // allGRFUsers={props.allGRFUsers}
            mealTypes={props.mealTypes}
            //Methods
            onClickEditForm={props.onClickEditForm}
            onCancelEditForm={props.onCancelEditForm}
            onSaveFormChanges={props.onSaveFormChanges}
            onDeleteRecord={props.onDeleteRecord}
            onUpdateProp={props.onUpdateProp}
            httpRouteCore={props.httpRouteCore}
            toggleRecordChanged={props.toggleRecordChanged}
          />
          <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
          <div className="mlIngrdntsCntnr">{renderMealIngrdnts()}</div>
          {userCanEditRecipe === true && allowPopulateIngrdnts === false ? (
            <div className="form-group mt-4 mb-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  props.onCreateRecord(
                    "genRecipeIngredient",
                    dayOfWeek.code,
                    thisMealTypeCode,
                    0,
                    {
                      _id: "",
                      defaultQty: 1,
                      ingredient: defaultIngredient,
                      genRecipe: thisGenRecipeObj,
                    },
                    {
                      defaultQty: 1,
                      ingredient: defaultIngredient._id,
                      genRecipe: thisGenRecipeObj._id,
                    }
                  );
                }}
              >
                Add Ingredient to Your Recipe
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default MealDetail;
