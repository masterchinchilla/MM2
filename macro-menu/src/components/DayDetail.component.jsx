import React, { Component } from "react";
import dayjs from "dayjs";
import StickyBox from "react-sticky-box";
import EditOptions from "./EditOptions.component";
import MacrosTable from "./MacrosTable.component";
import CreateMeal from "./CreateMeal.component";
import MealDetail from "./MealDetail.component";
const DayDetail = (props) => {
  const httpRouteCore = props.httpRouteCore;
  const hasChildren = props.hasChildren;
  const thisGRFUser = props.thisGRFUser;
  const thisWMP = props.thisWMP;
  const thisStateObj = props.thisStateObj;
  const mealTypes = props.mealTypes;
  const thisObj = thisStateObj.thisDay;
  const thisDaysMeals = thisStateObj.thisDaysMeals;
  const thisObjId = thisObj._id;
  const thisDayOfWeek = thisObj.dayOfWeek;
  const thisFormState = thisStateObj.thisFormState;
  const userType = thisStateObj.userType;
  const recordChanged = thisStateObj.recordChanged;
  const deleteChildrenWarning =
    "This Day has Meals connected to it which must be deleted before you can delete the Day.";
  const deleteMsg = "Are you sure you want to delete this Day Meal Plan?";
  const pattern = /missing/;
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
    let thisMealTypeCode = mealType.code;
    let thisMealStateObj = thisDaysMeals[thisMealTypeCode];
    let thisMealObj = thisMealStateObj.thisMeal;
    let thisMealObjsAuthorsId = thisWMP.GRFUser._id;
    let thisMealObjsId = thisMealObj._id;
    let testResult = pattern.test(thisMealObjsId);
    let thisUser = thisGRFUser;
    let thisUsersId = thisUser._id;
    if (testResult) {
      if (userType === "admin" || thisUsersId === thisMealObjsAuthorsId) {
        return (
          <CreateMeal
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
      // let thisMealTypesMeals = props.allMeals.filter(
      //   (meal) => meal.mealType.code === thisMealTypeCode
      // );
      let thisMealTypesRecipes = props.allGenRecipes.filter(
        (genRecipe) => genRecipe.availableMealType.code === thisMealTypeCode
      );
      let thisRecipesIngrdnts = props.allGenRecipeIngredients.filter(
        (genRecipeIngredient) =>
          genRecipeIngredient.genRecipe._id === thisMealObj.genRecipe._id
      );
      let thisMealWeight = thisWMP[`${mealType.code}Weight`];
      let thisMealsMealIngredients = thisDaysMealsIngrdnts[arrayIndex];
      let mealHasChildren = false;
      thisMealsMealIngredients.length > 0
        ? (mealHasChildren = true)
        : (mealHasChildren = false);
      return (
        <MealDetail
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
          httpRouteCore={httpRouteCore}
          // allGRFUsers={props.allGRFUsers}
          // allDays={props.allDays}
          thisMealTypesRecipes={thisMealTypesRecipes}
          mealTypes={props.mealTypes}
          thisRecipesIngrdnts={thisRecipesIngrdnts}
          // thisMealTypesMeals={thisMealTypesMeals}
          allUnitOfMeasures={props.allUnitOfMeasures}
          allWeightTypes={props.allWeightTypes}
          allBrands={props.allBrands}
          daysOfWeek={props.daysOfWeek}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onCreateRecord={props.onCreateRecord}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
          toggleRecordChanged={props.toggleRecordChanged}
        />
      );
    }
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
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"dayHiddenAccordionFull" + thisObjId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"dayHiddenAccordionHeader" + thisObjId}
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayHiddenAccrdn" + thisObjId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayHiddenAccrdn" + thisObjId}
            className="accordion-collapse collapse"
            aria-labelledby={"#dayHiddenAccordionHeader" + thisObjId}
            data-bs-parent={"#dayHiddenAccordionFull" + thisObjId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={thisObj.name}
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
                <StickyBox
                  offsetTop={20}
                  offsetBottom={20}
                  className={"dayMacTable"}
                >
                  <MacrosTable
                    tableType="Day Macros"
                    thisWMP={thisWMP}
                    macrosBudget={macrosBudget}
                    theseIngrdnts={thisDaysMealsIngrdnts}
                  />
                </StickyBox>
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

export default DayDetail;
