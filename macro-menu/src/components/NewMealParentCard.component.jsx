import React from "react";
// import StickyBox from "react-sticky-box";
import CustomHeading from "./CustomHeading.component";
// import NewMacrosTable from "./NewMacrosTable.component";
import MealIngredientsList from "./MealIngredientsList.component";
import NewMealChildCard from "./NewMealChildCard.component";
import NewRecipeCard from "./NewRecipeCard.component";
import MacrosTblInStickyBox from "./MacrosTblInStickyBox.component";
const NewMealParentCard = (props) => {
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
  } = thisStateObj;
  const { _id, day, mealType } = thisRecord;
  const { dayOfWeek, weekMealPlan } = day;
  const thisRecordId = _id;
  const typeOfRecordToChange = "meal";
  return (
    <div
      className="accordion accordionNotFlush mealDetailTopAccrdn"
      id={"mealOuterAccordionFull" + thisRecordId}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + thisRecordId}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + thisRecordId}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
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
          </button>
        </h2>
      </div>
      <div
        id={"mealOuterAccrdn" + thisRecordId}
        className="accordion-collapse collapse show"
        aria-labelledby={"#mealOuterAccordionHeader" + thisRecordId}
        data-bs-parent={"#mealOuterAccordionFull" + thisRecordId}
      >
        {/* <StickyBox
          key={`StickyBox for NewMacrosTable for meal ${thisRecordId}`}
          offsetTop={172}
          offsetBottom={20}
          className={"mealMacTable"}
        >
          <NewMacrosTable
            key={`NewMacrosTable for meal ${thisRecordId}`}
            thisWMPRecord={weekMealPlan}
            tableType={"Meal Macros"}
            thisMealType={mealType}
            theseIngrdnts={nestedMealIngrdntArray}
            recordLoaded={recordLoaded}
            getRndIntegerFn={getRndIntegerFn}
          />
        </StickyBox> */}
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
        <div className="accordion-body wkDaysAccrdnBdy">
          <NewMealChildCard
            key={`NewMealChildCard for meal ${thisRecordId}`}
            commonProps={{
              commonData: {
                backEndHtmlRoot: backEndHtmlRoot,
                allThisMealTypesRecipes: allThisMealTypesRecipes,
              },
              commonMethods: {
                getRndIntegerFn: getRndIntegerFn,
                returnElementKey: returnElementKey,
                onUpdatePropFn: onUpdatePropFn,
                onSaveChangesFn: onSaveChangesFn,
                onStartEditingFn: onStartEditingFn,
                onCancelEditFn: onCancelEditFn,
                onDeleteObjFn: onDeleteObjFn,
                onCreateNewRecordFn: onCreateNewRecordFn,
                trimEnteredValueFn: trimEnteredValueFn,
              },
            }}
            specificProps={{
              specificData: {
                thisStateObj: thisStateObj,
              },
              specificMethods: {},
            }}
          />
          <NewRecipeCard
            key={`NewRecipeCard for meal ${thisRecordId}`}
            commonProps={{
              commonData: { backEndHtmlRoot: backEndHtmlRoot },
              commonMethods: {
                getRndIntegerFn: getRndIntegerFn,
                returnElementKey: returnElementKey,
                onUpdatePropFn: onUpdatePropFn,
                onSaveChangesFn: onSaveChangesFn,
                onStartEditingFn: onStartEditingFn,
                onCancelEditFn: onCancelEditFn,
                trimEnteredValueFn: trimEnteredValueFn,
                onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
              },
            }}
            specificProps={{
              specificData: {
                thisStateObj: thisStateObj,
                thisStateObjBackup: thisStateObjBackup,
              },
              specificMethods: {},
            }}
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
        </div>
      </div>
    </div>
  );
};

export default NewMealParentCard;
