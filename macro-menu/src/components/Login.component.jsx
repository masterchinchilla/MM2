import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

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
      // email: "",
      // password: "",
      errors: {
        email: "",
        password: "",
      },
      // username:'Username is required.',
      //   password:'Password is required'
      showPassword: false,
      // currentGRFUser: this.props.currentGRFUser,
    };
  }
  schema = {
    email: Joi.string().required().min(6).max(100).email(),
    password: Joi.string().required().min(8).max(100),
  };
  validateForm = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };
  validateProp = (name, value) => {
    const obj = { [name]: value };
    const subSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(
      obj,
      subSchema
      // ,{abortEarly: false,}
    );
    return error ? error.details[0].message : null;
  };
  handleUpdateEmail = (e) => {
    let account = { email: "", password: this.state.account.password };
    account.email = e.target.value;
    const errors = { email: "", password: this.state.errors.password };
    // errors.email = this.validateProp("email", account.email);
    this.setState({ account: account, errors: errors });
  };
  handleUpdatePassword = (e) => {
    let account = { email: this.state.account.email, password: "" };
    account.password = e.target.value;
    const errors = { email: this.state.errors.email, password: "" };
    // errors.password = this.validateProp("password", account.password);
    this.setState({ account: account, errors: errors });
  };
  toggleShowPassword = (e) => {
    this.setState({ showPassword: e.target.checked });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let account = this.state.account;
    const errors = this.validateForm();
    this.setState({ errors });
    if (errors) {
      console.log(errors);
      return;
    } else {
      const res = this.props.getCurrentUser(account);
      if (!res.errors) {
        return null;
      } else {
        this.setState({ errors: res.errors });
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
            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary mt-4 mb-1"
                style={{ marginLeft: "0.5rem" }}
                // disabled={
                //   this.state.errors.email === null &&
                //   this.state.errors.password === null
                //     ? false
                //     : true
                // }
              />
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
