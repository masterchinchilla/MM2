import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";

import Navbar from "./components/navbar.component";
import WeekMealPlansList from "./components/WeekMealPlansList.component";
// import WeekMealPlan from "./components/WeekMealPlan.component";
import EditWeekMealPlan from "./components/EditWeekMealPlan.component";
import CreateWeekMealPlan from "./components/CreateWeekMealPlan.component";
import CreateGRFUser from "./components/CreateGRFUser.component";
import EditGRFUser from "./components/EditGRFUser.component";
import GRFUsersList from "./components/GRFUsersList.component";
// import GRFUser from "./components/GRFUser.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route exact path="/" element={<WeekMealPlansList />} />
        <Route path="/grfusers" element={<GRFUsersList />} />
        <Route path="/weekMealPlan/create" element={<CreateWeekMealPlan />} />
        {/* <Route path="/weekMealPlan/:id" element={<WeekMealPlan />} /> */}
        <Route path="/weekMealPlan/edit/:id" element={<EditWeekMealPlan />} />
        <Route path="/GRFUser/create" element={<CreateGRFUser />} />
        <Route path="/GRFUsers/edit/:id" element={<EditGRFUser />} />
        {/* <Route path="/grfuser" element={<GRFUser />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
