import React, { useState, useEffect } from "react";
import WMPNameAndDisabledFieldsSubForm from "./WMPNameAndDisabledFieldsSubForm.component.jsx";
import MacroBudgetSubForm from "./MacroBudgetSubForm.component.jsx";
import MealWeightingSubForm from "./MealWeightingSubForm.component.jsx";

const WeekMealPlanCard = (props) => {
  const { thisStateObj, getRndIntegerFn } = props;
  const thisRecordId = thisStateObj
    ? thisStateObj.thisRecord._id
    : getRndIntegerFn(10000000, 99999999);
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Week Meal Plan Detail</h1>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_WMPDetails" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader_WMPDetails" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn_WMPDetails" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_WMPDetails" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader_WMPDetails" + thisRecordId}
            data-bs-parent={"#accordionFull_WMPDetails" + thisRecordId}
          >
            <div className="accordion-body accrdnWMPDetailsBdy">
              <form className="card">
                <WMPNameAndDisabledFieldsSubForm
                  key={`nameAndDsbldFldsSubFormForWMP${thisRecordId}`}
                  {...props}
                />
                <MacroBudgetSubForm
                  key={`macroBdgtSubFormForWMP${thisRecordId}`}
                  {...props}
                />
                <MealWeightingSubForm
                  key={`mealWghtngSubFormForWMP${thisRecordId}`}
                  {...props}
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
