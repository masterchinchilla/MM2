import React, { useState, useEffect } from "react";
import InputCore from "./InputCore.component";
const MacroBudgetSubForm = (props) => {
  const { onUpdatePropFn } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        editingForm: false,
        thisRecord: {
          _id: 1,
          calsBudget: 0,
          carbsBudget: 0,
          proteinBudget: 0,
          fatBudget: 0,
          fiberBudget: 0,
        },
        valErrors: {},
      };
  const { editingForm, thisRecord, valErrors } = thisStateObj;
  const {
    _id,
    calsBudget,
    carbsBudget,
    proteinBudget,
    fatBudget,
    fiberBudget,
  } = thisRecord;
  const thisRecordId = _id;
  function inputOnKeyUpFn() {
    console.log("Key up");
  }
  return (
    <div className="card weekMealPlanFormCards mt-3 mb-3">
      <div className="card-header">
        <h2 className="card-title">Macro Daily Budget</h2>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_MacroBudget" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader_MacroBudget" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn_MacroBudget" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_MacroBudget" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader_MacroBudget" + thisRecordId}
            data-bs-parent={"#accordionFull_MacroBudget" + thisRecordId}
          >
            <div className="accordion-body accrdnWeekMealPlanMacroBdy">
              <InputCore
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Calories (g)"
                propType="float"
                propValue={calsBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={inputOnKeyUpFn}
                recordToChange="weekMealPlan"
                thisDayOfWeekCode=""
                thisMealTypeCode=""
                propToUpdate={"calsBudget"}
                arrayIndex={0}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.calsBudget ? valErrors.calsBudget : ""}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
              />
              <InputCore
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Carbs (g)"
                propType="float"
                propValue={carbsBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={inputOnKeyUpFn}
                recordToChange="weekMealPlan"
                thisDayOfWeekCode=""
                thisMealTypeCode=""
                propToUpdate={"carbsBudget"}
                arrayIndex={0}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.carbsBudget ? valErrors.carbsBudget : ""}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
              />
              <InputCore
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Protein (g)"
                propType="float"
                propValue={proteinBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={inputOnKeyUpFn}
                recordToChange="weekMealPlan"
                thisDayOfWeekCode=""
                thisMealTypeCode=""
                propToUpdate={"proteinBudget"}
                arrayIndex={0}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={
                  valErrors.proteinBudget ? valErrors.proteinBudget : ""
                }
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
              />
              <InputCore
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Fat (g)"
                propType="float"
                propValue={fatBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={inputOnKeyUpFn}
                recordToChange="weekMealPlan"
                thisDayOfWeekCode=""
                thisMealTypeCode=""
                propToUpdate={"fatBudget"}
                arrayIndex={0}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.fatBudget ? valErrors.fatBudget : ""}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
              />
              <InputCore
                formGroupClasses="badge bg-primary weekMealPlanMacroBadge"
                label="Fiber (g)"
                propType="float"
                propValue={fiberBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={inputOnKeyUpFn}
                recordToChange="weekMealPlan"
                thisDayOfWeekCode=""
                thisMealTypeCode=""
                propToUpdate={"fiberBudget"}
                arrayIndex={0}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.fiberBudget ? valErrors.fiberBudget : ""}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroBudgetSubForm;
