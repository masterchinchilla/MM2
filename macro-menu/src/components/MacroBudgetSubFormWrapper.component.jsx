import React from "react";
import NewMacroBudgetSubForm from "./NewMacroBudgetSubForm.component";
import MacroBdgtTbl from "./MacroBdgtTbl.component";
const MacroBudgetSubFormWrapper = (props) => {
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
      <NewMacroBudgetSubForm
        key={`NewMacroBudgetSubForm for WMP ${thisRecordId}`}
        {...props}
      />
    );
  } else {
    return <MacroBdgtTbl />;
  }
};

export default MacroBudgetSubFormWrapper;
