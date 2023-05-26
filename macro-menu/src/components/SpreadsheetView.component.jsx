import React from "react";
const SpreadsheetView = (props) => {
  return (
    <>
      <div>
        <h1>Week Meal Plan</h1>
        <table className="spreadsheetTbl">
          <thead>
            <tr>
              <th colSpan={6}>
                <div className="twoSidedTH">
                  <h2>Meal Weighting</h2>
                  <span>WMP Form Control Link to Builder</span>
                </div>
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
        <table className="spreadsheetTbl">
          <thead>
            <tr>
              <th colSpan={5}>
                <div className="twoSidedTH">
                  <h2>Daily Macros Budget</h2>
                  <span>WMP Form Control</span>
                </div>
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
      </div>
      <div>
        <h1>Day Meal Plans</h1>
        <table className="spreadsheetTbl">
          <thead>
            <tr>
              <th colSpan={6}>
                <div className="twoSidedTH">
                  <h2>Sunday</h2>
                  <span>Day Form Control</span>
                </div>
              </th>
            </tr>
            <tr>
              <th></th>
              <th>Cals</th>
              <th>Carbs</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Fiber</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Bdgt &gt;</th>
              <td>Cals</td>
              <td>Carbs</td>
              <td>Protein</td>
              <td>Fat</td>
              <td>Fiber</td>
            </tr>
            <tr>
              <th>Crrnt &gt;</th>
              <td>Cals</td>
              <td>Carbs</td>
              <td>Protein</td>
              <td>Fat</td>
              <td>Fiber</td>
            </tr>
            <tr>
              <th>Left &gt;</th>
              <td>Cals</td>
              <td>Carbs</td>
              <td>Protein</td>
              <td>Fat</td>
              <td>Fiber</td>
            </tr>
            <tr>
              <td colSpan={8}>
                <table className="spreadsheetTbl">
                  <thead>
                    <tr>
                      <th colSpan={6}>
                        <div className="twoSidedTH">
                          <h3>Breakfast</h3>
                          <span>Meal Form Control</span>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={6}>Recipe Drop-Down Selector</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th>Cals</th>
                      <th>Carbs</th>
                      <th>Protein</th>
                      <th>Fat</th>
                      <th>Fiber</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Bdgt &gt;</th>
                      <td>Cals</td>
                      <td>Carbs</td>
                      <td>Protein</td>
                      <td>Fat</td>
                      <td>Fiber</td>
                    </tr>
                    <tr>
                      <th>Crrnt &gt;</th>
                      <td>Cals</td>
                      <td>Carbs</td>
                      <td>Protein</td>
                      <td>Fat</td>
                      <td>Fiber</td>
                    </tr>
                    <tr>
                      <th>Left &gt;</th>
                      <td>Cals</td>
                      <td>Carbs</td>
                      <td>Protein</td>
                      <td>Fat</td>
                      <td>Fiber</td>
                    </tr>
                    <tr>
                      <td colSpan={6}>
                        <table className="spreadsheetTbl">
                          <tbody>
                            <tr>
                              <td>
                                <table className="spreadsheetTbl">
                                  <thead>
                                    <tr>
                                      <th colSpan={4}>
                                        <div className="twoSidedTH">
                                          <h4>Ingredient</h4>
                                          <span>
                                            Ingredient Form Control Link to
                                            Builder
                                          </span>
                                        </div>
                                      </th>
                                    </tr>
                                    <tr>
                                      <th>UOM</th>
                                      <th>Brand</th>
                                      <th>Wght Type</th>
                                      <th>Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>UOM</td>
                                      <td>Brand</td>
                                      <td>Wght Type</td>
                                      <td>Name</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <table className="spreadsheetTbl">
                                  <thead>
                                    <tr>
                                      <th>
                                        <div className="twoSidedTH">
                                          <h4>Recipe Ingredient</h4>
                                          <span>
                                            Recipe Ingredient Form Control Link
                                            to Builder
                                          </span>
                                        </div>
                                      </th>
                                    </tr>
                                    <tr>
                                      <th>Dflt Qty</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Dflt Qty</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>
                                        <div className="twoSidedTH">
                                          <h4>Meal Ingredient</h4>
                                          <span>
                                            Meal Ingredient Form Control
                                          </span>
                                        </div>
                                      </th>
                                    </tr>
                                    <tr>
                                      <th>Qty</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Qty</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SpreadsheetView;
