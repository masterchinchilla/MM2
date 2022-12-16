import React from "react";
import MealIngredientCard from "./MealIngredientCard.component";
const MealIngredients = (props) => {
  const {
    currentGRFUser,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    onUpdatePropFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    getRndIntegerFn,
    backEndHtmlRoot,
    validatePropFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        recordChanged: { genRecipe: false },
        thisRecord: {
          _id: null,
          day: { dayOfWeek: null },
          genRecipe: {
            _id: null,
            name: null,
            availableMealType: null,
            GRFUser: null,
            defaultPrepInstructions: "",
            photoURL: null,
            createdAt: null,
            updatedAt: null,
          },
          mealType: null,
        },
        userType: { meal: "", genRecipe: "" },
        editingForm: { meal: false },
        thisMealsIngrdnts: [{ thisRecord: { _id: null } }],
        recordsJustCreated: { meal: false },
        userChangedThisMealsRecipe: false,
        thisRecipesIngrdnts: [],
        valErrors: { meal: { name: [] } },
        recordLoaded: false,
      };
  const {
    recordChanged,
    userType,
    editingForm,
    thisMealsIngrdnts,
    recordsJustCreated,
    userChangedThisMealsRecipe,
    thisRecipesIngrdnts,
    valErrors,
    recordLoaded,
    thisRecord,
  } = thisStateObj;
  const { _id, day, mealType, genRecipe } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const thisDayOfWeekCode = day.dayOfWeek ? day.dayOfWeek.code : null;
  const thisMealTypeCode = mealType ? mealType.code : null;
  const defaultIngredient = {
    _id: "627b329721ff100fa01edcaf",
    name: "",
    calories: 0.0,
    carbs: 0.0,
    protein: 0.0,
    fat: 0.0,
    fiber: 0.0,
    unitOfMeasure: {
      _id: "627691779fa56aa1fe318390",
      name: "",
      GRFUser: { _id: "62577a533813f4f21c27e1c7" },
    },
    photoURL: "",
    GRFUser: { _id: "62577a533813f4f21c27e1c7" },
  };
  const userCanEditRecipe =
    userType.genRecipe === "author" || userType.genRecipe === "admin"
      ? true
      : false;
  const allowPopulateIngrdnts =
    thisMealsIngrdnts.length < 1 && thisRecipesIngrdnts > 0 ? true : false;
  function renderMealIngrdnts() {
    if (thisMealsIngrdnts.length > 0) {
      return thisMealsIngrdnts.map((mealIngredient, index) => {
        let thisMealIngrdntRecord = mealIngredient.thisRecord;
        let thisMealIngrdntId = thisMealIngrdntRecord._id
          ? thisMealIngrdntRecord._id
          : getRndIntegerFn(10000000, 99999999);
        mealIngredient.arrayIndex = index;
        const thisStateObjBackup = props.thisStateObjBackup
          ? props.thisStateObjBackup[index]
          : {
              thisMealIngrdnt: {
                genRecipeIngredient: {
                  ingredient: {
                    name: "",
                  },
                },
              },
            };
        return (
          <MealIngredientCard
            key={`mealIngrdntCardFor${thisMealIngrdntId}`}
            currentGRFUser={currentGRFUser}
            thisStateObj={mealIngredient}
            arrayIndex={index}
            backEndHtmlRoot={backEndHtmlRoot}
            allUnitOfMeasures={allUnitOfMeasures}
            allWeightTypes={allWeightTypes}
            allBrands={allBrands}
            thisStateObjBackup={thisStateObjBackup}
            defaultIngredient={defaultIngredient}
            validatePropFn={validatePropFn}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            onUpdatePropFn={onUpdatePropFn}
            onCreateNewRecordFn={onCreateNewRecordFn}
            getRndIntegerFn={getRndIntegerFn}
            trimEnteredValueFn={trimEnteredValueFn}
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
        if (thisRecipesIngrdnts.length > 0) {
          return (
            <div className="form-group mt-4 mb-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  populateMealIngrdntsFn(thisDayOfWeekCode, thisMealTypeCode);
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
  }
  return (
    <React.Fragment>
      <div className="mlIngrdntsCntnr">{renderMealIngrdnts()}</div>
      {userCanEditRecipe === true && allowPopulateIngrdnts === false ? (
        <div className="form-group mt-4 mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              onCreateNewRecordFn(
                "mealIngredient",
                "genRecipeIngredient",
                "Recipe Ingredient",
                thisDayOfWeekCode,
                thisMealTypeCode,
                0,
                {
                  _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
                  defaultQty: 1,
                  ingredient: defaultIngredient,
                  genRecipe: genRecipe,
                }
              );
            }}
          >
            Add Ingredient to Your Recipe
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default MealIngredients;
