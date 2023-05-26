import React from "react";
import TabNav from "./TabNav.component";
import { Player } from "@lottiefiles/react-lottie-player";
// import NewWeekMealPlanCard from "./NewWeekMealPlanCard.component";
// import CustomHeading from "./CustomHeading.component";
// import Day from "./Day.component";
import ShoppingList from "./ShoppingList.component";
import SpreadsheetView from "./SpreadsheetView.component";
import LoadingForkSpoonSpinner from "../assets/lottieForkSpoonSpinner.json";
import WMPBuilderTab from "./WMPBuilderTab.component";
const WeekMealPlanPage = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    currentGRFUser,
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
  const {
    thisWMPStateObj,
    thisWMPStateBackup,
    mode,
    loadSpinPlayerRef,
    copyingWMP,
    dayObjsAndBackups,
    pantryItems,
  } = specificData;
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
    onChangeModeFn,
    onUpdateWMPPropFn,
    onUpdateMealOrChildPropFn,
    onCopyWMPFn,
    onUpdateWeightsFn,
    onCreatePantryItem,
    onSavePantryItemChangeFn,
  } = specificMethods;
  const thisWMPRecordId = thisWMPStateObj.thisRecord._id;
  const wmpRecordLoaded = thisWMPStateObj.recordLoaded;
  return (
    <>
      <TabNav
        key={`TabNav_for_WMP_${thisWMPRecordId}`}
        wmpRecordLoaded={wmpRecordLoaded}
        mode={mode}
        thisWMPRecordId={thisWMPRecordId}
        onChangeModeFn={onChangeModeFn}
      />
      <div className="lottieCont" hidden={wmpRecordLoaded}>
        <div className="lottieSubCont">
          <span className="lottieText">Loading...</span>
          <Player
            key={`loading_spinner_Player_for_WMP_${thisWMPRecordId}`}
            autoplay
            loop
            src={LoadingForkSpoonSpinner}
            className="lottiePlayer"
            ref={loadSpinPlayerRef}
          />
        </div>
      </div>
      <div className="wmpCopyCont" hidden={!copyingWMP}>
        <div className="wmpCopySubCont">
          <span className="wmpCopyText">Copying WMP...</span>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </div>
      <div
        className="container-fluid pl-4 pr-4"
        hidden={mode === "builder" ? false : true}
      >
        <WMPBuilderTab
          key={`WeekMealPlan_for_WMP_${thisWMPRecordId}`}
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
              trimEnteredValueFn: trimEnteredValueFn,
              getRndIntegerFn: getRndIntegerFn,
              returnElementKey: returnElementKey,
              onGetRecordsWFilterFn: onGetRecordsWFilterFn,
              onCreateNewRecordFn: onCreateNewRecordFn,
              onSaveChangesFn: onSaveChangesFn,
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onDeleteObjFn: onDeleteObjFn,
            },
          }}
          specificProps={{
            specificData: {
              thisWMPStateObj: thisWMPStateObj,
              thisWMPStateBackup: thisWMPStateBackup,
              dayObjsAndBackups: {
                dayObjs: {
                  sunday: sunday,
                  monday: monday,
                  tuesday: tuesday,
                  wednesday: wednesday,
                  thursday: thursday,
                  friday: friday,
                  saturday: saturday,
                },
                dayBackups: {
                  sundayBackup: sundayBackup,
                  mondayBackup: mondayBackup,
                  tuesdayBackup: tuesdayBackup,
                  wednesdayBackup: wednesdayBackup,
                  thursdayBackup: thursdayBackup,
                  fridayBackup: fridayBackup,
                  saturdayBackup: saturdayBackup,
                },
              },
            },
            specificMethods: {
              populateMissingMealIngrdnts: populateMissingMealIngrdnts,
              onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
              onUpdateWMPPropFn: onUpdateWMPPropFn,
              onUpdateMealOrChildPropFn: onUpdateMealOrChildPropFn,
              onCopyWMPFn: onCopyWMPFn,
              onUpdateWeightsFn: onUpdateWeightsFn,
            },
          }}
        />
        {/* <NewWeekMealPlanCard
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
                        populateMissingMealIngrdnts:
                          populateMissingMealIngrdnts,
                        onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div
        className="container-fluid pl-4 pr-4"
        hidden={mode === "shoppingList" ? false : true}
      >
        <ShoppingList
          key={`ShoppingList_for_WMP ${thisWMPRecordId}`}
          commonProps={{
            commonData: {
              currentGRFUser: currentGRFUser,
              daysOfWeek: daysOfWeek,
              mealTypes: mealTypes,
              thisWMPRecordId: thisWMPRecordId,
            },
            commonMethods: {
              getRndIntegerFn: getRndIntegerFn,
              returnElementKey: returnElementKey,
              onUpdatePropFn: onUpdateMealOrChildPropFn,
              trimEnteredValueFn: trimEnteredValueFn,
            },
          }}
          specificProps={{
            specificData: {
              dayObjs: dayObjs,
              pantryItems: pantryItems,
              recordLoaded: wmpRecordLoaded,
            },
            specificMethods: {
              onCreatePantryItem: onCreatePantryItem,
              onSavePantryItemChangeFn: onSavePantryItemChangeFn,
            },
          }}
        />
      </div>
      <div
        className="container-fluid pl-4 pr-4"
        hidden={mode === "spreadsheet" ? false : true}
      >
        <SpreadsheetView />
      </div>
    </>
  );
};

export default WeekMealPlanPage;
