import React, { Component } from "react";
import axios from "axios";

export default class CreateDay extends Component {
  constructor(props) {
    super(props);

    this.onChangeDayOfWeek = this.onChangeDayOfWeek.bind(this);
    this.onChangeWeekMealPlan = this.onChangeWeekMealPlan.bind(this);
    this.renameDay = this.renameDay.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      dayOfWeek: "Sunday",
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      weekMealPlans: [],
      weekMealPlan: {},
      name: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            weekMealPlans: response.data.map((weekMealPlan) => weekMealPlan),
            weekMealPlan: response.data[0].name,
          });
        }
        console.log(this.state);
      })
      .then(
        this.setState({
          name: this.state.weekMealPlan.name + " - " + this.state.dayOfWeek,
        })
      );
  }
  onChangeDayOfWeek(e) {
    this.setState({
      dayOfWeek: e.target.value,
    });
    this.renameDay();
  }
  onChangeWeekMealPlan(e) {
    this.setState({
      weekMealPlan: e.target.value,
    });
    this.renameDay();
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  renameDay() {
    this.setState({
      name: this.state.weekMealPlan.name + " - " + this.state.dayOfWeek,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const day = {
      dayOfWeek: this.state.dayOfWeek,
      weekMealPlan: this.state.weekMealPlan,
      name: this.state.name,
    };
    console.log(day);
    axios
      .post("http://localhost:5000/days/add", day)
      .then((window.location = "/days/"));
  }

  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>New Day</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Day of Week: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.dayOfWeek}
              onChange={this.onChangeDayOfWeek}
            >
              {this.state.daysOfWeek.map(function (dayOfWeek) {
                return (
                  <option key={dayOfWeek} value={dayOfWeek}>
                    {dayOfWeek}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Week Meal Plan Day is part of: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.weekMealPlan._id}
              onChange={this.onChangeWeekMealPlan}
            >
              {this.state.weekMealPlans.map(function (weekMealPlan) {
                return (
                  <option key={weekMealPlan._id} value={weekMealPlan._id}>
                    {weekMealPlan.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group mt-4 mb-4">
            <input
              type="submit"
              value="Create Day"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
