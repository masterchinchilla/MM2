import React, { useState, Component } from "react";
import _ from "lodash";
import { Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealWeighting = (props) => {
  const thisFormState = props.thisFormState;
  const [subFormUnChangedOrInvalid, changeSubFormState] = useState(true);
  const [subFormBttnState, changeSubFormBttnState] =
    useState("subFrmBttnDisabled");
  const [breakfastWeight, breakfastWeightUpdate] = useState(
    props.mealWeights.breakfast
  );
  const [snack1Weight, snack1WeightUpdate] = useState(props.mealWeights.snack1);
  const [lunchWeight, lunchWeightUpdate] = useState(props.mealWeights.lunch);
  const [snack2Weight, snack2WeightUpdate] = useState(props.mealWeights.snack2);
  const [dinnerWeight, dinnerWeightUpdate] = useState(props.mealWeights.dinner);
  const [dessertWeight, dessertWeightUpdate] = useState(
    props.mealWeights.dessert
  );
  const [mlWghtPrctPrgrss, changeMlWghtPrcntProgress] = useState(
    props.mealWeights.breakfast +
      props.mealWeights.snack1 +
      props.mealWeights.lunch +
      props.mealWeights.snack2 +
      props.mealWeights.dinner +
      props.mealWeights.dessert
  );
  function applyChange(e) {
    changeSubFormState(true);
    changeSubFormBttnState("subFrmBttnDisabled");
    props.onUpdateWeights(
      {
        breakfast: breakfastWeight,
        snack1: snack1Weight,
        lunch: lunchWeight,
        snack2: snack2Weight,
        dinner: dinnerWeight,
        dessert: dessertWeight,
      },
      e
    );
  }
  function handleUpdateWeights(newPrcnt, mealTypeCode) {
    changeSubFormState(false);
    changeSubFormBttnState("subFrmBttnEnabled");
    let weightsArray = [
      { name: "breakfast", value: breakfastWeight },
      { name: "snack1", value: snack1Weight },
      { name: "lunch", value: lunchWeight },
      { name: "snack2", value: snack2Weight },
      { name: "dinner", value: dinnerWeight },
      { name: "dessert", value: dessertWeight },
    ];
    for (let i = 0; i < weightsArray.length; i++) {
      if (weightsArray[i].name === mealTypeCode) {
        weightsArray[i].value = newPrcnt;
      }
    }
    let consumed = 0;
    for (let i = 0; i < weightsArray.length; i++) {
      consumed = consumed + weightsArray[i].value;
    }
    let difference = 100 - consumed;
    if (difference < 0) {
      let remainingDifference = difference - difference - difference;
      let overPerMeal;
      overPerMeal = remainingDifference / 5;
      let thisMealTypeChecked = false;
      for (let i = 0; i < weightsArray.length; i++) {
        if (weightsArray[i].name !== mealTypeCode) {
          if (weightsArray[i].value >= overPerMeal) {
            weightsArray[i].value -= overPerMeal;
            remainingDifference -= overPerMeal;
          } else {
            let amountShort = overPerMeal - weightsArray[i].value;
            remainingDifference -= weightsArray[i].value;
            weightsArray[i].value = 0;
            remainingDifference += amountShort;
            let remainingMealsCount = 5;
            if (thisMealTypeChecked) {
              remainingMealsCount -= 1;
            }
            remainingMealsCount -= i;
            //  = i === 0 ? 5 - 1 : 4 - i;
            overPerMeal = remainingDifference / remainingMealsCount;
            //number meals left: at array position 0, =5-1, at 1,=4-i,at 2,=4-i,at 3,4-i,at 4
          }
        } else {
          thisMealTypeChecked = true;
        }
      }
    }
    breakfastWeightUpdate(Math.round(weightsArray[0].value));
    snack1WeightUpdate(Math.round(weightsArray[1].value));
    lunchWeightUpdate(Math.round(weightsArray[2].value));
    snack2WeightUpdate(Math.round(weightsArray[3].value));
    dinnerWeightUpdate(Math.round(weightsArray[4].value));
    dessertWeightUpdate(Math.round(weightsArray[5].value));
    let newConsumed = 0;
    for (let i = 0; i < weightsArray.length; i++) {
      newConsumed += weightsArray[i].value;
    }
    changeMlWghtPrcntProgress(Math.round(newConsumed));
    if (newConsumed < 100) {
      changeSubFormState(true);
    } else {
      changeSubFormState(false);
    }
  }
  return (
    <div className="mlWghtsCont">
      <div className="mlWghtPcrntChckrDiv">
        <span className="mlWghtPrcntChckrExplntn">
          Allocate 100% Among Meal Types
        </span>
        <div className="progress">
          <div
            className={
              mlWghtPrctPrgrss < 100
                ? "progress-bar progress-bar-striped bg-warning"
                : subFormUnChangedOrInvalid
                ? "progress-bar progress-bar-striped"
                : "progress-bar progress-bar-striped bg-success"
            }
            role="progressbar"
            aria-label="Default striped example"
            style={{ width: `${mlWghtPrctPrgrss}%` }}
            aria-valuenow={mlWghtPrctPrgrss}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {mlWghtPrctPrgrss}
          </div>
        </div>
        <div className="applyMlWghtChngBttnCont">
          <button
            id="mlWghtPrcntPrgrssBar"
            className="btn btn-primary applyMlWghtChngBttn"
            onClick={(e) => {
              // changeSubFormBttnState("subFrmBttnClicked");
              applyChange(e);
            }}
            disabled={subFormUnChangedOrInvalid}
          >
            <FontAwesomeIcon icon="fa-solid fa-check" />
          </button>
          <label
            htmlFor="mlWghtPrcntPrgrssBar"
            className={
              !subFormUnChangedOrInvalid
                ? "applyMlWghtChngBttnLabel"
                : "applyMlWghtChngBttnLabel labelOff"
            }
          >
            Apply
          </label>
        </div>
      </div>

      <div className="form-group mealPrcntSldr">
        <label>
          Breakfast&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={breakfastWeight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "breakfast");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={breakfastWeight}
          className="mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "breakfast");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div className="form-group mealPrcntSldr">
        <label>
          Snack 1&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={snack1Weight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "snack1");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={snack1Weight}
          className="mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "snack1");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div className="form-group mealPrcntSldr">
        <label>
          Lunch&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={lunchWeight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "lunch");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={lunchWeight}
          className="mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "lunch");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div className="form-group mealPrcntSldr">
        <label>
          Snack 2&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={snack2Weight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "snack2");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={snack2Weight}
          className="mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "snack2");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div className="form-group mealPrcntSldr">
        <label>
          Dinner&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={dinnerWeight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "dinner");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={dinnerWeight}
          className="mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "dinner");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div className="form-group mealPrcntSldr">
        <label>
          Dessert&nbsp;
          <input
            className="form-control mealWeightNumField"
            type={"number"}
            value={dessertWeight}
            onChange={(e) => {
              handleUpdateWeights(e.target.value, "dessert");
            }}
            disabled={thisFormState === "viewing" ? true : false}
          />
          %
        </label>
        <Slider
          defaultValue={80}
          value={dessertWeight}
          className="mealPrcntSldr mealPrcntSldr"
          onChange={(e) => {
            handleUpdateWeights(e.target.value, "dessert");
          }}
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
    </div>
  );
};

export default MealWeighting;
