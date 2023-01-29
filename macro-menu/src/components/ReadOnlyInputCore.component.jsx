import React from "react";
import dayjs from "dayjs";
const ReadOnlyInputCore = (props) => {
  const {
    formGroupClasses,
    label,
    inputClasses,
    propType,
    propValue,
    recordLoaded,
    excludeLabel,
    valErrors,
    getRndIntegerFn,
  } = props;
  let formatedPropValue;
  if (!propValue) {
    formatedPropValue = propValue;
  } else {
    if (label === "Created " || label === "Last Update ") {
      formatedPropValue = dayjs(propValue).format("dddd, MMMM D, YYYY h:mm A");
    } else {
      formatedPropValue = propValue;
    }
  }
  if (recordLoaded) {
    return (
      <div className={formGroupClasses}>
        <label>{label}</label>
        <input
          className={inputClasses}
          type={propType}
          disabled={true}
          value={formatedPropValue}
          onChange={() => {}}
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
                {valErrors.map((valError) => (
                  <li key={getRndIntegerFn(10000000, 99999999)}>{valError}</li>
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
          <input className={`${inputClasses} placeholder w-90 mt-1`} />
        </div>
        <div className="placeholder-glow mb-1">
          <span className="placeholder w-75"></span>
        </div>
      </div>
    );
  }
};

export default ReadOnlyInputCore;
