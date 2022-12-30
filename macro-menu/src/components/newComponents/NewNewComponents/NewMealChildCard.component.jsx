import React from "react";
import CustomHeading from "../CustomHeading.component";
import ReadOnlyInputCore from "../ReadOnlyInputCore.component";
import NewFormControl from "./NewFormControl.component";
import NewNewAsyncSearchSelectWCreate from "./NewNewAsyncSearchSelectWCreate.component";
const NewMealChildCard = (props) => {
  const typeOfRecordToChange = "meal";
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
    onCreateNewRecordFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { thisStateObj } = specificData;
  const {} = specificMethods;
  const {
    recordLoaded,
    thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
    thisMealsIngrdnts,
    userChangedThisMealsRecipe,
  } = thisStateObj;
  const { _id, createdAt, updatedAt, day, genRecipe, mealType } = thisRecord;
  const thisMealTypeCode = mealType.code;
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const arrayIndex = null;
  const thisRecordId = _id;
  const fieldsDisabled = !editingForm.meal;
  function handleCreateNewRecordFn(newName) {
    onCreateNewRecordFn(
      "ingredient",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newName
    );
  }
  return (
    <form className="card mt-3 mb-3">
      <div className="card-header mealCardHeader">
        <div className="mealGenRecipeSctnHdr">
          <CustomHeading
            key={`customMealHeadingFor${typeOfRecordToChange}${thisRecordId}`}
            headingLvl={5}
            recordLoaded={recordLoaded}
            headingText={"Meal"}
            hdngIsReqFormLbl={false}
            editingForm={editingForm.meal}
            headingClasses="formSctnTitle"
          />
          <NewFormControl
            key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
            commonProps={{
              commonData: {},
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
              },
              specificMethods: {},
            }}
          />
        </div>
        <div
          className={
            justCreated.meal
              ? "subCardHeader cardHeaderFocused"
              : "subCardHeader"
          }
        >
          <CustomHeading
            key={`customRecipeHeadingFor${typeOfRecordToChange}${thisRecordId}`}
            headingLvl={5}
            recordLoaded={recordLoaded}
            headingText={"Recipe:"}
            hdngIsReqFormLbl={true}
            editingForm={editingForm.meal}
            headingClasses="recipeSelectHeader"
          />
          <NewNewAsyncSearchSelectWCreate
            commonProps={{
              commonData: {},
              commonMethods: {
                getRndIntegerFn: getRndIntegerFn,
                returnElementKey: returnElementKey,
                onUpdatePropFn: onUpdatePropFn,
                onCreateNewRecordFn: handleCreateNewRecordFn,
                trimEnteredValueFn: trimEnteredValueFn,
              },
            }}
            specificProps={{
              specificData: {
                typeOfRecordToChange: "meal",
                formGroupClasses: "",
                label: "Recipe",
                thisDayOfWeekCode: thisDayOfWeekCode,
                thisMealTypeCode: thisMealTypeCode,
                arrayIndex: arrayIndex,
                propToUpdate: "genRecipe",
                fieldDisabled: fieldsDisabled,
                initialFieldValErrs: valErrors.meal.genRecipe,
                inputClasses: "recipeSelect",
                isRequired: true,
                recordLoaded: recordLoaded,
                excludeLabel: true,
                selectedRecord: genRecipe,
                fetchDataUrl: `${backEndHtmlRoot}genRecipes/genRecipesByMealTypeAndName/${mealType._id}`,
              },
              specificMethods: {},
            }}
          />
          {userChangedThisMealsRecipe && !justCreated.meal ? (
            <div className="alert alert-warning recipeWarning" role="alert">
              CAUTION: If you save a change to this Meal's Recipe, your meal
              ingredient custom qtys will be reset.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="card-body mealCardBody">
        <div
          className="accordion accordion-flush"
          id={"mealHiddenAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"mealHiddenAccordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button collapsed mealAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#mealHiddenAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"mealHiddenAccrdn" + thisRecordId}
            className="accordion-collapse collapse"
            aria-labelledby={"#mealHiddenAccordionHeader" + thisRecordId}
            data-bs-parent={"#mealHiddenAccordionFull" + thisRecordId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <ReadOnlyInputCore
                key={`ReadOnlyInputCoreForCreatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={createdAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.meal.createdAt}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`ReadOnlyInputCoreForUpdatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={updatedAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.meal.updatedAt}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`ReadOnlyInputCoreForIdFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.meal._id}
                getRndIntegerFn={getRndIntegerFn}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewMealChildCard;
