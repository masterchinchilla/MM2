import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import MealsCard from "./MealsCard.component";
import NewMacrosTable from "./NewMacrosTable.component";
const DayMealsAndMacros = (props) => {
  const {
    thisStateObjBackup,
    currentGRFUser,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: null,
          weekMealPlan: { _id: null },
        },
      };
  const { thisRecord } = thisStateObj;
  const { _id, weekMealPlan } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "day";
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
                key={`macroTblStickyBoxFor${typeOfRecordToChange}${thisRecordId}`}
                offsetTop={20}
                offsetBottom={20}
                className={"dayMacTable"}
              >
                <NewMacrosTable
                  key={`macrosTblFor${typeOfRecordToChange}${thisRecordId}`}
                  thisWMPRecord={weekMealPlan}
                  tableType={"Day Macros"}
                  thisMealType={{}}
                  theseIngrdnts={[]}
                />
              </StickyBox>
              <MealsCard
                key={`mealsCardFor${typeOfRecordToChange}${thisRecordId}`}
                thisStateObj={thisStateObj}
                thisStateObjBackup={thisStateObjBackup}
                currentGRFUser={currentGRFUser}
                validatePropFn={validatePropFn}
                onClickEditFn={onClickEditFn}
                onClickCancelFn={onClickCancelFn}
                onUpdatePropFn={onUpdatePropFn}
                onClickSaveFn={onClickSaveFn}
                onClickDeleteFn={onClickDeleteFn}
                getRndIntegerFn={getRndIntegerFn}
                onCreateNewRecordFn={onCreateNewRecordFn}
                populateMealIngrdntsFn={populateMealIngrdntsFn}
                trimEnteredValueFn={trimEnteredValueFn}
                allUnitOfMeasures={allUnitOfMeasures}
                allWeightTypes={allWeightTypes}
                allBrands={allBrands}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayMealsAndMacros;
