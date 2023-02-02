import React, { useState, useEffect } from "react";
import NewInputSubCore from "./NewInputSubCore.component";
const NewInputCore = (props) => {
  const { commonProps, specificProps } = props;
  const { onUpdatePropFn, returnElementKey } = commonProps.commonMethods;
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
    valueChangedExternal,
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
    if (fieldDisabled || valueChangedExternal) {
      setLocalVal(propValue);
    }
  });
  useEffect(() => {
    setLocalVal(propValue);
  }, [recordLoaded]);
  return (
    <NewInputSubCore
      key={returnElementKey(
        null,
        "NewInputSubCore",
        propToUpdate,
        typeOfRecordToChange,
        arrayIndex,
        thisMealTypeCode,
        thisDayOfWeekCode
      )}
      commonProps={commonProps}
      specificProps={{
        specificData: {
          ...specificData,
          propValue: localValue,
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
