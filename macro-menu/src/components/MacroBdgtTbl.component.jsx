import React from "react";
const MacroBdgtTbl = ({ thisRecord }) => {
  const {
    _id,
    calsBudget,
    carbsBudget,
    proteinBudget,
    fatBudget,
    fiberBudget,
  } = thisRecord;
  return (
    <table className="spreadsheetTbl">
      <thead>
        <tr className="sprdshtBrdrdTblTr">
          <th colSpan={5}>
            <h2>Daily Macros Budget</h2>
          </th>
        </tr>
        <tr className="sprdshtBrdrdTblTr">
          <th>Cals</th>
          <th>Carbs</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Fiber</th>
        </tr>
      </thead>
      <tbody>
        <tr className="sprdshtBrdrdTblTr">
          <td>{calsBudget}</td>
          <td>{carbsBudget}</td>
          <td>{proteinBudget}</td>
          <td>{fatBudget}</td>
          <td>{fiberBudget}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MacroBdgtTbl;
