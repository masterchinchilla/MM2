import React from "react";
const Input = (props) => {
  const {
    formGroupClasses,
    label,
    propType,
    propValue,
    onUpdateProp,
    objType,
    dayOfWeekCode,
    mealTypeCode,
    propToUpdate,
    arrayIndex,
    inputType,
    selectedFrom,
    propTypeForVal,
    fieldDisabled,
    valError,
    inputClasses,
  } = props;
  return (
    <div className={formGroupClasses}>
      <label>{label}</label>
      <input
        type={propType}
        className={inputClasses}
        value={propValue}
        onChange={(e) =>
          onUpdateProp(
            objType,
            dayOfWeekCode,
            mealTypeCode,
            propToUpdate,
            arrayIndex,
            inputType,
            e,
            selectedFrom,
            propTypeForVal
          )
        }
        disabled={fieldDisabled}
      />
      <div className="alert alert-danger" hidden={valError ? false : true}>
        {valError}
      </div>
    </div>
  );
};

export default Input;
