import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

class DayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisDay: this.props.thisDay,
      thisFormState: "creating",
      userIsAuthor: true,
      thisDaysMeals: [],
    };
    const onSubmitFormChange = this.props.onSubmitFormChange;
    const onClickCopy = this.props.onClickCopy;
    const onClickEdit = this.props.onClickEdit;
    const onCancel = this.props.onCancel;
    const onDelete = this.props.onDelete;
    const formatedCreatedAtDate = dayjs(this.state.thisDay.createdAt).format(
      "dddd, MMMM D, YYYY h:mm A"
    );
    const formatedUpdatedAtDate = dayjs(this.state.thisDay.updatedAt).format(
      "dddd, MMMM D, YYYY h:mm A"
    );
  }
  render() {
    return (
      <div className="accordion mt-4" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#dayAccrdn" + this.state.thisDay._id}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <EditOptions
                parentObj={"Day"}
                thisFormState={this.state.thisFormState}
                userIsAuthor={true}
                onSubmitFormChange={this.onSubmitFormChange}
                onClickCopy={this.onClickCopy}
                onClickEdit={this.onClickEdit}
                onCancel={this.onCancel}
                onDelete={this.onDelete}
              />
              <div className="accrdnTitle">{this.state.thisDay.dayOfWeek}</div>
            </button>
          </h2>
          <div
            id={"dayAccrdn" + this.state.thisDay._id}
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
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
    );
  }
}
export default DayDetail;
