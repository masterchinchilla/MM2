import React, { useState, Component } from "react";
import EditOptions from "./EditOptions.component";
import MealIngredientChild from "./MealIngredientChild.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
import Ingredient from "./Ingredient.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MealIngredientParent = (props) => {
  let defaultMealIngrdntsFormsUserType = props.defaultMealIngrdntsFormsUserType;
  let defaultMealIngrdntFormsState = props.defaultMealIngrdntFormsState;
  // props.onClickEditMealIngrdntForms
  // props.onCancelEditMealIngrdntForms

  const [mealIngrdntFormState, changeMealIngrdntFormState] = useState(
    defaultMealIngrdntFormsState
  );
  const [genRecipeIngrdntFormState, changeGenRecipeIngrdntFormState] = useState(
    defaultMealIngrdntFormsState
  );
  const [ingrdntFormState, changeIngrdntFormState] = useState(
    defaultMealIngrdntFormsState
  );
  const [mealIngrdntUserType, changeMealIngrdntUserType] = useState(
    defaultMealIngrdntsFormsUserType
  );
  const [genRecipeIngrdntUserType, changeGenRecipeIngrdntUserType] = useState(
    defaultMealIngrdntsFormsUserType
  );
  const [ingrdntUserType, changeIngrdntUserType] = useState(
    defaultMealIngrdntsFormsUserType
  );
  const onChange = () => {
    console.log("changing value");
  };
  const onClickEdit = (parentObj, stateObj) => {
    props.onClickEditMealIngrdntForms("mealIngredientForms");
    if (stateObj === "mealIngredient") {
      changeMealIngrdntFormState("editingOrig");
      changeMealIngrdntUserType(defaultMealIngrdntsFormsUserType);
      changeGenRecipeIngrdntFormState("viewing");
      changeGenRecipeIngrdntUserType("viewer");
      changeIngrdntFormState("viewing");
      changeIngrdntUserType("viewer");
    }
    if (stateObj === "genRecipeIngredient") {
      changeMealIngrdntFormState("viewing");
      changeMealIngrdntUserType("viewer");
      changeGenRecipeIngrdntFormState("editingOrig");
      changeGenRecipeIngrdntUserType(defaultMealIngrdntsFormsUserType);
      changeIngrdntFormState("viewing");
      changeIngrdntUserType("viewer");
    }
    if (stateObj === "ingredient") {
      changeMealIngrdntFormState("viewing");
      changeMealIngrdntUserType("viewer");
      changeGenRecipeIngrdntFormState("viewing");
      changeGenRecipeIngrdntUserType("viewer");
      changeIngrdntFormState("editingOrig");
      changeIngrdntUserType(defaultMealIngrdntsFormsUserType);
    }
  };
  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIgrdntCrdTpSctn">
        <MealIngredientChild
          key={props.thisMealIngredient._id}
          thisMealIngredient={props.thisMealIngredient}
          thisRecipesIngrdnts={props.thisRecipesIngrdnts}
          allMeals={props.allMeals}
          mealIngrdntsArrayIndex={props.mealIngrdntsArrayIndex}
          userType={mealIngrdntUserType}
          thisFormState={mealIngrdntFormState}
          onSubmitFormChange={props.saveMealIngrdntChange}
          onClickEdit={onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          updateProp={props.updateProp}
        />
        <GenRecipeIngredient
          key={props.thisMealIngredient.genRecipeIngredient._id}
          thisGenRecipeIngrdnt={props.thisMealIngredient.genRecipeIngredient}
          thisMealsTypesRecipes={props.thisMealsTypesRecipes}
          allIngredients={props.allIngredients}
          mealIngrdntsArrayIndex={props.mealIngrdntsArrayIndex}
          userType={genRecipeIngrdntUserType}
          thisFormState={genRecipeIngrdntFormState}
          onSubmitFormChange={props.saveMealIngrdntChange}
          onClickEdit={onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          updateProp={props.updateProp}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <Ingredient
          key={props.thisMealIngredient.genRecipeIngredient.ingredient._id}
          thisIngrdnt={props.thisMealIngredient.genRecipeIngredient.ingredient}
          thisMealType={
            props.thisMealIngredient.genRecipeIngredient.genRecipe
              .availableMealType.code
          }
          allUnitOfMeasures={props.allUnitOfMeasures}
          allWeightTypes={props.allWeightTypes}
          allBrands={props.allBrands}
          allGRFUsers={props.allGRFUsers}
          mealIngrdntsArrayIndex={props.mealIngrdntsArrayIndex}
          userType={ingrdntUserType}
          thisFormState={ingrdntFormState}
          onSubmitFormChange={props.saveMealIngrdntChange}
          onClickEdit={onClickEdit}
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          updateProp={props.updateProp}
        />
      </div>
    </div>
  );
};
export default MealIngredientParent;
