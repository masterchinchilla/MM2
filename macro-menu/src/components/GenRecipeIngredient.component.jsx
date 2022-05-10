import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GenRecipeIngredient = (props) => {
  let thisGenRecipeIngrdnt = props.thisGenRecipeIngrdnt;
  let thisMealType = thisGenRecipeIngrdnt.genRecipe.availableMealType.code;
  let mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  let allIngredients = props.allIngredients;
  let thisMealsTypesRecipes = props.thisMealsTypesRecipes;
  let userType = props.userType;
  let thisFormState = props.thisFormState;
  let deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="gnRcpIngrdntFrm">
      <div className="gnRcpIngrdntFrmHdr">
        <label className="gnRcpIngrdntHdr doubleHeightLabel">
          <h6>Default Qty</h6>
        </label>
        <EditOptions
          className="gnRcpIngrdntFrmIcns"
          parentObj={thisGenRecipeIngrdnt}
          stateObj={"genRecipeIngredient"}
          key={thisGenRecipeIngrdnt._id}
          userType={userType}
          thisFormState={thisFormState}
          onSubmitFormChange={props.onSubmitFormChange}
          onClickEdit={props.onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          deleteMsg={deleteMsg}
        />
        <input
          type={"number"}
          className="form-control gnRcpIngrdntQty"
          value={thisGenRecipeIngrdnt.defaultQty}
          onChange={(e) =>
            props.updateProp(
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
        id={"gnRcpIngrdntFrmAccrdnFll" + thisGenRecipeIngrdnt._id}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisGenRecipeIngrdnt._id}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={
                "#gnRcpIngrdntFrmAccrdn" + thisGenRecipeIngrdnt._id
              }
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisGenRecipeIngrdnt._id}
          className="accordion-collapse collapse"
          aria-labelledby={
            "#gnRcpIngrdntFrmAccrdnHdr" + thisGenRecipeIngrdnt._id
          }
          data-bs-parent={
            "#gnRcpIngrdntFrmAccrdnFll" + thisGenRecipeIngrdnt._id
          }
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
              <label>Base Ingredient</label>
              <select
                required
                className="form-control form-select"
                value={JSON.stringify(thisGenRecipeIngrdnt.ingredient)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.updateProp(
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
                value={JSON.stringify(thisGenRecipeIngrdnt.genRecipe)}
                disabled={thisFormState === "viewing" ? true : false}
                onChange={(e) =>
                  props.updateProp(
                    "genRecipeIngredient",
                    thisMealType,
                    "genRecipe",
                    mealIngrdntsArrayIndex,
                    "select",
                    e
                  )
                }
              >
                {thisMealsTypesRecipes.map(function (genRecipe) {
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
                value={thisGenRecipeIngrdnt._id}
                disabled={true}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GenRecipeIngredient;
