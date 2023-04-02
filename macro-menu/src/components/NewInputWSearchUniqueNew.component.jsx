import React, { useEffect, useState } from "react";
import httpService from "../services/httpService";
import { csValidateProp } from "../services/validationService";
import InputCoreWithoutLocalState from "./InputCoreWithoutLocalState.component";
const NewInputWSearchUniqueNew = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot } = commonData;
  const {
    onUpdatePropFn,
    returnElementKey,
    getRndIntegerFn,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
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
    propNameSentenceCase,
    localPropValue,
    excludeLabel,
    origPropValue,
    thisRecordId,
  } = specificData;
  const { changeLocalPropFn, updatePropValErrorsStateFn } = specificMethods;
  const [timer, setTimerStateFn] = useState(null);
  const [localValErrors, setLclValErrsStateFn] = useState(valErrors);
  const fetchBaseURL =
    backEndHtmlRoot + `${typeOfRecordToChange}s/findby${propToUpdate}/`;
  function handleUpdateLocalPropFn(
    propToUpdate,
    newValue,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex
  ) {
    if (newValue === "") {
      setLclValErrsStateFn([`${propNameSentenceCase} cannot be empty`]);
      updatePropValErrorsStateFn([`${propNameSentenceCase} cannot be empty`]);
    }
    changeLocalPropFn(newValue);
  }
  async function searchSetUnique(e) {
    const trimmedWNoDblSpcs = trimEnteredValueFn(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      if (origPropValue !== trimmedWNoDblSpcs) {
        if (trimmedWNoDblSpcs) {
          try {
            const matchingRecords = await onSrchDBForObjWMtchngNmeFn(
              typeOfRecordToChange,
              propToUpdate,
              trimmedWNoDblSpcs,
              `get`
            );
            let nameError;
            for (let i = 0; i < matchingRecords.length; i++) {
              if (matchingRecords[i]._id == thisRecordId) {
              } else {
                nameError = `Another ${typeOfRecordToChange} is already using that name`;
                setLclValErrsStateFn([nameError]);
                updatePropValErrorsStateFn([nameError]);
              }
            }
            if (!nameError) {
              let valFnResults = csValidateProp(
                propToUpdate,
                trimmedWNoDblSpcs,
                propToUpdate
              );
              if (valFnResults.length > 0) {
                setLclValErrsStateFn([valFnResults]);
                updatePropValErrorsStateFn([valFnResults]);
                return;
              } else {
                setLclValErrsStateFn("");
                updatePropValErrorsStateFn([]);
                onUpdatePropFn(
                  propToUpdate,
                  trimmedWNoDblSpcs,
                  typeOfRecordToChange,
                  thisDayOfWeekCode,
                  thisMealTypeCode,
                  arrayIndex
                );
              }
            }
          } catch (valErrsNestedArray) {
            const errMessage = valErrsNestedArray[0]["all"][0];
            setLclValErrsStateFn([errMessage]);
            updatePropValErrorsStateFn([errMessage]);
          }
        }
      }
    }, 500);
    setTimerStateFn(newTimer);
  }

  useEffect(() => {
    setLclValErrsStateFn(valErrors);
  });
  return (
    <InputCoreWithoutLocalState
      commonProps={{
        commonData: {},
        commonMethods: {
          getRndIntegerFn: getRndIntegerFn,
          returnElementKey: returnElementKey,
          onUpdatePropFn: handleUpdateLocalPropFn,
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
          valErrors: localValErrors,
          inputClasses: inputClasses,
          isRequired: isRequired,
          recordLoaded: recordLoaded,
          excludeLabel: excludeLabel,
          inputTypeForHtml: "text",
          propValue: localPropValue,
        },
        specificMethods: { inputOnKeyUpFn: searchSetUnique },
      }}
    />
  );
};

export default NewInputWSearchUniqueNew;
