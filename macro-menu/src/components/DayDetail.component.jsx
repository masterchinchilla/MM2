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
      weekMealPlanName: this.props.weekMealPlanName,
      thisId: this.props.thisDay._id,
      thisFormState: "viewing",
      userIsAuthor: true,
      thisDaysMeals: [],
    };
  }
  componentDidMount() {
    console.log(this.state.thisId);
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
          <h3 className="card-title">{this.state.thisDay.dayOfWeek}</h3>
          <EditOptions
            parentObj={"Day"}
            thisFormState={this.state.thisFormState}
            thisId={this.state.thisId}
            userIsAuthor={this.state.userIsAuthor}
            onSubmitFormChange={this.handleSubmitFormChange}
            onClickCopy={this.handleClickCopy}
            onClickEdit={this.handleClickEdit}
            onCancel={this.handleCancel}
            onDelete={this.props.onDeleteDay}
          />
        </div>
        <div className="card-body">
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
                  <table className="table table-bordered">
                    <thead className="thead">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Budget</th>
                        <th scope="col">Current</th>
                        <th scope="col">Remaining</th>
                      </tr>
                      <tr>
                        <th scope="row">Calories</th>
                        <td>9999.99</td>
                        <td>9999.99</td>
                        <td>9999.99</td>
                      </tr>
                      <tr>
                        <th scope="row">Carbs</th>
                        <td>9999.99</td>
                        <td>9999.99</td>
                        <td>9999.99</td>
                      </tr>
                      <tr>
                        <th scope="row">Protein</th>
                        <td>9999.99</td>
                        <td>9999.99</td>
                        <td>9999.99</td>
                      </tr>
                      <tr>
                        <th scope="row">Fat</th>
                        <td>9999.99</td>
                        <td>9999.99</td>
                        <td>9999.99</td>
                      </tr>
                      <tr>
                        <th scope="row">Fiber</th>
                        <td>9999.99</td>
                        <td>9999.99</td>
                        <td>9999.99</td>
                      </tr>
                    </thead>
                  </table>
                  <ul>
                    <li>Name:&nbsp;{this.state.thisDay.name}</li>
                    <li>Day of Week:&nbsp;{this.state.thisDay.dayOfWeek}</li>
                    <li>Week Meal Plan:&nbsp;{this.state.weekMealPlanName}</li>
                    <li>
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
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DayDetail;
