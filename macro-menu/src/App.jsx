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
        <Route path="/" element={<WeekMealPlansList />} />
        <Route path="/edit/:id" element={<EditWeekMealPlan />} />
        <Route path="/create" element={<CreateWeekMealPlan />} />
        <Route path="/grfuser" element={<CreateGRFUser />} />
      </Routes>
    </Router>
  );
}

export default App;
