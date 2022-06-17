import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import WeekMealPlansList from "./WeekMealPlansList.component";
import CreateGRFUser from "./CreateGRFUser.component";
import CreateWeekMealPlan from "./CreateWeekMealPlan.component";
import GRFUsersList from "./GRFUsersList.component";

class Navbar extends Component {
  state = {
    jwt: "",
    currentGRFUser: { _id: "", userGroups: "GRFUser" },
  };
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      return;
    } else {
      this.setState({ jwt: jwt });
      const decodedToken = jwtDecode(jwt);
      this.setState({ currentGRFUser: decodedToken.currentGRFUser });
    }
  }
  render() {
    const currentGRFUser = this.state.currentGRFUser;
    const jwt = this.state.jwt;
    return (
      <nav className="navbar navbar-dark bg-dark ps-4 pe-2">
        <Link
          to={
            !jwt
              ? "/"
              : "/weekMealPlans/usersWMPs/" + this.state.currentGRFUser._id
          }
          className="navbar-brand"
        >
          GRF Macro Menu
        </Link>
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
        <div className="btn-group dropstart">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle profileDDBttn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            disabled={window.location.pathname === "/" ? true : false}
          >
            <FontAwesomeIcon icon="fa-solid fa-circle-user" />
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item profileDDLi">
              {!jwt ? (
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/",
                  }}
                >
                  Login
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
              {!currentGRFUser ? (
                ""
              ) : (
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/grfusers/edit/" + currentGRFUser._id,
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
// const Navbar = () => {
//   const jwt = localStorage.getItem("token");
//   let decodedToken;
//   let currentGRFUser = { _id: "" };
//   if (jwt) {
//     decodedToken = jwtDecode(jwt);
//     currentGRFUser = decodedToken.currentGRFUser;
//   }
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-4 pe-2">
//       <Link
//         to={!jwt ? "/" : "/weekMealPlans/usersWMPs/" + currentGRFUser._id}
//         className="navbar-brand"
//       >
//         GRF Macro Menu
//       </Link>
//       <ul className="navbar-nav mr-auto mb-lg-0" id="navbarNav">
//         {!currentGRFUser ? (
//           ""
//         ) : currentGRFUser.userGroups !== "Admin" ? (
//           ""
//         ) : (
//           <li className="nav-item">
//             <Link to="/grfusers" className="nav-link">
//               GRF Users List
//             </Link>
//           </li>
//         )}
//       </ul>
//       <div className="btn-group dropstart">
//         <button
//           type="button"
//           className="btn btn-secondary dropdown-toggle profileDDBttn"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <FontAwesomeIcon icon="fa-solid fa-circle-user" />
//         </button>
//         <ul className="dropdown-menu">
//           <li className="dropdown-item profileDDLi">
//             {!jwt ? (
//               <Link
//                 className="nav-link"
//                 to={{
//                   pathname: "/",
//                 }}
//               >
//                 Login
//               </Link>
//             ) : (
//               <Link
//                 className="nav-link"
//                 to={{
//                   pathname: "/logout",
//                 }}
//               >
//                 Logout
//               </Link>
//             )}
//           </li>
//           <li className="dropdown-item profileDDLi">
//             {!currentGRFUser ? (
//               ""
//             ) : (
//               <Link
//                 className="nav-link"
//                 to={{
//                   pathname: "/grfusers/edit/" + currentGRFUser._id,
//                 }}
//               >
//                 Profile
//               </Link>
//             )}
//           </li>
//         </ul>
//       </div>
//       {/* </div>
//       </div> */}
//     </nav>
//   );
// };

// export default Navbar;

// export default class Navbar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       thisGRFUser: this.props.thisGRFUser,
//     };
//   }

//   render() {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid pl-3 pr-3">
//           <Link to="/" className="navbar-brand">
//             GRF Macro Menu
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav mr-auto mb-2 mb-lg-0" id="navbarNav">
//               <li className="nav-item">
//                 <Link to="/grfusers" className="nav-link">
//                   GRF Users List
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link"
//                   to={{
//                     pathname:
//                       "/weekMealPlans/usersWMPs/" + this.state.thisGRFUser._id,
//                   }}
//                 >
//                   My Week Meal Plans
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link"
//                   to={{
//                     pathname: "/",
//                   }}
//                 >
//                   Login
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }
