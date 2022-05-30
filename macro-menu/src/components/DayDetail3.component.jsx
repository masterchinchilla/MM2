import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MacrosTable from "./MacrosTable2.component";
import CreateMeal2 from "./CreateMeal2.component";
import MealDetail3 from "./MealDetail3.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
const DayDetail3 = (props) => {
  const thisGRFUser = props.thisGRFUser;
  const thisWMP = props.thisWMP;
  const thisStateObj = props.thisStateObj;
  const daysOfWeek = props.daysOfWeek;
  const mealTypes = props.mealTypes;
  const allWMPs = props.allWMPs;
  const allGenRecipeIngredients = props.thisRecipesIngrdnts;
  const thisObj = thisStateObj.thisDay;
  const thisDaysMeals = thisStateObj.thisDaysMeals;
  const thisObjId = thisObj._id;
  const thisDayOfWeek = thisObj.dayOfWeek;
  const thisFormState = thisStateObj.thisFormState;
  const userType = thisStateObj.userType;
  const recordChanged = thisStateObj.recordChanged;
  const hasChildren = props.hasChildren;
  const deleteChildrenWarning =
    "This Day has Meals connected to it which must be deleted before you can delete the Day.";
  // const userType = "admin";
  const deleteMsg = "Are you sure you want to delete this Day Meal Plan?";
  let breakfastIngrdnts =
    thisStateObj.thisDaysMeals.breakfast.thisMealsIngrdnts;
  let snack1Ingrdnts = thisStateObj.thisDaysMeals.snack1.thisMealsIngrdnts;
  let lunchIngrdnts = thisStateObj.thisDaysMeals.lunch.thisMealsIngrdnts;
  let snack2Ingrdnts = thisStateObj.thisDaysMeals.snack2.thisMealsIngrdnts;
  let dinnerIngrdnts = thisStateObj.thisDaysMeals.dinner.thisMealsIngrdnts;
  let dessertIngrdnts = thisStateObj.thisDaysMeals.dessert.thisMealsIngrdnts;
  const thisDaysMealsIngrdnts = [
    breakfastIngrdnts ? breakfastIngrdnts : [],
    snack1Ingrdnts ? snack1Ingrdnts : [],
    lunchIngrdnts ? lunchIngrdnts : [],
    snack2Ingrdnts ? snack2Ingrdnts : [],
    dinnerIngrdnts ? dinnerIngrdnts : [],
    dessertIngrdnts ? dessertIngrdnts : [],
  ];
  const macrosBudget = {
    cals: thisWMP.calsBudget,
    carbs: thisWMP.carbsBudget,
    protein: thisWMP.proteinBudget,
    fat: thisWMP.fatBudget,
    fiber: thisWMP.fiberBudget,
  };
  const renderMeal = (mealType, arrayIndex) => {
    let pattern = /missing/;
    let thisMealTypeCode = mealType.code;
    let thisMealStateObj = thisDaysMeals[thisMealTypeCode];
    // let mealLoadStatus = thisMealStateObj.dataLoaded;
    // if (mealLoadStatus === false) {
    //   return;
    // } else {
    let thisMealObj = thisMealStateObj.thisMeal;
    let thisMealObjsAuthorsId = thisWMP.GRFUser._id;
    let thisMealObjsId = thisMealObj._id;
    let testResult = pattern.test(thisMealObjsId);
    let thisUser = thisGRFUser;
    let thisUsersId = thisUser._id;
    if (testResult) {
      if (userType === "admin" || thisUsersId === thisMealObjsAuthorsId) {
        return (
          <CreateMeal2
            key={thisMealObjsId}
            thisStateObj={thisMealStateObj}
            onCreateRecord={props.onCreateRecord}
            getRndInteger={props.getRndInteger}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {mealType.name}</span> Meal Plan added to this day...
            </em>
          </div>
        );
      }
    } else {
      let thisMealTypesMeals = props.allMeals.filter(
        (meal) => meal.mealType.code === thisMealTypeCode
      );
      let thisMealTypesRecipes = props.allGenRecipes.filter(
        (genRecipe) => genRecipe.availableMealType.code === thisMealTypeCode
      );
      let thisRecipesIngrdnts = props.allGenRecipeIngredients.filter(
        (genRecipeIngredient) =>
          genRecipeIngredient.genRecipe.availableMealType.code ===
          thisMealTypeCode
      );
      let thisMealWeight = thisWMP[`${mealType.code}Weight`];
      let thisMealsMealIngredients = thisDaysMealsIngrdnts[arrayIndex];
      let mealHasChildren = false;
      thisMealsMealIngredients.length > 0
        ? (mealHasChildren = true)
        : (mealHasChildren = false);
      return (
        <MealDetail3
          //Specific Props
          //Data
          key={thisMealObjsId}
          macrosBudget={macrosBudget}
          thisMealWeight={thisMealWeight}
          //Methods
          populateNewMealIngredients={props.populateNewMealIngredients}
          onChangeMealRecipe={props.onChangeMealRecipe}
          //Common Props
          //Data
          thisStateObj={thisMealStateObj}
          hasChildren={mealHasChildren}
          thisGRFUser={props.thisGRFUser}
          allGRFUsers={props.allGRFUsers}
          allDays={props.allDays}
          thisMealTypesRecipes={thisMealTypesRecipes}
          mealTypes={props.mealTypes}
          allIngredients={props.allIngredients}
          // allGenRecipeIngredients={props.allGenRecipeIngredients}
          thisRecipesIngrdnts={thisRecipesIngrdnts}
          thisMealTypesMeals={thisMealTypesMeals}
          allUnitOfMeasures={props.allUnitOfMeasures}
          allWeightTypes={props.allWeightTypes}
          allBrands={props.allBrands}
          daysOfWeek={props.daysOfWeek}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
        />
      );
    }
    // }
  };
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{thisDayOfWeek.name}</h3>
        <EditOptions
          parentObj={thisStateObj}
          objType="day"
          thisFormState={thisFormState}
          userType={userType}
          recordChanged={recordChanged}
          hasChildren={hasChildren}
          deleteChildrenWarning={deleteChildrenWarning}
          onSaveFormChanges={props.onSaveFormChanges}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
        />
      </div>
      <div
        className="accordion accordion-flush"
        id={"dayInnerAccordionFull" + thisObjId}
      >
        <div className="accordion-item">
          <div
            className="accordion accordion-flush"
            id={"dayAdminAccordionFull" + thisObjId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"dayAdminAccordionHeader" + thisObjId}
              >
                <button
                  className="accordion-button collapsed dayAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#dayAdminAccrdn" + thisObjId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  disabled={userType == "admin" ? false : true}
                >
                  {userType === "admin" ? (
                    <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                  )}{" "}
                </button>
              </h2>
            </div>
            <div
              id={"dayAdminAccrdn" + thisObjId}
              className="accordion-collapse collapse"
              aria-labelledby={"#dayAdminAccordionHeader" + thisObjId}
              data-bs-parent={"#dayAdminAccordionFull" + thisObjId}
            >
              <div className="accordion-body dayAdminAccrdnBdy dayInnerAccordion">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={thisFormState === "viewing" ? true : false}
                    value={thisObj.name}
                    onChange={(e) =>
                      props.onUpdateProp(
                        "day",
                        thisDayOfWeek.code,
                        "",
                        "name",
                        0,
                        "text",
                        e,
                        []
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Day of Week</label>
                  <select
                    required
                    className="form-control form-select"
                    value={thisDayOfWeek._id}
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.onUpdateProp(
                        "day",
                        thisDayOfWeek.code,
                        "",
                        "dayOfWeek",
                        0,
                        "select",
                        e,
                        daysOfWeek
                      )
                    }
                  >
                    {daysOfWeek.map(function (dayOfWeek) {
                      return (
                        <option
                          key={"daysOfWeekListItem" + dayOfWeek.name}
                          value={dayOfWeek._id}
                        >
                          {dayOfWeek.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Week Meal Plan</label>
                  <select
                    required
                    className="form-control form-select"
                    value={thisWMP._id}
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.onUpdateProp(
                        "day",
                        thisDayOfWeek.code,
                        "",
                        "weekMealPlan",
                        0,
                        "select",
                        e,
                        allWMPs
                      )
                    }
                  >
                    {allWMPs.map(function (WMP) {
                      return (
                        <option
                          key={"daysOfWeekListItem" + WMP.name}
                          value={WMP._id}
                        >
                          {WMP.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Record Id</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value={thisObj._id}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + thisObjId}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id={"accordionHeader" + thisObjId}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + thisObjId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + thisObjId}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + thisObjId}
              data-bs-parent={"#accordionFull" + thisObjId}
            >
              <div className="accordion-body">
                <div className="macroTblCntnr">
                  <MacrosTable
                    tableType="Day Macros"
                    thisWMP={thisWMP}
                    macrosBudget={macrosBudget}
                    theseIngrdnts={thisDaysMealsIngrdnts}
                  />
                </div>
                <div className="card mt-3 mb-3">
                  <div className="card-header">
                    <h4 className="card-title">
                      {thisDayOfWeek.name + " Meals"}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div
                      className="accordion accordion-flush"
                      id={"daysMealsAccordionFull" + thisObjId}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"daysMealsAccordionHeader" + thisObjId}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#mealsAccrdn" + thisObjId}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          ></button>
                        </h2>
                      </div>
                      <div
                        id={"mealsAccrdn" + thisObjId}
                        className="accordion-collapse collapse show"
                        aria-labelledby={
                          "#daysMealsAccordionHeader" + thisObjId
                        }
                        data-bs-parent={"#daysMealsAccordionFull" + thisObjId}
                      >
                        <div className="accordion-body wkDaysAccrdnBdy">
                          {renderMeal(mealTypes[0], 0)}
                          {renderMeal(mealTypes[1], 1)}
                          {renderMeal(mealTypes[2], 2)}
                          {renderMeal(mealTypes[3], 3)}
                          {renderMeal(mealTypes[4], 4)}
                          {renderMeal(mealTypes[5], 5)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetail3;
