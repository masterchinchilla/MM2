import React from "react";
import jwtDecode from "jwt-decode";
import http from "./services/httpService";
import Bootstrap from "bootstrap";
import Popper from "popper.js";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import RouterWrapper from "./components/RouterWrapper.component";
import auth from "./services/authService";
library.add(fas);
const App = () => {
  // Mosh recommends using ComponentDidMount to run getCurrentUser from auth service, but there is a reason (I don't remember) why we went with a functional component here and not a class component...
  let serverAuthErrors = "";
  const frontEndHtmlRoot = "http://localhost:3000/";
  const backEndHtmlRoot = "http://localhost:5000/";
  async function getCurrentUser(token) {
    const decodedToken = jwtDecode(token);
    const usersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + usersId;
  }
  async function createNewUser(newUser) {
    const response = await http.post(backEndHtmlRoot + "GRFUsers/add", newUser);
    const token = response.headers["x-auth-token"];
    auth.loginWithJwt(token);
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
