import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateGRFUser from "./CreateGRFUser.component";
import GRFUser from "./GRFUser.component";
import EditGRFUser from "./EditGRFUser.component";

export default class GRFUsersList extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteGRFUser = this.handleDeleteGRFUser.bind(this);
    this.GRFUsersList = this.GRFUsersList.bind(this);
    this.state = { GRFUsers: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/grfusers/")
      .then((response) => {
        this.setState({
          GRFUsers: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeleteGRFUser(id) {
    if (
      id === "609f3e444ee536749c75c729" ||
      id === "60e6664d60b9221e84d134db"
    ) {
      console.log("This user is protected!");
    } else {
      axios
        .delete("http://localhost:5000/grfusers/" + id)
        .then((response) => console.log(response.data));
      this.setState({
        GRFUsers: this.state.GRFUsers.filter((el) => el._id !== id),
      });
    }
  }
  GRFUsersList() {
    return this.state.GRFUsers.map((e) => {
      return (
        <GRFUser
          thisGRFUser={e}
          onDeleteGRFUser={this.handleDeleteGRFUser}
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
              <th colSpan="" scope="col"></th>
              <th colSpan="5" scope="col">
                Name
              </th>
              <th colSpan="3" scope="col"></th>
              <th colSpan="2" scope="col">
                Certification
              </th>
              <th colSpan="4" scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Record ID</th>
              <th scope="col">Prefix</th>
              <th scope="col">Given</th>
              <th scope="col">Middle</th>
              <th scope="col">Family</th>
              <th scope="col">Suffix</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Handle</th>
              <th scope="col">URL</th>
              <th scope="col">Name</th>
              <th scope="col">Created</th>
              <th scope="col">Last Update</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{this.GRFUsersList()}</tbody>
        </table>
        <Link to={"/grfuser/create/"}>
          <button type="button" className="btn btn-primary">
            add new
          </button>
        </Link>
      </div>
    );
  }
}
