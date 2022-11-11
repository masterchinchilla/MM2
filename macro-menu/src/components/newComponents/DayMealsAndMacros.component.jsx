import React from "react";
import StickyBox from "react-sticky-box";
import MealsCard from "./MealsCard.component";
import NewMacrosTable from "./NewMacrosTable.component";
const DayMealsAndMacros = (props) => {
  const {
    currentGRFUser,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    backEndHtmlRoot,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: null,
          weekMealPlan: { _id: null },
        },
        recordLoaded: false,
        thisDaysMeals: {
          breakfast: { thisMealsIngrdnts: [] },
          snack1: { thisMealsIngrdnts: [] },
          lunch: { thisMealsIngrdnts: [] },
          snack2: { thisMealsIngrdnts: [] },
          dinner: { thisMealsIngrdnts: [] },
          dessert: { thisMealsIngrdnts: [] },
        },
      };
  const thisStateObjBackup = props.thisStateObjBackup
    ? props.thisStateObjBackup.thisDaysMeals
    : {};
  const { thisRecord, recordLoaded, thisDaysMeals } = thisStateObj;
  const { breakfast, snack1, lunch, snack2, dinner, dessert } = thisDaysMeals;
  const breakfastIngrdnts = breakfast.thisMealsIngrdnts;
  const snack1Ingrdnts = snack1.thisMealsIngrdnts;
  const lunchIngrdnts = lunch.thisMealsIngrdnts;
  const snack2Ingrdnts = snack2.thisMealsIngrdnts;
  const dinnerIngrdnts = dinner.thisMealsIngrdnts;
  const dessertIngrdnts = dessert.thisMealsIngrdnts;
  const thisDaysMealsIngrdnts = [
    breakfastIngrdnts ? breakfastIngrdnts : [],
    snack1Ingrdnts ? snack1Ingrdnts : [],
    lunchIngrdnts ? lunchIngrdnts : [],
    snack2Ingrdnts ? snack2Ingrdnts : [],
    dinnerIngrdnts ? dinnerIngrdnts : [],
    dessertIngrdnts ? dessertIngrdnts : [],
  ];
  const { _id, weekMealPlan } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "day";
  return (
    <div className="card-body">
      <div
        className="accordion accordion-flush"
        id={"accordionFull" + thisRecordId}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"accordionHeader" + thisRecordId}
          >
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#dayAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
          <div
            id={"dayAccrdn" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader" + thisRecordId}
            data-bs-parent={"#accordionFull" + thisRecordId}
          >
            <div className="accordion-body">
              <StickyBox
                key={`macroTblStickyBoxFor${typeOfRecordToChange}${thisRecordId}`}
                offsetTop={20}
                offsetBottom={20}
                className={"dayMacTable"}
              >
                <NewMacrosTable
                  key={`macrosTblFor${typeOfRecordToChange}${thisRecordId}`}
                  thisWMPRecord={weekMealPlan}
                  tableType={"Day Macros"}
                  thisMealType={{}}
                  theseIngrdnts={thisDaysMealsIngrdnts}
                  recordLoaded={recordLoaded}
                  getRndIntegerFn={getRndIntegerFn}
                />
              </StickyBox>
              <MealsCard
                key={`mealsCardFor${typeOfRecordToChange}${thisRecordId}`}
                thisStateObj={thisStateObj}
                thisStateObjBackup={thisStateObjBackup}
                currentGRFUser={currentGRFUser}
                validatePropFn={validatePropFn}
                onClickEditFn={onClickEditFn}
                onClickCancelFn={onClickCancelFn}
                onUpdatePropFn={onUpdatePropFn}
                onClickSaveFn={onClickSaveFn}
                onClickDeleteFn={onClickDeleteFn}
                getRndIntegerFn={getRndIntegerFn}
                onCreateNewRecordFn={onCreateNewRecordFn}
                populateMealIngrdntsFn={populateMealIngrdntsFn}
                trimEnteredValueFn={trimEnteredValueFn}
                allUnitOfMeasures={allUnitOfMeasures}
                allWeightTypes={allWeightTypes}
                allBrands={allBrands}
                backEndHtmlRoot={backEndHtmlRoot}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayMealsAndMacros;
