import React from "react";
const InputCoreWithoutLocalState = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { onUpdatePropFn, returnElementKey } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    fieldDisabled,
    valErrors,
    inputClasses,
    isRequired,
    recordLoaded,
    excludeLabel,
    inputTypeForHtml,
    propValue,
    propLineage,
    componentLineage,
  } = specificData;
  const { inputOnKeyUpFn } = specificMethods;
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
          type={inputTypeForHtml}
          className={inputClasses}
          value={propValue}
          onChange={(e) =>
            onUpdatePropFn(
              propToUpdate,
              e.target.value,
              typeOfRecordToChange,
              thisDayOfWeekCode,
              thisMealTypeCode,
              arrayIndex
            )
          }
          onKeyUp={inputOnKeyUpFn}
          disabled={fieldDisabled}
        />
        {!valErrors ? (
          ""
        ) : (
          //This conditional is necessary for an esoteric reason: In some DB tables, some records are missing some columns that were added later. This means when the record is retrieved, it lacks a key-value pair. The state object builder uses a ObjectKeys array loop to build content like the valErrors complex object. When it comes to these records missing fields, it will fail to build a corresponding valError object, and when we try to access that object below, it will throw an error and crash the app.
          <div
            className="alert alert-danger valErrorsListDiv"
            hidden={valErrors.length > 0 ? false : true}
          >
            {valErrors.length < 1 ? (
              ""
            ) : (
              <ul>
                {valErrors.map((valError, index) => (
                  <li
                    key={`li_for_valErr_${index}_for_${propToUpdate}_for_${componentLineage}`}
                  >
                    {valError}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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

export default InputCoreWithoutLocalState;
