import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ShoppingListItemFormControl = (props) => {
  const {
    onSaveChangesFn,
    onStartEditingFn,
    recordChanged,
    shoppingListItem,
    exists,
  } = props;
  function hideIcon(icon) {
    let iconHidden = false;
    switch (icon) {
      case "edit":
        iconHidden = exists ? true : false;
        break;
      default:
        iconHidden = exists || !recordChanged ? true : false;
    }
  }
  return (
    <div className="iconGroup m-1">
      <button
        type="button"
        onClick={() => {
          onStartEditingFn(shoppingListItem);
        }}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-pen-to-square"
          size="xl"
          className="p-1"
          hidden={hideIcon("edit")}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          onSaveChangesFn(shoppingListItem);
        }}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-floppy-disk"
          size="xl"
          className={recordChanged ? "changingWarning p-1" : "p-1"}
          hidden={hideIcon("save")}
        />
      </button>
    </div>
  );
};

export default ShoppingListItemFormControl;
