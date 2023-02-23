import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import HowChowHaloForkAltColor from "./HowChowHaloForkAltColor.component";
import HowChowHaloFrkAltClrInvrtd from "./HowChowHaloFrkAltClrInvrtd.component";
import HamburgerMenu from "./HamburgerMenu.component";

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
    let jwt = this.state.jwt;
    return {
      sx: {
        bgcolor: jwt ? this.stringToColor(string) : "#005b6f",
      },
      // children: `${string.split(" ")[0][0]}${string.split(" ")[1][0]}`,
    };
  };
  render() {
    const currentGRFUser = this.state.currentGRFUser;
    let jwt = this.state.jwt;
    return (
      <div className="navbarCont">
        <nav className="navbar">
          <div className="bsNavCont">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#bsNavLeftContent"
              aria-controls="bsNavLeftContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="bsNavLeftContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    <FontAwesomeIcon icon="fa-solid fa-earth-europe" />
                    <span className="navTextWIcon">Catharta Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                    <span className="navTextWIcon">HowChow Home</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <nav className="myNavBar">
          <Link to={"/"} className="myNavBrand">
            <HowChowHaloFrkAltClrInvrtd />
            <span>HowChow</span>
          </Link>

          {/* <div className="btn-group dropstart usrHndlAndDrpDwn">
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
          </div> */}
        </nav>
        <nav className="navbarRight">
          {/* <div className=""> */}
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
                alt={this.state.currentGRFUser.handle}
                src={this.state.currentGRFUser.photoURL}
                {...this.stringAvatar(this.state.currentGRFUser.handle)}
              />
            </span>
          </button>
          <div
            className="collapse navbar-collapse rightNavDDown"
            id="bsNavRightContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
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
              <li className="nav-item">
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
              {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li> */}
            </ul>
            {/* <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
          </div>
          {/* </div> */}
        </nav>
      </div>
    );
  }
}
export default Navbar;
