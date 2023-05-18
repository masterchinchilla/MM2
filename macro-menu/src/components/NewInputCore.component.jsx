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
    propLineage,
    componentLineage,
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
      key={`NewInputSubCore_for_${propToUpdate}_for_${componentLineage}`}
      commonProps={commonProps}
      specificProps={{
        specificData: {
          ...specificData,
          propValue: localValue,
          componentLineage: `NewInputSubCore_for_${propToUpdate}_for_${componentLineage}`,
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
