import React, { Component } from "react";

export default class CreateWeekMealPlan extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      GRFUsers: [],
      GRFUser: "",
    };
  }
  componentDidMount() {
    this.setState({
      GRFUsers: ["test user"],
      GRFUser: "test user",
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
  }

  onSubmit(e) {
    e.preventDefault();
    const weekMealPlan = {
      name: this.state.name,
      GRFUser: this.state.GRFUser,
    };
    console.log(weekMealPlan);
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
                  <option key={GRFUser} value={GRFUser}>
                    {GRFUser}
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
