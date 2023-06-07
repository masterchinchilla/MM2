import React from "react";
import StickyBox from "react-sticky-box";
import NewMacrosTable from "./NewMacrosTable.component";
const MacrosTblInStickyBox = (props) => {
  const {
    componentLineage,
    tableType,
    thisMealType,
    stickyBoxOffsetTop,
    stickyBoxOffsetBottom,
    thisWMPRecord,
    theseIngrdnts,
    recordLoaded,
    getRndIntegerFn,
  } = props;
  return (
    <StickyBox
      key={`StickyBox for ${componentLineage}`}
      offsetTop={stickyBoxOffsetTop}
      offsetBottom={stickyBoxOffsetBottom}
      className={"dayMacTable"}
    >
      <NewMacrosTable
        key={`NewMacrosTable for ${componentLineage}`}
        thisWMPRecord={thisWMPRecord}
        tableType={tableType}
        thisMealType={thisMealType}
        theseIngrdnts={theseIngrdnts}
        recordLoaded={recordLoaded}
        getRndIntegerFn={getRndIntegerFn}
      />
    </StickyBox>
  );
};

export default MacrosTblInStickyBox;
