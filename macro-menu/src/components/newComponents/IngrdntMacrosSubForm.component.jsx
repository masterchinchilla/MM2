import React from "react";
import InputCore from "./InputCore.component";
const IngrdntMacrosSubForm = (props) => {
  const { thisRecordId, onUpdatePropFn } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            ingredient: {
              photoURL: "",
              calories: 1,
              carbs: 1,
              protein: 1,
              fat: 1,
              fiber: 1,
            },
          },
          meal: {
            day: { dayOfWeek: { code: "sunday" } },
            mealType: { code: "breakfast" },
          },
        },
        editingForm: { ingredient: false },
        valErrors: { ingredient: [] },
        recordLoaded: false,
      };
  const { arrayIndex, editingForm, valErrors, recordLoaded } = thisStateObj;
  const fieldsDisabled = !editingForm.ingredient ? true : false;
  const thisRecord = thisStateObj.thisRecord.genRecipeIngredient.ingredient;
  const { photoURL, calories, carbs, protein, fat, fiber } = thisRecord;
  const typeOfRecordToChange = "ingredient";
  const { day, mealType } = thisStateObj.thisRecord.meal;
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  return (
    <div className="accordion-body ingrdntInnrAccrdn">
      <InputCore
        key={`inputForCalsFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Calories"
        propType="float"
        inputTypeForHtml={"number"}
        propValue={calories}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"calories"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={
          valErrors.ingredient.calories ? valErrors.ingredient.calories : null
        }
        inputClasses="form-control"
        isRequired={true}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
      <InputCore
        key={`inputForCarbsFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Carbs"
        propType="float"
        inputTypeForHtml={"number"}
        propValue={carbs}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"carbs"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={
          valErrors.ingredient.carbs ? valErrors.ingredient.carbs : null
        }
        inputClasses="form-control"
        isRequired={true}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
      <InputCore
        key={`inputForProteinFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Protein"
        propType="float"
        inputTypeForHtml={"number"}
        propValue={protein}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"protein"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={
          valErrors.ingredient.protein ? valErrors.ingredient.protein : null
        }
        inputClasses="form-control"
        isRequired={true}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
      <InputCore
        key={`inputForFatFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Fat"
        propType="float"
        inputTypeForHtml={"number"}
        propValue={fat}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"fat"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={valErrors.ingredient.fat ? valErrors.ingredient.fat : null}
        inputClasses="form-control"
        isRequired={true}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
      <InputCore
        key={`inputForFiberFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Fiber"
        propType="float"
        inputTypeForHtml={"number"}
        propValue={fiber}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"fiber"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={
          valErrors.ingredient.fiber ? valErrors.ingredient.fiber : null
        }
        inputClasses="form-control"
        isRequired={true}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
      <InputCore
        key={`inputForPhotoURLFor${typeOfRecordToChange}${thisRecordId}`}
        formGroupClasses="form-group mealIngrdntInputs"
        label="Photo URL"
        propType="url"
        inputTypeForHtml={"url"}
        propValue={photoURL ? photoURL : ""}
        onUpdatePropFn={onUpdatePropFn}
        inputOnKeyUpFn={() => {}}
        recordToChange="ingredient"
        thisDayOfWeekCode={thisDayOfWeekCode}
        thisMealTypeCode={thisMealTypeCode}
        propToUpdate={"photoURL"}
        arrayIndex={arrayIndex}
        selectedFrom={[]}
        fieldDisabled={fieldsDisabled}
        valError={
          valErrors.ingredient.photoURL ? valErrors.ingredient.photoURL : null
        }
        inputClasses="form-control"
        isRequired={false}
        recordLoaded={recordLoaded}
        excludeLabel={false}
      />
    </div>
  );
};

export default IngrdntMacrosSubForm;
