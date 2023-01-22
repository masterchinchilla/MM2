import React, { useState, useEffect } from "react";
import _ from "lodash";
import WMPCopyLoadingBar from "./WMPCopyLoadingBar.component";
const WMPCopier = (props) => {
  const {
    weekMealPlanState,
    copyingWMP,
    toggleCopyingWMP,
    handleCreateNewRecordInDb,
    recordLoaded,
  } = props;
  const [numOfItemsCopied, setNumOfItemsCopied] = useState(0);
  const [initialNumOfItemsToCopy, setInitialNumOfItemsToCopy] = useState(0);
  async function handleCopyWMPFn() {
    let numOfDays = 7;
    let numOfMeals = 42;
    let numOfMealIngrdnts = 0;
    let state = weekMealPlanState;
    let thisWMPRecord = state.thisWMPStateObj.thisRecord;
    const pattern = /missing/;
    const newWMPToSave = _.pick(thisWMPRecord, [
      "name",
      "breakfastWeight",
      "snack1Weight",
      "lunchWeight",
      "snack2Weight",
      "dinnerWeight",
      "dessertWeight",
      "calsBudget",
      "carbsBudget",
      "proteinBudget",
      "fatBudget",
      "fiberBudget",
    ]);
    let currentGRFUser = state.currentGRFUser;
    newWMPToSave.GRFUser = currentGRFUser;
    newWMPToSave.name = `${currentGRFUser.handle}'s copy of ${thisWMPRecord.name}`;
    let createNewRecordResult = await handleCreateNewRecordInDb(
      "weekMealPlan",
      newWMPToSave
    );
    if (createNewRecordResult.valErrors.length > 0) {
      toggleCopyingWMP(false);
      return;
    } else {
      newWMPToSave._id = createNewRecordResult.savedRecord._id;
      let localNumOfItemsCopied = numOfItemsCopied + 1;
      setNumOfItemsCopied(localNumOfItemsCopied);
      let daysOfWeek = state.daysOfWeek;
      for (let i = 0; i < daysOfWeek.length; i++) {
        let thisDayOfWeek = daysOfWeek[i];
        let thisDayStateObj = state[thisDayOfWeek.code];
        let thisDay = thisDayStateObj.thisRecord;
        let thisDayId = thisDay._id;
        let testResult = pattern.test(thisDayId);
        if (!testResult) {
          const newDay = {
            name: newWMPToSave.name + " - " + thisDayOfWeek.name,
            dayOfWeek: thisDayOfWeek,
            weekMealPlan: newWMPToSave,
          };
          let createNewRecordResult = await handleCreateNewRecordInDb(
            "day",
            newDay
          );
          if (createNewRecordResult.valErrors.length > 0) {
            toggleCopyingWMP(false);
            return;
          } else {
            newDay._id = createNewRecordResult.savedRecord._id;
            let localNumOfItemsCopied = numOfItemsCopied + 1;
            setNumOfItemsCopied(localNumOfItemsCopied);
            numOfDays--;
            let mealTypes = state.mealTypes;
            for (let i = 0; i < mealTypes.length; i++) {
              let thisMealType = mealTypes[i];
              let thisMealStateObj = thisDayStateObj[thisMealType.code];
              let thisMeal = thisMealStateObj.thisRecord;
              let thisMealId = thisMeal._id;
              let testResult = pattern.test(thisMealId);
              if (!testResult) {
                const newMeal = {
                  day: newDay,
                  genRecipe: thisMeal.genRecipe,
                  prepInstructions: "",
                  mealType: thisMealType,
                };
                let createNewRecordResult = await handleCreateNewRecordInDb(
                  "meal",
                  newMeal
                );
                if (createNewRecordResult.valErrors.length > 0) {
                  toggleCopyingWMP(false);
                  return;
                } else {
                  newMeal._id = createNewRecordResult.savedRecord._id;
                  let localNumOfItemsCopied = numOfItemsCopied + 1;
                  setNumOfItemsCopied(localNumOfItemsCopied);
                  let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
                  let mealIngrdntsLength = thisMealsIngrdnts.length;
                  numOfMealIngrdnts += mealIngrdntsLength;
                  if (numOfMealIngrdnts === 0) {
                    numOfMeals--;
                    if (
                      numOfDays === 0 &&
                      numOfMeals === 0 &&
                      numOfMealIngrdnts === 0
                    ) {
                      // window.location =
                      //   "/weekMealPlans/edit/" + newWMPToSave._id;
                      console.log("navigating to new WMP");
                    }
                  } else {
                    numOfMeals--;
                    for (let i = 0; i < mealIngrdntsLength; i++) {
                      let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
                      let thisMealIngrdnt = thisMealIngrdntStateObj.thisRecord;
                      const newMealIngrdnt = _.pick(thisMealIngrdnt, [
                        "qty",
                        "genRecipeIngredient",
                      ]);
                      newMealIngrdnt.meal = newMeal;
                      let createNewRecordResult =
                        await handleCreateNewRecordInDb(
                          "mealIngredient",
                          newMealIngrdnt
                        );
                      if (createNewRecordResult.valErrors.length > 0) {
                        toggleCopyingWMP(false);
                        return;
                      } else {
                        newMealIngrdnt._id =
                          createNewRecordResult.savedRecord._id;
                        let localNumOfItemsCopied = numOfItemsCopied + 1;
                        setNumOfItemsCopied(localNumOfItemsCopied);
                        numOfMealIngrdnts--;
                        if (
                          numOfDays === 0 &&
                          numOfMeals === 0 &&
                          numOfMealIngrdnts === 0
                        ) {
                          // window.location =
                          //   "/weekMealPlans/edit/" + newWMPToSave._id;
                          console.log("navigating to new WMP");
                        }
                      }
                    }
                  }
                }
              } else {
                numOfMeals--;
                if (
                  numOfDays === 0 &&
                  numOfMeals === 0 &&
                  numOfMealIngrdnts === 0
                ) {
                  // window.location =
                  //   "/weekMealPlans/edit/" + newWMPToSave._id;
                  console.log("navigating to new WMP");
                }
              }
            }
          }
        } else {
          numOfMeals -= 6;
          numOfDays--;
          if (numOfDays === 0 && numOfMeals === 0 && numOfMealIngrdnts === 0) {
            // window.location = "/weekMealPlans/edit/" + newWMPToSave._id;
            console.log("navigating to new WMP");
          }
        }
      }
    }
  }
  useEffect(() => {
    if (copyingWMP) {
      handleCopyWMPFn();
    } else {
      setInitialNumOfItemsToCopy(
        1 +
          weekMealPlanState.countOfLinkedDays +
          weekMealPlanState.countOfLinkedMeals +
          weekMealPlanState.countOfLinkedMealIngrdnts
      );
      setNumOfItemsCopied(0);
    }
  });
  return (
    <WMPCopyLoadingBar
      showWMPCopyProgressBar={copyingWMP}
      percentCopied={
        numOfItemsCopied > 0
          ? (numOfItemsCopied * 100) / initialNumOfItemsToCopy
          : 0
      }
    />
  );
};

export default WMPCopier;
