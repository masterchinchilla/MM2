import React, { useState } from "react";
import _ from "lodash";
import { Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MealWeightingSubForm = (props) => {
  const { thisFormState, mealWeights, onUpdateWeightsFn, getRndIntegerFn } =
    props;
  const breakfast = mealWeights.breakfast ? mealWeights.breakfast : 0;
  const snack1 = mealWeights.snack1 ? mealWeights.snack1 : 0;
  const lunch = mealWeights.lunch ? mealWeights.lunch : 0;
  const snack2 = mealWeights.snack2 ? mealWeights.snack2 : 0;
  const dinner = mealWeights.dinner ? mealWeights.dinner : 0;
  const dessert = mealWeights.dessert ? mealWeights.dessert : 0;
  const [subFormUnChangedOrInvalid, setSubFrmUnChngdOrInvld] = useState(true);
  const [breakfastWeight, breakfastWeightUpdate] = useState(breakfast);
  const [snack1Weight, snack1WeightUpdate] = useState(snack1);
  const [lunchWeight, lunchWeightUpdate] = useState(lunch);
  const [snack2Weight, snack2WeightUpdate] = useState(snack2);
  const [dinnerWeight, dinnerWeightUpdate] = useState(dinner);
  const [dessertWeight, dessertWeightUpdate] = useState(dessert);
  const [mlWghtPrctPrgrss, changeMlWghtPrcntProgress] = useState(
    breakfast + snack1 + lunch + snack2 + dinner + dessert
  );
  function applyChange(e) {
    setSubFrmUnChngdOrInvld(true);
    onUpdateWeightsFn(
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
  function handleUpdateWeights(e, mealTypeCode) {
    const newPrcnt = JSON.parse(e.target.value);
    console.log(`user updated ${mealTypeCode} weight to ${newPrcnt}`);
    let weightsArray = [
      {
        name: "breakfast",
        value: breakfastWeight,
        amntToReduceByPerChnge: 0,
      },
      { name: "snack1", value: snack1Weight, amntToReduceByPerChnge: 0 },
      { name: "lunch", value: lunchWeight, amntToReduceByPerChnge: 0 },
      { name: "snack2", value: snack2Weight, amntToReduceByPerChnge: 0 },
      { name: "dinner", value: dinnerWeight, amntToReduceByPerChnge: 0 },
      { name: "dessert", value: dessertWeight, amntToReduceByPerChnge: 0 },
    ];
    switch (mealTypeCode) {
      case "breakfast":
        breakfastWeightUpdate(newPrcnt);
        weightsArray[0].value = newPrcnt;
        break;
      case "snack1":
        snack1WeightUpdate(newPrcnt);
        weightsArray[1].value = newPrcnt;
        break;
      case "lunch":
        lunchWeightUpdate(newPrcnt);
        weightsArray[2].value = newPrcnt;
        break;
      case "snack2":
        snack2WeightUpdate(newPrcnt);
        weightsArray[3].value = newPrcnt;
        break;
      case "dinner":
        dinnerWeightUpdate(newPrcnt);
        weightsArray[4].value = newPrcnt;
        break;
      case "dessert":
        dessertWeightUpdate(newPrcnt);
        weightsArray[5].value = newPrcnt;
        break;
    }
    console.log(weightsArray[0]);
    console.log(weightsArray[1]);
    console.log(weightsArray[2]);
    console.log(weightsArray[3]);
    console.log(weightsArray[4]);
    console.log(weightsArray[5]);
    let consumed = 0;
    for (let i = 0; i < weightsArray.length; i++) {
      consumed = consumed + weightsArray[i].value;
    }
    console.log(`total consumed: ${consumed}`);
    let difference = 100 - consumed;
    console.log(`consumed is ${difference} over/under 100`);
    changeMlWghtPrcntProgress(consumed);
    if (difference >= 0) {
      console.log(`consumed is under or at 100`);
      if ((difference = 0)) {
        console.log(`consumed is exactly 100`);
        setSubFrmUnChngdOrInvld(false);
        return;
      } else {
        console.log(`consumed is under 100`);
        setSubFrmUnChngdOrInvld(true);
        return;
      }
    } else {
      console.log(`consumed is over 100`);
      let absDifference = Math.abs(difference);
      console.log(`absolute amount over is ${absDifference}`);
      let itemsToReduce = 5;
      let itemsToDecrementBy1 = 0;

      function updateAmntsToReduceBy() {
        let diffMinusRemainder = 0;
        let remainder = 0;
        let integerQuotient = 0;
        let roundedRemainder = 0;
        if (itemsToReduce <= absDifference) {
          remainder = absDifference % itemsToReduce;
          console.log(
            `amount over (${absDifference}), divided by ${itemsToReduce} has a remainder of ${remainder}`
          );
          roundedRemainder = Math.round(remainder);
          diffMinusRemainder = absDifference - roundedRemainder;
          console.log(`amount over minus remainder is ${diffMinusRemainder}`);
          integerQuotient = diffMinusRemainder / itemsToReduce;

          console.log(
            `if split evenly over ${itemsToReduce} meal types, can subtract ${integerQuotient} from ${itemsToReduce} meal weights to end up back at total of 100%`
          );
        } else {
          diffMinusRemainder = absDifference;
          integerQuotient = 1;
          console.log(
            `Can subtract ${integerQuotient} from ${integerQuotient} meal weights to end up back at total of 100%`
          );
        }

        if (roundedRemainder === 0) {
          console.log(
            `since there was no remainder, the remainder doesn't need to be spread across meal weights`
          );
          itemsToDecrementBy1 = 0;
        } else {
          itemsToDecrementBy1 = roundedRemainder / 1;
          console.log(
            `to apply the remainder we should decrement ${itemsToDecrementBy1} mealType weights by 1`
          );
        }
        for (let i = 0; i < weightsArray.length; i++) {
          console.log(
            `checking ${weightsArray[i].name} for amount to reduce by per change`
          );
          if (
            weightsArray[i].value === weightsArray[i].amntToReduceByPerChnge
          ) {
            console.log(
              `we can't reduce ${weightsArray[i].name} since it has no remaining extra`
            );
          } else {
            if (weightsArray[i].name === mealTypeCode) {
              console.log(
                `no need to reduce ${weightsArray[i].name} since that was the weight updated`
              );
            } else {
              if (absDifference > 0) {
                weightsArray[i].amntToReduceByPerChnge += integerQuotient;
                diffMinusRemainder -= integerQuotient;
                absDifference -= integerQuotient;
                console.log(
                  `difference to be applied is now reduced to ${diffMinusRemainder}`
                );
                if (
                  weightsArray[i].value < weightsArray[i].amntToReduceByPerChnge
                ) {
                  let localQuotient = 0;
                  localQuotient += integerQuotient;
                  let amntThisWghtShrtQutnt =
                    weightsArray[i].amntToReduceByPerChnge -
                    weightsArray[i].value;
                  localQuotient -= amntThisWghtShrtQutnt;
                  console.log(
                    `The ${weightsArray[i].name} value of ${weightsArray[i].value} is ${amntThisWghtShrtQutnt} less than ${weightsArray[i].amntToReduceByPerChnge}, which is the amount each meal weight needed to reduce to bring total back down to 100%.`
                  );
                  weightsArray[i].amntToReduceByPerChnge = localQuotient;
                  console.log(weightsArray);
                  console.log(
                    `so we're only reducing ${weightsArray[i].name} to ${weightsArray[i].amntToReduceByPerChnge}`
                  );
                  diffMinusRemainder += amntThisWghtShrtQutnt;
                  absDifference += amntThisWghtShrtQutnt;
                  itemsToReduce--;
                  console.log(
                    `and we have to add ${amntThisWghtShrtQutnt} back to the diffMinusRemainder to now equal ${diffMinusRemainder} and re-divide that up among the ${itemsToReduce} other mealTypes`
                  );
                }
                if (
                  itemsToDecrementBy1 > 0 &&
                  weightsArray[i].amntToReduceByPerChnge < weightsArray[i].value
                ) {
                  weightsArray[i].amntToReduceByPerChnge++;
                  console.log(
                    `we still need to apply the remainder to ${itemsToDecrementBy1} mealTypes. ${weightsArray[i].name} has enough remaining value to be decremented by a new total of ${weightsArray[i].amntToReduceByPerChnge}`
                  );
                  itemsToDecrementBy1--;
                  absDifference--;
                  console.log(
                    `we still need to apply remainder to ${itemsToDecrementBy1} items`
                  );
                }
              } else {
                itemsToReduce--;
              }
            }
          }
        }
        console.log(`absDifference now equals: ${absDifference}`);
        console.log(`itemsToReduce now equals: ${itemsToReduce}`);
        console.log(`itemsToDecrementBy1 now equals: ${itemsToDecrementBy1}`);
        console.log(weightsArray[0]);
        console.log(weightsArray[1]);
        console.log(weightsArray[2]);
        console.log(weightsArray[3]);
        console.log(weightsArray[4]);
        console.log(weightsArray[5]);
      }
      updateAmntsToReduceBy();
      let x = 0;
      while (absDifference > 0) {
        x++;
        console.log("loop pass " + x);
        updateAmntsToReduceBy();
      }
      let mlWghtPrcntProgress = 0;
      for (let i = 0; i < weightsArray.length; i++) {
        mlWghtPrcntProgress +=
          weightsArray[i].value - weightsArray[i].amntToReduceByPerChnge;
      }
      console.log(`user has allocated ${mlWghtPrcntProgress}`);
      changeMlWghtPrcntProgress(mlWghtPrcntProgress);
      console.log(weightsArray[0]);
      console.log(weightsArray[1]);
      console.log(weightsArray[2]);
      console.log(weightsArray[3]);
      console.log(weightsArray[4]);
      console.log(weightsArray[5]);
      console.log(`updating local state meal weight percent progress`);
      if (mlWghtPrcntProgress < 100) {
        setSubFrmUnChngdOrInvld(true);
        console.log(
          `since user has allocted less than 100%, changes cannot be applied and saved yet`
        );
      } else {
        setSubFrmUnChngdOrInvld(false);
        console.log(
          `since user has allocted 100%, changes can be applied and saved`
        );
      }
      console.log(`now updating local state weights`);
      breakfastWeightUpdate(
        (weightsArray[0].value -= weightsArray[0].amntToReduceByPerChnge)
      );
      snack1WeightUpdate(
        (weightsArray[1].value -= weightsArray[1].amntToReduceByPerChnge)
      );
      lunchWeightUpdate(
        (weightsArray[2].value -= weightsArray[2].amntToReduceByPerChnge)
      );
      snack2WeightUpdate(
        (weightsArray[3].value -= weightsArray[3].amntToReduceByPerChnge)
      );
      dinnerWeightUpdate(
        (weightsArray[4].value -= weightsArray[4].amntToReduceByPerChnge)
      );
      dessertWeightUpdate(
        (weightsArray[5].value -= weightsArray[5].amntToReduceByPerChnge)
      );
    }
  }
  return (
    <div className="card weekMealPlanFormCards mt-3 mb-3">
      <div className="card-header">
        <h2 className="card-title">Meal Macro Weighting</h2>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={
            "accordionFull_MealMacroWeighting" +
            getRndIntegerFn(10000000, 99999999)
          }
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "accordionHeader_MealMacroWeighting" +
                getRndIntegerFn(10000000, 99999999)
              }
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#dayAccrdn_MealMacroWeighting" +
                  getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={
              "dayAccrdn_MealMacroWeighting" +
              getRndIntegerFn(10000000, 99999999)
            }
            className="accordion-collapse collapse show"
            aria-labelledby={
              "#accordionHeader_MealMacroWeighting" +
              getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#accordionFull_MealMacroWeighting" +
              getRndIntegerFn(10000000, 99999999)
            }
          >
            <div className="accordion-body accrdnWeekMealPlanMacroBdy">
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
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {mlWghtPrctPrgrss}
                    </div>
                  </div>
                  <div className="applyMlWghtChngBttnCont">
                    <button
                      id="mlWghtPrcntPrgrssBar"
                      className="btn btn-primary applyMlWghtChngBttn"
                      onClick={(e) => {
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
                        handleUpdateWeights(e, "breakfast");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={breakfastWeight}
                    className="mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "breakfast");
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
                        handleUpdateWeights(e, "snack1");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={snack1Weight}
                    className="mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "snack1");
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
                        handleUpdateWeights(e, "lunch");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={lunchWeight}
                    className="mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "lunch");
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
                        handleUpdateWeights(e, "snack2");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={snack2Weight}
                    className="mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "snack2");
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
                        handleUpdateWeights(e, "dinner");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={dinnerWeight}
                    className="mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "dinner");
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
                        handleUpdateWeights(e, "dessert");
                      }}
                      disabled={thisFormState === "viewing" ? true : false}
                    />
                    %
                  </label>
                  <Slider
                    defaultValue={0}
                    step={1}
                    min={0}
                    max={100}
                    value={dessertWeight}
                    className="mealPrcntSldr mealPrcntSldr"
                    onChange={(e) => {
                      handleUpdateWeights(e, "dessert");
                    }}
                    disabled={thisFormState === "viewing" ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealWeightingSubForm;