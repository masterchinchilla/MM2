import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateGRFUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      submitError: "",
      showPassword: false,
      pWordHasCapLetter: false,
      pWordHasLCaseLetter: false,
      pWordHasNum: false,
      pWordHasSpChar: false,
      pWord8Chars: false,
    };
  }

  onChangeNamePrefix = (e) => {
    this.setState({
      namePrefix: e.target.value,
    });
  };
  onChangeGivenName = (e) => {
    this.setState({
      givenName: e.target.value,
    });
  };
  onChangeMiddleName = (e) => {
    this.setState({
      middleName: e.target.value,
    });
  };
  onChangeFamilyName = (e) => {
    this.setState({
      familyName: e.target.value,
    });
  };
  onChangeNameSuffix = (e) => {
    this.setState({
      nameSuffix: e.target.value,
    });
  };
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onChangePassword = (e) => {
    let typedPWord = e.target.value;
    let pWordHasCapLetterPattern = /[A-Z]/;
    let pWordHasLCaseLetterPattern = /[a-z]/;
    let pWordHasNumPattern = /\d/;
    let pWordHasSpCharPattern = /[^\w\s]/;
    let pWordHasCapLetter = pWordHasCapLetterPattern.test(typedPWord);
    let pWordHasLCaseLetter = pWordHasLCaseLetterPattern.test(typedPWord);
    let pWordHasNum = pWordHasNumPattern.test(typedPWord);
    let pWordHasSpChar = pWordHasSpCharPattern.test(typedPWord);
    let pWord8Chars = typedPWord.length > 7;
    this.setState({
      password: e.target.value,
      pWordHasCapLetter: pWordHasCapLetter,
      pWordHasLCaseLetter: pWordHasLCaseLetter,
      pWordHasNum: pWordHasNum,
      pWordHasSpChar: pWordHasSpChar,
      pWord8Chars: pWord8Chars,
    });
  };
  onChangeHandle = (e) => {
    this.setState({
      handle: e.target.value,
    });
  };
  onChangeCertURL = (e) => {
    this.setState({
      certURL: e.target.value,
    });
  };
  onChangeCertName = (e) => {
    this.setState({
      certName: e.target.value,
    });
  };
  onChangeVerified = (e) => {
    this.setState({
      verified: e.target.value,
    });
  };
  toggleShowPassword = (e) => {
    // if ((this.state.showPassword = false)) {
    //   this.setState({ showPassword: true });
    // } else {
    //   this.setState({ showPassword: false });
    // }
    console.log(e);
    this.setState({ showPassword: e.target.checked });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const GRFUser = {
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
    this.props.createNewUser(GRFUser);
    // axios
    //   .post("http://localhost:5000/GRFUsers/add", GRFUser)
    //   .then((response) => {
    //     if (response.status === 400) {
    //       this.setState({ submitError: response });
    //     } else {

    //       localStorage.setItem("token", response.headers["x-auth-token"]);
    //       window.location = "/grfusers/";
    //     }
    //   });
  };

  render() {
    return (
      <div className="card ms-4 me-4 registerCard">
        <div className="card-header">
          <h1>New GRF User</h1>
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
                <div className="form-group mb-4">
                  <label className="form-label">
                    <span className="requiredFldLbl">* </span>Password
                  </label>
                  <input
                    type={
                      this.state.showPassword === true ? "text" : "password"
                    }
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                  <div className="rgstrShwPWrdRow">
                    <div className="form-check rgstrShwPwrdChck">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.showPassword}
                        id="flexCheckDefault"
                        onChange={this.toggleShowPassword}
                        checked={this.state.showPassword}
                      />
                      <label
                        className="form-check-label"
                        // htmlFor="flexCheckDefault"
                      >
                        Show Password?
                      </label>
                    </div>
                    <FontAwesomeIcon
                      icon="fa-solid fa-check"
                      className="pWordStrngthChkMrk"
                      hidden={
                        !this.state.pWordHasCapLetter ||
                        !this.state.pWordHasLCaseLetter ||
                        !this.state.pWordHasNum ||
                        !this.state.pWordHasSpChar ||
                        !this.state.pWord8Chars
                      }
                    />
                  </div>
                  <div className="pWordStrengthChckr form-control">
                    <h6 className="rgstrStrengthChckrHdr">
                      Password Requirements:
                    </h6>
                    <div className="form-check rgstrFrmChckItm">
                      <input
                        className="form-check-input rgstrChckBox"
                        type="checkbox"
                        value={this.state.pWordHasCapLetter}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWordHasCapLetter}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        At least 1 Capital A-Z
                      </label>
                    </div>
                    <div className="form-check rgstrFrmChckItm">
                      <input
                        className="form-check-input rgstrChckBox"
                        type="checkbox"
                        value={this.state.pWordHasLCaseLetter}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWordHasLCaseLetter}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        At least 1 lowercase a-z
                      </label>
                    </div>
                    <div className="form-check rgstrFrmChckItm">
                      <input
                        className="form-check-input rgstrChckBox"
                        type="checkbox"
                        value={this.state.pWordHasNum}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWordHasNum}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        At least 1 number
                      </label>
                    </div>
                    <div className="form-check rgstrFrmChckItm">
                      <input
                        className="form-check-input rgstrChckBox"
                        type="checkbox"
                        value={this.state.pWordHasSpChar}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWordHasSpChar}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        At least 1 special character
                      </label>
                    </div>
                    <div className="form-check rgstrFrmChckItm">
                      <input
                        className="form-check-input rgstrChckBox"
                        type="checkbox"
                        value={this.state.pWord8Chars}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWord8Chars}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        At least 8 characters
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label pWordHndlLbl">
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
                value="Create GRF User"
                className="btn-lg btn-primary registerSubmit"
              />
              <p className="alreadyRegistered">
                Already registered?&nbsp;
                <Link to="/">Login</Link>
              </p>
            </div>
            {this.state.submitError === "" ? (
              ""
            ) : (
              <div className="alert alert-danger" role="alert">
                User already exists!
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateGRFUser;
