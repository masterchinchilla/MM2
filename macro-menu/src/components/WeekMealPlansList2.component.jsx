import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
class WMPListForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      thisGRFUser: {},
      weekMealPlans: [],
      thisUsersWMPs: [],
      allOtherWMPs: [],
    };
  }
  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwt);
    this.setState({ thisGRFUser: decodedToken.currentGRFUser });

    const thisGRFUserId = this.props.match.params.id;
    // const thisGRFUserId = "609f3e444ee536749c75c729";
    // axios
    //   .get("http://localhost:5000/grfusers/" + thisGRFUserId)
    //   .then((response) => {
    //     this.setState({ thisGRFUser: response.data });
    //   });
    axios
      .get("http://localhost:5000/weekMealPlans")
      .then((response) => {
        let thisUsersWMPs = response.data.filter((wmp) => {
          return wmp.GRFUser._id === thisGRFUserId;
        });
        let allOtherWMPs = response.data.filter((wmp) => {
          return wmp.GRFUser._id !== thisGRFUserId;
        });
        if (thisUsersWMPs === undefined) {
          thisUsersWMPs = [];
        }
        this.setState({
          thisUsersWMPs: thisUsersWMPs,
          allOtherWMPs: allOtherWMPs,
          dataLoaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleCreateWMP = () => {
    const newWMP = {
      name:
        this.state.thisGRFUser.handle +
        " New Week Meal Plan 2 " +
        dayjs().format("M/D/YY"),
      GRFUser: this.state.thisGRFUser._id,
      breakfastWeight: 1,
      snack1Weight: 1,
      lunchWeight: 1,
      snack2Weight: 1,
      dinnerWeight: 1,
      dessertWeight: 1,
      calsBudget: 1,
      carbsBudget: 1,
      proteinBudget: 1,
      fatBudget: 1,
      fiberBudget: 1,
    };
    axios
      .post("http://localhost:5000/weekMealPlans/add", newWMP)
      .then((response) => {
        let savedRecord = response.data;
        let savedRecordId = savedRecord._id;
        window.location = "/weekMealPlans/edit/" + savedRecordId + "/true";
      });
  };
  render() {
    if (this.state.dataLoaded === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <div className="container-fluid pl-4 pr-4">
          {/* <Link
            className="nav-link"
            to={{
              pathname: "/weekMealPlans/edit/" + this.state.allOtherWMPs._id,
            }}
          >
            My Week Meal Plan
          </Link> */}
          <div>
            <h1>My Week Meal Plans</h1>
            <table className="table table-bordered">
              <thead className="thead">
                <tr>
                  <th scope="col" rowSpan={2}>
                    Name
                  </th>
                  <th scope="col" rowSpan={2}>
                    Author
                  </th>
                  <th scope="col" colSpan={5}>
                    Daily Macros Budget
                  </th>
                  <th scope="col" colSpan={6}>
                    Meal Weighting &#40;&#37;&#41;
                  </th>
                </tr>
                <tr>
                  <th scope="col">Cals</th>
                  <th scope="col">Carbs</th>
                  <th scope="col">Protein</th>
                  <th scope="col">Fat</th>
                  <th scope="col">Fiber</th>
                  <th scope="col">Breakfast</th>
                  <th scope="col">Snack 1</th>
                  <th scope="col">Lunch</th>
                  <th scope="col">Snack 2</th>
                  <th scope="col">Dinner</th>
                  <th scope="col">Dessert</th>
                </tr>
              </thead>
              <tbody>
                {this.state.thisUsersWMPs.length < 1 ? (
                  <tr>
                    <td colSpan={13}>No Week Meal Plans...</td>
                  </tr>
                ) : (
                  this.state.thisUsersWMPs.map((wmp) => (
                    <tr>
                      <td>
                        <Link
                          className="nav-link"
                          to={{ pathname: "/weekMealPlans/edit/" + wmp._id }}
                        >
                          {wmp.name}
                        </Link>
                      </td>
                      <td>
                        {wmp.GRFUser === undefined
                          ? "Unknown User"
                          : wmp.GRFUser.handle}
                      </td>
                      <td>
                        {wmp.calsBudget === undefined
                          ? 0
                          : wmp.calsBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.carbsBudget === undefined
                          ? 0
                          : wmp.carbsBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.proteinBudget === undefined
                          ? 0
                          : wmp.proteinBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.fatBudget === undefined
                          ? 0
                          : wmp.fatBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.fiberBudget === undefined
                          ? 0
                          : wmp.fiberBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.breakfastWeight === undefined
                          ? 0
                          : wmp.breakfastWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.snack1Weight === undefined
                          ? 0
                          : wmp.snack1Weight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.lunchWeight === undefined
                          ? 0
                          : wmp.lunchWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.snack2Weight === undefined
                          ? 0
                          : wmp.snack2Weight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.dinnerWeight === undefined
                          ? 0
                          : wmp.dinnerWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.dessertWeight === undefined
                          ? 0
                          : wmp.dessertWeight.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <br />
          <form>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleCreateWMP}
            >
              Create New Week Meal Plan
            </button>
          </form>
          <br />
          <div>
            <h1>Community Week Meal Plans</h1>
            <table className="table table-bordered">
              <thead className="thead">
                <tr>
                  <th scope="col" rowSpan={2}>
                    Name
                  </th>
                  <th scope="col" rowSpan={2}>
                    Author
                  </th>
                  <th scope="col" colSpan={5}>
                    Daily Macros Budget
                  </th>
                  <th scope="col" colSpan={6}>
                    Meal Weighting &#40;&#37;&#41;
                  </th>
                </tr>
                <tr>
                  <th scope="col">Cals</th>
                  <th scope="col">Carbs</th>
                  <th scope="col">Protein</th>
                  <th scope="col">Fat</th>
                  <th scope="col">Fiber</th>
                  <th scope="col">Breakfast</th>
                  <th scope="col">Snack 1</th>
                  <th scope="col">Lunch</th>
                  <th scope="col">Snack 2</th>
                  <th scope="col">Dinner</th>
                  <th scope="col">Dessert</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allOtherWMPs.length < 1 ? (
                  <tr>
                    <td colSpan={13}>No Week Meal Plans...</td>
                  </tr>
                ) : (
                  this.state.allOtherWMPs.map((wmp) => (
                    <tr>
                      <td>
                        <Link
                          className="nav-link"
                          to={{ pathname: "/weekMealPlans/edit/" + wmp._id }}
                        >
                          {wmp.name}
                        </Link>
                      </td>
                      <td>{wmp.GRFUser.handle}</td>
                      <td>
                        {wmp.calsBudget === undefined
                          ? 0
                          : wmp.calsBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.carbsBudget === undefined
                          ? 0
                          : wmp.carbsBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.proteinBudget === undefined
                          ? 0
                          : wmp.proteinBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.fatBudget === undefined
                          ? 0
                          : wmp.fatBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.fiberBudget === undefined
                          ? 0
                          : wmp.fiberBudget.toFixed(2)}
                      </td>
                      <td>
                        {wmp.breakfastWeight === undefined
                          ? 0
                          : wmp.breakfastWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.snack1Weight === undefined
                          ? 0
                          : wmp.snack1Weight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.lunchWeight === undefined
                          ? 0
                          : wmp.lunchWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.snack2Weight === undefined
                          ? 0
                          : wmp.snack2Weight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.dinnerWeight === undefined
                          ? 0
                          : wmp.dinnerWeight.toFixed(2)}
                      </td>
                      <td>
                        {wmp.dessertWeight === undefined
                          ? 0
                          : wmp.dessertWeight.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default WMPListForUser;
