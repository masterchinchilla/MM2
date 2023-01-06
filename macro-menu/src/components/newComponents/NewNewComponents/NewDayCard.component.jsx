import React from "react";
import NewDayControlAndDisabledFields from "./NewDayControlAndDisabledFields.component";
import NewDayMealsAndMacros from "./NewDayMealsAndMacros.component";
const NewDayCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    daysOfWeek,
    mealTypes,
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = commonData;
  const {
    getRndIntegerFn,
    onCreateNewRecordFn,
    onCreateNewDayOrMealFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    returnElementKey,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObjBackup } = specificData;
  const { populateMissingMealIngrdnts } = specificMethods;
  let thisStateObj = specificData.thisStateObj;
  if (!thisStateObj.recordLoaded) {
    thisStateObj = {
      thisRecord: {
        _id: getRndIntegerFn(10000000, 99999999),
        dayOfWeek: daysOfWeek[0],
        name: "Day",
        weekMealPlan: { GRFUser: { handle: "" } },
      },
      editingForm: { day: false },
      valErrors: {
        day: { _id: null, name: null, createdAt: null, updatedAt: null },
      },
      recordChanged: { day: false },
      userType: { day: "viewer" },
      hasChildren: { day: false },
      breakfast: { recordLoaded: false, thisMealsIngrdnts: [] },
      snack1: { recordLoaded: false, thisMealsIngrdnts: [] },
      lunch: { recordLoaded: false, thisMealsIngrdnts: [] },
      snack2: { recordLoaded: false, thisMealsIngrdnts: [] },
      dinner: { recordLoaded: false, thisMealsIngrdnts: [] },
      dessert: { recordLoaded: false, thisMealsIngrdnts: [] },
    };
  }
  const thisRecord = thisStateObj.thisRecord;
  const { _id } = thisRecord;
  const thisRecordId = _id;
  return (
    <div className="card mt-3 mb-3">
      <NewDayControlAndDisabledFields
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
          },
        }}
        specificProps={{
          specificData: { thisStateObj: thisStateObj },
          specificMethods: {},
        }}
      />
      <NewDayMealsAndMacros
        commonProps={{
          commonData: {
            mealTypes: mealTypes,
            backEndHtmlRoot: backEndHtmlRoot,
            allUnitOfMeasures: allUnitOfMeasures,
            allWeightTypes: allWeightTypes,
            allBrands: allBrands,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onCreateNewRecordFn: onCreateNewRecordFn,
            onCreateNewDayOrMealFn: onCreateNewDayOrMealFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            returnElementKey: returnElementKey,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisStateObj,
            thisStateObjBackup: thisStateObjBackup,
          },
          specificMethods: {
            populateMissingMealIngrdnts: populateMissingMealIngrdnts,
          },
        }}
      />
    </div>
  );
};

export default NewDayCard;
