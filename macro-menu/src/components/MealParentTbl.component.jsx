import React from "react";
import CustomHeading from "./CustomHeading.component";
import MealIngredientsList from "./MealIngredientsList.component";
import MacrosTblInStickyBox from "./MacrosTblInStickyBox.component";
import NewFormControl from "./NewFormControl.component";
import NewNewSelectSearchListWCreate from "./NewNewSelectSearchListWCreate.component";
const MealParentTbl = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    allThisMealTypesRecipes,
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
    onCreateNewRecordFn,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { populateMissingMealIngrdnts, onAddIngrdntToRecipeFn } =
    specificMethods;
  const { thisStateObj, thisStateObjBackup, nestedMealIngrdntArray } =
    specificData;
  const {
    thisRecord,
    recordLoaded,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
    userChangedThisMealRecipe,
  } = thisStateObj;
  const { _id, day, mealType, genRecipe } = thisRecord;
  const thisMealTypeCode = mealType.code;
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const { dayOfWeek, weekMealPlan } = day;
  const arrayIndex = null;
  const thisRecordId = _id;
  const fieldsDisabled = !editingForm.meal;
  const typeOfRecordToChange = "meal";
  function handleCreateNewRecordFn(typeOfRecordToCreate, newName) {
    onCreateNewRecordFn(
      typeOfRecordToCreate,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newName
    );
  }
  return (
    <>
      <table className="spreadsheetTbl">
        <tbody>
          <tr>
            <td>
              <div className="twoSidedTdDiv">
                <CustomHeading
                  key={`CustomHeading for dayOfWeek name and mealType name for meal ${thisRecordId}`}
                  headingLvl={5}
                  recordLoaded={recordLoaded}
                  headingText={
                    recordLoaded ? `${dayOfWeek.name} ${mealType.name}` : ""
                  }
                  hdngIsReqFormLbl={false}
                  editingForm={editingForm.meal}
                  headingClasses=""
                />
                <NewFormControl
                  key={`NewFormControl for meal ${thisRecordId}`}
                  commonProps={{
                    commonData: { mode: mode },
                    commonMethods: {
                      onStartEditingFn: onStartEditingFn,
                      onCancelEditFn: onCancelEditFn,
                      onSaveChangesFn: onSaveChangesFn,
                      onDeleteObjFn: onDeleteObjFn,
                      onCopyWMPFn: () => {},
                    },
                  }}
                  specificProps={{
                    specificData: {
                      typeOfRecordToChange: typeOfRecordToChange,
                      recordChanged: recordChanged.meal,
                      thisDayOfWeekCode: thisDayOfWeekCode,
                      thisMealTypeCode: thisMealTypeCode,
                      arrayIndex: arrayIndex,
                      userType: userType.meal,
                      editingForm: editingForm.meal,
                      saveDisabled: false,
                      hasChildren: hasChildren.meal,
                      saveWarning: null,
                      deleteWarning:
                        "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?",
                      deleteChildrenWarning:
                        "You must delete all this meals's ingredients before you can delete this meal",
                      recordLoaded: recordLoaded,
                      formControlLineage: `meal ${thisRecordId}`,
                    },
                    specificMethods: {},
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <NewNewSelectSearchListWCreate
                key={`NewNewSelectSearchListWCreate for genRecipe for meal ${thisRecordId}`}
                commonProps={{
                  commonData: {
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    arrayIndex: arrayIndex,
                  },
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                    onCreateNewRecordFn: handleCreateNewRecordFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    formGroupClasses: "slctSrchRcpsLstWCreate",
                    defaultOptions: allThisMealTypesRecipes,
                    valErrors: valErrors.meal.genRecipe,
                    propToUpdate: "genRecipe",
                    selectedRecord: genRecipe,
                    label: "Recipe",
                    excludeLabel: true,
                    fieldDisabled: fieldsDisabled,
                    isRequired: true,
                    inputClasses: "recipeSelect",
                    recordLoaded: recordLoaded,
                    typeOfRecordToChange: typeOfRecordToChange,
                  },
                  specificMethods: {},
                }}
              />
              {userChangedThisMealRecipe && !justCreated.meal ? (
                <div className="alert alert-warning recipeWarning" role="alert">
                  CAUTION: If you save a change to this Meal's Recipe, your meal
                  ingredient custom qtys will be reset.
                </div>
              ) : (
                ""
              )}
            </td>
          </tr>
          <tr>
            <td>
              <MacrosTblInStickyBox
                componentLineage={`MacrosTblInStickyBox for meal ${thisRecordId}`}
                tableType={"Meal Macros"}
                thisMealType={mealType}
                stickyBoxOffsetTop={172}
                stickyBoxOffsetBottom={20}
                stickyBoxClasses={"mealMacTable"}
                thisWMPRecord={weekMealPlan}
                theseIngrdnts={nestedMealIngrdntArray}
                recordLoaded={recordLoaded}
                getRndIntegerFn={getRndIntegerFn}
              />
              <MealIngredientsList
                key={`MealIngredientsList for meal ${thisRecordId}`}
                commonProps={{
                  commonData: {
                    backEndHtmlRoot: backEndHtmlRoot,
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
                    mealStateObj: thisStateObj,
                    mealBackup: thisStateObjBackup,
                  },
                  specificMethods: {
                    populateMissingMealIngrdnts: populateMissingMealIngrdnts,
                    onAddIngrdntToRecipeFn: onAddIngrdntToRecipeFn,
                  },
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MealParentTbl;
