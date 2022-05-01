import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealDetail from "./MealDetail.component";
import CreateMeal from "./CreateMeal.component";
import MealOrNewMeal from "./MealOrNewMeal.component";
import MacrosTable from "./MacrosTable.component";
import MacrosTable2 from "./MacrosTable2.component";

class DayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      thisFormState: "viewing",
      userType: "admin",
      breakfast: {
        breakfastJustCreated: false,
        userChangedBreakfast: false,
        breakfastMealFormState: "viewing",
        breakfastMeal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempBreakfastRecipe1Id",
            name: "tempBreakfastRecipe1Name",
            availableMealType: { code: "breakfast", name: "Breakfast" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "breakfast", name: "Breakfast" },
        },
        breakfastIngrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempBreakfastIngredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempBreakfastRecipe1Id",
                name: "tempBreakfastRecipe1Name",
                availableMealType: { code: "breakfast", name: "Breakfast" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempBreakfastRecipe1Id",
                name: "tempBreakfastRecipe1Name",
                availableMealType: { code: "breakfast", name: "Breakfast" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "breakfast", name: "Breakfast" },
            },
          },
        ],
        breakfastMacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.breakfastWeight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.breakfastWeight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.breakfastWeight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.breakfastWeight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.breakfastWeight / 100),
        },
      },
      snack1: {
        snack1JustCreated: false,
        userChangedSnack1: false,
        snack1MealFormState: "viewing",
        snack1Meal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempSnack1Recipe1Id",
            name: "tempSnack1Recipe1Name",
            availableMealType: { code: "snack1", name: "Snack 1" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "snack1", name: "Snack 1" },
        },
        snack1Ingrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempSnack1Ingredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempSnack1Recipe1Id",
                name: "tempSnack1Recipe1Name",
                availableMealType: { code: "snack1", name: "Snack 1" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempSnack1Recipe1Id",
                name: "tempSnack1Recipe1Name",
                availableMealType: { code: "snack1", name: "Snack 1" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "snack1", name: "Snack 1" },
            },
          },
        ],
        snack1MacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.snack1Weight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.snack1Weight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.snack1Weight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.snack1Weight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.snack1Weight / 100),
        },
      },
      lunch: {
        lunchJustCreated: false,
        userChangedLunch: false,
        lunchMealFormState: "viewing",
        lunchMeal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempLunchRecipe1Id",
            name: "tempLunchRecipe1Name",
            availableMealType: { code: "lunch", name: "Lunch" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "lunch", name: "Lunch" },
        },
        lunchIngrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempLunchIngredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempLunchRecipe1Id",
                name: "tempLunchRecipe1Name",
                availableMealType: { code: "lunch", name: "Lunch" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempLunchRecipe1Id",
                name: "tempLunchRecipe1Name",
                availableMealType: { code: "lunch", name: "Lunch" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "lunch", name: "Lunch" },
            },
          },
        ],
        lunchMacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.lunchWeight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.lunchWeight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.lunchWeight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.lunchWeight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.lunchWeight / 100),
        },
      },
      snack2: {
        snack2JustCreated: false,
        userChangedSnack2: false,
        snack2MealFormState: "viewing",
        snack2Meal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempSnack2Recipe1Id",
            name: "tempSnack2Recipe1Name",
            availableMealType: { code: "snack2", name: "Snack 2" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "snack2", name: "Snack 2" },
        },
        snack2Ingrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempSnack2Ingredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempSnack2Recipe1Id",
                name: "tempSnack2Recipe1Name",
                availableMealType: { code: "snack2", name: "Snack 2" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempSnack2Recipe1Id",
                name: "tempSnack2Recipe1Name",
                availableMealType: { code: "snack2", name: "Snack 2" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "snack2", name: "Snack 2" },
            },
          },
        ],
        snack2MacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.snack2Weight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.snack2Weight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.snack2Weight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.snack2Weight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.snack2Weight / 100),
        },
      },
      dinner: {
        dinnerJustCreated: false,
        userChangedDinner: false,
        dinnerMealFormState: "viewing",
        dinnerMeal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempDinnerRecipe1Id",
            name: "tempDinnerRecipe1Name",
            availableMealType: { code: "dinner", name: "Dinner" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "dinner", name: "Dinner" },
        },
        dinnerIngrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempDinnerIngredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempDinnerRecipe1Id",
                name: "tempDinnerRecipe1Name",
                availableMealType: { code: "dinner", name: "Dinner" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempDinnerRecipe1Id",
                name: "tempDinnerRecipe1Name",
                availableMealType: { code: "dinner", name: "Dinner" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "dinner", name: "Dinner" },
            },
          },
        ],
        dinnerMacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.dinnerWeight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.dinnerWeight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.dinnerWeight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.dinnerWeight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.dinnerWeight / 100),
        },
      },
      dessert: {
        dessertJustCreated: false,
        userChangedDessert: false,
        dessertMealFormState: "viewing",
        dessertMeal: {
          _id: "missing",
          day: this.props.thisDay,
          genRecipe: {
            _id: "tempDessertRecipe1Id",
            name: "tempDessertRecipe1Name",
            availableMealType: { code: "dessert", name: "Dessert" },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
          prepInstructions: "",
          mealType: { code: "dessert", name: "Dessert" },
        },
        dessertIngrdnts: [
          {
            qty: 1,
            genRecipeIngredient: {
              defaultQty: 1,
              ingredient: {
                name: "tempDessertIngredient1Name",
                calories: 1,
                carbs: 1,
                protein: 1,
                fat: 1,
                fiber: 1,
                unitOfMeasure: { name: "Each" },
                weightType: { name: "" },
                photoURL: "",
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                brand: { name: "" },
              },
              genRecipe: {
                _id: "tempDessertRecipe1Id",
                name: "tempDessertRecipe1Name",
                availableMealType: { code: "dessert", name: "Dessert" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              defaultPrepInstructions: "",
            },
            meal: {
              _id: "missing",
              day: this.props.thisDay,
              genRecipe: {
                _id: "tempDessertRecipe1Id",
                name: "tempDessertRecipe1Name",
                availableMealType: { code: "dessert", name: "Dessert" },
                GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
                defaultPrepInstructions: "",
                photoUrl: "",
              },
              prepInstructions: "",
              mealType: { code: "dessert", name: "Dessert" },
            },
          },
        ],
        dessertMacrosBudget: {
          cals:
            this.props.macrosBudget.cals *
            (this.props.mealsWeighting.dessertWeight / 100),
          carbs:
            this.props.macrosBudget.carbs *
            (this.props.mealsWeighting.dessertWeight / 100),
          protein:
            this.props.macrosBudget.protein *
            (this.props.mealsWeighting.dessertWeight / 100),
          fat:
            this.props.macrosBudget.fat *
            (this.props.mealsWeighting.dessertWeight / 100),
          fiber:
            this.props.macrosBudget.fiber *
            (this.props.mealsWeighting.dessertWeight / 100),
        },
      },
      macrosBudget: this.props.macrosBudget,
      macrosCurrent: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      deleteDayMsg: "Are you sure you want to delete this Day Meal Plan?",
      hideDeleteDayBarrier: true,
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
      .then((response) => this.updateMeals(response.data, [], false));
  }
  updateMeals = (meals, newMealIngredients, mealsState) => {
    if (meals.length === 0) {
      this.setState({ data: true });
    } else {
      let state = this.state;
      for (let i = 0; i < meals.length; i++) {
        state[meals[i].mealType.code][`${meals[i].mealType.code}Meal`] =
          meals[i];
        this.fetchDayMealsIngrdnts(meals[i]);
      }
      this.setState({ state });
    }
  };
  fetchDayMealsIngrdnts = (meal) => {
    axios
      .get(
        "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
          meal._id
      )
      .then((response) =>
        this.assignMealIngredientsToState(response.data, meal.mealType.code)
      );
  };
  assignMealIngredientsToState = (mealMealIngredients, thisMealType) => {
    if (mealMealIngredients.length === 0) {
      return;
    } else {
      let state = this.state;
      state[thisMealType][`${thisMealType}Ingrdnts`] = mealMealIngredients;
      state["data"] = true;
      this.setState({ state });
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
    axios.post("http://localhost:5000/meals/add", newMeal).then((response) =>
      (() => {
        let newMealData = response.data;
        let state = this.state;
        state[newMealData.mealType.code][`${newMealData.mealType.code}Meal`][
          "_id"
        ] = newMealData._id;
        this.setState({ state });
      })()
    );
  };
  updateMealIngrdnt = (
    thisMealIngrdnt,
    thisMealIngrdntIndex,
    thisMealType,
    method
  ) => {
    switch (thisMealType) {
      case "Breakfast":
        let breakfast = thisMealIngrdnt.meal;
        let breakfastMealIngrdnts = this.state.breakfastIngrdnts;
        if (method === "update") {
          breakfastMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
          this.setState({ breakfast: breakfast });
        } else if (method === "delete") {
          breakfastMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          breakfastIngrdnts: breakfastMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Snack 1":
        let snack1MealIngrdnts = this.state.snack1Ingrdnts;
        if (method === "update") {
          snack1MealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          snack1MealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          snack1Ingrdnts: snack1MealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Lunch":
        let lunch = thisMealIngrdnt.meal;
        let lunchMealIngrdnts = this.state.lunchIngrdnts;
        if (method === "update") {
          lunchMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
          this.setState({ lunch: lunch });
        } else if (method === "delete") {
          lunchMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          lunchIngrdnts: lunchMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Snack 2":
        let snack2MealIngrdnts = this.state.snack2Ingrdnts;
        if (method === "update") {
          snack2MealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          snack2MealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          snack2Ingrdnts: snack2MealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Dinner":
        let dinnerMealIngrdnts = this.state.dinnerIngrdnts;
        if (method === "update") {
          dinnerMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          dinnerMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          dinnerIngrdnts: dinnerMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Dessert":
        let dessertMealIngrdnts = this.state.dessertIngrdnts;
        if (method === "update") {
          dessertMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          dessertMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          dessertIngrdnts: dessertMealIngrdnts,
        });
        this.totalAllMacros();
        break;
    }
    if (method === "delete") {
      axios
        .delete("http://localhost:5000/mealIngredients/" + thisMealIngrdnt._id)
        .then((response) => console.log(response));
    } else if (method === "update") {
      axios
        .put(
          "http://localhost:5000/mealIngredients/" + thisMealIngrdnt._id,
          thisMealIngrdnt
        )
        .then((response) => console.log(response));
    }
  };
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  handleDeleteMeal = (thisMeal) => {
    axios
      .delete("http://localhost:5000/meals/" + thisMeal._id)
      .then((response) => {
        console.log(response);
        switch (thisMeal.mealType) {
          case "Breakfast":
            this.setState({
              breakfast: {
                _id: "missing",
              },
              breakfastIngrdnts: [],
            });
            break;
          case "Snack 1":
            this.setState({
              snack1: {
                _id: "missing",
              },
              snack1Ingrdnts: [],
            });
            break;
          case "Lunch":
            this.setState({
              lunch: {
                _id: "missing",
              },
              lunchIngrdnts: [],
            });
            break;
          case "Snack 2":
            this.setState({
              snack2: {
                _id: "missing",
              },
              snack2Ingrdnts: [],
            });
            break;
          case "Dinner":
            this.setState({
              dinner: {
                _id: "missing",
              },
              dinnerIngrdnts: [],
            });
            break;
          case "Dessert":
            this.setState({
              dessert: {
                _id: "missing",
              },
              dessertIngrdnts: [],
            });
            break;
        }
      });
  };
  handleClickDeleteDay = () => {
    if (
      this.state.breakfastIngrdnts.length === 0 &&
      this.state.snack1Ingrdnts.length === 0 &&
      this.state.lunchIngrdnts.length === 0 &&
      this.state.snack2Ingrdnts.length === 0 &&
      this.state.dinnerIngrdnts.length === 0 &&
      this.state.dessertIngrdnts.length === 0
    ) {
      this.props.onDeleteDay(this.state.thisDay._id);
    } else {
      this.setState({ hideDeleteDayBarrier: false });
    }
  };
  render() {
    if (this.state.data === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <React.Fragment>
          <div
            className="deleteWarning"
            hidden={this.state.hideDeleteDayBarrier}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteMealWarnLabel">
                    Cannot Delete Day with Meal Records
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning" role="alert">
                    Delete all day meals before attempting to delete the day
                    record
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ hideDeleteDayBarrier: true });
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 mb-3">
            <div className="card-header">
              <h3 className="card-title">{this.props.thisDay.dayOfWeek}</h3>
              <EditOptions
                parentObj={"Day"}
                thisFormState={this.state.thisFormState}
                userType={this.state.userType}
                onSubmitFormChange={this.handleSubmitFormChange}
                onClickCopy={this.handleClickCopy}
                onClickEdit={this.handleClickEdit}
                onCancel={this.handleCancel}
                onDelete={this.handleClickDeleteDay}
                deleteMsg={this.state.deleteDayMsg}
              />
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull" + this.props.thisDay._id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader" + this.props.thisDay._id}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#dayAccrdn" + this.props.thisDay._id}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                  <div
                    id={"dayAccrdn" + this.props.thisDay._id}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#accordionHeader" + this.props.thisDay._id
                    }
                    data-bs-parent={"#accordionFull" + this.props.thisDay._id}
                  >
                    <div className="accordion-body">
                      <div className="macroTblCntnr">
                        <MacrosTable2
                          tableType="Day Macros"
                          macrosBudget={this.props.macrosBudget}
                          breakfastIngrdnts={
                            this.state.breakfast.breakfastIngrdnts
                          }
                          snack1Ingrdnts={this.state.snack1.snack1Ingrdnts}
                          lunchIngrdnts={this.state.lunch.lunchIngrdnts}
                          snack2Ingrdnts={this.state.snack2.snack2Ingrdnts}
                          dinnerIngrdnts={this.state.dinner.dinnerIngrdnts}
                          dessertIngrdnts={this.state.dessert.dessertIngrdnts}
                        />
                      </div>
                      <ul>
                        <li>Name:&nbsp;{this.props.thisDay.name}</li>
                        <li>
                          Day of Week:&nbsp;{this.props.thisDay.dayOfWeek}
                        </li>
                        <li>
                          Week Meal Plan:&nbsp;{this.props.weekMealPlanName}
                        </li>
                        <li>
                          Created:&nbsp;
                          {dayjs(this.props.thisDay.createdAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                        </li>
                        <li>
                          Last Updated:&nbsp;
                          {dayjs(this.props.thisDay.updatedAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                        </li>
                      </ul>
                      <div className="card mt-3 mb-3">
                        <div className="card-header">
                          <h4 className="card-title">
                            {this.props.thisDay.dayOfWeek + " Meals"}
                          </h4>
                        </div>
                        <div className="card-body">
                          <div
                            className="accordion accordion-flush"
                            id={
                              "daysMealsAccordionFull" + this.props.thisDay._id
                            }
                          >
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id={
                                  "daysMealsAccordionHeader" +
                                  this.props.thisDay._id
                                }
                              >
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={
                                    "#mealsAccrdn" + this.props.thisDay._id
                                  }
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                ></button>
                              </h2>
                            </div>
                            <div
                              id={"mealsAccrdn" + this.props.thisDay._id}
                              className="accordion-collapse collapse show"
                              aria-labelledby={
                                "#daysMealsAccordionHeader" +
                                this.props.thisDay._id
                              }
                              data-bs-parent={
                                "#daysMealsAccordionFull" +
                                this.props.thisDay._id
                              }
                            >
                              <div className="accordion-body wkDaysAccrdnBdy">
                                Content
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
        </React.Fragment>
      );
    }
  }
}
export default DayDetail;
