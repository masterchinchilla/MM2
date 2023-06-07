import React from "react";
const MealIngrdntTbl = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    backEndHtmlRoot,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    mode,
  } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
    onCreateNewRecordFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const {
    thisStateObj,
    thisStateObjBackup,
    thisGenRecipe,
    thisGRFUser,
    userChangedThisMealRecipe,
  } = specificData;
  const {} = specificMethods;
  const {
    recordLoaded,
    thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
  } = thisStateObj;
  const { _id, createdAt, updatedAt, qty, genRecipeIngredient } = thisRecord;
  const { defaultQty, ingredient } = genRecipeIngredient;
  const { unitOfMeasure, brand, weightType, name } = ingredient;
  const thisRecordId = _id;
  return (
    <>
      <tr>
        <td>{qty}</td>
        <td>{defaultQty}</td>
        <td>{unitOfMeasure.name}</td>
        <td>{brand ? brand.name : ``}</td>
        <td>{weightType ? weightType.name : ``}</td>
        <td>{name}</td>
      </tr>
    </>
  );
};

export default MealIngrdntTbl;
