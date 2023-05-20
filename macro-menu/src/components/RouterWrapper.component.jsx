import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./navbar.component";
import WeekMealPlansList2 from "./WeekMealPlansList2.component";
import NewNewWeekMealPlan from "./NewNewWeekMealPlan.component";
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
      getRndIntegerFn,
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
      // onDeleteFromDbFn,
    } = this.props;
    const thisUsersId = currentGRFUser
      ? currentGRFUser._id
      : getRndIntegerFn(10000000, 99999999);
    const componentLineage = `GRFUser_${thisUsersId}`;
    this.state = {
      userSignedIn: false,
      serverAuthErrors: serverAuthErrors,
      frontEndHtmlRoot: frontEndHtmlRoot,
      backEndHtmlRoot: backEndHtmlRoot,
      currentGRFUser: currentGRFUser,
      thisUsersId: thisUsersId,
      componentLineage: componentLineage,
      scrollBttnVisible: false,
      viewportHeight: window.innerHeight,
      mainContentPaneHeight: 0,
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
  updateMainContentPaneHeight = () => {
    // let mainContentPaneHeight = 200;
    // if (this.mainContentPane) {
    //   mainContentPaneHeight = this.mainContentPane.clientHeight;
    // }
    // this.setState({ mainContentPaneHeight });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.toggleVisible);
    const currentUser = this.props.currentGRFUser
      ? this.props.currentGRFUser
      : getCurrentUser();
    // this.updateMainContentPaneHeight();
    // window.addEventListener("resize", this.updateMainContentPaneHeight);
    // const mainContentPaneHeight = this.mainContentPane.clientHeight;
    this.setState({
      currentGRFUser: currentUser,
      userSignedIn: currentUser ? true : false,
      thisUsersId: currentUser ? currentUser._id : "",
      // mainContentPaneHeight: mainContentPaneHeight,
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
      componentLineage,
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
      onDeleteFromDbFn,
    } = this.props;
    const scrollToTop = this.scrollToTop;
    return (
      <BrowserRouter
        key={`BrowserRouter_for_HowChowApp`}
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
        onDeleteFromDbFn={onDeleteFromDbFn}
        componentLineage={componentLineage}
        updateMainContentPaneHeight={this.updateMainContentPaneHeight}
      >
        <div className="spaContWHeadAndFoot">
          <Navbar
            key={`NavBar_for_HowChowApp`}
            currentGRFUser={currentGRFUser}
            backEndHtmlRoot={backEndHtmlRoot}
            parentComponent={`HowChowApp`}
            leftNavOpen={leftNavOpen}
            rightNavOpen={rightNavOpen}
            closeNavOnClick={closeNavOnClick}
            onGetRecordsWFilterFn={onGetRecordsWFilterFn}
            componentLineage={componentLineage}
          />
          <br />
          <div
            className="mainContentPane"
            ref={(mainContentPane) => {
              this.mainContentPane = mainContentPane;
            }}
            style={{ height: `fitContent` }}
          >
            <Switch
              key={`Switch_for_BrowserRouter_for_HowChowApp`}
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
              onDeleteFromDbFn={onDeleteFromDbFn}
              componentLineage={componentLineage}
              updateMainContentPaneHeight={this.updateMainContentPaneHeight}
            >
              <Route
                key={`Route_"/createOrEditUser/:isNew?"_for_HowChowApp`}
                exact
                path="/createOrEditUser/:isNew?"
                render={(props) => {
                  return (
                    <UserProfileParent
                      key={`UserProfileParent_Route_Cmpnnt_for_HowChowApp`}
                      {...props}
                      currentUser={currentGRFUser}
                      backEndHtmlRoot={backEndHtmlRoot}
                      componentLineage={`GRFUser_${thisUsersId}`}
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
                      updateMainContentPaneHeight={
                        this.updateMainContentPaneHeight
                      }
                    />
                  );
                }}
              />
              <Route
                key={`Route_"/weekMealPlansNewNew/edit/:id/:isNewWMP?"_for_HowChowApp`}
                exact
                path="/weekMealPlansNewNew/edit/:id/:isNewWMP?"
                render={(props) => (
                  <NewNewWeekMealPlan
                    key={`NewNewWeekMealPlan_Route_Cmpnnt_for_HowChowApp`}
                    {...props}
                    thisGRFUser={currentGRFUser}
                    backEndHtmlRoot={backEndHtmlRoot}
                    componentLineage={componentLineage}
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
                    onDeleteFromDbFn={onDeleteFromDbFn}
                    updateMainContentPaneHeight={
                      this.updateMainContentPaneHeight
                    }
                  />
                )}
              />
              <Route
                key={`Route_"/weekMealPlans/usersWMPs/:id"_for_HowChowApp`}
                exact
                path="/weekMealPlans/usersWMPs/:id"
                render={(props) => (
                  <WeekMealPlansList2
                    key={`WeekMealPlansList2_Route_Cmpnnt_for_HowChowApp`}
                    {...props}
                    decodeToken={decodeToken}
                    thisGRFUser={currentGRFUser}
                    backEndHtmlRoot={backEndHtmlRoot}
                    componentLineage={componentLineage}
                    closeNavOnClick={closeNavOnClick}
                    onGetFullRecordSetFn={onGetFullRecordSetFn}
                    onGetCurrentUserFn={onGetCurrentUserFn}
                    updateMainContentPaneHeight={
                      this.updateMainContentPaneHeight
                    }
                  />
                )}
              />
              <Route
                key={`Route_"/weekMealPlans"_for_HowChowApp`}
                exact
                path="/weekMealPlans"
                render={(props) => {
                  if (userSignedIn) {
                    return (
                      <Redirect
                        key={`Redirect_"/weekMealPlans/usersWMPs/"_for_Route_"/weekMealPlans"_for_HowChowApp`}
                        to={{
                          pathname: "/weekMealPlans/usersWMPs/" + thisUsersId,
                        }}
                      />
                    );
                  } else {
                    return (
                      <NewLogin
                        key={`NewLogin_Route_Cmpnnt_for_HowChowApp`}
                        {...props}
                        decodeToken={decodeToken}
                        componentLineage={`NewLogin_for_HowChowApp`}
                        closeNavOnClick={closeNavOnClick}
                        returnElementKey={returnElementKey}
                        parseAndUpdateObjValErrsFn={parseAndUpdateObjValErrsFn}
                        updateMainContentPaneHeight={
                          this.updateMainContentPaneHeight
                        }
                      />
                    );
                  }
                }}
              />
              <Route
                key={`Route_"/logout"_for_HowChowApp`}
                exact
                path="/logout"
                render={(props) => {
                  if (userSignedIn === true) {
                    console.log("user signed-in is true");
                    return (
                      <Logout
                        key={`Logout_Route_Cmpnnt_for_HowChowApp`}
                        componentLineage={`Logout_for_HowChowApp`}
                        {...props}
                      />
                    );
                  } else {
                    console.log("user signed-in is false");
                    return (
                      <Redirect
                        key={`Redirect_"/"_for_Route_"/logout"_for_HowChowApp`}
                        to={{
                          pathname: "/",
                        }}
                      />
                    );
                  }
                }}
              />
              <Route
                key={`Route_"/"_for_HowChowApp`}
                path="/"
                render={(props) => {
                  return (
                    <HomePage
                      key={`HomePage_Route_Cmpnnt_for_HowChowApp`}
                      currentGRFUser={currentGRFUser}
                      componentLineage={`HomePage_for_HowChowApp`}
                      closeNavOnClick={closeNavOnClick}
                      updateMainContentPaneHeight={
                        this.updateMainContentPaneHeight
                      }
                    />
                  );
                }}
              />
            </Switch>
          </div>
          <footer
            className="footer"
            // style={{
            //   position:
            //     this.state.mainContentPaneHeight >
            //     0.9 * this.state.viewportHeight
            //       ? `inherit`
            //       : `absolute`,
            // }}
          >
            <p>Copyright &copy; {thisYear} by Catharta, Ltd.</p>
          </footer>
        </div>
        <BackToTopButton
          key={`BackToTopButton_for_HowChowApp`}
          componentLineage={`BackToTopButton_for_HowChowApp`}
          scrollToTop={scrollToTop}
          scrollBttnVisible={scrollBttnVisible}
        />
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
