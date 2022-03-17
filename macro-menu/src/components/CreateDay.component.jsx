import React, { Component } from "react";
import axios from "axios";

export default class CreateDay extends Component {
  constructor(props) {
    super(props);

    this.onChangeDayOfWeek = this.onChangeDayOfWeek.bind(this);
    this.onChangeWeekMealPlan = this.onChangeWeekMealPlan.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

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
  onChangeDayOfWeek = (e) => {
    this.setState({
      dayOfWeek: e.target.value,
    });
  };
  onChangeWeekMealPlan = (e) => {
    this.setState({
      weekMealPlan: e.target.value,
    });
  };
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <h2 className="card-title">{this.state.dayOfWeek}</h2>
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
                    this.props.onCreateDay(
                      this.state.dayOfWeek,
                      this.state.weekMealPlanId,
                      this.state.name
                    );
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
