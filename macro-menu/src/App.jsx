import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import RouterWrapper from "./components/RouterWrapper.component";
library.add(fas);
const App = () => {
  let serverAuthErrors = "";
  const frontEndHtmlRoot = "http://localhost:3000/";
  const backEndHtmlRoot = "http://localhost:5000/";
  async function getCurrentUser(token) {
    const decodedToken = jwtDecode(token);
    const usersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + usersId;
  }
  async function createNewUser(newUser) {
    const response = await axios.post(
      backEndHtmlRoot + "GRFUsers/add",
      newUser
    );
    const token = response.headers["x-auth-token"];
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    const usersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + usersId;
  }
  return (
    <RouterWrapper
      serverAuthErrors={serverAuthErrors}
      frontEndHtmlRoot={frontEndHtmlRoot}
      backEndHtmlRoot={backEndHtmlRoot}
      getCurrentUser={getCurrentUser}
      createNewUser={createNewUser}
    />
  );
};

export default App;
