import React from "react";
const TableCell = (props) => {
  const { tCellType, data, tCellClasses, scope, recordLoaded } = props;
  const TCellType = tCellType;
  let tCellClassesToUse;
  let dataToRender;
  if (recordLoaded) {
    if (data) {
      tCellClassesToUse = tCellClasses;
      dataToRender = data;
    } else {
      tCellClassesToUse = "";
      dataToRender = "N/A";
    }
  } else {
    tCellClassesToUse = "placeholder-glow";
    dataToRender = <span className="placeholder"></span>;
  }
  return (
    <TCellType scope={scope ? scope : ""} className={tCellClassesToUse}>
      {dataToRender}
    </TCellType>
  );
};
export default TableCell;
