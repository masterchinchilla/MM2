import React from "react";
import CustomHeading from "../CustomHeading.component";
import NewFormControl from "./NewFormControl.component";
import ReadOnlyInputCore from "../ReadOnlyInputCore.component";
const NewDayControlAndDisabledFields = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    getRndIntegerFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj } = specificData;
  const {
    thisRecord,
    recordLoaded,
    editingForm,
    valErrors,
    recordChanged,
    userType,
    hasChildren,
  } = thisStateObj;
  const { _id, dayOfWeek, name } = thisRecord;
  const thisRecordId = _id;
  const typeOfRecordToChange = "day";
  return (
    <React.Fragment>
      <div className="card-header">
        <CustomHeading
          key={`customDayOfWeekNameHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={3}
          recordLoaded={recordLoaded}
          headingText={dayOfWeek.name}
          hdngIsReqFormLbl={false}
          editingForm={editingForm.day}
          headingClasses="card-title"
        />
        <NewFormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: onCancelEditFn,
              onSaveChangesFn: () => {},
              onDeleteObjFn: onDeleteObjFn,
              onCopyWMPFn: () => {},
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              recordChanged: recordChanged.day,
              thisDayOfWeekCode: dayOfWeek.code,
              thisMealTypeCode: "",
              arrayIndex: null,
              userType: userType.day,
              editingForm: editingForm.day,
              saveDisabled: true,
              hasChildren: hasChildren.day,
              saveWarning: null,
              deleteWarning:
                "Are you sure you want to delete this Day Meal Plan?",
              deleteChildrenWarning:
                "You must delete all this day's meals before you can delete this day",
              recordLoaded: recordLoaded,
            },
            specificMethods: {},
          }}
        />
      </div>
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"dayHiddenAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"dayHiddenAccordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayHiddenAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayHiddenAccrdn" + thisRecordId}
            className="accordion-collapse collapse"
            aria-labelledby={"#dayHiddenAccordionHeader" + thisRecordId}
            data-bs-parent={"#dayHiddenAccordionFull" + thisRecordId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <ReadOnlyInputCore
                key={`readOnlyInputForNameFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Name "
                inputClasses="form-control"
                propType="text"
                propValue={name ? name : null}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.day.name}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForIdFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id ? thisRecordId : null}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.day._id}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForCreatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={thisRecord.createdAt ? thisRecord.createdAt : null}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.day.createdAt}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForUpdatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={thisRecord.updatedAt ? thisRecord.updatedAt : null}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.day.updatedAt}
                getRndIntegerFn={getRndIntegerFn}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewDayControlAndDisabledFields;
