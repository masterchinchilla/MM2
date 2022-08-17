import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
class GRFUserDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      namePrefix: "",
      givenName: "",
      middleName: "",
      familyName: "",
      nameSuffix: "",
      email: "",
      password: "",
      handle: "",
      certURL: "",
      certName: "",
      verified: false,
    };
  }
  componentDidMount() {
    const decodedToken = jwtDecode(localStorage.token);
    const currentGRFUser = decodedToken.currentGRFUser;
    this.setState({
      id: currentGRFUser._id,
      namePrefix: currentGRFUser.namePrefix,
      givenName: currentGRFUser.givenName,
      middleName: currentGRFUser.middleName,
      familyName: currentGRFUser.familyName,
      nameSuffix: currentGRFUser.nameSuffix,
      email: currentGRFUser.email,
      password: currentGRFUser.password,
      handle: currentGRFUser.handle,
      certURL: currentGRFUser.certURL,
      certName: currentGRFUser.certName,
      verified: currentGRFUser.verified,
    });
  }
  handleUpdateProp = (e, propName) => {
    this.setState({
      [propName]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const thisGRFUser = {
      namePrefix: this.state.namePrefix,
      givenName: this.state.givenName,
      middleName: this.state.middleName,
      familyName: this.state.familyName,
      nameSuffix: this.state.nameSuffix,
      email: this.state.email,
      password: this.state.password,
      handle: this.state.handle,
      certURL: this.state.certURL,
      certName: this.state.certName,
      verified: this.state.verified,
    };
    console.log(thisGRFUser);
    axios
      .post(
        "http://localhost:5000/grfusers/update/" + this.props.match.params.id,
        thisGRFUser
      )
      .then((response) => console.log(response.data))
      .then(
        (window.location =
          "/weekMealPlans/usersWMPs/" + this.props.match.params.id)
      );
  };

  render() {
    return (
      <div className="card ms-4 me-4 registerCard">
        <div className="card-header">
          <h1>GRF User Profile</h1>
        </div>
        <div className="card-body">
          <form className="registerForm" onSubmit={this.onSubmit}>
            <div className="registerFormRow1">
              <fieldset className="registerBox1">
                <legend>Name</legend>
                <div className="form-group mb-2">
                  <label className="form-label">Prefix</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.namePrefix}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "namePrefix");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="requiredFldLbl">* </span>Given Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.givenName}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "givenName");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Middle</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.middleName}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "middleName");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="requiredFldLbl">* </span>Family Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.familyName}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "familyName");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Suffix</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.nameSuffix}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "nameSuffix");
                    }}
                  />
                </div>
              </fieldset>
              <fieldset className="registerBox2">
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="requiredFldLbl">* </span>Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "email");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="requiredFldLbl">* </span>Handle
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.handle}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "handle");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cert URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.certURL}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "certURL");
                    }}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cert Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.certName}
                    onChange={(e) => {
                      this.handleUpdateProp(e, "certName");
                    }}
                  />
                </div>
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheck"
                  />
                  <label className="form-check-label">Verified?</label>
                </div>
              </fieldset>
            </div>
            <div className="form-group registerFrmGrp">
              <input
                type="submit"
                value="Update"
                className="btn-lg btn-primary registerSubmit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default GRFUserDetail2;
