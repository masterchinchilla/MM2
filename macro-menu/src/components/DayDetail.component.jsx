import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

class DayDetail extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitFormChange = this.handleSubmitFormChange.bind(this);
    this.handleClickCopy = this.handleClickCopy.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      thisDay: this.props.thisDay,
      thisFormState: "viewing",
      userIsAuthor: true,
      thisDaysMeals: [],
    };
    const formatedCreatedAtDate = dayjs(this.state.thisDay.createdAt).format(
      "dddd, MMMM D, YYYY h:mm A"
    );
    const formatedUpdatedAtDate = dayjs(this.state.thisDay.updatedAt).format(
      "dddd, MMMM D, YYYY h:mm A"
    );
  }
  handleSubmitFormChange = () => {
    console.log("Form submitted");
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
    console.log(this.state);
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
    console.log(this.state);
  };
  handleDelete = () => {
    console.log("Clicked Delete");
  };
  render() {
    return (
      <div className="card mt-3 mb-3">
        <div class="card-header">
          <h2 class="card-title">{this.state.thisDay.dayOfWeek}</h2>
          <EditOptions
            parentObj={"Day"}
            thisFormState={this.state.thisFormState}
            userIsAuthor={this.state.userIsAuthor}
            onSubmitFormChange={this.handleSubmitFormChange}
            onClickCopy={this.handleClickCopy}
            onClickEdit={this.handleClickEdit}
            onCancel={this.handleCancel}
            onDelete={this.handleDelete}
          />
        </div>
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + this.state.thisDay._id}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + this.state.thisDay._id}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + this.state.thisDay._id}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id={"dayAccrdn" + this.state.thisDay._id}
              className="accordion-collapse collapse show"
              aria-labelledby={"#accordionHeader" + this.state.thisDay._id}
              data-bs-parent={"#accordionFull" + this.state.thisDay._id}
            >
              <div className="accordion-body">
                <ul>
                  <li>Name:&nbsp;{this.state.thisDay.name}</li>
                  <li>Day of Week:&nbsp;{this.state.thisDay.dayOfWeek}</li>
                  <li>
                    Week Meal Plan:&nbsp;{this.state.thisDay.weekMealPlan.name}
                  </li>
                  <li>Created:&nbsp;{this.formatedCreatedAtDate}</li>
                  <li>Last Updated:&nbsp;{this.formatedUpdatedAtDate}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DayDetail;
