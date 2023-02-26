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
import HomePage from "./HomePage.component";
import BackToTopButton from "./BackToTopButton.component";
import UserProfileParent from "./UserProfileParent.component";
import { getCurrentUser } from "../services/authService";
class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    const {
      serverAuthErrors,
      frontEndHtmlRoot,
      backEndHtmlRoot,
      currentGRFUser,
      // updateUser,
      // notifyFn,
      // notifyOfErrors,
      // updateThisObjsValErrs,
      // parseHTTPResErrs,
      // setAllKeysToSameValue,
      // getRndIntegerFn,
      // returnElementKey
    } = this.props;
    this.state = {
      userSignedIn: false,
      serverAuthErrors: serverAuthErrors,
      frontEndHtmlRoot: frontEndHtmlRoot,
      backEndHtmlRoot: backEndHtmlRoot,
      // axiosCallConfig: {},
      currentGRFUser: currentGRFUser,
      thisUsersId: currentGRFUser ? currentGRFUser._id : "",
      scrollBttnVisible: false,
    };
  }
  toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      this.setState({ scrollBttnVisible: true });
    } else if (scrolled <= 300) {
      this.setState({ scrollBttnVisible: false });
    }
  };
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.toggleVisible);
    const currentUser = this.props.currentGRFUser
      ? this.props.currentGRFUser
      : getCurrentUser();
    this.setState({
      currentGRFUser: currentUser,
      userSignedIn: currentUser ? true : false,
      thisUsersId: currentUser ? currentUser._id : "",
    });
  }
  render() {
    ///data
    const userSignedIn = this.state.userSignedIn;
    const serverAuthErrors = this.state.serverAuthErrors;
    const frontEndHtmlRoot = this.state.frontEndHtmlRoot;
    const backEndHtmlRoot = this.state.backEndHtmlRoot;
    const axiosCallConfig = this.state.axiosCallConfig;
    const currentGRFUser = this.state.currentGRFUser;
    const thisUsersId = currentGRFUser ? currentGRFUser._id : "";
    const scrollBttnVisible = this.state.scrollBttnVisible;
    ///methods
    const decodeToken = this.props.decodeToken;
    const createNewUser = this.props.createNewUser;
    const updateUser = this.props.updateUser;
    const notifyFn = this.props.notifyFn;
    const notifyOfErrors = this.props.notifyOfErrors;
    const updateThisObjsValErrs = this.props.updateThisObjsValErrs;
    const parseHTTPResErrs = this.props.parseHTTPResErrs;
    const setAllKeysToSameValue = this.props.setAllKeysToSameValue;
    const getRndIntegerFn = this.props.getRndIntegerFn;
    const returnElementKey = this.props.returnElementKey;
    const scrollToTop = this.scrollToTop;
    return (
      <BrowserRouter
        decodeToken={decodeToken}
        thisGRFUser={currentGRFUser}
        backEndHtmlRoot={backEndHtmlRoot}
        frontEndHtmlRoot={frontEndHtmlRoot}
        // axiosCallConfig={axiosCallConfig}
        updateUser={updateUser}
        notifyFn={notifyFn}
        notifyOfErrors={notifyOfErrors}
        updateThisObjsValErrs={updateThisObjsValErrs}
        parseHTTPResErrs={parseHTTPResErrs}
        setAllKeysToSameValue={setAllKeysToSameValue}
        getRndIntegerFn={getRndIntegerFn}
        returnElementKey={returnElementKey}
      >
        <Navbar
          currentGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
        />
        <br />
        <Switch
          decodeToken={decodeToken}
          thisGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
          frontEndHtmlRoot={frontEndHtmlRoot}
          // axiosCallConfig={axiosCallConfig}
          updateUser={updateUser}
          notifyFn={notifyFn}
          notifyOfErrors={notifyOfErrors}
          updateThisObjsValErrs={updateThisObjsValErrs}
          parseHTTPResErrs={parseHTTPResErrs}
          setAllKeysToSameValue={setAllKeysToSameValue}
          getRndIntegerFn={getRndIntegerFn}
          returnElementKey={returnElementKey}
        >
          <Route
            exact
            path="/createOrEditUser/:isNew?"
            // component={UserProfileParent}
            render={(props) => {
              return (
                <UserProfileParent
                  {...props}
                  currentUser={currentGRFUser}
                  backEndHtmlRoot={backEndHtmlRoot}
                  updateThisObjsValErrs={updateThisObjsValErrs}
                  createNewUser={createNewUser}
                  updateUser={updateUser}
                  setAllKeysToSameValue={setAllKeysToSameValue}
                  returnElementKey={returnElementKey}
                  getRndIntegerFn={getRndIntegerFn}
                />
              );
            }}
          />
          <Route exact path="/grfusers" component={GRFUsersList} />
          <Route
            exact
            path="/weekMealPlansNewNew/edit/:id/:isNewWMP?"
            render={(props) => (
              <NewNewWeekMealPlan
                {...props}
                // decodeToken={decodeToken}
                thisGRFUser={currentGRFUser}
                backEndHtmlRoot={backEndHtmlRoot}
                parseHTTPResErrs={parseHTTPResErrs}
                updateThisObjsValErrs={updateThisObjsValErrs}
                notifyOfErrors={notifyOfErrors}
                notifyFn={notifyFn}
                setAllKeysToSameValue={setAllKeysToSameValue}
                getRndIntegerFn={getRndIntegerFn}
                returnElementKey={returnElementKey}
              />
            )}
          />
          <Route
            exact
            path="/grfusers/edit/:id"
            render={(props) => (
              <GRFUserDetail
                // {...props}
                decodeToken={decodeToken}
                updateUser={updateUser}
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
                decodeToken={decodeToken}
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
            path="/weekMealPlans"
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
                    decodeToken={decodeToken}
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
          <Route
            path="/"
            // component={HomePage}
            render={(props) => {
              return <HomePage currentGRFUser={currentGRFUser} />;
            }}
          />
        </Switch>
        <BackToTopButton
          scrollToTop={scrollToTop}
          scrollBttnVisible={scrollBttnVisible}
        />
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
