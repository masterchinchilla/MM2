import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import HowChowHaloForkAltColor from "./HowChowHaloForkAltColor.component";
import HowChowHaloFrkAltClrInvrtd from "./HowChowHaloFrkAltClrInvrtd.component";

class Navbar extends Component {
  state = {
    jwt: "",
    currentGRFUser: {
      _id: "",
      userGroups: "GRFUser",
      handle: "Register or Log-In >",
    },
    backEndHtmlRoot: this.props.backEndHtmlRoot,
  };
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      return;
    } else {
      this.setState({ jwt: jwt });
      const decodedToken = jwtDecode(jwt);
      const currentUserId = decodedToken.currentGRFUser._id;
      axios
        .get(this.state.backEndHtmlRoot + "GRFUsers/" + currentUserId)
        .then((response) => {
          this.setState({ currentGRFUser: response.data });
        })
        .catch((error) => console.log(error));
    }
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
    return {
      sx: {
        bgcolor: this.stringToColor(string),
      },
      // children: `${string.split(" ")[0][0]}${string.split(" ")[1][0]}`,
    };
  };
  render() {
    const currentGRFUser = this.state.currentGRFUser;
    const jwt = this.state.jwt;
    return (
      <nav className="navbar ps-4 pe-2">
        <div className="navbarBrandCont">
          <Link to={"/"}>
            {/* <HowChowHaloForkAltColor /> */}
            <HowChowHaloFrkAltClrInvrtd />
            {/* <FontAwesomeIcon icon="fa-solid fa-house" className="biggerIcon" /> */}
          </Link>
          <Link
            // to={
            //   !jwt
            //     ? "/"
            //     : {
            //         pathname: "/weekMealPlans/usersWMPs/" + currentGRFUser._id,
            //         state: { currentGRFUser: currentGRFUser },
            //       }
            // }
            to={"/"}
            className="navbar-brand"
          >
            HowChow
          </Link>
        </div>

        <ul className="navbar-nav mr-auto mb-lg-0" id="navbarNav">
          {!currentGRFUser ? (
            ""
          ) : currentGRFUser.userGroups !== "Admin" ? (
            ""
          ) : (
            <li className="nav-item">
              <Link to="/grfusers" className="nav-link">
                GRF Users List
              </Link>
            </li>
          )}
        </ul>
        <div className="btn-group dropstart usrHndlAndDrpDwn">
          <span className="usrHndlOnNvBr">
            {this.state.currentGRFUser.handle}
          </span>
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle profileDDBttn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            // disabled={window.location.pathname === "/" ? true : false}
          >
            <Avatar
              alt={this.state.currentGRFUser.handle}
              src={this.state.currentGRFUser.photoURL}
              {...this.stringAvatar(this.state.currentGRFUser.handle)}
            />
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item profileDDLi">
              {!jwt ? (
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/weekMealPlans",
                  }}
                >
                  Register or Login
                </Link>
              ) : (
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/logout",
                  }}
                >
                  Logout
                </Link>
              )}
            </li>
            <li className="dropdown-item profileDDLi">
              {!currentGRFUser._id ? (
                ""
              ) : (
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/grfusers/edit/" + currentGRFUser._id,
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
    );
  }
}

export default Navbar;
