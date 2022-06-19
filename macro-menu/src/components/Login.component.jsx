import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

//test user credentials:
//email:johnQPublic@gmail.com
//password:johnQPublic@GRF2022
//comment
const Login = (props) => {
  const [showPassword, toggleShowPassword] = useState(false);
  return (
    <div className="card m-5">
      <div className="card-header">
        <h3 className="card-title">Login</h3>
      </div>
      <div className="card-body p-4">
        <form>
          <div className="form-group m-2">
            <label className="form-label mb-2">
              <span className="requiredFldLbl">* </span>Email
            </label>
            <input
              type={"text"}
              className="form-control"
              value={props.account.email}
              onChange={(e) => {
                props.updateAccountProp("email", e);
              }}
            />
            {props.authErrors.email ? (
              <div className="alert alert-danger">{props.authErrors.email}</div>
            ) : null}
          </div>
          <div className="form-group m-2">
            <label className="form-label mb-2">
              <span className="requiredFldLbl">* </span>Password
            </label>
            <input
              type={showPassword === true ? "text" : "password"}
              className="form-control"
              value={props.account.password}
              onChange={(e) => {
                props.updateAccountProp("password", e);
              }}
            />
            {props.authErrors.password ? (
              <div className="alert alert-danger">
                {props.authErrors.password}
              </div>
            ) : null}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={showPassword}
                id="flexCheckDefault"
                onChange={() => {
                  toggleShowPassword(!showPassword);
                }}
                checked={showPassword}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password?
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Submit"
              className="btn btn-primary mt-4 mb-1"
              style={{ marginLeft: "0.5rem" }}
              disabled={
                props.authErrors.email === null &&
                props.authErrors.password === null
                  ? false
                  : true
              }
              onClick={props.getCurrentUser}
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
};
export default Login;
