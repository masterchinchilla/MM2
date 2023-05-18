import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import HowChowHaloForkAltColor from "./HowChowHaloForkAltColor.component";
import HowChowHaloFrkAltClrInvrtd from "./HowChowHaloFrkAltClrInvrtd.component";

class Navbar extends Component {
  constructor(props) {
    super(props);
    const {
      leftNavOpen,
      rightNavOpen,
      parentComponent,
      closeNavOnClick,
      onGetRecordsWFilterFn,
    } = this.props;
    this.state = {
      jwt: "",
      currentGRFUser: {
        _id: "",
        userGroups: "GRFUser",
        handle: "Register or Log-In >",
      },
      backEndHtmlRoot: this.props.backEndHtmlRoot,
      leftNavOpen: leftNavOpen,
      rightNavOpen: rightNavOpen,
      componentLineage: `Navbar_for_${parentComponent}`,
    };
  }
  getData = async () => {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      return;
    } else {
      this.setState({ jwt: jwt });
      const decodedToken = jwtDecode(jwt);
      const currentUserId = decodedToken.currentGRFUser._id;
      const apiReqRes = await this.props.onGetRecordsWFilterFn(
        "GRFUser",
        "_id",
        currentUserId,
        `get`
      );
      const foundRecords = apiReqRes.foundRecords;
      if (foundRecords.length > 0) {
        this.setState({ currentGRFUser: foundRecords[0] });
      }
    }
  };
  componentDidMount() {
    this.getData();
  }
  stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };
  stringAvatar = (string) => {
    let jwt = this.state.jwt;
    return {
      sx: {
        bgcolor: jwt ? this.stringToColor(string) : "#005b6f",
      },
      // children: `${string.split(" ")[0][0]}${string.split(" ")[1][0]}`,
    };
  };

  render() {
    const { closeNavOnClick, leftNavOpen, rightNavOpen } = this.props;
    const { currentGRFUser, componentLineage } = this.state;
    let jwt = this.state.jwt;
    return (
      <div className="navbarCont">
        <nav className="navbar" onClick={() => closeNavOnClick("left")}>
          <div className="bsNavCont">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              aria-controls="bsNavLeftContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                leftNavOpen ? `show` : ``
              }`}
              id="bsNavLeftContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  key={`li_for_"Catharta_Home"_Link_for_leftDDown_for_${componentLineage}`}
                  className="nav-item"
                >
                  <Link
                    key={`Link_for_"Catharta_Home"_for_leftDDown_for_${componentLineage}`}
                    to={"/"}
                    className="nav-link"
                  >
                    <FontAwesomeIcon
                      key={`FontAwesomeIcon_for_"earth-europe"_for_leftDDown_for_${componentLineage}`}
                      icon="fa-solid fa-earth-europe"
                    />
                    <span className="navTextWIcon">Catharta Home</span>
                  </Link>
                </li>
                <li
                  key={`li_for_"HowChow_Home"_Link_for_leftDDown_for_${componentLineage}`}
                  className="nav-item"
                >
                  <Link
                    key={`Link_for_"HowChow_Home"_for_leftDDown_for_${componentLineage}`}
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                  >
                    <FontAwesomeIcon
                      key={`FontAwesomeIcon_for_"house"_for_leftDDown_for_${componentLineage}`}
                      icon="fa-solid fa-house"
                    />
                    <span className="navTextWIcon">HowChow Home</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <nav className="myNavBar">
          <Link
            key={`Link_for_"HowChow"_for_navBrandSctn_for_${componentLineage}`}
            to={"/"}
            className="myNavBrand"
          >
            <HowChowHaloFrkAltClrInvrtd
              key={`HowChowHaloFrkAltClrInvrtd_for_navBrandSctn_for_${componentLineage}`}
              componentLineage={componentLineage}
            />
            <span>HowChow</span>
          </Link>
        </nav>
        <nav
          className="navbarRight"
          onClick={() => {
            closeNavOnClick("right");
          }}
        >
          <button
            className="navbar-toggler navTogglerRight"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bsNavRightContent"
            aria-controls="bsNavRightContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="usrHndlOnNvBr">
              {this.state.currentGRFUser.handle}
            </span>
            <span className="navbar-toggler-icon">
              <Avatar
                key={`Avatar_for_rightDDown_for_${componentLineage}`}
                alt={this.state.currentGRFUser.handle}
                src={this.state.currentGRFUser.photoURL}
                {...this.stringAvatar(this.state.currentGRFUser.handle)}
              />
            </span>
          </button>
          <div
            className={`collapse navbar-collapse rightNavDDown ${
              rightNavOpen ? `show` : ``
            }`}
            id="bsNavRightContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                key={`li_for_"Register"_or_"Logout"_Links_for_rightDDown_for_${componentLineage}`}
                className="nav-item"
              >
                {!jwt ? (
                  <Link
                    key={`Link_for_"Register"_for_rightDDown_for_${componentLineage}`}
                    className="nav-link"
                    to={{
                      pathname: "/weekMealPlans",
                    }}
                  >
                    Register or Login
                  </Link>
                ) : (
                  <Link
                    key={`Link_for_"Logout"_for_rightDDown_for_${componentLineage}`}
                    className="nav-link"
                    to={{
                      pathname: "/logout",
                    }}
                  >
                    Logout
                  </Link>
                )}
              </li>
              <li
                key={`li_for_"Profile"_Link_for_rightDDown_for_${componentLineage}`}
                className="nav-item"
              >
                {!currentGRFUser._id ? (
                  ""
                ) : (
                  <Link
                    key={`Link_for_"Profile"_for_rightDDown_for_${componentLineage}`}
                    className="nav-link"
                    to={{
                      pathname: "/createOrEditUser",
                      state: { currentGRFUser: currentGRFUser },
                    }}
                  >
                    Profile
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
