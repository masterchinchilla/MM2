import React, { Component } from "react";
import axios from "axios";

export default class CreateDay extends Component {
  constructor(props) {
    super(props);

    this.onChangeDayOfWeek = this.onChangeDayOfWeek.bind(this);
    this.onChangeWeekMealPlan = this.onChangeWeekMealPlan.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
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
      days: [],
      weekMealPlan: "",
      name: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/weekMealPlans/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          weekMealPlans: response.data.map((weekMealPlan) => weekMealPlan),
          weekMealPlan: response.data[0]._id,
        });
      }
    });
    axios.get("http://localhost:5000/days/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          days: response.data.map((day) => day),
        });
      }
    });
  }
  onChangeDayOfWeek(e) {
    this.setState({
      dayOfWeek: e.target.value,
    });
  }
  onChangeWeekMealPlan(e) {
    this.setState({
      weekMealPlan: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onSubmit(e) {
    const currentWMP = this.state.weekMealPlan;
    e.preventDefault();
    function findWMP(thisWMP) {
      return thisWMP._id == currentWMP;
    }
    const thisWMP = this.state.weekMealPlans.find(findWMP);
    const dayName = thisWMP.name + " - " + this.state.dayOfWeek;
    console.log(dayName);
    const day = {
      dayOfWeek: this.state.dayOfWeek,
      weekMealPlan: this.state.weekMealPlan,
      name: dayName,
    };

    //Here's the Days Array:
    // [
    //   {
    //     _id: "609f3e444ee536749c75c72b",
    //     dayOfWeek: "Monday",
    //     weekMealPlan: {
    //       _id: "609f3e444ee536749c75c72a",
    //       name: "JD Hypertrophy Week 1",
    //       GRFUser: "609f3e444ee536749c75c729",
    //       createdAt: "2021-05-15T03:21:40.285Z",
    //       updatedAt: "2021-05-15T03:21:40.285Z",
    //       __v: 0,
    //     },
    //     __v: 0,
    //   },
    //   {
    //     _id: "610dbb89bebaea6004ce9f53",
    //     dayOfWeek: "Sunday",
    //     weekMealPlan: {
    //       _id: "609f3e444ee536749c75c72a",
    //       name: "JD Hypertrophy Week 1",
    //       GRFUser: "609f3e444ee536749c75c729",
    //       createdAt: "2021-05-15T03:21:40.285Z",
    //       updatedAt: "2021-05-15T03:21:40.285Z",
    //       __v: 0,
    //     },
    //     createdAt: "2021-08-06T22:45:29.826Z",
    //     updatedAt: "2021-08-06T22:45:29.826Z",
    //     __v: 0,
    //   },
    //   {
    //     _id: "622ac86263a8575ecb8c0f5e",
    //     name: "JP Nash's WMP - Friday",
    //     dayOfWeek: "Friday",
    //     weekMealPlan: {
    //       _id: "62283f3d398c00aee52b7e99",
    //       name: "JP Nash's WMP",
    //       GRFUser: "62283f21398c00aee52b7e93",
    //       createdAt: "2022-03-09T05:46:37.756Z",
    //       updatedAt: "2022-03-09T05:46:37.756Z",
    //       __v: 0,
    //     },
    //     createdAt: "2022-03-11T03:56:18.136Z",
    //     updatedAt: "2022-03-11T03:56:18.136Z",
    //     __v: 0,
    //   },
    // ];

    //For Loop method:
    // let isDayDup = false;
    // const daysArray = this.state.days;
    // const dayName = this.state.name;
    // let i = 0;
    // for (i = 0; i < daysArray.length; i++) {
    //   if (daysArray[i].name == dayName) {
    //     isDayDup = true;
    //   }
    // }
    // console.log(isDayDup);
    //No matter whether the passed Day Name is or is not a duplicate, the result is "false"!

    //Array.find method:
    // const daysArray = this.state.days;
    // const dayName = this.state.name;
    // function findDayDup(thisDay) {
    //   return thisDay.name == dayName;
    // }
    // const dupDay = daysArray.find(findDayDup);
    // if (dupDay == undefined) {
    //   console.log("Duplicate Day Name!");
    // } else {
    //   console.log("Day is OK!");
    // }
    //No matter whether the passed Day Name is or is not a duplicate, the result is "Duplicate Day Name"!
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
              value={this.state.weekMealPlan}
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
          {/* <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div> */}
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
