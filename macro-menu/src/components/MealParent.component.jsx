import React from "react";
import MealParentTbl from "./MealParentTbl.component";
import NewMealParentCard from "./NewMealParentCard.component";
const MealParent = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    allThisMealTypesRecipes,
    mode,
  } = commonData;
  const {
    getRndIntegerFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    onCreateNewRecordFn,
    returnElementKey,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { thisStateObj, nestedMealIngrdntArray, thisStateObjBackup } =
    specificData;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
  const { thisRecord } = thisStateObj;
  const { _id } = thisRecord;
  const thisRecordId = _id;
  if (mode === "builder") {
    return (
      <NewMealParentCard
        key={`NewMealParentCard for meal ${thisRecordId}`}
        commonProps={{
          commonData: {
            backEndHtmlRoot: backEndHtmlRoot,
            allUnitOfMeasures: allUnitOfMeasures,
            allWeightTypes: allWeightTypes,
            allBrands: allBrands,
            allThisMealTypesRecipes: allThisMealTypesRecipes,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            onCreateNewRecordFn: onCreateNewRecordFn,
            returnElementKey: returnElementKey,
            trimEnteredValueFn: trimEnteredValueFn,
            onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisStateObj,
            nestedMealIngrdntArray: nestedMealIngrdntArray,
            thisStateObjBackup: thisStateObjBackup,
          },
          specificMethods: {
            populateMissingMealIngrdnts: populateMissingMealIngrdnts,
            onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
          },
        }}
      />
    );
  } else {
    return (
      <MealParentTbl
        key={`MealParentTbl for meal ${thisRecordId}`}
        commonProps={{
          commonData: {
            backEndHtmlRoot: backEndHtmlRoot,
            allUnitOfMeasures: allUnitOfMeasures,
            allWeightTypes: allWeightTypes,
            allBrands: allBrands,
            allThisMealTypesRecipes: allThisMealTypesRecipes,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            onCreateNewRecordFn: onCreateNewRecordFn,
            returnElementKey: returnElementKey,
            trimEnteredValueFn: trimEnteredValueFn,
            onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisStateObj,
            nestedMealIngrdntArray: nestedMealIngrdntArray,
            thisStateObjBackup: thisStateObjBackup,
          },
          specificMethods: {
            populateMissingMealIngrdnts: populateMissingMealIngrdnts,
            onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
          },
        }}
      />
    );
  }
};

export default MealParent;
