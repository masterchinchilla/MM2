import React, { Component } from "react";
import axios from "axios";

export default class CreateWeekMealPlan extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      GRFUsers: [],
      GRFUser: {},
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          GRFUsers: response.data.map((GRFUser) => GRFUser),
          GRFUser: response.data[0]._id,
        });
      }
      console.log(this.state);
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeGRFUser(e) {
    this.setState({
      GRFUser: e.target.value,
    });
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();
    const weekMealPlan = {
      name: this.state.name,
      GRFUser: this.state.GRFUser,
    };
    console.log(weekMealPlan);
    axios
      .post("http://localhost:5000/weekMealPlans/add", weekMealPlan)
      .then((window.location = "/"));
  }

  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>New Week Meal Plan</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>GRF User: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.GRFUser}
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
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group mt-4 mb-4">
            <input
              type="submit"
              value="Create Week Meal Plan"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
