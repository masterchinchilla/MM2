import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            All Week Meal Plans
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
            <div className="navbar-nav mr-auto mb-2 mb-lg-0" id="navbarNav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  All Week Meal Plans
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Week Meal Plan
                </Link>
                <li className="nav-item">
                  <Link to="/grfuser" className="nav-link">
                    Create GRF User
                  </Link>
                </li>
              </li>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
