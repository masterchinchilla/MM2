import React from "react";
import NewInputCore from "./NewInputCore.component";
import ShoppingListItemFormControl from "./ShoppingListItemFormControl.component";
const TableCellWNestedInput = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
    onSaveChangesFn,
    onStartEditingFn,
  } = commonMethods;
  const {
    typeOfRecordToChange,
    formGroupClasses,
    label,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    fieldDisabled,
    valErrors,
    inputClasses,
    isRequired,
    recordLoaded,
    excludeLabel,
    inputTypeForHtml,
    propValue,
    tCellType,
    tCellClassesToUse,
    scope,
    valueChangedExternal,
    recordChanged,
    shoppingListItem,
    exists,
  } = specificData;
  const { inputOnKeyUpFn } = specificMethods;
  const TCellType = tCellType;
  return (
    <TCellType scope={scope ? scope : ""} className={tCellClassesToUse}>
      <NewInputCore
        key={returnElementKey(
          null,
          "NewInputCore",
          "qtyHave",
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
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            typeOfRecordToChange: typeOfRecordToChange,
            formGroupClasses: formGroupClasses,
            label: label,
            thisDayOfWeekCode: thisDayOfWeekCode,
            thisMealTypeCode: thisMealTypeCode,
            propToUpdate: propToUpdate,
            arrayIndex: arrayIndex,
            fieldDisabled: fieldDisabled,
            valErrors: valErrors,
            inputClasses: inputClasses,
            isRequired: isRequired,
            recordLoaded: recordLoaded,
            excludeLabel: excludeLabel,
            inputTypeForHtml: inputTypeForHtml,
            propValue: propValue,
            valueChangedExternal: valueChangedExternal,
          },
          specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
        }}
      />
      <ShoppingListItemFormControl
        onSaveChangesFn={onSaveChangesFn}
        onStartEditingFn={onStartEditingFn}
        recordChanged={recordChanged}
        shoppingListItem={shoppingListItem}
        exists={exists}
      />
    </TCellType>
  );
};

export default TableCellWNestedInput;
