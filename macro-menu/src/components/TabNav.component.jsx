import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TabNav = (props) => {
  const { wmpRecordLoaded, mode, thisWMPRecordId, onChangeModeFn } = props;
  return (
    <ul
      key={`ul for nav tabs for WMP ${thisWMPRecordId}`}
      className="nav nav-tabs"
    >
      <li
        key={`li "Builder" for nav tabs for WMP ${thisWMPRecordId}`}
        className="nav-item"
      >
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
      <li
        key={`li "Shopping List" for nav tabs for WMP ${thisWMPRecordId}`}
        className="nav-item"
      >
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
      <li
        key={`li "Spreadsheet" for nav tabs for WMP ${thisWMPRecordId}`}
        className="nav-item"
      >
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
