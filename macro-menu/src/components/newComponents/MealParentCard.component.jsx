import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import NewMacrosTable from "./NewMacrosTable.component";
import MealChildCard from "./MealChildCard.component";
import RecipeCard from "./RecipeCard.component";
import MealIngredients from "./MealIngredients.component";
import CustomHeading from "./CustomHeading.component";
const MealParentCard = (props) => {
  const {
    thisStateObjBackup,
    currentGRFUser,
    backEndHtmlRoot,
    onUpdatePropFn,
    validatePropFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: null,
          day: {
            weekMealPlan: null,
            dayOfWeek: null,
          },
          mealType: {},
        },
        thisMealsIngrdnts: [],
        thisRecipesIngrdnts: [],
        recordLoaded: false,
        editingForm: { meal: false },
      };
  const thisMealsIngrdntsBackup = thisStateObjBackup
    ? thisStateObjBackup.thisMealsIngrdnts
    : [];
  const { thisRecord, thisMealsIngrdnts, recordLoaded, editingForm } =
    thisStateObj;
  const nestedMealIngrdntArray = [thisMealsIngrdnts];
  const { _id, day, mealType } = thisRecord;
  const { weekMealPlan, dayOfWeek } = day;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
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
          <MealChildCard
            key={`mealChildCardFor${typeOfRecordToChange}${thisRecordId}`}
            thisStateObj={thisStateObj}
            currentGRFUser={currentGRFUser}
            backEndHtmlRoot={backEndHtmlRoot}
            validatePropFn={validatePropFn}
            onUpdatePropFn={onUpdatePropFn}
            getRndIntegerFn={getRndIntegerFn}
            onCreateNewRecordFn={onCreateNewRecordFn}
            trimEnteredValueFn={trimEnteredValueFn}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
          />
          <RecipeCard
            key={`recipeCardFor${typeOfRecordToChange}${thisRecordId}`}
            thisStateObj={thisStateObj}
            thisStateObjBackup={thisStateObjBackup}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            onUpdatePropFn={onUpdatePropFn}
            getRndIntegerFn={getRndIntegerFn}
            backEndHtmlRoot={backEndHtmlRoot}
            validatePropFn={validatePropFn}
            trimEnteredValueFn={trimEnteredValueFn}
          />
          <MealIngredients
            key={`mealIngrdntsFor${typeOfRecordToChange}${thisRecordId}`}
            currentGRFUser={currentGRFUser}
            thisStateObj={thisStateObj}
            thisStateObjBackup={thisMealsIngrdntsBackup}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            onUpdatePropFn={onUpdatePropFn}
            onCreateNewRecordFn={onCreateNewRecordFn}
            populateMealIngrdntsFn={populateMealIngrdntsFn}
            getRndIntegerFn={getRndIntegerFn}
            backEndHtmlRoot={backEndHtmlRoot}
            validatePropFn={validatePropFn}
            allUnitOfMeasures={allUnitOfMeasures}
            allWeightTypes={allWeightTypes}
            allBrands={allBrands}
            trimEnteredValueFn={trimEnteredValueFn}
          />
        </div>
      </div>
    </div>
  );
};

export default MealParentCard;
