import React, { useState } from "react";
import CustomHeading from "../CustomHeading.component";
import NewMacroBudgetSubForm from "./NewMacroBudgetSubForm.component";
import NewMealWeightingSubForm from "./NewMealWeightingSubForm.component";
import NewWMPNameAndDisabledFieldsSubForm from "./NewWMPNameAndDisabledFieldsSubForm.component";
const NewWeekMealPlanCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { onUpdateWeightsFn } = specificMethods;
  const { thisStateObjBackup } = specificData;
  let thisStateObj = specificData.thisStateObj.recordLoaded
    ? specificData.thisStateObj
    : {
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          GRFUser: { handle: "" },
          name: "",
          createdAt: "",
          updatedAt: "",
          calsBudget: 0,
          carbsBudget: 0,
          proteinBudget: 0,
          fatBudget: 0,
          fiberBudget: 0,
          breakfastWeight: 0,
          snack1Weight: 0,
          lunchWeight: 0,
          snack2Weight: 0,
          dinnerWeight: 0,
          dessertWeight: 0,
        },
        recordLoaded: false,
        editingForm: { weekMealPlan: false },
        recordChanged: { weekMealPlan: false },
        valErrors: {
          weekMealPlan: {
            name: [],
            calsBudget: [],
            carbsBudget: [],
            proteinBudget: [],
            fatBudget: [],
            fiberBudget: [],
            breakfastWeight: [],
            snack1Weight: [],
            lunchWeight: [],
            snack2Weight: [],
            dinnerWeight: [],
            dessertWeight: [],
          },
        },
        justCreated: { weekMealPlan: false },
        userType: { weekMealPlan: "viewer" },
        hasChildren: { weekMealPlan: false },
      };
  const { thisRecord, recordLoaded } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id;
  const typeOfRecordToChange = "weekMealPlan";
  const [changesCancelled, toggleChangesCancelled] = useState(false);
  function handleCancelEditFn() {
    toggleChangesCancelled(true);
    onCancelEditFn();
  }

  return (
    <div className="card">
      <div className="card-header">
        <CustomHeading
          key={`customCarddHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={1}
          recordLoaded={recordLoaded}
          headingText="Week Meal Plan Detail"
          hdngIsReqFormLbl={false}
          editingForm={null}
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
                <NewWMPNameAndDisabledFieldsSubForm
                  commonProps={{
                    commonData: { backEndHtmlRoot: backEndHtmlRoot },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      onUpdatePropFn: onUpdatePropFn,
                      onSaveChangesFn: onSaveChangesFn,
                      onStartEditingFn: onStartEditingFn,
                      onCancelEditFn: handleCancelEditFn,
                      onDeleteObjFn: onDeleteObjFn,
                      returnElementKey: returnElementKey,
                      trimEnteredValueFn: trimEnteredValueFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisStateObj: thisStateObj,
                      thisStateObjBackup: thisStateObjBackup,
                    },
                    specificMethods: {},
                  }}
                />
                <NewMacroBudgetSubForm
                  key={`macroBdgtSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                  commonProps={{
                    commonData: {},
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                    },
                  }}
                  specificProps={{
                    specificData: { thisStateObj: thisStateObj },
                    specificMethods: {},
                  }}
                />
                <NewMealWeightingSubForm
                  key={`mealWghtngSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                  commonProps={{
                    commonData: {},
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisStateObj: thisStateObj,
                      changesCancelled: changesCancelled,
                    },
                    specificMethods: {
                      onUpdateWeightsFn: onUpdateWeightsFn,
                      toggleChangesCancelled: toggleChangesCancelled,
                    },
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWeekMealPlanCard;
