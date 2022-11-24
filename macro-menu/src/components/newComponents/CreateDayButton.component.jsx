import React from "react";
const CreateDayButton = (props) => {
  const { onCreateNewRecordFn, getRndIntegerFn, thisWMPStateObj, dayOfWeek } =
    props;
  const thisRecordJustCreated = thisWMPStateObj.thisRecordJustCreated;
  const thisWMPRecord = thisWMPStateObj.thisRecord;
  const objRefPropsJustCreatedArray = thisRecordJustCreated
    ? ["weekMealPlan"]
    : [];
  const thisRecordId = getRndIntegerFn(10000000, 99999999);
  function handleCreateDay() {
    onCreateNewRecordFn(
      "thisWeeksDays",
      "day",
      "Day",
      dayOfWeek.code,
      "",
      0,
      {
        _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
        name: `${thisWMPRecord.name}-${dayOfWeek.name}`,
        dayOfWeek: dayOfWeek,
        weekMealPlan: thisWMPRecord,
      },
      objRefPropsJustCreatedArray
    );
  }
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h3 className="card-title">{dayOfWeek.name}</h3>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={`accordionFull${thisRecordId}`}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={`accordionHeader${thisRecordId}`}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#dayAccrdn${thisRecordId}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={`dayAccrdn${thisRecordId}`}
              className="accordion-collapse collapse show"
              aria-labelledby={`#accordionHeader${thisRecordId}`}
              data-bs-parent={`#accordionFull${thisRecordId}`}
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group mt-4 mb-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCreateDay}
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

export default CreateDayButton;
