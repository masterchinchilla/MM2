import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";

export default class DaysList extends Component {
  constructor(props) {
    super(props);
    this.daysList = this.daysList.bind(this);
    this.handleDeleteDay = this.handleDeleteDay.bind(this);
    this.state = { days: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/days")
      .then((response) => {
        this.setState({
          days: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeleteDay(id) {
    axios
      .delete("http://localhost:5000/days/" + id)
      .then((response) => console.log(response.data));
    this.setState({
      days: this.state.days.filter((el) => el._id !== id),
    });
  }
  daysList() {
    return this.state.days.map((e) => {
      return <Day thisDay={e} onDeleteDay={this.handleDeleteDay} key={e._id} />;
    });
  }
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <table className="table table-light">
          <thead className="thead thead-light">
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Day of Week</th>
              <th scope="col">Week Meal Plan Day is part of</th>
              <th scope="col">Name</th>
              <th scope="col">Created</th>
              <th scope="col">Last Update</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.daysList()}</tbody>
        </table>
        <Link to={"/day/create/"}>
          <button type="button" className="btn btn-primary">
            add new
          </button>
        </Link>
      </div>
    );
  }
}
