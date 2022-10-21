import React, { useState, useEffect } from "react";
import InputCore from "./InputCore.component";
const MacroBudgetSubForm = (props) => {
  const { thisStateObj, onUpdatePropFn, getRndIntegerFn } = props;
  // const thisStateObj = props.thisStateObj ? props.thisStateObj : {};
  const thisFormState = thisStateObj ? thisStateObj.thisFormState : "";
  const valErrors = thisStateObj ? thisStateObj.valErrors : {};
  const thisWMP = thisStateObj
    ? thisStateObj.thisWMP
    : {
        calsBudget: 0,
        carbsBudget: 0,
        proteinBudget: 0,
        fatBudget: 0,
        fiberBudget: 0,
      };
  const { calsBudget, carbsBudget, proteinBudget, fatBudget, fiberBudget } =
    thisWMP;
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
          id={"accordionFull_MacroBudget" + getRndIntegerFn(10000000, 99999999)}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "accordionHeader_MacroBudget" +
                getRndIntegerFn(10000000, 99999999)
              }
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#dayAccrdn_MacroBudget" + getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_MacroBudget" + getRndIntegerFn(10000000, 99999999)}
            className="accordion-collapse collapse show"
            aria-labelledby={
              "#accordionHeader_MacroBudget" +
              getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#accordionFull_MacroBudget" + getRndIntegerFn(10000000, 99999999)
            }
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
                fieldDisabled={thisFormState === "viewing" ? true : false}
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
                fieldDisabled={thisFormState === "viewing" ? true : false}
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
                fieldDisabled={thisFormState === "viewing" ? true : false}
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
                fieldDisabled={thisFormState === "viewing" ? true : false}
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
                fieldDisabled={thisFormState === "viewing" ? true : false}
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
