import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import WeekMealPlansList from "./components/WeekMealPlansList.component";
import EditWeekMealPlan from "./components/EditWeekMealPlan.component";
import CreateWeekMealPlan from "./components/CreateWeekMealPlan.component";
import CreateGRFUser from "./components/CreateGRFUser.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={WeekMealPlansList} />
      <Route path="/edit/:id" exact component={EditWeekMealPlan} />
      <Route path="/create" exact component={CreateWeekMealPlan} />
      <Route path="/grfuser" exact component={CreateGRFUser} />
    </Router>
  );
}

export default App;
