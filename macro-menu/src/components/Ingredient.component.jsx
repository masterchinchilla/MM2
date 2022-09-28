import React, { useState, useContext, Component } from "react";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import SelectSearchListWCreate from "./SelectSearchListWCreate.component";
import NameInputWDupSearch from "./NameInputWDupSearch.component";
import InputParent from "./InputParent.component";
import WeekMealPlanContext from "./WeekMealPlanContext";
const Ingredient = (props) => {
  const weekMealPlan = useContext(WeekMealPlanContext);
  const {
    userType,
    thisFormState,
    thisMealTypeCode,
    mealIngrdntsArrayIndex,
    thisMealIngrdntObj,
    thisObj,
    thisIngrdntOld,
    onUpdateProp,
  } = props;
  const thisMealType = thisMealIngrdntObj.thisMealIngrdnt.meal.mealType;
  const thisDayOfWeekCode =
    thisMealIngrdntObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
  const recordChanged = thisMealIngrdntObj.ingredientRecordChanged;
  const thisObjId = thisObj._id;
  const thisIngrdntJustCreated = thisMealIngrdntObj.thisIngrdntJustCreated;
  const objType = "ingredient";
  let thisBrandObj;
  let thisUOMObj;
  let thisWeightTypeObj;
  const [name, updateName] = useState(thisObj.name);
  const [nameValError, updateNameValError] = useState(null);
  const [origName, setOrigName] = useState(thisObj.name);
  const [saveDisabled, toggleSaveDisabled] = useState(false);
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
  function onCancelEditForm() {
    updateName(origName);
    updateNameValError(null);
    toggleSaveDisabled(false);
    props.onCancelEditForm(thisMealIngrdntObj, objType);
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
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
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
            onUpdateProp={props.onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="unitOfMeasure"
            options={weekMealPlan.allUnitOfMeasures}
            thisGRFUser={weekMealPlan.thisGRFUser}
            onCreateRecord={props.onCreateRecord}
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
            onUpdateProp={props.onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="weightType"
            options={weekMealPlan.allWeightTypes}
            thisGRFUser={weekMealPlan.thisGRFUser}
            onCreateRecord={props.onCreateRecord}
            styleClasses="recipeSelect"
          />
        </div>
        <div
          className="ingrdntPicDiv"
          style={
            thisObj.photoURL === undefined
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
            onUpdateProp={props.onUpdateProp}
            thisFormState={thisFormState}
            objType="ingredient"
            objTypeToChange="brand"
            options={weekMealPlan.allBrands}
            thisGRFUser={weekMealPlan.thisGRFUser}
            onCreateRecord={props.onCreateRecord}
            styleClasses="recipeSelect"
          />
        </div>
        <InputParent
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
          updateLocalPropValueFn={updateName}
          toggleSaveDisabledFn={toggleSaveDisabled}
          onUpdateProp={onUpdateProp}
          updateValErrorFn={updateNameValError}
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
            <div className="form-group mealIngrdntInputs">
              <label>Calories</label>
              <input
                type={"number"}
                className="form-control"
                value={thisObj.calories}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "calories",
                    mealIngrdntsArrayIndex,
                    "number",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
            <div className="form-group mealIngrdntInputs">
              <label>Carbs</label>
              <input
                type={"number"}
                className="form-control"
                value={thisObj.carbs}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "carbs",
                    mealIngrdntsArrayIndex,
                    "number",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
            <div className="form-group mealIngrdntInputs">
              <label>Protein</label>
              <input
                type={"number"}
                className="form-control"
                value={thisObj.protein}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "protein",
                    mealIngrdntsArrayIndex,
                    "number",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
            <div className="form-group mealIngrdntInputs">
              <label>Fat</label>
              <input
                type={"number"}
                className="form-control"
                value={thisObj.fat}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "fat",
                    mealIngrdntsArrayIndex,
                    "number",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
            <div className="form-group mealIngrdntInputs">
              <label>Fiber</label>
              <input
                type={"number"}
                className="form-control"
                value={thisObj.fiber}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "fiber",
                    mealIngrdntsArrayIndex,
                    "number",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
            <div className="form-group mealIngrdntInputs">
              <label>Photo URL</label>
              <input
                type={"text"}
                className="form-control"
                value={thisObj.photoURL}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "photoURL",
                    mealIngrdntsArrayIndex,
                    "text",
                    e,
                    []
                  )
                }
                disabled={thisFormState === "viewing" ? true : false}
              />
            </div>
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
