import React from "react";
import MealIngredientParentCard from "./MealIngredientParentCard.component";
const MealIngredientsList = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot, allUnitOfMeasures, allWeightTypes, allBrands } =
    commonData;
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
    onCreateNewUOMWtTypOrBrnd,
  } = commonMethods;
  const { mealStateObj, mealBackup } = specificData;
  const { populateMissingMealIngrdnts } = specificMethods;
  const {
    userType,
    thisMealsIngrdnts,
    thisGenRcpsGenRcpIngrdnts,
    recordLoaded,
    editingForm,
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
  function handleCreateMealIngrdntFn() {}
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
          thisStateObj.arrayIndex = index;
          const thisStateObjBackup = mealBackup
            ? mealBackup.thisMealsIngrdnts[index]
            : {};
          return (
            <MealIngredientParentCard
              key={returnElementKey(
                null,
                null,
                null,
                "mealIngredient",
                index,
                thisMealTypeCode,
                thisDayOfWeekCode
              )}
              commonProps={{
                commonData: {
                  backEndHtmlRoot: backEndHtmlRoot,
                  thisDayOfWeekCode: thisDayOfWeekCode,
                  thisMealTypeCode: thisMealTypeCode,
                  arrayIndex: index,
                  allUnitOfMeasures: allUnitOfMeasures,
                  allWeightTypes: allWeightTypes,
                  allBrands: allBrands,
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
                  onCreateNewUOMWtTypOrBrnd: onCreateNewUOMWtTypOrBrnd,
                },
              }}
              specificProps={{
                specificData: {
                  thisStateObj: thisStateObj,
                  thisStateObjBackup: thisStateObjBackup,
                  thisGenRecipe: genRecipe,
                  thisGRFUser: weekMealPlan.GRFUser,
                },
                specificMethods: {},
              }}
            />
          );
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
      <div className="mlIngrdntsCntnr">{renderMealIngrdntsFn()}</div>
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
            onClick={() => handleCreateMealIngrdntFn()}
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
