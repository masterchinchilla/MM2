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
    this.loadData = this.loadData.bind(this);
    this.state = {
      dataLoaded: false,
      thisDay: this.props.thisDay,
      weekMealPlanName: this.props.weekMealPlanName,
      thisId: this.props.thisDay._id,
      thisFormState: "viewing",
      userType: "admin",
      thisDaysMeals: [],
      breakfastIngrdnts: [],
      snack1Ingrdnts: [],
      lunchIngrdnts: [],
      snack2Ingrdnts: [],
      dinnerIngrdnts: [],
      dessertIngrdnts: [],
      breakfast: {},
      snack1: {},
      lunch: {},
      snack2: {},
      dinner: {},
      dessert: {},
      mealsWeighting: this.props.mealsWeighting,
      macrosBudget: this.props.macrosBudget,
      macrosCurrent: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      macrosRemaining: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      mealMacrosCurrent: {
        breakfastMacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        snack1MacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        lunchMacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        snack2MacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        dinnerMacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        dessertMacrosCurrent: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
      },
      mealMacrosRemaining: {
        breakfastMacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        snack1MacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        lunchMacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        snack2MacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        dinnerMacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
        dessertMacrosRemaining: {
          cals: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
          fiber: 0,
        },
      },
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
      .then((response) =>
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
        })
      );
    this.finishLoadingData();
  }
  finishLoadingData = () => {
    this.getMealIngredients();
    this.recalculateCurrentAndRemaining();
    this.setState({ dataLoaded: true });
  };
  getMealIngredients = () => {
    if (this.state.breakfast == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.breakfast._id
        )
        .then((response) =>
          this.setState({
            breakfastIngrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
    if (this.state.snack1 == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.snack1._id
        )
        .then((response) =>
          this.setState({
            snack1Ingrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
    if (this.state.lunch == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.lunch._id
        )
        .then((response) =>
          this.setState({
            lunchIngrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
    if (this.state.snack2 == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.snack2._id
        )
        .then((response) =>
          this.setState({
            snack2Ingrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
    if (this.state.dinner == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.dinner._id
        )
        .then((response) =>
          this.setState({
            dinnerIngrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
    if (this.state.dessert == undefined) {
      return [];
    } else {
      axios
        .get(
          "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
            this.state.dessert._id
        )
        .then((response) =>
          this.setState({
            dessertIngrdnts: response.data.map(
              (mealIngredient) => mealIngredient
            ),
          })
        );
    }
  };
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
  recalculateCurrentAndRemaining = () => {
    const mealMacrosBudget = this.state.mealMacrosBudget;
    let mealMacrosCurrent = this.state.mealMacrosCurrent;
    let mealMacrosRemaining = this.state.mealMacrosRemaining;
    let macrosBudget = this.state.macrosBudget;
    let macrosCurrent = this.state.macrosCurrent;
    let macrosRemaining = this.state.macrosRemaining;
    function updateLocalThisMealsMacrosCurrent(a, b) {
      let i = 0;
      for (i; i < a.length; i++) {
        b.cals += a[i].genRecipeIngredient.ingredient.calories * a[i].qty;
        macrosCurrent.cals += b.cals;
        b.carbs += a[i].genRecipeIngredient.ingredient.carbs * a[i].qty;
        macrosCurrent.carbs += b.carbs;
        b.protein += a[i].genRecipeIngredient.ingredient.protein * a[i].qty;
        macrosCurrent.protein += b.protein;
        b.fat += a[i].genRecipeIngredient.ingredient.fat * a[i].qty;
        macrosCurrent.fat += b.fat;
        b.fiber += a[i].genRecipeIngredient.ingredient.fiber * a[i].qty;
        macrosCurrent.fiber += b.fiber;
      }
      return b;
    }
    if (this.state.breakfast == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.breakfastMacrosBudget;
      let b = mealMacrosCurrent.breakfastMacrosCurrent;
      mealMacrosCurrent.breakfastMacrosCurrent =
        updateLocalThisMealsMacrosCurrent(this.state.breakfastIngrdnts, b);
      let e = mealMacrosCurrent.breakfastMacrosCurrent;
      mealMacrosRemaining.breakfastMacrosRemaining = d - e;
    }
    if (this.state.snack1 == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.snack1MacrosBudget;
      let b = mealMacrosCurrent.snack1MacrosCurrent;
      mealMacrosCurrent.snack1MacrosCurrent = updateLocalThisMealsMacrosCurrent(
        this.state.snack1Ingrdnts,
        b
      );
      let e = mealMacrosCurrent.snack1MacrosCurrent;
      mealMacrosRemaining.snack1MacrosRemaining = d - e;
    }
    if (this.state.lunch == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.lunchMacrosBudget;
      let b = mealMacrosCurrent.lunchMacrosCurrent;
      mealMacrosCurrent.lunchMacrosCurrent = updateLocalThisMealsMacrosCurrent(
        this.state.lunchIngrdnts,
        b
      );
      let e = mealMacrosCurrent.lunchMacrosCurrent;
      mealMacrosRemaining.lunchMacrosRemaining = d - e;
    }
    if (this.state.snack2 == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.snack2MacrosBudget;
      let b = mealMacrosCurrent.snack2MacrosCurrent;
      mealMacrosCurrent.snack2MacrosCurrent = updateLocalThisMealsMacrosCurrent(
        this.state.snack2Ingrdnts,
        b
      );
      let e = mealMacrosCurrent.snack2MacrosCurrent;
      mealMacrosRemaining.snack2MacrosRemaining = d - e;
    }
    if (this.state.dinner == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.dinnerMacrosBudget;
      let b = mealMacrosCurrent.dinnerMacrosCurrent;
      mealMacrosCurrent.dinnerMacrosCurrent = updateLocalThisMealsMacrosCurrent(
        this.state.dinnerIngrdnts,
        b
      );
      let e = mealMacrosCurrent.dinnerMacrosCurrent;
      mealMacrosRemaining.dinnerMacrosRemaining = d - e;
    }
    if (this.state.dessert == undefined) {
      return [];
    } else {
      let d = mealMacrosBudget.dessertMacrosBudget;
      let b = mealMacrosCurrent.dessertMacrosCurrent;
      mealMacrosCurrent.dessertMacrosCurrent =
        updateLocalThisMealsMacrosCurrent(this.state.dessertIngrdnts, b);
      let e = mealMacrosCurrent.dessertMacrosCurrent;
      mealMacrosRemaining.dessertMacrosRemaining = d - e;
    }
    macrosRemaining.cals = macrosBudget.cals - macrosCurrent.cals;
    macrosRemaining.carbs = macrosBudget.carbs - macrosCurrent.carbs;
    macrosRemaining.protein = macrosBudget.protein - macrosCurrent.protein;
    macrosRemaining.fat = macrosBudget.fat - macrosCurrent.fat;
    macrosRemaining.fiber = macrosBudget.fiber - macrosCurrent.fiber;
    this.setState({
      mealMacrosCurrent: mealMacrosCurrent,
      macrosCurrent: macrosCurrent,
      macrosRemaining: macrosRemaining,
    });
  };
  renderMeal = (
    mealToRender,
    thisDay,
    mealType,
    thisMealsMealIngredients,
    thisMealsMacrosBudget,
    thisMealsMacrosCurrent,
    thisMealsMacrosRemaining
  ) => {
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
          thisMealsMealIngredients={thisMealsMealIngredients}
          thisMealsMacrosBudget={thisMealsMacrosBudget}
          thisMealsMacrosCurrent={thisMealsMacrosCurrent}
          thisMealsMacrosRemaining={thisMealsMacrosRemaining}
        />
      );
    }
  };
  render() {
    if (this.state.dataLoaded == false) {
      return <div className="spinner-border text-primary" role="status" />;
    } else {
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
                            <td>{this.state.macrosCurrent.calsCurrent}</td>
                            <td>{this.state.macrosCurrent.carbsCurrent}</td>
                            <td>{this.state.macrosCurrent.proteinCurrent}</td>
                            <td>{this.state.macrosCurrent.fatCurrent}</td>
                            <td>{this.state.macrosCurrent.fiberCurrent}</td>
                          </tr>
                          <tr>
                            <th scope="row">Left</th>
                            <td>{this.state.macrosRemaining.calsRemaining}</td>
                            <td>{this.state.macrosRemaining.carbsRemaining}</td>
                            <td>
                              {this.state.macrosRemaining.proteinRemaining}
                            </td>
                            <td>{this.state.macrosRemaining.fatRemaining}</td>
                            <td>{this.state.macrosRemaining.fiberRemaining}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ul>
                      <li>Name:&nbsp;{this.state.thisDay.name}</li>
                      <li>Day of Week:&nbsp;{this.state.thisDay.dayOfWeek}</li>
                      <li>
                        Week Meal Plan:&nbsp;{this.state.weekMealPlanName}
                      </li>
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
                                this.state.breakfastIngrdnts,
                                this.state.mealMacrosBudget
                                  .breakfastMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .breakfastMacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .breakfastMacrosRemaining
                              )}
                              {this.renderMeal(
                                this.state.snack1,
                                this.state.thisDay,
                                "Snack 1",
                                this.state.snack1Ingrdnts,
                                this.state.mealMacrosBudget.snack1MacrosBudget,
                                this.state.mealMacrosCurrent
                                  .snack1MacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .snack1MacrosRemaining
                              )}
                              {this.renderMeal(
                                this.state.lunch,
                                this.state.thisDay,
                                "Lunch",
                                this.state.lunchIngrdnts,
                                this.state.mealMacrosBudget.lunchMacrosBudget,
                                this.state.mealMacrosCurrent.lunchMacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .lunchMacrosRemaining
                              )}
                              {this.renderMeal(
                                this.state.snack2,
                                this.state.thisDay,
                                "Snack 2",
                                this.state.snack2Ingrdnts,
                                this.state.mealMacrosBudget.snack2MacrosBudget,
                                this.state.mealMacrosCurrent
                                  .snack2MacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .snack2MacrosRemaining
                              )}
                              {this.renderMeal(
                                this.state.dinner,
                                this.state.thisDay,
                                "Dinner",
                                this.state.dinnerIngrdnts,
                                this.state.mealMacrosBudget.dinnerMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .dinnerMacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .dinnerMacrosRemaining
                              )}
                              {this.renderMeal(
                                this.state.dessert,
                                this.state.thisDay,
                                "Dessert",
                                this.state.dessertIngrdnts,
                                this.state.mealMacrosBudget.dessertMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .dessertMacrosCurrent,
                                this.state.mealMacrosRemaining
                                  .dessertMacrosRemaining
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
}
export default DayDetail;

// totalCurrentMacrosMethod = (thisMealsMealIngredients, mealType) => {
//   let mealMacrosCurrent = this.state.mealMacrosCurrent;
//   let macrosCurrent = this.state.macrosCurrent;
//   let i = 0;
//   for (i; i < thisMealsMealIngredients.length; i++) {
//     switch (mealType) {
//       case "Breakfast":
//         mealMacrosCurrent.breakfastMacrosCurrent.cals =
//           this.state.mealMacrosCurrent.breakfastMacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         macrosCurrent.cals =
//           this.state.macrosCurrent.cals +
//           mealMacrosCurrent.breakfastMacrosCurrent.cals;
//         mealMacrosCurrent.breakfastMacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.breakfastMacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.breakfastMacrosCurrent.protein =
//           this.state.mealMacrosCurrent.breakfastMacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.breakfastMacrosCurrent.fat =
//           this.state.mealMacrosCurrent.breakfastMacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.breakfastMacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.breakfastMacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//           macrosCurrent: macrosCurrent,
//         });
//         break;
//       case "Snack 1":
//         mealMacrosCurrent.snack1MacrosCurrent.cals =
//           this.state.mealMacrosCurrent.snack1MacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack1MacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.snack1MacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack1MacrosCurrent.protein =
//           this.state.mealMacrosCurrent.snack1MacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack1MacrosCurrent.fat =
//           this.state.mealMacrosCurrent.snack1MacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack1MacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.snack1MacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//         });
//         break;
//       case "Lunch":
//         mealMacrosCurrent.lunchMacrosCurrent.cals =
//           this.state.mealMacrosCurrent.lunchMacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.lunchMacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.lunchMacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.lunchMacrosCurrent.protein =
//           this.state.mealMacrosCurrent.lunchMacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.lunchMacrosCurrent.fat =
//           this.state.mealMacrosCurrent.lunchMacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.lunchMacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.lunchMacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//         });
//         break;
//       case "Snack 2":
//         mealMacrosCurrent.snack2MacrosCurrent.cals =
//           this.state.mealMacrosCurrent.snack2MacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack2MacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.snack2MacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack2MacrosCurrent.protein =
//           this.state.mealMacrosCurrent.snack2MacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack2MacrosCurrent.fat =
//           this.state.mealMacrosCurrent.snack2MacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.snack2MacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.snack2MacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//         });
//         break;
//       case "Dinner":
//         mealMacrosCurrent.dinnerMacrosCurrent.cals =
//           this.state.mealMacrosCurrent.dinnerMacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dinnerMacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.dinnerMacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dinnerMacrosCurrent.protein =
//           this.state.mealMacrosCurrent.dinnerMacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dinnerMacrosCurrent.fat =
//           this.state.mealMacrosCurrent.dinnerMacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dinnerMacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.dinnerMacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//         });
//         break;
//       case "Dessert":
//         mealMacrosCurrent.dessertMacrosCurrent.cals =
//           this.state.mealMacrosCurrent.dessertMacrosCurrent.cals +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.calories *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dessertMacrosCurrent.carbs =
//           this.state.mealMacrosCurrent.dessertMacrosCurrent.carbs +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dessertMacrosCurrent.protein =
//           this.state.mealMacrosCurrent.dessertMacrosCurrent.protein +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dessertMacrosCurrent.fat =
//           this.state.mealMacrosCurrent.dessertMacrosCurrent.fat +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
//             thisMealsMealIngredients[i].qty;
//         mealMacrosCurrent.dessertMacrosCurrent.fiber =
//           this.state.mealMacrosCurrent.dessertMacrosCurrent.fiber +
//           thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
//             thisMealsMealIngredients[i].qty;
//         this.setState({
//           mealMacrosCurrent: mealMacrosCurrent,
//         });
//         break;
//     }
//   }
// };
