import React from "react";
import EditOptions from "./EditOptions.component";
import dayjs from "dayjs";

const MealIngredientChild = (props) => {
  const {
    mealIngrdntsArrayIndex,
    thisMealIngrdntObj,
    thisObj,
    userType,
    thisFormState,
    onClickEditForm,
    onCancelEditForm,
    onSaveFormChanges,
    onDeleteRecord,
    onUpdateProp,
  } = props;
  const thisDayOfWeekCode = thisObj.meal.day.dayOfWeek.code;
  const thisObjId = thisObj._id;
  const thisMealTypeCode = thisObj.meal.mealType.code;
  const recordChanged = thisMealIngrdntObj.mealIngrdntRecordChanged;
  let deleteMsg =
    "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?";
  return (
    <form className="mlIngrdntFrm">
      <div className="mlIngrdntFrmHdr">
        <label className="mlIngrdntHdr doubleHeightLabel">
          <h6>Qty</h6>
        </label>
        <EditOptions
          className="mlIngrdntFrmIcns"
          parentObj={thisMealIngrdntObj}
          objType={"mealIngredient"}
          key={"mealIngrdntEditOptns" + thisObjId}
          userType={userType}
          thisFormState={thisFormState}
          recordChanged={recordChanged}
          onClickEditForm={onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={onSaveFormChanges}
          onDeleteRecord={onDeleteRecord}
          onUpdateProp={onUpdateProp}
          deleteMsg={deleteMsg}
        />
        <input
          type={"number"}
          className="form-control mlIngrdntQty"
          value={thisObj.qty}
          onChange={(e) =>
            onUpdateProp(
              "mealIngredient",
              thisDayOfWeekCode,
              thisMealTypeCode,
              "qty",
              mealIngrdntsArrayIndex,
              "number",
              e,
              []
            )
          }
          disabled={thisFormState === "viewing" ? true : false}
        />
      </div>
      <div
        className="accordion accordion-flush flushElement"
        id={"mlIngrdntFrmAccrdnFll" + thisObjId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn flushElement">
          <h2
            className="accordion-header"
            id={"mlIngrdntFrmAccrdnHdr" + thisObjId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#mlIngrdntFrmAccrdn" + thisObjId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"mlIngrdntFrmAccrdn" + thisObjId}
          className="accordion-collapse collapse"
          aria-labelledby={"#mlIngrdntFrmAccrdnHdr" + thisObjId}
          data-bs-parent={"#mlIngrdntFrmAccrdnFll" + thisObjId}
        >
          <div className="accordion-body">
            <div className="form-group mealIngrdntInputs">
              <h6 className="mealIngrdntHdr">Custom Ingredient</h6>
              <label>Recipe Ingredient</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                onChange={() => {}}
                value={thisObj.genRecipeIngredient.ingredient.name}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Meal</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                onChange={() => {}}
                value={thisObj.meal.day.name + " " + thisObj.meal.mealType.name}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Created</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                value={dayjs(thisObj.createdAt).format(
                  "dddd, MMMM D, YYYY h:mm A"
                )}
                onChange={() => {}}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Last Update</label>
              <input
                className="form-control"
                type="text"
                disabled={true}
                value={dayjs(thisObj.updatedAt).format(
                  "dddd, MMMM D, YYYY h:mm A"
                )}
                onChange={() => {}}
              />
            </div>
            <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
              <label>Record ID</label>
              <input
                type={"text"}
                className="form-control"
                value={thisObjId}
                disabled={true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealIngredientChild;
