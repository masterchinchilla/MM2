import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
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
import Logout from "./components/Logout.component";
library.add(fas);
const App = (props) => {
  let currentGRFUser = {};
  let serverAuthErrors = "";
  const frontEndHtmlRoot = "http://localhost:3000/";
  const backEndHtmlRoot = "http://localhost:5000/";
  async function getCurrentUser(token) {
    const decodedToken = jwtDecode(token);
    currentGRFUser = decodedToken.currentGRFUser;
    const thisUsersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + thisUsersId;
  }
  async function createNewUser(newUser) {
    let response;
    response = await axios.post(backEndHtmlRoot + "GRFUsers/add", newUser);
    const token = response.headers["x-auth-token"];
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    currentGRFUser = decodedToken.currentGRFUser;
    const thisUsersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + thisUsersId;
  }
  return (
    <BrowserRouter>
      <Navbar
        currentGRFUser={currentGRFUser}
        backEndHtmlRoot={backEndHtmlRoot}
      />
      <br />
      <Switch>
        <Route
          exact
          path="/weekmealplan/admin/:id"
          component={WeekMealPlanDetailAdmin}
        />
        <Route exact path="/grfusers" component={GRFUsersList} />
        <Route exact path="/create" component={CreateWeekMealPlan} />
        <Route exact path="/weekMealPlansList" component={WeekMealPlansList} />
        <Route
          exact
          path="/weekMealPlans/edit/:id/:isNewWMP?"
          component={WeekMealPlanDetail}
        />
        {/* <Route exact path="/grfusers/edit/:id" component={GRFUserDetail} /> */}
        <Route
          exact
          path="/grfusers/edit/:id"
          render={(props) => (
            <GRFUserDetail
              {...props}
              getCurrentUser={getCurrentUser}
              thisGRFUser={currentGRFUser}
              backEndHtmlRoot={backEndHtmlRoot}
            />
          )}
        />
        <Route
          exact
          path="/weekMealPlans/usersWMPs/:id"
          render={(props) => (
            <WeekMealPlansList2
              {...props}
              getCurrentUser={getCurrentUser}
              thisGRFUser={currentGRFUser}
              backEndHtmlRoot={backEndHtmlRoot}
            />
          )}
        />
        <Route
          exact
          path="/grfuser/create"
          render={(props) => (
            <CreateGRFUser
              {...props}
              createNewUser={createNewUser}
              thisGRFUser={currentGRFUser}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <Login
              {...props}
              getCurrentUser={getCurrentUser}
              thisGRFUser={currentGRFUser}
              serverAuthErrors={serverAuthErrors}
            />
          )}
        />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
