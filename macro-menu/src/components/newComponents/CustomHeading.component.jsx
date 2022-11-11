import React from "react";
const CustomHeading = (props) => {
  const {
    headingLvl,
    recordLoaded,
    headingText,
    hdngIsReqFormLbl,
    editingForm,
    headingClasses,
  } = props;
  const ThisHeading = `h${headingLvl}`;
  return (
    <ThisHeading
      className={
        recordLoaded
          ? headingClasses
          : `${headingClasses} placeholder-glow w-75`
      }
    >
      {!recordLoaded ? (
        <span className="placeholder w-75"></span>
      ) : hdngIsReqFormLbl && editingForm ? (
        <span>
          <span className="requiredFldLbl">{"* "}</span>
          <span>{headingText}</span>
        </span>
      ) : (
        <span>{headingText}</span>
      )}
    </ThisHeading>
  );
};

export default CustomHeading;
