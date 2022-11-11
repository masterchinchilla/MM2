import React, { useState, useEffect } from "react";

const InputCore = (props) => {
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    propType,
    inputTypeForHtml,
    propValue,
    onUpdatePropFn,
    inputOnKeyUpFn,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    selectedFrom,
    fieldDisabled,
    // valErrors,
    inputClasses,
    isRequired,
    recordLoaded,
    excludeLabel,
    getRndIntegerFn,
  } = props;
  let valErrors = [];
  let thisElementId = "";
  function setValErrors() {
    thisElementId = getRndIntegerFn(10000000, 99999999);
    if (props.valErrors) {
      valErrors = props.valErrors;
    } else {
      valErrors = [];
      console.log(
        `valErrors for Input Element for ${propToUpdate} with key ${thisElementId} for ${typeOfRecordToChange} not received`
      );
    }
  }
  useEffect(() => {
    if (recordLoaded) {
      setValErrors();
    } else return;
  }, []);
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

        <input
          key={thisElementId}
          type={inputTypeForHtml}
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
        <div
          className="alert alert-danger"
          hidden={valErrors.length > 0 ? false : true}
        >
          {valErrors.length < 1 ? (
            ""
          ) : (
            <ul>
              {valErrors.map((valError) => (
                <li key={getRndIntegerFn(10000000, 99999999)}>{valError}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${formGroupClasses}`}>
        {!excludeLabel ? (
          <div className="placeholder-glow mt-1">
            <label className="placeholder w-75" />
          </div>
        ) : (
          ""
        )}
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
