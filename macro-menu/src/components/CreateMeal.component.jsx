import axios from "axios";
import React, { Component } from "react";
const CreateMeal = (props) => {
  const thisStateObj = props.thisStateObj;
  const thisObj = thisStateObj.thisMeal;
  const thisMealType = thisObj.mealType;
  const thisMealTypeCode = thisMealType.code;
  const thisDay = thisObj.day;
  const thisDayOfWeek = thisDay.dayOfWeek;
  const thisDayOfWeekCode = thisDayOfWeek.code;
  const defaultRecipeIds = {
    breakfastId: "62577f516682e3955e98b1d0",
    snack1Id: "62577a7d93011a9b47306e6f",
    lunchId: "62577f666682e3955e98b1d1",
    snack2Id: "62577f786682e3955e98b1d2",
    dinnerId: "62577f8b6682e3955e98b1d3",
    dessertId: "62577f9c6682e3955e98b1d4",
  };
  const thisDefaultRecipeId = defaultRecipeIds[`${thisMealTypeCode}Id`];
  const thisDefaultGenRecipe = {
    _id: thisDefaultRecipeId,
    name: " ",
    availableMealType: thisMealType,
    GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
    defaultPrepInstructions: "",
    photoURL: "",
  };
  const newMeal = {
    day: thisDay,
    mealType: thisMealType,
    genRecipe: thisDefaultGenRecipe,
  };
  const newMealToSave = {
    day: thisDay._id,
    mealType: thisMealType._id,
    genRecipe: thisDefaultGenRecipe._id,
  };
  const idForBSElements = props.getRndInteger(10000000, 99999999);
  return (
    <div
      className="accordion accordionNotFlush"
      id={"mealOuterAccordionFull" + idForBSElements}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + idForBSElements}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + idForBSElements}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>{thisDay.dayOfWeek.name + " " + thisMealType.name}</h5>
          </button>
        </h2>
        <form>
          <div className="form-group mt-4 mb-4">
            <button
              type="button"
              value="Create Meal"
              className="btn btn-primary"
              onClick={() => {
                props.onCreateRecord(
                  "meal",
                  thisDayOfWeekCode,
                  thisMealTypeCode,
                  0,
                  newMeal,
                  newMealToSave
                );
              }}
            >
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateMeal;
