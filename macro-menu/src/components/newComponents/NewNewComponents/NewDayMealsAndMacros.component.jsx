import React from "react";
import StickyBox from "react-sticky-box";
import CustomHeading from "../CustomHeading.component";
import NewMacrosTable from "../NewMacrosTable.component";
import NewCreateMealButton from "./NewCreateMealButton.component";
import NewMealParentCard from "./NewMealParentCard.component";
const NewDayMealsAndMacros = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    mealTypes,
    backEndHtmlRoot,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
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
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj, thisStateObjBackup } = specificData;
  const {
    thisRecord,
    recordLoaded,
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
  const { dayOfWeek, weekMealPlan, _id } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "day";
  const childTypeOfRecordToChange = "meal";
  function renderMeal(thisMealType) {
    let thisDaysMealStateObj = thisStateObj[thisMealType.code];
    let thisDaysMealStateObjBackup = thisStateObjBackup
      ? thisStateObjBackup[thisMealType.code]
      : {};
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
            key={`createMealBttnFor${childTypeOfRecordToChange}${mealRecordId}`}
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
        <NewMealParentCard
          commonProps={{
            commonData: {
              backEndHtmlRoot: backEndHtmlRoot,
              allUnitOfMeasures: allUnitOfMeasures,
              allWeightTypes: allWeightTypes,
              allBrands: allBrands,
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
            },
          }}
          specificProps={{
            specificData: {
              thisStateObj: thisMealStateObj,
              nestedMealIngrdntArray: thisDaysMealsIngrdnts,
              thisStateObjBackup: thisDaysMealStateObjBackup,
            },
            specificMethods: {},
          }}
        />
      );
    }
  }
  return (
    <div className="card-body">
      <div
        className="accordion accordion-flush"
        id={"accordionFull" + thisRecordId}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"accordionHeader" + thisRecordId}
          >
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#dayAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
          <div
            id={"dayAccrdn" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader" + thisRecordId}
            data-bs-parent={"#accordionFull" + thisRecordId}
          >
            <div className="accordion-body">
              <StickyBox
                key={`macroTblStickyBoxFor${typeOfRecordToChange}${thisRecordId}`}
                offsetTop={20}
                offsetBottom={20}
                className={"dayMacTable"}
              >
                <NewMacrosTable
                  key={`macrosTblFor${typeOfRecordToChange}${thisRecordId}`}
                  thisWMPRecord={weekMealPlan}
                  tableType={"Day Macros"}
                  thisMealType={{}}
                  theseIngrdnts={thisDaysMealsIngrdnts}
                  recordLoaded={recordLoaded}
                  getRndIntegerFn={getRndIntegerFn}
                />
              </StickyBox>
              <div className="card mt-3 mb-3">
                <div className="card-header">
                  <CustomHeading
                    key={`customDayNameMealsHeadingFor${typeOfRecordToChange}${thisRecordId}`}
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
                      aria-labelledby={
                        "#daysMealsAccordionHeader" + thisRecordId
                      }
                      data-bs-parent={"#daysMealsAccordionFull" + thisRecordId}
                    >
                      <div className="accordion-body wkDaysAccrdnBdy">
                        {renderMeal(mealTypes[0])}
                        {renderMeal(mealTypes[1])}
                        {renderMeal(mealTypes[2])}
                        {renderMeal(mealTypes[3])}
                        {renderMeal(mealTypes[4])}
                        {renderMeal(mealTypes[5])}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDayMealsAndMacros;
