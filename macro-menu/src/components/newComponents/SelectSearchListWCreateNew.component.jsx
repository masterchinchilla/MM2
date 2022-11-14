import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import _ from "lodash";
const SelectSearchListWCreateNew = (props) => {
  const {
    // recordToSelect,
    typeOfRecordToChange,
    propNameSentenceCase,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    propType,
    arrayIndex,
    formGroupClasses,
    inputClasses,
    fieldDisabled,
    // valErrors,
    onUpdatePropFn,
    validatePropFn,
    onCreateNewRecordFn,
    trimEnteredValueFn,
    isRequired,
    recordLoaded,
    excludeLabel,
    getRndIntegerFn,
  } = props;
  let valErrors = [];
  const recordToSelect = props.recordToSelect
    ? props.recordToSelect
    : { name: "", _id: "" };
  let options;
  // =props.options.length > 0 ? props.options : [{ name: null, _id: null }];
  const [localOptions, updateLocalOptionsStateFn] = useState([
    { label: "", value: "" },
  ]);
  const [newOptionValErrors, updateNewOptionValErrorsStateFn] =
    useState(valErrors);
  let thisRecordId = "";
  function setStateOnLoad() {
    let newArray = [];
    props.options.forEach((element) => {
      console.log(element);
      newArray.push({ label: element.name, value: element._id });
    });
    updateLocalOptionsStateFn(newArray);
  }
  function setValErrors() {
    let localId = getRndIntegerFn(10000000, 99999999);
    if (recordToSelect) {
      thisRecordId = recordToSelect._id;
    } else {
      thisRecordId = localId;
    }
    if (props.valErrors) {
      valErrors = props.valErrors;
    } else {
      valErrors = [];
      // console.log(
      //   `valErrors for Createable Element for ${propToUpdate} with key ${localId} for ${typeOfRecordToChange} not received`
      // );
    }
  }
  useEffect(() => {
    setStateOnLoad();
    setValErrors();
  }, []);
  function handleSelectValue(e) {
    if (e) {
      let eObj = { target: { e } };
      onUpdatePropFn(
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        propToUpdate,
        arrayIndex,
        "reactSelect",
        eObj,
        options
      );
    }
    updateNewOptionValErrorsStateFn([]);
  }
  function handleCheckForOptionMatchEnteredText(trimmedValueWNoDblSpcs) {
    const regexObj = new RegExp(trimmedValueWNoDblSpcs, "i");
    let filteredOptions = options.filter((option) => {
      return regexObj.test(option.label);
    });
    if (filteredOptions.length < 1) {
      return false;
    } else {
      return true;
    }
  }
  function handleValEnteredText(trimmedValueWNoDblSpcs) {
    const valErrors = validatePropFn(
      propType,
      propToUpdate,
      trimmedValueWNoDblSpcs
    );
    updateNewOptionValErrorsStateFn(valErrors);
    return valErrors ? false : true;
  }
  function handleTrimAndValEnteredText(e) {
    const trimmedValueWNoDblSpcs = trimEnteredValueFn(e);
    const isValidNewOption = handleValEnteredText(trimmedValueWNoDblSpcs);
    return isValidNewOption;
  }

  function handleTrimAndValIfNewOption(e) {
    const trimmedValueWNoDblSpcs = trimEnteredValueFn(e);
    const optionMatchesEnteredText = handleCheckForOptionMatchEnteredText(
      trimmedValueWNoDblSpcs
    );
    if (!optionMatchesEnteredText) {
      handleValEnteredText(trimmedValueWNoDblSpcs);
    } else {
      updateNewOptionValErrorsStateFn([]);
    }
  }
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        <div
          className="alert alert-danger selectFieldValError"
          hidden={newOptionValErrors.length > 0 ? false : true}
        >
          {newOptionValErrors.length < 1 ? (
            ""
          ) : (
            <ul>
              {newOptionValErrors.map((valError) => (
                <li>{valError}</li>
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
            {propNameSentenceCase}
          </label>
        ) : (
          ""
        )}
        <CreatableSelect
          key={`CreateableFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
          value={{
            label: recordToSelect.name,
            value: recordToSelect._id,
          }}
          options={localOptions}
          placeholder={`Select ${propNameSentenceCase}`}
          isSearchable={true}
          onInputChange={handleTrimAndValIfNewOption}
          onChange={handleSelectValue}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={(e) => onCreateNewRecordFn(e, propToUpdate)}
          // isValidNewOption={handleTrimAndValEnteredText}
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

export default SelectSearchListWCreateNew;
