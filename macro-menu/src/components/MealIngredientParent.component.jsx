import React from "react";
import MealIngredientChild from "./MealIngredientChild.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
import Ingredient from "./Ingredient.component";
const MealIngredientParent = (props) => {
  const {
    thisMealIngrdntObj,
    thisRecipesIngrdnts,
    mealIngrdntsArrayIndex,
    onClickEditForm,
    onCancelEditForm,
    onSaveFormChanges,
    onDeleteRecord,
    onUpdateProp,
    onCreateRecord,
    thisMealTypesRecipes,
    thisMealIngrdntStateObjOld,
    thisGRFUser,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
    backEndHtmlRoot,
  } = props;
  const thisObj = thisMealIngrdntObj.thisMealIngrdnt;
  const thisObjId = thisObj._id;
  const thisMealTypeCode = thisObj.meal.mealType.code;
  const thisGenRecipeIngrdnt = thisObj.genRecipeIngredient;
  const thisIngredient = thisGenRecipeIngrdnt.ingredient;
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
          thisMealIngrdntObj={thisMealIngrdntObj}
          thisObj={thisObj}
          thisRecipesIngrdnts={thisRecipesIngrdnts}
          //Methods
          onClickEditForm={onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={onSaveFormChanges}
          onDeleteRecord={onDeleteRecord}
          onUpdateProp={onUpdateProp}
        />
        <GenRecipeIngredient
          //Specific Props
          //Data
          key={thisGenRecipeIngrdnt._id}
          userType={thisGenRecipeIngrdntUserType}
          thisFormState={thisGenRecipeIngrdntFormState}
          thisMealTypesRecipes={thisMealTypesRecipes}
          thisMealTypeCode={thisMealTypeCode}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisMealIngrdntObj={thisMealIngrdntObj}
          thisObj={thisGenRecipeIngrdnt}
          thisGRFUser={thisGRFUser}
          //Methods
          onClickEditForm={onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={onSaveFormChanges}
          onDeleteRecord={onDeleteRecord}
          onUpdateProp={onUpdateProp}
          onCreateRecord={onCreateRecord}
        />
      </div>
      <div className="mlIngrdntCrdBttmSctn">
        <Ingredient
          //Specific Props
          //Data
          key={thisIngredient._id}
          userType={thisIngrdntUserType}
          thisFormState={thisIngrdntFormState}
          //Methods
          //Common Props
          //Data
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          thisMealIngrdntObj={thisMealIngrdntObj}
          thisObj={thisIngredient}
          thisIngrdntOld={
            thisMealIngrdntStateObjOld.thisMealIngrdnt.genRecipeIngredient
              .ingredient
          }
          thisGRFUser={thisGRFUser}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
          backEndHtmlRoot={backEndHtmlRoot}
          //Methods
          onClickEditForm={onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={onSaveFormChanges}
          onDeleteRecord={onDeleteRecord}
          onUpdateProp={onUpdateProp}
          onCreateRecord={onCreateRecord}
        />
      </div>
    </div>
  );
};
export default MealIngredientParent;
