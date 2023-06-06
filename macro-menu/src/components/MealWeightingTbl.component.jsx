import React from "react";
const MealWeightingTbl = (props) => {
  return (
    <table className="spreadsheetTbl">
      <thead>
        <tr>
          <th colSpan={6}>
            <h2>Meal Weighting</h2>
          </th>
        </tr>
        <tr>
          <th>Breakfast</th>
          <th>Snack 1</th>
          <th>Lunch</th>
          <th>Snack 2</th>
          <th>Dinner</th>
          <th>Dessert</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Breakfast</td>
          <td>Snack 1</td>
          <td>Lunch</td>
          <td>Snack 2</td>
          <td>Dinner</td>
          <td>Dessert</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MealWeightingTbl;
