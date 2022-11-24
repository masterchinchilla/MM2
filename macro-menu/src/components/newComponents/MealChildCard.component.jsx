import React from "react";
import FormControl from "./FormControl.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import AsyncSearchSelectWCreateNew from "./AsyncSearchSelectWCreateNew.component";
import CustomHeading from "./CustomHeading.component";

const MealChildCard = (props) => {
  const {
    currentGRFUser,
    backEndHtmlRoot,
    notifyFn,
    validatePropFn,
    onUpdatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        recordChanged: { meal: false },
        thisRecord: {
          _id: null,
          day: { dayOfWeek: null },
          genRecipe: { name: null },
          mealType: null,
          createdAt: null,
          updatedAt: null,
        },
        userType: { meal: "" },
        editingForm: { meal: false },
        recordsJustCreated: { meal: false },
        thisMealsIngrdnts: [],
        userChangedThisMealsRecipe: false,
        thisRecipesIngrdnts: [],
        valErrors: { meal: { genRecipe: [] }, genRecipe: { name: [] } },
        recordLoaded: false,
      };
  const {
    recordChanged,
    thisRecord,
    userType,
    recordsJustCreated,
    thisMealsIngrdnts,
    userChangedThisMealsRecipe,
    thisRecipesIngrdnts,
    valErrors,
    recordLoaded,
    editingForm,
  } = thisStateObj;
  const { _id, day, mealType, genRecipe, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "meal";
  const thisDayOfWeekCode = day.dayOfWeek ? day.dayOfWeek.code : "";
  const thisMealTypeCode = mealType ? mealType.code : "";
  const thisMealTypeId = mealType ? mealType._id : "";
  const arrayIndex = null;
  const saveDisabled =
    (userType.meal === "author" || userType.meal === "admin") &&
    editingForm.meal
      ? false
      : true;
  const hasChildren = thisMealsIngrdnts.length > 0 ? true : false;
  const saveWarning = null;
  const deleteWarning =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  const deleteChildrenWarning =
    "You must delete all this meals's ingredients before you can delete this meal";
  function handleCreateNewRecipeFn(newRecipeName) {
    const newRecord = {
      _id: `tempId${getRndIntegerFn(10000000, 99999999)}`,
      name: newRecipeName,
      GRFUser: currentGRFUser,
      defaultPrepInstructions: "",
      photoURL: "",
      availableMealType: mealType,
    };
    onCreateNewRecordFn(
      typeOfRecordToChange,
      "genRecipe",
      "Recipe",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newRecord
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
          <FormControl
            key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
            typeOfRecordToChange={typeOfRecordToChange}
            recordChanged={recordChanged.meal}
            thisDayOfWeekCode={thisDayOfWeekCode}
            thisMealTypeCode={thisMealTypeCode}
            arrayIndex={arrayIndex}
            userType={userType.meal}
            editingForm={editingForm.meal}
            saveDisabled={saveDisabled}
            hasChildren={hasChildren}
            saveWarning={saveWarning}
            deleteWarning={deleteWarning}
            deleteChildrenWarning={deleteChildrenWarning}
            recordLoaded={recordLoaded}
            onClickEditFn={onClickEditFn}
            onClickCancelFn={onClickCancelFn}
            onClickSaveFn={onClickSaveFn}
            onClickDeleteFn={onClickDeleteFn}
            onClickCopyFn={() => {}}
          />
        </div>
        <div
          className={
            recordsJustCreated.meal
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
          <AsyncSearchSelectWCreateNew
            key={`AsyncSrchSlctWCrtNewForMealRcpFor${typeOfRecordToChange}${thisRecordId}`}
            formGroupClasses=""
            typeOfRecordToChange={"meal"}
            thisDayOfWeekCode={thisDayOfWeekCode}
            thisMealTypeCode={thisMealTypeCode}
            arrayIndex={0}
            recordToSelect={genRecipe}
            propType={"reactSelect"}
            propToUpdateSentenceCase={"Recipe"}
            propToUpdate={"genRecipe"}
            trimEnteredValueFn={trimEnteredValueFn}
            fetchDataUrl={`${backEndHtmlRoot}genRecipes/genRecipesByMealTypeAndName/${thisMealTypeId}`}
            validatePropFn={validatePropFn}
            valErrors={valErrors.meal.genRecipe}
            notifyFn={notifyFn}
            onUpdatePropFn={onUpdatePropFn}
            onCreateNewRecordFn={handleCreateNewRecipeFn}
            fieldDisabled={!editingForm.meal}
            inputClasses={"recipeSelect"}
            recordLoaded={recordLoaded}
            excludeLabel={true}
            isRequired={true}
            getRndIntegerFn={getRndIntegerFn}
          />
          {userChangedThisMealsRecipe && !recordsJustCreated.meal ? (
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
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealChildCard;
