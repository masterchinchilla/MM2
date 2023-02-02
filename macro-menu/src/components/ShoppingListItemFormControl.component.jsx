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
        iconHidden = exists;
        break;
      default:
        iconHidden = !exists || !recordChanged;
    }
    return iconHidden;
  }
  return (
    <div className="iconGroup m-1">
      <button
        type="button"
        onClick={() => {
          onStartEditingFn(shoppingListItem.pantryItem);
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
          onSaveChangesFn(shoppingListItem.pantryItem.thisRecord);
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
