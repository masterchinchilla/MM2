import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
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
      errors: {
        namePrefix: null,
        givenName: null,
        middleName: null,
        familyName: null,
        nameSuffix: null,
        email: null,
        password: null,
        handle: null,
        certURL: null,
        certName: null,
      },
      showPassword: false,
      pWordHasCapLetter: false,
      pWordHasLCaseLetter: false,
      pWordHasNum: false,
      pWordHasSpChar: false,
      pWordLengthOk: false,
    };
  }
  schema = Joi.object({
    namePrefix: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    givenName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(1)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      })
      .required(),
    middleName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    familyName: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(1)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      })
      .required(),
    nameSuffix: Joi.string()
      .trim()
      .regex(/^[A-Za-z\s]*$/)
      .min(0)
      .max(100)
      .messages({
        "string.pattern.base": "Name parts should be letters only",
      }),
    email: Joi.string()
      .trim()
      .min(6)
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().trim().min(8).max(100).required(),
    handle: Joi.string().trim().regex(/^\S/).min(3).max(100).required(),
    certURL: Joi.string().trim().min(4).uri(),
    certName: Joi.string().trim().min(1).max(300),
  });
  handleUpdateProp = (e, propName) => {
    const rule = this.schema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const propValue = e.target.value;
    const objToValidate = { [propName]: propValue };
    const { error } = subSchema.validate(objToValidate);
    const validationResult = error ? error : null;
    const validationError = validationResult
      ? validationResult.details[0].message
      : null;
    const stateErrors = this.state.errors;
    stateErrors[propName] = validationError;
    this.setState({
      [propName]: propValue,
      errors: stateErrors,
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
    let pWordLengthOk = typedPWord.length > 7 && typedPWord.length < 101;
    this.setState({
      password: e.target.value,
      pWordHasCapLetter: pWordHasCapLetter,
      pWordHasLCaseLetter: pWordHasLCaseLetter,
      pWordHasNum: pWordHasNum,
      pWordHasSpChar: pWordHasSpChar,
      pWordLengthOk: pWordLengthOk,
    });
  };
  toggleShowPassword = (e) => {
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
                    onChange={(e) => {
                      this.handleUpdateProp(e, "namePrefix");
                    }}
                  />
                  {this.state.errors.namePrefix ? (
                    <div className="alert alert-danger">
                      {this.state.errors.namePrefix}
                    </div>
                  ) : null}
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
                  {this.state.errors.givenName ? (
                    <div className="alert alert-danger">
                      {this.state.errors.givenName}
                    </div>
                  ) : null}
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
                  {this.state.errors.middleName ? (
                    <div className="alert alert-danger">
                      {this.state.errors.middleName}
                    </div>
                  ) : null}
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
                  {this.state.errors.familyName ? (
                    <div className="alert alert-danger">
                      {this.state.errors.familyName}
                    </div>
                  ) : null}
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
                  {this.state.errors.nameSuffix ? (
                    <div className="alert alert-danger">
                      {this.state.errors.nameSuffix}
                    </div>
                  ) : null}
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
                  {this.state.errors.email ? (
                    <div className="alert alert-danger">
                      {this.state.errors.email}
                    </div>
                  ) : null}
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
                        !this.state.pWordLengthOk
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
                        value={this.state.pWordLengthOk}
                        // id="flexCheckDefault"
                        onChange={() => {}}
                        checked={this.state.pWordLengthOk}
                        readOnly
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        8-100 characters
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
                    onChange={(e) => {
                      this.handleUpdateProp(e, "handle");
                    }}
                  />
                  {this.state.errors.handle ? (
                    <div className="alert alert-danger">
                      {this.state.errors.handle}
                    </div>
                  ) : null}
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
                  {this.state.errors.certURL ? (
                    <div className="alert alert-danger">
                      {this.state.errors.certURL}
                    </div>
                  ) : null}
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
                  {this.state.errors.certName ? (
                    <div className="alert alert-danger">
                      {this.state.errors.certName}
                    </div>
                  ) : null}
                </div>
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={this.state.verified}
                    id="flexCheck"
                    disabled
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
