import axios from "axios";
import React, { Component } from "react";
class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      thisMeal: {},
      thisFormState: "viewing",
      userIsAuthor: true,
      thisMealsMealIngrdnts: [],
      thisMealsGenRecipe: { name: "Cereal", id: 1 },
      thisMealTypesGenRecipes: [
        { name: "Scrambled Eggs", id: 2 },
        { name: "French Toast", id: 3 },
        { name: "Cereal", id: 1 },
      ],
    };
  }
  componentDidMount() {
    // axios.get(
    //   "http://localhost:5000/thisMealTypesGenRecipes/"+this.props.thisMeal.mealType
    // ).then((response)=>{
    //   this.setState({
    //     thisMeal: this.props.thisMeal,
    //     thisMealTypesGenRecipes:response.data,
    //     data: true,
    //   });
    // })
    this.setState({
      thisMeal: this.props.thisMeal,
      data: true,
    });
  }
  render() {
    if (!this.state.data) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <div
        className="accordion accordionNotFlush"
        id={"mealOuterAccordionFull" + this.state.thisMeal._id}
      >
        <div className="accordion-item accordionItemNotFlush">
          <h2
            className="accordion-header"
            id={"mealOuterAccordionHeader" + this.state.thisMeal._id}
          >
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#mealOuterAccrdn" + this.state.thisMeal._id}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h5>
                {this.state.thisMeal.day.dayOfWeek +
                  " " +
                  this.state.thisMeal.mealType}
              </h5>
            </button>
          </h2>
        </div>
        <div
          id={"mealOuterAccrdn" + this.state.thisMeal._id}
          className="accordion-collapse collapse show"
          aria-labelledby={
            "#mealOuterAccordionHeader" + this.state.thisMeal._id
          }
          data-bs-parent={"#mealOuterAccordionFull" + this.state.thisMeal._id}
        >
          <div className="accordion-body wkDaysAccrdnBdy">
            <div className="card mt-3 mb-3">
              <div className="card-header">
                <form>
                  <select
                    ref="userInput"
                    required
                    className="form-control form-select"
                    value={this.state.thisMealsGenRecipe}
                  >
                    {this.state.thisMealTypesGenRecipes.map(function (
                      genRecipe
                    ) {
                      return (
                        <option key={genRecipe.id} value={genRecipe.id}>
                          {genRecipe.name}
                        </option>
                      );
                    })}
                  </select>
                </form>
              </div>
              <div className="card-body">
                <div
                  className="accordion accordion-flush"
                  id={"mealInnerAccordionFull" + this.state.thisMeal._id}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"mealInnerAccordionHeader" + this.state.thisMeal._id}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#mealInnerAccrdn" + this.state.thisMeal._id
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"mealInnerAccrdn" + this.state.thisMeal._id}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#mealInnerAccordionHeader" + this.state.thisMeal._id
                    }
                    data-bs-parent={
                      "#mealInnerAccordionFull" + this.state.thisMeal._id
                    }
                  >
                    <div className="accordion-body wkDaysAccrdnBdy">
                      <p>Some hidden content</p>
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

export default MealDetail;
