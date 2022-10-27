import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import FormControl from "./FormControl.component";
const DayControlAndDisabledFields = (props) => {
  const { onClickEditFn, onClickCancelFn, onClickDeleteFn, getRndIntegerFn } =
    props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        editingForm: false,
        thisRecord: {
          _id: null,
          name: null,
          dayOfWeek: null,
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
  const typeOfRecordToChange = "weekMealPlan";
  const thisDayOfWeekCode = dayOfWeek ? dayOfWeek.code : "";
  const thisMealTypeCode = "";
  const arrayIndex = 0;
  return (
    <React.Fragment>
      <div className="card-header">
        {dayOfWeek ? (
          <h3 className="card-title">{dayOfWeek.name}</h3>
        ) : (
          <h3 className="placeholder-glow w-75">
            <span className="placeholder w-75"></span>
          </h3>
        )}
        <FormControl
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
                formGroupClasses={"form-group"}
                label="Name "
                inputClasses="form-control"
                propType="text"
                propValue={name ? name : null}
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id ? thisRecordId : null}
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={
                  createdAt
                    ? dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={
                  updatedAt
                    ? dayjs(updatedAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DayControlAndDisabledFields;
