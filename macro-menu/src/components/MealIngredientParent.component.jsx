import React, { Component } from "react";
import MealIngredientChild from "./MealIngredientChild.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
import Ingredient from "./Ingredient.component";

const MealIngredientParent = (props) => {
  const thisStateObj = props.thisStateObj;
  const thisObj = thisStateObj.thisMealIngrdnt;
  const thisObjId = thisObj._id;
  const thisMealTypeCode = thisObj.meal.mealType.code;
  const thisGenRecipeIngrdnt = thisObj.genRecipeIngredient;
  const thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  const thisIngredient = thisGenRecipeIngrdnt.ingredient;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  //Form States
  const thisMealIngrdntFormState = thisStateObj.thisMealIngrdntFormState;
  const thisGenRecipeIngrdntFormState =
    thisStateObj.thisGenRecipeIngrdntFormState;
  const thisIngrdntFormState = thisStateObj.thisIngrdntFormState;
  //User Types
  const thisMealIngrdntUserType = thisStateObj.thisMealIngrdntUserType;
  const thisGenRecipeIngrdntUserType =
    thisStateObj.thisGenRecipeIngrdntUserType;
  const thisIngrdntUserType = thisStateObj.thisIngrdntUserType;

  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIgrdntCrdTpSctn">
        <MealIngredientChild
          //Specific Props
          //Data
          key={"mealIngrdntChild" + thisObjId}
          userType={thisMealIngrdntUserType}
          thisFormState={thisMealIngrdntFormState}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisStateObj={thisStateObj}
          thisObj={thisObj}
          thisRecipesIngrdnts={thisRecipesIngrdnts}
          thisMealTypesMeals={props.thisMealTypesMeals}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
        />
        <GenRecipeIngredient
          //Specific Props
          //Data
          key={thisGenRecipeIngrdnt._id}
          userType={thisGenRecipeIngrdntUserType}
          thisFormState={thisGenRecipeIngrdntFormState}
          thisMealTypesRecipes={props.thisMealTypesRecipes}
          thisMealTypeCode={thisMealTypeCode}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisStateObj={thisStateObj}
          thisObj={thisGenRecipeIngrdnt}
          allIngredients={props.allIngredients}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <Ingredient
          //Specific Props
          //Data
          key={thisIngredient._id}
          userType={thisIngrdntUserType}
          thisFormState={thisIngrdntFormState}
          thisMealTypeCode={thisMealTypeCode}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisStateObj={thisStateObj}
          thisObj={thisIngredient}
          allGRFUsers={props.allGRFUsers}
          allUnitOfMeasures={props.allUnitOfMeasures}
          allWeightTypes={props.allWeightTypes}
          allBrands={props.allBrands}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
        />
      </div>
    </div>
  );
};
export default MealIngredientParent;
