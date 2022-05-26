import React, { Component } from "react";
const CreateDay2 = (props) => {
  console.log(props);
  const dayOfWeek = props.dayOfWeek;
  const dayOfWeekName = dayOfWeek.name;
  const weekMealPlan = props.weekMealPlan;
  const userType = props.weekMealPlan.thisWMP.userType;
  const weekMealPlanId = weekMealPlan.thisWMP._id;
  const dayName = weekMealPlan.thisWMP.name + " - " + dayOfWeekName;
  const newRecordForState = {
    name: dayName,
    dayOfWeek: dayOfWeek,
    weekMealPlan: weekMealPlan,
  };
  const newRecordToSave = {
    name: dayName,
    dayOfWeek: dayOfWeek._id,
    weekMealPlan: weekMealPlanId,
  };
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{dayOfWeekName}</h3>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + weekMealPlanId + dayOfWeekName}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + weekMealPlanId + dayOfWeekName}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + weekMealPlanId + dayOfWeekName}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + weekMealPlanId + dayOfWeekName}
              className="accordion-collapse collapse show"
              aria-labelledby={
                "#accordionHeader" + weekMealPlanId + dayOfWeekName
              }
              data-bs-parent={"#accordionFull" + weekMealPlanId + dayOfWeekName}
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group mt-4 mb-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        props.onCreateRecord(
                          "day",
                          dayOfWeek.code,
                          "",
                          0,
                          newRecordForState,
                          newRecordToSave
                        );
                      }}
                    >
                      Create Day
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateDay2;
