import React, { Component } from "react";
class MealIngredientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealIngredient: this.props.thisMealIngredient,
    };
  }
  handleChangeQty = (e) => {
    let thisMealIngredient = this.state.thisMealIngredient;
    thisMealIngredient.qty = e.target.value;
    this.setState({
      thisMealIngredient: thisMealIngredient,
    });
    this.props.handleUpdateMealIngrdntQty(this.state.thisMealIngredient);
    // this.props.totalCurrentMacrosMethod(
    //   [this.state.thisMealIngredient],
    //   this.state.thisMealIngredient.meal.mealType
    // );
  };
  render() {
    return (
      <div>
        <h6>This is a Meal Ingredient Component</h6>
        <form>
          <p>Meal Ingredient Form</p>
          <div className="visible">
            <p>Visible Items</p>
            <div className="form-group">
              <label>Qty: </label>
              <input
                type={"number"}
                className="form-control"
                value={this.state.thisMealIngredient.qty}
                placeholder={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
                onChange={this.handleChangeQty}
              />
            </div>
          </div>
          <div className="hidden">
            <p>Hidden Items</p>
            <div className="form-group">
              <label>Default Recipe Ingredient: </label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .name
                }
              />
            </div>
            <div className="form-group">
              <label>Meal: </label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.meal.day.weekMealPlan.name +
                  " - " +
                  this.state.thisMealIngredient.meal.day.dayOfWeek +
                  " - " +
                  this.state.thisMealIngredient.meal.mealType
                }
              />
            </div>
          </div>
        </form>
        <form>
          <p>Default Recipe Ingredient Form</p>
          <div className="hidden">
            <p>Hidden Items</p>
            <div className="form-group">
              <label>Default Qty: </label>
              <input
                type={"number"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
              />
            </div>
            <div className="form-group">
              <label>Ingredient: </label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .name
                }
              />
            </div>
            <div className="form-group">
              <label>Default Recipe: </label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.genRecipe
                    .name
                }
              />
            </div>
          </div>
        </form>
        <form>
          <p>Ingredient Form</p>
          <div className="hidden">
            <p>Hidden Items</p>
            <div className="form-group">
              <label>Name:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .name
                }
              />
            </div>
            <div className="form-group">
              <label>UOM:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .unitOfMeasure.name
                }
              />
            </div>
            <div className="form-group">
              <label>Weight Type:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .weightType.name
                }
              />
            </div>
            <div className="form-group">
              <label>Brand: </label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .brand.name
                }
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .GRFUser.handle
                }
              />
            </div>
            <div className="form-group">
              <label>Calories:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .calories
                }
              />
            </div>
            <div className="form-group">
              <label>Carbs:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .carbs
                }
              />
            </div>
            <div className="form-group">
              <label>Protein:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .protein
                }
              />
            </div>
            <div className="form-group">
              <label>Fat:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .fat
                }
              />
            </div>
            <div className="form-group">
              <label>Fiber:</label>
              <input
                type={"text"}
                className="form-control"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .fiber
                }
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MealIngredientDetail;
