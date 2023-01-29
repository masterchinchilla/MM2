import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbar from "./navbar.component";
import WeekMealPlansList2 from "./WeekMealPlansList2.component";
import CreateGRFUser from "./CreateGRFUser.component";
import GRFUserDetail from "./GRFUserDetail.component";
import GRFUsersList from "./GRFUsersList.component";
import NewNewWeekMealPlan from "./NewNewWeekMealPlan.component";
import Login from "./Login.component";
import Logout from "./Logout.component";
class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      serverAuthErrors: this.props.serverAuthErrors,
      frontEndHtmlRoot: this.props.frontEndHtmlRoot,
      backEndHtmlRoot: this.props.backEndHtmlRoot,
      axiosCallConfig: {},
      currentGRFUser: {},
      thisUsersId: "",
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    } else {
      const decodedToken = jwtDecode(localStorage.token);
      const currentGRFUser = decodedToken.currentGRFUser;
      this.setState({
        userSignedIn: true,
        axiosCallConfig: { "x-auth-token": token },
        currentGRFUser: currentGRFUser,
        thisUsersId: currentGRFUser._id,
      });
    }
  }
  render() {
    ///data
    const userSignedIn = this.state.userSignedIn;
    const serverAuthErrors = this.state.serverAuthErrors;
    const frontEndHtmlRoot = this.state.frontEndHtmlRoot;
    const backEndHtmlRoot = this.state.backEndHtmlRoot;
    const axiosCallConfig = this.state.axiosCallConfig;
    const currentGRFUser = this.state.currentGRFUser;
    const thisUsersId = currentGRFUser._id;
    ///methods
    const getCurrentUser = this.props.getCurrentUser;
    const createNewUser = this.props.createNewUser;
    const notifyFn = this.props.notifyFn;
    return (
      <BrowserRouter
        getCurrentUser={getCurrentUser}
        thisGRFUser={currentGRFUser}
        backEndHtmlRoot={backEndHtmlRoot}
        frontEndHtmlRoot={frontEndHtmlRoot}
        axiosCallConfig={axiosCallConfig}
        notifyFn={notifyFn}
      >
        <Navbar
          currentGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
        />
        <br />
        <Switch
          getCurrentUser={getCurrentUser}
          thisGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
          frontEndHtmlRoot={frontEndHtmlRoot}
          axiosCallConfig={axiosCallConfig}
          notifyFn={notifyFn}
        >
          <Route exact path="/grfusers" component={GRFUsersList} />
          <Route
            exact
            path="/weekMealPlansNewNew/edit/:id/:isNewWMP?"
            render={(props) => (
              <NewNewWeekMealPlan
                {...props}
                getCurrentUser={getCurrentUser}
                thisGRFUser={currentGRFUser}
                backEndHtmlRoot={backEndHtmlRoot}
                frontEndHtmlRoot={frontEndHtmlRoot}
                axiosCallConfig={axiosCallConfig}
                notifyFn={notifyFn}
              />
            )}
          />
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
            render={(props) => {
              if (userSignedIn) {
                return (
                  <Redirect
                    to={{
                      pathname: "/weekMealPlans/usersWMPs/" + thisUsersId,
                    }}
                  />
                );
              } else {
                return (
                  <CreateGRFUser
                    {...props}
                    createNewUser={createNewUser}
                    thisGRFUser={currentGRFUser}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/"
            render={(props) => {
              if (userSignedIn) {
                return (
                  <Redirect
                    to={{
                      pathname: "/weekMealPlans/usersWMPs/" + thisUsersId,
                    }}
                  />
                );
              } else {
                return (
                  <Login
                    {...props}
                    getCurrentUser={getCurrentUser}
                    thisGRFUser={currentGRFUser}
                    serverAuthErrors={serverAuthErrors}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/logout"
            render={(props) => {
              if (userSignedIn === true) {
                console.log("user signed-in is true");
                return <Logout {...props} />;
              } else {
                console.log("user signed-in is false");
                return (
                  <Redirect
                    to={{
                      pathname: "/",
                    }}
                  />
                );
              }
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
