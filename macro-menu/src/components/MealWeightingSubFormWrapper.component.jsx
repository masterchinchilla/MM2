import React from "react";
import MealWeightingTbl from "./MealWeightingTbl.component";
import NewMealWeightingSubForm from "./NewMealWeightingSubForm.component";
const MealWeightingSubFormWrapper = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData } = commonProps;
  const { mode } = commonData;
  const { specificData } = specificProps;
  const { thisStateObj } = specificData;
  const { thisRecord } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id;
  if (mode === "builder") {
    return (
      <NewMealWeightingSubForm
        key={`NewMealWeightingSubForm for WMP ${thisRecordId}`}
        {...props}
      />
    );
  } else {
    return <MealWeightingTbl thisRecord={thisRecord} />;
  }
};

export default MealWeightingSubFormWrapper;
