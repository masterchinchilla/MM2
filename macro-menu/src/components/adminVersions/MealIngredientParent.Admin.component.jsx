import React, { Component } from "react";
import MealIngredientChildAdmin from "./MealIngredientChild.Admin.component";
import GenRecipeIngredientAdmin from "./GenRecipeIngredient.Admin.component";
import IngredientAdmin from "./Ingredient.Admin.component";

const MealIngredientParentAdmin = (props) => {
  const thisMealIngrdntObj = props.thisMealIngrdntObj;
  const thisObj = thisMealIngrdntObj.thisMealIngrdnt;
  const thisGRFUser = props.thisGRFUser;
  const thisObjId = thisObj._id;
  const thisMealTypeCode = thisObj.meal.mealType.code;
  const thisGenRecipeIngrdnt = thisObj.genRecipeIngredient;
  const thisRecipesIngrdnts = props.thisRecipesIngrdnts;
  const thisIngredient = thisGenRecipeIngrdnt.ingredient;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  //Form States
  const thisMealIngrdntFormState = thisMealIngrdntObj.thisMealIngrdntFormState;
  const thisGenRecipeIngrdntFormState =
    thisMealIngrdntObj.thisGenRecipeIngrdntFormState;
  const thisIngrdntFormState = thisMealIngrdntObj.thisIngrdntFormState;
  //User Types
  const thisMealIngrdntUserType = thisMealIngrdntObj.thisMealIngrdntUserType;
  const thisGenRecipeIngrdntUserType =
    thisMealIngrdntObj.thisGenRecipeIngrdntUserType;
  const thisIngrdntUserType = thisMealIngrdntObj.thisIngrdntUserType;

  return (
    <div className="card mlIngrdntsCard">
      <div className="card-header mlIgrdntCrdTpSctn">
        <MealIngredientChildAdmin
          //Specific Props
          //Data
          key={"mealIngrdntChild" + thisObjId}
          userType={thisMealIngrdntUserType}
          thisFormState={thisMealIngrdntFormState}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisMealIngrdntObj={thisMealIngrdntObj}
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
        <GenRecipeIngredientAdmin
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
          thisGRFUser={thisGRFUser}
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisMealIngrdntObj={thisMealIngrdntObj}
          thisObj={thisGenRecipeIngrdnt}
          // allIngredients={props.allIngredients}
          //Methods
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={props.onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onUpdateProp={props.onUpdateProp}
          onCreateRecord={props.onCreateRecord}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <IngredientAdmin
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
          thisMealIngrdntObj={thisMealIngrdntObj}
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
export default MealIngredientParentAdmin;
