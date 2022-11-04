import React, { useState, useEffect } from "react";
import CustomHeading from "./CustomHeading.component";
import InputCore from "./InputCore.component";
const MacroBudgetSubForm = (props) => {
  const { onUpdatePropFn, getRndIntegerFn } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
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
        recordLoaded: false,
      };
  const { editingForm, thisRecord, valErrors, recordLoaded } = thisStateObj;
  const {
    _id,
    calsBudget,
    carbsBudget,
    proteinBudget,
    fatBudget,
    fiberBudget,
  } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "weekMealPlan";
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const arrayIndex = 0;
  const wmpMacroFormGrpClasses = "badge bg-primary weekMealPlanMacroBadge";
  return (
    <div className="card weekMealPlanFormCards mt-3 mb-3">
      <div className="card-header">
        <CustomHeading
          headingLvl={2}
          recordLoaded={recordLoaded}
          headingText="Macro Daily Budget"
          hdngIsReqFormLbl={false}
          headingClasses="card-title"
        />
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
                key={`inputCoreForCalsBdgtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={wmpMacroFormGrpClasses}
                label="Calories (g)"
                propType="float"
                inputTypeForHtml={"number"}
                propValue={calsBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={() => {}}
                recordToChange={typeOfRecordToChange}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                propToUpdate={"calsBudget"}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.calsBudget ? valErrors.calsBudget : []}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <InputCore
                key={`inputCoreForCarbsBdgtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={wmpMacroFormGrpClasses}
                label="Carbs (g)"
                propType="float"
                inputTypeForHtml={"number"}
                propValue={carbsBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={() => {}}
                recordToChange={typeOfRecordToChange}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                propToUpdate={"carbsBudget"}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.carbsBudget ? valErrors.carbsBudget : []}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <InputCore
                key={`inputCoreForProteinBdgtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={wmpMacroFormGrpClasses}
                label="Protein (g)"
                propType="float"
                inputTypeForHtml={"number"}
                propValue={proteinBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={() => {}}
                recordToChange={typeOfRecordToChange}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                propToUpdate={"proteinBudget"}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={
                  valErrors.proteinBudget ? valErrors.proteinBudget : []
                }
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <InputCore
                key={`inputCoreForFatBdgtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={wmpMacroFormGrpClasses}
                label="Fat (g)"
                propType="float"
                inputTypeForHtml={"number"}
                propValue={fatBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={() => {}}
                recordToChange={typeOfRecordToChange}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                propToUpdate={"fatBudget"}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.fatBudget ? valErrors.fatBudget : []}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <InputCore
                key={`inputCoreForFiberBdgtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={wmpMacroFormGrpClasses}
                label="Fiber (g)"
                propType="float"
                inputTypeForHtml={"number"}
                propValue={fiberBudget}
                onUpdatePropFn={onUpdatePropFn}
                inputOnKeyUpFn={() => {}}
                recordToChange={typeOfRecordToChange}
                thisDayOfWeekCode={thisDayOfWeekCode}
                thisMealTypeCode={thisMealTypeCode}
                arrayIndex={arrayIndex}
                propToUpdate={"fiberBudget"}
                selectedFrom={[]}
                fieldDisabled={!editingForm ? true : false}
                valError={valErrors.fiberBudget ? valErrors.fiberBudget : []}
                inputClasses="form-control weekMealPlanMacroInput"
                isRequired={true}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroBudgetSubForm;
