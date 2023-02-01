import React from "react";
import CustomHeading from "./CustomHeading.component";
import ShoppingListItem from "./ShoppingListItem.component";
import TableCell from "./TableCell.component";
const ShoppingList = (props) => {
  console.log(props);
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { currentGRFUser, daysOfWeek, mealTypes } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { pantryItems, recordLoaded } = specificData;
  function renderShoppingList() {
    let pattern = /missing/;
    let shoppingListItems = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
      let thisDayStateObj = specificData[daysOfWeek[i].code];
      let thisDayRecordId = thisDayStateObj.thisRecord._id;
      if (!pattern.test(thisDayRecordId)) {
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
              let recordLoaded = thisMealIngrdntStateObj.recordLoaded;
              if (recordLoaded) {
                let thisMealIngrdntRecord = thisMealIngrdntStateObj.thisRecord;
                let ingrdntQtyNeededForThisMealIngrdnt =
                  thisMealIngrdntRecord.qty;
                let ingredient =
                  thisMealIngrdntRecord.genRecipeIngredient.ingredient;
                console.log(ingredient);
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
                    ingredient: ingredient,
                    _id: getRndIntegerFn(10000000, 99999999),
                    createdAt: "",
                    updatedAt: "",
                    GRFUser: currentGRFUser,
                    pantryItem: matchingPantryItem ? matchingPantryItem : null,
                    recordLoaded: recordLoaded,
                  };
                  shoppingListItems.push(thisShoppingListItem);
                }
              }
            }
          }
        }
      }
    }
    return shoppingListItems.map((item) => (
      <ShoppingListItem
        commonProps={{
          commonData: {},
          commonMethods: {
            getRndIntegerFn: getRndIntegerFn,
            returnElementKey: returnElementKey,
            onUpdatePropFn: onUpdatePropFn,
            trimEnteredValueFn: trimEnteredValueFn,
          },
        }}
        specificProps={{
          specificData: { shoppingListItem: item },
          specificMethods: {},
        }}
      />
    ));
  }
  return (
    <table className="table table-bordered">
      <thead className="thead">
        <tr>
          <th colSpan={6} scope="col">
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
            data={"UOM"}
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
      <tbody>{recordLoaded ? renderShoppingList() : ""}</tbody>
    </table>
  );
};

export default ShoppingList;
