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
  handleChangeIngrdntProp = (e) => {
    let thisMealIngredient = this.state.thisMealIngredient;
    thisMealIngredient.qty = e.target.value;
    this.props.findMealIngrdntIndex(thisMealIngredient);
  };
  render() {
    return (
      <div className="mealIngrdntSctn">
        <form className="mealIngrdntForm card">
          <div className="card-header">
            <h6>Meal Ingredient Form</h6>
          </div>
          <div className="visible">
            <p>Visible Items</p>
            <div className="formSctn">
              <div className="form-group mealIngrdntInputs">
                <label>Qty: </label>
                <input
                  type={"number"}
                  className="form-control"
                  value={this.state.thisMealIngredient.qty}
                  placeholder={
                    this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                  }
                  onChange={this.handleChangeIngrdntProp}
                />
              </div>
            </div>
          </div>
          <div className="hidden mealIngrdntHidden">
            <p>Hidden Items</p>
            <div className="formSctn">
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
          </div>
        </form>
        <form className="mealIngrdntForm card">
          <div className="card-header">
            <h6>Default Recipe Ingredient Form</h6>
          </div>
          <div className="hidden recipeCard">
            <p>Hidden Items</p>
            <div className="formSctn">
              <div className="form-group mealIngrdntInputs">
                <label>Default Qty: </label>
                <input
                  type={"number"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                  }
                />
              </div>
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
          </div>
        </form>
        <form className="mealIngrdntForm card">
          <div className="card-header">
            <h6>Ingredient Form</h6>
          </div>
          <div className="hidden">
            <p>Hidden Items</p>
            <div className="formSctn ingrdntFormSctn">
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
              <div className="form-group mealIngrdntInputs">
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
          </div>
        </form>
      </div>
    );
  }
}

export default MealIngredientDetail;
