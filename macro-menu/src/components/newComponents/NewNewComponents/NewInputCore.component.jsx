import React, { useState, useEffect } from "react";
import NewInputSubCore from "./NewInputSubCore.component";
const NewInputCore = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    fieldDisabled,
    valErrors,
    inputClasses,
    isRequired,
    recordLoaded,
    excludeLabel,
    inputTypeForHtml,
    propValue,
  } = specificData;
  const [timer, setTimerStateFn] = useState(null);
  const [localValue, setLocalVal] = useState(propValue);
  function updateParentValue(trimmedWNoDblSpcs) {
    // const trimmedWNoDblSpcs = trimEnteredValueFn(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      console.log(trimmedWNoDblSpcs);
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
      commonProps={{
        commonData: {},
        commonMethods: {
          getRndIntegerFn: getRndIntegerFn,
          returnElementKey: returnElementKey,
        },
      }}
      specificProps={{
        specificData: {
          typeOfRecordToChange: typeOfRecordToChange,
          formGroupClasses: formGroupClasses,
          label: label,
          thisDayOfWeekCode: thisDayOfWeekCode,
          thisMealTypeCode: thisMealTypeCode,
          propToUpdate: propToUpdate,
          arrayIndex: arrayIndex,
          fieldDisabled: fieldDisabled,
          valErrors: valErrors,
          inputClasses: inputClasses,
          isRequired: isRequired,
          recordLoaded: recordLoaded,
          excludeLabel: excludeLabel,
          inputTypeForHtml: inputTypeForHtml,
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
