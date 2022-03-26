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
    axios
      .get(
        "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
          this.props.mealType
      )
      .then((response) => {
        const defaultGenRecipe = response.data[0];
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
      });
  }
  renderMealForm = () => {
    if (this.state.dayUserType == "viewer") {
      return <div className="emptyAndNotAuthor">No Meal Added...</div>;
    } else {
      return (
        <form
          onSubmit={() => {
            this.props.onCreateMeal(this.state.meal);
          }}
        >
          <div className="form-group mt-4 mb-4">
            <input
              type="submit"
              value="Create Meal"
              className="btn btn-primary"
            />
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
