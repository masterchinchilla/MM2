import React from "react";
import Input from "./Input.component";
const MacroBudget = (props) => {
  const { thisWeekMealPlan, onUpdateProp } = props;
  const thisFormState = thisWeekMealPlan.thisFormState;
  const thisWMP = thisWeekMealPlan.thisWMP;
  const thisWMPId = thisWMP._id;
  const calsBudget = thisWMP.calsBudget;
  const carbsBudget = thisWMP.carbsBudget;
  const proteinBudget = thisWMP.proteinBudget;
  const fatBudget = thisWMP.fatBudget;
  const fiberBudget = thisWMP.fiberBudget;
  return (
    <div className="card weekMealPlanFormCards mt-3 mb-3">
      <div className="card-header">
        <h2 className="card-title">Macro Daily Budget</h2>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_MacroBudget" + thisWMPId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader_MacroBudget" + thisWMPId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn_MacroBudget" + thisWMPId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_MacroBudget" + thisWMPId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader_MacroBudget" + thisWMPId}
            data-bs-parent={"#accordionFull_MacroBudget" + thisWMPId}
          >
            <div className="accordion-body accrdnWeekMealPlanMacroBdy">
              <Input
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Calories (g)"
                propType="number"
                propValue={calsBudget}
                onUpdateProp={onUpdateProp}
                objType="weekMealPlan"
                dayOfWeekCode=""
                mealTypeCode=""
                propToUpdate={"calsBudget"}
                arrayIndex={0}
                inputType="number"
                selectedFrom={[]}
                propTypeForVal="float"
                fieldDisabled={thisFormState === "viewing" ? true : false}
                valError={thisWeekMealPlan.valErrors.calsBudget}
                inputClasses="form-control weekMealPlanMacroInput"
              />
              <Input
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Carbs (g)"
                propType="number"
                propValue={carbsBudget}
                onUpdateProp={onUpdateProp}
                objType="weekMealPlan"
                dayOfWeekCode=""
                mealTypeCode=""
                propToUpdate={"carbsBudget"}
                arrayIndex={0}
                inputType="number"
                selectedFrom={[]}
                propTypeForVal="float"
                fieldDisabled={thisFormState === "viewing" ? true : false}
                valError={thisWeekMealPlan.valErrors.carbsBudget}
                inputClasses="form-control weekMealPlanMacroInput"
              />
              <Input
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Protein (g)"
                propType="number"
                propValue={proteinBudget}
                onUpdateProp={onUpdateProp}
                objType="weekMealPlan"
                dayOfWeekCode=""
                mealTypeCode=""
                propToUpdate={"proteinBudget"}
                arrayIndex={0}
                inputType="number"
                selectedFrom={[]}
                propTypeForVal="float"
                fieldDisabled={thisFormState === "viewing" ? true : false}
                valError={thisWeekMealPlan.valErrors.proteinBudget}
                inputClasses="form-control weekMealPlanMacroInput"
              />
              <Input
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Fat (g)"
                propType="number"
                propValue={fatBudget}
                onUpdateProp={onUpdateProp}
                objType="weekMealPlan"
                dayOfWeekCode=""
                mealTypeCode=""
                propToUpdate={"fatBudget"}
                arrayIndex={0}
                inputType="number"
                selectedFrom={[]}
                propTypeForVal="float"
                fieldDisabled={thisFormState === "viewing" ? true : false}
                valError={thisWeekMealPlan.valErrors.fatBudget}
                inputClasses="form-control weekMealPlanMacroInput"
              />
              <Input
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Fiber (g)"
                propType="number"
                propValue={fiberBudget}
                onUpdateProp={onUpdateProp}
                objType="weekMealPlan"
                dayOfWeekCode=""
                mealTypeCode=""
                propToUpdate={"fiberBudget"}
                arrayIndex={0}
                inputType="number"
                selectedFrom={[]}
                propTypeForVal="float"
                fieldDisabled={thisFormState === "viewing" ? true : false}
                valError={thisWeekMealPlan.valErrors.fiberBudget}
                inputClasses="form-control weekMealPlanMacroInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroBudget;
