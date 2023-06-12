import React from "react";
import _ from "lodash";
import MealIngredientParentCard from "./MealIngredientParentCard.component";
import MealIngrdntTblRow from "./MealIngrdntTblRow.component";
const MealIngredientsList = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const {
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    mode,
  } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
    onCreateNewRecordFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { mealStateObj, mealBackup } = specificData;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
  const {
    userType,
    thisMealsIngrdnts,
    thisGenRcpsGenRcpIngrdnts,
    recordLoaded,
    editingForm,
    userChangedThisMealRecipe,
  } = mealStateObj;
  const userCanEditRecipe =
    userType.genRecipe === "author" || userType.genRecipe === "admin";
  const allowPopulateIngrdnts =
    thisMealsIngrdnts.length < thisGenRcpsGenRcpIngrdnts.length;
  const thisMealRecord = mealStateObj.thisRecord;
  const { mealType, day, genRecipe } = thisMealRecord;
  const { dayOfWeek, weekMealPlan } = day;
  const thisMealTypeCode = mealType.code;
  const thisDayOfWeekCode = dayOfWeek.code;
  function renderMealIngrdntsFn() {
    if (recordLoaded) {
      if (thisMealsIngrdnts.length > 0) {
        return thisMealsIngrdnts.map((mealIngredient, index) => {
          let thisStateObj = mealIngredient.recordLoaded
            ? mealIngredient
            : {
                recordLoaded: false,
                thisRecord: {
                  _id: getRndIntegerFn(10000000, 99999999),
                  createdAt: "",
                  updatedAt: "",
                  meal: thisMealRecord,
                  genRecipeIngredient: {},
                },
                editingForm: {
                  mealIngredient: false,
                  genRecipeIngredient: false,
                  ingredient: false,
                },
                valErrors: {
                  mealIngredient: {},
                  genRecipeIngredient: {},
                  ingredient: {},
                },
                recordChanged: {
                  mealIngredient: false,
                  genRecipeIngredient: false,
                  ingredient: false,
                },
                justCreated: {
                  mealIngredient: false,
                  genRecipeIngredient: false,
                  ingredient: false,
                },
                userType: {
                  mealIngredient: "viewer",
                  genRecipeIngredient: "viewer",
                  ingredient: "viewer",
                },
                hasChildren: {
                  mealIngredient: true,
                  genRecipeIngredient: true,
                  ingredient: true,
                },
              };
          let thisStateObjBackup;
          let pattern = /new/;
          let testResult = pattern.test(thisStateObj.thisRecord._id);
          if (testResult) {
            thisStateObjBackup = _.cloneDeep(thisStateObj);
          } else {
            thisStateObjBackup = mealBackup
              ? mealBackup.thisMealsIngrdnts[index]
              : { thisRecord: { meal: { genRecipe: { _id: "" } } } };
          }
          thisStateObj.arrayIndex = index;
          if (mode === `builder`) {
            return (
              <MealIngredientParentCard
                key={`MealIngredientParentCard for meal ${thisStateObj.thisRecord._id}`}
                commonProps={{
                  commonData: {
                    backEndHtmlRoot: backEndHtmlRoot,
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    arrayIndex: index,
                    allUnitOfMeasures: allUnitOfMeasures,
                    allWeightTypes: allWeightTypes,
                    allBrands: allBrands,
                    mode: mode,
                  },
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    onSaveChangesFn: onSaveChangesFn,
                    onStartEditingFn: onStartEditingFn,
                    onCancelEditFn: onCancelEditFn,
                    onDeleteObjFn: onDeleteObjFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                    onCreateNewRecordFn: onCreateNewRecordFn,
                    onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    thisStateObj: thisStateObj,
                    thisStateObjBackup: thisStateObjBackup,
                    thisGenRecipe: genRecipe,
                    thisGRFUser: weekMealPlan.GRFUser,
                    userChangedThisMealRecipe: userChangedThisMealRecipe,
                  },
                  specificMethods: {},
                }}
              />
            );
          } else {
            return (
              <MealIngrdntTblRow
                key={`MealIngrdntTbl for meal ${thisStateObj.thisRecord._id}`}
                commonProps={{
                  commonData: {
                    backEndHtmlRoot: backEndHtmlRoot,
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    arrayIndex: index,
                    allUnitOfMeasures: allUnitOfMeasures,
                    allWeightTypes: allWeightTypes,
                    allBrands: allBrands,
                    mode: mode,
                  },
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    onSaveChangesFn: onSaveChangesFn,
                    onStartEditingFn: onStartEditingFn,
                    onCancelEditFn: onCancelEditFn,
                    onDeleteObjFn: onDeleteObjFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                    onCreateNewRecordFn: onCreateNewRecordFn,
                    onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    thisStateObj: thisStateObj,
                    thisStateObjBackup: thisStateObjBackup,
                    thisGenRecipe: genRecipe,
                    thisGRFUser: weekMealPlan.GRFUser,
                    userChangedThisMealRecipe: userChangedThisMealRecipe,
                  },
                  specificMethods: {},
                }}
              />
            );
          }
        });
      } else {
        if (userType.meal === "viewer") {
          return (
            <div className="alert alert-secondary" role="alert">
              This meal does not have any ingredients...
            </div>
          );
        } else {
          if (thisGenRcpsGenRcpIngrdnts.length < 1) {
            return (
              <div className="alert alert-secondary" role="alert">
                This Recipe does not have any ingredients...
              </div>
            );
          }
        }
      }
    } else {
      return (
        <div className="placeholder-glow emptyPlaceholder">
          <span className="placeholder"></span>
        </div>
      );
    }
  }
  return (
    <React.Fragment>
      {mode === "builder" ? (
        <table className="mlIngrdntsCntnr">{renderMealIngrdntsFn()}</table>
      ) : (
        <table>
          <thead>
            <tr className={`sprdshtBrdrdTblTr`}>
              <th>Qty</th>
              <th>Dflt Qty</th>
              <th>UOM</th>
              <th>Brnd</th>
              <th>Wght Type</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{renderMealIngrdntsFn()}</tbody>
        </table>
      )}
      {allowPopulateIngrdnts ? (
        <div className="form-group mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              userType.meal === "viewer" || editingForm.meal ? true : false
            }
            onClick={() => {
              populateMissingMealIngrdnts(
                mealStateObj,
                thisDayOfWeekCode,
                thisMealTypeCode
              );
            }}
          >
            Populate Ingredients
          </button>
        </div>
      ) : null}
      {userCanEditRecipe && !allowPopulateIngrdnts ? (
        <div className="form-group mt-4 mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() =>
              onAddIngrdntToRecipeFn(thisDayOfWeekCode, thisMealTypeCode)
            }
            disabled={
              userType.meal === "viewer" || editingForm.meal ? true : false
            }
          >
            Add Ingredient to Your Recipe
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MealIngredientsList;
