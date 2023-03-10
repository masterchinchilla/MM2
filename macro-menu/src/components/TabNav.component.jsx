import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TabNav = (props) => {
  const { wmpRecordLoaded, mode, onChangeModeFn } = props;
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          disabled={!wmpRecordLoaded}
          className={
            mode === "builder" ? "nav-link active tabLink" : "nav-link tabLink"
          }
          onClick={() => onChangeModeFn("builder")}
        >
          <FontAwesomeIcon icon="fa-solid fa-hammer" />
          <span className="tabNavTitle">Builder</span>
        </a>
      </li>
      <li className="nav-item">
        <a
          disabled={!wmpRecordLoaded}
          className={
            mode === "shoppingList"
              ? "nav-link active tabLink"
              : "nav-link tabLink"
          }
          onClick={() => onChangeModeFn("shoppingList")}
        >
          <FontAwesomeIcon icon="fa-solid fa-list-check" />
          <span className="tabNavTitle">Shopping List</span>
        </a>
      </li>
      <li className="nav-item">
        <a
          disabled={!wmpRecordLoaded}
          className={
            mode === "spreadsheet"
              ? "nav-link active tabLink"
              : "nav-link tabLink"
          }
          onClick={() => onChangeModeFn("spreadsheet")}
        >
          <FontAwesomeIcon icon="fa-solid fa-table" />
          <span className="tabNavTitle">Spreadsheet</span>
        </a>
      </li>
    </ul>
  );
};

export default TabNav;
