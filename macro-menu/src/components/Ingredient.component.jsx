import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const thisObj = props.thisObj;
  const thisObjId = thisObj._id;
  const allGRFUsers = props.allGRFUsers;
  const allUnitOfMeasures = props.allUnitOfMeasures;
  const allWeightTypes = props.allWeightTypes;
  const allBrands = props.allBrands;
  const deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="ingrdntFrm">
      <div className="ingrdntFrmHdr">
        <h6 className="ingrdntHdr">Base Ingredient</h6>
        <EditOptions
          key={"ingrdntEditOptns" + thisObjId}
          className="ingrdntFrmIcns"
          parentObj={thisMealIngrdntObj}
          objType={"ingredient"}
          userType={userType}
          thisFormState={thisFormState}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
        />
        <div className="form-group mealIngrdntInputs ingrdntUOM">
          <label>UOM</label>
          <select
            required
            className="form-control form-select"
            value={
              thisObj.unitOfMeasure === undefined
                ? {
                    _id: "627691779fa56aa1fe318390",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisObj.unitOfMeasure)
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
                e
              )
            }
          >
            {allUnitOfMeasures.map(function (unitOfMeasure) {
              return (
                <option
                  key={unitOfMeasure._id}
                  value={JSON.stringify(unitOfMeasure)}
                >
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
                ? {
                    _id: "627695899fa56aa1fe318396",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisObj.weightType)
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
                e
              )
            }
          >
            {allWeightTypes.map(function (weightType) {
              return (
                <option key={weightType._id} value={JSON.stringify(weightType)}>
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
                ? {
                    _id: "627691b69fa56aa1fe318393",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisObj.brand)
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
                e
              )
            }
          >
            {allBrands.map(function (brand) {
              return (
                <option key={brand._id} value={JSON.stringify(brand)}>
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
                e
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
              className="accordion-button mealInnerAccrdnBttn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAccrdnBdy" + thisObjId}
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAccrdnBdy" + thisObjId}
          className="accordion-collapse collapse"
          aria-labelledby={"#ingrdntAccrdnHdr" + thisObjId}
          data-bs-parent={"#ingrdntAccrdnFull" + thisObjId}
        >
          <div className="accordion-body ingrdntInnrAccrdn">
            <div className="form-group mealIngrdntInputs">
              <label>Calories</label>
              <input
                type={"number"}
                className="form-control"
                value={JSON.stringify(thisObj.calories)}
                onChange={(e) =>
                  props.onUpdateProp(
                    "ingredient",
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "calories",
                    mealIngrdntsArrayIndex,
                    "number",
                    e
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
                    e
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
                    e
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
                    e
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
                    e
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
                    e
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
                  disabled={userType === "admin" ? false : true}
                >
                  {userType === "admin" ? (
                    <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-lock" />
                  )}
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
                  <select
                    required
                    className="form-control form-select"
                    value={JSON.stringify(thisObj.GRFUser)}
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.onUpdateProp(
                        "ingredient",
                        thisDayOfWeekCode,
                        thisMealTypeCode,
                        "GRFUser",
                        mealIngrdntsArrayIndex,
                        "select",
                        e
                      )
                    }
                  >
                    {allGRFUsers.map(function (GRFUser) {
                      return (
                        <option
                          key={GRFUser._id}
                          value={JSON.stringify(GRFUser)}
                        >
                          {GRFUser.handle}
                        </option>
                      );
                    })}
                  </select>
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
