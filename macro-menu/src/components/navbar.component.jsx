import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WeekMealPlansList from "./WeekMealPlansList.component";
import CreateGRFUser from "./CreateGRFUser.component";
import CreateWeekMealPlan from "./CreateWeekMealPlan.component";
import GRFUsersList from "./GRFUsersList.component";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid pl-3 pr-3">
          <Link to="/" className="navbar-brand">
            Macro Menu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0" id="navbarNav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Week Meal Plans List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/grfusers" className="nav-link">
                  GRF Users List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create New Week Meal Plan
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/grfuser/create" className="nav-link">
                  Create GRFUser
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
