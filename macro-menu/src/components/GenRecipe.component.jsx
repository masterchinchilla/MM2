import React, { useState, useEffect } from "react";
import _ from "lodash";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import InputWLocalStateAndValidation from "./InputWLocalStateAndValidation.component";
import Input from "./Input.component";
const GenRecipe = (props) => {
  const {
    mealStateObj,
    onClickEditForm,
    thisMealStateObjOld,
    backEndHtmlRoot,
    onUpdateProp,
    onSaveFormChanges,
    onCancelEditForm,
  } = props;
  const recordChanged = mealStateObj.genRecipeRecordChanged;
  const thisMeal = mealStateObj.thisMeal;
  const thisObj = thisMeal.genRecipe;
  const objType = "genRecipe";
  const thisDayOfWeekCode = mealStateObj.thisMeal.day.dayOfWeek.code;
  const thisMealTypeCode = mealStateObj.thisMeal.mealType.code;
  const thisObjId = thisObj._id;
  const thisRecipesIngrdnts = mealStateObj.thisRecipesIngrdnts;
  const thisFormState = mealStateObj.thisGenRecipeFormState;
  const userType = mealStateObj.thisGenRecipeUserType;
  const valErrors = mealStateObj.genRecipeValErrors;
  const [hideDeleteBarrier, toggleHideDeleteBarrier] = useState(true);
  const [prepInstr, updatePrepInstr] = useState(
    thisObj.defaultPrepInstructions
  );
  const [name, updateName] = useState(thisObj.name);
  const [nameHasDup, toggleNameHasDup] = useState(false);
  const [saveDisabled, toggleSaveDisabled] = useState(true);
  const [nameValError, updateNameValError] = useState(null);
  useEffect(() => {
    if (nameHasDup || valErrors.defaultPrepInstructions || valErrors.photoURL) {
      toggleSaveDisabled(true);
    } else {
      toggleSaveDisabled(false);
    }
  });
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
  });
  const handleUpdatePrepInst = (e) => {
    let newPrepInst = e.target.value;
    updatePrepInstr(newPrepInst);
    mealStateObj.genRecipeRecordChanged = true;
  };
  const handleSaveRecipeChange = (parentObj, objType) => {
    const newMealStateObj = _.cloneDeep(mealStateObj);
    newMealStateObj.thisMeal.genRecipe.defaultPrepInstructions = prepInstr;
    onSaveFormChanges(newMealStateObj, objType);
  };
  const handleClickDelete = (thisObj, stateObj) => {
    if (thisRecipesIngrdnts.length === 0) {
      hideDeleteBarrier(false);
    } else {
      handleDeleteGenRecipe();
    }
  };
  const handleDeleteGenRecipe = () => {
    console.log("Base Recipe Deleted");
  };
  function handleCancelEditForm() {
    updateName(thisMealStateObjOld.thisMeal.genRecipe.name);
    updatePrepInstr(
      thisMealStateObjOld.thisMeal.genRecipe.defaultPrepInstructions
    );
    updateNameValError(null);
    toggleNameHasDup(false);
    onCancelEditForm(mealStateObj, "genRecipe");
  }
  const deleteMsg = "Are you sure you want to delete this Base Recipe?";
  return (
    <React.Fragment>
      <div className="deleteWarning" hidden={hideDeleteBarrier}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteMealWarnLabel">
                Cannot Delete Base Recipe with Ingredients
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                Delete all recipe ingredients before attempting to delete the
                base recipe record
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  hideDeleteBarrier(true);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <form className="card mt-3 mb-3">
        <div className="card-header mealCardHeader">
          <div className="mealGenRecipeSctnHdr">
            <h5 className="formSctnTitle">Recipe Details</h5>
            <EditOptions
              key={"genRecipeEditOptns" + thisObjId}
              parentObj={mealStateObj}
              objType={"genRecipe"}
              thisFormState={thisFormState}
              saveDisabled={saveDisabled}
              userType={userType}
              recordChanged={recordChanged}
              onClickEditForm={onClickEditForm}
              onCancelEditForm={handleCancelEditForm}
              onSaveFormChanges={handleSaveRecipeChange}
              onDelete={handleClickDelete}
              deleteMsg={deleteMsg}
            />
          </div>
        </div>
        <div className="card-body mealCardBody">
          <div className="mealImgNTblRow">
            <div
              className="mealImg"
              style={
                !thisObj.photoURL
                  ? {
                      backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                    }
                  : {
                      backgroundImage: `url(${thisObj.photoURL})`,
                    }
              }
            />
            <h6 className="mealPrepInst">Prep Instructions:</h6>
            <textarea
              className="form-control mealTextArea"
              disabled={thisFormState === "viewing" ? true : false}
              onChange={(e) => handleUpdatePrepInst(e)}
              value={prepInstr}
            ></textarea>
          </div>
          <div
            className="accordion accordion-flush"
            id={"genRecipeInnerAccordionFull" + thisObjId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"genRecipeInnerAccordionHeader" + thisObjId}
              >
                <button
                  className="accordion-button collapsed mealInnerAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#genRecipeInnerAccrdn" + thisObjId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"genRecipeInnerAccrdn" + thisObjId}
              className="accordion-collapse collapse"
              aria-labelledby={"#genRecipeInnerAccordionHeader" + thisObjId}
              data-bs-parent={"#genRecipeInnerAccordionFull" + thisObjId}
            >
              <div className="accordion-body mealInnerAccordion">
                <div className="form-group mealInputs">
                  <InputWLocalStateAndValidation
                    parentObjOld={thisMealStateObjOld}
                    valSchema={schema}
                    label={"Recipe Name"}
                    thisFormState={thisFormState}
                    formGroupClasses={"form-group mealInputs"}
                    thisDayOfWeekCode={thisDayOfWeekCode}
                    thisMealTypeCode={thisMealTypeCode}
                    mealIngrdntsArrayIndex={0}
                    propType={"text"}
                    objType={objType}
                    propName={"name"}
                    propNameSentenceCase={"Name"}
                    localPropValue={name}
                    valError={nameValError}
                    backEndHtmlRoot={backEndHtmlRoot}
                    updateLocalPropValueFn={updateName}
                    toggleNameHasDup={toggleNameHasDup}
                    onUpdateProp={onUpdateProp}
                    updateValErrorFn={updateNameValError}
                    selectedFrom={[]}
                    propTypeForVal={"name"}
                    inputClasses={"form-control"}
                    isRequired={true}
                  />
                </div>
                <Input
                  formGroupClasses="form-group mealInputs"
                  label="Photo URL"
                  propType="text"
                  propValue={
                    thisObj.photoURL === undefined ? "" : thisObj.photoURL
                  }
                  onUpdateProp={onUpdateProp}
                  inputOnKeyUpFn={() => {}}
                  objType="genRecipe"
                  dayOfWeekCode={thisDayOfWeekCode}
                  mealTypeCode={thisMealTypeCode}
                  propToUpdate={"photoURL"}
                  arrayIndex={0}
                  inputType="text"
                  selectedFrom={[]}
                  propTypeForVal="url"
                  fieldDisabled={thisFormState === "viewing" ? true : false}
                  valError={valErrors.photoURL}
                  inputClasses="form-control"
                  isRequired={false}
                />
                <div className="form-group mealInputs">
                  <label>Author</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    onChange={() =>
                      console.log(
                        "This is not a real input, it just Display's the author, real input is a select drop-down in the admin menu."
                      )
                    }
                    value={thisObj.GRFUser.handle}
                  />
                </div>
              </div>
              <div className="card-body mealCardBody">
                <div
                  className="accordion accordion-flush"
                  id={"mealHiddenAccordionFull" + thisObjId}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"mealHiddenAccordionHeader" + thisObjId}
                    >
                      <button
                        className="accordion-button collapsed mealAdminAccrdnBttn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#mealHiddenAccrdn" + thisObjId}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"mealHiddenAccrdn" + thisObjId}
                    className="accordion-collapse collapse"
                    aria-labelledby={"#mealHiddenAccordionHeader" + thisObjId}
                    data-bs-parent={"#mealHiddenAccordionFull" + thisObjId}
                  >
                    <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
                      <div className="form-group">
                        <label>Available Meal Type</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={true}
                          value={mealStateObj.thisMeal.mealType.name}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group">
                        <label>Record Id</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={true}
                          value={thisObjId}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group">
                        <label>Created</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={true}
                          value={dayjs(thisObj.createdAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Update</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={true}
                          value={dayjs(thisObj.updatedAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                          onChange={() => {}}
                        />
                      </div>
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

export default GenRecipe;
