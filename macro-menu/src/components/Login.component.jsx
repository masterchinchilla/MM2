import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//test user credentials:
//email:johnQPublic@gmail.com
//password:johnQPublic@GRF2022

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    showPassword: false,
    currentGRFUser: this.props.currentGRFUser,
  };
  handleUpdateEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleUpdatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  toggleShowPassword = (e) => {
    this.setState({ showPassword: e.target.checked });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    // try {
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    response = await axios.post("http://localhost:5000/auth", user);
    const validUserId = response.data;
    localStorage.setItem("token", response.headers["x-auth-token"]);
    this.props.getCurrentUser();
    window.location =
      "/weekMealPlans/usersWMPs/" + this.state.currentGRFUser._id;
    // } catch (error) {
    //   console.log(response);
    // }
    // .then((response) => console.log(response));
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
                value={this.state.email}
                onChange={this.handleUpdateEmail}
              />
            </div>
            <div className="form-group m-2">
              <label className="form-label mb-2">
                <span className="requiredFldLbl">* </span>Password
              </label>
              <input
                type={this.state.showPassword === true ? "text" : "password"}
                className="form-control"
                value={this.state.password}
                onChange={this.handleUpdatePassword}
              />
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
            {/* <div className="form-group m-2">
              <label className="mb-2">Password</label>
              <input
                type={"password"}
                className="form-control"
                value={this.state.password}
                onChange={this.handleUpdatePassword}
              />
            </div> */}
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
