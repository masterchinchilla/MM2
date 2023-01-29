import React from "react";
import StickyBox from "react-sticky-box";
import CustomHeading from "./CustomHeading.component";
import NewMacrosTable from "./NewMacrosTable.component";
import MealIngredientsList from "./MealIngredientsList.component";
import NewMealChildCard from "./NewMealChildCard.component";
import NewRecipeCard from "./NewRecipeCard.component";
const NewMealParentCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    allThisMealTypesRecipes,
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
              key={`customNameHeadingFor${typeOfRecordToChange}${thisRecordId}`}
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
        <StickyBox
          key={`macroTblStickyBoxFor${typeOfRecordToChange}${thisRecordId}`}
          offsetTop={142}
          offsetBottom={20}
          className={"mealMacTable"}
        >
          <NewMacrosTable
            key={`macrosTblFor${typeOfRecordToChange}${thisRecordId}`}
            thisWMPRecord={weekMealPlan}
            tableType={"Meal Macros"}
            thisMealType={mealType}
            theseIngrdnts={nestedMealIngrdntArray}
            recordLoaded={recordLoaded}
            getRndIntegerFn={getRndIntegerFn}
          />
        </StickyBox>
        <div className="accordion-body wkDaysAccrdnBdy">
          <NewMealChildCard
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
            commonProps={{
              commonData: {
                backEndHtmlRoot: backEndHtmlRoot,
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
