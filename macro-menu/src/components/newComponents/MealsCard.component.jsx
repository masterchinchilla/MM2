import React, { useState, useEffect } from "react";
import MealParentCard from "./MealParentCard.component";
import CreateMealButton from "./CreateMealButton.component";
const MealsCard = (props) => {
  const {
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
  } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          dayOfWeek: null,
        },
        thisDaysMeals: null,
      };
  const { thisRecord, thisDaysMeals } = thisStateObj;
  const thisDayOfWeek = thisRecord.dayOfWeek
    ? thisRecord.dayOfWeek
    : { name: "Day" };
  const thisRecordId = thisRecord._id;
  function renderMeal(mealTypeCode, mealTypeName) {
    const mealStateObj = thisDaysMeals
      ? thisDaysMeals[mealTypeCode]
      : {
          thisRecord: { _id: getRndIntegerFn(10000000, 99999999) },
          userType: null,
        };
    const mealRecordId = mealStateObj.thisRecord._id;
    const mealUserType = mealStateObj.userType;
    const pattern = /missing/;
    let testResult = pattern.test(mealRecordId);
    if (testResult) {
      if (mealUserType === "admin" || mealUserType === "author") {
        return (
          <CreateMealButton
            key={`createMealBttnForMeal${mealRecordId}`}
            thisStateObj={mealStateObj}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onUpdatePropFn={onUpdatePropFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            getRndIntegerFn={getRndIntegerFn}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {mealTypeName}</span> Meal Plan added to this day...
            </em>
          </div>
        );
      }
    }
    return (
      <MealParentCard
        key={`mealPrntCardForMeal${mealRecordId}`}
        thisStateObj={mealStateObj}
        nClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onUpdatePropFn={onUpdatePropFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        getRndIntegerFn={getRndIntegerFn}
      />
    );
  }
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h4 className="card-title">{`${thisDayOfWeek.name} Meals`}</h4>
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
            aria-labelledby={"#daysMealsAccordionHeader" + thisRecordId}
            data-bs-parent={"#daysMealsAccordionFull" + thisRecordId}
          >
            <div className="accordion-body wkDaysAccrdnBdy">
              {renderMeal("breakfast", "Breakfast")}
              {renderMeal("snack1", "Snack 1")}
              {renderMeal("lunch", "Lunch")}
              {renderMeal("snack2", "Snack 2")}
              {renderMeal("dinner", "Dinner")}
              {renderMeal("dessert", "Dessert")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsCard;
