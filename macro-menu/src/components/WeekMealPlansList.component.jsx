import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import WeekMealPlan from "./WeekMealPlan.component";
import CreateWeekMealPlan from "./CreateWeekMealPlan.component";

export default class WeekMealPlansList extends Component {
  constructor(props) {
    super(props);
    this.weekMealPlansList = this.weekMealPlansList.bind(this);
    this.handleDeleteWeekMealPlan = this.handleDeleteWeekMealPlan.bind(this);
    this.state = { weekMealPlans: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/weekMealPlans")
      .then((response) => {
        this.setState({
          weekMealPlans: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeleteWeekMealPlan(id) {
    if (
      id === "609f3e444ee536749c75c729" ||
      id === "60e6664d60b9221e84d134db"
    ) {
      console.log("This Week Meal Plan is protected!");
    } else {
      axios
        .delete("http://localhost:5000/weekMealPlans/" + id)
        .then((response) => console.log(response.data));
    }
    this.setState({
      weekMealPlans: this.state.weekMealPlans.filter((el) => el._id !== id),
    });
  }
  weekMealPlansList() {
    return this.state.weekMealPlans.map((e) => {
      return (
        <WeekMealPlan
          thisWeekMealPlan={e}
          onDeleteWeekMealPlan={this.handleDeleteWeekMealPlan}
          key={e._id}
        />
      );
    });
  }
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <table className="table table-light">
          <thead className="thead thead-light">
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Name</th>
              <th scope="col">GRF User</th>
              <th scope="col">Created</th>
              <th scope="col">Last Update</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.weekMealPlansList()}</tbody>
        </table>
        <Link to={"/create/"}>
          <button type="button" className="btn btn-primary">
            add new
          </button>
        </Link>
      </div>
    );
  }
}
