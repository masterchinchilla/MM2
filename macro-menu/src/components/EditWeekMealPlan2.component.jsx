import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";

export default class EditWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      name: "",
      GRFUsers: [],
      GRFUser: "",
      thisWeeksDays: [],
      //   createdAt: "",
      //   updatedAt: "",
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
        console.log(response);
        if (response.data.length > 0) {
          this.setState({
            thisWeeksDays: response.data.map((day) => day),
          });
        }
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

  onSubmit = (e) => {
    e.preventDefault();
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
  daysList() {
    return this.state.thisWeeksDays.map((e) => {
      return <Day thisDay={e} onDeleteDay={this.handleDeleteDay} key={e._id} />;
    });
  }
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>Edit Week Meal Plan</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group mt-2">
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
          <div className="form-group mt-2 mb-4">
            <Link
              to={{
                pathname: "/",
              }}
            >
              <button type="button" className="btn btn-primary" href="#">
                &lt;&nbsp;go back
              </button>
            </Link>
            <input
              type="submit"
              value="save changes"
              className="btn btn-warning m-3"
              style={{ color: "white" }}
            />
          </div>
        </form>
        <table className="table table-light">
          <thead className="thead thead-light">
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Day of Week</th>
              <th scope="col">Week Meal Plan Day is part of</th>
              <th scope="col">Created</th>
              <th scope="col">Last Update</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.daysList()}</tbody>
        </table>
      </div>
    );
  }
}
