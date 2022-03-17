import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";
import DayDetail from "./DayDetail.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import CreateDay from "./CreateDay.component";
import DayDetailAndCreate from "./DayDetailAndCreate.component";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    const lifeCycleStages = [
      "viewing",
      "editingOrig",
      "editingCopy",
      "creating",
    ];
    this.state = {
      isLoading: true,
      thisWeekMealPlan: {},
      id: "",
      name: "",
      GRFUsers: [],
      GRFUser: "",
      thisWeeksDays: [],
      thisFormState: "viewing",
      userIsAuthor: true,
      sun: undefined,
      mon: undefined,
      tues: undefined,
      wed: undefined,
      thurs: undefined,
      fri: undefined,
      sat: undefined,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          thisWeekMealPlan: response.data,
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
      })
      .then(this.setState({ isLoading: false }));
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
    // e.preventDefault();
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
      .then(console.log("updated"));
    // .then((window.location = "/edit/" + weekMealPlan.id));
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
  handleDelete = () => {
    console.log("Clicked Delete");
  };
  handleDeleteDay = (id) => {
    axios.delete("http://localhost:5000/days/" + id);
    // .then((window.location = "/edit/" + this.state.id));
  };
  handleCreateDay = (dayOfWeek, weekMealPlan, name) => {
    const day = {
      dayOfWeek: dayOfWeek,
      weekMealPlan: weekMealPlan,
      name: name,
    };
    axios.post("http://localhost:5000/days/add", day);
  };
  renderDay = (dayToRender, dayOfWeek, dayOfWeekShort) => {
    if (dayToRender === undefined) {
      console.log(this.state);
      return (
        <CreateDay
          thisWeekMealPlan={this.state.thisWeekMealPlan}
          weekMealPlanName={this.state.thisWeekMealPlan.name}
          dayOfWeek={dayOfWeek}
          dayOfWeekShort={dayOfWeekShort}
          thisFormState="missing"
          onCreateDay={this.handleCreateDay}
        />
      );
    } else {
      console.log("Rendered a Day Detail");
    }
  };
  render() {
    if (this.state.isLoading == true) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
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
                  disabled={
                    this.state.thisFormState == "viewing" ? true : false
                  }
                />
                <EditOptions
                  parentObj={"WMP"}
                  userIsAuthor={this.state.userIsAuthor}
                  thisFormState={this.state.thisFormState}
                  thisId={this.state.thisWeekMealPlan._id}
                  onSubmitFormChange={this.handleSubmitFormChange}
                  onClickCopy={this.handleClickCopy}
                  onClickEdit={this.handleClickEdit}
                  onCancel={this.handleCancel}
                  onDelete={this.handleDeleteDay}
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
            <DayDetailAndCreate
              thisDay={this.state.sun}
              thisDayOfWeek={"Sunday"}
              thisWeekMealPlan={this.state.thisWeekMealPlan}
              key={this.state.thisWeekMealPlan.name + " - Sunday"}
              onDelete={this.handleDeleteDay}
              onCreate={this.handleCreateDay}
            />
            {/* {this.renderDay(this.state.mon, "Monday", "mon")}
            {this.renderDay(this.state.tues, "Tuesday", "tues")}
            {this.renderDay(this.state.wed, "Wednesday", "wed")}
            {this.renderDay(this.state.thurs, "Thursday", "thurs")}
            {this.renderDay(this.state.fri, "Friday", "fri")}
            {this.renderDay(this.state.sat, "Saturday", "sat")} */}
          </div>
        </div>
      );
    }
  }
}
