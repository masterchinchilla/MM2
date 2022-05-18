import React, { Component } from "react";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import MacrosTable from "./MacrosTable2.component";
const DayDetail3 = (props) => {
  const thisWMP = props.thisWMP;
  const thisDayObj = props.thisDayObj;
  const thisDay = thisDayObj.thisDay;
  const thisDayId = thisDay._id;
  const thisDayOfWeek = thisDay.dayOfWeek;
  const thisFormState = thisDayObj.thisFormState;
  const userType = thisDayObj.userType;
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
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{thisDayOfWeek}</h3>
        <EditOptions
          parentObj={thisDay}
          stateObj={"Day"}
          thisFormState={thisFormState}
          userType={userType}
          onSaveFormChanges={props.onSaveFormChanges}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
        />
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
                    thisDaysMealsIngrdnts={thisDaysMealsIngrdnts}
                  />
                </div>
                <ul>
                  <li key={"dayAttributesLiItem1"}>
                    Name:&nbsp;{thisDay.name}
                  </li>
                  <li>Day of Week:&nbsp;{thisDayOfWeek}</li>
                  <li key={"dayAttributesLiItem2"}>
                    Week Meal Plan:&nbsp;{thisWMP.name}
                  </li>
                  <li key={"dayAttributesLiItem3"}>
                    Created:&nbsp;
                    {dayjs(thisDay.createdAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                  </li>
                  <li key={"dayAttributesLiItem4"}>
                    Last Updated:&nbsp;
                    {dayjs(thisDay.updatedAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                  </li>
                </ul>
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
                          Day Meals
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
