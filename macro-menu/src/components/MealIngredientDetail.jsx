import React, { Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MealIngredientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealIngredient: this.props.thisMealIngredient,
      userType: "admin",
      thisFormState: "viewing",
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
  lockUnlockAdminMenus = () => {
    if (this.state.userType == "admin") {
      return <FontAwesomeIcon icon="fa-solid fa-lock-open" />;
    } else {
      return <FontAwesomeIcon icon="fa-solid fa-lock" />;
    }
  };
  onChange = () => {
    console.log("changing value");
  };
  render() {
    return (
      <div className="card mlIngrdntsCard">
        <div className="card-header mlIgrdntCrdTpSctn">
          <form className="mlIngrdntFrm">
            <div className="mlIngrdntFrmHdr">
              <label className="mlIngrdntHdr doubleHeightLabel">
                <h6>Qty</h6>
              </label>
              <EditOptions
                className="mlIngrdntFrmIcns"
                parentObj={"mealIngredient"}
                userType={this.state.userType}
                thisFormState={this.state.thisFormState}
              />
              <input
                type={"number"}
                className="form-control mlIngrdntQty"
                value={this.state.thisMealIngredient.qty}
                placeholder={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
                onChange={this.handleChangeIngrdntProp}
              />
            </div>
            <div
              className="accordion accordion-flush flushElement"
              id={"mlIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id}
            >
              <div className="accordion-item genRecipeAdminMenuBttn flushElement">
                <h2
                  className="accordion-header"
                  id={
                    "mlIngrdntFrmAccrdnHdr" + this.props.thisMealIngredient._id
                  }
                >
                  <button
                    className="accordion-button collapsed mealAdminAccrdnBttn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#mlIngrdntFrmAccrdn" + this.props.thisMealIngredient._id
                    }
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    disabled={this.state.userType == "admin" ? false : true}
                  >
                    {this.lockUnlockAdminMenus()}
                  </button>
                </h2>
              </div>
              <div
                id={"mlIngrdntFrmAccrdn" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#mlIngrdntFrmAccrdnHdr" + this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#mlIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body">
                  <div className="form-group mealIngrdntInputs">
                    <label className="doubleHeightLabel">
                      Default Recipe Ingredient
                    </label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.name
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Meal</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.meal.day.weekMealPlan
                          .name +
                        " - " +
                        this.state.thisMealIngredient.meal.day.dayOfWeek +
                        " - " +
                        this.state.thisMealIngredient.meal.mealType
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Record ID</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={this.state.thisMealIngredient._id}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="gnRcpIngrdntFrm">
            <div className="gnRcpIngrdntFrmHdr">
              <label className="gnRcpIngrdntHdr doubleHeightLabel">
                <h6>Default Qty</h6>
              </label>
              <EditOptions
                className="gnRcpIngrdntFrmIcns"
                parentObj={"genRecipeIngredient"}
                userType={this.state.userType}
                thisFormState={this.state.thisFormState}
              />
              <input
                type={"number"}
                className="form-control gnRcpIngrdntQty"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
                onChange={this.onChange}
              />
            </div>
            <div
              className="accordion accordion-flush flushElement"
              id={
                "gnRcpIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id
              }
            >
              <div className="accordion-item genRecipeAdminMenuBttn flushElement">
                <h2
                  className="accordion-header"
                  id={
                    "gnRcpIngrdntFrmAccrdnHdr" +
                    this.props.thisMealIngredient._id
                  }
                >
                  <button
                    className="accordion-button collapsed mealAdminAccrdnBttn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#gnRcpIngrdntFrmAccrdn" +
                      this.props.thisMealIngredient._id
                    }
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    disabled={this.state.userType == "admin" ? false : true}
                  >
                    {this.lockUnlockAdminMenus()}
                  </button>
                </h2>
              </div>
              <div
                id={"gnRcpIngrdntFrmAccrdn" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#gnRcpIngrdntFrmAccrdnHdr" +
                  this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#gnRcpIngrdntFrmAccrdnFll" +
                  this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body">
                  <div className="form-group mealIngrdntInputs">
                    <label className="doubleHeightLabel">Ingredient</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.name
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Default Recipe</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .genRecipe.name
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Record ID</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient._id
                      }
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mlIngrdntCrdBttmSctn">
          <form className="ingrdntFrm">
            <div className="ingrdntFrmHdr">
              <h6 className="ingrdntHdr">Base Ingredient</h6>
              <EditOptions
                className="ingrdntFrmIcns"
                parentObj={"ingredient"}
                userType={this.state.userType}
                thisFormState={this.state.thisFormState}
              />
              <div className="form-group mealIngrdntInputs ingrdntUOM">
                <label>UOM</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .unitOfMeasure.name
                  }
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group mealIngrdntInputs ingrdntWghtType">
                <label>Weight Type</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .weightType.name
                  }
                  onChange={this.onChange}
                />
              </div>
              <div
                className="ingrdntPicDiv"
                style={{
                  backgroundImage: `url(${this.state.thisMealIngredient.genRecipeIngredient.ingredient.photoURL})`,
                }}
              ></div>

              <div className="form-group mealIngrdntInputs ingrdntBrnd">
                <label>Brand</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .brand.name
                  }
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group mealIngrdntInputs ingrdntName badge bg-primary">
                <label>Ingredient Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .name
                  }
                  onChange={this.onChange}
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
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.calories
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Carbs</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.carbs
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Protein</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.protein
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fat</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.fat
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fiber</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.fiber
                      }
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Photo URL</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.photoURL
                      }
                      onChange={this.onChange}
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
                        {this.lockUnlockAdminMenus()}
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
                        <input
                          type={"text"}
                          className="form-control"
                          value={
                            this.state.thisMealIngredient.genRecipeIngredient
                              .ingredient.GRFUser.handle
                          }
                          onChange={this.onChange}
                        />
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
