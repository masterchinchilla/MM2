import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

class DayDetailAndCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisDay: this.props.thisDay,
      thisDayOfWeek: this.props.thisDayOfWeek,
      thisWeekMealPlan: this.props.thisWeekMealPlan,
      thisFormState: "viewing",
      thisId: "",
      userIsAuthor: true,
      thisDaysMeals: [],
      thisReference: "Days",
    };
  }
  handleSubmitFormChange = () => {
    console.log("Form submitted");
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <h2 className="card-title">{this.state.thisDayOfWeek}</h2>
          <EditOptions
            parentObj={"Day"}
            userIsAuthor={this.state.userIsAuthor}
            thisFormState={this.state.thisFormState}
            thisId={this.state.thisId}
            onSubmitFormChange={this.handleSubmitFormChange}
            onClickCopy={this.handleClickCopy}
            onClickEdit={this.handleClickEdit}
            onCancel={this.handleCancel}
            onDelete={this.props.onDelete}
            onCreate={this.props.onCreate}
          />
        </div>
        <div
          className="accordion accordion-flush"
          id={
            "accordionFull" +
            this.state.thisWeekMealPlan.name +
            "-" +
            this.state.thisDayOfWeek
          }
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "accordionHeader" +
                this.state.thisWeekMealPlan.name +
                "-" +
                this.state.thisDayOfWeek
              }
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#dayAccrdn" +
                  this.state.thisWeekMealPlan.name +
                  "-" +
                  this.state.thisDayOfWeek
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={
                "dayAccrdn" +
                this.state.thisWeekMealPlan.name +
                "-" +
                this.state.thisDayOfWeek
              }
              className="accordion-collapse collapse show"
              aria-labelledby={
                "#accordionHeader" +
                this.state.thisWeekMealPlan.name +
                "-" +
                this.state.thisDayOfWeek
              }
              data-bs-parent={
                "#accordionFull" +
                this.state.thisWeekMealPlan.name +
                "-" +
                this.state.thisDayOfWeek
              }
            >
              <div className="accordion-body">
                <ul>
                  <li>
                    Name:&nbsp;
                    {this.state.thisWeekMealPlan.name +
                      " - " +
                      this.state.thisDayOfWeek}
                  </li>
                  <li>Day of Week:&nbsp;{this.state.thisDayOfWeek}</li>
                  <li>
                    Week Meal Plan:&nbsp;{this.state.thisWeekMealPlan._id}
                  </li>
                  {/* <li>
                    Created:&nbsp;
                    {dayjs(this.state.thisDay.createdAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                  </li>
                  <li>
                    Last Updated:&nbsp;
                    {dayjs(this.state.thisDay.updatedAt).format(
                      "dddd, MMMM D, YYYY h:mm A"
                    )}
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DayDetailAndCreate;
