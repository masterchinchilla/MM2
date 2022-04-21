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
      thisMealTypesGenRecipes: [],
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
      // allGRFUsers: [
      //   { _id: "tempGRFUser1Id", handle: "tempGRFUser1Handle" },
      //   { _id: "tempGRFUser2Id", handle: "tempGRFUser2Handle" },
      // ],
      // allDays: [
      //   {
      //     _id: "tempDay1Id",
      //     name: "tempDayName1",
      //     dayOfWeek: "Sunday",
      //     weekMealPlan: "625b7e5a4451249a38449792",
      //   },
      //   {
      //     _id: "tempDay2Id",
      //     name: "tempDayName2",
      //     dayOfWeek: "Monday",
      //     weekMealPlan: "625b7e5a4451249a38449792",
      //   },
      // ],
      idForNewMeal: "",
      newMeal: {},
    };
  }
  componentDidMount() {
    this.setState({
      thisMeal: this.props.thisMeal,
      thisMealsId: this.props.thisMeal._id,
      // allGRFUsers: this.props.allGRFUsers,
      allGRFUsersLoaded: true,
      allDaysLoaded: true,
      thisMealTypesGenRecipes: this.props.thisMealTypesGenRecipes,
      thisMealTypesGenRecipesLoaded: true,
      newMeal: {
        day: this.props.thisDay,
        mealType: this.props.mealType,
        genRecipe: this.props.thisMealTypesGenRecipes[0],
      },
      idForNewMeal: this.getRndInteger(10000000, 99999999),
    });
    // this.loadData();
  }
  // loadData() {
  //   this.getThisMealsTypesGenRecipes();
  //   this.getAllDays();
  // }
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // getThisMealsTypesGenRecipes = () => {
  //   axios
  //     .get(
  //       "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
  //         this.props.thisMealType
  //     )
  //     .then((response) => {
  //       const defaultGenRecipe = response.data[0];
  //       this.setState({
  //         thisMealTypesGenRecipes: response.data.map(
  //           (mealTypeRecipe) => mealTypeRecipe
  //         ),
  //         newMeal: {
  //           day: this.state.thisDay,
  //           mealType: this.state.mealType,
  //           genRecipe: defaultGenRecipe,
  //         },
  //         idForNewMeal: this.getRndInteger(10000000, 99999999),
  //         thisMealTypesGenRecipesLoaded: true,
  //       });
  //     });
  // };
  // getAllUsers = () => {
  //   axios.get("http://localhost:5000/GRFUsers/").then((response) => {
  //     this.setState({
  //       allGRFUsers: response.data.map((GRFUser) => GRFUser),
  //       allGRFUsersLoaded: true,
  //     });
  //   });
  // };
  // getAllDays = () => {
  //   axios.get("http://localhost:5000/days/").then((response) => {
  //     this.setState({
  //       allDays: response.data.map((day) => day),
  //       allDaysLoaded: true,
  //     });
  //   });
  // };
  render() {
    if (
      this.state.thisMealTypesGenRecipesLoaded == true &&
      this.state.allGRFUsersLoaded == true &&
      this.state.allDaysLoaded == true
    ) {
      if (this.state.thisMeal._id == "missing") {
        return (
          <CreateMeal
            thisDay={this.props.thisDay}
            mealType={this.props.mealType}
            onCreateMeal={this.props.onCreateMeal}
            dayUserType={this.state.dayUserType}
            thisMealTypesGenRecipes={this.props.thisMealTypesGenRecipes}
            newMeal={this.state.newMeal}
            idForNewMeal={this.state.idForNewMeal}
          />
        );
      } else {
        return (
          <MealDetail
            thisMeal={this.props.thisMeal}
            thisMealsMacrosBudget={this.state.thisMealsMacrosBudget}
            thisMealsMacrosCurrent={this.state.thisMealsMacrosCurrent}
            thisMealsMealIngrdnts={this.state.thisMealsMealIngrdnts}
            thisDay={this.props.thisDay}
            mealType={this.props.mealType}
            dayUserType={this.state.dayUserType}
            thisMealTypesGenRecipes={this.props.thisMealTypesGenRecipes}
            clearCurrentMacros={this.props.clearCurrentMacros}
            updateMealIngrdnt={this.props.updateMealIngrdnt}
            onDeleteMeal={this.props.onDeleteMeal}
            allGRFUsers={this.props.allGRFUsers}
            allDays={this.props.allDays}
          />
        );
      }
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default MealOrNewMeal;
