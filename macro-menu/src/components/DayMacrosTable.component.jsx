import React, { useState, useEffect } from "react";
const DayMacrosTable = (props) => {
  // const tableType = props.tableType;
  const macrosBudget = props.macrosBudget;
  // const [breakfastIngredients, updateBreakfastIngredients] = useState(
  //   props.breakfastIngrdnts
  // );
  // const [snack1Ingredients, updateSnack1Ingredients] = useState(
  //   props.snack1Ingrdnts
  // );
  // const [lunchIngredients, updateLunchIngredients] = useState(
  //   props.lunchIngrdnts
  // );
  // const [snack2Ingredients, updateSnack2Ingredients] = useState(
  //   props.snack2Ingrdnts
  // );
  // const [dinnerIngredients, updateDinnerIngredients] = useState(
  //   props.dinnerIngrdnts
  // );
  // const [dessertIngredients, updateDessertIngredients] = useState(
  //   props.dessertIngrdnts
  // );
  const allMealIngredients = {
    breakfastIngredients: props.breakfastIngrdnts,
    snack1Ingredients: props.snack1Ingrdnts,
    lunchIngredients: props.lunchIngrdnts,
    snack2Ingredients: props.snack2Ingrdnts,
    dinnerIngredients: props.dinnerIngrdnts,
    dessertIngredients: props.dessertIngrdnts,
  };
  let macrosCurrent = {
    cals: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fiber: 0,
  };
  // let mealMacrosCurrent={
  //   breakfastMacrosCurrent:{},
  //   snack1MacrosCurrent:{},
  //   lunchMacrosCurrent:{},
  //   snack2MacrosCurrent:{},
  //   dinnerMacrosCurrent:{},
  //   dessertMacrosCurrent:{},
  // };
  const mealTypesArray = [
    "breakfast",
    "snack1",
    "lunch",
    "snack2",
    "dinner",
    "dessert",
  ];
  const macroTypesArray = ["cals", "carbs", "protein", "fat", "fiber"];
  const ingrdntRecordMacroTypesArray = [
    "calories",
    "carbs",
    "protein",
    "fat",
    "fiber",
  ];
  function clearAllMacros() {
    for (let a = 0; a < macroTypesArray.length; a++) {
      let thisMacroType = macroTypesArray[a];
      macrosCurrent[thisMacroType] = 0;
    }
    // for(let b=0;b<mealTypesArray.length;b++){
    //   for(let c=0;c<macroTypesArray.length;c++){
    //     mealMacrosCurrent[mealTypesArray[b]][c]=0;
    //   };
    // };
  }
  // function totalAllMacros
  (() => {
    clearAllMacros();
    console.log("Clearing macros");
    console.log(macrosCurrent);
    for (let a = 0; a < mealTypesArray.length; a++) {
      let thisMealType = mealTypesArray[a];
      let thisMealIngrdntProp = `${thisMealType}Ingredients`;
      let thisIngredientArray = allMealIngredients[thisMealIngrdntProp];
      for (let c = 0; c < thisIngredientArray.length; c++) {
        let thisMealIngredientQty = thisIngredientArray[c].qty;
        let thisIngredientItself =
          thisIngredientArray[c].genRecipeIngredient.ingredient;
        for (let b = 0; b < ingrdntRecordMacroTypesArray.length; b++) {
          let thisIngrdntMacroType = ingrdntRecordMacroTypesArray[b];
          let thisMacroType = macroTypesArray[b];
          let newMealMacroTotal =
            thisMealIngredientQty * thisIngredientItself[thisIngrdntMacroType];
          // mealMacrosCurrent[mealTypesArray[a]][macroTypesArray[b]]+=newMealMacroTotal;
          macrosCurrent[thisMacroType] += newMealMacroTotal;
          console.log(
            `Adding ${newMealMacroTotal} ${thisMealType} ${thisIngrdntMacroType} to total ${thisMacroType}`
          );
          console.log(macrosCurrent);
        }
      }
    }
  })();
  return (
    <table className="table table-bordered macrosTable mealMacrosTbl">
      <thead className="thead">
        <tr>
          <th colSpan={6} scope="col">
            <h5>Day Macros Table 2</h5>
          </th>
        </tr>
        <tr>
          <th scope="col" className="perpendicularTextCell"></th>
          <th scope="col" className="perpendicularTextCell">
            Cals
          </th>
          <th scope="col" className="perpendicularTextCell">
            Carbs
          </th>
          <th scope="col" className="perpendicularTextCell">
            Protein
          </th>
          <th scope="col" className="perpendicularTextCell">
            Fat
          </th>
          <th scope="col" className="perpendicularTextCell">
            Fiber
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Bdgt</th>
          <td>{macrosBudget.cals.toFixed(2)}</td>
          <td>{macrosBudget.carbs.toFixed(2)}</td>
          <td>{macrosBudget.protein.toFixed(2)}</td>
          <td>{macrosBudget.fat.toFixed(2)}</td>
          <td>{macrosBudget.fiber.toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Crrnt</th>
          <td>{macrosCurrent.cals.toFixed(2)}</td>
          <td>{macrosCurrent.carbs.toFixed(2)}</td>
          <td>{macrosCurrent.protein.toFixed(2)}</td>
          <td>{macrosCurrent.fat.toFixed(2)}</td>
          <td>{macrosCurrent.fiber.toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Left</th>
          <td>{(macrosBudget.cals - macrosCurrent.cals).toFixed(2)}</td>
          <td>{(macrosBudget.carbs - macrosCurrent.carbs).toFixed(2)}</td>
          <td>{(macrosBudget.protein - macrosCurrent.protein).toFixed(2)}</td>
          <td>{(macrosBudget.fat - macrosCurrent.fat).toFixed(2)}</td>
          <td>{(macrosBudget.fiber - macrosCurrent.fiber).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DayMacrosTable;
