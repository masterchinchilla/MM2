import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WeekMealPlan = (props) => (
  <tr>
    <td>{props.thisWeekMealPlan._id}</td>
    <td>{props.thisWeekMealPlan.name}</td>
    <td>{props.thisWeekMealPlan.GRFUser}</td>
    <td>{props.thisWeekMealPlan.createdAt}</td>
    <td>{props.thisWeekMealPlan.updatedAt}</td>
    <td>
      <Link to={"update/" + props.thisWeekMealPlan._id}>
        <button
          onClick={console.log(props.thisWeekMealPlan._id)}
          type="button"
          className="btn btn-primary"
        >
          edit
        </button>
      </Link>
    </td>
    <td>
      <button
        type="button"
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteWeekMealPlan(props.thisWeekMealPlan._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);
export default class WeekMealPlansList extends Component {
  constructor(props) {
    super(props);
    this.deleteWeekMealPlan = this.deleteWeekMealPlan.bind(this);
    this.weekMealPlansList = this.weekMealPlansList.bind(this);
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
  deleteWeekMealPlan(id) {
    if (
      id === "609f3e444ee536749c75c729" ||
      id === "60e6664d60b9221e84d134db"
    ) {
      console.log("This Week Meal Plan is protected!");
    } else {
      axios
        .delete("http://localhost:5000/" + id)
        .then((response) => console.log(response.data));
      this.setState({
        weekMealPlans: this.state.weekMealPlans.filter((el) => el._id !== id),
      });
    }
  }
  weekMealPlansList() {
    return this.state.weekMealPlans.map((e) => {
      return (
        <WeekMealPlan
          thisWeekMealPlan={e}
          deleteWeekMealPlans={this.deleteWeekMealPlans}
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
            </tr>
          </thead>
          <tbody>{this.weekMealPlansList()}</tbody>
        </table>
        <Link to={"/weekMealPlan/create/"}>
          <button type="button" className="btn btn-primary">
            Add New
          </button>
        </Link>
      </div>
    );
  }
}
