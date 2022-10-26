import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import NewMacrosTable from "./NewMacrosTable.component";
import MealChildCard from "./MealChildCard.component";
import RecipeCard from "./RecipeCard.component";
import MealIngredients from "./MealIngredients.component";
const MealParentCard = (props) => {
  const {
    currentGRFUser,
    onUpdatePropFn,
    validateProp,
    getRndIntegerFn,
    onCreateNewRecordFn,
  } = props;
  const thisStateObj = props.thisStateObj.day
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          day: {
            weekMealPlan: null,
            dayOfWeek: { name: "Day" },
          },
          mealType: { code: null, name: "Meal" },
        },
        thisMealsIngrdnts: [],
      };
  const { thisRecord, thisMealsIngrdnts } = thisStateObj;
  const { _id, day, mealType } = thisRecord;
  const { weekMealPlan, dayOfWeek } = day;
  const thisRecordId = _id;
  return (
    <div
      className="accordion accordionNotFlush mealDetailTopAccrdn"
      id={"mealOuterAccordionFull" + thisRecordId}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + thisRecordId}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + thisRecordId}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>{`${dayOfWeek.name} ${mealType.name}`}</h5>
          </button>
        </h2>
      </div>
      <div
        id={"mealOuterAccrdn" + thisRecordId}
        className="accordion-collapse collapse show"
        aria-labelledby={"#mealOuterAccordionHeader" + thisRecordId}
        data-bs-parent={"#mealOuterAccordionFull" + thisRecordId}
      >
        <StickyBox
          key={`macroTblStickyBoxForMeal${thisRecordId}`}
          offsetTop={142}
          offsetBottom={20}
          className={"mealMacTable"}
        >
          <NewMacrosTable
            key={`macrosTblForMeal${thisRecordId}`}
            thisWMPRecord={weekMealPlan}
            tableType={"Meal Macros"}
            thisMealTypeCode={mealType.code}
            theseIngrdnts={thisMealsIngrdnts}
          />
        </StickyBox>
        <div className="accordion-body wkDaysAccrdnBdy">
          <MealChildCard
            currentGRFUser={currentGRFUser}
            validateProp={validateProp}
            onUpdatePropFn={onUpdatePropFn}
            getRndIntegerFn={getRndIntegerFn}
            onCreateNewRecord={onCreateNewRecordFn}
          />
          <RecipeCard />
          <MealIngredients />
        </div>
      </div>
    </div>
  );
};

export default MealParentCard;
