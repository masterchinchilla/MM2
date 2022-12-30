import React from "react";
import MealIngredientParentCard from "./MealIngredientParentCard.component";
const MealIngredientsList = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot } = commonData;
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
  } = commonMethods;
  const { mealStateObj, mealBackup } = specificData;
  const {} = specificMethods;
  const {
    userType,
    thisMealsIngrdnts,
    thisGenRcpsGenRcpIngrdnts,
    recordLoaded,
  } = mealStateObj;
  const userCanEditRecipe =
    userType.meal === "author" || userType.meal === "admin";
  const allowPopulateIngrdnts =
    thisMealsIngrdnts.length < thisGenRcpsGenRcpIngrdnts.length;
  const thisMealRecord = mealStateObj.thisRecord;
  const { mealType, day, genRecipe } = thisMealRecord;
  const { dayOfWeek, weekMealPlan } = day;
  const thisMealTypeCode = mealType.code;
  const thisDayOfWeekCode = dayOfWeek.code;
  function handleCreateMealIngrdntFn() {}
  function populateMealIngrdntsFn() {}
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
                  genRecipeIngredient: {
                    // _id: getRndIntegerFn(10000000, 99999999),
                    // createdAt: "",
                    // updatedAt: "",
                    // defaultQty: 0.0,
                    // genRecipe: genRecipe,
                    // ingredient: {
                    //   name: "",
                    //   _id: getRndIntegerFn(10000000, 99999999),
                    //   createdAt: "",
                    //   updatedAt: "",
                    //   calories: 0.0,
                    //   carbs: 0.0,
                    //   protein: 0.0,
                    //   fat: 0.0,
                    //   fiber: 0.0,
                    //   unitOfMeasure: {
                    //     name: "",
                    //     _id: getRndIntegerFn(10000000, 99999999),
                    //     createdAt: "",
                    //     updatedAt: "",
                    //     GRFUser: weekMealPlan.GRFUser,
                    //   },
                    //   weightType: {
                    //     name: "",
                    //     _id: getRndIntegerFn(10000000, 99999999),
                    //     createdAt: "",
                    //     updatedAt: "",
                    //     GRFUser: weekMealPlan.GRFUser,
                    //   },
                    //   photoURL: "",
                    //   GRFUser: weekMealPlan.GRFUser,
                    //   brand: {
                    //     name: "",
                    //     _id: getRndIntegerFn(10000000, 99999999),
                    //     createdAt: "",
                    //     updatedAt: "",
                    //     GRFUser: weekMealPlan.GRFUser,
                    //   },
                    // },
                  },
                  // qty: 0.0,
                },
                editingForm: {
                  mealIngredient: false,
                  genRecipeIngredient: false,
                  ingredient: false,
                },
                valErrors: {
                  mealIngredient: {
                    // _id: [],
                    // createdAt: [],
                    // updatedAt: [],
                    // meal: [],
                    // qty: [],
                    // genRecipeIngredient: [],
                  },
                  genRecipeIngredient: {
                    // _id: [],
                    // createdAt: [],
                    // updatedAt: [],
                    // defaultQty: [],
                    // ingredient: [],
                    // genRecipe: [],
                  },
                  ingredient: {
                    // _id: [],
                    // createdAt: [],
                    // updatedAt: [],
                    // name: [],
                    // calories: [],
                    // carbs: [],
                    // protein: [],
                    // fat: [],
                    // fiber: [],
                    // unitOfMeasure: [],
                    // weightType: [],
                    // photoURL: [],
                    // GRFUser: [],
                    // brand: [],
                  },
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
          if (thisGenRcpsGenRcpIngrdnts.length > 0) {
            return (
              <div className="form-group mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    populateMealIngrdntsFn();
                  }}
                >
                  Populate Ingredients
                </button>
              </div>
            );
          } else {
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
      {userCanEditRecipe && !allowPopulateIngrdnts ? (
        <div className="form-group mt-4 mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleCreateMealIngrdntFn()}
          >
            Add Ingredient to Your Recipe
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MealIngredientsList;
