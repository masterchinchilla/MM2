import React from "react";
import StickyBox from "react-sticky-box";
import CustomHeading from "./CustomHeading.component";
import NewMacrosTable from "./NewMacrosTable.component";
import MacrosTblInStickyBox from "./MacrosTblInStickyBox.component";
const DayMealsAndMacrosCard = (props) => {
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
  const { dayOfWeek, weekMealPlan, _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
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
              {/* <StickyBox
                key={`StickyBox for NewMacrosTable for day ${thisRecordId}`}
                offsetTop={50}
                offsetBottom={20}
                className={"dayMacTable"}
              >
                <NewMacrosTable
                  key={`NewMacrosTable for day ${thisRecordId}`}
                  thisWMPRecord={weekMealPlan}
                  tableType={"Day Macros"}
                  thisMealType={{}}
                  theseIngrdnts={thisDaysMealsIngrdnts}
                  recordLoaded={recordLoaded}
                  getRndIntegerFn={getRndIntegerFn}
                />
              </StickyBox> */}
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
              <div className="card mt-3 mb-3">
                <div className="card-header">
                  <CustomHeading
                    key={`CustomHeading for dayOfWeek meals for day ${thisRecordId}`}
                    headingLvl={4}
                    recordLoaded={recordLoaded}
                    headingText={`${dayOfWeek.name} Meals`}
                    hdngIsReqFormLbl={false}
                    editingForm={null}
                    headingClasses="card-title"
                  />
                </div>
                <div className="card-body">
                  <div
                    className="accordion accordion-flush"
                    id={"daysMealsAccordionFull" + thisRecordId}
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id={"daysMealsAccordionHeader" + thisRecordId}
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#mealsAccrdn" + thisRecordId}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        ></button>
                      </h2>
                    </div>
                    <div
                      id={"mealsAccrdn" + thisRecordId}
                      className="accordion-collapse collapse show"
                      aria-labelledby={
                        "#daysMealsAccordionHeader" + thisRecordId
                      }
                      data-bs-parent={"#daysMealsAccordionFull" + thisRecordId}
                    >
                      <div className="accordion-body wkDaysAccrdnBdy">
                        {renderMeal(mealTypes[0])}
                        {renderMeal(mealTypes[1])}
                        {renderMeal(mealTypes[2])}
                        {renderMeal(mealTypes[3])}
                        {renderMeal(mealTypes[4])}
                        {renderMeal(mealTypes[5])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayMealsAndMacrosCard;
