import React from "react";
import CustomHeading from "../CustomHeading.component";
import NewMacroBudgetSubForm from "./NewMacroBudgetSubForm.component";
import NewWMPNameAndDisabledFieldsSubForm from "./NewWMPNameAndDisabledFieldsSubForm.component";
const NewWeekMealPlanCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
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
        },
        recordLoaded: false,
        editingForm: { weekMealPlan: false },
        recordChanged: { weekMealPlan: false },
        valErrors: { weekMealPlan: {} },
        justCreated: { weekMealPlan: false },
        userType: { weekMealPlan: "viewer" },
        hasChildren: { weekMealPlan: false },
      };
  const { thisRecord, recordLoaded } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id;
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
                    commonData: {},
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      onUpdatePropFn: onUpdatePropFn,
                      onSaveChangesFn: onSaveChangesFn,
                      onStartEditingFn: onStartEditingFn,
                      onCancelEditFn: onCancelEditFn,
                      onDeleteObjFn: onDeleteObjFn,
                    },
                  }}
                  specificProps={{
                    specificData: { thisStateObj: thisStateObj },
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
                {/* <MealWeightingSubForm
                    key={`mealWghtngSubFormFor${typeOfRecordToChange}${thisRecordId}`}
                    thisStateObj={thisStateObj}
                    onUpdateWeightsFn={onUpdateWeightsFn}
                    changesCancelled={changesCancelled}
                    toggleChangesCancelled={toggleChangesCancelled}
                  /> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWeekMealPlanCard;
