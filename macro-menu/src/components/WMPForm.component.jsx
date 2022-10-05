import React from "react";
import WMPNameAndDisabledFields from "./WMPNameAndDisabledFields.component";
import MacroBudget from "./MacroBudget.component";
import MealWeighting from "./MealWeighting.component";
const WMPForm = (props) => {
  const {
    thisWeekMealPlan,
    thisWeekMealPlanOld,
    backEndHtmlRoot,
    onUpdateProp,
    onClickEditForm,
    onCancelEditForm,
    onSaveFormChanges,
    onDeleteRecord,
    onClickCopy,
    toggleRecordChanged,
    onUpdateWeights,
  } = props;
  const thisWMP = thisWeekMealPlan.thisWMP;
  const thisWMPId = thisWMP._id;
  return (
    <div
      id={"dayAccrdn_WMPDetails" + thisWMPId}
      className="accordion-collapse collapse show"
      aria-labelledby={"#accordionHeader_WMPDetails" + thisWMPId}
      data-bs-parent={"#accordionFull_WMPDetails" + thisWMPId}
    >
      <div className="accordion-body accrdnWMPDetailsBdy">
        <form className="card">
          <WMPNameAndDisabledFields
            thisWeekMealPlan={thisWeekMealPlan}
            thisWeekMealPlanOld={thisWeekMealPlanOld}
            backEndHtmlRoot={backEndHtmlRoot}
            onUpdateProp={onUpdateProp}
            onClickEditForm={onClickEditForm}
            onCancelEditForm={onCancelEditForm}
            onSaveFormChanges={onSaveFormChanges}
            onDeleteRecord={onDeleteRecord}
            onClickCopy={onClickCopy}
            toggleRecordChanged={toggleRecordChanged}
          />
          <MacroBudget
            thisWeekMealPlan={thisWeekMealPlan}
            onUpdateProp={onUpdateProp}
          />
          <div className="card weekMealPlanFormCards mt-3 mb-3">
            <div className="card-header">
              <h2 className="card-title">Meal Macro Weighting</h2>
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull_MealMacroWeighting" + thisWMPId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader_MealMacroWeighting" + thisWMPId}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#dayAccrdn_MealMacroWeighting" + thisWMPId
                      }
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"dayAccrdn_MealMacroWeighting" + thisWMPId}
                  className="accordion-collapse collapse show"
                  aria-labelledby={
                    "#accordionHeader_MealMacroWeighting" + thisWMPId
                  }
                  data-bs-parent={
                    "#accordionFull_MealMacroWeighting" + thisWMPId
                  }
                >
                  <div className="accordion-body accrdnWeekMealPlanMacroBdy">
                    <MealWeighting
                      mealWeights={{
                        breakfast: thisWMP.breakfastWeight,
                        snack1: thisWMP.snack1Weight,
                        lunch: thisWMP.lunchWeight,
                        snack2: thisWMP.snack2Weight,
                        dinner: thisWMP.dinnerWeight,
                        dessert: thisWMP.dessertWeight,
                      }}
                      thisFormState={thisWeekMealPlan.thisFormState}
                      onUpdateWeights={onUpdateWeights}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WMPForm;
