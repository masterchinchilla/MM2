import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import httpService from "../services/httpService";
import { csValidateProp } from "../services/validationService";
const NewNewAsyncSearchSelectWCreate = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {} = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onCreateNewRecordFn,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    propToUpdate,
    fieldDisabled,
    initialFieldValErrs,
    inputClasses,
    isRequired,
    recordLoaded,
    excludeLabel,
    selectedRecord,
    fetchDataUrl,
  } = specificData;
  const {} = specificMethods;
  const selectedObj = selectedRecord
    ? { label: selectedRecord.name, value: selectedRecord }
    : { label: "", value: { _id: "", name: "" } };
  const [localNameValErrs, setLclValErrsStateFn] =
    useState(initialFieldValErrs);
  const [localName, updateLocalName] = useState(selectedObj.value.name);
  const thisRecordId = selectedRecord
    ? selectedRecord._id
    : getRndIntegerFn(10000000, 99999999);
  function handleValEnteredTextFn(trimmedWNoDblSpcs) {
    const newValErrors = csValidateProp(
      propToUpdate,
      trimmedWNoDblSpcs,
      "name"
    );
    setLclValErrsStateFn(newValErrors);
    return newValErrors.length > 0 ? false : true;
  }
  async function fetchData(inputValue, callback) {
    if (!inputValue) {
      callback([]);
    } else {
      const trimmedWNoDblSpcs = trimEnteredValueFn(inputValue);
      try {
        const matchingRecords = await onSrchDBForObjWMtchngNmeFn(
          typeOfRecordToChange,
          propToUpdate,
          trimmedWNoDblSpcs,
          `getSimilar`
        );
        const tempArray = [];
        if (matchingRecords.length > 0) {
          matchingRecords.forEach((element) => {
            tempArray.push({
              label: `${element.name}`,
              value: element,
            });
          });
        } else {
          const isValidNewOption = handleValEnteredTextFn(trimmedWNoDblSpcs);
          if (isValidNewOption) {
            setLclValErrsStateFn([]);
            updateLocalName(trimmedWNoDblSpcs);
          } else {
            updateLocalName(`""`);
          }
        }
        callback(tempArray);
      } catch (valErrsNestedArray) {
        const errMessage = valErrsNestedArray[0]["all"][0];
        setLclValErrsStateFn([errMessage]);
      }
      // httpService
      //   .get(`${fetchDataUrl}/${trimmedWNoDblSpcs}`)
      //   .then((response) => {
      //     const tempArray = [];
      //     if (response.data.length > 0) {
      //       response.data.forEach((element) => {
      //         tempArray.push({
      //           label: `${element.name}`,
      //           value: element,
      //         });
      //       });
      //     } else {
      //       const isValidNewOption = handleValEnteredTextFn(
      //         trimmedWNoDblSpcs
      //       );
      //       if (isValidNewOption) {
      //         setLclValErrsStateFn([]);
      //         updateLocalName(trimmedWNoDblSpcs);
      //       } else {
      //         updateLocalName("");
      //       }
      //     }
      //     callback(tempArray);
      //   })
      //   .catch((err) => {
      //     setLclValErrsStateFn([JSON.stringify(err.message)]);
      //   });
    }
  }
  function onSearchChange(selectedObj) {
    let newValue = selectedObj.value;
    if (newValue) {
      onUpdatePropFn(
        propToUpdate,
        newValue,
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        arrayIndex
      );
    }
  }
  function resetLocalState() {
    setLclValErrsStateFn(initialFieldValErrs);
    updateLocalName(selectedObj.value.name);
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
            {label}
          </label>
        ) : (
          ""
        )}
        <div
          className="alert alert-danger valErrorsListDiv topValErrors"
          hidden={localNameValErrs.length > 0 ? false : true}
        >
          {localNameValErrs.length < 1 ? (
            ""
          ) : (
            <ul>
              {localNameValErrs.map((valError) => (
                <li key={getRndIntegerFn(10000000, 99999999)}>{valError}</li>
              ))}
            </ul>
          )}
        </div>
        <AsyncCreatableSelect
          key={`AsyncCreateableFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
          value={selectedObj}
          loadOptions={fetchData}
          placeholder={label}
          onChange={onSearchChange}
          defaultOptions={true}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={() => onCreateNewRecordFn(localName)}
          allowCreateWhileLoading={false}
          isValidNewOption={(newValue) => {
            let trimmedNameWNoDblSpcs = trimEnteredValueFn(newValue);
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

export default NewNewAsyncSearchSelectWCreate;
