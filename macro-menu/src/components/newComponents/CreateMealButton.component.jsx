import React from "react";
const CreateMealButton = ({
  day,
  mealType,
  getRndIntegerFn,
  onCreateNewRecordFn,
}) => {
  const thisRecordId = getRndIntegerFn(10000000, 99999999);
  const dayOfWeek = day.dayOfWeek;
  const defaultRecipeIds = {
    breakfastId: "62577f516682e3955e98b1d0",
    snack1Id: "62577a7d93011a9b47306e6f",
    lunchId: "62577f666682e3955e98b1d1",
    snack2Id: "62577f786682e3955e98b1d2",
    dinnerId: "62577f8b6682e3955e98b1d3",
    dessertId: "62577f9c6682e3955e98b1d4",
  };
  const thisDefaultRecipeId = defaultRecipeIds[`${mealType.code}Id`];
  const thisDefaultGenRecipe = {
    _id: thisDefaultRecipeId,
    name: " ",
    availableMealType: mealType,
    GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
    defaultPrepInstructions: "",
    photoURL: "",
  };
  function handleCreateMeal() {
    onCreateNewRecordFn(
      "thisDaysMeals",
      "meal",
      "Meal",
      dayOfWeek.code,
      mealType.code,
      null,
      {
        _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
        day: day,
        genRecipe: thisDefaultGenRecipe,
        mealType: mealType,
      }
    );
  }
  return (
    <div
      className="accordion accordionNotFlush"
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
        <form>
          <div className="form-group mt-4 mb-4">
            <button
              type="button"
              value="Create Meal"
              className="btn btn-primary"
              onClick={handleCreateMeal}
            >
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMealButton;
