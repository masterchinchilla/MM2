import React, { useState, useEffect } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import httpService from "../../services/httpService";
const AsyncSearchSelectWCreateNew = (props) => {
  const {
    formGroupClasses,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    recordToSelect,
    propType,
    propToUpdateSentenceCase,
    propToUpdate,
    trimEnteredValueFn,
    fetchDataUrl,
    validatePropFn,
    valErrors,
    notifyFn,
    onUpdatePropFn,
    onCreateNewRecordFn,
    fieldDisabled,
    inputClasses,
    recordLoaded,
  } = props;
  const selectedFrom = [];
  const [matchesExist, updateMatchesExist] = useState(false);
  const [newOptionValErrors, updateNewOptionValErrorsStateFn] =
    useState(valErrors);
  const [localName, updateLocalName] = useState(recordToSelect.name);
  function handleValEnteredTextFn(trimmedValueWNoDblSpcs) {
    const valErrors = validatePropFn(
      propType,
      propToUpdate,
      trimmedValueWNoDblSpcs
    );
    updateNewOptionValErrorsStateFn(valErrors);
    return valErrors ? false : true;
  }
  function fetchData(inputValue, callback) {
    if (!inputValue) {
      callback([]);
    } else {
      const trimmedValueWNoDblSpcs = trimEnteredValueFn(inputValue);
      httpService
        .get(fetchDataUrl, trimmedValueWNoDblSpcs)
        .then((response) => {
          const tempArray = [];
          if (response.data.length > 0) {
            updateMatchesExist(true);
            response.data.forEach((element) => {
              tempArray.push({
                label: `${element.name}`,
                value: JSON.stringify(element),
              });
            });
          } else {
            const isValidNewOption = handleValEnteredTextFn(
              trimmedValueWNoDblSpcs
            );
            if (isValidNewOption) {
              updateMatchesExist(false);
              updateNewOptionValErrorsStateFn(null);
              updateLocalName(trimmedValueWNoDblSpcs);
            } else {
              updateMatchesExist(false);
              updateLocalName("");
            }
          }
          callback(tempArray);
        })
        .catch((err) => {
          notifyFn(err, "error");
          // if (err.response.data) {
          //   notifyFn(err.response.data.errorMsg, "error");
          //   const valErrorsArray = err.response.data.valErrorsArray;
          //   const valErrorsObjToUpdate = {};
          //   if (valErrorsArray) {
          //     for (let i = 0; i < valErrorsArray.length; i++) {
          //       let thisValErrorObj = valErrorsArray[i];
          //       let thisValErrorObjKeys = Object.keys(thisValErrorObj);
          //       for (let i = 0; i < thisValErrorObjKeys.length; i++) {
          //         let thisValErrorObjKey = thisValErrorObjKeys[i];
          //         let thisValError = thisValErrorObj[thisValErrorObjKey];
          //         valErrorsObjToUpdate[thisValErrorObjKey] = thisValError;
          //         notifyFn(thisValError, "error");
          //       }
          //     }
          //     updateNewOptionValErrorsStateFn(valErrorsObjToUpdate);
          //   }
          // }
        });
    }
  }
  function onSearchChange(e) {
    if (e) {
      onUpdatePropFn(
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        propToUpdate,
        arrayIndex,
        propType,
        e.value,
        selectedFrom
      );
    }
  }
  function resetLocalState() {
    updateMatchesExist(false);
    updateNewOptionValErrorsStateFn(valErrors);
    updateLocalName(recordToSelect.name);
  }
  function handleTrimAndValEnteredText(e) {
    const trimmedValueWNoDblSpcs = trimEnteredValueFn(e);
    const isValidNewOption = handleValEnteredTextFn(trimmedValueWNoDblSpcs);
    return isValidNewOption;
  }
  function renderNewOptionValErrors() {
    if (newOptionValErrors.length > 0) {
      newOptionValErrors.map((valError) => {
        return (
          <div className="alert alert-danger selectFieldValError">
            {valError}
          </div>
        );
      });
    } else {
      return "";
    }
  }
  if (recordLoaded) {
    return (
      <div>
        {renderNewOptionValErrors()}
        <AsyncCreatableSelect
          value={{
            label: recordToSelect.name,
            value: recordToSelect,
          }}
          loadOptions={fetchData}
          placeholder={propToUpdateSentenceCase}
          onChange={(e) => {
            onSearchChange(e);
          }}
          defaultOptions={true}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={(e) => onCreateNewRecordFn(e)}
          allowCreateWhileLoading={false}
          isValidNewOption={(e) => {
            handleTrimAndValEnteredText(e);
          }}
          onBlur={resetLocalState()}
        />
      </div>
    );
  } else {
    return (
      <div className={`${formGroupClasses} selectPlaceholderFormGrp`}>
        <div className="placeholder-glow">
          <span className="placeholder w-50"></span>
        </div>
        <div className="placeholder-glow">
          <select className={`${inputClasses} placeholder w-75`} />
        </div>
      </div>
    );
  }
};

export default AsyncSearchSelectWCreateNew;
