import React, { useState, useEffect } from "react";
import _ from "lodash";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import FormControl from "./FormControl.component";
import InputCore from "./InputCore.component";
import CustomHeading from "./CustomHeading.component";
const RecipeCard = (props) => {
  const {
    onClickEditFn,
    onClickCancelFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onUpdatePropFn,
    validatePropFn,
    thisStateObjBackup,
    backEndHtmlRoot,
  } = props;
  const backupOfRecordToChange = thisStateObjBackup.thisRecord
    ? thisStateObjBackup.thisRecord.genRecipe
    : {};
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
            availableMealType: { name: "" },
            GRFUser: { handle: "" },
            defaultPrepInstructions: "",
            photoURL: "",
            createdAt: null,
            updatedAt: null,
          },
          mealType: null,
        },
        userType: { genRecipe: "" },
        editingForm: { genRecipe: false },
        thisMealsIngrdnts: [],
        justCreated: { meal: false },
        userChangedThisMealsRecipe: false,
        thisRecipesIngrdnts: [],
        valErrors: { genRecipe: { name: null, photoURL: null } },
        recordLoaded: false,
      };
  const {
    recordChanged,
    userType,
    editingForm,
    thisMealsIngrdnts,
    justCreated,
    userChangedThisMealsRecipe,
    thisRecipesIngrdnts,
    valErrors,
    recordLoaded,
  } = thisStateObj;
  const thisRecordChanged = recordChanged.genRecipe;
  const thisMeal = thisStateObj.thisRecord;
  const thisRecord = thisMeal.genRecipe;
  const {
    _id,
    name,
    availableMealType,
    GRFUser,
    defaultPrepInstructions,
    photoURL,
    createdAt,
    updatedAt,
  } = thisRecord;

  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "genRecipe";
  const thisDayOfWeekCode = thisMeal.day.dayOfWeek
    ? thisMeal.day.dayOfWeek.code
    : "";
  const thisMealTypeCode = thisMeal.mealType ? thisMeal.mealType.code : "";
  const arrayIndex = 0;
  const saveDisabled =
    (userType.genRecipe === "author" || userType.genRecipe === "admin") &&
    editingForm
      ? false
      : true;
  const fieldsDisabled = !editingForm.genRecipe ? true : false;
  const hasChildren =
    thisRecipesIngrdnts.length > 0 && recipeHasConnectedMeals ? true : false;

  const [recipeHasConnectedMeals, updateRecipeHasConnectedMeals] =
    useState(true);
  const [localRecordChanged, updateLocalRecordChangedStateFn] =
    useState(thisRecordChanged);
  const [localName, updateNameStateFn] = useState(name);
  const [prepInstr, updatePrepInstrStateFn] = useState(defaultPrepInstructions);
  const [nameValError, updateNameValErrorStateFn] = useState(
    valErrors ? valErrors.genRecipe.name : null
  );
  const [nameHasDup, toggleNameHasDupStateFn] = useState(true);
  const [localSaveDisabled, toggleSaveDisabledStateFn] = useState(saveDisabled);

  const saveWarning =
    "Any changes saved to this recipe will affect any meal to which it has been connected. Do you want to proceed?";
  const deleteWarning = "Are you sure you want to delete this Recipe?";
  const deleteChildrenWarning =
    "You must delete all this recipe's recipe ingredients AND disconnect this recipe from any meals before you can delete it";

  useEffect(() => {
    //search db for meals connected to this recipe, if found update "recipeHasConnectedMeals"
  }, []);
  function handleUpdatePrepInst(e) {
    let newPrepInst = e.target.value;
    updatePrepInstrStateFn(newPrepInst);
    updateLocalRecordChangedStateFn(true);
  }
  function handleClickSaveFn() {
    const updatedRecordForState = _.cloneDeep(thisRecord);
    updatedRecordForState.defaultPrepInstructions = prepInstr;
    onClickSaveFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      {},
      updatedRecordForState
    );
  }
  function handleClickCancelFn() {
    updateNameStateFn(backupOfRecordToChange.name);
    updatePrepInstrStateFn(backupOfRecordToChange.defaultPrepInstructions);
    updateNameValErrorStateFn(null);
    toggleNameHasDupStateFn(false);
    onClickCancelFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex
    );
  }
  return (
    <React.Fragment>
      <form className="card mt-3 mb-3">
        <div className="card-header mealCardHeader">
          <div className="mealGenRecipeSctnHdr">
            <CustomHeading
              key={`customRcpDtlsHeadingFor${typeOfRecordToChange}${thisRecordId}`}
              headingLvl={5}
              recordLoaded={recordLoaded}
              headingText="Recipe Details"
              hdngIsReqFormLbl={false}
              editingForm={editingForm}
              headingClasses="formSctnTitle"
            />
            <FormControl
              key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
              typeOfRecordToChange={typeOfRecordToChange}
              recordChanged={localRecordChanged}
              thisDayOfWeekCode={thisDayOfWeekCode}
              thisMealTypeCode={thisMealTypeCode}
              arrayIndex={arrayIndex}
              userType={userType.genRecipe}
              editingForm={editingForm}
              saveDisabled={localSaveDisabled}
              hasChildren={hasChildren}
              saveWarning={saveWarning}
              deleteWarning={deleteWarning}
              deleteChildrenWarning={deleteChildrenWarning}
              recordLoaded={recordLoaded}
              onClickEditFn={onClickEditFn}
              onClickCancelFn={handleClickCancelFn}
              onClickSaveFn={handleClickSaveFn}
              onClickDeleteFn={onClickDeleteFn}
              onClickCopyFn={() => {}}
            />
          </div>
        </div>
        <div className="card-body mealCardBody">
          <div className="mealImgNTblRow">
            <div
              className="mealImg"
              style={
                !photoURL
                  ? {
                      backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                    }
                  : {
                      backgroundImage: `url(${photoURL})`,
                    }
              }
            />
            <CustomHeading
              key={`customPrepInstrHeadingFor${typeOfRecordToChange}${thisRecordId}`}
              headingLvl={6}
              recordLoaded={recordLoaded}
              headingText="Prep Instructions:"
              hdngIsReqFormLbl={false}
              editingForm={editingForm}
              headingClasses="mealPrepInst"
            />
            <textarea
              className="form-control mealTextArea"
              disabled={fieldsDisabled}
              onChange={(e) => handleUpdatePrepInst(e)}
              value={prepInstr}
            ></textarea>
          </div>
          <div
            className="accordion accordion-flush"
            id={"genRecipeInnerAccordionFull" + thisRecordId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"genRecipeInnerAccordionHeader" + thisRecordId}
              >
                <button
                  className="accordion-button collapsed mealInnerAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#genRecipeInnerAccrdn" + thisRecordId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"genRecipeInnerAccrdn" + thisRecordId}
              className="accordion-collapse collapse"
              aria-labelledby={"#genRecipeInnerAccordionHeader" + thisRecordId}
              data-bs-parent={"#genRecipeInnerAccordionFull" + thisRecordId}
            >
              <div className="accordion-body mealInnerAccordion">
                <div className="form-group mealInputs">
                  <InputWLocalStateAndVal
                    key={`inputWLclStateNValForNameForWMP${thisRecordId}`}
                    backupOfRecordToChange={backupOfRecordToChange}
                    formGroupClasses={"form-group wmpNameFrmGroup"}
                    label={"Recipe Name"}
                    propType="name"
                    localPropValue={localName}
                    typeOfRecordToChange={typeOfRecordToChange}
                    thisDayOfWeekCode={thisDayOfWeekCode}
                    thisMealTypeCode={thisMealTypeCode}
                    propToUpdate="name"
                    arrayIndex={arrayIndex}
                    selectedFrom={[]}
                    fieldDisabled={fieldsDisabled}
                    valError={nameValError}
                    inputClasses={"form-control"}
                    isRequired={true}
                    backEndHtmlRoot={backEndHtmlRoot}
                    propNameSentenceCase={"Name"}
                    validatePropFn={validatePropFn}
                    changeLocalPropStateFn={updateNameStateFn}
                    togglePropValueHasDupStateFn={toggleNameHasDupStateFn}
                    onUpdatePropFn={onUpdatePropFn}
                    valErrorUpdateStateFn={updateNameValErrorStateFn}
                    getRndIntegerFn={getRndIntegerFn}
                    recordLoaded={recordLoaded}
                    excludeLabel={false}
                  />
                </div>
                <InputCore
                  formGroupClasses="form-group mealInputs"
                  label="Photo URL"
                  propType="url"
                  inputTypeForHtml={"url"}
                  propValue={photoURL}
                  onUpdatePropFn={onUpdatePropFn}
                  inputOnKeyUpFn={() => {}}
                  recordToChange="genRecipe"
                  thisDayOfWeekCode={thisDayOfWeekCode}
                  thisMealTypeCode={thisMealTypeCode}
                  propToUpdate={"photoURL"}
                  arrayIndex={arrayIndex}
                  selectedFrom={[]}
                  fieldDisabled={fieldsDisabled}
                  valError={valErrors.genRecipe.photoURL}
                  inputClasses="form-control"
                  isRequired={false}
                  recordLoaded={recordLoaded}
                  excludeLabel={false}
                />
                <ReadOnlyInputCore
                  key={`readOnlyInputForAuthorForGenRecipe${thisRecordId}`}
                  formGroupClasses={"form-group mealInputs"}
                  label="Author "
                  inputClasses="form-control"
                  propType="text"
                  propValue={GRFUser.handle}
                  recordLoaded={recordLoaded}
                  excludeLabel={false}
                />
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
                    aria-labelledby={
                      "#mealHiddenAccordionHeader" + thisRecordId
                    }
                    data-bs-parent={"#mealHiddenAccordionFull" + thisRecordId}
                  >
                    <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
                      <ReadOnlyInputCore
                        key={`readOnlyInputForAvlMlTypForGenRecipe${thisRecordId}`}
                        formGroupClasses={"form-group"}
                        label="Available Meal Type "
                        inputClasses="form-control"
                        propType="text"
                        propValue={availableMealType.name}
                        recordLoaded={recordLoaded}
                        excludeLabel={false}
                      />
                      <ReadOnlyInputCore
                        key={`readOnlyInputForIdForGenRecipe${thisRecordId}`}
                        formGroupClasses={"form-group"}
                        label="Record ID "
                        inputClasses="form-control"
                        propType="text"
                        propValue={_id}
                        recordLoaded={recordLoaded}
                        excludeLabel={false}
                      />
                      <ReadOnlyInputCore
                        key={`readOnlyInputForCreatedDtForGenRecipe${thisRecordId}`}
                        formGroupClasses={"form-group"}
                        label="Created "
                        inputClasses="form-control"
                        propType="text"
                        propValue={createdAt}
                        recordLoaded={recordLoaded}
                        excludeLabel={false}
                      />
                      <ReadOnlyInputCore
                        key={`readOnlyInputForUpdatedDtForGenRecipe${thisRecordId}`}
                        formGroupClasses={"form-group"}
                        label="Last Update "
                        inputClasses="form-control"
                        propType="text"
                        propValue={updatedAt}
                        recordLoaded={recordLoaded}
                        excludeLabel={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default RecipeCard;
