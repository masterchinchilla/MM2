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
      breakfast: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe1Id",
          name: "tempGenRecipe1Name",
          availableMealType: { code: "breakfast", name: "Breakfast" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "breakfast", name: "Breakfast" },
      },
      breakfastIngrdnts: [],
      userChangedBreakfast: false,
      snack1: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe3Id",
          name: "tempGenRecipe3Name",
          availableMealType: { code: "snack1", name: "Snack 1" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "snack1", name: "Snack 1" },
      },
      snack1Ingrdnts: [],
      userChangedSnack1: false,
      lunch: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe4Id",
          name: "tempGenRecipe4Name",
          availableMealType: { code: "lunch", name: "Lunch" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "lunch", name: "Lunch" },
      },
      lunchIngrdnts: [],
      userChangedLunch: false,
      snack2: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe5Id",
          name: "tempGenRecipe5Name",
          availableMealType: { code: "snack2", name: "Snack 2" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "snack2", name: "Snack 2" },
      },
      snack2Ingrdnts: [],
      userChangedSnack2: false,
      dinner: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe5Id",
          name: "tempGenRecipe5Name",
          availableMealType: { code: "dinner", name: "Dinner" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "dinner", name: "Dinner" },
      },
      dinnerIngrdnts: [],
      userChangedDinner: false,
      dessert: {
        _id: "missing",
        day: this.props.thisDay,
        genRecipe: {
          _id: "tempGenRecipe2Id",
          name: "tempGenRecipe2Name",
          availableMealType: { code: "dessert", name: "Dessert" },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        prepInstructions: "",
        mealType: { code: "dessert", name: "Dessert" },
      },
      dessertIngrdnts: [],
      userChangedDessert: false,
      macrosBudget: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      mealsWeighting: this.props.mealsWeighting,
      macrosCurrent: {
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
      mealMacrosBudget: {
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
      // allGRFUsers: [
      //   { _id: "tempGRFUser1Id", handle: "tempGRFUser1Handle" },
      //   { _id: "tempGRFUser2Id", handle: "tempGRFUser2Handle" },
      // ],
      allGRFUsersLoaded: false,
      deleteDayMsg: "Are you sure you want to delete this Day Meal Plan?",
      hideDeleteDayBarrier: true,
    };
  }
  componentDidMount() {
    this.setState({
      allGRFUsers: this.props.allGRFUsers,
      allGRFUsersLoaded: true,
    });
    this.loadData();
  }
  loadData() {
    this.setState({
      macrosBudget: this.props.macrosBudget,
    });
    // this.getAllUsers();
    axios
      .get(
        "http://localhost:5000/meals/mealsofthisday/" + this.props.thisDay._id
      )
      .then((response) => this.updateMeals(response.data, false));
  }
  updateMeals = (meals, newMealIngredients, mealsState) => {
    if (meals.length === 0) {
      this.setState({ data: true });
    } else {
      let i = 0;
      for (i; i < meals.length; i++) {
        switch (meals[i].mealType.name) {
          case "Breakfast":
            this.setState({
              breakfast: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedBreakfast: true });
            } else {
              this.setState({ userChangedBreakfast: false });
            }
            break;
          case "Snack 1":
            this.setState({
              snack1: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedSnack1: true });
            } else {
              this.setState({ userChangedSnack1: false });
            }
            break;
          case "Lunch":
            this.setState({
              lunch: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedLunch: true });
            } else {
              this.setState({ userChangedLunch: false });
            }
            break;
          case "Snack 2":
            this.setState({
              snack2: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedSnack2: true });
            } else {
              this.setState({ userChangedSnack2: false });
            }
            break;
          case "Dinner":
            this.setState({
              dinner: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedDinner: true });
            } else {
              this.setState({ userChangedDinner: false });
            }
            break;
          case "Dessert":
            this.setState({
              dessert: meals[i],
            });
            if (mealsState === true) {
              this.setState({ userChangedDessert: true });
            } else {
              this.setState({ userChangedDessert: false });
            }
            break;
        }
        if (mealsState) {
          this.assignMealIngredientsToState(newMealIngredients);
        } else {
          this.fetchDayMealsIngrdnts(meals[i]);
        }
      }
    }
  };
  fetchDayMealsIngrdnts = (meal) => {
    axios
      .get(
        "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
          meal._id
      )
      .then((response) => this.assignMealIngredientsToState(response.data));
  };
  assignMealIngredientsToState = (mealMealIngredients) => {
    if (mealMealIngredients.length === 0) {
      this.setState({ data: true });
    } else {
      let thisMealType = mealMealIngredients[0].meal.mealType.name;
      switch (thisMealType) {
        case "Breakfast":
          this.setState({
            breakfastIngrdnts: mealMealIngredients,
          });
          break;
        case "Snack 1":
          this.setState({
            snack1Ingrdnts: mealMealIngredients,
          });
          break;
        case "Lunch":
          this.setState({
            lunchIngrdnts: mealMealIngredients,
          });
          break;
        case "Snack 2":
          this.setState({
            snack2Ingrdnts: mealMealIngredients,
          });
          break;
        case "Dinner":
          this.setState({
            dinnerIngrdnts: mealMealIngredients,
          });
          break;
        case "Dessert":
          this.setState({
            dessertIngrdnts: mealMealIngredients,
          });
          break;
      }
      this.totalAllMacros();
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
        meal._id = response.data._id;
        console.log(meal);
        switch (response.data.mealType) {
          case "Breakfast":
            this.setState({ breakfast: meal });
            break;
          case "Snack 1":
            this.setState({ snack1: meal });
            break;
          case "Lunch":
            this.setState({ lunch: meal });
            break;
          case "Snack 2":
            this.setState({ snack2: meal });
            break;
          case "Dinner":
            this.setState({ dinner: meal });
            break;
          case "Dessert":
            this.setState({ dessert: meal });
            break;
        }
      })()
    );
  };
  totalAllMacros = () => {
    // this.clearCurrentMacros();
    var macrosCurrent = {
      cals: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    };
    var mealMacrosCurrent = {
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
    };
    function totalMealsMacros(thisMealsMealIngredients, mealType) {
      let i = 0;
      for (i; i < thisMealsMealIngredients.length; i++) {
        switch (mealType) {
          case "Breakfast":
            mealMacrosCurrent.breakfastMacrosCurrent.cals =
              mealMacrosCurrent.breakfastMacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals +
              mealMacrosCurrent.breakfastMacrosCurrent.cals;
            mealMacrosCurrent.breakfastMacrosCurrent.carbs =
              mealMacrosCurrent.breakfastMacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs +
              mealMacrosCurrent.breakfastMacrosCurrent.carbs;
            mealMacrosCurrent.breakfastMacrosCurrent.protein =
              mealMacrosCurrent.breakfastMacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.breakfastMacrosCurrent.protein;
            mealMacrosCurrent.breakfastMacrosCurrent.fat =
              mealMacrosCurrent.breakfastMacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.breakfastMacrosCurrent.fat;
            mealMacrosCurrent.breakfastMacrosCurrent.fiber =
              mealMacrosCurrent.breakfastMacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber +
              mealMacrosCurrent.breakfastMacrosCurrent.fiber;
            break;
          case "Snack 1":
            mealMacrosCurrent.snack1MacrosCurrent.cals =
              mealMacrosCurrent.snack1MacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals + mealMacrosCurrent.snack1MacrosCurrent.cals;
            mealMacrosCurrent.snack1MacrosCurrent.carbs =
              mealMacrosCurrent.snack1MacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs + mealMacrosCurrent.snack1MacrosCurrent.carbs;
            mealMacrosCurrent.snack1MacrosCurrent.protein =
              mealMacrosCurrent.snack1MacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.snack1MacrosCurrent.protein;
            mealMacrosCurrent.snack1MacrosCurrent.fat =
              mealMacrosCurrent.snack1MacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.snack1MacrosCurrent.fat;
            mealMacrosCurrent.snack1MacrosCurrent.fiber =
              mealMacrosCurrent.snack1MacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber + mealMacrosCurrent.snack1MacrosCurrent.fiber;
            break;
          case "Lunch":
            mealMacrosCurrent.lunchMacrosCurrent.cals =
              mealMacrosCurrent.lunchMacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals + mealMacrosCurrent.lunchMacrosCurrent.cals;
            mealMacrosCurrent.lunchMacrosCurrent.carbs =
              mealMacrosCurrent.lunchMacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs + mealMacrosCurrent.lunchMacrosCurrent.carbs;
            mealMacrosCurrent.lunchMacrosCurrent.protein =
              mealMacrosCurrent.lunchMacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.lunchMacrosCurrent.protein;
            mealMacrosCurrent.lunchMacrosCurrent.fat =
              mealMacrosCurrent.lunchMacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.lunchMacrosCurrent.fat;
            mealMacrosCurrent.lunchMacrosCurrent.fiber =
              mealMacrosCurrent.lunchMacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber + mealMacrosCurrent.lunchMacrosCurrent.fiber;
            break;
          case "Snack 2":
            mealMacrosCurrent.snack2MacrosCurrent.cals =
              mealMacrosCurrent.snack2MacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals + mealMacrosCurrent.snack2MacrosCurrent.cals;
            mealMacrosCurrent.snack2MacrosCurrent.carbs =
              mealMacrosCurrent.snack2MacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs + mealMacrosCurrent.snack2MacrosCurrent.carbs;
            mealMacrosCurrent.snack2MacrosCurrent.protein =
              mealMacrosCurrent.snack2MacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.snack2MacrosCurrent.protein;
            mealMacrosCurrent.snack2MacrosCurrent.fat =
              mealMacrosCurrent.snack2MacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.snack2MacrosCurrent.fat;
            mealMacrosCurrent.snack2MacrosCurrent.fiber =
              mealMacrosCurrent.snack2MacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber + mealMacrosCurrent.snack2MacrosCurrent.fiber;
            break;
          case "Dinner":
            mealMacrosCurrent.dinnerMacrosCurrent.cals =
              mealMacrosCurrent.dinnerMacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals + mealMacrosCurrent.dinnerMacrosCurrent.cals;
            mealMacrosCurrent.dinnerMacrosCurrent.carbs =
              mealMacrosCurrent.dinnerMacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs + mealMacrosCurrent.dinnerMacrosCurrent.carbs;
            mealMacrosCurrent.dinnerMacrosCurrent.protein =
              mealMacrosCurrent.dinnerMacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.dinnerMacrosCurrent.protein;
            mealMacrosCurrent.dinnerMacrosCurrent.fat =
              mealMacrosCurrent.dinnerMacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.dinnerMacrosCurrent.fat;
            mealMacrosCurrent.dinnerMacrosCurrent.fiber =
              mealMacrosCurrent.dinnerMacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber + mealMacrosCurrent.dinnerMacrosCurrent.fiber;
            break;
          case "Dessert":
            mealMacrosCurrent.dessertMacrosCurrent.cals =
              mealMacrosCurrent.dessertMacrosCurrent.cals +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .calories *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.cals =
              macrosCurrent.cals + mealMacrosCurrent.dessertMacrosCurrent.cals;
            mealMacrosCurrent.dessertMacrosCurrent.carbs =
              mealMacrosCurrent.dessertMacrosCurrent.carbs +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.carbs =
              macrosCurrent.carbs +
              mealMacrosCurrent.dessertMacrosCurrent.carbs;
            mealMacrosCurrent.dessertMacrosCurrent.protein =
              mealMacrosCurrent.dessertMacrosCurrent.protein +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient
                .protein *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.protein =
              macrosCurrent.protein +
              mealMacrosCurrent.dessertMacrosCurrent.protein;
            mealMacrosCurrent.dessertMacrosCurrent.fat =
              mealMacrosCurrent.dessertMacrosCurrent.fat +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fat *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fat =
              macrosCurrent.fat + mealMacrosCurrent.dessertMacrosCurrent.fat;
            mealMacrosCurrent.dessertMacrosCurrent.fiber =
              mealMacrosCurrent.dessertMacrosCurrent.fiber +
              thisMealsMealIngredients[i].genRecipeIngredient.ingredient.fiber *
                thisMealsMealIngredients[i].qty;
            macrosCurrent.fiber =
              macrosCurrent.fiber +
              mealMacrosCurrent.dessertMacrosCurrent.fiber;
            break;
        }
      }
    }
    if (this.state.breakfast._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.breakfastIngrdnts, "Breakfast");
    }
    if (this.state.snack1._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.snack1Ingrdnts, "Snack1");
    }
    if (this.state.lunch._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.lunchIngrdnts, "Lunch");
    }
    if (this.state.snack2._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.snack2Ingrdnts, "Snack 2");
    }
    if (this.state.dinner._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.dinnerIngrdnts, "Dinner");
    }
    if (this.state.dessert._id == "Missing") {
      return;
    } else {
      totalMealsMacros(this.state.dessertIngrdnts, "Dessert");
    }
    this.setState({
      mealMacrosCurrent: mealMacrosCurrent,
      macrosCurrent: macrosCurrent,
      data: true,
    });
  };
  clearCurrentMacros = () => {
    let macrosCurrent = {
      cals: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    };
    let mealMacrosCurrent = {
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
    };
    this.setState({
      macrosCurrent: macrosCurrent,
      mealMacrosCurrent: mealMacrosCurrent,
    });
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
    if (this.state.data == false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <React.Fragment>
          <div
            // className="modal fade deleteWarning"
            className="deleteWarning"
            // id="delete_meal_Warn"
            // data-bs-backdrop="static"
            // data-bs-keyboard="false"
            // tabindex="-1"
            // aria-labelledby="deleteMealWarnLabel"
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
                onDelete={this.handleClickDeleteDay}
                deleteMsg={this.state.deleteDayMsg}
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
                    aria-labelledby={
                      "#accordionHeader" + this.state.thisDay._id
                    }
                    data-bs-parent={"#accordionFull" + this.state.thisDay._id}
                  >
                    <div className="accordion-body">
                      <div className="macroTblCntnr">
                        <MacrosTable
                          tableType="Day Macros"
                          macrosBudget={this.state.macrosBudget}
                          macrosCurrent={this.state.macrosCurrent}
                        />
                      </div>
                      <ul>
                        <li>Name:&nbsp;{this.state.thisDay.name}</li>
                        <li>
                          Day of Week:&nbsp;{this.state.thisDay.dayOfWeek}
                        </li>
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
                                  data-bs-target={
                                    "#mealsAccrdn" + this.state.id
                                  }
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
                                <MealOrNewMeal
                                  thisDay={this.state.thisDay}
                                  mealType={"Breakfast"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.breakfast}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .breakfastMacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .breakfastMacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.breakfastIngrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allBreakfastRecipes
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedBreakfast === true
                                      ? true
                                      : false
                                  }
                                  mealFormState={
                                    this.state.userChangedBreakfast === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                  updateMeals={this.updateMeals}
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                />
                                <MealOrNewMeal
                                  thisDay={this.state.thisDay}
                                  mealType={"Snack 1"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.snack1}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .snack1MacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .snack1MacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.snack1Ingrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allSnack1Recipes
                                  }
                                  updateMeals={this.updateMeals}
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedSnack1 === true
                                      ? true
                                      : false
                                  }
                                  mealFormState={
                                    this.state.userChangedSnack1 === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                />
                                <MealOrNewMeal
                                  thisDay={this.state.thisDay}
                                  mealType={"Lunch"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.lunch}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .lunchMacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .lunchMacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.lunchIngrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allLunchRecipes
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedLunch === true
                                      ? true
                                      : false
                                  }
                                  updateMeals={this.updateMeals}
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                  mealFormState={
                                    this.state.userChangedLunch === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                />
                                <MealOrNewMeal
                                  thisDay={this.props.thisDay}
                                  mealType={"Snack 2"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.snack2}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .snack2MacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .snack2MacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.snack2Ingrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allSnack2Recipes
                                  }
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedSnack2 === true
                                      ? true
                                      : false
                                  }
                                  updateMeals={this.updateMeals}
                                  mealFormState={
                                    this.state.userChangedSnack2 === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                />
                                <MealOrNewMeal
                                  thisDay={this.state.thisDay}
                                  mealType={"Dinner"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.dinner}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .dinnerMacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .dinnerMacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.dinnerIngrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allDinnerRecipes
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedDinner === true
                                      ? true
                                      : false
                                  }
                                  updateMeals={this.updateMeals}
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                  mealFormState={
                                    this.state.userChangedDinner === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                />
                                <MealOrNewMeal
                                  thisDay={this.state.thisDay}
                                  mealType={"Dessert"}
                                  onCreateMeal={this.handleCreateMeal}
                                  dayUserType={this.state.userType}
                                  thisMeal={this.state.dessert}
                                  key={this.getRndInteger(10000000, 99999999)}
                                  thisMealsMacrosBudget={
                                    this.state.mealMacrosBudget
                                      .dessertMacrosBudget
                                  }
                                  thisMealsMacrosCurrent={
                                    this.state.mealMacrosCurrent
                                      .dessertMacrosCurrent
                                  }
                                  thisMealsMealIngrdnts={
                                    this.state.dessertIngrdnts
                                  }
                                  clearCurrentMacros={this.clearCurrentMacros}
                                  updateMealIngrdnt={this.updateMealIngrdnt}
                                  onDeleteMeal={this.handleDeleteMeal}
                                  allGRFUsers={this.props.allGRFUsers}
                                  allDays={this.props.allDays}
                                  thisMealTypesGenRecipes={
                                    this.props.allDessertRecipes
                                  }
                                  userHasChangedRecipe={
                                    this.state.userChangedDessert === true
                                      ? true
                                      : false
                                  }
                                  updateMeals={this.updateMeals}
                                  assignMealIngredientsToState={
                                    this.assignMealIngredientsToState
                                  }
                                  mealFormState={
                                    this.state.userChangedDessert === true
                                      ? "editingOrig"
                                      : "viewing"
                                  }
                                />
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
