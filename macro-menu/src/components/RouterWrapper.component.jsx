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
import NewLogin from "./NewLogin.component";
class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    const {
      serverAuthErrors,
      frontEndHtmlRoot,
      backEndHtmlRoot,
      currentGRFUser,
      // leftNavOpen,
      // rightNavOpen,
      // closeNavOnClick,
      // createNewUser,
      // updateUser,
      // notifyFn,
      // notifyOfErrors,
      // updateThisObjsValErrs,
      // parseHTTPResErrs,
      // setAllKeysToSameValue,
      // getRndIntegerFn,
      // returnElementKey,
      // getCSValResultForPropFn,
      // trimEnteredValueFn,
      // parseAndUpdateObjValErrsFn,
      // onGetFullRecordSetFn,
      // onGetCurrentUserFn,
      // onGetRecordsWFilterFn,
      // onSaveUpdateToDbFn,
      // onCreateNewRecordInDbFn,
      // onCopyInDbFn,
    } = this.props;
    this.state = {
      userSignedIn: false,
      serverAuthErrors: serverAuthErrors,
      frontEndHtmlRoot: frontEndHtmlRoot,
      backEndHtmlRoot: backEndHtmlRoot,
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
    const thisYear = new Date().getFullYear();
    ///data
    const { leftNavOpen, rightNavOpen } = this.props;
    const {
      userSignedIn,
      serverAuthErrors,
      frontEndHtmlRoot,
      backEndHtmlRoot,
      axiosCallConfig,
      currentGRFUser,
      scrollBttnVisible,
    } = this.state;
    const thisUsersId = currentGRFUser ? currentGRFUser._id : "";
    ///methods
    const {
      closeNavOnClick,
      decodeToken,
      createNewUser,
      updateUser,
      notifyFn,
      notifyOfErrors,
      updateThisObjsValErrs,
      parseHTTPResErrs,
      setAllKeysToSameValue,
      getRndIntegerFn,
      returnElementKey,
      getCSValResultForPropFn,
      trimEnteredValueFn,
      parseAndUpdateObjValErrsFn,
      onGetFullRecordSetFn,
      onGetCurrentUserFn,
      onGetRecordsWFilterFn,
      onSaveUpdateToDbFn,
      onCreateNewRecordInDbFn,
      onCopyInDbFn,
    } = this.props;
    const scrollToTop = this.scrollToTop;
    return (
      <BrowserRouter
        decodeToken={decodeToken}
        thisGRFUser={currentGRFUser}
        backEndHtmlRoot={backEndHtmlRoot}
        frontEndHtmlRoot={frontEndHtmlRoot}
        leftNavOpen={leftNavOpen}
        rightNavOpen={rightNavOpen}
        closeNavOnClick={closeNavOnClick}
        createNewUser={createNewUser}
        updateUser={updateUser}
        notifyFn={notifyFn}
        notifyOfErrors={notifyOfErrors}
        updateThisObjsValErrs={updateThisObjsValErrs}
        parseHTTPResErrs={parseHTTPResErrs}
        setAllKeysToSameValue={setAllKeysToSameValue}
        getRndIntegerFn={getRndIntegerFn}
        returnElementKey={returnElementKey}
        getCSValResultForPropFn={getCSValResultForPropFn}
        trimEnteredValueFn={trimEnteredValueFn}
        parseAndUpdateObjValErrsFn={parseAndUpdateObjValErrsFn}
        onGetFullRecordSetFn={onGetFullRecordSetFn}
        onGetCurrentUserFn={onGetCurrentUserFn}
        onGetRecordsWFilterFn={onGetRecordsWFilterFn}
        onSaveUpdateToDbFn={onSaveUpdateToDbFn}
        onCreateNewRecordInDbFn={onCreateNewRecordInDbFn}
        onCopyInDbFn={onCopyInDbFn}
      >
        <Navbar
          currentGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
          leftNavOpen={leftNavOpen}
          rightNavOpen={rightNavOpen}
          closeNavOnClick={closeNavOnClick}
          onGetRecordsWFilterFn={onGetRecordsWFilterFn}
        />
        <br />
        <Switch
          decodeToken={decodeToken}
          thisGRFUser={currentGRFUser}
          backEndHtmlRoot={backEndHtmlRoot}
          frontEndHtmlRoot={frontEndHtmlRoot}
          closeNavOnClick={closeNavOnClick}
          createNewUser={createNewUser}
          updateUser={updateUser}
          notifyFn={notifyFn}
          notifyOfErrors={notifyOfErrors}
          updateThisObjsValErrs={updateThisObjsValErrs}
          parseHTTPResErrs={parseHTTPResErrs}
          setAllKeysToSameValue={setAllKeysToSameValue}
          getRndIntegerFn={getRndIntegerFn}
          returnElementKey={returnElementKey}
          getCSValResultForPropFn={getCSValResultForPropFn}
          trimEnteredValueFn={trimEnteredValueFn}
          parseAndUpdateObjValErrsFn={parseAndUpdateObjValErrsFn}
          onGetFullRecordSetFn={onGetFullRecordSetFn}
          onGetCurrentUserFn={onGetCurrentUserFn}
          onGetRecordsWFilterFn={onGetRecordsWFilterFn}
          onSaveUpdateToDbFn={onSaveUpdateToDbFn}
          onCreateNewRecordInDbFn={onCreateNewRecordInDbFn}
          onCopyInDbFn={onCopyInDbFn}
        >
          <Route
            exact
            path="/createOrEditUser/:isNew?"
            render={(props) => {
              // if (currentGRFUser) {
              return (
                <UserProfileParent
                  {...props}
                  currentUser={currentGRFUser}
                  backEndHtmlRoot={backEndHtmlRoot}
                  closeNavOnClick={closeNavOnClick}
                  updateThisObjsValErrs={updateThisObjsValErrs}
                  createNewUser={createNewUser}
                  updateUser={updateUser}
                  setAllKeysToSameValue={setAllKeysToSameValue}
                  returnElementKey={returnElementKey}
                  getRndIntegerFn={getRndIntegerFn}
                  getCSValResultForPropFn={getCSValResultForPropFn}
                  trimEnteredValueFn={trimEnteredValueFn}
                  onSaveUpdateToDbFn={onSaveUpdateToDbFn}
                />
              );
              // } else {
              //   return (
              //     <div
              //       className="spinner-border text-primary"
              //       role="status"
              //     ></div>
              //   );
              // }
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
                closeNavOnClick={closeNavOnClick}
                parseHTTPResErrs={parseHTTPResErrs}
                updateThisObjsValErrs={updateThisObjsValErrs}
                notifyOfErrors={notifyOfErrors}
                notifyFn={notifyFn}
                setAllKeysToSameValue={setAllKeysToSameValue}
                getRndIntegerFn={getRndIntegerFn}
                returnElementKey={returnElementKey}
                getCSValResultForPropFn={getCSValResultForPropFn}
                trimEnteredValueFn={trimEnteredValueFn}
                onGetFullRecordSetFn={onGetFullRecordSetFn}
                onGetRecordsWFilterFn={onGetRecordsWFilterFn}
                onSaveUpdateToDbFn={onSaveUpdateToDbFn}
                onCreateNewRecordInDbFn={onCreateNewRecordInDbFn}
                onCopyInDbFn={onCopyInDbFn}
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
                closeNavOnClick={closeNavOnClick}
                onGetFullRecordSetFn={onGetFullRecordSetFn}
                onGetCurrentUserFn={onGetCurrentUserFn}
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
                  <NewLogin
                    {...props}
                    decodeToken={decodeToken}
                    // thisGRFUser={currentGRFUser}
                    // serverAuthErrors={serverAuthErrors}
                    closeNavOnClick={closeNavOnClick}
                    returnElementKey={returnElementKey}
                    parseAndUpdateObjValErrsFn={parseAndUpdateObjValErrsFn}
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
              return (
                <HomePage
                  currentGRFUser={currentGRFUser}
                  closeNavOnClick={closeNavOnClick}
                />
              );
            }}
          />
        </Switch>
        <footer className="footer">
          <p>Copyright &copy; {thisYear} by Catharta, Ltd.</p>
        </footer>
        <BackToTopButton
          scrollToTop={scrollToTop}
          scrollBttnVisible={scrollBttnVisible}
        />
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
