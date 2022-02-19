import React, { Component } from "react";

class GRFUser extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.thisGRFUser._id}</td>
        <td>{this.props.thisGRFUser.namePrefix}</td>
        <td>{this.props.thisGRFUser.givenName}</td>
        <td>{this.props.thisGRFUser.middleName}</td>
        <td>{this.props.thisGRFUser.familyName}</td>
        <td>{this.props.thisGRFUser.nameSuffix}</td>
        <td>{this.props.thisGRFUser.email}</td>
        <td>{this.props.thisGRFUser.password}</td>
        <td>{this.props.thisGRFUser.handle}</td>
        <td>{this.props.thisGRFUser.certURL}</td>
        <td>{this.props.thisGRFUser.certName}</td>
        <td>{this.props.thisGRFUser.createdAt}</td>
        <td>{this.props.thisGRFUser.updatedAt}</td>
      </tr>
    );
  }
}

export default GRFUser;
