import React, { Component } from "react";
import EditOptions from "./EditOptions.component";
import MealIngredientChild from "./MealIngredientChild.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
import Ingredient from "./Ingredient.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MealIngredientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealIngredient: this.props.thisMealIngredient,
    };
  }
  componentDidMount() {
    console.log(this.props.thisMealIngredient.genRecipeIngredient);
  }
  onChange = () => {
    console.log("changing value");
  };
  render() {
    return (
      <div className="card mlIngrdntsCard">
        <div className="card-header mlIgrdntCrdTpSctn">
          <MealIngredientChild
            key={this.props.thisMealIngredient._id}
            thisMealIngredient={this.props.thisMealIngredient}
            thisRecipesIngrdnts={this.props.thisRecipesIngrdnts}
            allMeals={this.props.allMeals}
            mealIngrdntsArrayIndex={this.props.mealIngrdntsArrayIndex}
            userType={this.props.mealIngrdntUserType}
            thisFormState={this.props.mealIngrdntFormState}
            onSubmitFormChange={this.props.saveMealIngrdntChange}
            onClickEdit={this.props.onClickEdit}
            onDelete={this.props.onDelete}
            onCancel={this.props.onCancel}
            updateProp={this.props.updateProp}
          />
          <GenRecipeIngredient
            key={this.props.thisMealIngredient.genRecipeIngredient._id}
            thisGenRecipeIngrdnt={
              this.props.thisMealIngredient.genRecipeIngredient
            }
            thisMealsTypesRecipes={this.props.thisMealsTypesRecipes}
            allIngredients={this.props.allIngredients}
            mealIngrdntsArrayIndex={this.props.mealIngrdntsArrayIndex}
            userType={this.props.genRecipeIngrdntUserType}
            thisFormState={this.props.genRecipeIngrdntFormState}
            onSubmitFormChange={this.props.saveMealIngrdntChange}
            onClickEdit={this.props.onClickEdit}
            onDelete={this.props.onDelete}
            onCancel={this.props.onCancel}
            updateProp={this.props.updateProp}
          />
        </div>
        <div className="mlIngrdntCrdBttmSctn">
          <Ingredient
            key={
              this.props.thisMealIngredient.genRecipeIngredient.ingredient._id
            }
            thisIngrdnt={
              this.props.thisMealIngredient.genRecipeIngredient.ingredient
            }
            thisMealType={
              this.props.thisMealIngredient.genRecipeIngredient.genRecipe
                .availableMealType.code
            }
            allUnitOfMeasures={this.props.allUnitOfMeasures}
            allWeightTypes={this.props.allWeightTypes}
            allBrands={this.props.allBrands}
            allGRFUsers={this.props.allGRFUsers}
            mealIngrdntsArrayIndex={this.props.mealIngrdntsArrayIndex}
            userType={this.props.ingrdntUserType}
            thisFormState={this.props.ingrdntFormState}
            onSubmitFormChange={this.props.saveMealIngrdntChange}
            onClickEdit={this.props.onClickEdit}
            onDelete={this.props.onDelete}
            onCancel={this.props.onCancel}
            updateProp={this.props.updateProp}
          />
        </div>
      </div>
    );
  }
}

export default MealIngredientDetail;
