import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
const NewNewSelectSearchListWCreate = (props) => {
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
    defaultOptions,
    valErrors,
    propToUpdate,
    typeOfRecordToChange,
    selectedRecord,
    label,
    excludeLabel,
    fieldDisabled,
    isRequired,
    inputClasses,
    recordLoaded,
  } = specificData;
  const {} = specificMethods;
  const selectedOption = { label: selectedRecord.name, value: selectedRecord };
  const [localOptions, updateLocalOptionsStateFn] = useState([
    { label: "", value: "" },
  ]);
  const handleCreateNewRecordFn = (inputValue) => {
    onCreateNewRecordFn(propToUpdate, inputValue);
  };
  function validateNewOptionFn(newValue) {
    const trimmedValueWNoDblSpcs = trimEnteredValueFn(newValue);
    const regexObj = new RegExp(trimmedValueWNoDblSpcs, "i");
    let filteredOptions = localOptions.filter((option) => {
      return regexObj.test(option.label);
    });
    if (filteredOptions.length > 0) {
      return false;
    } else {
      let nameLength = trimmedValueWNoDblSpcs.length;
      if (nameLength >= 3 && nameLength <= 255) {
        return true;
      } else {
        return false;
      }
    }
  }
  useEffect(() => {
    let newArray = [];
    defaultOptions.forEach((element) => {
      newArray.push({ label: element.name, value: element });
    });
    updateLocalOptionsStateFn(newArray);
  }, [defaultOptions.length !== localOptions.length]);
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        <div
          className="alert alert-danger selectFieldValError valErrorsListDiv"
          hidden={valErrors.length > 0 ? false : true}
        >
          {valErrors.length < 1 ? (
            ""
          ) : (
            <ul>
              {valErrors.map((localValError) => (
                <li key={getRndIntegerFn(10000000, 99999999)}>
                  {localValError}
                </li>
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
          isClearable={false}
          isDisabled={fieldDisabled}
          onChange={(newValue) =>
            onUpdatePropFn(
              propToUpdate,
              newValue.value,
              typeOfRecordToChange,
              thisDayOfWeekCode,
              thisMealTypeCode,
              arrayIndex
            )
          }
          onCreateOption={handleCreateNewRecordFn}
          options={localOptions}
          value={selectedOption}
          isValidNewOption={validateNewOptionFn}
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
export default NewNewSelectSearchListWCreate;
