import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealDetail from "./MealDetail.component";
import CreateMeal from "./CreateMeal.component";

class DayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      thisDay: this.props.thisDay,
      weekMealPlanName: this.props.weekMealPlanName,
      thisId: this.props.thisDay._id,
      thisFormState: "viewing",
      userType: "admin",
      thisDaysMeals: [],
      breakfast: {},
      snack1: {},
      lunch: {},
      snack2: {},
      dinner: {},
      dessert: {},
      calsBudget: 0,
      carbsBudget: 0,
      proteinBudget: 0,
      fatBudget: 0,
      fiberBudget: 0,
      calsCurrent: 0,
      carbsCurrent: 0,
      proteinCurrent: 0,
      fatCurrent: 0,
      fiberCurrent: 0,
      calsRemaining: 0,
      carbsRemaining: 0,
      proteinRemaining: 0,
      fatRemaining: 0,
      fiberRemaining: 0,
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios
      .get(
        "http://localhost:5000/meals/mealsofthisday/" + this.props.thisDay._id
      )
      .then((response) => {
        this.setState({
          thisDaysMeals: response.data.map((meal) => meal),
          breakfast: response.data.filter(
            (meal) => meal.mealType == "Breakfast"
          )[0],
          snack1: response.data.filter((meal) => meal.mealType == "Snack 1")[0],
          lunch: response.data.filter((meal) => meal.mealType == "Lunch")[0],
          snack2: response.data.filter((meal) => meal.mealType == "Snack 2")[0],
          dinner: response.data.filter((meal) => meal.mealType == "Dinner")[0],
          dessert: response.data.filter(
            (meal) => meal.mealType == "Dessert"
          )[0],
          data: true,
        });
      });
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
  handleCreateMeal = (meal) => {
    const newMeal = {
      day: meal.day._id,
      genRecipe: meal.genRecipe._id,
      mealType: meal.mealType,
    };
    axios.post("http://localhost:5000/meals/add", newMeal).then((response) => {
      this.setState({
        thisDaysMeals: this.state.thisDaysMeals.push(response.data),
      });
    });
  };
  renderMeal = (mealToRender, thisDay, mealType) => {
    if (mealToRender == undefined) {
      return (
        <CreateMeal
          thisDay={thisDay}
          mealType={mealType}
          onCreateMeal={this.handleCreateMeal}
          dayUserType={this.state.userType}
        />
      );
    } else {
      return <MealDetail thisMeal={mealToRender} key={mealToRender._id} />;
    }
  };
  render() {
    if (!this.state.data) {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
    return (
      <div className="card mt-3 mb-3">
        <div className="card-header">
          <h3 className="card-title">{this.state.thisDay.dayOfWeek}</h3>
          <EditOptions
            parentObj={"Day"}
            thisFormState={this.state.thisFormState}
            thisId={this.state.thisId}
            userType={this.state.userType}
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
                  <div className="card mt-3 mb-3">
                    <div className="card-header">
                      <h4 className="card-title">
                        {this.state.thisDay.dayOfWeek + " Meals"}
                      </h4>
                    </div>
                    <div className="card-body">
                      <div
                        className="accordion accordion-flush"
                        id={"daysMealsAccordionFull" + this.state.id}
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id={"daysMealsAccordionHeader" + this.state.id}
                          >
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#mealsAccrdn" + this.state.id}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            ></button>
                          </h2>
                        </div>
                        <div
                          id={"mealsAccrdn" + this.state.id}
                          className="accordion-collapse collapse show"
                          aria-labelledby={
                            "#daysMealsAccordionHeader" + this.state.id
                          }
                          data-bs-parent={
                            "#daysMealsAccordionFull" + this.state.id
                          }
                        >
                          <div className="accordion-body wkDaysAccrdnBdy">
                            {this.renderMeal(
                              this.state.breakfast,
                              this.state.thisDay,
                              "Breakfast"
                            )}
                            {this.renderMeal(
                              this.state.snack1,
                              this.state.thisDay,
                              "Snack 1"
                            )}
                            {this.renderMeal(
                              this.state.lunch,
                              this.state.thisDay,
                              "Lunch"
                            )}
                            {this.renderMeal(
                              this.state.snack2,
                              this.state.thisDay,
                              "Snack 2"
                            )}
                            {this.renderMeal(
                              this.state.dinner,
                              this.state.thisDay,
                              "Dinner"
                            )}
                            {this.renderMeal(
                              this.state.dessert,
                              this.state.thisDay,
                              "Dessert"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
export default DayDetail;
