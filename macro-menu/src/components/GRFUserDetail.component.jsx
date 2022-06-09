import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import UsersWMP from "./UsersWMP.component";

class GRFUserDetail extends Component {
  constructor(props) {
    super(props);
    this.listThisUsersWMPs = this.listThisUsersWMPs.bind(this);
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
      thisUsersWMPs: [],
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
    axios
      .get(
        "http://localhost:5000/weekmealplans/wmpsofthisuser/" +
          this.props.match.params.id
      )
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          this.setState({
            thisUsersWMPs: response.data.map((wmp) => wmp),
          });
        }
      });
  }
  listThisUsersWMPs() {
    return this.state.thisUsersWMPs.map((e) => {
      return <UsersWMP thisWMP={e} key={e._id} />;
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
      .then(
        (window.location =
          "/weekMealPlans/usersWMPs/" + this.props.match.params.id)
      );
  }

  render() {
    return (
      // <div className="container-fluid pl-4 pr-4">
      //   <h1>GRF User Detail</h1>
      //   <form onSubmit={this.onSubmit}>
      //     <fieldset>
      //       <legend>Name: </legend>
      //       <div className="form-group">
      //         <label>Prefix: </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={this.state.namePrefix}
      //           onChange={this.onChangeNamePrefix}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label>Given Name: </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={this.state.givenName}
      //           onChange={this.onChangeGivenName}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label>Middle: </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={this.state.middleName}
      //           onChange={this.onChangeMiddleName}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label>Family Name: </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={this.state.familyName}
      //           onChange={this.onChangeFamilyName}
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label>Suffix: </label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           value={this.state.nameSuffix}
      //           onChange={this.onChangeNameSuffix}
      //         />
      //       </div>
      //     </fieldset>
      //     <br />
      //     <br />
      //     <div className="form-group">
      //       <label>Email: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.email}
      //         onChange={this.onChangeEmail}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Password: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.password}
      //         onChange={this.onChangePassword}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Handle: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.handle}
      //         onChange={this.onChangeHandle}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Cert URL: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.certURL}
      //         onChange={this.onChangeCertURL}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Cert Name: </label>
      //       <input
      //         type="text"
      //         className="form-control"
      //         value={this.state.certName}
      //         onChange={this.onChangeCertName}
      //       />
      //     </div>
      //     <div className="form-check mt-4">
      //       <input
      //         className="form-check-input"
      //         type="checkbox"
      //         value=""
      //         id="flexCheck"
      //       />
      //       <label className="form-check-label">Verified?</label>
      //     </div>
      //     <div className="form-group mt-2 mb-4">
      //       <Link
      //         to={{
      //           pathname: "/grfusers/",
      //         }}
      //       >
      //         <button type="button" className="btn btn-primary" href="#">
      //           &lt;&nbsp;go back
      //         </button>
      //       </Link>
      //       <input
      //         type="submit"
      //         value="Update GRF User"
      //         className="btn btn-warning m-3"
      //         style={{ color: "white" }}
      //       />
      //     </div>
      //   </form>
      // </div>
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
                    onChange={this.onChangeNamePrefix}
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
                    onChange={this.onChangeGivenName}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Middle</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.middleName}
                    onChange={this.onChangeMiddleName}
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
                    onChange={this.onChangeFamilyName}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Suffix</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.nameSuffix}
                    onChange={this.onChangeNameSuffix}
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
                    onChange={this.onChangeEmail}
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
                    onChange={this.onChangeHandle}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cert URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.certURL}
                    onChange={this.onChangeCertURL}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cert Name</label>
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

export default GRFUserDetail;
