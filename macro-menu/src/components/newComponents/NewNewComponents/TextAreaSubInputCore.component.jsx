import React from "react";
const TextAreaSubInputCore = (props) => {
  const { specificData, specificMethods } = props.specificProps;
  const { fieldDisabled, inputClasses, propValue } = specificData;
  const { updateChildValue, updateParentValue } = specificMethods;
  return (
    <textarea
      className={inputClasses}
      disabled={fieldDisabled}
      onChange={(e) => {
        updateChildValue(e.target.value);
        updateParentValue(e.target.value);
      }}
      value={propValue}
    ></textarea>
  );
};

export default TextAreaSubInputCore;
