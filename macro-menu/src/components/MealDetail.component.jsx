import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealIngredientDetail from "./MealIngredientDetail";
import MacrosTable from "./MacrosTable.component";

class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealTypesGenRecipesLoaded: false,
      allGRFUsersLoaded: false,
      allDaysLoaded: false,
      mealsMealIngrdntsLoaded: false,
      thisMeal: {},
      thisMealsId: "",
      thisRecipesId: "",
      thisMealsDay: {},
      thisMealType: {},
      mealFormState: "viewing",
      genRecipeFormState: "viewing",
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
      thisMealsMacrosBudget: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      thisMealsMacrosCurrent: this.props.thisMealsMacrosCurrent,
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

          thisMealTypesGenRecipes: response.data.map(
            (mealTypeRecipe) => mealTypeRecipe
          ),
          thisMealsDay: this.props.thisMeal.day,
          thisMealType: this.props.thisMeal.mealType,

          thisGenRecipesId: this.props.thisMeal.genRecipe._id,
          thisMealsGenRecipe: this.props.thisMeal.genRecipe,
          thisRecipesInst:
            this.props.thisMeal.genRecipe.defaultPrepInstructions,
          thisMealRecipePic: this.props.thisMeal.genRecipe.photoURL,
          thisRecipesName: this.props.thisMeal.genRecipe.name,
          thisRecipesMealType: this.props.thisMeal.genRecipe.availableMealType,
          thisRecipesAuthor: this.props.thisMeal.genRecipe.GRFUser,

          thisMealTypesGenRecipesLoaded: true,

          thisMealsMacrosBudget: this.props.thisMealsMacrosBudget,
          thisMealsMacrosCurrent: this.props.thisMealsMacrosCurrent,
          thisMealsMealIngrdnts: this.props.thisMealsMealIngrdnts,
          mealsMealIngrdntsLoaded: true,
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
    // axios
    //   .get(
    //     "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
    //       this.props.thisMeal._id
    //   )
    //   .then((response) => {
    //     this.setState({
    //       thisMealsMealIngrdnts: response.data.map(
    //         (mealIngredient) => mealIngredient
    //       ),
    //     });
    //     this.props.totalCurrentMacrosMethod(
    //       this.state.thisMealsMealIngrdnts,
    //       this.props.thisMeal.mealType
    //     );
    //     this.setState({
    //       mealsMealIngrdntsLoaded: true,
    //     });
    //   });
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
    console.log({ genRecipe });
    axios
      .post(
        "http://localhost:5000/genRecipes/update/" + genRecipe.id,
        genRecipe
      )
      .then(console.log("Recipe Updated"));
  };
  handleClickEdit = (parentObj) => {
    parentObj === "meal"
      ? this.setState({ mealFormState: "editingOrig" })
      : this.setState({ genRecipeFormState: "editingOrig" });
  };
  handleCancel = (parentObj) => {
    parentObj === "meal"
      ? this.setState({ mealFormState: "viewing" })
      : this.setState({ genRecipeFormState: "viewing" });
  };
  lockUnlockAdminMenus = () => {
    if (this.state.userType == "admin") {
      return <FontAwesomeIcon icon="fa-solid fa-lock-open" />;
    } else {
      return <FontAwesomeIcon icon="fa-solid fa-lock" />;
    }
  };
  findMealIngrdntIndex = (thisMealIngrdnt) => {
    let thisMealIngrdntIndex;
    let i = 0;
    let thisMealsIngrdnts = this.state.thisMealsMealIngrdnts;
    for (i; i < thisMealsIngrdnts.length; i++) {
      if (thisMealIngrdnt._id == thisMealsIngrdnts[i]._id) {
        thisMealIngrdntIndex = i;
      }
    }
    this.props.updateMealIngrdnt(
      thisMealIngrdnt,
      thisMealIngrdntIndex,
      this.state.thisMealType
    );
  };
  onChange = () => {
    console.log("Value changed");
  };
  render() {
    if (
      this.state.thisMealTypesGenRecipesLoaded == true &&
      this.state.allGRFUsersLoaded == true &&
      this.state.allDaysLoaded == true &&
      this.state.mealsMealIngrdntsLoaded == true
    ) {
      return (
        <div
          className="accordion accordionNotFlush mealDetailTopAccrdn"
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
            <div className="macroTblCntnr">
              <MacrosTable
                tableType="Meal Macros"
                macrosBudget={this.state.thisMealsMacrosBudget}
                macrosCurrent={this.state.thisMealsMacrosCurrent}
              />
            </div>
            <div className="accordion-body wkDaysAccrdnBdy">
              <form className="card mt-3 mb-3">
                <div className="card-header mealCardHeader">
                  <div className="mealGenRecipeSctnHdr">
                    <h5 className="formSctnTitle">Meal</h5>
                    <EditOptions
                      parentObj={"meal"}
                      userType={this.state.userType}
                      thisFormState={this.state.mealFormState}
                      onSubmitFormChange={this.handleSubmitMealFormChange}
                      onClickEdit={this.handleClickEdit}
                      onCancel={this.handleCancel}
                    />
                  </div>
                  <div className="mealHeader">
                    <h5 className="recipeSelectHeader">Recipe:</h5>
                    <select
                      ref="userInput"
                      required
                      className="form-control form-select recipeSelect"
                      value={this.state.thisMealsGenRecipe}
                      disabled={
                        this.state.mealFormState == "viewing" ? true : false
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
                        <div className="form-group mealImputs">
                          <label>Day</label>
                          <select
                            ref="userInput"
                            required
                            className="form-control form-select"
                            value={this.state.thisMealsDay}
                            disabled={
                              this.state.mealFormState == "viewing"
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
                        <div className="form-group mealImputs">
                          <label>Meal Type</label>
                          <select
                            ref="userInput"
                            required
                            className="form-control form-select"
                            value={this.state.thisMealType}
                            disabled={
                              this.state.mealFormState == "viewing"
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
                        <div className="form-group mealImputs">
                          <label>Record ID</label>
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.thisMeal.day._id}
                            disabled={true}
                            onChange={this.onChange}
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
                    <h5 className="formSctnTitle">Recipe Details</h5>
                    <EditOptions
                      parentObj={"genRecipe"}
                      userType={this.state.userType}
                      thisFormState={this.state.genRecipeFormState}
                      onSubmitFormChange={this.handleSubmitRecipeFormChange}
                      onClickEdit={this.handleClickEdit}
                      onCancel={this.handleCancel}
                    />
                  </div>
                </div>
                <div className="card-body mealCardBody">
                  <div className="mealImgNTblRow">
                    <div
                      className="mealImg"
                      // style={{
                      //   backgroundImage: `url(${this.state.thisMeal.genRecipe.photoURL})`,
                      // }}
                      style={
                        this.state.thisMeal.genRecipe.photoURL == undefined
                          ? {
                              backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                            }
                          : {
                              backgroundImage: `url(${this.state.thisMeal.genRecipe.photoURL})`,
                            }
                      }
                      // src={this.state.thisMeal.genRecipe.photoURL}
                    />
                    <h6 className="mealPrepInst">Prep Instructions:</h6>
                    <textarea
                      className="form-control mealTextArea"
                      disabled={
                        this.state.genRecipeFormState == "viewing"
                          ? true
                          : false
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
                        id={"mealInnerAccordionHeader" + this.state.thisMealsId}
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
                        <div className="form-group mealInputs">
                          <label>Name</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={
                              this.state.genRecipeFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={this.handleChangeThisRecipesName}
                            value={this.state.thisRecipesName}
                          />
                        </div>
                        <div className="form-group mealInputs">
                          <label>Img URL</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={
                              this.state.genRecipeFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={this.handleChangeRecipePic}
                            value={this.state.thisMealRecipePic}
                          />
                        </div>
                        <div className="form-group mealInputs">
                          <label>Author</label>
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.thisMeal.genRecipe.GRFUser.handle}
                            disabled={true}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div
                        className="accordion accordion-flush"
                        id={
                          "genRecipeAdminAccordionFull" + this.state.thisMealsId
                        }
                      >
                        <div className="accordion-item genRecipeAdminMenuBttn">
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
                                "#genRecipeAdminAccrdn" + this.state.thisMealsId
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
                            <div className="form-group mealInputs">
                              <label>Meal Type</label>
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select"
                                value={this.state.thisRecipesMealType}
                                disabled={
                                  this.state.genRecipeFormState == "viewing"
                                    ? true
                                    : false
                                }
                                onChange={this.handleChangeThisRecipesMealType}
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
                            <div className="form-group mealInputs">
                              <label>Author</label>
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select"
                                value={this.state.thisRecipesAuthor}
                                disabled={
                                  this.state.genRecipeFormState == "viewing"
                                    ? true
                                    : false
                                }
                                onChange={this.handleChangeThisRecipesAuthor}
                              >
                                {this.state.allGRFUsers.map(function (GRFUser) {
                                  return (
                                    <option
                                      key={"allGRFUsersListItem" + GRFUser._id}
                                      value={GRFUser._id}
                                    >
                                      {GRFUser.handle}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-group mealInputs">
                              <label>Record ID</label>
                              <input
                                className="form-control"
                                type="text"
                                value={this.state.thisMeal.genRecipe._id}
                                disabled={true}
                                onChange={this.onChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
              <div className="mlIngrdntsCntnr">
                {this.state.thisMealsMealIngrdnts.map((mealIngredient) => {
                  return (
                    <MealIngredientDetail
                      thisMealIngredient={mealIngredient}
                      key={mealIngredient._id}
                      totalCurrentMacrosMethod={
                        this.props.totalCurrentMacrosMethod
                      }
                      handleUpdateMealIngrdntQty={
                        this.handleUpdateMealIngrdntQty
                      }
                      findMealIngrdntIndex={this.findMealIngrdntIndex}
                    />
                  );
                })}
              </div>
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
