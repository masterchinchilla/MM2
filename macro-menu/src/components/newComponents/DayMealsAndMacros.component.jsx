import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import MealsCard from "./MealsCard.component";
import NewMacrosTable from "./NewMacrosTable.component";
const DayMealsAndMacros = (props) => {
  const {
    thisStateObjBackup,
    currentGRFUser,
    validateProp,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
  } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          weekMealPlan: null,
        },
      };
  const { thisRecord } = thisStateObj;
  const thisWeekMealPlan = thisRecord.thisWeekMealPlan
    ? thisRecord.thisWeekMealPlan
    : {
        thisRecord: {
          _id: null,
        },
      };
  const thisWMPRecord = thisWeekMealPlan.thisRecord;
  const thisRecordId = thisRecord._id;
  return (
    <div className="card-body">
      <div
        className="accordion accordion-flush"
        id={"accordionFull" + thisRecordId}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"accordionHeader" + thisRecordId}
          >
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#dayAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
          <div
            id={"dayAccrdn" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader" + thisRecordId}
            data-bs-parent={"#accordionFull" + thisRecordId}
          >
            <div className="accordion-body">
              <StickyBox
                key={`macroTblStickyBoxForDay${thisRecordId}`}
                offsetTop={20}
                offsetBottom={20}
                className={"dayMacTable"}
              >
                <NewMacrosTable
                  key={`macrosTblForDay${thisRecordId}`}
                  thisWMPRecord={thisWMPRecord._id ? thisWMPRecord : null}
                  tableType={"Day Macros"}
                  thisMealTypeCode={null}
                  theseIngrdnts={[]}
                />
              </StickyBox>
              <MealsCard
                key={`mealsCardForDay${thisRecordId}`}
                thisStateObj={thisStateObj}
                currentGRFUser={currentGRFUser}
                validateProp={validateProp}
                onClickEditFn={onClickEditFn}
                onClickCancelFn={onClickCancelFn}
                onUpdatePropFn={onUpdatePropFn}
                onClickSaveFn={onClickSaveFn}
                onClickDeleteFn={onClickDeleteFn}
                getRndIntegerFn={getRndIntegerFn}
                onCreateNewRecordFn={onCreateNewRecordFn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayMealsAndMacros;
