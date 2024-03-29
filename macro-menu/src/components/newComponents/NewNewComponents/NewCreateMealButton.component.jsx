import React from "react";
const NewCreateMealButton = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { onCreateNewRecordFn } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const thisRecord = thisStateObj.recordLoaded ? thisStateObj.thisRecord : {};
  const { _id, mealType, day } = thisRecord;
  const dayOfWeek = day.dayOfWeek;
  const thisRecordId = _id;
  return (
    <div
      className="accordion accordionNotFlush"
      id={"mealOuterAccordionFull" + thisRecordId}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + thisRecordId}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + thisRecordId}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>{`${dayOfWeek.name} ${mealType.name}`}</h5>
          </button>
        </h2>
        <form>
          <div className="form-group mt-4 mb-4">
            <button
              type="button"
              value="Create Meal"
              className="btn btn-primary"
              onClick={() =>
                onCreateNewRecordFn(
                  "meal",
                  dayOfWeek.code,
                  mealType.code,
                  null,
                  null
                )
              }
            >
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCreateMealButton;
