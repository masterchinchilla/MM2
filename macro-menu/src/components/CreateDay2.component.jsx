import React, { Component } from "react";
const CreateDay2 = (props) => {
  const dayOfWeek = props.dayOfWeek.name;
  const weekMealPlan = props.weekMealPlan;
  const userType = props.weekMealPlan.thisWMP.userType;
  const weekMealPlanId = weekMealPlan.thisWMP._id;
  const weekMealPlanName = weekMealPlan.thisWMP.name + " - " + dayOfWeek;
  const newDay = {
    name: weekMealPlanName,
    dayOfWeek: dayOfWeek,
    weekMealPlan: weekMealPlan,
  };
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{dayOfWeek}</h3>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + weekMealPlanId + dayOfWeek}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + weekMealPlanId + dayOfWeek}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + weekMealPlanId + dayOfWeek}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + weekMealPlanId + dayOfWeek}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + weekMealPlanId + dayOfWeek}
              data-bs-parent={"#accordionFull" + weekMealPlanId + dayOfWeek}
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group mt-4 mb-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        props.onCreateDay(newDay);
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
