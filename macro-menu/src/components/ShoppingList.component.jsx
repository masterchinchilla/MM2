import React from "react";
import CustomHeading from "./CustomHeading.component";
import NewInputCore from "./NewInputCore.component";
import TableCell from "./TableCell.component";
const ShoppingList = (props) => {
  const {
    currentGRFUser,
    daysOfWeek,
    mealTypes,
    getRndIntegerFn,
    pantryItems,
    onChangePantryItemFnQtyHaveFn,
  } = props;
  function renderShoppingList() {
    let pattern = /missing/;
    let shoppingListItems = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
      let thisDayStateObj = props[daysOfWeek[i].code];
      let thisDayRecordId = thisDayStateObj.thisRecord._id;
      if (thisDayStateObj.recordLoaded && !pattern.test(thisDayRecordId)) {
        for (let i = 0; i < mealTypes.length; i++) {
          let thisMealStateObj = thisDayStateObj[mealTypes[i].code];
          let thisMealRecordId = thisMealStateObj.thisRecord._id;
          if (
            thisMealStateObj.recordLoaded &&
            !pattern.test(thisMealRecordId)
          ) {
            let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            for (let i = 0; i < thisMealsIngrdnts.length; i++) {
              let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
              if (thisMealIngrdntStateObj.recordLoaded) {
                let thisMealIngrdntRecord = thisMealIngrdntStateObj.thisRecord;
                let ingrdntQtyNeededForThisMealIngrdnt =
                  thisMealIngrdntRecord.qty;

                let ingredient =
                  thisMealIngrdntRecord.genRecipeIngredient.ingredient;
                let matchingPantryItems = pantryItems.filter(
                  (item) => item.ingredient._id === ingredient._id
                );
                let matchingPantryItem =
                  matchingPantryItems.length > 0
                    ? matchingPantryItems[0]
                    : null;
                let ingredientQtyHave = matchingPantryItem
                  ? matchingPantryItem.qtyHave
                  : 0;
                let ingredientName = ingredient.name;
                let matchingShoppingListItemIndex = shoppingListItems.findIndex(
                  (item) => item.ingredientName === ingredientName
                );
                let extantShoppingListItem =
                  matchingShoppingListItemIndex >= 0
                    ? shoppingListItems[matchingShoppingListItemIndex]
                    : null;
                let extantQtyNeeded = extantShoppingListItem
                  ? extantShoppingListItem.qtyNeeded
                  : 0;
                let qtyNeeded =
                  extantQtyNeeded + ingrdntQtyNeededForThisMealIngrdnt;
                let qtyToBuy =
                  qtyNeeded >= ingredientQtyHave
                    ? qtyNeeded - ingredientQtyHave
                    : 0;
                if (extantShoppingListItem) {
                  extantShoppingListItem.qtyNeeded = qtyNeeded;
                  extantShoppingListItem.qtyToBuy = qtyToBuy;
                  shoppingListItems[matchingShoppingListItemIndex] =
                    extantShoppingListItem;
                } else {
                  let thisShoppingListItem = {
                    qtyNeeded: qtyNeeded,
                    qtyHave: ingredientQtyHave,
                    qtyToBuy: qtyToBuy,
                    ingredientName: ingredientName,
                    _id: getRndIntegerFn(10000000, 99999999),
                    createdAt: "",
                    updatedAt: "",
                    GRFUser: currentGRFUser,
                    pantryItem: matchingPantryItem ? matchingPantryItem : null,
                  };
                  shoppingListItems.push(thisShoppingListItem);
                }
              }
            }
          }
        }
      }
    }
    // console.log(shoppingListItems[0].ingredient._id);
    // console.log({
    //   qtyHave: 0,
    //   ingredient: shoppingListItems[0].ingredient._id,
    //   GRFUser: currentGRFUser._id,
    // });
    return shoppingListItems.map((item) => (
      <tr>
        <td>
          <input type={"checkBox"} value={0}></input>
        </td>
        <TableCell
          tCellType="td"
          data={item.qtyNeeded.toFixed(2)}
          tCellClasses=""
          scope=""
          recordLoaded={true}
        />
        {/* <TableCell
          tCellType="td"
          data={item.qtyHave.toFixed(2)}
          tCellClasses=""
          scope=""
          recordLoaded={true}
        /> */}
        <input
          className="form-control"
          type={"number"}
          value={item.qtyHave.toFixed(2)}
          disabled={!item.pantryItem}
          onChange={(e) => onChangePantryItemFnQtyHaveFn(item, e.target.value)}
        />
        <TableCell
          tCellType="td"
          data={item.qtyToBuy.toFixed(2)}
          tCellClasses=""
          scope=""
          recordLoaded={true}
        />
        <TableCell
          tCellType="td"
          data={item.ingredientName}
          tCellClasses=""
          scope=""
          recordLoaded={true}
        />
      </tr>
    ));
  }
  return (
    <table className="table table-bordered">
      <thead className="thead">
        <tr>
          <th colSpan={5} scope="col">
            <CustomHeading
              headingLvl={1}
              recordLoaded={true}
              headingText={"Shopping List"}
              hdngIsReqFormLbl={false}
              editingForm={null}
              headingClasses=""
            />
          </th>
        </tr>
        <tr>
          <TableCell
            tCellType="th"
            data={"Bought"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          />
          <TableCell
            tCellType="th"
            data={"Qty Needed"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          />
          <TableCell
            tCellType="th"
            data={"Qty Have"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          />
          <TableCell
            tCellType="th"
            data={"Qty to Buy"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          />
          <TableCell
            tCellType="th"
            data={"Ingredient"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          />
        </tr>
      </thead>
      <tbody>{renderShoppingList()}</tbody>
    </table>
  );
};

export default ShoppingList;
