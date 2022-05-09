import React, { Component } from "react";
import EditOptions from "./EditOptions.component";
import MealIngredientChild from "./MealIngredientChild.component";
import GenRecipeIngredient from "./GenRecipeIngredient.component";
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
          {/* <GenRecipeIngredient
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
          /> */}
        </div>
        <div className="mlIngrdntCrdBttmSctn">
          <form className="ingrdntFrm">
            <div className="ingrdntFrmHdr">
              <h6 className="ingrdntHdr">Base Ingredient</h6>
              <EditOptions
                className="ingrdntFrmIcns"
                parentObj={"ingredient"}
                userType={this.state.userType}
                thisFormState={this.state.ingredientFormState}
                onSubmitFormChange={this.onSubmitFormChange}
                onClickCopy={this.onClickCopy}
                onClickEdit={this.onClickEdit}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
              />
              <div className="form-group mealIngrdntInputs ingrdntUOM">
                <label>UOM</label>
                <select
                  required
                  className="form-control form-select"
                  value={JSON.stringify(
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .unitOfMeasure
                  )}
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "unitOfMeasure",
                      this.props.mealIngrdntsArrayIndex,
                      "select",
                      e
                    )
                  }
                >
                  {this.props.allUnitOfMeasures.map(function (unitOfMeasure) {
                    return (
                      <option
                        key={unitOfMeasure._id}
                        value={JSON.stringify(unitOfMeasure)}
                      >
                        {unitOfMeasure.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mealIngrdntInputs ingrdntWghtType">
                <label>Weight Type</label>
                <select
                  required
                  className="form-control form-select"
                  value={JSON.stringify(this.state.thisIngrdntsWeightType)}
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "weightType",
                      this.props.mealIngrdntsArrayIndex,
                      "select",
                      e
                    )
                  }
                >
                  {this.props.allWeightTypes.map(function (weightType) {
                    return (
                      <option
                        key={weightType._id}
                        value={JSON.stringify(weightType)}
                      >
                        {weightType.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className="ingrdntPicDiv"
                // style={{
                //   backgroundImage: `url(${this.state.thisMealIngredient.genRecipeIngredient.ingredient.photoURL})`,
                // }}
                style={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .photoURL == undefined
                    ? {
                        backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                      }
                    : {
                        backgroundImage: `url(${this.state.thisMealIngredient.genRecipeIngredient.ingredient.photoURL})`,
                      }
                }
              ></div>

              <div className="form-group mealIngrdntInputs ingrdntBrnd">
                <label>Brand</label>
                <select
                  required
                  className="form-control form-select"
                  value={JSON.stringify(this.state.thisIngrdntsBrand)}
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "brand",
                      this.props.mealIngrdntsArrayIndex,
                      "select",
                      e
                    )
                  }
                >
                  {this.props.allBrands.map(function (brand) {
                    return (
                      <option key={brand._id} value={JSON.stringify(brand)}>
                        {brand.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mealIngrdntInputs ingrdntName badge bg-primary">
                <label>Ingredient Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.props.thisMealIngredient.genRecipeIngredient.ingredient
                      .name
                  }
                  //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "name",
                      this.props.mealIngrdntsArrayIndex,
                      "text",
                      e
                    )
                  }
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                />
              </div>
            </div>
            <div
              className="accordion accordion-flush"
              id={"ingrdntAccrdnFull" + this.props.thisMealIngredient._id}
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={"ingrdntAccrdnHdr" + this.props.thisMealIngredient._id}
                >
                  <button
                    className="accordion-button mealInnerAccrdnBttn collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#ingrdntAccrdnBdy" + this.props.thisMealIngredient._id
                    }
                  ></button>
                </h2>
              </div>
              <div
                id={"ingrdntAccrdnBdy" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#ingrdntAccrdnHdr" + this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#ingrdntAccrdnFull" + this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body ingrdntInnrAccrdn">
                  <div className="form-group mealIngrdntInputs">
                    <label>Calories</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={JSON.stringify(
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.calories
                      )}
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "calories",
                          this.props.mealIngrdntsArrayIndex,
                          "number",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Carbs</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.carbs
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "carbs",
                          this.props.mealIngrdntsArrayIndex,
                          "number",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Protein</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient
                          .ingredient.protein
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "protein",
                          this.props.mealIngrdntsArrayIndex,
                          "number",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fat</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient
                          .ingredient.fat
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "fat",
                          this.props.mealIngrdntsArrayIndex,
                          "number",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fiber</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient
                          .ingredient.fiber
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "fiber",
                          this.props.mealIngrdntsArrayIndex,
                          "number",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Photo URL</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient
                          .ingredient.photoURL
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "photoURL",
                          this.props.mealIngrdntsArrayIndex,
                          "text",
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div
                  className="accordion accordion-flush ingrdntAdminMenu"
                  id={
                    "ingrdntAdminMenuAccrdnFull" +
                    this.props.thisMealIngredient._id
                  }
                >
                  <div className="accordion-item genRecipeAdminMenuBttn">
                    <h2
                      className="accordion-header"
                      id={
                        "ingrdntAdminMenuAccrdnHdr" +
                        this.props.thisMealIngredient._id
                      }
                    >
                      <button
                        className="accordion-button collapsed mealAdminAccrdnBttn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#ingrdntAdminMenuAccrdnBdy" +
                          this.props.thisMealIngredient._id
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        disabled={this.state.userType == "admin" ? false : true}
                      >
                        {this.props.userType === "admin" ? (
                          <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                        ) : (
                          <FontAwesomeIcon icon="fa-solid fa-lock" />
                        )}
                      </button>
                    </h2>
                  </div>
                  <div
                    id={
                      "ingrdntAdminMenuAccrdnBdy" +
                      this.props.thisMealIngredient._id
                    }
                    className="accordion-collapse collapse"
                    aria-labelledby={
                      "#ingrdntAdminMenuAccrdnHdr" +
                      this.props.thisMealIngredient._id
                    }
                    data-bs-parent={
                      "#ingrdntAdminMenuAccrdnFull" +
                      this.props.thisMealIngredient._id
                    }
                  >
                    <div className="accordion-body ingrdntInnerAccrdn">
                      <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                        <label>Author</label>
                        <select
                          ref="userInput"
                          required
                          className="form-control form-select"
                          value={JSON.stringify(
                            this.props.thisMealIngredient.genRecipeIngredient
                              .ingredient.GRFUser
                          )}
                          disabled={
                            this.state.ingredientFormState == "viewing"
                              ? true
                              : false
                          }
                          //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                          onChange={(e) =>
                            this.props.updateProp(
                              "ingredient",
                              this.props.thisMealIngredient.meal.mealType.code,
                              "GRFUser",
                              this.props.mealIngrdntsArrayIndex,
                              "select",
                              e
                            )
                          }
                        >
                          {this.props.allGRFUsers.map(function (GRFUser) {
                            return (
                              <option
                                key={GRFUser._id}
                                value={JSON.stringify(GRFUser)}
                              >
                                {GRFUser.handle}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                        <label>Record ID</label>
                        <input
                          type={"text"}
                          className="form-control"
                          value={
                            this.state.thisMealIngredient.genRecipeIngredient
                              .ingredient._id
                          }
                          disabled={true}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MealIngredientDetail;
