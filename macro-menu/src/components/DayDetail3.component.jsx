import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MacrosTable from "./MacrosTable2.component";
const DayDetail3 = (props) => {
  const thisWMP = props.thisWMP;
  const thisDayObj = props.thisDayObj;
  const daysOfWeek = props.daysOfWeek;
  const allWMPs = props.allWMPs;
  const thisDay = thisDayObj.thisDay;
  const thisDayId = thisDay._id;
  const thisDayOfWeek = thisDay.dayOfWeek;
  const thisFormState = thisDayObj.thisFormState;
  //   const userType = thisDayObj.userType;
  const userType = "admin";
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
                    thisDaysMealsIngrdnts={thisDaysMealsIngrdnts}
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
