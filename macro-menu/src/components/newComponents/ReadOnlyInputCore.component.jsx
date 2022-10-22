import React from "react";
const ReadOnlyInputCore = (props) => {
  const { formGroupClasses, label, inputClasses, propType, propValue } = props;
  if (formGroupClasses && label && inputClasses && propType && propValue) {
    return (
      <div className={formGroupClasses}>
        <label>{label}</label>
        <input
          className={inputClasses}
          type={propType}
          disabled={true}
          value={propValue}
          onChange={() => {}}
        />
      </div>
    );
  } else {
    return (
      <div className={`${formGroupClasses}`}>
        <div className="placeholder-glow mt-1">
          <label className="placeholder w-75" />
        </div>
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
