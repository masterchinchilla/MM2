import React from "react";
const NewCreateDayButton = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { onCreateNewRecordFn } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const thisRecord = thisStateObj.thisRecord;
  const { _id, dayOfWeek } = thisRecord;
  const thisRecordId = _id;
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
                      onClick={() => {
                        onCreateNewRecordFn("day", dayOfWeek.code, null);
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

export default NewCreateDayButton;
