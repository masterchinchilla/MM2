import React, { useState, useEffect } from "react";
import WMPNameAndDisabledFieldsSubForm from "./WMPNameAndDisabledFieldsSubForm.component.jsx";
import MacroBudgetSubForm from "./MacroBudgetSubForm.component.jsx";
import MealWeightingSubForm from "./MealWeightingSubForm.component.jsx";
import CustomHeading from "./CustomHeading.component.jsx";
const WeekMealPlanCard = (props) => {
  const {
    thisStateObjBackup,
    backEndHtmlRoot,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    onClickCopyFn,
    getRndIntegerFn,
    onUpdateWeightsFn,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: null,
        },
        recordLoaded: false,
      };
  const { thisRecord, recordLoaded } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "weekMealPlan";
  return (
    <div className="card">
      <div className="card-header">
        <CustomHeading
          key={`customCarddHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={1}
          recordLoaded={recordLoaded}
          headingText="Week Meal Plan Detail"
          hdngIsReqFormLbl={false}
          editingForm={false}
          headingClasses="card-title"
        />
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
                  key={`nameAndDsbldFldsSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                  thisStateObj={thisStateObj}
                  thisStateObjBackup={thisStateObjBackup}
                  backEndHtmlRoot={backEndHtmlRoot}
                  validatePropFn={validatePropFn}
                  onClickEditFn={onClickEditFn}
                  onClickCancelFn={onClickCancelFn}
                  onUpdatePropFn={onUpdatePropFn}
                  onClickSaveFn={onClickSaveFn}
                  onClickDeleteFn={onClickDeleteFn}
                  onClickCopyFn={onClickCopyFn}
                  getRndIntegerFn={getRndIntegerFn}
                  trimEnteredValueFn={trimEnteredValueFn}
                />
                <MacroBudgetSubForm
                  key={`macroBdgtSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                  thisStateObj={thisStateObj}
                  onUpdatePropFn={onUpdatePropFn}
                  getRndIntegerFn={getRndIntegerFn}
                />
                <MealWeightingSubForm
                  key={`mealWghtngSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                  thisStateObj={thisStateObj}
                  onUpdateWeightsFn={onUpdateWeightsFn}
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
