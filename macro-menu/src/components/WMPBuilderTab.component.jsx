import React from "react";
import NewWeekMealPlanCard from "./NewWeekMealPlanCard.component";
import CustomHeading from "./CustomHeading.component";
import Day from "./Day.component";
const WMPBuilderTab = (props) => {
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
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
  } = commonMethods;
  const { thisWMPStateObj, thisWMPStateBackup, dayObjsAndBackups } =
    specificData;
  const { dayObjs, dayBackups } = dayObjsAndBackups;
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
    dayObjs;
  const {
    sundayBackup,
    mondayBackup,
    tuesdayBackup,
    wednesdayBackup,
    thursdayBackup,
    fridayBackup,
    saturdayBackup,
  } = dayBackups;
  const {
    populateMissingMealIngrdnts,
    onAddIngrdntToRecipeFn,
    onUpdateWMPPropFn,
    onUpdateMealOrChildPropFn,
    onCopyWMPFn,
    onUpdateWeightsFn,
  } = specificMethods;
  const thisWMPRecordId = thisWMPStateObj.thisRecord._id;
  const wmpRecordLoaded = thisWMPStateObj.recordLoaded;
  return (
    <>
      <NewWeekMealPlanCard
        key={`NewWeekMealPlanCard_for_WMP_${thisWMPRecordId}`}
        commonProps={{
          commonData: { backEndHtmlRoot: backEndHtmlRoot },
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onCreateNewRecordFn: onCreateNewRecordFn,
            onUpdatePropFn: onUpdateWMPPropFn,
            onSaveChangesFn: onSaveChangesFn,
            onStartEditingFn: onStartEditingFn,
            onCancelEditFn: onCancelEditFn,
            onDeleteObjFn: onDeleteObjFn,
            onSrchDBForObjWMtchngNmeFn: onGetRecordsWFilterFn,
            trimEnteredValueFn: trimEnteredValueFn,
            onCopyWMPFn: onCopyWMPFn,
          },
        }}
        specificProps={{
          specificData: {
            thisStateObj: thisWMPStateObj,
            thisStateObjBackup: thisWMPStateBackup,
          },
          specificMethods: {
            onUpdateWeightsFn: onUpdateWeightsFn,
          },
        }}
      />
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <CustomHeading
            key={`CustomHeading_"Day Meal Plans"_for_WMP_${thisWMPRecordId}`}
            headingLvl={2}
            recordLoaded={wmpRecordLoaded}
            headingText="Day Meal Plans"
            hdngIsReqFormLbl={false}
            editingForm={false}
            headingClasses="card-title"
          />
        </div>
        <div className="card-body">
          <div
            className="accordion accordion-flush"
            id={"accordionFull" + thisWMPRecordId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"accordionHeader" + thisWMPRecordId}
              >
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#dayAccrdn" + thisWMPRecordId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"dayAccrdn" + thisWMPRecordId}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + thisWMPRecordId}
              data-bs-parent={"#accordionFull" + thisWMPRecordId}
            >
              <div className="accordion-body wkDaysAccrdnBdy">
                <Day
                  commonProps={{
                    commonData: {
                      backEndHtmlRoot: backEndHtmlRoot,
                      daysOfWeek: daysOfWeek,
                      mealTypes: mealTypes,
                      allUnitOfMeasures: allUnitOfMeasures,
                      allWeightTypes: allWeightTypes,
                      allBrands: allBrands,
                      allGenRecipes: allGenRecipes,
                    },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onGetRecordsWFilterFn: onGetRecordsWFilterFn,
                      onCreateNewRecordFn: onCreateNewRecordFn,
                      onUpdatePropFn: onUpdateMealOrChildPropFn,
                      onSaveChangesFn: onSaveChangesFn,
                      onStartEditingFn: onStartEditingFn,
                      onCancelEditFn: onCancelEditFn,
                      onDeleteObjFn: onDeleteObjFn,
                      trimEnteredValueFn: trimEnteredValueFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisDayOfWeekName: `Sunday`,
                      wmpUserType: thisWMPStateObj.userType.weekMealPlan,
                      thisDayStateObj: sunday,
                      thisDayStateObjBackup: sundayBackup,
                    },
                    specificMethods: {
                      populateMissingMealIngrdnts: populateMissingMealIngrdnts,
                      onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WMPBuilderTab;
