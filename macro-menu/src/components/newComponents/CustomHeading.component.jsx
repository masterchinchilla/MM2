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
  const CustomHeading = `h${headingLvl}`;
  return (
    <CustomHeading
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
    </CustomHeading>
  );
};

export default CustomHeading;
