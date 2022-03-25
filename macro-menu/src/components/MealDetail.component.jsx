import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealTypesGenRecipesLoaded: false,
      allGRFUsersLoaded: false,
      allDaysLoaded: false,
      thisMeal: {},
      thisMealsDay: {},
      thisMealType: {},
      thisFormState: "editingOrig",
      userType: "admin",
      thisMealsMealIngrdnts: [],
      thisMealsGenRecipe: { name: "Cereal", id: 1 },
      thisMealTypesGenRecipes: [
        { name: "Scrambled Eggs", id: 2 },
        { name: "French Toast", id: 3 },
        { name: "Cereal", id: 1 },
      ],
      thisMealRecipePic: "",
      allMealTypes: [
        "Breakfast",
        "Snack 1",
        "Lunch",
        "Snack 2",
        "Dinner",
        "Dessert",
      ],
      allGRFUsers: [],
      allDays: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
          this.props.thisMeal.mealType
      )
      .then((response) => {
        this.setState({
          thisMeal: this.props.thisMeal,
          thisMealTypesGenRecipes: response.data.map(
            (mealTypeRecipe) => mealTypeRecipe
          ),
          thisMealRecipePic: this.props.thisMeal.genRecipe.photoURL,
          thisMealTypesGenRecipesLoaded: true,
        });
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      this.setState({
        allGRFUsers: response.data.map((GRFUser) => GRFUser),
        allGRFUsersLoaded: true,
      });
    });
    axios.get("http://localhost:5000/days/").then((response) => {
      this.setState({
        allDays: response.data.map((day) => day),
        allDaysLoaded: true,
      });
    });
  }
  lockUnlockAdminMenus = () => {
    if (this.state.userType == "admin") {
      return <FontAwesomeIcon icon="fa-solid fa-lock-open" />;
    } else {
      return <FontAwesomeIcon icon="fa-solid fa-lock" />;
    }
  };
  render() {
    if (
      this.state.thisMealTypesGenRecipesLoaded == true &&
      this.state.allGRFUsersLoaded == true &&
      this.state.allDaysLoaded == true
    ) {
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
          <form>
            <div
              id={"mealOuterAccrdn" + this.state.thisMeal._id}
              className="accordion-collapse collapse show"
              aria-labelledby={
                "#mealOuterAccordionHeader" + this.state.thisMeal._id
              }
              data-bs-parent={
                "#mealOuterAccordionFull" + this.state.thisMeal._id
              }
            >
              <div className="accordion-body wkDaysAccrdnBdy">
                <div className="card mt-3 mb-3">
                  <div className="card-header mealCardHeader">
                    <div className="mealGenRecipeSctnHdr">
                      <h5 className="formSctnTitle">Meal</h5>
                      <EditOptions
                        parentObj={"meal"}
                        userType={this.state.userType}
                        thisFormState={this.state.thisFormState}
                      />
                    </div>
                    <hr />
                    <div className="mealHeader">
                      {/* <div className="dropdown mealEditDDown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id={"mealEditDDownBttn" + this.state.thisMeal._id}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-pen-to-square"
                            size="xl"
                            className="p-1"
                          />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={
                            "mealEditDDownBttn" + this.state.thisMeal._id
                          }
                        >
                          <li>
                        <a className="dropdown-item" href="#">
                          <FontAwesomeIcon
                            icon="fa-solid fa-copy"
                            size="xl"
                            className="p-1"
                          />
                          <span className="mealEditDDownItemTxt">
                            Edit Meal Copy
                          </span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <FontAwesomeIcon
                            icon="fa-solid fa-pen-to-square"
                            size="xl"
                            className="p-1"
                          />
                          <span className="mealEditDDownItemTxt">
                            Edit Meal (Prep Inst., Etc.)
                          </span>
                        </a>
                      </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FontAwesomeIcon
                                icon="fa-solid fa-right-left"
                                size="xl"
                                className="p-1"
                              />
                              <span className="mealEditDDownItemTxt">
                                Change Recipe
                              </span>
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FontAwesomeIcon
                                icon="fa-solid fa-pen-to-square"
                                size="xl"
                                className="p-1"
                              />
                              <span className="mealEditDDownItemTxt">
                                Edit the Recipe
                              </span>
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FontAwesomeIcon
                                icon="fa-solid fa-copy"
                                size="xl"
                                className="p-1"
                              />
                              <span className="mealEditDDownItemTxt">
                                Edit New Copy of Recipe
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div> */}
                      <h5 className="recipeSelectHeader">Recipe:</h5>
                      <select
                        ref="userInput"
                        required
                        className="form-control form-select recipeSelect"
                        value={this.state.thisMealsGenRecipe}
                        disabled={
                          this.state.thisFormState == "viewing" ? true : false
                        }
                      >
                        {this.state.thisMealTypesGenRecipes.map(function (
                          genRecipe
                        ) {
                          return (
                            <option key={genRecipe._id} value={genRecipe._id}>
                              {genRecipe.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="card-body mealCardBody">
                    <div
                      className="accordion accordion-flush"
                      id={"mealAdminAccordionFull" + this.state.thisMeal._id}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={
                            "mealAdminAccordionHeader" + this.state.thisMeal._id
                          }
                        >
                          <button
                            className="accordion-button collapsed mealAdminAccrdnBttn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#mealAdminAccrdn" + this.state.thisMeal._id
                            }
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            disabled={
                              this.state.userType == "admin" ? false : true
                            }
                          >
                            {this.lockUnlockAdminMenus()}
                          </button>
                        </h2>
                      </div>
                      <div
                        id={"mealAdminAccrdn" + this.state.thisMeal._id}
                        className="accordion-collapse collapse"
                        aria-labelledby={
                          "#mealAdminAccordionHeader" + this.state.thisMeal._id
                        }
                        data-bs-parent={
                          "#mealAdminAccordionFull" + this.state.thisMeal._id
                        }
                      >
                        <div className="accordion-body mealInnerAccordion">
                          <div className="form-group">
                            <label>Day</label>
                            <select
                              ref="userInput"
                              required
                              className="form-control form-select"
                              value={this.state.thisMeal.day.name}
                              disabled={
                                this.state.thisFormState == "viewing"
                                  ? true
                                  : false
                              }
                            >
                              {this.state.allDays.map(function (day) {
                                return (
                                  <option key={day._id} value={day._id}>
                                    {day.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Meal Type</label>
                            <select
                              ref="userInput"
                              required
                              className="form-control form-select"
                              value={this.state.thisMeal.mealType}
                              disabled={
                                this.state.thisFormState == "viewing"
                                  ? true
                                  : false
                              }
                            >
                              {this.state.allMealTypes.map(function (mealType) {
                                return (
                                  <option
                                    key={"allMealTypesListItem" + mealType}
                                    value={mealType}
                                  >
                                    {mealType}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Record ID</label>
                            <input
                              className="form-control"
                              type="text"
                              value={this.state.thisMeal.day._id}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mealGenRecipeFormSctn">
                      <div className="mealGenRecipeSctnHdr">
                        <h5 className="formSctnTitle">Recipe</h5>
                        <EditOptions
                          parentObj={"meal"}
                          userType={this.state.userType}
                          thisFormState={this.state.thisFormState}
                        />
                      </div>
                      <div className="mealImgNTblRow">
                        <img
                          className="mealImg"
                          src={this.state.thisMeal.genRecipe.photoURL}
                        />
                        <h6 className="mealPrepInst">Prep Instructions:</h6>
                        <textarea
                          className="form-control mealTextArea"
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        >
                          {
                            this.state.thisMeal.genRecipe
                              .defaultPrepInstructions
                          }
                        </textarea>
                      </div>
                      <div
                        className="accordion accordion-flush"
                        id={"mealInnerAccordionFull" + this.state.thisMeal._id}
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id={
                              "mealInnerAccordionHeader" +
                              this.state.thisMeal._id
                            }
                          >
                            <button
                              className="accordion-button collapsed mealInnerAccrdnBttn"
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
                          className="accordion-collapse collapse"
                          aria-labelledby={
                            "#mealInnerAccordionHeader" +
                            this.state.thisMeal._id
                          }
                          data-bs-parent={
                            "#mealInnerAccordionFull" + this.state.thisMeal._id
                          }
                        >
                          <div className="accordion-body mealInnerAccordion">
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                className="form-control"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.name}
                              />
                            </div>
                            <div className="form-group">
                              <label>Img URL</label>
                              <input
                                className="form-control"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.photoURL}
                              />
                            </div>
                            <div className="form-group">
                              <label>Author</label>
                              <input
                                className="form-control"
                                type="text"
                                value={
                                  this.state.thisMeal.genRecipe.GRFUser.handle
                                }
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div
                            className="accordion accordion-flush"
                            id={
                              "genRecipeAdminAccordionFull" +
                              this.state.thisMeal._id
                            }
                          >
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id={
                                  "genRecipeAdminAccordionHeader" +
                                  this.state.thisMeal._id
                                }
                              >
                                <button
                                  className="accordion-button collapsed mealAdminAccrdnBttn"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={
                                    "#genRecipeAdminAccrdn" +
                                    this.state.thisMeal._id
                                  }
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                  disabled={
                                    this.state.userType == "admin"
                                      ? false
                                      : true
                                  }
                                >
                                  {this.lockUnlockAdminMenus()}
                                </button>
                              </h2>
                            </div>
                            <div
                              id={
                                "genRecipeAdminAccrdn" + this.state.thisMeal._id
                              }
                              className="accordion-collapse collapse"
                              aria-labelledby={
                                "#genRecipeAdminAccordionHeader" +
                                this.state.thisMeal._id
                              }
                              data-bs-parent={
                                "#genRecipeAdminAccordionFull" +
                                this.state.thisMeal._id
                              }
                            >
                              <div className="accordion-body mealInnerAccordion">
                                <div className="form-group">
                                  <label>Meal Type</label>
                                  <select
                                    ref="userInput"
                                    required
                                    className="form-control form-select"
                                    value={
                                      this.state.thisMeal.genRecipe
                                        .availableMealType
                                    }
                                    disabled={
                                      this.state.thisFormState == "viewing"
                                        ? true
                                        : false
                                    }
                                  >
                                    {this.state.allMealTypes.map(function (
                                      mealType
                                    ) {
                                      return (
                                        <option
                                          key={
                                            "allMealTypesListItem" + mealType
                                          }
                                          value={mealType}
                                        >
                                          {mealType}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Author</label>
                                  <select
                                    ref="userInput"
                                    required
                                    className="form-control form-select"
                                    value={
                                      this.state.thisMeal.genRecipe.GRFUser
                                        .handle
                                    }
                                    disabled={
                                      this.state.thisFormState == "viewing"
                                        ? true
                                        : false
                                    }
                                  >
                                    {this.state.allGRFUsers.map(function (
                                      GRFUser
                                    ) {
                                      return (
                                        <option
                                          key={
                                            "allGRFUsersListItem" + GRFUser._id
                                          }
                                          value={GRFUser._id}
                                        >
                                          {GRFUser.handle}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Record ID</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.thisMeal.genRecipe._id}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default MealDetail;
