import React, { useState, useEffect } from "react";
import DayControlAndDisabledFields from "./DayControlAndDisabledFields.component";
import DayMealsAndMacros from "./DayMealsAndMacros.component";

const DayCard = (props) => {
  const {
    onClickEditFn,
    onClickCancelFn,
    onClickDeleteFn,
    getRndIntegerFn,
    thisStateObjBackup,
    currentGRFUser,
    validatePropFn,
    onUpdatePropFn,
    onClickSaveFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    backEndHtmlRoot,
  } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        thisRecord: { _id: null },
      };
  const { thisRecord } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "day";
  return (
    <div className="card mt-3 mb-3">
      <DayControlAndDisabledFields
        key={`DayCtrlAndDsbldFldsFor${typeOfRecordToChange}${thisRecordId}`}
        thisStateObj={thisStateObj}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onClickDeleteFn={onClickDeleteFn}
        getRndIntegerFn={getRndIntegerFn}
      />
      <DayMealsAndMacros
        key={`DayMealsAndMacrosFor${typeOfRecordToChange}${thisRecordId}`}
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
        backEndHtmlRoot={backEndHtmlRoot}
      />
    </div>
  );
};

export default DayCard;
