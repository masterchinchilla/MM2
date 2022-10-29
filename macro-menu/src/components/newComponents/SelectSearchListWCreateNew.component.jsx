import React, { useState, useEffect } from "react";
import Creatable from "react-select/creatable";
import _ from "lodash";
const SelectSearchListWCreateNew = (props) => {
  const {
    recordToSelect,
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
    valError,
    onUpdatePropFn,
    validateProp,
    onCreateNewRecordFn,
    trimEnteredValue,
    isRequired,
    recordLoaded,
  } = props;
  const options =
    props.options.length > 0 ? props.options : [{ name: null, _id: null }];
  const [localOptions, updateLocalOptionsStateFn] = useState([]);
  const [newOptionValError, updateNewOptionValErrorStateFn] =
    useState(valError);
  function setStateOnLoad() {
    let newArray = [];
    options.forEach((element) => {
      newArray.push({ label: element.name, value: element._id });
    });
    updateLocalOptionsStateFn(newArray);
  }

  useEffect(() => {
    setStateOnLoad();
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
    updateNewOptionValErrorStateFn(null);
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
    const valError = validateProp(
      propType,
      propToUpdate,
      trimmedValueWNoDblSpcs
    );
    updateNewOptionValErrorStateFn(valError);
    return valError ? false : true;
  }
  function handleTrimAndValEnteredText(e) {
    const trimmedValueWNoDblSpcs = trimEnteredValue(e);
    const isValidNewOption = handleValEnteredText(trimmedValueWNoDblSpcs);
    return isValidNewOption;
  }

  function handleTrimAndValIfNewOption(e) {
    const trimmedValueWNoDblSpcs = trimEnteredValue(e);
    const optionMatchesEnteredText = handleCheckForOptionMatchEnteredText(
      trimmedValueWNoDblSpcs
    );
    if (!optionMatchesEnteredText) {
      handleValEnteredText(trimmedValueWNoDblSpcs);
    } else {
      updateNewOptionValErrorStateFn(null);
    }
  }
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        <div
          className="alert alert-danger selectFieldValError"
          hidden={newOptionValError ? false : true}
        >
          {newOptionValError}
        </div>
        {isRequired && !fieldDisabled ? (
          <span className="requiredFldLbl">* </span>
        ) : null}
        <Creatable
          value={{
            label: recordToSelect.name,
            value: recordToSelect._id,
          }}
          options={localOptions}
          placeholder={`Select ${propNameSentenceCase}`}
          isSearchable={true}
          onInputChange={(e) => {
            handleTrimAndValIfNewOption(e);
          }}
          onChange={(e) => {
            handleSelectValue(e);
          }}
          isDisabled={fieldDisabled}
          className={inputClasses}
          onCreateOption={(e) => onCreateNewRecordFn(e)}
          isValidNewOption={(e) => handleTrimAndValEnteredText(e)}
          onBlur={() => updateNewOptionValErrorStateFn(null)}
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

export default SelectSearchListWCreateNew;
