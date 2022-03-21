import React, { Component } from "react";
class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMeal: this.props.thisMeal,
      thisFormState: "viewing",
      userIsAuthor: true,
      thisMealsMealIngrdnts: [],
    };
  }
  render() {
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
              <h5>{this.state.thisMeal.mealType}</h5>
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
                <h6 className="card-title">
                  {this.state.thisMeal.day.dayOfWeek +
                    " " +
                    this.state.thisMeal.mealType}
                </h6>
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
