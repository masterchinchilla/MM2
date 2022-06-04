import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
const Ingredient = (props) => {
  const userType = props.userType;
  // const userType = "admin";
  const thisFormState = props.thisFormState;
  // const thisFormState = "editingOrig";
  const thisMealTypeCode = props.thisMealTypeCode;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  const thisMealIngrdntObj = props.thisMealIngrdntObj;
  const thisDayOfWeekCode =
    thisMealIngrdntObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
  const recordChanged = thisMealIngrdntObj.ingredientRecordChanged;
  const thisObj = props.thisObj;
  const thisObjId = thisObj._id;
  const allGRFUsers = props.allGRFUsers;
  const allUnitOfMeasures = props.allUnitOfMeasures;
  const allWeightTypes = props.allWeightTypes;
  const allBrands = props.allBrands;
  const thisIngrdntJustCreated = thisMealIngrdntObj.thisIngrdntJustCreated;
  const deleteMsg =
    "If you delete this Base Ingredient it will be deleted everywhere, including in other Recipes. Do you want to proceed?";
  const saveMsg =
    "Changes made to this Base Ingredient will be applied everywhere it is used, including in other Recipes. Do you want to proceed?";
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
          recordChanged={recordChanged}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
          saveMsg={saveMsg}
        />
        <div className="form-group mealIngrdntInputs ingrdntUOM">
          <label>UOM</label>
          <select
            required
            className="form-control form-select"
            value={
              thisObj.unitOfMeasure === undefined
                ? "627691779fa56aa1fe318390"
                : thisObj.unitOfMeasure._id
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.onUpdateProp(
                "ingredient",
                thisDayOfWeekCode,
                thisMealTypeCode,
                "unitOfMeasure",
                mealIngrdntsArrayIndex,
                "select",
                e,
                allUnitOfMeasures
              )
            }
          >
            {allUnitOfMeasures.map(function (unitOfMeasure) {
              return (
                <option key={unitOfMeasure._id} value={unitOfMeasure._id}>
                  {unitOfMeasure.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group mealIngrdntInputs ingrdntWghtType">
          <label>Weight Type</label>
          <select
            required
            className="form-control form-select"
            value={
              thisObj.weightType === undefined
                ? "627695899fa56aa1fe318396"
                : thisObj.weightType._id
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.onUpdateProp(
                "ingredient",
                thisDayOfWeekCode,
                thisMealTypeCode,
                "weightType",
                mealIngrdntsArrayIndex,
                "select",
                e,
                allWeightTypes
              )
            }
          >
            {allWeightTypes.map(function (weightType) {
              return (
                <option key={weightType._id} value={weightType._id}>
                  {weightType.name}
                </option>
              );
            })}
          </select>
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
          <select
            required
            className="form-control form-select"
            value={
              thisObj.brand === undefined
                ? "627691b69fa56aa1fe318393"
                : thisObj.brand._id
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.onUpdateProp(
                "ingredient",
                thisDayOfWeekCode,
                thisMealTypeCode,
                "brand",
                mealIngrdntsArrayIndex,
                "select",
                e,
                allBrands
              )
            }
          >
            {allBrands.map(function (brand) {
              return (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group mealIngrdntInputs ingrdntName badge bg-primary">
          <label>Ingredient Name</label>
          <input
            type={"text"}
            className="form-control"
            value={thisObj.name}
            onChange={(e) =>
              props.onUpdateProp(
                "ingredient",
                thisDayOfWeekCode,
                thisMealTypeCode,
                "name",
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
        className="accordion accordion-flush"
        id={"ingrdntAccrdnFull" + thisObjId}
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id={"ingrdntAccrdnHdr" + thisObjId}>
            <button
              // className="accordion-button mealInnerAccrdnBttn collapsed"
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
          // className="accordion-collapse collapse"
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
                  // disabled={userType === "admin" ? false : true}
                >
                  {/* {userType === "admin" ? (
                    <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                  )} */}
                </button>
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
                  {/* <select
                    required
                    className="form-control form-select"
                    value={thisObj.GRFUser._id}
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.onUpdateProp(
                        "ingredient",
                        thisDayOfWeekCode,
                        thisMealTypeCode,
                        "GRFUser",
                        mealIngrdntsArrayIndex,
                        "select",
                        e,
                        allGRFUsers
                      )
                    }
                  >
                    {allGRFUsers.map(function (GRFUser) {
                      return (
                        <option key={GRFUser._id} value={GRFUser._id}>
                          {GRFUser.handle}
                        </option>
                      );
                    })}
                  </select> */}
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
