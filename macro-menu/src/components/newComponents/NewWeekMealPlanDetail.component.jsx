import React, { Component } from "react";
import Joi from "joi";
import httpService from "../../services/httpService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import WeekMealPlanCard from "./WeekMealPlanCard.component";
import DaysCard from "./DaysCard.component";
import valSchema from "../universalJoiValSchema";
class NewWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    const { backEndHtmlRoot, currentGRFUser } = this.props;
    this.state = {
      backEndHtmlRoot: backEndHtmlRoot,
      currentGRFUser: currentGRFUser,
      thisWMPStateObj: {
        thisRecord: { _id: this.props.match.params.id },
        recordLoaded: false,
      },
      thisWMPStateBackup: {},
      thisWeeksDays: {},
      thisWeeksDaysBackup: {},
      allUnitOfMeasures: [],
      allWeightTypes: [],
      allBrands: [],
    };
  }
  getRndIntegerFn = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  handleClickEditFn = () => {
    console.log("clicked Edit");
  };
  handleClickCancelFn = () => {
    console.log("clicked Cancel");
  };
  handleUpdatePropFn = () => {
    console.log("updated Prop");
  };
  handleClickSaveFn = () => {
    console.log("clicked Save");
  };
  handleClickDeleteFn = () => {
    console.log("clicked Delete");
  };
  handleUpdateWeightsFn = () => {
    console.log("weights updated");
  };
  handleClickCopyFn = () => {
    console.log("clicked copy");
  };
  handleCreateNewRecordFn = (
    typeOfRecordToChange,
    typeOfRecordToCreate,
    propType,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    newRecordForState,
    newRecordToSave
  ) => {
    console.log("created new record");
  };
  populateMealIngrdntsFn = () => {
    console.log("populating meal Ingredients");
  };
  handleTrimEnteredValue = (untrimmedValue) => {
    let trimmedValue = untrimmedValue.trim();
    let trimmedValueWNoDblSpcs = trimmedValue.replace(/  +/g, " ");
    return trimmedValueWNoDblSpcs;
  };
  handleValidateProp = (propType, propToUpdate, newPropValue) => {
    const rule = valSchema.extract(propType);
    const subSchema = Joi.object({ [propToUpdate]: rule });
    const objToValidate = { [propToUpdate]: newPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
    } else {
      validationError = null;
    }
    return validationError;
  };
  render() {
    const thisWMPRecordId = this.state.thisWMPStateObj.thisRecord._id;
    const typeOfRecordToChange = "weekMealPlan";
    return (
      <div className="container-fluid pl-4 pr-4">
        <ToastContainer
          key={`toastCntnrFor${typeOfRecordToChange}${thisWMPRecordId}`}
          autoClose={2000}
        />
        <WeekMealPlanCard
          key={`wmpCardFor${typeOfRecordToChange}${thisWMPRecordId}`}
          thisStateObj={this.state.thisWMPStateObj}
          thisStateObjBackup={this.state.thisWMPStateBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          validatePropFn={this.handleValidateProp}
          onUpdateWeightsFn={this.handleUpdateWeightsFn}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          onClickCopyFn={this.handleClickCopyFn}
          getRndIntegerFn={this.getRndIntegerFn}
        />
        <DaysCard
          key={`daysCardFor${typeOfRecordToChange}${thisWMPRecordId}`}
          wmpRecordLoaded={this.state.thisWMPStateObj.recordLoaded}
          thisStateObj={this.state.thisWeeksDays}
          thisStateObjBackup={this.state.thisWeeksDaysBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          currentGRFUser={this.state.currentGRFUser}
          validatePropFn={this.handleValidateProp}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          onCreateNewRecordFn={this.handleCreateNewRecordFn}
          populateMealIngrdntsFn={this.populateMealIngrdntsFn}
          getRndIntegerFn={this.getRndIntegerFn}
          trimEnteredValueFn={this.handleTrimEnteredValue}
          allUnitOfMeasures={this.state.allUnitOfMeasures}
          allWeightTypes={this.state.allWeightTypes}
          allBrands={this.state.allBrands}
          thisWMPRecordId={thisWMPRecordId}
        />
      </div>
    );
  }
}
export default NewWeekMealPlan;
