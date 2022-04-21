import axios from "axios";
import React, { Component } from "react";
class CreateMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHasLoaded: false,
      thisDay: {},
      mealType: "",
      idForBSElements: "",
      meal: {},
      dayUserType: "",
    };
  }
  componentDidMount() {
    this.loadData();
  }
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  loadData() {
    let defaultGenRecipeId = "1";
    let defaultGenRecipeMealType = this.props.mealType;
    // axios
    //   .get(
    //     "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
    //       this.props.mealType
    //   )
    //   .then((response) => {
    switch (this.props.mealType) {
      case "Breakfast":
        defaultGenRecipeId = "62577f516682e3955e98b1d0";
        break;
      case "Snack 1":
        defaultGenRecipeId = "62577a7d93011a9b47306e6f";
        break;
      case "Lunch":
        defaultGenRecipeId = "62577f666682e3955e98b1d1";
        break;
      case "Snack 2":
        defaultGenRecipeId = "62577f786682e3955e98b1d2";
        break;
      case "Dinner":
        defaultGenRecipeId = "62577f8b6682e3955e98b1d3";
        break;
      case "Dessert":
        defaultGenRecipeId = "62577f9c6682e3955e98b1d4";
        break;
    }
    let defaultGenRecipe = {
      _id: defaultGenRecipeId,
      name: " ",
      availableMealType: defaultGenRecipeMealType,
      GRFUser: "62577a533813f4f21c27e1c7",
      defaultPrepInstructions: "",
      photoURL: "",
    };
    // const defaultGenRecipe = response.data[0];
    this.setState({
      dayUserType: this.props.dayUserType,
      thisDay: this.props.thisDay,
      mealType: this.props.mealType,
      meal: {
        day: this.props.thisDay,
        mealType: this.props.mealType,
        genRecipe: defaultGenRecipe,
      },
      idForBSElements: this.getRndInteger(10000000, 99999999),
      dataHasLoaded: true,
    });
    // });
  }
  renderMealForm = () => {
    if (this.state.dayUserType == "viewer") {
      return <div className="emptyAndNotAuthor">No Meal Added...</div>;
    } else {
      return (
        <form>
          <div className="form-group mt-4 mb-4">
            <button
              type="button"
              value="Create Meal"
              className="btn btn-primary"
              onClick={() => {
                this.props.onCreateMeal(this.state.meal);
              }}
            >
              Create Meal
            </button>
          </div>
        </form>
      );
    }
  };
  render() {
    if (this.state.dataHasLoaded == true) {
      return (
        <div
          className="accordion accordionNotFlush"
          id={"mealOuterAccordionFull" + this.state.idForBSElements}
        >
          <div className="accordion-item accordionItemNotFlush">
            <h2
              className="accordion-header"
              id={"mealOuterAccordionHeader" + this.state.idForBSElements}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#mealOuterAccrdn" + this.state.idForBSElements}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <h5>
                  {this.state.thisDay.dayOfWeek + " " + this.state.mealType}
                </h5>
              </button>
            </h2>
            {this.renderMealForm()}
          </div>
        </div>
      );
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default CreateMeal;
