import React from "react";
import CustomHeading from "./CustomHeading.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";

const MealIngredientChildForm = (props) => {
  const typeOfRecordToChange = "mealIngredient";
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
    onDeleteObjFn,
    trimEnteredValueFn,
  } = commonMethods;
  const { thisStateObj, thisStateObjBackup } = specificData;
  // thisStateObj.recordLoaded = false;
  if (!thisStateObj.recordLoaded) {
    thisStateObj.valErrors.mealIngredient = {
      _id: [],
      createdAt: [],
      updatedAt: [],
      meal: [],
      qty: [],
      genRecipeIngredient: [],
    };
  }
  // console.log(thisStateObj);
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
    arrayIndex,
  } = thisStateObj;
  const { _id, meal, createdAt, updatedAt, genRecipeIngredient, qty } =
    thisRecord;
  const { mealType, day } = meal;
  const thisMealTypeCode = mealType.code;
  const thisDayOfWeekCode = day.dayOfWeek.code;
  const thisRecordId = _id;
  const saveDisabled = valErrors.mealIngredient.qty.length > 0 ? true : false;
  const fieldsDisabled = !editingForm.mealIngredient ? true : false;
  function inputOnKeyUpFn() {}
  return (
    <form className="mlIngrdntFrm">
      <div className="mlIngrdntFrmHdr">
        <CustomHeading
          key={`CustomHeading for "Qty" for mealIngredient ${thisRecordId}`}
          headingLvl={6}
          recordLoaded={recordLoaded}
          headingText="Qty"
          hdngIsReqFormLbl={true}
          editingForm={editingForm.mealIngredient}
          headingClasses="mlIngrdntHdr doubleHeightLabel"
        />
        <NewFormControl
          key={`NewFormControl for mealIngredient ${thisRecordId}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onSaveChangesFn: onSaveChangesFn,
              onDeleteObjFn: onDeleteObjFn,
              onCopyWMPFn: () => {},
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              recordChanged: recordChanged.mealIngredient,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
              userType: userType.mealIngredient,
              editingForm: editingForm.mealIngredient,
              saveDisabled: saveDisabled,
              hasChildren: hasChildren.mealIngredient,
              saveWarning: null,
              deleteWarning:
                "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?",
              deleteChildrenWarning: "",
              recordLoaded: recordLoaded,
              formControlLineage: `mealIngredient ${thisRecordId}`,
            },
            specificMethods: {},
          }}
        />
        <NewInputCore
          key={`NewInputCore for qty for mealIngredient ${thisRecordId}`}
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
              formGroupClasses: "",
              label: "",
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              propToUpdate: "qty",
              arrayIndex: arrayIndex,
              fieldDisabled: fieldsDisabled,
              valErrors: valErrors.mealIngredient.qty,
              inputClasses: "form-control mlIngrdntQty",
              isRequired: true,
              recordLoaded: recordLoaded,
              excludeLabel: true,
              inputTypeForHtml: "number",
              propValue: qty,
              propLineage: `mealIngredient ${thisRecordId}`,
            },
            specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
          }}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"mlIngrdntFrmAccrdnFll" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"mlIngrdntFrmAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#mlIngrdntFrmAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"mlIngrdntFrmAccrdn" + thisRecordId}
          className="accordion-collapse collapse"
          aria-labelledby={"#mlIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#mlIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <CustomHeading
                key={`CustomHeading for "Custom Ingredient" for mealIngredient ${thisRecordId}`}
                headingLvl={6}
                recordLoaded={recordLoaded}
                headingText="Custom Ingredient"
                hdngIsReqFormLbl={false}
                editingForm={editingForm.mealIngredient}
                headingClasses="mealIngrdntHdr"
              />
              <ReadOnlyInputCore
                key={`ReadOnlyInputCore for genRecipeIngredient name for mealIngredient ${thisRecordId}`}
                formGroupClasses={"ingrdntFrmGrpWBttmPddng"}
                label="Recipe Ingredient "
                inputClasses="form-control"
                propType="text"
                propValue={genRecipeIngredient.ingredient.name}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.mealIngredient.genRecipeIngredient}
                getRndIntegerFn={getRndIntegerFn}
                propLineage={`mealIngredient ${thisRecordId}`}
              />
            </div>
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for day name and mealType name for mealIngredient ${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Meal "
              inputClasses="form-control"
              propType="text"
              propValue={`${day.name} ${mealType.name}`}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              propLineage={`mealIngredient ${thisRecordId}`}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for createdBy for mealIngredient ${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Created "
              inputClasses="form-control"
              propType="text"
              propValue={createdAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.mealIngredient.createdAt}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={`mealIngredient ${thisRecordId}`}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for updatedAt for mealIngredient ${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Last Update "
              inputClasses="form-control"
              propType="text"
              propValue={updatedAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.mealIngredient.updatedAt}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={`mealIngredient ${thisRecordId}`}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for _id for mealIngredient ${thisRecordId}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Record ID "
              inputClasses="form-control"
              propType="text"
              propValue={_id}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.mealIngredient._id}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={`mealIngredient ${thisRecordId}`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealIngredientChildForm;
