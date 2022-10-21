import React, { Component } from "react";
import httpService from "../../services/httpService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeekMealPlanCard from "./WeekMealPlanCard.component";
import DayMealPlansCard from "./DayMealPlansCard.component";
class NewWeekMealPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // thisWMPStateObj: {
      //   thisWMP: {
      //     _id: 1,
      //     GRFUser: {
      //       handle: "a",
      //     },
      //   },
      //   thisFormState: "viewing",
      //   valErrors: {},
      // },
      // thisWeeksDays: {
      //   breakfast: {
      //     a: 1,
      //   },
      // },
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
  render() {
    const { thisGRFUser, backEndHtmlRoot, axiosCallConfig } = this.props;
    const thisWMPId = this.props.match.params.id;
    return (
      <div className="container-fluid pl-4 pr-4">
        <ToastContainer autoClose={2000} />
        <WeekMealPlanCard
          thisStateObj={this.state.thisWMPStateObj}
          onUpdateWeightsFn={this.handleUpdateWeightsFn}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          getRndIntegerFn={this.getRndIntegerFn}
        />
        <DayMealPlansCard
          thisWeeksDays={this.state.thisWeeksDays}
          onClickEditFn={this.handleClickEditFn}
          onClickCancelFn={this.handleClickCancelFn}
          onUpdatePropFn={this.handleUpdatePropFn}
          onClickSaveFn={this.handleClickSaveFn}
          onClickDeleteFn={this.handleClickDeleteFn}
          getRndIntegerFn={this.getRndIntegerFn}
        />
      </div>
    );
  }
}
export default NewWeekMealPlan;
