import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ingredient = (props) => {
  let thisIngrdnt = props.thisIngrdnt;
  let thisMealType = props.thisMealType;
  let mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  let allUnitOfMeasures = props.allUnitOfMeasures;
  let allWeightTypes = props.allWeightTypes;
  let allBrands = props.allBrands;
  let allGRFUsers = props.allGRFUsers;
  let userType = props.userType;
  let thisFormState = props.thisFormState;
  let deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="ingrdntFrm">
      <div className="ingrdntFrmHdr">
        <h6 className="ingrdntHdr">Base Ingredient</h6>
        <EditOptions
          className="ingrdntFrmIcns"
          parentObj={thisIngrdnt}
          stateObj={"ingredient"}
          userType={userType}
          thisFormState={thisFormState}
          onSubmitFormChange={props.onSubmitFormChange}
          onClickEdit={props.onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          deleteMsg={deleteMsg}
        />
        <div className="form-group mealIngrdntInputs ingrdntUOM">
          <label>UOM</label>
          <select
            required
            className="form-control form-select"
            value={
              thisIngrdnt.unitOfMeasure === undefined
                ? {
                    _id: "627691779fa56aa1fe318390",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisIngrdnt.unitOfMeasure)
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.updateProp(
                "ingredient",
                thisMealType,
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
              thisIngrdnt.weightType === undefined
                ? {
                    _id: "627695899fa56aa1fe318396",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisIngrdnt.weightType)
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.updateProp(
                "ingredient",
                thisMealType,
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
            thisIngrdnt.photoURL === undefined
              ? {
                  backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                }
              : {
                  backgroundImage: `url(${thisIngrdnt.photoURL})`,
                }
          }
        ></div>
        <div className="form-group mealIngrdntInputs ingrdntBrnd">
          <label>Brand</label>
          <select
            required
            className="form-control form-select"
            value={
              thisIngrdnt.brand === undefined
                ? {
                    _id: "627691b69fa56aa1fe318393",
                    name: "",
                    GRFUser: "62577a533813f4f21c27e1c7",
                  }
                : JSON.stringify(thisIngrdnt.brand)
            }
            disabled={thisFormState === "viewing" ? true : false}
            onChange={(e) =>
              props.updateProp(
                "ingredient",
                thisMealType,
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
            value={thisIngrdnt.name}
            onChange={(e) =>
              props.updateProp(
                "ingredient",
                thisMealType,
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
        id={"ingrdntAccrdnFull" + thisIngrdnt._id}
      >
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"ingrdntAccrdnHdr" + thisIngrdnt._id}
          >
            <button
              className="accordion-button mealInnerAccrdnBttn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAccrdnBdy" + thisIngrdnt._id}
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAccrdnBdy" + thisIngrdnt._id}
          className="accordion-collapse collapse"
          aria-labelledby={"#ingrdntAccrdnHdr" + thisIngrdnt._id}
          data-bs-parent={"#ingrdntAccrdnFull" + thisIngrdnt._id}
        >
          <div className="accordion-body ingrdntInnrAccrdn">
            <div className="form-group mealIngrdntInputs">
              <label>Calories</label>
              <input
                type={"number"}
                className="form-control"
                value={JSON.stringify(thisIngrdnt.calories)}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
                value={thisIngrdnt.carbs}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
                value={thisIngrdnt.protein}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
                value={thisIngrdnt.fat}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
                value={thisIngrdnt.fiber}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
                value={thisIngrdnt.photoURL}
                onChange={(e) =>
                  props.updateProp(
                    "ingredient",
                    thisMealType,
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
            id={"ingrdntAdminMenuAccrdnFull" + thisIngrdnt._id}
          >
            <div className="accordion-item genRecipeAdminMenuBttn">
              <h2
                className="accordion-header"
                id={"ingrdntAdminMenuAccrdnHdr" + thisIngrdnt._id}
              >
                <button
                  className="accordion-button collapsed mealAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={
                    "#ingrdntAdminMenuAccrdnBdy" + thisIngrdnt._id
                  }
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
              id={"ingrdntAdminMenuAccrdnBdy" + thisIngrdnt._id}
              className="accordion-collapse collapse"
              aria-labelledby={"#ingrdntAdminMenuAccrdnHdr" + thisIngrdnt._id}
              data-bs-parent={"#ingrdntAdminMenuAccrdnFull" + thisIngrdnt._id}
            >
              <div className="accordion-body ingrdntInnerAccrdn">
                <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                  <label>Author</label>
                  <select
                    required
                    className="form-control form-select"
                    value={JSON.stringify(thisIngrdnt.GRFUser)}
                    disabled={thisFormState === "viewing" ? true : false}
                    onChange={(e) =>
                      props.updateProp(
                        "ingredient",
                        thisMealType,
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
                    value={thisIngrdnt._id}
                    disabled={true}
                    onChange={props.onChange}
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
