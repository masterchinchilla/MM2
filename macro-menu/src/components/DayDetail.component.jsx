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
      macrosBudget: this.props.macrosBudget,
      mealsWeighting: this.props.mealsWeighting,
      macrosCurrent: {},
      mealMacrosCurrent: {
        breakfastMacrosCurrent: {
          cals: 0,
        },
      },
      macrosRemaining: {},
      mealMacrosBudget: {
        breakfastMacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.breakfastWeight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.breakfastWeight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.breakfastWeight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.breakfastWeight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.breakfastWeight / 100),
        },
        snack1MacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.snack1Weight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.snack1Weight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.snack1Weight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.snack1Weight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.snack1Weight / 100),
        },
        lunchMacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.lunchWeight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.lunchWeight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.lunchWeight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.lunchWeight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.lunchWeight / 100),
        },
        snack2MacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.snack2Weight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.snack2Weight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.snack2Weight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.snack2Weight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.snack2Weight / 100),
        },
        dinnerMacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.dinnerWeight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.dinnerWeight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.dinnerWeight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.dinnerWeight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.dinnerWeight / 100),
        },
        dessertMacrosBudget: {
          cals:
            this.props.macrosBudget.calsBudget *
            (this.props.mealsWeighting.dessertWeight / 100),
          carbs:
            this.props.macrosBudget.carbsBudget *
            (this.props.mealsWeighting.dessertWeight / 100),
          protein:
            this.props.macrosBudget.proteinBudget *
            (this.props.mealsWeighting.dessertWeight / 100),
          fat:
            this.props.macrosBudget.fatBudget *
            (this.props.mealsWeighting.dessertWeight / 100),
          fiber:
            this.props.macrosBudget.fiberBudget *
            (this.props.mealsWeighting.dessertWeight / 100),
        },
      },
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
  totalCurrentMacrosMethod = (thisMealsMealIngredients, mealType) => {
    let mealMacrosCurrent = this.state.mealMacrosCurrent;
    let i = 0;
    for (i; i < thisMealsMealIngredients.length; i++) {
      switch (mealType) {
        case "Breakfast":
          mealMacrosCurrent.breakfastMacrosCurrent.cals =
            this.state.mealMacrosCurrent.breakfastMacrosCurrent.cals +
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories;
          this.setState({
            mealMacrosCurrent: mealMacrosCurrent,
          });
          break;
      }
    }
  };
  renderMeal = (mealToRender, thisDay, mealType, thisMealsMacrosBudget) => {
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
      return (
        <MealDetail
          thisMeal={mealToRender}
          key={mealToRender._id}
          thisMealsMacrosBudget={thisMealsMacrosBudget}
          totalCurrentMacrosMethod={this.totalCurrentMacrosMethod}
          thisMealsMacrosCurrent={
            this.state.mealMacrosCurrent.breakfastMacrosCurrent
          }
        />
      );
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
                  <div className="macroTblCntnr">
                    <table className="table table-bordered macrosTable">
                      <thead className="thead">
                        <tr>
                          <th colSpan={6} scope="col">
                            <h4>Day Macros</h4>
                          </th>
                        </tr>
                        <tr>
                          <th
                            scope="col"
                            className="perpendicularTextCell"
                          ></th>
                          <th scope="col" className="perpendicularTextCell">
                            Cals
                          </th>
                          <th scope="col" className="perpendicularTextCell">
                            Carbs
                          </th>
                          <th scope="col" className="perpendicularTextCell">
                            Protein
                          </th>
                          <th scope="col" className="perpendicularTextCell">
                            Fat
                          </th>
                          <th scope="col" className="perpendicularTextCell">
                            Fiber
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Bdgt</th>
                          <td>{this.state.macrosBudget.calsBudget}</td>
                          <td>{this.state.macrosBudget.carbsBudget}</td>
                          <td>{this.state.macrosBudget.proteinBudget}</td>
                          <td>{this.state.macrosBudget.fatBudget}</td>
                          <td>{this.state.macrosBudget.fiberBudget}</td>
                        </tr>
                        <tr>
                          <th scope="row">Crrnt</th>
                          <td>9999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                        </tr>
                        <tr>
                          <th scope="row">Left</th>
                          <td>9999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                          <td>999.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                              "Breakfast",
                              this.state.mealMacrosBudget.breakfastMacrosBudget
                            )}
                            {this.renderMeal(
                              this.state.snack1,
                              this.state.thisDay,
                              "Snack 1",
                              this.state.mealMacrosBudget.snack1MacrosBudget
                            )}
                            {this.renderMeal(
                              this.state.lunch,
                              this.state.thisDay,
                              "Lunch",
                              this.state.mealMacrosBudget.lunchMacrosBudget
                            )}
                            {this.renderMeal(
                              this.state.snack2,
                              this.state.thisDay,
                              "Snack 2",
                              this.state.mealMacrosBudget.snack2MacrosBudget
                            )}
                            {this.renderMeal(
                              this.state.dinner,
                              this.state.thisDay,
                              "Dinner",
                              this.state.mealMacrosBudget.dinnerMacrosBudget
                            )}
                            {this.renderMeal(
                              this.state.dessert,
                              this.state.thisDay,
                              "Dessert",
                              this.state.mealMacrosBudget.dessertMacrosBudget
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
