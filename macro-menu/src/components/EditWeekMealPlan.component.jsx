import React, { Component } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default class EditWeekMealPlan extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: this.props.id,
      name: "",
      GRFUsers: [],
      GRFUser: "",
      createdAt: "",
      updatedAt: "",
    };
  }
  componentDidMount() {
    console.log(this.state);
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.state.id)
      .then((response) => {
        this.setState({
          id: response.data.name,
          name: response.data.name,
          GRFUser: response.data.GRFUser._id,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        });
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          GRFUsers: response.data.map((GRFUser) => GRFUser.handle),
        });
      }
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
      id: this.state.id,
      name: this.state.name,
      GRFUser: this.state.GRFUser,
    };
    axios.post(
      "http://localhost:5000/weekMealPlans/update/" + weekMealPlan.id,
      weekMealPlan
    );
    // .then((window.location = "/"));
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
          <div className="form-group">
            <label>Author: </label>
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
          <div className="form-group mt-4 mb-4">
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
