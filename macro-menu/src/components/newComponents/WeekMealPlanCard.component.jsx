import React, { useState, useEffect } from "react";
import WMPNameAndDisabledFieldsSubForm from "./WMPNameAndDisabledFieldsSubForm.component.jsx";
import MacroBudgetSubForm from "./MacroBudgetSubForm.component.jsx";
import MealWeightingSubForm from "./MealWeightingSubForm.component.jsx";
// import { thisWeeksDaysOld } from "../../initialWMPStateObj.js";
const WeekMealPlanCard = (props) => {
  const {
    thisStateObj,
    onUpdateWeightsFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
  } = props;
  const thisWMP = thisStateObj ? thisStateObj.thisWMP : {};
  const thisFormState = thisStateObj ? thisStateObj.thisFormState : "";
  const mealWeights = {
    breakfast: thisWMP.breakfastWeight,
    snack1: thisWMP.snack1Weight,
    lunch: thisWMP.lunchWeight,
    snack2: thisWMP.snack2Weight,
    dinner: thisWMP.dinnerWeight,
    dessert: thisWMP.dessertWeight,
  };
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Week Meal Plan Detail</h1>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_WMPDetails" + getRndIntegerFn(10000000, 99999999)}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "accordionHeader_WMPDetails" +
                getRndIntegerFn(10000000, 99999999)
              }
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#dayAccrdn_WMPDetails" + getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_WMPDetails" + getRndIntegerFn(10000000, 99999999)}
            className="accordion-collapse collapse show"
            aria-labelledby={
              "#accordionHeader_WMPDetails" +
              getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#accordionFull_WMPDetails" + getRndIntegerFn(10000000, 99999999)
            }
          >
            <div className="accordion-body accrdnWMPDetailsBdy">
              <form className="card">
                <WMPNameAndDisabledFieldsSubForm
                  thisStateObj={thisStateObj}
                  onClickEditFn={onClickEditFn}
                  onClickCancelFn={onClickCancelFn}
                  onUpdatePropFn={onUpdatePropFn}
                  onClickSaveFn={onClickSaveFn}
                  onClickDeleteFn={onClickDeleteFn}
                  getRndIntegerFn={getRndIntegerFn}
                />
                <MacroBudgetSubForm
                  thisStateObj={thisStateObj}
                  onClickEditFn={onClickEditFn}
                  onClickCancelFn={onClickCancelFn}
                  onUpdatePropFn={onUpdatePropFn}
                  onClickSaveFn={onClickSaveFn}
                  onClickDeleteFn={onClickDeleteFn}
                  getRndIntegerFn={getRndIntegerFn}
                />
                <MealWeightingSubForm
                  thisFormState={thisFormState}
                  mealWeights={mealWeights}
                  onUpdateWeights={onUpdateWeightsFn}
                  getRndIntegerFn={getRndIntegerFn}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekMealPlanCard;
