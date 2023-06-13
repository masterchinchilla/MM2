import React from "react";
import CustomHeading from "./CustomHeading.component";
const NewCreateDayButton = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { mode } = commonData;
  const { onCreateNewRecordFn } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const thisRecord = thisStateObj.thisRecord;
  const { _id, dayOfWeek } = thisRecord;
  const thisRecordId = _id;
  return (
    <div
      className={`card${
        mode === `spreadsheet` ? ` sprdshtCard sprdshtSlimCard` : ``
      }`}
    >
      <div
        className={`card-header${
          mode === `spreadsheet` ? ` cntrdSprdshtHdr` : ``
        }`}
      >
        <CustomHeading
          key={`CustomHeading_for_"NewCreateDayButton"_for_day_${thisRecordId}`}
          headingLvl={mode === `builder` ? 3 : 2}
          recordLoaded={
            thisStateObj.recordLoaded ? thisStateObj.recordLoaded : true
          }
          headingText={dayOfWeek.name}
          hdngIsReqFormLbl={false}
          editingForm={null}
          headingClasses={
            mode === `spreadsheet` ? ` sprdshtCardHeading` : `card-title`
          }
        />
        {/* <h3 className="card-title">{dayOfWeek.name}</h3> */}
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
                  <div className="form-group bttnFrmGrp">
                    <button
                      type="button"
                      className="btn btn-primary wmpFormBttn"
                      onClick={() => {
                        onCreateNewRecordFn(
                          "day",
                          dayOfWeek.code,
                          null,
                          null,
                          null
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

export default NewCreateDayButton;
