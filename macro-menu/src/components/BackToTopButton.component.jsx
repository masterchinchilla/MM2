import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BackToTopButton = (props) => {
  const {
    parentComponent,
    scrollToTop,
    // scrollBttnVisible,
    componentLineage,
  } = props;
  return (
    <button
      className="backToTopButton"
      onClick={scrollToTop}
      // hidden={!scrollBttnVisible}
    >
      <FontAwesomeIcon
        key={`FontAwesomeIcon_for_backToTop_for_${componentLineage}`}
        icon="fa-solid fa-circle-up"
      />
    </button>
  );
};

export default BackToTopButton;
