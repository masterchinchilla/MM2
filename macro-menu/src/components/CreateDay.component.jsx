import React, { Component } from "react";
import axios from "axios";

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
  handleSubmitFormChange(e) {
    e.preventDefault();
    const day = {
      dayOfWeek: this.state.dayOfWeek,
      weekMealPlan: this.state.weekMealPlanId,
      name: this.state.name,
    };
    axios.post("http://localhost:5000/days/add", day).then(() => {
      this.setState({
        sun: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Sunday"
        )[0],
        mon: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Monday"
        )[0],
        tues: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Tuesday"
        )[0],
        wed: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Wednesday"
        )[0],
        thurs: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Thursday"
        )[0],
        fri: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Friday"
        )[0],
        sat: this.state.thisWeeksDays.filter(
          (day) => day.dayOfWeek == "Saturday"
        )[0],
      });
    });
  }
  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <h2 className="card-title">{this.state.dayOfWeek}</h2>
          {/* <EditOptions
            parentObj={"Day"}
            thisFormState={this.state.thisFormState}
            userIsAuthor={this.state.userIsAuthor}
            onSubmitFormChange={this.handleSubmitFormChange}
            // onClickCopy={this.handleClickCopy}
            // onClickEdit={this.handleClickEdit}
            // onCancel={this.handleCancel}
            // onDelete={this.handleDelete}
          /> */}
        </div>
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + this.state.name}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + this.state.name}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + this.state.name}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + this.state.name}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + this.state.name}
              data-bs-parent={"#accordionFull" + this.state.name}
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
    );
  }
}
