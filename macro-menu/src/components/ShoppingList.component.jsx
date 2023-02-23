import React from "react";
import CustomHeading from "./CustomHeading.component";
import ShoppingListItem from "./ShoppingListItem.component";
import TableCell from "./TableCell.component";
const ShoppingList = (props) => {
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
  const { onCreatePantryItem, onSavePantryItemChangeFn } = specificMethods;
  const typeOfRecordToChange = "pantryItem";
  const thisDayOfWeekCode = null;
  const thisMealTypeCode = null;
  const arrayIndex = null;

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
                let matchingPantryItems = pantryItems.filter(
                  (item) => item.thisRecord.ingredient._id === ingredient._id
                );
                let placeholderPantryItem = {
                  thisRecord: {
                    _id: `missing${getRndIntegerFn(10000000, 99999999)}`,
                    qtyHave: 0,
                    ingredient: ingredient,
                    GRFUser: currentGRFUser,
                    createdAt: "",
                    updatedAt: "",
                  },
                  recordChanged: { pantryItem: false },
                  editingForm: { pantryItem: false },
                  valErrors: {
                    pantryItem: {
                      _id: [],
                      qtyHave: [],
                      ingredient: [],
                      GRFUser: [],
                      createdAt: [],
                      updatedAt: [],
                    },
                  },
                  userType: { pantryItem: "author" },
                  justCreated: { pantryItem: false },
                  recordLoaded: true,
                  hasChildren: { pantryItem: false },
                  allowCopy: { pantryItem: false },
                };
                let matchingPantryItem =
                  matchingPantryItems.length > 0
                    ? matchingPantryItems[0]
                    : placeholderPantryItem;
                let ingredientQtyHave = matchingPantryItem.thisRecord.qtyHave;
                let ingredientName = ingredient.name;
                let matchingShoppingListItemIndex = shoppingListItems.findIndex(
                  (item) =>
                    item.pantryItem.thisRecord.ingredient.name ===
                    ingredientName
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
                } else if (qtyNeeded > 0) {
                  let thisShoppingListItem = {
                    qtyNeeded: qtyNeeded,
                    pantryItem: matchingPantryItem,
                    qtyToBuy: qtyToBuy,
                  };
                  shoppingListItems.push(thisShoppingListItem);
                }
              }
            }
          }
        }
      }
    }
    return shoppingListItems.map((item, index) => (
      <ShoppingListItem
        key={returnElementKey(
          index,
          "ShoppingListItem",
          null,
          typeOfRecordToChange,
          arrayIndex,
          thisMealTypeCode,
          thisDayOfWeekCode
        )}
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
          specificMethods: {
            onCreatePantryItem: onCreatePantryItem,
            onSavePantryItemChangeFn: onSavePantryItemChangeFn,
          },
        }}
      />
    ));
  }
  return (
    <table className="table table-bordered shopListTbl">
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
        <tr className="shopListThRow">
          {/* <TableCell
            tCellType="th"
            data={"Bought"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          /> */}
          <th className="shopListTHPerpendicular" scope="col">
            <span className="shopListTHSubSpan">Bought</span>
          </th>
          <th className="shopListTHPerpendicular" scope="col">
            <span className="shopListTHSubSpan">Qty Needed</span>
          </th>
          {/* <TableCell
            tCellType="th"
            data={"Qty Needed"}
            tCellClasses="perpendicularTextCell"
            scope="col"
            recordLoaded={true}
          /> */}
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