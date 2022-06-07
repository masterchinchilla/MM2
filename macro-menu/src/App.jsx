import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/navbar.component";
import WeekMealPlansList from "./components/WeekMealPlansList.component";
import WeekMealPlansList2 from "./components/WeekMealPlansList2.component";
import WeekMealPlanDetail from "./components/WeekMealPlanDetail.component";
import CreateWeekMealPlan from "./components/CreateWeekMealPlan.component";
import CreateGRFUser from "./components/CreateGRFUser.component";
import GRFUserDetail from "./components/GRFUserDetail.component";
import GRFUsersList from "./components/GRFUsersList.component";
import WeekMealPlanDetailAdmin from "./components/adminVersions/WeekMealPlanDetail.Admin.component";
import Login from "./components/Login.component";
library.add(fas);
class App extends Component {
  state = {
    currentGRFUser: {
      _id: "",
    },
  };
  getCurrentUser = () => {
    const jwt = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwt);
    this.setState({ currentGRFUser: decodedToken.currentGRFUser });
  };
  render() {
    return (
      <Router>
        <Navbar thisGRFUser={this.state.currentGRFUser} />
        {/* <Navbar /> */}
        <br />
        <Switch>
          <Route
            exact
            path="/weekmealplan/admin/:id"
            component={WeekMealPlanDetailAdmin}
          />
          <Route exact path="/grfusers" component={GRFUsersList} />
          <Route exact path="/create" component={CreateWeekMealPlan} />
          <Route
            exact
            path="/weekMealPlansList"
            component={WeekMealPlansList}
          />
          <Route
            exact
            path="/weekMealPlans/edit/:id/:isNewWMP?"
            component={WeekMealPlanDetail}
          />
          <Route exact path="/grfusers/edit/:id" component={GRFUserDetail} />
          <Route
            exact
            // path={"/weekMealPlans/usersWMPs/" + this.state.currentGRFUser._id}
            path="/weekMealPlans/usersWMPs/:id"
          >
            <WeekMealPlansList2 currentGRFUser={this.state.currentGRFUser} />
          </Route>
          <Route exact path="/grfuser/create" component={CreateGRFUser} />
          <Route exact path="/">
            <Login
              getCurrentUser={this.getCurrentUser}
              currentGRFUser={this.state.currentGRFUser}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
