import React, { useState, useEffect } from "react";
import _ from "lodash";
import CustomHeading from "./CustomHeading.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
const NewRecipeCard = (props) => {
  const typeOfRecordToChange = "genRecipe";
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { specificData, specificMethods } = specificProps;
  const { backEndHtmlRoot } = commonData;
  const {
    getRndIntegerFn,
    returnElementKey,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    trimEnteredValueFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { thisStateObj, thisStateObjBackup } = specificData;
  const {} = specificMethods;
  const {
    recordLoaded,
    thisRecord,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
    userChangedThisMealsRecipe,
    thisMealsIngrdnts,
    thisGenRcpsGenRcpIngrdnts,
  } = thisStateObj;
  const { day, genRecipe, mealType } = thisRecord;
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisMealTypeCode = mealType.code;
  const arrayIndex = null;
  const fieldsDisabled = !editingForm.genRecipe ? true : false;
  const {
    _id,
    name,
    availableMealType,
    GRFUser,
    defaultPrepInstructions,
    photoURL,
    createdAt,
    updatedAt,
  } = genRecipe;
  const thisRecordId = _id;
  const [localRecordChanged, updateLocalRecordChangedStateFn] = useState(
    recordChanged.genRecipe
  );
  const [localName, updateNameStateFn] = useState(name);
  const [prepInstr, updatePrepInstrStateFn] = useState(defaultPrepInstructions);
  const [timer, setTimerStateFn] = useState(null);
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors.genRecipe.name
  );
  const [prepInstValErrors, updatePrepInstValErrsStateFn] = useState(
    valErrors.genRecipe.defaultPrepInstructions
  );
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  const origName = thisStateObjBackup.recordLoaded
    ? thisStateObjBackup.thisRecord[typeOfRecordToChange]["name"]
    : name;
  const origPrepInstr = thisStateObjBackup.recordLoaded
    ? thisStateObjBackup.thisRecord[typeOfRecordToChange][
        "defaultPrepInstructions"
      ]
    : defaultPrepInstructions;
  function inputOnKeyUpFn() {}
  function handleUpdatePrepInst(newPrepInst) {
    updatePrepInstValErrsStateFn(["Err"]);
    updatePrepInstrStateFn(newPrepInst);
    updateLocalRecordChangedStateFn(true);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onUpdatePropFn(
        "defaultPrepInstructions",
        newPrepInst,
        typeOfRecordToChange,
        thisDayOfWeekCode,
        thisMealTypeCode,
        arrayIndex
      );
      updatePrepInstValErrsStateFn(valErrors.genRecipe.defaultPrepInstructions);
    }, 1000);
    setTimerStateFn(newTimer);
  }
  function handleCancelEditFn() {
    updateNameStateFn(origName);
    updatePrepInstrStateFn(origPrepInstr);
    updateNameValErrorsStateFn([]);
    updatePrepInstValErrsStateFn([]);
    onCancelEditFn();
  }
  function handleSaveChangesFn() {
    const updatedRecordForState = _.cloneDeep(thisRecord);
    updatedRecordForState.defaultPrepInstructions = prepInstr;
    onSaveChangesFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex
    );
  }
  useEffect(() => {
    let localPhotoURLValErrors = photoURL ? valErrors.genRecipe.photoURL : [];
    let localPrepInstValErrors = valErrors.genRecipe.defaultPrepInstructions
      ? valErrors.genRecipe.defaultPrepInstructions
      : [];
    let localNameValErrors = nameValErrors ? nameValErrors : [];
    if (
      localNameValErrors.length > 0 ||
      localPrepInstValErrors.length > 0 ||
      localPhotoURLValErrors.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
    if (!editingForm.genRecipe) {
      updateNameStateFn(name);
      updatePrepInstrStateFn(defaultPrepInstructions);
    }
  });
  useEffect(() => {
    updateNameStateFn(name);
    updatePrepInstrStateFn(defaultPrepInstructions);
    updateNameValErrorsStateFn(valErrors.genRecipe.name);
    updatePrepInstValErrsStateFn(valErrors.genRecipe.defaultPrepInstructions);
    updateLocalRecordChangedStateFn(recordChanged.genRecipe);
  }, [recordLoaded]);
  return (
    <form className="card mt-3 mb-3">
      <div className="card-header mealCardHeader">
        <div className="mealGenRecipeSctnHdr">
          <CustomHeading
            key={`customRcpDtlsHeadingFor${typeOfRecordToChange}${thisRecordId}`}
            headingLvl={5}
            recordLoaded={recordLoaded}
            headingText="Recipe Details"
            hdngIsReqFormLbl={false}
            editingForm={editingForm.genRecipe}
            headingClasses="formSctnTitle"
          />
          <NewFormControl
            key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
            commonProps={{
              commonData: {},
              commonMethods: {
                onStartEditingFn: onStartEditingFn,
                onCancelEditFn: handleCancelEditFn,
                onSaveChangesFn: handleSaveChangesFn,
                onDeleteObjFn: () => {},
                onCopyWMPFn: () => {},
              },
            }}
            specificProps={{
              specificData: {
                typeOfRecordToChange: typeOfRecordToChange,
                recordChanged: recordChanged.genRecipe,
                thisDayOfWeekCode: thisDayOfWeekCode,
                thisMealTypeCode: thisMealTypeCode,
                arrayIndex: arrayIndex,
                userType: userType.genRecipe,
                editingForm: editingForm.genRecipe,
                saveDisabled: saveDisabled,
                hasChildren: hasChildren.genRecipe,
                saveWarning:
                  "Any changes saved to this recipe will affect any meal to which it has been connected. Do you want to proceed?",
                deleteWarning: "Are you sure you want to delete this Recipe?",
                deleteChildrenWarning:
                  "You must delete all this recipe's recipe ingredients AND disconnect this recipe from any meals before you can delete it",
                recordLoaded: recordLoaded,
                thisRecordId: thisRecordId,
                justCreated: justCreated.genRecipe,
              },
              specificMethods: {},
            }}
          />
        </div>
      </div>
      <div className="card-body mealCardBody">
        <div className="mealImgNTblRow">
          <div
            className="mealImg"
            style={
              !photoURL
                ? {
                    backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                  }
                : {
                    backgroundImage: `url(${photoURL})`,
                  }
            }
          />
          <CustomHeading
            key={`customPrepInstrHeadingFor${typeOfRecordToChange}${thisRecordId}`}
            headingLvl={6}
            recordLoaded={recordLoaded}
            headingText="Prep Instructions:"
            hdngIsReqFormLbl={false}
            editingForm={editingForm.genRecipe}
            headingClasses="mealPrepInst"
          />
          <textarea
            className="form-control mealTextArea"
            disabled={fieldsDisabled}
            onChange={(e) => handleUpdatePrepInst(e.target.value)}
            value={prepInstr}
          ></textarea>
        </div>
        <div
          className="accordion accordion-flush"
          id={"genRecipeInnerAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"genRecipeInnerAccordionHeader" + thisRecordId}
            >
              <button
                className={
                  justCreated.genRecipe
                    ? "accordion-button mealInnerAccrdnBttn show"
                    : "accordion-button mealInnerAccrdnBttn collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#genRecipeInnerAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"genRecipeInnerAccrdn" + thisRecordId}
            className={
              justCreated.genRecipe
                ? "accordion-collapse show"
                : "accordion-collapse collapse"
            }
            aria-labelledby={"#genRecipeInnerAccordionHeader" + thisRecordId}
            data-bs-parent={"#genRecipeInnerAccordionFull" + thisRecordId}
          >
            <div
              className={
                justCreated.genRecipe
                  ? "accordion-body mealInnerAccordion cardHeaderFocused"
                  : "accordion-body mealInnerAccordion"
              }
            >
              <div className="form-group mealInputs">
                <NewInputWSearchUniqueNew
                  commonProps={{
                    commonData: { backEndHtmlRoot: backEndHtmlRoot },
                    commonMethods: {
                      onUpdatePropFn: onUpdatePropFn,
                      returnElementKey: returnElementKey,
                      getRndIntegerFn: getRndIntegerFn,
                      trimEnteredValueFn: trimEnteredValueFn,
                      onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
                    },
                  }}
                  specificProps={{
                    specificData: {
                      typeOfRecordToChange: typeOfRecordToChange,
                      formGroupClasses: "form-group mealInputs",
                      label: "Recipe Name",
                      thisDayOfWeekCode: thisDayOfWeekCode,
                      thisMealTypeCode: thisMealTypeCode,
                      propToUpdate: "name",
                      arrayIndex: arrayIndex,
                      fieldDisabled: fieldsDisabled,
                      valErrors: nameValErrors,
                      inputClasses: "form-control",
                      isRequired: true,
                      recordLoaded: recordLoaded,
                      propNameSentenceCase: "Name",
                      localPropValue: localName,
                      excludeLabel: false,
                      origPropValue: origName,
                      thisRecordId: thisRecordId,
                    },
                    specificMethods: {
                      changeLocalPropFn: updateNameStateFn,
                      updatePropValErrorsStateFn: updateNameValErrorsStateFn,
                    },
                  }}
                />
              </div>
              <NewInputCore
                key={returnElementKey(
                  null,
                  "NewInputCore",
                  "photoURL",
                  typeOfRecordToChange,
                  arrayIndex,
                  thisMealTypeCode,
                  thisDayOfWeekCode
                )}
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
                    formGroupClasses: "form-group mealInputs",
                    label: "Photo URL",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    propToUpdate: "photoURL",
                    arrayIndex: arrayIndex,
                    fieldDisabled: fieldsDisabled,
                    valErrors: valErrors.genRecipe.photoURL,
                    inputClasses: "form-control",
                    isRequired: false,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    inputTypeForHtml: "url",
                    propValue: photoURL,
                  },
                  specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
                }}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForAuthorForGenRecipe${thisRecordId}`}
                formGroupClasses={"form-group mealInputs"}
                label="Author "
                inputClasses="form-control"
                propType="text"
                propValue={GRFUser.handle}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.genRecipe.GRFUser}
                getRndIntegerFn={getRndIntegerFn}
              />
            </div>
            <div className="card-body mealCardBody">
              <div
                className="accordion accordion-flush"
                id={"mealHiddenAccordionFull" + thisRecordId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"mealHiddenAccordionHeader" + thisRecordId}
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#mealHiddenAccrdn" + thisRecordId}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"mealHiddenAccrdn" + thisRecordId}
                  className="accordion-collapse collapse"
                  aria-labelledby={"#mealHiddenAccordionHeader" + thisRecordId}
                  data-bs-parent={"#mealHiddenAccordionFull" + thisRecordId}
                >
                  <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
                    <ReadOnlyInputCore
                      key={`readOnlyInputForAvlMlTypForGenRecipe${thisRecordId}`}
                      formGroupClasses={"form-group"}
                      label="Available Meal Type "
                      inputClasses="form-control"
                      propType="text"
                      propValue={availableMealType.name}
                      recordLoaded={recordLoaded}
                      excludeLabel={false}
                      valErrors={valErrors.genRecipe.availableMealType}
                      getRndIntegerFn={getRndIntegerFn}
                    />
                    <ReadOnlyInputCore
                      key={`readOnlyInputForIdForGenRecipe${thisRecordId}`}
                      formGroupClasses={"form-group"}
                      label="Record ID "
                      inputClasses="form-control"
                      propType="text"
                      propValue={_id}
                      recordLoaded={recordLoaded}
                      excludeLabel={false}
                      valErrors={valErrors.genRecipe._id}
                      getRndIntegerFn={getRndIntegerFn}
                    />
                    <ReadOnlyInputCore
                      key={`readOnlyInputForCreatedDtForGenRecipe${thisRecordId}`}
                      formGroupClasses={"form-group"}
                      label="Created "
                      inputClasses="form-control"
                      propType="text"
                      propValue={createdAt}
                      recordLoaded={recordLoaded}
                      excludeLabel={false}
                      valErrors={valErrors.genRecipe.createdAt}
                      getRndIntegerFn={getRndIntegerFn}
                    />
                    <ReadOnlyInputCore
                      key={`readOnlyInputForUpdatedDtForGenRecipe${thisRecordId}`}
                      formGroupClasses={"form-group"}
                      label="Last Update "
                      inputClasses="form-control"
                      propType="text"
                      propValue={updatedAt}
                      recordLoaded={recordLoaded}
                      excludeLabel={false}
                      valErrors={valErrors.genRecipe.updatedAt}
                      getRndIntegerFn={getRndIntegerFn}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewRecipeCard;
