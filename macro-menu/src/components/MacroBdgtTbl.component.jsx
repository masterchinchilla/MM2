import React from "react";
const MacroBdgtTbl = (props) => {
  return (
    <table className="spreadsheetTbl">
      <thead>
        <tr>
          <th colSpan={5}>
            <h2>Daily Macros Budget</h2>
          </th>
        </tr>
        <tr>
          <th>Cals</th>
          <th>Carbs</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Fiber</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cals</td>
          <td>Carbs</td>
          <td>Protein</td>
          <td>Fat</td>
          <td>Fiber</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MacroBdgtTbl;
