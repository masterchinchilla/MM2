import React, { Component } from "react";
import axios from "axios";
import EditOptions from "./EditOptions.component";

export default class CreateDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfWeek: this.props.dayOfWeek,
      dayOfWeekShort: this.props.dayOfWeekShort,
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      weekMealPlans: [],
      days: [],
      weekMealPlanId: this.props.weekMealPlanId,
      name: this.props.weekMealPlanName + " - " + this.props.dayOfWeek,
      userIsAuthor: true,
      thisFormState: "missing",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/weekMealPlans/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          weekMealPlans: response.data.map((weekMealPlan) => weekMealPlan),
          weekMealPlan: response.data[0]._id,
        });
      }
    });
    axios.get("http://localhost:5000/days/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          days: response.data.map((day) => day),
        });
      }
    });
  }
  onChangeDayOfWeek(e) {
    this.setState({
      dayOfWeek: e.target.value,
    });
  }
  onChangeWeekMealPlan(e) {
    this.setState({
      weekMealPlan: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <h3 className="card-title">{this.state.dayOfWeek}</h3>
          <EditOptions
            parentObj={"Day"}
            thisFormState={this.state.thisFormState}
            userIsAuthor={this.state.userIsAuthor}
            onCreate={this.props.onCreateDay}
            recordToCreate={this.state.dayOfWeek}
          />
        </div>
        <div className="card-body">
          <div
            className="accordion accordion-flush"
            id={
              "accordionFull" + this.state.weekMealPlanId + this.state.dayOfWeek
            }
          >
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={
                  "accordionHeader" +
                  this.state.weekMealPlanId +
                  this.state.dayOfWeek
                }
              >
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={
                    "#dayAccrdn" +
                    this.state.weekMealPlanId +
                    this.state.dayOfWeek
                  }
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></button>
              </h2>
              <div
                id={
                  "dayAccrdn" + this.state.weekMealPlanId + this.state.dayOfWeek
                }
                className="accordion-collapse collapse show"
                aria-labelledby={
                  "#accordionHeader" +
                  this.state.weekMealPlanId +
                  this.state.dayOfWeek
                }
                data-bs-parent={
                  "#accordionFull" +
                  this.state.weekMealPlanId +
                  this.state.dayOfWeek
                }
              >
                <div className="accordion-body">
                  <form
                    onSubmit={() => {
                      this.props.onCreateDay(this.state.dayOfWeek);
                    }}
                  >
                    <div className="form-group mt-4 mb-4">
                      <input
                        type="submit"
                        value="Create Day"
                        className="btn btn-primary"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
