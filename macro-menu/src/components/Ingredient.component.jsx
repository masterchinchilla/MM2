import React, { useState, useEffect } from "react";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import SelectSearchListWCreate from "./SelectSearchListWCreate.component";
import Input from "./Input.component";
import InputWLocalStateAndValidation from "./InputWLocalStateAndValidation.component";
const Ingredient = (props) => {
  const {
    thisGRFUser,
    userType,
    thisFormState,
    mealIngrdntsArrayIndex,
    thisMealIngrdntObj,
    thisObj,
    thisIngrdntOld,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    backEndHtmlRoot,
    onUpdateProp,
    onCancelEditForm,
    onClickEditForm,
    onSaveFormChanges,
    onDeleteRecord,
    onCreateRecord,
  } = props;
  const thisMealType = thisMealIngrdntObj.thisMealIngrdnt.meal.mealType;
  const thisMealTypeCode = thisMealType.code;
  const thisDayOfWeekCode =
    thisMealIngrdntObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
  const recordChanged = thisMealIngrdntObj.ingredientRecordChanged;
  const thisObjId = thisObj._id;
  const thisIngrdntJustCreated = thisMealIngrdntObj.thisIngrdntJustCreated;
  const objType = "ingredient";
  let thisBrandObj;
  let thisUOMObj;
  let thisWeightTypeObj;
  const [name, updateName] = useState(
    thisObj.name
    // weekMealPlan.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
    //   thisMealTypeCode
    // ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex]["thisMealIngrdnt"][
    //   "genRecipeIngredient"
    // ]["ingredient"]["name"]
  );

  const [origName, setOrigName] = useState(thisObj.name);
  const [valErrors, setValErrors] = useState(
    thisMealIngrdntObj.ingredientValErrors
  );
  const [nameValError, updateNameValError] = useState(valErrors.name);
  const [nameHasDup, toggleNameHasDup] = useState(false);
  const [saveDisabled, toggleSaveDisabled] = useState(true);
  useEffect(() => {
    if (
      nameHasDup ||
      valErrors.calories ||
      valErrors.carbs ||
      valErrors.protein ||
      valErrors.fat ||
      valErrors.fiber ||
      valErrors.photoURL
    ) {
      toggleSaveDisabled(true);
    } else {
      toggleSaveDisabled(false);
    }
  });
  {
    thisObj.brand
      ? (thisBrandObj = thisObj.brand)
      : (thisBrandObj = {
          _id: "627691b69fa56aa1fe318393",
          name: "",
          GRFUser: "62577a533813f4f21c27e1c7",
        });
  }
  {
    thisObj.unitOfMeasure
      ? (thisUOMObj = thisObj.unitOfMeasure)
      : (thisUOMObj = {
          _id: "627691779fa56aa1fe318390",
          name: "",
          GRFUser: "62577a533813f4f21c27e1c7",
        });
  }
  {
    thisObj.weightType
      ? (thisWeightTypeObj = thisObj.weightType)
      : (thisWeightTypeObj = {
          _id: "627695899fa56aa1fe318396",
          name: "",
          GRFUser: "62577a533813f4f21c27e1c7",
        });
  }
  const deleteMsg =
    "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?";
  const saveMsg =
    "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?";
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
  });
  function handleCancelEditForm() {
    updateName(origName);
    updateNameValError(null);
    toggleNameHasDup(false);
    onCancelEditForm(thisMealIngrdntObj, objType);
  }
  return (
    <form
      className={
        thisMealIngrdntObj.thisIngrdntJustCreated === true
          ? "ingrdntFrm subCardHeaderFocused"
          : "ingrdntFrm"
      }
    >
      <div className="ingrdntFrmHdr">
        <h6 className="ingrdntHdr">Base Ingredient</h6>
        <EditOptions
          key={"ingrdntEditOptns" + thisObjId}
          className="ingrdntFrmIcns"
          parentObj={thisMealIngrdntObj}
          objType={"ingredient"}
          userType={userType}
          thisFormState={thisFormState}
          saveDisabled={saveDisabled}
          recordChanged={recordChanged}
          onClickEditForm={onClickEditForm}
          onCancelEditForm={handleCancelEditForm}
          onSaveFormChanges={onSaveFormChanges}
          onDeleteRecord={onDeleteRecord}
          deleteMsg={deleteMsg}
          saveMsg={saveMsg}
        />
        <div className="form-group mealIngrdntInputs ingrdntUOM">
          <label>UOM</label>
          <SelectSearchListWCreate
            required
            objToSelect={thisUOMObj}
            dayOfWeekCode={thisDayOfWeekCode}
            mealType={thisMealType}
            arrayIndex={mealIngrdntsArrayIndex}
            onUpdateProp={onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="unitOfMeasure"
            options={allUnitOfMeasures}
            thisGRFUser={thisGRFUser}
            onCreateRecord={onCreateRecord}
            styleClasses="recipeSelect"
          />
        </div>
        <div className="form-group mealIngrdntInputs ingrdntWghtType">
          <label>Weight Type</label>
          <SelectSearchListWCreate
            required
            objToSelect={thisWeightTypeObj}
            dayOfWeekCode={thisDayOfWeekCode}
            mealType={thisMealType}
            arrayIndex={mealIngrdntsArrayIndex}
            onUpdateProp={onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="weightType"
            options={allWeightTypes}
            thisGRFUser={thisGRFUser}
            onCreateRecord={onCreateRecord}
            styleClasses="recipeSelect"
          />
        </div>
        <div
          className="ingrdntPicDiv"
          style={
            !thisObj.photoURL
              ? {
                  backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                }
              : {
                  backgroundImage: `url(${thisObj.photoURL})`,
                }
          }
        ></div>
        <div className="form-group mealIngrdntInputs ingrdntBrnd">
          <label>Brand</label>
          <SelectSearchListWCreate
            required
            objToSelect={thisBrandObj}
            dayOfWeekCode={thisDayOfWeekCode}
            mealType={thisMealType}
            arrayIndex={mealIngrdntsArrayIndex}
            onUpdateProp={onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="brand"
            options={allBrands}
            thisGRFUser={thisGRFUser}
            onCreateRecord={onCreateRecord}
            styleClasses="recipeSelect"
          />
        </div>
        <InputWLocalStateAndValidation
          parentObjOld={thisIngrdntOld}
          valSchema={schema}
          label={"IngredientName"}
          thisFormState={thisFormState}
          formGroupClasses={
            "form-group mealIngrdntInputs ingrdntName badge bg-primary"
          }
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
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
      <div
        className="accordion accordion-flush"
        id={"ingrdntAccrdnFull" + thisObjId}
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id={"ingrdntAccrdnHdr" + thisObjId}>
            <button
              className={
                thisIngrdntJustCreated === true
                  ? "accordion-button mealInnerAccrdnBttn open"
                  : "accordion-button mealInnerAccrdnBttn collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAccrdnBdy" + thisObjId}
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAccrdnBdy" + thisObjId}
          className={
            thisIngrdntJustCreated === true
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#ingrdntAccrdnHdr" + thisObjId}
          data-bs-parent={"#ingrdntAccrdnFull" + thisObjId}
        >
          <div className="accordion-body ingrdntInnrAccrdn">
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Calories"
              propType="number"
              propValue={thisObj.calories}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"calories"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="number"
              selectedFrom={[]}
              propTypeForVal="float"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={valErrors.calories}
              inputClasses="form-control"
              isRequired={true}
            />
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Carbs"
              propType="number"
              propValue={thisObj.carbs}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"carbs"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="number"
              selectedFrom={[]}
              propTypeForVal="float"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={valErrors.carbs}
              inputClasses="form-control"
              isRequired={true}
            />
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Protein"
              propType="number"
              propValue={thisObj.protein}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"protein"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="number"
              selectedFrom={[]}
              propTypeForVal="float"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={thisMealIngrdntObj.ingredientValErrors.protein}
              inputClasses="form-control"
              isRequired={true}
            />
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Fat"
              propType="number"
              propValue={thisObj.fat}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"fat"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="number"
              selectedFrom={[]}
              propTypeForVal="float"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={thisMealIngrdntObj.ingredientValErrors.fat}
              inputClasses="form-control"
              isRequired={true}
            />
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Fiber"
              propType="number"
              propValue={thisObj.fiber}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"fiber"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="number"
              selectedFrom={[]}
              propTypeForVal="float"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={thisMealIngrdntObj.ingredientValErrors.fiber}
              inputClasses="form-control"
              isRequired={true}
            />
            <Input
              formGroupClasses="form-group mealIngrdntInputs"
              label="Photo URL"
              propType="text"
              propValue={thisObj.photoURL}
              onUpdateProp={onUpdateProp}
              inputOnKeyUpFn={() => {}}
              objType="ingredient"
              dayOfWeekCode={thisDayOfWeekCode}
              mealTypeCode={thisMealTypeCode}
              propToUpdate={"photoURL"}
              arrayIndex={mealIngrdntsArrayIndex}
              inputType="text"
              selectedFrom={[]}
              propTypeForVal="url"
              fieldDisabled={thisFormState === "viewing" ? true : false}
              valError={thisMealIngrdntObj.ingredientValErrors.photoURL}
              inputClasses="form-control"
              isRequired={false}
            />
          </div>
          <div
            className="accordion accordion-flush ingrdntAdminMenu"
            id={"ingrdntAdminMenuAccrdnFull" + thisObjId}
          >
            <div className="accordion-item genRecipeAdminMenuBttn">
              <h2
                className="accordion-header"
                id={"ingrdntAdminMenuAccrdnHdr" + thisObjId}
              >
                <button
                  className="accordion-button collapsed mealAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#ingrdntAdminMenuAccrdnBdy" + thisObjId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"ingrdntAdminMenuAccrdnBdy" + thisObjId}
              className="accordion-collapse collapse"
              aria-labelledby={"#ingrdntAdminMenuAccrdnHdr" + thisObjId}
              data-bs-parent={"#ingrdntAdminMenuAccrdnFull" + thisObjId}
            >
              <div className="accordion-body ingrdntInnerAccrdn">
                <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                  <label>Author</label>
                  <input
                    type={"text"}
                    className="form-control"
                    value={thisObj.GRFUser.handle}
                    disabled={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
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
                <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
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
                <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                  <label>Record ID</label>
                  <input
                    type={"text"}
                    className="form-control"
                    value={thisObjId}
                    disabled={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Ingredient;
