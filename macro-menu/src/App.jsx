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
  async function getCurrentUser(userCreds) {
    let response;
    response = await axios.post("http://localhost:5000/auth", userCreds);
    if (response.status === 401) {
      console.log(response);
      return response.data.errors;
    } else {
      const token = response.headers["x-auth-token"];
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      currentGRFUser = decodedToken.currentGRFUser;
      const thisUsersId = decodedToken.currentGRFUser._id;
      // window.location = "/weekMealPlans/usersWMPs/" + thisUsersId;
      return currentGRFUser;
    }
  }
  async function createNewUser(newUser) {
    let response;
    response = await axios.post("http://localhost:5000/GRFUsers/add", newUser);
    const token = response.headers["x-auth-token"];
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    currentGRFUser = decodedToken.currentGRFUser;
    console.log(currentGRFUser);
    const thisUsersId = decodedToken.currentGRFUser._id;
    window.location = "/weekMealPlans/usersWMPs/" + thisUsersId;
  }
  return (
    <BrowserRouter>
      <Navbar currentGRFUser={currentGRFUser} />
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
        <Route exact path="/grfusers/edit/:id" component={GRFUserDetail} />
        {/* <Route
          exact
          path="/weekMealPlans/usersWMPs/:id"
          component={WeekMealPlansList2}
        /> */}
        <Route
          exact
          path="/weekMealPlans/usersWMPs/:id"
          render={(props) => (
            <WeekMealPlansList2
              {...props}
              getCurrentUser={getCurrentUser}
              thisGRFUser={currentGRFUser}
            />
          )}
        />
        {/* <Route exact path={"/weekMealPlans/usersWMPs/" + currentGRFUser._id}>
          <WeekMealPlansList2 getCurrentUser={getCurrentUser} />
        </Route> */}
        {/* <Route exact path="/grfuser/create" component={CreateGRFUser} /> */}
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
              // thisGRFUser={currentGRFUser}
            />
          )}
        />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
};
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentGRFUser: {
//         _id: "",
//       },
//     };
//   }
//   getCurrentUser = async (userCreds) => {
//     let response;
//     response = await axios.post("http://localhost:5000/auth", userCreds);
//     const token = response.headers["x-auth-token"];
//     localStorage.setItem("token", token);
//     const decodedToken = jwtDecode(token);
//     const thisUsersId = decodedToken.currentGRFUser._id;
//     window.location = "/weekMealPlans/usersWMPs/" + thisUsersId;
//     this.setState({ currentGRFUser: decodedToken.currentGRFUser });
//   };
//   render() {
//     const getCurrentUser = this.getCurrentUser;
//     return (
//       <BrowserRouter>
//         <Navbar thisGRFUser={this.state.currentGRFUser} />
//         <br />
//         <Switch>
//           <Route
//             exact
//             path="/weekmealplan/admin/:id"
//             component={WeekMealPlanDetailAdmin}
//           />
//           <Route exact path="/grfusers" component={GRFUsersList} />
//           <Route exact path="/create" component={CreateWeekMealPlan} />
//           <Route
//             exact
//             path="/weekMealPlansList"
//             component={WeekMealPlansList}
//           />
//           <Route
//             exact
//             path="/weekMealPlans/edit/:id/:isNewWMP?"
//             component={WeekMealPlanDetail}
//           />
//           <Route exact path="/grfusers/edit/:id" component={GRFUserDetail} />
//           <Route
//             exact
//             path="/weekMealPlans/usersWMPs/:id"
//             component={WeekMealPlansList2}
//           />
//           <Route
//             exact
//             path={"/weekMealPlans/usersWMPs/" + this.state.currentGRFUser._id}
//           >
//             <WeekMealPlansList2 getCurrentUser={getCurrentUser} />
//           </Route>
//           <Route exact path="/grfuser/create" component={CreateGRFUser} />
//           <Route
//             exact
//             path="/"
//             render={(props) => (
//               <Login
//                 {...props}
//                 getCurrentUser={getCurrentUser}
//                 thisGRFUser={this.state.currentGRFUser}
//               />
//             )}
//           />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

export default App;
