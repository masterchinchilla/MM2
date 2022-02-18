import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class GRFUsersList extends Component {
  constructor(props) {
    super(props);
    this.deleteGRFUser = this.deleteGRFUser.bind(this);
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
  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <table className="table table-light">
          <thead>
            <tr scope="col"></tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default GRFUsersList;
