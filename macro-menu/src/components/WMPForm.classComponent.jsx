import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import InputParentCopy from "./InputParent.component copy";
export default class WMPFormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisWeekMealPlan: this.props.thisWeekMealPlan,
      thisWMPOld: this.props.thisWMPOld,
      name: { value: this.props.thisWeekMealPlan.thisWMP.name, valError: null },
      saveDisabled: true,
    };
  }
  handleUpdateLocalProp = (propValue, propName, propValError, disableSave) => {
    let updatedProp = { value: propValue };
    if (propValError) {
      updatedProp.valError = propValError;
    }
    if (disableSave) {
      updatedProp.saveDisabled = disableSave;
    }
    this.setState({ [propName]: updatedProp });
  };
  onCancelEditForm = () => {
    this.setState({
      name: { value: this.state.thisWMPOld.name, valError: null },
      saveDisabled: false,
    });
    this.props.onCancelEditForm(this.state.thisWeekMealPlan, "weekMealPlan");
  };
  render() {
    // const schema = Joi.object({
    //   name: Joi.string().trim().min(3).max(255).required(),
    // });
    // const saveDisabled=this.state.saveDisabled;
    // const thisWMPOld=this.state.thisWMPOld;
    // const thisWeekMealPlan=this.state.thisWeekMealPlan;
    const { saveDisabled, thisWMPOld, thisWeekMealPlan } = this.state;
    const thisWMP = thisWeekMealPlan.thisWMP;
    const thisWMPId = thisWMP._id;
    const thisFormState = thisWeekMealPlan.thisFormState;
    const formGroupClasses = "form-group wmpNameFrmGroup";
    const {
      backEndHtmlRoot,
      onUpdateProp,
      onClickEditForm,
      onSaveFormChanges,
      onDeleteRecord,
      onClickCopy,
    } = this.props;
    return (
      <React.Fragment>
        <div
          className={
            this.state.thisWeekMealPlan.thisWMPJustCreated === true
              ? "card-header wmpCardHeader cardHeaderFocused"
              : "card-header wmpCardHeader"
          }
        >
          <InputParentCopy
            parentObjOld={thisWMPOld}
            // valSchema={schema}
            valSchema={Joi.object({
              name: Joi.string().trim().min(3).max(255).required(),
            })}
            label={"Week Meal Plan Name"}
            thisFormState={thisFormState}
            formGroupClasses={formGroupClasses}
            thisDayOfWeekCode={""}
            thisMealTypeCode={""}
            mealIngrdntsArrayIndex={0}
            propType={"text"}
            backEndHtmlRoot={backEndHtmlRoot}
            objType={"weekMealPlan"}
            propName={"name"}
            propNameSentenceCase={"Name"}
            localProp={this.state.name}
            updateLocalPropValueFn={this.handleUpdateLocalProp}
            onUpdateProp={onUpdateProp}
          />
          <EditOptions
            parentObj={thisWeekMealPlan}
            objType="weekMealPlan"
            thisFormState={thisFormState}
            saveDisabled={saveDisabled}
            userType={thisWeekMealPlan.userType}
            recordChanged={thisWeekMealPlan.recordChanged}
            onClickEditForm={onClickEditForm}
            onCancelEditForm={this.onCancelEditForm}
            onSaveFormChanges={onSaveFormChanges}
            onDeleteRecord={onDeleteRecord}
            onClickCopy={onClickCopy}
          />
        </div>
        <div className="card-body wmpCardBody">
          <div
            className="accordion accordion-flush"
            id={"wmpHiddenAccordionFull" + thisWMPId}
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={"wmpHiddenAccordionHeader" + thisWMPId}
              >
                <button
                  className="accordion-button collapsed wmpAdminAccrdnBttn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#wmpHiddenAccrdn" + thisWMPId}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
            </div>
            <div
              id={"wmpHiddenAccrdn" + thisWMPId}
              className="accordion-collapse collapse"
              aria-labelledby={"#wmpHiddenAccordionHeader" + thisWMPId}
              data-bs-parent={"#wmpHiddenAccordionFull" + thisWMPId}
            >
              <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
                <div className="form-group">
                  <label>Author </label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value={thisWMP.GRFUser.handle}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group">
                  <label>Record Id</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value={thisWMPId}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group">
                  <label>Created</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value={dayjs(thisWMP.createdAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group">
                  <label>Last Update</label>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value={dayjs(thisWMP.updatedAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
