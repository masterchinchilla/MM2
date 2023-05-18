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
    allGenRecipes,
  } = commonData;
  const {
    getRndIntegerFn,
    onCreateNewRecordFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    returnElementKey,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObjBackup } = specificData;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
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
      breakfast: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
      snack1: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
      lunch: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
      snack2: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
      dinner: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
      dessert: {
        recordLoaded: false,
        thisMealsIngrdnts: [],
        thisRecord: { genRecipe: { _id: "" } },
      },
    };
  }
  const thisRecord = thisStateObj.thisRecord;
  const { _id } = thisRecord;
  const thisRecordId = _id;
  return (
    <div className="card mt-3 mb-3">
      <NewDayControlAndDisabledFields
        key={`NewDayControlAndDisabledFields for Day ${thisRecordId}`}
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            returnElementKey: returnElementKey,
          },
        }}
        specificProps={{
          specificData: { thisStateObj: thisStateObj },
          specificMethods: {},
        }}
      />
      <NewDayMealsAndMacros
        key={`NewDayMealsAndMacros for Day ${thisRecordId}`}
        commonProps={{
          commonData: {
            mealTypes: mealTypes,
            backEndHtmlRoot: backEndHtmlRoot,
            allUnitOfMeasures: allUnitOfMeasures,
            allWeightTypes: allWeightTypes,
            allBrands: allBrands,
            allGenRecipes: allGenRecipes,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            onCreateNewRecordFn: onCreateNewRecordFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            returnElementKey: returnElementKey,
            trimEnteredValueFn: trimEnteredValueFn,
            onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisStateObj,
            thisStateObjBackup: thisStateObjBackup,
          },
          specificMethods: {
            populateMissingMealIngrdnts: populateMissingMealIngrdnts,
            onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
          },
        }}
      />
    </div>
  );
};

export default NewDayCard;
