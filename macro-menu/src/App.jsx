import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/navbar.component";
import WeekMealPlansList from "./components/WeekMealPlansList.component";
import WeekMealPlanDetail from "./components/WeekMealPlanDetail.component";
import CreateWeekMealPlan from "./components/CreateWeekMealPlan.component";
import CreateGRFUser from "./components/CreateGRFUser.component";
import GRFUserDetail from "./components/GRFUserDetail.component";
import GRFUsersList from "./components/GRFUsersList.component";
import WeekMealPlanDetailAdmin from "./components/adminVersions/WeekMealPlanDetail.Admin.component";

function App() {
  library.add(fas);
  return (
    <Router>
      <Navbar />
      <br />
      <Route exact path="/" component={WeekMealPlansList} />
      <Route
        exact
        path="/weekmealplan/admin/:id"
        component={WeekMealPlanDetailAdmin}
      />
      <Route exact path="/grfusers" component={GRFUsersList} />
      <Route exact path="/create" component={CreateWeekMealPlan} />
      <Route exact path="/edit/:id" component={WeekMealPlanDetail} />
      <Route exact path="/grfusers/edit/:id" component={GRFUserDetail} />
      <Route exact path="/grfuser/create" component={CreateGRFUser} />
    </Router>
  );
}

export default App;
