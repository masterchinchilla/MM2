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
    // <div className="card mt-3 mb-3">
    //   <div className="card-header">
    //     <h3 className="card-title">{`${dayOfWeek.name} ${mealType.name}`}</h3>
    //   </div>
    //   <div className="card-body">
    //     <div
    //       className="accordion accordion-flush"
    //       id={`accordionFull${thisRecordId}`}
    //     >
    //       <div className="accordion-item">
    //         <h2
    //           className="accordion-header"
    //           id={`accordionHeader${thisRecordId}`}
    //         >
    //           <button
    //             className="accordion-button"
    //             type="button"
    //             data-bs-toggle="collapse"
    //             data-bs-target={`#dayAccrdn${thisRecordId}`}
    //             aria-expanded="true"
    //             aria-controls="collapseOne"
    //           ></button>
    //         </h2>
    //         <div
    //           id={`dayAccrdn${thisRecordId}`}
    //           className="accordion-collapse collapse show"
    //           aria-labelledby={`#accordionHeader${thisRecordId}`}
    //           data-bs-parent={`#accordionFull${thisRecordId}`}
    //         >
    //           <div className="accordion-body">
    //             <form>
    //               <div className="form-group mt-4 mb-4">
    //                 <button
    //                   type="button"
    //                   className="btn btn-primary"
    //                   onClick={() => {
    //                     onCreateNewRecordFn(
    //                       "meal",
    //                       dayOfWeek.code,
    //                       mealType.code
    //                     );
    //                   }}
    //                 >
    //                   Create Meal
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default NewCreateMealButton;
