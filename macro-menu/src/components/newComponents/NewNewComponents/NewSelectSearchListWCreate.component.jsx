import React, { useState, useEffect } from "react";
import { csValidateProp } from "../../../services/validationService";
import CreatableSelect from "react-select/creatable";
const NewSelectSearchListWCreate = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { thisDayOfWeekCode, thisMealTypeCode, arrayIndex } = commonData;
  const {
    getRndIntegerFn,
    onUpdatePropFn,
    trimEnteredValueFn,
    onCreateNewRecordFn,
  } = commonMethods;
  const {
    formGroupClasses,
    options,
    valErrors,
    propToUpdate,
    typeOfRecordToChange,
    recordToSelect,
    label,
    excludeLabel,
    fieldDisabled,
    isRequired,
    inputClasses,
    recordLoaded,
  } = specificData;
  const {} = specificMethods;
  const [localOptions, updateLocalOptionsStateFn] = useState([
    { label: "", value: "" },
  ]);
  const [newOptionValErrors, updateNewOptionValErrorsStateFn] =
    useState(valErrors);
  function handleSelectValue(selected) {
    if (selected) {
      onUpdatePropFn(
        propToUpdate,
        selected.value,
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        arrayIndex
      );
    }
    updateNewOptionValErrorsStateFn([]);
  }
  function handleCheckForOptionMatchEnteredText(trimmedValueWNoDblSpcs) {
    const regexObj = new RegExp(trimmedValueWNoDblSpcs, "i");
    let filteredOptions = localOptions.filter((option) => {
      return regexObj.test(option.label);
    });
    if (filteredOptions.length < 1) {
      return false;
    } else {
      return true;
    }
  }
  function handleValEnteredText(trimmedValueWNoDblSpcs) {
    const valErrors = csValidateProp("name", trimmedValueWNoDblSpcs, "name");
    updateNewOptionValErrorsStateFn(valErrors);
    return valErrors ? false : true;
  }
  function handleTrimAndValIfNewOption(newValue) {
    const trimmedValueWNoDblSpcs = trimEnteredValueFn(newValue);
    const optionMatchesEnteredText = handleCheckForOptionMatchEnteredText(
      trimmedValueWNoDblSpcs
    );
    if (!optionMatchesEnteredText) {
      handleValEnteredText(trimmedValueWNoDblSpcs);
    } else {
      updateNewOptionValErrorsStateFn([]);
    }
  }
  useEffect(() => {
    let newArray = [];
    options.forEach((element) => {
      newArray.push({ label: element.name, value: element });
    });
    updateLocalOptionsStateFn(newArray);
  }, []);
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        <div
          className="alert alert-danger selectFieldValError valErrorsListDiv"
          hidden={newOptionValErrors.length > 0 ? false : true}
        >
          {newOptionValErrors.length < 1 ? (
            ""
          ) : (
            <ul>
              {newOptionValErrors.map((valError) => (
                <li key={getRndIntegerFn(10000000, 99999999)}>{valError}</li>
              ))}
            </ul>
          )}
        </div>
        {!excludeLabel ? (
          <label>
            {!fieldDisabled && isRequired ? (
              <span className="requiredFldLbl">* </span>
            ) : (
              ""
            )}
            {label}
          </label>
        ) : (
          ""
        )}
        <CreatableSelect
          value={{
            label: recordToSelect.name,
            value: recordToSelect._id,
          }}
          options={localOptions}
          placeholder={`Select ${label}`}
          isSearchable={true}
          onInputChange={handleTrimAndValIfNewOption}
          onChange={handleSelectValue}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={(newValue) =>
            onCreateNewRecordFn(propToUpdate, newValue)
          }
          isValidNewOption={(newValue) => {
            let trimmedNameWNoDblSpcs = trimEnteredValueFn(newValue);
            let nameLength = trimmedNameWNoDblSpcs.length;
            if (nameLength >= 3 && nameLength <= 255) {
              return true;
            } else {
              return false;
            }
          }}
          onBlur={() => updateNewOptionValErrorsStateFn([])}
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

export default NewSelectSearchListWCreate;
