import _ from "lodash";
import React from "react";
import NewCreateMealButton from "./NewCreateMealButton.component";
import NewMealParentCard from "./NewMealParentCard.component";
import DayMealsAndMacrosCard from "./DayMealsAndMacrosCard.component";
import DayMealsAndMacrosTbl from "./DayMealsAndMacrosTbl.component";
import MealParent from "./MealParent.component";
const NewDayMealsAndMacros = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    // mealTypes,
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    allGenRecipes,
    mode,
  } = commonData;
  const {
    getRndIntegerFn,
    onCreateNewRecordFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    returnElementKey,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj, thisStateObjBackup } = specificData;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
  const {
    thisRecord,
    // recordLoaded,
    breakfast,
    snack1,
    lunch,
    snack2,
    dinner,
    dessert,
    userType,
  } = thisStateObj;
  const breakfastIngrdnts = breakfast.thisMealsIngrdnts;
  const snack1Ingrdnts = snack1.thisMealsIngrdnts;
  const lunchIngrdnts = lunch.thisMealsIngrdnts;
  const snack2Ingrdnts = snack2.thisMealsIngrdnts;
  const dinnerIngrdnts = dinner.thisMealsIngrdnts;
  const dessertIngrdnts = dessert.thisMealsIngrdnts;
  const thisDaysMealsIngrdnts = [
    breakfastIngrdnts ? breakfastIngrdnts : [],
    snack1Ingrdnts ? snack1Ingrdnts : [],
    lunchIngrdnts ? lunchIngrdnts : [],
    snack2Ingrdnts ? snack2Ingrdnts : [],
    dinnerIngrdnts ? dinnerIngrdnts : [],
    dessertIngrdnts ? dessertIngrdnts : [],
  ];
  const { weekMealPlan, _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  // const typeOfRecordToChange = "day";
  // const childTypeOfRecordToChange = "meal";
  function renderMeal(thisMealType) {
    let thisDaysMealStateObj = thisStateObj[thisMealType.code];
    let thisDaysMealStateObjBackup = thisStateObjBackup[thisMealType.code]
      ? thisStateObjBackup[thisMealType.code]
      : _.cloneDeep(thisDaysMealStateObj);
    let thisMealStateObj;
    if (thisDaysMealStateObj.recordLoaded) {
      thisMealStateObj = thisDaysMealStateObj;
    } else {
      thisMealStateObj = {
        recordLoaded: false,
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          createdAt: "",
          updatedAt: "",
          day: thisRecord,
          genRecipe: {
            _id: getRndIntegerFn(10000000, 99999999),
            name: "",
            availableMealType: thisMealType,
            GRFUser: weekMealPlan.GRFUser,
            defaultPrepInstructions: "",
            photoURL: "",
            createdAt: "",
            updatedAt: "",
          },
          mealType: thisMealType,
        },
        editingForm: { meal: false, genRecipe: false },
        valErrors: {
          meal: { _id: [], createdAt: [], updatedAt: [], genRecipe: [] },
          genRecipe: {
            _id: [],
            createdAt: [],
            updatedAt: [],
            name: [],
            defaultPrepInstructions: [],
            photoURL: [],
          },
        },
        recordChanged: { meal: false, genRecipe: false },
        justCreated: { meal: false, genRecipe: false },
        userType: { meal: "viewer", genRecipe: "viewer" },
        hasChildren: { meal: true, genRecipe: true },
        userChangedThisMealsRecipe: false,
        thisMealsIngrdnts: [],
        thisGenRcpsGenRcpIngrdnts: [],
      };
    }
    let thisMealRecord = thisMealStateObj.thisRecord;
    let mealRecordId = thisMealRecord._id;
    let mealUserType = userType.day;
    let pattern = /missing/;
    let testResult = pattern.test(mealRecordId);
    if (testResult) {
      if (mealUserType === "admin" || mealUserType === "author") {
        return (
          <NewCreateMealButton
            key={`NewCreateMealButton for meal ${mealRecordId}`}
            commonProps={{
              commonData: {},
              commonMethods: {
                onCreateNewRecordFn: onCreateNewRecordFn,
              },
            }}
            specificProps={{
              specificData: { thisStateObj: thisMealStateObj },
              specificMethods: {},
            }}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {thisMealType.name}</span> Meal Plan added to this day...
            </em>
          </div>
        );
      }
    } else {
      return (
        // <NewMealParentCard
        //   key={`NewMealParentCard for meal ${mealRecordId}`}
        //   commonProps={{
        //     commonData: {
        //       backEndHtmlRoot: backEndHtmlRoot,
        //       allUnitOfMeasures: allUnitOfMeasures,
        //       allWeightTypes: allWeightTypes,
        //       allBrands: allBrands,
        //       allThisMealTypesRecipes: allGenRecipes.filter(
        //         (recipe) => recipe.availableMealType.code === thisMealType.code
        //       ),
        //     },
        //     commonMethods: {
        //       getRndIntegerFn: getRndIntegerFn,
        //       onUpdatePropFn: onUpdatePropFn,
        //       onSaveChangesFn: onSaveChangesFn,
        //       onStartEditingFn: onStartEditingFn,
        //       onCancelEditFn: onCancelEditFn,
        //       onDeleteObjFn: onDeleteObjFn,
        //       onCreateNewRecordFn: onCreateNewRecordFn,
        //       returnElementKey: returnElementKey,
        //       trimEnteredValueFn: trimEnteredValueFn,
        //       onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
        //     },
        //   }}
        //   specificProps={{
        //     specificData: {
        //       thisStateObj: thisMealStateObj,
        //       nestedMealIngrdntArray: thisDaysMealsIngrdnts,
        //       thisStateObjBackup: thisDaysMealStateObjBackup,
        //     },
        //     specificMethods: {
        //       populateMissingMealIngrdnts: populateMissingMealIngrdnts,
        //       onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
        //     },
        //   }}
        // />
        <MealParent
          key={`MealParent for meal ${mealRecordId}`}
          commonProps={{
            commonData: {
              backEndHtmlRoot: backEndHtmlRoot,
              allUnitOfMeasures: allUnitOfMeasures,
              allWeightTypes: allWeightTypes,
              allBrands: allBrands,
              allThisMealTypesRecipes: allGenRecipes.filter(
                (recipe) => recipe.availableMealType.code === thisMealType.code
              ),
              mode: mode,
            },
            commonMethods: {
              getRndIntegerFn: getRndIntegerFn,
              onUpdatePropFn: onUpdatePropFn,
              onSaveChangesFn: onSaveChangesFn,
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onDeleteObjFn: onDeleteObjFn,
              onCreateNewRecordFn: onCreateNewRecordFn,
              returnElementKey: returnElementKey,
              trimEnteredValueFn: trimEnteredValueFn,
              onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisMealStateObj,
              nestedMealIngrdntArray: thisDaysMealsIngrdnts,
              thisStateObjBackup: thisDaysMealStateObjBackup,
            },
            specificMethods: {
              populateMissingMealIngrdnts: populateMissingMealIngrdnts,
              onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
            },
          }}
        />
      );
    }
  }
  if (mode !== `spreadsheet`) {
    return (
      <DayMealsAndMacrosCard
        key={`DayMealsAndMacrosCard for Day ${thisRecordId}`}
        commonProps={commonProps}
        specificProps={{
          specificData: specificData,
          specificMethods: {
            renderMeal: renderMeal,
            ...specificMethods,
          },
        }}
      />
    );
  } else {
    return (
      <DayMealsAndMacrosTbl
        key={`DayMealsAndMacrosTbl for Day ${thisRecordId}`}
        commonProps={commonProps}
        specificProps={{
          specificData: specificData,
          specificMethods: {
            renderMeal: renderMeal,
            ...specificMethods,
          },
        }}
      />
    );
  }
};

export default NewDayMealsAndMacros;
