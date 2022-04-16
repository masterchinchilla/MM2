import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealIngredientDetail from "./MealIngredientDetail";
import MealDetail from "./MealDetail.component";
import CreateMeal from "./CreateMeal.component";

class MealOrNewMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealsDay: this.props.thisDay,
      thisMealType: this.props.mealType,
      dayUserType: this.props.dayUserType,
      thisMeal: this.props.thisMeal,
      thisMealsMacrosBudget: this.props.thisMealsMacrosBudget,
      thisMealsMacrosCurrent: this.props.thisMealsMacrosCurrent,
      thisMealsMealIngrdnts: this.props.thisMealsMealIngrdnts,
      thisMealTypesGenRecipesLoaded: false,
      allGRFUsersLoaded: false,
      allDaysLoaded: false,
      thisMealsId: "",
      thisRecipesId: "",
      thisFormState: "viewing",
      userType: "admin",
      thisMealsGenRecipe: { name: "Cereal", id: 1 },
      thisMealTypesGenRecipes: [
        { name: "Scrambled Eggs", id: 2 },
        { name: "French Toast", id: 3 },
        { name: "Cereal", id: 1 },
      ],
      thisRecipesInst: "",
      thisMealRecipePic: "",
      thisRecipesName: "",
      thisRecipesMealType: "",
      thisRecipesAuthor: {},
      allMealTypes: [
        "Breakfast",
        "Snack 1",
        "Lunch",
        "Snack 2",
        "Dinner",
        "Dessert",
      ],
      allGRFUsers: [],
      allDays: [],
      idForNewMeal: "",
      newMeal: {},
    };
  }
  componentDidMount() {
    this.loadData();
    this.setState({
      thisMealsId: this.state.thisMeal._id,
    });
  }
  loadData() {
    this.getThisMealsTypesGenRecipes();
    this.getAllUsers();
    this.getAllDays();
  }
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  getThisMealsTypesGenRecipes = () => {
    axios
      .get(
        "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
          this.props.thisMealType
      )
      .then((response) => {
        const defaultGenRecipe = response.data[0];
        this.setState({
          thisMealTypesGenRecipes: response.data.map(
            (mealTypeRecipe) => mealTypeRecipe
          ),
          newMeal: {
            day: this.state.thisDay,
            mealType: this.state.mealType,
            genRecipe: defaultGenRecipe,
          },
          idForNewMeal: this.getRndInteger(10000000, 99999999),
          thisMealTypesGenRecipesLoaded: true,
        });
      });
  };
  getAllUsers = () => {
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      this.setState({
        allGRFUsers: response.data.map((GRFUser) => GRFUser),
        allGRFUsersLoaded: true,
      });
    });
  };
  getAllDays = () => {
    axios.get("http://localhost:5000/days/").then((response) => {
      this.setState({
        allDays: response.data.map((day) => day),
        allDaysLoaded: true,
      });
    });
  };
  render() {
    if (
      this.state.thisMealTypesGenRecipesLoaded == true &&
      this.state.allGRFUsersLoaded == true &&
      this.state.allDaysLoaded == true
    ) {
      if (this.state.thisMeal._id == "missing") {
        return (
          <CreateMeal
            thisDay={this.state.thisMealsDay}
            mealType={this.state.thisMealType}
            onCreateMeal={this.props.onCreateMeal}
            dayUserType={this.state.dayUserType}
            thisMealTypesGenRecipes={this.state.thisMealTypesGenRecipes}
            newMeal={this.state.newMeal}
            idForNewMeal={this.state.idForNewMeal}
          />
        );
      } else {
        return (
          <MealDetail
            thisMeal={this.state.thisMeal}
            thisMealsMacrosBudget={this.state.thisMealsMacrosBudget}
            thisMealsMacrosCurrent={this.state.thisMealsMacrosCurrent}
            thisMealsMealIngrdnts={this.state.thisMealsMealIngrdnts}
            thisDay={this.state.thisMealsDay}
            mealType={this.state.mealType}
            dayUserType={this.state.dayUserType}
            thisMealTypesGenRecipes={this.state.thisMealTypesGenRecipes}
            clearCurrentMacros={this.props.clearCurrentMacros}
            updateMealIngrdnt={this.props.updateMealIngrdnt}
            onDeleteMeal={this.props.onDeleteMeal}
          />
        );
      }
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default MealOrNewMeal;
