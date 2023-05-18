import React from "react";
import CustomHeading from "./CustomHeading.component";
import TableCell from "./TableCell.component";
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
              key={`CustomHeading for tableType for day or meal ${thisRecordId}`}
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
          <TableCell
            key={`TableCell for "Cals" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localCalsBudget ? "Cals" : null}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for "Carbs" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localCarbsBudget ? "Carbs" : null}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for "Protein" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localProteinBudget ? "Protein" : null}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for "Fat" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localFatBudget ? "Fat" : null}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for "Fiber" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localFiberBudget ? "Fiber" : null}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={recordLoaded}
          />
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableCell
            key={`TableCell for "Bdgt" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={localCalsBudget ? "Bdgt" : null}
            tCellClasses=""
            scope="row"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for localCalsBudget for day or meal ${thisRecordId}`}
            tCellType="td"
            data={localCalsBudget ? localCalsBudget.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for localCarbsBudget for day or meal ${thisRecordId}`}
            tCellType="td"
            data={localCarbsBudget ? localCarbsBudget.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for localProteinBudget for day or meal ${thisRecordId}`}
            tCellType="td"
            data={localProteinBudget ? localProteinBudget.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for localFatBudget for day or meal ${thisRecordId}`}
            tCellType="td"
            data={localFatBudget ? localFatBudget.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for localFiberBudget for day or meal ${thisRecordId}`}
            tCellType="td"
            data={localFiberBudget ? localFiberBudget.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
        </tr>
        <tr>
          <TableCell
            key={`TableCell for "Crrnt" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={calsCurrent ? "Crrnt" : null}
            tCellClasses=""
            scope="row"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for calsCurrent for day or meal ${thisRecordId}`}
            tCellType="td"
            data={calsCurrent ? calsCurrent.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for carbsCurrent for day or meal ${thisRecordId}`}
            tCellType="td"
            data={carbsCurrent ? carbsCurrent.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for proteinCurrent for day or meal ${thisRecordId}`}
            tCellType="td"
            data={proteinCurrent ? proteinCurrent.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for fatCurrent for day or meal ${thisRecordId}`}
            tCellType="td"
            data={fatCurrent ? fatCurrent.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for fiberCurrent for day or meal ${thisRecordId}`}
            tCellType="td"
            data={fiberCurrent ? fiberCurrent.toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
        </tr>
        <tr>
          <TableCell
            key={`TableCell for "Left" for day or meal ${thisRecordId}`}
            tCellType="th"
            data={calsCurrent ? "Left" : null}
            tCellClasses=""
            scope="row"
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for cals left for day or meal ${thisRecordId}`}
            tCellType="td"
            data={calsCurrent ? (calsBudget - calsCurrent).toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for carbs left for day or meal ${thisRecordId}`}
            tCellType="td"
            data={carbsCurrent ? (carbsBudget - carbsCurrent).toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for protein left for day or meal ${thisRecordId}`}
            tCellType="td"
            data={
              proteinCurrent
                ? (proteinBudget - proteinCurrent).toFixed(2)
                : null
            }
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for fat left for day or meal ${thisRecordId}`}
            tCellType="td"
            data={fatCurrent ? (fatBudget - fatCurrent).toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
          <TableCell
            key={`TableCell for fiber left for day or meal ${thisRecordId}`}
            tCellType="td"
            data={fiberCurrent ? (fiberBudget - fiberCurrent).toFixed(2) : null}
            tCellClasses=""
            scope=""
            recordLoaded={recordLoaded}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default NewMacrosTable;
