import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
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
      <br />
      <Routes>
        <Route path="/" exact component={WeekMealPlansList} />
        <Route path="/edit/:id" exact component={EditWeekMealPlan} />
        <Route path="/create" exact component={CreateWeekMealPlan} />
        <Route path="/grfuser" exact component={CreateGRFUser} />
      </Routes>
    </Router>
  );
}

export default App;
