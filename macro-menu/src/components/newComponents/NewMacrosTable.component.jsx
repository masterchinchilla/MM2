import React from "react";
import CustomHeading from "./CustomHeading.component";
const NewMacrosTable = (props) => {
  const {
    tableType,
    thisMealType,
    theseIngrdnts,
    recordLoaded,
    getRndIntegerFn,
  } = props;
  const thisMealTypeCode = thisMealType.code ? thisMealType.code : "breakfast";
  const thisMealWeightType = `${thisMealTypeCode}Weight`;
  const thisWMPRecord = props.thisWMPRecord
    ? props.thisWMPRecord
    : {
        breakfastWeight: 1,
        snack1Weight: 1,
        lunchWeight: 1,
        snack2Weight: 1,
        dinnerWeight: 1,
        dessertWeight: 1,
        calsBudget: 1,
        carbsBudget: 1,
        proteinBudget: 1,
        fatBudget: 1,
        fiberBudget: 1,
      };
  const thisMealWeight = thisWMPRecord[thisMealWeightType];
  const { calsBudget, carbsBudget, proteinBudget, fatBudget, fiberBudget } =
    thisWMPRecord;
  const thisRecordId = getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "tableType";
  let mealWeightPercent;
  (function () {
    if (tableType === "Day Macros") {
      mealWeightPercent = 1;
    } else {
      mealWeightPercent = thisMealWeight / 100;
    }
  })();
  const localCalsBudget = calsBudget * mealWeightPercent;
  const localCarbsBudget = carbsBudget * mealWeightPercent;
  const localProteinBudget = proteinBudget * mealWeightPercent;
  const localFatBudget = fatBudget * mealWeightPercent;
  const localFiberBudget = fiberBudget * mealWeightPercent;
  let calsCurrent = 0;
  let carbsCurrent = 0;
  let proteinCurrent = 0;
  let fatCurrent = 0;
  let fiberCurrent = 0;
  for (let i = 0; i < theseIngrdnts.length; i++) {
    let thisMealTypesIngrdnts = theseIngrdnts[i];
    for (let i = 0; i < thisMealTypesIngrdnts.length; i++) {
      let thisIngrdnt = thisMealTypesIngrdnts[i].thisRecord;
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
            <CustomHeading
              key={`customTblTypHeadingFor${typeOfRecordToChange}${thisRecordId}`}
              headingLvl={5}
              recordLoaded={recordLoaded}
              headingText={tableType}
              hdngIsReqFormLbl={false}
              editingForm={null}
              headingClasses=""
            />
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
      {props.thisWMPRecord ? (
        <tbody>
          <tr>
            <th scope="row">Bdgt</th>

            <td>{localCalsBudget.toFixed(2)}</td>
            <td>{localCarbsBudget.toFixed(2)}</td>
            <td>{localProteinBudget.toFixed(2)}</td>
            <td>{localFatBudget.toFixed(2)}</td>
            <td>{localFiberBudget.toFixed(2)}</td>
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
      ) : (
        <tbody>
          <tr>
            <th scope="row">Bdgt</th>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
          </tr>
          <tr>
            <th scope="row">Crrnt</th>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
          </tr>
          <tr>
            <th scope="row">Left</th>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
            <td className="placeholder-glow">
              <span className="placeholder"></span>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default NewMacrosTable;