import React, { useState, useEffect } from "react";
import CustomHeading from "./CustomHeading.component";
import NewWMPNameAndDisabledFieldsSubForm from "./NewWMPNameAndDisabledFieldsSubForm.component";
import MacroBudgetSubFormWrapper from "./MacroBudgetSubFormWrapper.component";
import MealWeightingSubFormWrapper from "./MealWeightingSubFormWrapper.component";
const NewWeekMealPlanCard = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot, mode } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
    onCopyWMPFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { onUpdateWeightsFn } = specificMethods;
  const { thisStateObjBackup } = specificData;
  let thisStateObj = specificData.thisStateObj.recordLoaded
    ? specificData.thisStateObj
    : {
        thisRecord: {
          _id: getRndIntegerFn(10000000, 99999999),
          GRFUser: { handle: "" },
          name: "",
          createdAt: "",
          updatedAt: "",
          calsBudget: 0,
          carbsBudget: 0,
          proteinBudget: 0,
          fatBudget: 0,
          fiberBudget: 0,
          breakfastWeight: 0,
          snack1Weight: 0,
          lunchWeight: 0,
          snack2Weight: 0,
          dinnerWeight: 0,
          dessertWeight: 0,
        },
        recordLoaded: false,
        editingForm: { weekMealPlan: false },
        recordChanged: { weekMealPlan: false },
        valErrors: {
          weekMealPlan: {
            name: [],
            calsBudget: [],
            carbsBudget: [],
            proteinBudget: [],
            fatBudget: [],
            fiberBudget: [],
            breakfastWeight: [],
            snack1Weight: [],
            lunchWeight: [],
            snack2Weight: [],
            dinnerWeight: [],
            dessertWeight: [],
          },
        },
        justCreated: { weekMealPlan: false },
        userType: { weekMealPlan: "viewer" },
        hasChildren: { weekMealPlan: true },
        allowCopy: { weekMealPlan: false },
      };
  const { thisRecord, recordLoaded, valErrors, recordChanged, justCreated } =
    thisStateObj;
  const { _id, name } = thisRecord;
  const thisRecordId = _id;
  const typeOfRecordToChange = "weekMealPlan";
  const [localName, updateNameStateFn] = useState(name);
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors.weekMealPlan.name
  );
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  const [changesCancelled, toggleChangesCancelled] = useState(false);
  const origName = thisStateObjBackup.thisRecord
    ? thisStateObjBackup.thisRecord.name
    : name;
  function handleCancelEditFn() {
    updateNameValErrorsStateFn(valErrors.weekMealPlan.name);
    toggleChangesCancelled(true);
    const rcrdIdJstCrtd = justCreated.weekMealPlan ? thisRecordId : null;
    onCancelEditFn(rcrdIdJstCrtd, null);
  }
  useEffect(() => {
    if (
      nameValErrors.length > 0 ||
      valErrors.weekMealPlan.breakfastWeight.length > 0 ||
      valErrors.weekMealPlan.snack1Weight.length > 0 ||
      valErrors.weekMealPlan.lunchWeight.length > 0 ||
      valErrors.weekMealPlan.snack2Weight.length > 0 ||
      valErrors.weekMealPlan.dinnerWeight.length > 0 ||
      valErrors.weekMealPlan.dessertWeight.length > 0 ||
      valErrors.weekMealPlan.calsBudget.length > 0 ||
      valErrors.weekMealPlan.carbsBudget.length > 0 ||
      valErrors.weekMealPlan.proteinBudget.length > 0 ||
      valErrors.weekMealPlan.fatBudget.length > 0 ||
      valErrors.weekMealPlan.fiberBudget.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  useEffect(() => {
    updateNameStateFn(name);
    updateNameValErrorsStateFn(valErrors.weekMealPlan.name);
  }, [recordLoaded]);
  return (
    <div
      className={mode === `builder` ? `card` : `card sprdshtCard wmpSprdShtCrd`}
    >
      <div className="card-header">
        <CustomHeading
          key={`CustomHeading for "Week Meal Plan Builder" for WMPCard for WMP ${thisRecordId}`}
          headingLvl={1}
          recordLoaded={recordLoaded}
          headingText={`Week Meal Plan ${
            mode === `builder` ? `Builder` : `Spreadsheet`
          }`}
          hdngIsReqFormLbl={false}
          editingForm={null}
          headingClasses={`card-title${
            mode === `spreadsheet` ? ` sprdshtCardHeading` : ``
          }`}
        />
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_WMPDetails" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader_WMPDetails" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn_WMPDetails" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_WMPDetails" + thisRecordId}
            className={`accordion-collapse collapse show${
              mode === `spreadsheet` ? ` wmpTblAccrdn` : ``
            }`}
            aria-labelledby={"#accordionHeader_WMPDetails" + thisRecordId}
            data-bs-parent={"#accordionFull_WMPDetails" + thisRecordId}
          >
            <div className="accordion-body accrdnWMPDetailsBdy">
              <form
                className={mode === `builder` ? `card` : `card sprdshtFormCard`}
              >
                <NewWMPNameAndDisabledFieldsSubForm
                  key={`NewWMPNameAndDisabledFieldsSubForm for WMP ${thisRecordId}`}
                  commonProps={{
                    commonData: {
                      backEndHtmlRoot: backEndHtmlRoot,
                      mode: mode,
                    },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      onUpdatePropFn: onUpdatePropFn,
                      onSaveChangesFn: onSaveChangesFn,
                      onStartEditingFn: onStartEditingFn,
                      onCancelEditFn: handleCancelEditFn,
                      onDeleteObjFn: onDeleteObjFn,
                      returnElementKey: returnElementKey,
                      trimEnteredValueFn: trimEnteredValueFn,
                      onCopyWMPFn: onCopyWMPFn,
                      onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisStateObj: thisStateObj,
                      // thisStateObjBackup: thisStateObjBackup,
                      localName: localName,
                      nameValErrors: nameValErrors,
                      saveDisabled: saveDisabled,
                      origName: origName,
                    },
                    specificMethods: {
                      updateNameStateFn: updateNameStateFn,
                      updateNameValErrorsStateFn: updateNameValErrorsStateFn,
                    },
                  }}
                />
                <MacroBudgetSubFormWrapper
                  key={`MacroBudgetSubFormWrapper for WMP ${thisRecordId}`}
                  commonProps={{
                    commonData: { mode: mode },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                      trimEnteredValueFn: trimEnteredValueFn,
                    },
                  }}
                  specificProps={{
                    specificData: { thisStateObj: thisStateObj },
                    specificMethods: {},
                  }}
                />
                {/* <NewMacroBudgetSubForm
                  key={`NewMacroBudgetSubForm for WMP ${thisRecordId}`}
                  commonProps={{
                    commonData: { mode: mode },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                      trimEnteredValueFn: trimEnteredValueFn,
                    },
                  }}
                  specificProps={{
                    specificData: { thisStateObj: thisStateObj },
                    specificMethods: {},
                  }}
                /> */}
                <MealWeightingSubFormWrapper
                  key={`MealWeightingSubFormWrapper for WMP ${thisRecordId}`}
                  commonProps={{
                    commonData: { mode: mode },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisStateObj: thisStateObj,
                      changesCancelled: changesCancelled,
                    },
                    specificMethods: {
                      onUpdateWeightsFn: onUpdateWeightsFn,
                      toggleChangesCancelled: toggleChangesCancelled,
                    },
                  }}
                />
                {/* <NewMealWeightingSubForm
                  key={`NewMealWeightingSubForm for WMP ${thisRecordId}`}
                  commonProps={{
                    commonData: { mode: mode },
                    commonMethods: {
                      getRndIntegerFn: getRndIntegerFn,
                      returnElementKey: returnElementKey,
                      onUpdatePropFn: onUpdatePropFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      thisStateObj: thisStateObj,
                      changesCancelled: changesCancelled,
                    },
                    specificMethods: {
                      onUpdateWeightsFn: onUpdateWeightsFn,
                      toggleChangesCancelled: toggleChangesCancelled,
                    },
                  }}
                /> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWeekMealPlanCard;
