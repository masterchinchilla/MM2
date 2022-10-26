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
    this.state = {};
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
  handleCreateNewRecordFn = () => {
    console.log("created new record");
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
    const { thisGRFUser, backEndHtmlRoot, axiosCallConfig } = this.props;
    const thisRecordId = this.props.match.params.id;
    return (
      <div className="container-fluid pl-4 pr-4">
        <ToastContainer
          key={`toastCntnrForWMP${thisRecordId}`}
          autoClose={2000}
        />
        <WeekMealPlanCard
          key={`wmpCardForWMP${thisRecordId}`}
          thisStateObj={this.state.thisWMPStateObj}
          thisStateObjBackup={this.state.thisWMPStateBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          valSchema={this.valSchema}
          validateProp={this.handleValidateProp}
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
          key={`daysCardForWMP${thisRecordId}`}
          thisWeeksDays={this.state.thisWeeksDays}
          thisWeeksDaysBackup={this.state.thisWeeksDaysBackup}
          backEndHtmlRoot={this.state.backEndHtmlRoot}
          currentGRFUser={this.state.currentGRFUser}
          valSchema={this.valSchema}
          validateProp={this.handleValidateProp}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          onCreateNewRecordFn={this.handleCreateNewRecordFn}
          getRndIntegerFn={this.getRndIntegerFn}
        />
      </div>
    );
  }
}
export default NewWeekMealPlan;
