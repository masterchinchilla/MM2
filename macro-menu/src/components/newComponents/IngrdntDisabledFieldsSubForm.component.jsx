import React from "react";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const IngrdntDisabledFieldsSubForm = (props) => {
  const { thisRecordId } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        thisRecord: {
          genRecipeIngredient: {
            ingredient: {
              _id: null,
              GRFUser: { handle: "" },
            },
          },
        },
        recordLoaded: false,
      };
  const { thisRecord, recordLoaded } = thisStateObj;
  const { _id, GRFUser, createdAt, updatedAt } =
    thisRecord.genRecipeIngredient.ingredient;
  const typeOfRecordToChange = "ingredient";
  return (
    <div
      className="accordion accordion-flush ingrdntAdminMenu"
      id={"ingrdntAdminMenuAccrdnFull" + thisRecordId}
    >
      <div
        className="accordion accordion-flush ingrdntAdminMenu"
        id={"ingrdntAdminMenuAccrdnFull" + thisRecordId}
      >
        <div className="accordion-item genRecipeAdminMenuBttn">
          <h2
            className="accordion-header"
            id={"ingrdntAdminMenuAccrdnHdr" + thisRecordId}
          >
            <button
              className="accordion-button collapsed mealAdminAccrdnBttn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#ingrdntAdminMenuAccrdnBdy" + thisRecordId}
              aria-expanded="true"
              aria-controls="collapseOne"
            ></button>
          </h2>
        </div>
        <div
          id={"ingrdntAdminMenuAccrdnBdy" + thisRecordId}
          className="accordion-collapse collapse"
          aria-labelledby={"#ingrdntAdminMenuAccrdnHdr" + thisRecordId}
          data-bs-parent={"#ingrdntAdminMenuAccrdnFull" + thisRecordId}
        >
          <div className="accordion-body ingrdntInnerAccrdn">
            <ReadOnlyInputCore
              key={`readOnlyInputForAuthorFor${typeOfRecordToChange}${thisRecordId}`}
              formGroupClasses={"form-group mealIngrdntInputs"}
              label="Author "
              inputClasses="form-control"
              propType="text"
              propValue={GRFUser.handle}
              recordLoaded={recordLoaded}
              excludeLabel={false}
            />
            <div className="accordion-body ingrdntInnerAccrdn">
              <ReadOnlyInputCore
                key={`readOnlyInputForCreatedFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group mealIngrdntInputs"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={createdAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForUpdatedFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group mealIngrdntInputs"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={updatedAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForIdFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group mealIngrdntInputs"}
                label="Record ID "
                inputClasses="form-control"
                propType="text"
                propValue={_id}
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

export default IngrdntDisabledFieldsSubForm;
