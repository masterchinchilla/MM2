import React from "react";
const MealWeightingTbl = ({ thisRecord }) => {
  const {
    _id,
    breakfastWeight,
    snack1Weight,
    lunchWeight,
    snack2Weight,
    dinnerWeight,
    dessertWeight,
  } = thisRecord;
  return (
    <table className="spreadsheetTbl mealWghtTbl">
      <thead>
        <tr className="sprdshtBrdrdTblTr">
          <th colSpan={6}>
            <h2>Meal Weighting</h2>
          </th>
        </tr>
        <tr className="sprdshtBrdrdTblTr">
          <th>Breakfast</th>
          <th>Snack 1</th>
          <th>Lunch</th>
          <th>Snack 2</th>
          <th>Dinner</th>
          <th>Dessert</th>
        </tr>
      </thead>
      <tbody>
        <tr className="sprdshtBrdrdTblTr">
          <td>{breakfastWeight}</td>
          <td>{snack1Weight}</td>
          <td>{lunchWeight}</td>
          <td>{snack2Weight}</td>
          <td>{dinnerWeight}</td>
          <td>{dessertWeight}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MealWeightingTbl;
