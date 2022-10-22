import React from "react";
const InputCore = (props) => {
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    propType,
    propValue,
    onUpdatePropFn,
    inputOnKeyUpFn,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    selectedFrom,
    fieldDisabled,
    valError,
    inputClasses,
    isRequired,
  } = props;
  if (
    typeOfRecordToChange &&
    formGroupClasses &&
    label &&
    propType &&
    propValue &&
    onUpdatePropFn &&
    inputOnKeyUpFn &&
    thisDayOfWeekCode &&
    thisMealTypeCode &&
    propToUpdate &&
    arrayIndex &&
    selectedFrom &&
    fieldDisabled &&
    valError &&
    inputClasses &&
    isRequired
  ) {
    return (
      <div className={formGroupClasses}>
        <label>
          {isRequired ? <span className="requiredFldLbl">* </span> : null}
          {label}
        </label>
        <input
          type={propType}
          className={inputClasses}
          value={propValue}
          onChange={(e) =>
            onUpdatePropFn(
              typeOfRecordToChange,
              thisDayOfWeekCode,
              thisMealTypeCode,
              propToUpdate,
              arrayIndex,
              propType,
              e,
              selectedFrom
            )
          }
          onKeyUp={(e) => inputOnKeyUpFn(e)}
          disabled={fieldDisabled}
        />
        <div className="alert alert-danger" hidden={valError ? false : true}>
          {valError}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${formGroupClasses}`}>
        <div className="placeholder-glow mt-1">
          <label className="placeholder w-75" />
        </div>
        <div className="placeholder-glow">
          <input className={`${inputClasses} placeholder mt-1`} />
        </div>
        <div className="placeholder-glow mb-1">
          <span className="placeholder w-75"></span>
        </div>
      </div>
    );
  }
};

export default InputCore;
