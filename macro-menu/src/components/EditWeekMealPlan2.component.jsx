import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
          //   createdAt: response.data.createdAt,
          //   updatedAt: response.data.updatedAt,
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
                  <option key={GRFUser} value={GRFUser}>
                    {GRFUser}
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
      </div>
    );
  }
}
