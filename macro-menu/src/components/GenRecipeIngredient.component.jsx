import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GenRecipeIngredient = (props) => {
  const thisObj = props.thisObj;
  const thisObjId = thisObj._id;
  const thisMealType = thisObj.genRecipe.availableMealType.code;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  const allIngredients = props.allIngredients;
  const thisMealTypesRecipes = props.thisMealTypesRecipes;
  const userType = props.userType;
  // const userType = "admin";
  const thisFormState = props.thisFormState;
  // const thisFormState = "editingOrig";
  const deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="gnRcpIngrdntFrm">
      <div className="gnRcpIngrdntFrmHdr">
        <label className="gnRcpIngrdntHdr doubleHeightLabel">
          <h6>Default Qty</h6>
        </label>
        <EditOptions
          className="gnRcpIngrdntFrmIcns"
          parentObj={"genRecipeIngrdntEditOptns" + thisObj}
          ObjType={"genRecipeIngredient"}
          key={"genRecipeIngrdntEditOptns" + thisObjId}
          userType={userType}
          thisFormState={thisFormState}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          deleteMsg={deleteMsg}
        />
        <input
          type={"number"}
          className="form-control gnRcpIngrdntQty"
          value={thisObj.defaultQty}
          onChange={(e) =>
            props.onUpdateProp(
              "genRecipeIngredient",
              thisMealType,
              "defaultQty",
              mealIngrdntsArrayIndex,
              "number",
              e
            )
          }
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"gnRcpIngrdntFrmAccrdnFll" + thisObjId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisObjId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#gnRcpIngrdntFrmAccrdn" + thisObjId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisObjId}
          className="accordion-collapse collapse"
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisObjId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisObjId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
              <label>Base Ingredient</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(thisObj.ingredient)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.onUpdateProp(
                    "genRecipeIngredient",
                    thisMealType,
                    "ingredient",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  )
                }
              >
                {allIngredients.map(function (ingredient) {
                  return (
                    <option
                      key={ingredient._id}
                      value={JSON.stringify(ingredient)}
                    >
                      {ingredient.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Recipe</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(thisObj.genRecipe)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.onUpdateProp(
                    "genRecipeIngredient",
                    thisMealType,
                    "genRecipe",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  )
                }
              >
                {thisMealTypesRecipes.map(function (genRecipe) {
                  return (
                    <option
                      key={genRecipe._id}
                      value={JSON.stringify(genRecipe)}
                    >
                      {genRecipe.name}
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
    </form>
  );
};

export default GenRecipeIngredient;
