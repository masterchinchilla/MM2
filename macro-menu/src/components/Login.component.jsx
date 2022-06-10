import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

//test user credentials:
//email:johnQPublic@gmail.com
//password:johnQPublic@GRF2022

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
      errors: {},
      // username:'Username is required.',
      //   password:'Password is required'
      showPassword: false,
      currentGRFUser: this.props.currentGRFUser,
    };
  }
  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleUpdateEmail = (e) => {
    let account = { email: "", password: this.state.account.password };
    account.email = e.target.value;
    this.setState({ account });
  };
  handleUpdatePassword = (e) => {
    let account = { email: this.state.account.email, password: "" };
    account.password = e.target.value;
    this.setState({ account });
  };
  toggleShowPassword = (e) => {
    this.setState({ showPassword: e.target.checked });
  };
  handleSubmit = (e) => {
    // e.preventDefault();
    let account = this.state.account;
    console.log(account);
    const errors = this.validate();
    this.setState({ errors });
    if (errors) {
      console.log(errors);
      return;
    } else {
      console.log(account);
      // this.props.getCurrentUser(account);
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
              {!this.state.errors.email ? (
                ""
              ) : (
                <div className="alert alert-danger">Email is required.</div>
              )}
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
              {!this.state.errors.password ? (
                ""
              ) : (
                <div className="alert alert-danger">Password is required.</div>
              )}
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
