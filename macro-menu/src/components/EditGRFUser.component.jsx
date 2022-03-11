import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditGRFUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeNamePrefix = this.onChangeNamePrefix.bind(this);
    this.onChangeGivenName = this.onChangeGivenName.bind(this);
    this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
    this.onChangeFamilyName = this.onChangeFamilyName.bind(this);
    this.onChangeNameSuffix = this.onChangeNameSuffix.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onChangeCertURL = this.onChangeCertURL.bind(this);
    this.onChangeCertName = this.onChangeCertName.bind(this);
    this.onChangeVerified = this.onChangeVerified.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
    axios
      .get("http://localhost:5000/grfusers/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          id: response.data._id,
          namePrefix: response.data.namePrefix,
          givenName: response.data.givenName,
          middleName: response.data.middleName,
          familyName: response.data.familyName,
          nameSuffix: response.data.nameSuffix,
          email: response.data.email,
          password: response.data.password,
          handle: response.data.handle,
          certURL: response.data.certURL,
          certName: response.data.certName,
          verified: response.data.verified,
        });
      });
  }
  onChangeNamePrefix(e) {
    this.setState({
      namePrefix: e.target.value,
    });
  }
  onChangeGivenName(e) {
    this.setState({
      givenName: e.target.value,
    });
  }
  onChangeMiddleName(e) {
    this.setState({
      middleName: e.target.value,
    });
  }
  onChangeFamilyName(e) {
    this.setState({
      familyName: e.target.value,
    });
  }
  onChangeNameSuffix(e) {
    this.setState({
      nameSuffix: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeHandle(e) {
    this.setState({
      handle: e.target.value,
    });
  }
  onChangeCertURL(e) {
    this.setState({
      certURL: e.target.value,
    });
  }
  onChangeCertName(e) {
    this.setState({
      certName: e.target.value,
    });
  }
  onChangeVerified(e) {
    this.setState({
      verified: e.target.value,
    });
  }

  onSubmit(e) {
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
      .then((window.location = "/grfusers/"));
  }

  render() {
    return (
      <div className="container-fluid pl-4 pr-4">
        <h1>Edit GRF User</h1>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Name: </legend>
            <div className="form-group">
              <label>Prefix: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.namePrefix}
                onChange={this.onChangeNamePrefix}
              />
            </div>
            <div className="form-group">
              <label>Given Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.givenName}
                onChange={this.onChangeGivenName}
              />
            </div>
            <div className="form-group">
              <label>Middle: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.middleName}
                onChange={this.onChangeMiddleName}
              />
            </div>
            <div className="form-group">
              <label>Family Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.familyName}
                onChange={this.onChangeFamilyName}
              />
            </div>
            <div className="form-group">
              <label>Suffix: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.nameSuffix}
                onChange={this.onChangeNameSuffix}
              />
            </div>
          </fieldset>
          <br />
          <br />
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Handle: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.handle}
              onChange={this.onChangeHandle}
            />
          </div>
          <div className="form-group">
            <label>Cert URL: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.certURL}
              onChange={this.onChangeCertURL}
            />
          </div>
          <div className="form-group">
            <label>Cert Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.certName}
              onChange={this.onChangeCertName}
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
          <div className="form-group mt-2 mb-4">
            <Link
              to={{
                pathname: "/grfusers/",
              }}
            >
              <button type="button" className="btn btn-primary" href="#">
                &lt;&nbsp;go back
              </button>
            </Link>
            <input
              type="submit"
              value="Update GRF User"
              className="btn btn-warning m-3"
              style={{ color: "white" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditGRFUser;
