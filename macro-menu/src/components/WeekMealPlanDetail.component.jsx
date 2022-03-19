import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";
import DayDetail from "./DayDetail.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import CreateDay from "./CreateDay.component";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.updateStateDayOnAdd = this.updateStateDayOnAdd.bind(this);

    const lifeCycleStages = [
      "viewing",
      "editingOrig",
      "editingCopy",
      "creating",
      "missing",
    ];

    this.state = {
      id: "",
      name: "",
      GRFUsers: [],
      GRFUser: "",
      thisWeeksDays: [],
      thisFormState: "viewing",
      userIsAuthor: true,
      sun: {},
      mon: {},
      tues: {},
      wed: {},
      thurs: {},
      fri: {},
      sat: {},
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          GRFUser: response.data.GRFUser,
        });
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          GRFUsers: response.data.map((GRFUser) => GRFUser),
        });
      }
    });
    axios
      .get(
        "http://localhost:5000/days/daysofthiswmp/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          thisWeeksDays: response.data.map((day) => day),
          sun: response.data.filter((day) => day.dayOfWeek == "Sunday")[0],
          mon: response.data.filter((day) => day.dayOfWeek == "Monday")[0],
          tues: response.data.filter((day) => day.dayOfWeek == "Tuesday")[0],
          wed: response.data.filter((day) => day.dayOfWeek == "Wednesday")[0],
          thurs: response.data.filter((day) => day.dayOfWeek == "Thursday")[0],
          fri: response.data.filter((day) => day.dayOfWeek == "Friday")[0],
          sat: response.data.filter((day) => day.dayOfWeek == "Saturday")[0],
        });
      });
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeGRFUser = (e) => {
    this.setState({
      GRFUser: e.target.value,
    });
  };
  handleSubmitFormChange = () => {
    const weekMealPlan = {
      id: this.state.id,
      name: this.state.name,
      GRFUser: this.state.GRFUser,
    };
    axios
      .post(
        "http://localhost:5000/weekMealPlans/update/" + weekMealPlan.id,
        weekMealPlan
      )
      .then(console.log("updated"))
      .then((window.location = "/"));
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
  handleDeleteDay = (idOfRecordToDelete) => {
    function removeDeletedDays(eachDay) {
      return eachDay._id != idOfRecordToDelete;
    }
    axios
      .delete("http://localhost:5000/days/" + idOfRecordToDelete)
      .then(
        this.setState({
          thisWeeksDays: this.state.thisWeeksDays.filter(removeDeletedDays),
        })
      )
      .then(() => {
        this.setState({
          sun: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Sunday"
          )[0],
          mon: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Monday"
          )[0],
          tues: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Tuesday"
          )[0],
          wed: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Wednesday"
          )[0],
          thurs: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Thursday"
          )[0],
          fri: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Friday"
          )[0],
          sat: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Saturday"
          )[0],
        });
      });
  };
  updateStateDayOnAdd = (dayData, dayOfWeek) => {
    console.log(this);
    if (dayOfWeek == "Saturday") {
      this.setState({
        sat: dayData,
      });
    }
  };
  handleCreateDay = (dayOfWeek) => {
    const day = {
      dayOfWeek: dayOfWeek,
      weekMealPlan: this.state.id,
      name: this.state.name + " - " + dayOfWeek,
    };
    axios.post("http://localhost:5000/days/add", day).then((response) => {
      this.setState({
        thisWeeksDays: this.state.thisWeeksDays.push(response.data),
      });
    });
  };
  renderDay = (dayToRender, dayOfWeek, dayOfWeekShort) => {
    if (dayToRender == undefined) {
      return (
        <CreateDay
          weekMealPlanId={this.state.id}
          weekMealPlanName={this.state.name}
          dayOfWeek={dayOfWeek}
          dayOfWeekShort={dayOfWeekShort}
          thisFormState="missing"
          onCreateDay={this.handleCreateDay}
        />
      );
    } else {
      return (
        <DayDetail
          thisDay={dayToRender}
          weekMealPlanName={this.state.name}
          onDeleteDay={this.handleDeleteDay}
          key={dayToRender._id}
        />
      );
    }
  };
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>Week Meal Plan Detail</h1>
        <form>
          <div className="form-group">
            <label>Plan Name</label>
            <div className="inputRowWRightIcons">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                disabled={this.state.thisFormState == "viewing" ? true : false}
              />
              <EditOptions
                parentObj={"WMP"}
                userIsAuthor={this.state.userIsAuthor}
                thisFormState={this.state.thisFormState}
                onSubmitFormChange={this.handleSubmitFormChange}
                onClickCopy={this.handleClickCopy}
                onClickEdit={this.handleClickEdit}
                onCancel={this.handleCancel}
              />
            </div>
          </div>
          <div hidden={true} className="form-group mt-2">
            <label>Author: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.GRFUser.handle}
              onChange={this.onChangeGRFUser}
            >
              {this.state.GRFUsers.map(function (GRFUser) {
                return (
                  <option key={GRFUser._id} value={GRFUser._id}>
                    {GRFUser.handle}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div>
          {this.renderDay(this.state.sun, "Sunday", "sun")}
          {this.renderDay(this.state.mon, "Monday", "mon")}
          {this.renderDay(this.state.tues, "Tuesday", "tues")}
          {this.renderDay(this.state.wed, "Wednesday", "wed")}
          {this.renderDay(this.state.thurs, "Thursday", "thurs")}
          {this.renderDay(this.state.fri, "Friday", "fri")}
          {this.renderDay(this.state.sat, "Saturday", "sat")}
        </div>
      </div>
    );
  }
}
