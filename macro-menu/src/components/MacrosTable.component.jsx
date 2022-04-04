const MacrosTable = (props) => {
  const tableType = props.tableType;
  const macrosBudget = props.macrosBudget;
  const macrosCurrent = props.macrosCurrent;
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

export default MacrosTable;
