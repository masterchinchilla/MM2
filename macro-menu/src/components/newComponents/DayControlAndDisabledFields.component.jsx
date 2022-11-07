import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import FormControl from "./FormControl.component";
import CustomHeading from "./CustomHeading.component";
const DayControlAndDisabledFields = (props) => {
  const { onClickEditFn, onClickCancelFn, onClickDeleteFn, getRndIntegerFn } =
    props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        editingForm: false,
        thisRecord: {
          _id: null,
          name: null,
          dayOfWeek: { name: "Day" },
          createdAt: null,
          updatedAt: null,
        },
        recordChanged: false,
        userType: "",
        hasChildren: true,
        deleteChildrenWarning:
          "You must delete all this day's meals before you can delete this day",
        //this prop is crucial because it determines whether the form control component renders or renders placeholder; Should be falsy unless data is loaded
        recordLoaded: false,
      };
  const {
    editingForm,
    thisRecord,
    recordChanged,
    userType,
    hasChildren,
    deleteChildrenWarning,
    recordLoaded,
  } = thisStateObj;
  const { _id, name, dayOfWeek, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const typeOfRecordToChange = "day";
  const thisDayOfWeekCode = dayOfWeek.code ? dayOfWeek.code : "";
  const thisMealTypeCode = "";
  const arrayIndex = 0;
  return (
    <React.Fragment>
      <div className="card-header">
        <CustomHeading
          key={`customDayOfWeekNameHeadingFor${typeOfRecordToChange}${thisRecordId}`}
          headingLvl={3}
          recordLoaded={recordLoaded}
          headingText={dayOfWeek.name}
          hdngIsReqFormLbl={false}
          editingForm={editingForm}
          headingClasses="card-title"
        />
        <FormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm}
          saveDisabled={true}
          hasChildren={hasChildren}
          saveWarning={null}
          deleteWarning={"Are you sure you want to delete this Day Meal Plan?"}
          deleteChildrenWarning={deleteChildrenWarning}
          recordLoaded={recordLoaded}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onClickSaveFn={() => {}}
          onClickDeleteFn={onClickDeleteFn}
          onClickCopyFn={() => {}}
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
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForCreatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={
                  createdAt
                    ? dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForUpdatedAtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={
                  updatedAt
                    ? dayjs(updatedAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
                recordLoaded={recordLoaded}
                excludeLabel={false}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DayControlAndDisabledFields;
