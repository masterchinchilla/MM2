import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MacrosTable from "./MacrosTable2.component";
import CreateMeal2 from "./CreateMeal2.component";
import MealDetail3 from "./MealDetail3.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
const DayDetail3 = (props) => {
  const thisGRFUser = props.thisGRFUser;
  const thisWMP = props.thisWMP;
  const thisDayObj = props.thisDayObj;
  const daysOfWeek = props.daysOfWeek;
  const mealTypes = props.mealTypes;
  const allWMPs = props.allWMPs;
  const allGenRecipeIngredients = props.thisRecipesIngrdnts;
  const thisDay = thisDayObj.thisDay;
  const thisDaysMeals = thisDayObj.thisDaysMeals;
  const thisDayId = thisDay._id;
  const thisDayOfWeek = thisDay.dayOfWeek;
  const thisFormState = thisDayObj.thisFormState;
  const userType = thisDayObj.userType;
  // const userType = "admin";
  const deleteMsg = "Are you sure you want to delete this Day Meal Plan?";
  let breakfastIngrdnts = thisDayObj.thisDaysMeals.breakfast.thisMealsIngrdnts;
  let snack1Ingrdnts = thisDayObj.thisDaysMeals.snack1.thisMealsIngrdnts;
  let lunchIngrdnts = thisDayObj.thisDaysMeals.lunch.thisMealsIngrdnts;
  let snack2Ingrdnts = thisDayObj.thisDaysMeals.snack2.thisMealsIngrdnts;
  let dinnerIngrdnts = thisDayObj.thisDaysMeals.dinner.thisMealsIngrdnts;
  let dessertIngrdnts = thisDayObj.thisDaysMeals.dessert.thisMealsIngrdnts;
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
  const renderMeal = (mealType) => {
    let pattern = /missing/;
    let thisMealTypeCode = mealType.code;
    let thisStateObj = thisDaysMeals[thisMealTypeCode];
    let mealLoadStatus = thisStateObj.dataLoaded;
    if (mealLoadStatus === false) {
      return;
    } else {
      let thisObject = thisStateObj.thisMeal;
      let thisObjectsAuthorsId = thisWMP.GRFUser._id;
      let thisObjectsId = thisObject._id;
      let testResult = pattern.test(thisObjectsId);
      let thisUser = thisGRFUser;
      let thisUsersId = thisUser._id;
      let thisUsersUserGroups = thisUser.userGroups;
      if (testResult === true) {
        if (
          thisObjectsAuthorsId === thisUsersId ||
          thisUsersUserGroups === "Admin"
        ) {
          return (
            <CreateMeal2
              key={thisObjectsId}
              thisDay={thisStateObj}
              onCreateDay={this.handleCreateDay}
            />
          );
        } else {
          return (
            <div class="alert alert-secondary" role="alert">
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
        return (
          <MealDetail3
            //Specific Props
            //Data
            key={thisObjectsId}
            macrosBudget={macrosBudget}
            thisMealWeight={thisMealWeight}
            //Methods
            populateNewMealIngredients={props.populateNewMealIngredients}
            onChangeMealRecipe={props.onChangeMealRecipe}
            //Common Props
            //Data
            thisStateObj={thisStateObj}
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
    }
  };
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{thisDayOfWeek}</h3>
        <EditOptions
          parentObj={thisDayObj}
          objType="day"
          thisFormState={thisFormState}
          userType={userType}
          onSaveFormChanges={props.onSaveFormChanges}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
        />
      </div>
      <div
        className="accordion accordion-flush"
        id={"dayInnerAccordionFull" + thisDayId}
      >
        <div className="accordion-item">
          <div
            className="accordion accordion-flush"
            id={"dayAdminAccordionFull" + thisDayId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"dayAdminAccordionHeader" + thisDayId}
              >
                <button
                  className="accordion-button collapsed dayAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#dayAdminAccrdn" + thisDayId}
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
              id={"dayAdminAccrdn" + thisDayId}
              className="accordion-collapse collapse"
              aria-labelledby={"#dayAdminAccordionHeader" + thisDayId}
              data-bs-parent={"#dayAdminAccordionFull" + thisDayId}
            >
              <div className="accordion-body dayAdminAccrdnBdy dayInnerAccordion">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={thisFormState === "viewing" ? true : false}
                    value={thisDay.name}
                    onChange={(e) =>
                      props.updateProp("day", "", "name", 0, "text", e)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Day of Week</label>
                  <select
                    required
                    className="form-control form-select"
                    value={thisDayOfWeek}
                    disabled={thisFormState == "viewing" ? true : false}
                    onChange={(e) =>
                      props.updateProp("day", "", "dayOfWeek", 0, "select", e)
                    }
                  >
                    {daysOfWeek.map(function (dayOfWeek) {
                      return (
                        <option
                          key={"daysOfWeekListItem" + dayOfWeek.name}
                          value={dayOfWeek.name}
                        >
                          {dayOfWeek.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <select
                    required
                    className="form-control form-select"
                    value={JSON.stringify(thisWMP)}
                    disabled={thisFormState == "viewing" ? true : false}
                    onChange={(e) =>
                      props.updateProp(
                        "day",
                        "",
                        "weekMealPlan",
                        0,
                        "select",
                        e
                      )
                    }
                  >
                    {allWMPs.map(function (WMP) {
                      return (
                        <option
                          key={"daysOfWeekListItem" + WMP.name}
                          value={JSON.stringify(WMP)}
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
                    value={thisDay._id}
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
          id={"accordionFull" + thisDayId}
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id={"accordionHeader" + thisDayId}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + thisDayId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + thisDayId}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + thisDayId}
              data-bs-parent={"#accordionFull" + thisDayId}
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
                    <h4 className="card-title">{thisDayOfWeek + " Meals"}</h4>
                  </div>
                  <div className="card-body">
                    <div
                      className="accordion accordion-flush"
                      id={"daysMealsAccordionFull" + thisDayId}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"daysMealsAccordionHeader" + thisDayId}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#mealsAccrdn" + thisDayId}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          ></button>
                        </h2>
                      </div>
                      <div
                        id={"mealsAccrdn" + thisDayId}
                        className="accordion-collapse collapse show"
                        aria-labelledby={
                          "#daysMealsAccordionHeader" + thisDayId
                        }
                        data-bs-parent={"#daysMealsAccordionFull" + thisDayId}
                      >
                        <div className="accordion-body wkDaysAccrdnBdy">
                          {renderMeal(mealTypes[0])}
                          {renderMeal(mealTypes[1])}
                          {renderMeal(mealTypes[2])}
                          {renderMeal(mealTypes[3])}
                          {renderMeal(mealTypes[4])}
                          {renderMeal(mealTypes[5])}
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
