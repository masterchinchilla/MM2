import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import jwtDecode from "jwt-decode";
import axios from "axios";
//test user credentials:
//email:johnQPublic@gmail.com
//password:johnQPublic@GRF2022
//comment

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        email: "",
        password: "",
      },
      errors: {
        email: null,
        password: null,
      },
      authErrors: null,
      showPassword: false,
      currentGRFUser: this.props.currentGRFUser,
    };
  }
  schema = Joi.object({
    email: Joi.string()
      .trim()
      .min(6)
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().trim().min(8).required(),
  });
  componentDidMount() {
    let serverAuthErrors = this.props.serverAuthErrors;
    if (serverAuthErrors) {
      this.setState({
        errors: { email: serverAuthErrors, password: serverAuthErrors },
      });
    }
  }
  validateForm = () => {
    // const result = Joi.validate(this.state.account, this.schema, {
    //   abortEarly: false,
    // });
    const result = this.schema.validate(this.state.account);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProp = (propName, value) => {
    const rule = this.schema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: value };
    const { error } = subSchema.validate(objToValidate);
    return error ? error.details[0].message : null;
  };
  handleUpdateEmail = (e) => {
    let account = { email: "", password: this.state.account.password };
    account.email = e.target.value;
    const valErrors = { email: "", password: this.state.errors.password };
    valErrors.email = this.validateProp("email", account.email);
    this.setState({ account: account, errors: valErrors, authErrors: null });
  };
  handleUpdatePassword = (e) => {
    let account = { email: this.state.account.email, password: "" };
    account.password = e.target.value;
    const valErrors = { email: this.state.errors.email, password: "" };
    valErrors.password = this.validateProp("password", account.password);
    this.setState({ account: account, errors: valErrors, authErrors: null });
  };
  toggleShowPassword = (e) => {
    this.setState({ showPassword: e.target.checked });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let account = this.state.account;
    const valErrors = this.validateForm();
    if (valErrors) {
      this.setState({ errors: valErrors });
      return;
    } else {
      let response;
      try {
        response = await axios.post("http://localhost:5000/auth", account);
        const token = response.headers["x-auth-token"];
        localStorage.setItem("token", token);
        this.props.getCurrentUser(token);
      } catch (authErrors) {
        this.setState({
          authErrors: authErrors.response.data,
        });
      }
    }
  };
  render() {
    return (
      <div className="card m-5">
        <div className="card-header">
          <h3 className="card-title">Login</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group m-2">
              <label className="form-label mb-2">
                <span className="requiredFldLbl">* </span>Email
              </label>
              <input
                type={"text"}
                className="form-control"
                value={this.state.account.email}
                onChange={this.handleUpdateEmail}
              />
              {this.state.errors.email ? (
                <div className="alert alert-danger">
                  {this.state.errors.email}
                </div>
              ) : null}
            </div>
            <div className="form-group m-2">
              <label className="form-label mb-2">
                <span className="requiredFldLbl">* </span>Password
              </label>
              <input
                type={this.state.showPassword === true ? "text" : "password"}
                className="form-control"
                value={this.state.account.password}
                onChange={this.handleUpdatePassword}
              />
              {this.state.errors.password ? (
                <div className="alert alert-danger">
                  {this.state.errors.password}
                </div>
              ) : null}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={this.state.showPassword}
                  id="flexCheckDefault"
                  onChange={this.toggleShowPassword}
                  checked={this.state.showPassword}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Show Password?
                </label>
              </div>
            </div>
            <div className="form-group submitBttnWRightErrs">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary"
                disabled={
                  this.state.account.email !== "" &&
                  this.state.account.password !== "" &&
                  this.state.errors.email === null &&
                  this.state.errors.password === null &&
                  this.state.authErrors === null
                    ? false
                    : true
                }
              />
              {this.state.authErrors ? (
                <div className="alert alert-danger">
                  {this.state.authErrors}
                </div>
              ) : null}
            </div>
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/grfuser/create">Register Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
