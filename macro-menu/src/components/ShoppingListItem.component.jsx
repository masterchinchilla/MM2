import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TableCell from "./TableCell.component";
import TableCellWNestedInput from "./TableCellWNestedInput.component";
const ShoppingListItem = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { shoppingListItem } = specificData;
  const { onCreatePantryItem, onSavePantryItemChangeFn } = specificMethods;
  const { qtyNeeded, pantryItem, qtyToBuy } = shoppingListItem;
  const {
    thisRecord,
    recordChanged,
    editingForm,
    valErrors,
    userType,
    justCreated,
    recordLoaded,
    hasChildren,
    allowCopy,
  } = pantryItem;
  const { _id, qtyHave, ingredient, GRFUser, createdAt, updatedAt } =
    thisRecord;
  const { unitOfMeasure, name } = ingredient;
  const propValue = qtyHave;
  const propToUpdate = "qtyHave";
  const typeOfRecordToChange = "pantryItem";
  const arrayIndex = null;
  const thisMealTypeCode = null;
  const thisDayOfWeekCode = null;
  const inputTypeForHtml = "number";
  const excludeLabel = true;
  const [boughtChecked, toggleBoughtChecked] = useState(qtyToBuy <= 0);
  const [checkBoxActive, toggleCheckBoxActive] = useState(false);
  const [timer, setTimerStateFn] = useState(null);
  function handleUpdateQtyHavePropFn(
    propToUpdate,
    updatedValue,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    createNewValErrs,
    justCreated
  ) {
    const newQtyToBuy = qtyNeeded - updatedValue;
    if (newQtyToBuy <= 0) {
      toggleBoughtChecked(true);
    } else {
      toggleBoughtChecked(false);
    }
    onUpdatePropFn(
      "qtyHave",
      { shoppingListItem: shoppingListItem, updatedValue: updatedValue },
      "pantryItem",
      null,
      null,
      null,
      null,
      null
    );
  }
  function handleCheckUncheckBoughtBoxFn(checkedUnchecked) {
    clearTimeout(timer);
    toggleCheckBoxActive(true);
    const newTimer = setTimeout(() => {
      toggleCheckBoxActive(false);
    }, 500);
    setTimerStateFn(newTimer);
    if (checkedUnchecked && qtyToBuy > 0) {
      toggleBoughtChecked(true);
      const updatedValue = qtyNeeded;
      handleUpdateQtyHavePropFn(
        null,
        updatedValue,
        null,
        null,
        null,
        null,
        null,
        null
      );
    }
  }
  useEffect(() => {
    if (recordChanged.pantryItem) {
      if (qtyToBuy <= 0) {
        toggleBoughtChecked(true);
      } else {
        toggleBoughtChecked(false);
      }
    }
  });
  return (
    <tr className="shopListItemTr">
      <td className="shopListItemCheckTd">
        <div className="shopListItemCheckTdSubDiv">
          <input
            type={"checkBox"}
            className="form-check-input"
            checked={boughtChecked}
            onChange={(e) => {
              handleCheckUncheckBoughtBoxFn(e.target.value);
            }}
          />
        </div>
      </td>
      <TableCell
        tCellType="td"
        data={qtyNeeded.toFixed(2)}
        tCellClasses=""
        scope=""
        recordLoaded={true}
      />
      <TableCellWNestedInput
        key={returnElementKey(
          null,
          "TableCellWNestedInput",
          propToUpdate,
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: handleUpdateQtyHavePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: "",
            label: "",
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: propToUpdate,
            arrayIndex: arrayIndex,
            valErrors: [],
            inputClasses: "form-control",
            isRequired: false,
            recordLoaded: recordLoaded,
            excludeLabel: excludeLabel,
            inputTypeForHtml: inputTypeForHtml,
            propValue: propValue,
            tCellType: "td",
            tCellClassesToUse: "shopListItemQtyHaveTd",
            scope: "",
            valueChangedExternal: checkBoxActive,
            recordChanged: recordChanged.pantryItem,
            shoppingListItem: shoppingListItem,
          },
          specificMethods: {
            inputOnKeyUpFn: () => {},
            onCreatePantryItem: onCreatePantryItem,
            onSavePantryItemChangeFn: onSavePantryItemChangeFn,
          },
        }}
      />
      <TableCell
        tCellType="td"
        data={qtyToBuy.toFixed(2)}
        tCellClasses=""
        scope=""
        recordLoaded={true}
      />
      <TableCell
        tCellType="td"
        data={unitOfMeasure.name}
        tCellClasses=""
        scope=""
        recordLoaded={true}
      />
      <TableCell
        tCellType="td"
        data={name}
        tCellClasses=""
        scope=""
        recordLoaded={true}
      />
    </tr>
  );
};

export default ShoppingListItem;
