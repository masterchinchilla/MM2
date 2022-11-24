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
    // recordToSelect,
    propType,
    propToUpdateSentenceCase,
    propToUpdate,
    trimEnteredValueFn,
    fetchDataUrl,
    validatePropFn,
    valErrors,
    onUpdatePropFn,
    onCreateNewRecordFn,
    fieldDisabled,
    inputClasses,
    recordLoaded,
    getRndIntegerFn,
    excludeLabel,
    isRequired,
  } = props;
  // let valErrors = ["error 1", "error 2 with more text", "error 3"];
  const recordToSelect = props.recordToSelect
    ? props.recordToSelect
    : { name: "", _id: "" };
  const selectedFrom = [];
  const [localValErrors, setLclValErrsStateFn] = useState(valErrors);
  const [localName, updateLocalName] = useState(recordToSelect.name);
  const thisRecordId = recordToSelect
    ? recordToSelect._id
    : getRndIntegerFn(10000000, 99999999);
  function handleValEnteredTextFn(trimmedValueWNoDblSpcs) {
    const newValErrors = validatePropFn(
      propType,
      propToUpdate,
      trimmedValueWNoDblSpcs
    );
    setLclValErrsStateFn(newValErrors);
    return newValErrors.length > 0 ? false : true;
  }
  function fetchData(inputValue, callback) {
    if (!inputValue) {
      callback([]);
    } else {
      const trimmedValueWNoDblSpcs = trimEnteredValueFn(inputValue);
      httpService
        .get(`${fetchDataUrl}/${trimmedValueWNoDblSpcs}`)
        .then((response) => {
          const tempArray = [];
          if (response.data.length > 0) {
            response.data.forEach((element) => {
              tempArray.push({
                label: `${element.name}`,
                value: element,
                // value: JSON.stringify(element),
              });
            });
          } else {
            const isValidNewOption = handleValEnteredTextFn(
              trimmedValueWNoDblSpcs
            );
            if (isValidNewOption) {
              setLclValErrsStateFn([]);
              updateLocalName(trimmedValueWNoDblSpcs);
              console.log(localName);
            } else {
              updateLocalName("");
            }
          }
          callback(tempArray);
        })
        .catch((err) => {
          setLclValErrsStateFn([JSON.stringify(err.message)]);
        });
    }
  }
  function onSearchChange(e) {
    let eObj = { target: { value: e.value } };
    if (e) {
      onUpdatePropFn(
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        propToUpdate,
        arrayIndex,
        propType,
        eObj,
        selectedFrom,
        null
      );
    }
  }
  function resetLocalState() {
    setLclValErrsStateFn(valErrors);
    updateLocalName(recordToSelect.name);
  }
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        {!excludeLabel ? (
          <label>
            {isRequired && !fieldDisabled ? (
              <span className="requiredFldLbl">* </span>
            ) : (
              ""
            )}
            {propToUpdateSentenceCase}
          </label>
        ) : (
          ""
        )}
        <div
          className="alert alert-danger valErrorsListDiv topValErrors"
          hidden={localValErrors.length > 0 ? false : true}
        >
          {localValErrors.length < 1 ? (
            ""
          ) : (
            <ul>
              {localValErrors.map((valError) => (
                <li key={getRndIntegerFn(10000000, 99999999)}>{valError}</li>
              ))}
            </ul>
          )}
        </div>
        <AsyncCreatableSelect
          key={`AsyncCreateableFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
          value={{
            label: recordToSelect.name,
            value: recordToSelect,
          }}
          loadOptions={fetchData}
          placeholder={propToUpdateSentenceCase}
          onChange={onSearchChange}
          defaultOptions={true}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={() => onCreateNewRecordFn(localName)}
          allowCreateWhileLoading={false}
          isValidNewOption={(e) => {
            let trimmedNameWNoDblSpcs = trimEnteredValueFn(e);
            let nameLength = trimmedNameWNoDblSpcs.length;
            if (nameLength >= 3 && nameLength <= 255) {
              return true;
            } else {
              return false;
            }
          }}
          onBlur={resetLocalState}
        />
      </div>
    );
  } else {
    return (
      <div className={`${formGroupClasses} selectPlaceholderFormGrp`}>
        {!excludeLabel ? (
          <div className="placeholder-glow mt-1">
            <label className="placeholder w-75" />
          </div>
        ) : (
          ""
        )}
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
