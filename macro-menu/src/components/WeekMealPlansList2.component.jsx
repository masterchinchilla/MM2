import React, { Component } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
class WMPListForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      thisGRFUser: this.props.currentGRFUser,
      weekMealPlans: [],
      thisUsersWMPs: [],
      allOtherWMPs: [],
    };
  }
  componentDidMount() {
    // const thisGRFUserId = this.props.match.params.id;
    // axios
    //   .get("http://localhost:5000/grfusers/" + thisGRFUserId)
    //   .then((response) => {
    //     this.setState({ thisGRFUser: response.data });
    //   });
    axios
      .get("http://localhost:5000/weekMealPlans")
      .then((response) => {
        this.setState({
          weekMealPlans: response.data,
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
    console.log(newWMP);
    axios
      .post("http://localhost:5000/weekMealPlans/add", newWMP)
      .then((response) => {
        let savedRecord = response.data;
        let savedRecordId = savedRecord._id;
        console.log(savedRecord);
        window.location = "/weekMealPlans/edit/" + savedRecordId + "/true";
      });
  };
  render() {
    if (this.state.dataLoaded === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <div className="container-fluid pl-4 pr-4">
          <Link
            className="nav-link"
            to={{
              pathname:
                "/weekMealPlans/edit/" + this.state.weekMealPlans[0]._id,
            }}
          >
            My Week Meal Plan
          </Link>
          <form>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleCreateWMP}
            >
              Create New Week Meal Plan
            </button>
          </form>
        </div>
      );
    }
  }
}

export default WMPListForUser;
