import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BackToTopButton = ({ scrollToTop, scrollBttnVisible }) => {
  return (
    <button
      className="backToTopButton"
      onClick={scrollToTop}
      hidden={!scrollBttnVisible}
    >
      <FontAwesomeIcon icon="fa-solid fa-circle-up" />
    </button>
  );
};

export default BackToTopButton;
