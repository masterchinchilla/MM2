import React from "react";
import NewCreateDayButton from "./NewCreateDayButton.component";
import NewDayCard from "./NewDayCard.component";
const Day = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
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
    trimEnteredValueFn,
    getRndIntegerFn,
    returnElementKey,
    onGetRecordsWFilterFn,
    onCreateNewRecordFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
  } = commonMethods;
  const {
    thisDayOfWeekName,
    wmpUserType,
    thisDayStateObj,
    thisDayStateObjBackup,
  } = specificData;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
  const thisDaysId = thisDayStateObj.thisRecord._id;
  const pattern = /missing/;
  const testResult = pattern.test(thisDaysId);
  if (testResult) {
    if (wmpUserType === "admin" || wmpUserType === "author") {
      return (
        <NewCreateDayButton
          key={`NewCreateDayButton_for_Day_${thisDaysId}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              returnElementKey: returnElementKey,
              onCreateNewRecordFn: onCreateNewRecordFn,
            },
          }}
          specificProps={{
            specificData: { thisStateObj: thisDayStateObj },
            specificMethods: {},
          }}
        />
      );
    } else {
      return (
        <div className="alert alert-secondary" role="alert">
          <em>
            <span>No {thisDayOfWeekName}</span> Meal Plan added to this week...
          </em>
        </div>
      );
    }
  } else {
    return (
      <NewDayCard
        key={`NewDayCard_for_Day_${thisDaysId}`}
        commonProps={{
          commonData: {
            daysOfWeek: daysOfWeek,
            mealTypes: mealTypes,
            backEndHtmlRoot: backEndHtmlRoot,
            allUnitOfMeasures: allUnitOfMeasures,
            allWeightTypes: allWeightTypes,
            allBrands: allBrands,
            allGenRecipes: allGenRecipes,
          },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onCreateNewRecordFn: onCreateNewRecordFn,
            onUpdatePropFn: onUpdatePropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            onSrchDBForObjWMtchngNmeFn: onGetRecordsWFilterFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisDayStateObj,
            thisStateObjBackup: thisDayStateObjBackup,
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

export default Day;
