import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TableCell from "./TableCell.component";
import TableCellWNestedInput from "./TableCellWNestedInput.component";
const ShoppingListItem = (props) => {
  console.log(props);
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { shoppingListItem } = specificProps.specificData;
  const { recordLoaded, qtyHave, qtyNeeded, qtyToBuy, ingredient } =
    shoppingListItem;
  const { unitOfMeasure, name } = ingredient;
  const propValue = qtyHave;
  const propToUpdate = "qtyHave";
  const typeOfRecordToChange = "pantryItem";
  const arrayIndex = null;
  const thisMealTypeCode = null;
  const thisDayOfWeekCode = null;
  const inputTypeForHtml = "number";
  const excludeLabel = true;
  const [boughtChecked, toggleBoughtChecked] = useState(false);
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
  function handleCheckUncheckBoughtBoxFn() {
    // toggleBoughtChecked(boughtChecked ? false : true);
    handleUpdateQtyHavePropFn(
      null,
      qtyNeeded,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }
  useEffect(() => {
    if (qtyToBuy >= 0) {
      toggleBoughtChecked(false);
    } else {
      toggleBoughtChecked(true);
    }
  }, []);
  return (
    <tr>
      <td>
        <input
          type={"checkBox"}
          value={boughtChecked}
          onChange={(e) => {
            handleCheckUncheckBoughtBoxFn(e.target.value);
          }}
          disabled={qtyToBuy <= 0}
        ></input>
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
            fieldDisabled: false,
            valErrors: [],
            inputClasses: "",
            isRequired: false,
            recordLoaded: recordLoaded,
            excludeLabel: excludeLabel,
            inputTypeForHtml: inputTypeForHtml,
            propValue: propValue,
            tCellType: "td",
            tCellClassesToUse: "",
            scope: "",
          },
          specificMethods: { inputOnKeyUpFn: () => {} },
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
