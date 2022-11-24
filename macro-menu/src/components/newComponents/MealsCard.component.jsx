import React from "react";
import MealParentCard from "./MealParentCard.component";
import CreateMealButton from "./CreateMealButton.component";
import CustomHeading from "./CustomHeading.component";
const MealsCard = (props) => {
  const {
    currentGRFUser,
    backEndHtmlRoot,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          _id: "",
          dayOfWeek: { name: "Day" },
        },
        thisDaysMeals: null,
        recordLoaded: false,
      };
  const thisDaysMeals = thisStateObj.thisDaysMeals
    ? thisStateObj.thisDaysMeals
    : {};
  const thisDaysMealsBackup = props.thisStateObjBackup
    ? props.thisStateObjBackup.thisDaysMeals
    : {};
  const { thisRecord, recordLoaded } = thisStateObj;
  const { _id, dayOfWeek } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const parentTypeOfRecordToChange = "day";
  const childTypeOfRecordToChange = "meal";
  function renderMeal(mealTypeCode, mealTypeName) {
    const thisMealStateObj = thisDaysMeals[mealTypeCode]
      ? thisDaysMeals[mealTypeCode]
      : {
          thisRecord: { _id: getRndIntegerFn(10000000, 99999999) },
          userType: { meal: null },
        };
    const thisStateObjBackup = thisDaysMealsBackup
      ? thisDaysMealsBackup[mealTypeCode]
      : {};
    const mealRecordId = thisMealStateObj.thisRecord._id;
    const mealUserType = thisMealStateObj.userType
      ? thisMealStateObj.userType.meal
      : "viewer";
    const pattern = /missing/;
    let testResult = pattern.test(mealRecordId);
    if (testResult) {
      if (mealUserType === "admin" || mealUserType === "author") {
        return (
          <CreateMealButton
            key={`createMealBttnFor${childTypeOfRecordToChange}${mealRecordId}`}
            day={thisRecord}
            mealType={{ code: mealTypeCode, name: mealTypeName }}
            getRndIntegerFn={getRndIntegerFn}
            onCreateNewRecordFn={onCreateNewRecordFn}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {mealTypeName}</span> Meal Plan added to this day...
            </em>
          </div>
        );
      }
    }
    return (
      <MealParentCard
        key={`mealPrntCardFor${childTypeOfRecordToChange}${mealRecordId}`}
        thisStateObj={thisMealStateObj}
        thisStateObjBackup={thisStateObjBackup}
        currentGRFUser={currentGRFUser}
        backEndHtmlRoot={backEndHtmlRoot}
        validatePropFn={validatePropFn}
        onUpdatePropFn={onUpdatePropFn}
        getRndIntegerFn={getRndIntegerFn}
        onCreateNewRecordFn={onCreateNewRecordFn}
        populateMealIngrdntsFn={populateMealIngrdntsFn}
        trimEnteredValueFn={trimEnteredValueFn}
        allUnitOfMeasures={allUnitOfMeasures}
        allWeightTypes={allWeightTypes}
        allBrands={allBrands}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
      />
    );
  }
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <CustomHeading
          key={`customDayNameMealsHeadingFor${parentTypeOfRecordToChange}${thisRecordId}`}
          headingLvl={4}
          recordLoaded={recordLoaded}
          headingText={`${dayOfWeek.name} Meals`}
          hdngIsReqFormLbl={false}
          editingForm={null}
          headingClasses="card-title"
        />
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"daysMealsAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"daysMealsAccordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#mealsAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"mealsAccrdn" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#daysMealsAccordionHeader" + thisRecordId}
            data-bs-parent={"#daysMealsAccordionFull" + thisRecordId}
          >
            <div className="accordion-body wkDaysAccrdnBdy">
              {renderMeal("breakfast", "Breakfast")}
              {renderMeal("snack1", "Snack 1")}
              {renderMeal("lunch", "Lunch")}
              {renderMeal("snack2", "Snack 2")}
              {renderMeal("dinner", "Dinner")}
              {renderMeal("dessert", "Dessert")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsCard;
