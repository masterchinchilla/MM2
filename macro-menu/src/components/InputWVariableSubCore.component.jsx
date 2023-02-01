import React, { useState, useEffect } from "react";
const InputWVariableSubCore = (props) => {
  const subCoreComponent = props.subCoreComponent;
  const allProps = { message: props.message };
  return (
    <React.Fragment>
      {React.createElement(subCoreComponent, allProps)}
    </React.Fragment>
  );
};

export default InputWVariableSubCore;
