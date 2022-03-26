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
      thisMealsId: "",
      thisRecipesId: "",
      thisMealsDay: {},
      thisMealType: {},
      thisFormState: "viewing",
      userType: "admin",
      thisMealsMealIngrdnts: [],
      thisMealsGenRecipe: { name: "Cereal", id: 1 },
      thisMealTypesGenRecipes: [
        { name: "Scrambled Eggs", id: 2 },
        { name: "French Toast", id: 3 },
        { name: "Cereal", id: 1 },
      ],
      thisRecipesInst: "",
      thisMealRecipePic: "",
      thisRecipesName: "",
      thisRecipesMealType: "",
      thisRecipesAuthor: {},
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
          thisMealsId: this.props.thisMeal._id,
          thisGenRecipesId: this.props.thisMeal.genRecipe._id,
          thisMealTypesGenRecipes: response.data.map(
            (mealTypeRecipe) => mealTypeRecipe
          ),
          thisMealsDay: this.props.thisMeal.day,
          thisMealType: this.props.thisMeal.mealType,
          thisMealsGenRecipe: this.props.thisMeal.genRecipe,
          thisRecipesInst:
            this.props.thisMeal.genRecipe.defaultPrepInstructions,
          thisMealRecipePic: this.props.thisMeal.genRecipe.photoURL,
          thisRecipesName: this.props.thisMeal.genRecipe.name,
          thisRecipesMealType: this.props.thisMeal.genRecipe.availableMealType,
          thisRecipesAuthor: this.props.thisMeal.genRecipe.GRFUser,
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
  handleChangeMealRecipe = (e) => {
    this.setState({
      thisMealsGenRecipe: e.target.value,
    });
  };
  handleChangeMealDay = (e) => {
    this.setState({
      thisMealsDay: e.target.value,
    });
  };
  handleChangeMealsType = (e) => {
    this.setState({
      thisMealType: e.target.value,
    });
  };
  handleChangeRecipeInst = (e) => {
    this.setState({
      thisRecipesInst: e.target.value,
    });
  };
  handleChangeRecipePic = (e) => {
    this.setState({
      thisMealRecipePic: e.target.value,
    });
  };
  handleChangeThisRecipesName = (e) => {
    this.setState({
      thisRecipesName: e.target.value,
    });
  };
  handleChangeThisRecipesMealType = (e) => {
    this.setState({
      thisRecipesMealType: e.target.value,
    });
  };
  handleChangeThisRecipesAuthor = (e) => {
    this.setState({
      thisRecipesAuthor: e.target.value,
    });
  };
  handleSubmitMealFormChange = () => {
    const meal = {
      id: this.state.thisMealsId,
      day: this.state.thisMealsDay,
      genRecipe: this.state.thisMealsGenRecipe,
      mealType: this.state.thisMealType,
    };
    axios
      .post("http://localhost:5000/meals/update/" + meal.id, meal)
      .then(console.log("Meal Updated"));
  };
  handleSubmitRecipeFormChange = () => {
    const genRecipe = {
      id: this.state.thisGenRecipesId,
      name: this.state.thisRecipesName,
      availableMealType: this.state.thisRecipesMealType,
      GRFUser: this.state.thisRecipesAuthor,
      defaultPrepInstructions: this.state.thisRecipesInst,
      photoURL: this.state.thisMealRecipePic,
    };
    axios
      .post("http://localhost:5000/genRecipes/update" + genRecipe.id, genRecipe)
      .then(console.log("Recipe Updated"));
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
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
          id={"mealOuterAccordionFull" + this.state.thisMealsId}
        >
          <div className="accordion-item accordionItemNotFlush">
            <h2
              className="accordion-header"
              id={"mealOuterAccordionHeader" + this.state.thisMealsId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#mealOuterAccrdn" + this.state.thisMealsId}
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
            id={"mealOuterAccrdn" + this.state.thisMealsId}
            className="accordion-collapse collapse show"
            aria-labelledby={
              "#mealOuterAccordionHeader" + this.state.thisMealsId
            }
            data-bs-parent={"#mealOuterAccordionFull" + this.state.thisMealsId}
          >
            <div className="accordion-body wkDaysAccrdnBdy">
              <form className="card mt-3 mb-3">
                <div className="card-header mealCardHeader">
                  <div className="mealGenRecipeSctnHdr">
                    <h5 className="formSctnTitle">Meal</h5>
                    <EditOptions
                      parentObj={"meal"}
                      userType={this.state.userType}
                      thisFormState={this.state.thisFormState}
                      onSubmitFormChange={this.handleSubmitMealFormChange}
                      onClickEdit={this.handleClickEdit}
                      onCancel={this.handleCancel}
                    />
                  </div>
                  <hr />
                  <div className="mealHeader">
                    {/* <div className="dropdown mealEditDDown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id={"mealEditDDownBttn" + this.state.thisMealsId}
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
                            "mealEditDDownBttn" + this.state.thisMealsId
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
                      onChange={this.handleChangeMealRecipe}
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
                    id={"mealAdminAccordionFull" + this.state.thisMealsId}
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id={"mealAdminAccordionHeader" + this.state.thisMealsId}
                      >
                        <button
                          className="accordion-button collapsed mealAdminAccrdnBttn"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={
                            "#mealAdminAccrdn" + this.state.thisMealsId
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
                      id={"mealAdminAccrdn" + this.state.thisMealsId}
                      className="accordion-collapse collapse"
                      aria-labelledby={
                        "#mealAdminAccordionHeader" + this.state.thisMealsId
                      }
                      data-bs-parent={
                        "#mealAdminAccordionFull" + this.state.thisMealsId
                      }
                    >
                      <div className="accordion-body mealInnerAccordion">
                        <div className="form-group">
                          <label>Day</label>
                          <select
                            ref="userInput"
                            required
                            className="form-control form-select"
                            value={this.state.thisMealsDay}
                            disabled={
                              this.state.thisFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={this.handleChangeMealDay}
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
                            value={this.state.thisMealType}
                            disabled={
                              this.state.thisFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={this.handleChangeMealsType}
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
                </div>
              </form>
              <form className="card mt-3 mb-3">
                <div className="card-header mealCardHeader">
                  <div className="mealGenRecipeSctnHdr">
                    <h5 className="formSctnTitle">Recipe</h5>
                    <EditOptions
                      parentObj={"genRecipe"}
                      userType={this.state.userType}
                      thisFormState={this.state.thisFormState}
                      onSubmitFormChange={this.handleSubmitRecipeFormChange}
                      onClickEdit={this.handleClickEdit}
                      onCancel={this.handleCancel}
                    />
                  </div>
                </div>
                <div className="card-body mealCardBody">
                  <div className="mealGenRecipeFormSctn">
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
                        onChange={this.handleChangeRecipeInst}
                        value={this.state.thisRecipesInst}
                      ></textarea>
                    </div>
                    <div
                      className="accordion accordion-flush"
                      id={"mealInnerAccordionFull" + this.state.thisMealsId}
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={
                            "mealInnerAccordionHeader" + this.state.thisMealsId
                          }
                        >
                          <button
                            className="accordion-button collapsed mealInnerAccrdnBttn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#mealInnerAccrdn" + this.state.thisMealsId
                            }
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          ></button>
                        </h2>
                      </div>
                      <div
                        id={"mealInnerAccrdn" + this.state.thisMealsId}
                        className="accordion-collapse collapse"
                        aria-labelledby={
                          "#mealInnerAccordionHeader" + this.state.thisMealsId
                        }
                        data-bs-parent={
                          "#mealInnerAccordionFull" + this.state.thisMealsId
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
                              onChange={this.handleChangeThisRecipesName}
                              value={this.state.thisRecipesName}
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
                              onChange={this.handleChangeRecipePic}
                              value={this.state.thisMealRecipePic}
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
                            this.state.thisMealsId
                          }
                        >
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={
                                "genRecipeAdminAccordionHeader" +
                                this.state.thisMealsId
                              }
                            >
                              <button
                                className="accordion-button collapsed mealAdminAccrdnBttn"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={
                                  "#genRecipeAdminAccrdn" +
                                  this.state.thisMealsId
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
                            id={"genRecipeAdminAccrdn" + this.state.thisMealsId}
                            className="accordion-collapse collapse"
                            aria-labelledby={
                              "#genRecipeAdminAccordionHeader" +
                              this.state.thisMealsId
                            }
                            data-bs-parent={
                              "#genRecipeAdminAccordionFull" +
                              this.state.thisMealsId
                            }
                          >
                            <div className="accordion-body mealInnerAccordion">
                              <div className="form-group">
                                <label>Meal Type</label>
                                <select
                                  ref="userInput"
                                  required
                                  className="form-control form-select"
                                  value={this.state.thisRecipesMealType}
                                  disabled={
                                    this.state.thisFormState == "viewing"
                                      ? true
                                      : false
                                  }
                                  onChange={
                                    this.handleChangeThisRecipesMealType
                                  }
                                >
                                  {this.state.allMealTypes.map(function (
                                    mealType
                                  ) {
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
                                <label>Author</label>
                                <select
                                  ref="userInput"
                                  required
                                  className="form-control form-select"
                                  value={this.state.thisRecipesAuthor}
                                  disabled={
                                    this.state.thisFormState == "viewing"
                                      ? true
                                      : false
                                  }
                                  onChange={this.handleChangeThisRecipesAuthor}
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
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
  }
}

export default MealDetail;
