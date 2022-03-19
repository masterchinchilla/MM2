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
        <div className="card mt-3 mb-3">
          <div className="card-header">
            <h2 className="card-title">Meal Macro Weighting</h2>
          </div>
          <div className="card-body">
            <div
              className="accordion accordion-flush"
              id={"accordionFull_MealMacroWeighting" + this.state.id}
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={"accordionHeader_MealMacroWeighting" + this.state.id}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#dayAccrdn_MealMacroWeighting" + this.state.id
                    }
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  ></button>
                </h2>
              </div>
              <div
                id={"dayAccrdn_MealMacroWeighting" + this.state.id}
                className="accordion-collapse collapse show"
                aria-labelledby={
                  "#accordionHeader_MealMacroWeighting" + this.state.id
                }
                data-bs-parent={
                  "#accordionFull_MealMacroWeighting" + this.state.id
                }
              >
                <div className="accordion-body accrdnMMacroWghtngBdy">
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Breakfast %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Snack 1 %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Lunch %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Snack 2 %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Dinner %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                  <div class="badge bg-primary mealMacroWeightBadge">
                    <h6>Dessert %</h6>
                    <input
                      type="number"
                      className="form-control mealMacroWeightInput"
                      value="100.00"
                      disabled={
                        // this.state.thisFormState == "viewing" ? true : false
                        false
                      }
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3 mb-3">
          <div className="card-header">
            <h2 className="card-title">Day Meal Plans</h2>
          </div>
          <div className="card-body">
            <div
              className="accordion accordion-flush"
              id={"accordionFull" + this.state.id}
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={"accordionHeader" + this.state.id}
                >
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#dayAccrdn" + this.state.id}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  ></button>
                </h2>
              </div>
              <div
                id={"dayAccrdn" + this.state.id}
                className="accordion-collapse collapse show"
                aria-labelledby={"#accordionHeader" + this.state.id}
                data-bs-parent={"#accordionFull" + this.state.id}
              >
                <div className="accordion-body wkDaysAccrdnBdy">
                  {this.renderDay(this.state.sun, "Sunday", "sun")}
                  {this.renderDay(this.state.mon, "Monday", "mon")}
                  {this.renderDay(this.state.tues, "Tuesday", "tues")}
                  {this.renderDay(this.state.wed, "Wednesday", "wed")}
                  {this.renderDay(this.state.thurs, "Thursday", "thurs")}
                  {this.renderDay(this.state.fri, "Friday", "fri")}
                  {this.renderDay(this.state.sat, "Saturday", "sat")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
