import React from "react";
import CustomHeading from "./CustomHeading.component";
import NewInputCore from "./NewInputCore.component";
const NewMacroBudgetSubForm = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const { editingForm, thisRecord, valErrors, recordLoaded } = thisStateObj;
  const {
    _id,
    calsBudget,
    carbsBudget,
    proteinBudget,
    fatBudget,
    fiberBudget,
  } = thisRecord;
  const thisRecordId = _id;
  const typeOfRecordToChange = "weekMealPlan";
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const arrayIndex = null;
  function inputOnKeyUpFn() {}
  return (
    <div className="card weekMealPlanFormCards mt-3 mb-3">
      <div className="card-header">
        <CustomHeading
          key={`CustomHeading for "Macro Daily Budget" for wmp ${thisRecordId}`}
          headingLvl={2}
          recordLoaded={recordLoaded}
          headingText="Macro Daily Budget"
          hdngIsReqFormLbl={false}
          editingForm={editingForm.weekMealPlan}
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
              <NewInputCore
                key={`NewInputCore for calsBudget for wmp ${thisRecordId}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "badge bg-primary weekMealPlanMacroBadge",
                    label: "Calories (g)",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "calsBudget",
                    arrayIndex: arrayIndex,
                    fieldDisabled: editingForm.weekMealPlan ? false : true,
                    valErrors: valErrors.weekMealPlan.calsBudget,
                    inputClasses: "form-control weekMealPlanMacroInput",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "number",
                    propValue: calsBudget,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={`NewInputCore for carbsBudget for wmp ${thisRecordId}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "badge bg-primary weekMealPlanMacroBadge",
                    label: "Carbs (g)",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "carbsBudget",
                    arrayIndex: arrayIndex,
                    fieldDisabled: editingForm.weekMealPlan ? false : true,
                    valErrors: valErrors.weekMealPlan.carbsBudget,
                    inputClasses: "form-control weekMealPlanMacroInput",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "number",
                    propValue: carbsBudget,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={`NewInputCore for proteinBudget for wmp ${thisRecordId}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "badge bg-primary weekMealPlanMacroBadge",
                    label: "Protein (g)",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "proteinBudget",
                    arrayIndex: arrayIndex,
                    fieldDisabled: editingForm.weekMealPlan ? false : true,
                    valErrors: valErrors.weekMealPlan.proteinBudget,
                    inputClasses: "form-control weekMealPlanMacroInput",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "number",
                    propValue: proteinBudget,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={`NewInputCore for fatBudget for wmp ${thisRecordId}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "badge bg-primary weekMealPlanMacroBadge",
                    label: "Fat (g)",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "fatBudget",
                    arrayIndex: arrayIndex,
                    fieldDisabled: editingForm.weekMealPlan ? false : true,
                    valErrors: valErrors.weekMealPlan.fatBudget,
                    inputClasses: "form-control weekMealPlanMacroInput",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "number",
                    propValue: fatBudget,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <NewInputCore
                key={`NewInputCore for fiberBudget for wmp ${thisRecordId}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: typeOfRecordToChange,
                    formGroupClasses: "badge bg-primary weekMealPlanMacroBadge",
                    label: "Fiber (g)",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "fiberBudget",
                    arrayIndex: arrayIndex,
                    fieldDisabled: editingForm.weekMealPlan ? false : true,
                    valErrors: valErrors.weekMealPlan.fiberBudget,
                    inputClasses: "form-control weekMealPlanMacroInput",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "number",
                    propValue: fiberBudget,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMacroBudgetSubForm;
