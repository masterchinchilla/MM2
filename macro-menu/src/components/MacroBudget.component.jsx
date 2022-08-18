import React from "react";
const MacroBudget = (props) => {
  const thisWeekMealPlan = props.thisWeekMealPlan;
  const thisFormState = thisWeekMealPlan.thisFormState;
  const thisWMP = thisWeekMealPlan.thisWMP;
  const thisWMPId = thisWMP._id;
  const calsBudget = thisWMP.calsBudget;
  const carbsBudget = thisWMP.carbsBudget;
  const proteinBudget = thisWMP.proteinBudget;
  const fatBudget = thisWMP.fatBudget;
  const fiberBudget = thisWMP.fiberBudget;
  const onUpdateProp = props.onUpdateProp;
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
              <div className="badge bg-primary weekMealPlanMacroBadge">
                <h6>Calories (g)</h6>
                <input
                  type="number"
                  className="form-control weekMealPlanMacroInput"
                  placeholder="2000.00"
                  value={calsBudget}
                  onChange={(e) => {
                    onUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "calsBudget",
                      0,
                      "number",
                      e,
                      []
                    );
                  }}
                  disabled={thisFormState == "viewing" ? true : false}
                ></input>
              </div>
              <div className="badge bg-primary weekMealPlanMacroBadge">
                <h6>Carbs (g)</h6>
                <input
                  type="number"
                  className="form-control weekMealPlanMacroInput"
                  placeholder="400.00"
                  value={carbsBudget}
                  onChange={(e) => {
                    onUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "carbsBudget",
                      0,
                      "number",
                      e,
                      []
                    );
                  }}
                  disabled={thisFormState === "viewing" ? true : false}
                ></input>
              </div>
              <div className="badge bg-primary weekMealPlanMacroBadge">
                <h6>Protein (g)</h6>
                <input
                  type="number"
                  className="form-control weekMealPlanMacroInput"
                  placeholder="300"
                  value={proteinBudget}
                  onChange={(e) => {
                    onUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "proteinBudget",
                      0,
                      "number",
                      e,
                      []
                    );
                  }}
                  disabled={thisFormState === "viewing" ? true : false}
                ></input>
              </div>
              <div className="badge bg-primary weekMealPlanMacroBadge">
                <h6>Fat (g)</h6>
                <input
                  type="number"
                  className="form-control weekMealPlanMacroInput"
                  placeholder="100"
                  value={fatBudget}
                  onChange={(e) => {
                    onUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "fatBudget",
                      0,
                      "number",
                      e,
                      []
                    );
                  }}
                  disabled={thisFormState === "viewing" ? true : false}
                ></input>
              </div>
              <div className="badge bg-primary weekMealPlanMacroBadge">
                <h6>Fiber (g)</h6>
                <input
                  type="number"
                  className="form-control weekMealPlanMacroInput"
                  placeholder="40"
                  value={fiberBudget}
                  onChange={(e) => {
                    onUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "fiberBudget",
                      0,
                      "number",
                      e,
                      []
                    );
                  }}
                  disabled={thisFormState === "viewing" ? true : false}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroBudget;
