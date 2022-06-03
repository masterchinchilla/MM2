const MacrosTable = (props) => {
  const tableType = props.tableType;
  let mealWeightPercent;
  (function () {
    if (tableType === "Day Macros") {
      mealWeightPercent = 1;
    } else {
      const thisMealWeight = props.thisMealWeight;
      mealWeightPercent = thisMealWeight / 100;
    }
  })();
  const calsBudget = props.macrosBudget.cals * mealWeightPercent;
  const carbsBudget = props.macrosBudget.carbs * mealWeightPercent;
  const proteinBudget = props.macrosBudget.protein * mealWeightPercent;
  const fatBudget = props.macrosBudget.fat * mealWeightPercent;
  const fiberBudget = props.macrosBudget.fiber * mealWeightPercent;
  const theseIngrdnts = props.theseIngrdnts;
  let calsCurrent = 0;
  let carbsCurrent = 0;
  let proteinCurrent = 0;
  let fatCurrent = 0;
  let fiberCurrent = 0;
  for (let i = 0; i < theseIngrdnts.length; i++) {
    let thisMealTypesIngrdnts = theseIngrdnts[i];
    for (let i = 0; i < thisMealTypesIngrdnts.length; i++) {
      let thisIngrdnt = thisMealTypesIngrdnts[i].thisMealIngrdnt;

      calsCurrent +=
        thisIngrdnt.qty * thisIngrdnt.genRecipeIngredient.ingredient.calories;
      carbsCurrent +=
        thisIngrdnt.qty * thisIngrdnt.genRecipeIngredient.ingredient.carbs;
      proteinCurrent +=
        thisIngrdnt.qty * thisIngrdnt.genRecipeIngredient.ingredient.protein;
      fatCurrent +=
        thisIngrdnt.qty * thisIngrdnt.genRecipeIngredient.ingredient.fat;
      fiberCurrent +=
        thisIngrdnt.qty * thisIngrdnt.genRecipeIngredient.ingredient.fiber;
    }
  }
  return (
    <table className="table table-bordered macrosTable mealMacrosTbl">
      <thead className="thead">
        <tr>
          <th colSpan={6} scope="col">
            <h5>{tableType}</h5>
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
          <td>{calsBudget.toFixed(2)}</td>
          <td>{carbsBudget.toFixed(2)}</td>
          <td>{proteinBudget.toFixed(2)}</td>
          <td>{fatBudget.toFixed(2)}</td>
          <td>{fiberBudget.toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Crrnt</th>
          <td>{calsCurrent.toFixed(2)}</td>
          <td>{carbsCurrent.toFixed(2)}</td>
          <td>{proteinCurrent.toFixed(2)}</td>
          <td>{fatCurrent.toFixed(2)}</td>
          <td>{fiberCurrent.toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Left</th>
          <td>{(calsBudget - calsCurrent).toFixed(2)}</td>
          <td>{(carbsBudget - carbsCurrent).toFixed(2)}</td>
          <td>{(proteinBudget - proteinCurrent).toFixed(2)}</td>
          <td>{(fatBudget - fatCurrent).toFixed(2)}</td>
          <td>{(fiberBudget - fiberCurrent).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MacrosTable;
