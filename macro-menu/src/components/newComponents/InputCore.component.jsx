import React from "react";
const InputCore = (props) => {
  const {
    recordToChange,
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
    recordToChange &&
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
              recordToChange,
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
          <input className={`${inputClasses} placeholder w-90 mb-2`} />
        </div>
        <div className="placeholder-glow mb-1">
          <span className="placeholder w-75"></span>
        </div>
      </div>
    );
  }
};

export default InputCore;
