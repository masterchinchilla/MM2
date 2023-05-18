import React from "react";
import CustomHeading from "./CustomHeading.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import NewFormControl from "./NewFormControl.component";
import NewInputCore from "./NewInputCore.component";
import NewNewAsyncSearchSelectWCreate from "./NewNewAsyncSearchSelectWCreate.component";
const NewGenRecipeIngredientForm = (props) => {
  const typeOfRecordToChange = "genRecipeIngredient";
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
    onCreateNewRecordFn,
    onSrchDBForObjWMtchngNmeFn,
  } = commonMethods;
  const { thisStateObj, thisStateObjBackup, thisGenRecipe } = specificData;
  if (!thisStateObj.recordLoaded) {
    thisStateObj.thisRecord.genRecipeIngredient = {
      _id: getRndIntegerFn(10000000, 99999999),
      createdAt: "",
      updatedAt: "",
      defaultQty: 0.0,
      genRecipe: thisGenRecipe,
      ingredient: {},
      qty: 0.0,
    };
    thisStateObj.valErrors.genRecipeIngredient = {
      _id: [],
      createdAt: [],
      updatedAt: [],
      defaultQty: [],
      ingredient: [],
      genRecipe: [],
    };
  }
  const {} = specificMethods;
  const {
    recordLoaded,
    editingForm,
    valErrors,
    recordChanged,
    justCreated,
    userType,
    hasChildren,
  } = thisStateObj;
  const thisMealIngredientRecord = thisStateObj.thisRecord;
  const thisMealRecord = thisMealIngredientRecord.meal;
  const thisMealType = thisMealRecord.mealType;
  const thisDay = thisMealRecord.day;
  const thisDayOfWeek = thisDay.dayOfWeek;
  const thisMealTypeCode = thisMealType.code;
  const thisDayOfWeekCode = thisDayOfWeek.code;
  const arrayIndex = thisStateObj.arrayIndex;
  const fieldsDisabled = !editingForm.genRecipeIngredient ? true : false;
  const saveDisabled =
    valErrors.genRecipeIngredient.defaultQty.length > 0 ||
    valErrors.genRecipeIngredient.ingredient.length > 0
      ? true
      : false;
  const thisRecord = thisMealIngredientRecord.genRecipeIngredient;
  const { _id, createdAt, updatedAt, defaultQty, genRecipe, ingredient } =
    thisRecord;
  const thisRecordId = _id;
  const propLineage = `genRecipeIngredient ${thisRecordId} for mealIngredient ${thisMealIngredientRecord._id}`;
  function handleCreateNewRecordFn(newName) {
    onCreateNewRecordFn(
      "ingredient",
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex,
      newName
    );
  }
  function inputOnKeyUpFn() {}
  return (
    <form
      className={
        justCreated.genRecipeIngredient
          ? "gnRcpIngrdntFrm cardHeaderFocused"
          : "gnRcpIngrdntFrm"
      }
    >
      <div className="gnRcpIngrdntFrmHdr">
        <CustomHeading
          key={`CustomHeading for "Default Qty" for ${propLineage}`}
          headingLvl={6}
          recordLoaded={recordLoaded}
          headingText="Default Qty"
          hdngIsReqFormLbl={true}
          editingForm={editingForm.genRecipeIngredient}
          headingClasses="gnRcpIngrdntHdr doubleHeightLabel"
        />
        <NewFormControl
          key={`NewFormControl for ${propLineage}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onSaveChangesFn: onSaveChangesFn,
              onDeleteObjFn: () => {},
              onCopyWMPFn: () => {},
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              recordChanged: recordChanged.genRecipeIngredient,
              thisDayOfWeekCode: thisDayOfWeekCode,
              thisMealTypeCode: thisMealTypeCode,
              arrayIndex: arrayIndex,
              userType: userType.genRecipeIngredient,
              editingForm: editingForm.genRecipeIngredient,
              saveDisabled: saveDisabled,
              hasChildren: hasChildren.genRecipeIngredient,
              saveWarning:
                "Changes made to this Recipe Ingredient will be applied everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?",
              deleteWarning:
                "If you delete this ingredient from the Recipe, it will be removed everywhere that Recipe is used, including in other Week Meal Plans. Do you want to proceed?",
              deleteChildrenWarning: "",
              recordLoaded: recordLoaded,
              formControlLineage: propLineage,
            },
            specificMethods: {},
          }}
        />
        <NewInputCore
          key={`NewInputCore for defaultQty for ${propLineage}`}
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
              propToUpdate: "defaultQty",
              arrayIndex: arrayIndex,
              fieldDisabled: fieldsDisabled,
              valErrors: valErrors.genRecipeIngredient.defaultQty,
              inputClasses: "form-control mlIngrdntQty",
              isRequired: true,
              recordLoaded: recordLoaded,
              excludeLabel: true,
              inputTypeForHtml: "number",
              propValue: defaultQty,
              propLineage: propLineage,
            },
            specificMethods: { inputOnKeyUpFn: inputOnKeyUpFn },
          }}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#gnRcpIngrdntFrmAccrdn" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"gnRcpIngrdntFrmAccrdn" + thisRecordId}
          className={
            justCreated.genRecipeIngredient
              ? "accordion-collapse open"
              : "accordion-collapse collapse"
          }
          aria-labelledby={"#gnRcpIngrdntFrmAccrdnHdr" + thisRecordId}
          data-bs-parent={"#gnRcpIngrdntFrmAccrdnFll" + thisRecordId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <CustomHeading
                key={`CustomHeading for "Recipe Ingredient" for ${propLineage}`}
                headingLvl={6}
                recordLoaded={recordLoaded}
                headingText="Recipe Ingredient"
                hdngIsReqFormLbl={false}
                editingForm={editingForm.genRecipeIngredient}
                headingClasses="genRecipeIngrdntHdr"
              />
              <NewNewAsyncSearchSelectWCreate
                key={`NewNewAsyncSearchSelectWCreate for ingredient for ${propLineage}`}
                commonProps={{
                  commonData: {},
                  commonMethods: {
                    getRndIntegerFn: getRndIntegerFn,
                    returnElementKey: returnElementKey,
                    onUpdatePropFn: onUpdatePropFn,
                    onCreateNewRecordFn: handleCreateNewRecordFn,
                    trimEnteredValueFn: trimEnteredValueFn,
                    onSrchDBForObjWMtchngNmeFn: onSrchDBForObjWMtchngNmeFn,
                  },
                }}
                specificProps={{
                  specificData: {
                    typeOfRecordToChange: "genRecipeIngredient",
                    formGroupClasses: "",
                    label: "Ingredient",
                    thisDayOfWeekCode: thisDayOfWeekCode,
                    thisMealTypeCode: thisMealTypeCode,
                    arrayIndex: arrayIndex,
                    propToUpdate: `name`,
                    fieldDisabled: fieldsDisabled,
                    initialFieldValErrs:
                      valErrors.genRecipeIngredient.ingredient,
                    inputClasses: "",
                    isRequired: true,
                    recordLoaded: recordLoaded,
                    excludeLabel: false,
                    selectedRecord: ingredient,
                    fetchDataUrl: `${backEndHtmlRoot}ingredients/ingredientsByName`,
                    typeOfRecordToSelect: `ingredient`,
                    propLineage: propLineage,
                  },
                  specificMethods: {},
                }}
              />
            </div>
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for genRecipe.name for ${propLineage}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Recipe "
              inputClasses="form-control"
              propType="text"
              propValue={genRecipe.name}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.genRecipeIngredient.genRecipe}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={propLineage}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for createdAt for ${propLineage}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Created "
              inputClasses="form-control"
              propType="text"
              propValue={createdAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.genRecipeIngredient.createdAt}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={propLineage}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for updatedAt for ${propLineage}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Last Update "
              inputClasses="form-control"
              propType="text"
              propValue={updatedAt}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.genRecipeIngredient.updatedAt}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={propLineage}
            />
            <ReadOnlyInputCore
              key={`ReadOnlyInputCore for _id for ${propLineage}`}
              formGroupClasses={
                "form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng"
              }
              label="Record ID "
              inputClasses="form-control"
              propType="text"
              propValue={_id}
              recordLoaded={recordLoaded}
              excludeLabel={false}
              valErrors={valErrors.genRecipeIngredient._id}
              getRndIntegerFn={getRndIntegerFn}
              propLineage={propLineage}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewGenRecipeIngredientForm;
