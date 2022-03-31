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
      breakfast: {
        _id: "missing",
      },
      breakfastIngrdnts: [],
      snack1: {
        _id: "missing",
      },
      snack1Ingrdnts: [],
      lunch: {
        _id: "missing",
      },
      lunchIngrdnts: [],
      snack2: {
        _id: "missing",
      },
      snack2Ingrdnts: [],
      dinner: {
        _id: "missing",
      },
      dinnerIngrdnts: [],
      dessert: {
        _id: "missing",
      },
      dessertIngrdnts: [],
      macrosBudget: this.props.macrosBudget,
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
      .then((response) => this.fetchDayMealsIngrdnts(response.data));
    // .then((response) => {
    //   this.setState({
    //     thisDaysMeals: response.data.map((meal) => meal),
    //     breakfast: response.data.filter(
    //       (meal) => meal.mealType == "Breakfast"
    //     )[0],
    //     snack1: response.data.filter((meal) => meal.mealType == "Snack 1")[0],
    //     lunch: response.data.filter((meal) => meal.mealType == "Lunch")[0],
    //     snack2: response.data.filter((meal) => meal.mealType == "Snack 2")[0],
    //     dinner: response.data.filter((meal) => meal.mealType == "Dinner")[0],
    //     dessert: response.data.filter(
    //       (meal) => meal.mealType == "Dessert"
    //     )[0],
    //     data: true,
    //   });
    // });
  }
  fetchDayMealsIngrdnts = (meals) => {
    if (meals.length == 0) {
      this.setState({ data: true });
    } else {
      let i = 0;
      for (i; i < meals.length; i++) {
        switch (meals[i].mealType) {
          case "Breakfast":
            this.setState({
              breakfast: meals[i],
            });
            break;
          case "Snack 1":
            this.setState({
              snack1: meals[i],
            });
            break;
          case "Lunch":
            this.setState({
              lunch: meals[i],
            });
            break;
          case "Snack 2":
            this.setState({
              snack2: meals[i],
            });
            break;
          case "Dinner":
            this.setState({
              dinner: meals[i],
            });
            break;
          case "Dessert":
            this.setState({
              dessert: meals[i],
            });
            break;
        }
        axios
          .get(
            "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
              meals[i]._id
          )
          .then((response) => this.assignMealIngredientsToState(response.data));
      }
    }
  };
  assignMealIngredientsToState = (mealMealIngredients) => {
    if (mealMealIngredients.length == 0) {
      this.setState({ data: true });
    } else {
      let thisMealType = mealMealIngredients[0].meal.mealType;
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
      this.totalCurrentMacrosMethod(mealMealIngredients, thisMealType);
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
  totalCurrentMacrosMethod = (thisMealsMealIngredients, mealType) => {
    let mealMacrosCurrent = this.state.mealMacrosCurrent;
    let macrosCurrent = this.state.macrosCurrent;
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
            macrosCurrent.cals + mealMacrosCurrent.breakfastMacrosCurrent.cals;
          mealMacrosCurrent.breakfastMacrosCurrent.carbs =
            mealMacrosCurrent.breakfastMacrosCurrent.carbs +
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.carbs *
              thisMealsMealIngredients[i].qty;
          macrosCurrent.carbs =
            macrosCurrent.carbs +
            mealMacrosCurrent.breakfastMacrosCurrent.carbs;
          mealMacrosCurrent.breakfastMacrosCurrent.protein =
            mealMacrosCurrent.breakfastMacrosCurrent.protein +
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            macrosCurrent.carbs + mealMacrosCurrent.dessertMacrosCurrent.carbs;
          mealMacrosCurrent.dessertMacrosCurrent.protein =
            mealMacrosCurrent.dessertMacrosCurrent.protein +
            thisMealsMealIngredients[i].genRecipeIngredient.ingredient.protein *
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
            macrosCurrent.fiber + mealMacrosCurrent.dessertMacrosCurrent.fiber;
          break;
      }
    }
    this.setState({
      mealMacrosCurrent: mealMacrosCurrent,
      macrosCurrent: macrosCurrent,
      data: true,
    });
  };
  clearCurrentMacros = () => {
    this.setState({
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
    });
  };
  renderMeal = (
    mealToRender,
    thisDay,
    mealType,
    thisMealsMacrosBudget,
    thisMealsMacrosCurrent,
    thisMealsMealIngrdnts
  ) => {
    if (mealToRender._id == "missing") {
      // if (mealToRender == undefined) {
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
          thisMealsMacrosCurrent={thisMealsMacrosCurrent}
          thisMealsMealIngrdnts={thisMealsMealIngrdnts}
          clearCurrentMacros={this.clearCurrentMacros}
        />
      );
    }
  };
  render() {
    if (this.state.data == false) {
      return <div className="spinner-border text-primary" role="status"></div>;
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
                            <td>{this.state.macrosCurrent.cals}</td>
                            <td>{this.state.macrosCurrent.carbs}</td>
                            <td>{this.state.macrosCurrent.protein}</td>
                            <td>{this.state.macrosCurrent.fat}</td>
                            <td>{this.state.macrosCurrent.fiber}</td>
                          </tr>
                          <tr>
                            <th scope="row">Left</th>
                            <td>
                              {this.state.macrosBudget.calsBudget -
                                this.state.macrosCurrent.cals}
                            </td>
                            <td>
                              {this.state.macrosBudget.carbsBudget -
                                this.state.macrosCurrent.carbs}
                            </td>
                            <td>
                              {this.state.macrosBudget.proteinBudget -
                                this.state.macrosCurrent.protein}
                            </td>
                            <td>
                              {this.state.macrosBudget.fatBudget -
                                this.state.macrosCurrent.fat}
                            </td>
                            <td>
                              {this.state.macrosBudget.fiberBudget -
                                this.state.macrosCurrent.fiber}
                            </td>
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
                                this.state.mealMacrosBudget
                                  .breakfastMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .breakfastMacrosCurrent,
                                this.state.breakfastIngrdnts
                              )}
                              {this.renderMeal(
                                this.state.snack1,
                                this.state.thisDay,
                                "Snack 1",
                                this.state.mealMacrosBudget.snack1MacrosBudget,
                                this.state.mealMacrosCurrent
                                  .snack1MacrosCurrent,
                                this.state.snack1Ingrdnts
                              )}
                              {this.renderMeal(
                                this.state.lunch,
                                this.state.thisDay,
                                "Lunch",
                                this.state.mealMacrosBudget.lunchMacrosBudget,
                                this.state.mealMacrosCurrent.lunchMacrosCurrent,
                                this.state.lunchIngrdnts
                              )}
                              {this.renderMeal(
                                this.state.snack2,
                                this.state.thisDay,
                                "Snack 2",
                                this.state.mealMacrosBudget.snack2MacrosBudget,
                                this.state.mealMacrosCurrent
                                  .snack2MacrosCurrent,
                                this.state.snack2Ingrdnts
                              )}
                              {this.renderMeal(
                                this.state.dinner,
                                this.state.thisDay,
                                "Dinner",
                                this.state.mealMacrosBudget.dinnerMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .dinnerMacrosCurrent,
                                this.state.dinnerIngrdnts
                              )}
                              {this.renderMeal(
                                this.state.dessert,
                                this.state.thisDay,
                                "Dessert",
                                this.state.mealMacrosBudget.dessertMacrosBudget,
                                this.state.mealMacrosCurrent
                                  .dessertMacrosCurrent,
                                this.state.dessertIngrdnts
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
