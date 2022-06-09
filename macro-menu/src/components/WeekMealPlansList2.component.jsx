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
            <table className="table table-bordered" key="myWMPsTbl">
              <thead className="thead" key="myWMPsTHead">
                <tr key="myWMPsThRow1">
                  <th scope="col" rowSpan={2} key="myWMPsNameTh">
                    Name
                  </th>
                  <th scope="col" rowSpan={2} key="myWMPsAuthorTh">
                    Author
                  </th>
                  <th scope="col" colSpan={5} key="myWMPsMBdgtTh">
                    Daily Macros Budget
                  </th>
                  <th scope="col" colSpan={6} key="myWMPsMlWghtngTh">
                    Meal Weighting &#40;&#37;&#41;
                  </th>
                </tr>
                <tr>
                  <th scope="col" key="myWMPsCalsTh">
                    Cals
                  </th>
                  <th scope="col" key="myWMPsCarbsTh">
                    Carbs
                  </th>
                  <th scope="col" key="myWMPsProteinTh">
                    Protein
                  </th>
                  <th scope="col" key="myWMPsFatTh">
                    Fat
                  </th>
                  <th scope="col" key="myWMPsFiberTh">
                    Fiber
                  </th>
                  <th scope="col" key="myWMPsBreakfastTh">
                    Breakfast
                  </th>
                  <th scope="col" key="myWMPsSnack1Th">
                    Snack 1
                  </th>
                  <th scope="col" key="myWMPsLunchTh">
                    Lunch
                  </th>
                  <th scope="col" key="myWMPsSnack2Th">
                    Snack 2
                  </th>
                  <th scope="col" key="myWMPsDinnerTh">
                    Dinner
                  </th>
                  <th scope="col" key="myWMPsDessertTh">
                    Dessert
                  </th>
                </tr>
              </thead>
              <tbody key="myWMPsTbody">
                {this.state.thisUsersWMPs.length < 1 ? (
                  <tr key="myWMPsTbodyNoWMPsTr">
                    <td colSpan={13} key="myWMPsTbodyNoWMPsTd">
                      No Week Meal Plans...
                    </td>
                  </tr>
                ) : (
                  this.state.thisUsersWMPs.map((wmp) => (
                    <tr key={"myWMPsTr" + wmp._id}>
                      <td key={"myWMPsNameTd" + wmp._id}>
                        <Link
                          className="nav-link"
                          to={{ pathname: "/weekMealPlans/edit/" + wmp._id }}
                          key={"myWMPLink" + wmp._id}
                        >
                          {wmp.name}
                        </Link>
                      </td>
                      <td key={"myWMPsAuthorTd" + wmp._id}>
                        {wmp.GRFUser === undefined
                          ? "Unknown User"
                          : wmp.GRFUser.handle}
                      </td>
                      <td key={"myWMPsCalsTd" + wmp._id}>
                        {wmp.calsBudget === undefined
                          ? 0
                          : wmp.calsBudget.toFixed(2)}
                      </td>
                      <td key={"myWMPsCarbsTd" + wmp._id}>
                        {wmp.carbsBudget === undefined
                          ? 0
                          : wmp.carbsBudget.toFixed(2)}
                      </td>
                      <td key={"myWMPsProteinTd" + wmp._id}>
                        {wmp.proteinBudget === undefined
                          ? 0
                          : wmp.proteinBudget.toFixed(2)}
                      </td>
                      <td key={"myWMPsFatTd" + wmp._id}>
                        {wmp.fatBudget === undefined
                          ? 0
                          : wmp.fatBudget.toFixed(2)}
                      </td>
                      <td key={"myWMPsFiberTd" + wmp._id}>
                        {wmp.fiberBudget === undefined
                          ? 0
                          : wmp.fiberBudget.toFixed(2)}
                      </td>
                      <td key={"myWMPsBreakfastTd" + wmp._id}>
                        {wmp.breakfastWeight === undefined
                          ? 0
                          : wmp.breakfastWeight.toFixed(2)}
                      </td>
                      <td key={"myWMPsSnack1Td" + wmp._id}>
                        {wmp.snack1Weight === undefined
                          ? 0
                          : wmp.snack1Weight.toFixed(2)}
                      </td>
                      <td key={"myWMPsLunchTd" + wmp._id}>
                        {wmp.lunchWeight === undefined
                          ? 0
                          : wmp.lunchWeight.toFixed(2)}
                      </td>
                      <td key={"myWMPsSnack2Td" + wmp._id}>
                        {wmp.snack2Weight === undefined
                          ? 0
                          : wmp.snack2Weight.toFixed(2)}
                      </td>
                      <td key={"myWMPsDinnerTd" + wmp._id}>
                        {wmp.dinnerWeight === undefined
                          ? 0
                          : wmp.dinnerWeight.toFixed(2)}
                      </td>
                      <td key={"myWMPsDessertTd" + wmp._id}>
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

            <table className="table table-bordered" key="cmmntyWMPsTbl">
              <thead className="thead" key="cmmntyWMPsTHead">
                <tr key="cmmntyWMPsThRow1">
                  <th scope="col" rowSpan={2} key="cmmntyWMPsNameTh">
                    Name
                  </th>
                  <th scope="col" rowSpan={2} key="cmmntyWMPsAuthorTh">
                    Author
                  </th>
                  <th scope="col" colSpan={5} key="cmmntyWMPsMBdgtTh">
                    Daily Macros Budget
                  </th>
                  <th scope="col" colSpan={6} key="cmmntyWMPsMlWghtngTh">
                    Meal Weighting &#40;&#37;&#41;
                  </th>
                </tr>
                <tr>
                  <th scope="col" key="cmmntyWMPsCalsTh">
                    Cals
                  </th>
                  <th scope="col" key="cmmntyWMPsCarbsTh">
                    Carbs
                  </th>
                  <th scope="col" key="cmmntyWMPsProteinTh">
                    Protein
                  </th>
                  <th scope="col" key="cmmntyWMPsFatTh">
                    Fat
                  </th>
                  <th scope="col" key="cmmntyWMPsFiberTh">
                    Fiber
                  </th>
                  <th scope="col" key="cmmntyWMPsBreakfastTh">
                    Breakfast
                  </th>
                  <th scope="col" key="cmmntyWMPsSnack1Th">
                    Snack 1
                  </th>
                  <th scope="col" key="cmmntyWMPsLunchTh">
                    Lunch
                  </th>
                  <th scope="col" key="cmmntyWMPsSnack2Th">
                    Snack 2
                  </th>
                  <th scope="col" key="cmmntyWMPsDinnerTh">
                    Dinner
                  </th>
                  <th scope="col" key="cmmntyWMPsDessertTh">
                    Dessert
                  </th>
                </tr>
              </thead>
              <tbody key="cmmntyWMPsTbody">
                {this.state.allOtherWMPs.length < 1 ? (
                  <tr key="cmmntyWMPsTbodyNoWMPsTr">
                    <td colSpan={13} key="cmmntyWMPsTbodyNoWMPsTd">
                      No Week Meal Plans...
                    </td>
                  </tr>
                ) : (
                  this.state.allOtherWMPs.map((wmp) => (
                    <tr key={"cmmntyWMPsTr" + wmp._id}>
                      <td key={"cmmntyWMPsNameTd" + wmp._id}>
                        <Link
                          className="nav-link"
                          to={{ pathname: "/weekMealPlans/edit/" + wmp._id }}
                          key={"myWMPLink" + wmp._id}
                        >
                          {wmp.name}
                        </Link>
                      </td>
                      <td key={"cmmntyWMPsAuthorTd" + wmp._id}>
                        {wmp.GRFUser === undefined
                          ? "Unknown User"
                          : wmp.GRFUser.handle}
                      </td>
                      <td key={"cmmntyWMPsCalsTd" + wmp._id}>
                        {wmp.calsBudget === undefined
                          ? 0
                          : wmp.calsBudget.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsCarbsTd" + wmp._id}>
                        {wmp.carbsBudget === undefined
                          ? 0
                          : wmp.carbsBudget.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsProteinTd" + wmp._id}>
                        {wmp.proteinBudget === undefined
                          ? 0
                          : wmp.proteinBudget.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsFatTd" + wmp._id}>
                        {wmp.fatBudget === undefined
                          ? 0
                          : wmp.fatBudget.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsFiberTd" + wmp._id}>
                        {wmp.fiberBudget === undefined
                          ? 0
                          : wmp.fiberBudget.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsBreakfastTd" + wmp._id}>
                        {wmp.breakfastWeight === undefined
                          ? 0
                          : wmp.breakfastWeight.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsSnack1Td" + wmp._id}>
                        {wmp.snack1Weight === undefined
                          ? 0
                          : wmp.snack1Weight.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsLunchTd" + wmp._id}>
                        {wmp.lunchWeight === undefined
                          ? 0
                          : wmp.lunchWeight.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsSnack2Td" + wmp._id}>
                        {wmp.snack2Weight === undefined
                          ? 0
                          : wmp.snack2Weight.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsDinnerTd" + wmp._id}>
                        {wmp.dinnerWeight === undefined
                          ? 0
                          : wmp.dinnerWeight.toFixed(2)}
                      </td>
                      <td key={"cmmntyWMPsDessertTd" + wmp._id}>
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
