import React, { Component } from "react";
import axios from "axios";

export default class WeekMealPlan extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGRFUser = this.onChangeGRFUser.bind(this);
    // this.onDeleteWeekMealPlan = this.props.onDeleteWeekMealPlan.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: this.props.thisWeekMealPlan,
      name: "",
      GRFUsers: [],
      GRFUser: "",
      createdAt: "",
      updatedAt: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.state.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          GRFUser: response.data.GRFUser,
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
    axios
      .post(
        "http://localhost:5000/weekMealPlans/update/" + weekMealPlan.id,
        weekMealPlan
      )
      .then((window.location = "/"));
  }

  render() {
    return (
      <tr>
        <form onSubmit={this.onSubmit}>
          <td>{this.state.id}</td>
          <td>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </td>
          <td>
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
          </td>
          <td>{this.state.createdAt}</td>
          <td>{this.state.updatedAt}</td>
          <td>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-primary"
            />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              href="#"
              // onClick={() => {
              //   this.deleteWeekMealPlan(this.state.id);
              // }}
            >
              delete
            </button>
          </td>
        </form>
      </tr>
    );
  }
}
