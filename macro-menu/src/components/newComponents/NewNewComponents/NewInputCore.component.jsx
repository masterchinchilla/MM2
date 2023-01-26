import React, { useState, useEffect } from "react";
import NewInputSubCore from "./NewInputSubCore.component";
const NewInputCore = (props) => {
  const { commonProps, specificProps } = props;
  const { onUpdatePropFn } = commonProps.commonMethods;
  const { specificData } = specificProps;
  const {
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    fieldDisabled,
    recordLoaded,
    propValue,
  } = specificData;
  const [timer, setTimerStateFn] = useState(null);
  const [localValue, setLocalVal] = useState(propValue);
  function updateParentValue(trimmedWNoDblSpcs) {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onUpdatePropFn(
        propToUpdate,
        trimmedWNoDblSpcs,
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        arrayIndex
      );
    }, 500);
    setTimerStateFn(newTimer);
  }
  useEffect(() => {
    if (fieldDisabled) {
      setLocalVal(propValue);
    }
  });
  useEffect(() => {
    setLocalVal(propValue);
  }, [recordLoaded]);
  return (
    <NewInputSubCore
      commonProps={commonProps}
      specificProps={{
        specificData: {
          propValue: localValue,
          ...specificData,
        },
        specificMethods: {
          updateParentValue: updateParentValue,
          updateChildValue: setLocalVal,
        },
      }}
    />
  );
};

export default NewInputCore;
