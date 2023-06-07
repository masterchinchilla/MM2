import React from "react";
import MacrosTblInStickyBox from "./MacrosTblInStickyBox.component";
const DayMealsAndMacrosTbl = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { mealTypes } = commonData;
  const { getRndIntegerFn } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const { renderMeal } = specificMethods;
  const {
    thisRecord,
    recordLoaded,
    breakfast,
    snack1,
    lunch,
    snack2,
    dinner,
    dessert,
  } = thisStateObj;
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
  const { weekMealPlan, _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  return (
    <>
      <MacrosTblInStickyBox
        componentLineage={`MacrosTblInStickyBox for day ${thisRecordId}`}
        tableType={"Day Macros"}
        thisMealType={{}}
        stickyBoxOffsetTop={50}
        stickyBoxOffsetBottom={20}
        stickyBoxClasses={"dayMacTable"}
        thisWMPRecord={weekMealPlan}
        theseIngrdnts={thisDaysMealsIngrdnts}
        recordLoaded={recordLoaded}
        getRndIntegerFn={getRndIntegerFn}
      />
      <table className="spreadsheetTbl">
        <tbody>
          <tr>
            <td>{renderMeal(mealTypes[0])}</td>
          </tr>
          <tr>
            <td>{renderMeal(mealTypes[1])}</td>
          </tr>
          <tr>
            <td>{renderMeal(mealTypes[2])}</td>
          </tr>
          <tr>
            <td>{renderMeal(mealTypes[3])}</td>
          </tr>
          <tr>
            <td>{renderMeal(mealTypes[4])}</td>
          </tr>
          <tr>
            <td>{renderMeal(mealTypes[5])}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DayMealsAndMacrosTbl;
