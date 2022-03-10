import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";

import Navbar from "./components/navbar.component";
import WeekMealPlansList from "./components/WeekMealPlansList.component";
import DaysList from "./components/DaysList.component";
import EditWeekMealPlan from "./components/EditWeekMealPlan2.component";
import CreateWeekMealPlan from "./components/CreateWeekMealPlan.component";
import CreateGRFUser from "./components/CreateGRFUser.component";
import EditGRFUser from "./components/EditGRFUser.component";
import GRFUsersList from "./components/GRFUsersList.component";
import CreateDay from "./components/CreateDay.component";
// import GRFUser from "./components/GRFUser.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route exact path="/" component={WeekMealPlansList} />
      <Route exact path="/grfusers" component={GRFUsersList} />
      <Route exact path="/days" component={DaysList} />
      <Route exact path="/create" component={CreateWeekMealPlan} />
      <Route exact path="/edit/:id" component={EditWeekMealPlan} />
      <Route exact path="/grfusers/edit/:id" component={EditGRFUser} />
      <Route exact path="/grfuser/create" component={CreateGRFUser} />
      <Route exact path="/day/create" component={CreateDay} />
    </Router>
  );
}

export default App;
