import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
class WMPListForUser extends Component {
  constructor(props) {
    super(props);
    const { thisGRFUser, match, onGetFullRecordSetFn, onGetCurrentUserFn } =
      this.props;
    const pgReqParams = match.params;
    const thisUsersId = pgReqParams.id;
    this.state = {
      dataLoaded: false,
      thisGRFUser: thisGRFUser,
      thisUsersId: thisUsersId,
      weekMealPlans: [],
      thisUsersWMPs: [],
      allOtherWMPs: [],
      backEndHtmlRoot: this.props.backEndHtmlRoot,
    };
  }
  getData = async (thisGRFUserId) => {
    // const fullCrntUsrObj = this.props.onGetCurrentUserFn();
    const allWMPs = await this.props.onGetFullRecordSetFn("weekMealPlan");
    let thisUsersWMPs = allWMPs.filter((wmp) => {
      return wmp.GRFUser._id === thisGRFUserId;
    });
    if (thisUsersWMPs === undefined) {
      thisUsersWMPs = [];
    }
    const allOtherWMPs = allWMPs.filter((wmp) => {
      return wmp.GRFUser._id !== thisGRFUserId;
    });
    this.setState({
      thisUsersWMPs: thisUsersWMPs,
      allOtherWMPs: allOtherWMPs,
      dataLoaded: true,
    });
  };
  componentDidMount() {
    const thisGRFUserId = this.state.thisUsersId;
    this.getData(thisGRFUserId);
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
    const { closeNavOnClick } = this.props;
    if (this.state.dataLoaded === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <div className="pageContent" onClick={() => closeNavOnClick("outside")}>
          <div className="container-fluid pl-3 pr-3 pb-3">
            <div className="card wmpsTblsCard">
              <div className="card-header myWMPsCardHdr">
                <h1 className="card-title">My Week Meal Plans</h1>
                <form>
                  <button
                    type="button"
                    className="btn btn-primary createWMPBttn"
                    onClick={this.handleCreateWMP}
                  >
                    Create New Week Meal Plan
                  </button>
                </form>
              </div>
              <div className="card-body wmpsCardBody">
                <div
                  className="accordion accordion-flush"
                  id={"accordionFull_wmpsTbls" + 1}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_wmpsTbls" + 1}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#dayAccrdn_wmpsTbls" + 1}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_wmpsTbls" + 1}
                    className="accordion-collapse collapse show wmpsAccrdn"
                    aria-labelledby={"#accordionHeader_wmpsTbls" + 1}
                    data-bs-parent={"#accordionFull_wmpsTbls" + 1}
                  >
                    <div className="accordion-body accrdnwmpsTblsBdy">
                      <table
                        className="table table-bordered wmpsTbls"
                        key="myWMPsTbl"
                      >
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
                                    to={{
                                      pathname: `/weekMealPlansNewNew/edit/${wmp._id}/`,
                                      state: {
                                        currentGRFUser: this.state.thisGRFUser,
                                      },
                                    }}
                                    key={"myWMPLinkNewNew" + wmp._id}
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
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="card wmpsTblsCard">
              <div className="card-header">
                <h1 className="card-title">Community Week Meal Plans</h1>
              </div>
              <div className="card-body wmpsCardBody">
                <div
                  className="accordion accordion-flush"
                  id={"accordionFull_wmpsTbls" + 2}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_wmpsTbls" + 2}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#dayAccrdn_wmpsTbls" + 2}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_wmpsTbls" + 2}
                    className="accordion-collapse collapse show wmpsAccrdn"
                    aria-labelledby={"#accordionHeader_wmpsTbls" + 2}
                    data-bs-parent={"#accordionFull_wmpsTbls" + 2}
                  >
                    <div className="accordion-body accrdnwmpsTblsBdy">
                      <table
                        className="table table-bordered wmpsTbls"
                        key="cmmntyWMPsTbl"
                      >
                        <thead className="thead" key="cmmntyWMPsTHead">
                          <tr key="cmmntyWMPsThRow1">
                            <th scope="col" rowSpan={2} key="cmmntyWMPsNameTh">
                              Name
                            </th>
                            <th
                              scope="col"
                              rowSpan={2}
                              key="cmmntyWMPsAuthorTh"
                            >
                              Author
                            </th>
                            <th scope="col" colSpan={5} key="cmmntyWMPsMBdgtTh">
                              Daily Macros Budget
                            </th>
                            <th
                              scope="col"
                              colSpan={6}
                              key="cmmntyWMPsMlWghtngTh"
                            >
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
                                    to={{
                                      pathname:
                                        "/weekMealPlans/edit/" + wmp._id,
                                      state: {
                                        currentGRFUser: this.state.thisGRFUser,
                                      },
                                    }}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WMPListForUser;
