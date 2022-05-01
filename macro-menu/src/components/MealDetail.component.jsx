import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealIngredientDetail from "./MealIngredientDetail";
import MacrosTable from "./MacrosTable.component";
import MacrosTable2 from "./MacrosTable2.component";
import dayjs from "dayjs";

class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealJustCreated: false,
      userHasChangedRecipe: this.props.userHasChangedRecipe,
      thisMealTypesGenRecipesLoaded: false,
      allGRFUsersLoaded: false,
      allDaysLoaded: false,
      mealsMealIngrdntsLoaded: false,
      thisMeal: this.props.thisMeal,
      thisMealsId: "",
      thisRecipesId: "",
      thisMealsDay: this.props.thisDay,
      thisMealType: this.props.mealType,
      mealFormState: this.props.mealFormState,
      genRecipeFormState: "viewing",
      ingredientFormState: "viewing",
      userType: "admin",
      thisMealsMealIngrdntsCurrent: [],
      thisMealsMealIngrdntsOld: [],
      thisMealsGenRecipeCurrent: { name: "Cereal", id: 1 },
      thisMealsGenRecipeOld: {},
      thisMealTypesGenRecipes: [],
      thisRecipesInst: "",
      thisMealRecipePic: "",
      thisRecipesName: "",
      thisRecipesMealType: "",
      thisRecipesAuthor: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
      allMealTypes: [
        "Breakfast",
        "Snack 1",
        "Lunch",
        "Snack 2",
        "Dinner",
        "Dessert",
      ],
      thisMealsMacrosBudget: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      thisMealsMacrosCurrent: this.props.thisMealsMacrosCurrent,
      dataLoaded: false,
      deleteMealMsg:
        "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?",
    };
  }
  colorCodeMealHeaders = () => {
    let thisGenRecipeId = this.props.thisMeal.genRecipe._id;
    if (
      thisGenRecipeId === "62577f516682e3955e98b1d0" ||
      thisGenRecipeId === "62577a7d93011a9b47306e6f" ||
      thisGenRecipeId === "62577f666682e3955e98b1d1" ||
      thisGenRecipeId === "62577f786682e3955e98b1d2" ||
      thisGenRecipeId === "62577f8b6682e3955e98b1d3" ||
      thisGenRecipeId === "62577f9c6682e3955e98b1d4"
    ) {
      this.setState({
        // mealFormState: "editingOrig",
        mealJustCreated: true,
      });
    } else {
      this.setState({ mealJustCreated: false });
    }
  };
  componentDidMount() {
    this.setState({
      // allGRFUsers: this.props.allGRFUsers,
      // allDays: this.props.allDays,
      thisMeal: this.props.thisMeal,
      allDaysLoaded: true,
      allGRFUsersLoaded: true,
      thisMealsId: this.props.thisMeal._id,
      thisMealsDay: this.props.thisMeal.day,
      thisMealType: this.props.thisMeal.mealType,
      thisGenRecipesId: this.props.thisMeal.genRecipe._id,
      thisMealsGenRecipeCurrent: this.props.thisMeal.genRecipe,
      thisMealsGenRecipeOld: this.props.thisMeal.genRecipe,
      thisRecipesInst: this.props.thisMeal.genRecipe.defaultPrepInstructions,
      thisMealRecipePic: this.props.thisMeal.genRecipe.photoURL,
      thisRecipesName: this.props.thisMeal.genRecipe.name,
      thisRecipesMealType: this.props.thisMeal.genRecipe.availableMealType,
      thisRecipesAuthor: this.props.thisMeal.genRecipe.GRFUser,
      thisMealTypesGenRecipesLoaded: true,
      thisMealsMacrosBudget: this.props.thisMealsMacrosBudget,
      thisMealsMacrosCurrent: this.props.thisMealsMacrosCurrent,
      thisMealsMealIngrdntsCurrent: this.props.thisMealsMealIngrdnts,
      thisMealsMealIngrdntsOld: this.props.thisMealsMealIngrdnts,
      mealsMealIngrdntsLoaded: true,
      dataLoaded: true,
      userHasChangedRecipe: this.props.userHasChangedRecipe,
      mealFormState: this.props.mealFormState,
    });
    // axios
    //   .get(
    //     "http://localhost:5000/genRecipes/thisMealTypesGenRecipes/" +
    //       this.props.thisMeal.mealType
    //   )
    //   .then((response) => {
    //     this.setState({
    //       // thisMeal: this.props.thisMeal,
    //       thisMealTypesGenRecipes: response.data.map(
    //         (mealTypeRecipe) => mealTypeRecipe
    //       ),
    //     });
    //   });
    // axios.get("http://localhost:5000/GRFUsers/").then((response) => {
    //   this.setState({
    //     allGRFUsers: response.data.map((GRFUser) => GRFUser),
    //     allGRFUsersLoaded: true,
    //   });
    // });
    // axios.get("http://localhost:5000/days/").then((response) => {
    //   this.setState({
    //     allDays: response.data.map((day) => day),
    //     allDaysLoaded: true,
    //   });
    // });
    this.colorCodeMealHeaders();
    // axios
    //   .get(
    //     "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
    //       this.props.thisMeal._id
    //   )
    //   .then((response) => {
    //     this.setState({
    //       thisMealsMealIngrdntsCurrent: response.data.map(
    //         (mealIngredient) => mealIngredient
    //       ),
    //     });
    //     this.props.totalCurrentMacrosMethod(
    //       this.state.thisMealsMealIngrdntsCurrent,
    //       this.props.thisMeal.mealType
    //     );
    //     this.setState({
    //       mealsMealIngrdntsLoaded: true,
    //     });
    //   });
  }
  handleChangeMealRecipe = (e, mealAge) => {
    let newSelectedRecipe;
    if (mealAge) {
      newSelectedRecipe = this.props.thisMeal.genRecipe._id;
      // this.setState({
      //   mealFormState: "editingOrig",
      // });
    } else {
      newSelectedRecipe = e.target.value;
    }
    let thisMeal = this.state.thisMeal;
    thisMeal.genRecipe = newSelectedRecipe;
    this.setState({
      thisMeal: thisMeal,
      thisMealsGenRecipeCurrent: newSelectedRecipe,
      // userHasChangedRecipe: true,
    });
    axios
      .get(
        "http://localhost:5000/genRecipeIngredients/thisGenRecipesGenRecipeIngredients/" +
          newSelectedRecipe
      )
      .then((response) => {
        const thisGenRecipesGenRecipeIngrdnts = response.data.map(
          (genRecipeIngredient) => genRecipeIngredient
        );
        let thisMealsNewMealIngrdnts = [];
        for (let i = 0; i < thisGenRecipesGenRecipeIngrdnts.length; i++) {
          let thisGenRecipeIngrdnt = thisGenRecipesGenRecipeIngrdnts[i];
          let newMealIngredient = {
            _id: "tempId-" + this.getRndInteger(10000000, 99999999),
            qty: thisGenRecipeIngrdnt.defaultQty,
            genRecipeIngredient: thisGenRecipeIngrdnt,
            meal: thisMeal,
          };
          thisMealsNewMealIngrdnts.push(newMealIngredient);
        }
        thisMeal.genRecipe = thisGenRecipesGenRecipeIngrdnts[0].genRecipe;
        this.props.updateMeals(thisMeal, true);
        this.props.assignMealIngredientsToState(thisMealsNewMealIngrdnts);
        // this.setState({
        //   thisMeal: thisMeal,
        //   thisMealsMealIngrdntsCurrent: thisMealsNewMealIngrdnts,
        //   thisMealsGenRecipeCurrent:
        //     thisGenRecipesGenRecipeIngrdnts[0].genRecipe,
        //   thisRecipesId: thisGenRecipesGenRecipeIngrdnts[0].genRecipe._id,
        //   thisRecipesInst:
        //     thisGenRecipesGenRecipeIngrdnts[0].genRecipe
        //       .defaultPrepInstructions,
        //   thisMealRecipePic:
        //     thisGenRecipesGenRecipeIngrdnts[0].genRecipe.photoURL,
        //   thisRecipesName: thisGenRecipesGenRecipeIngrdnts[0].genRecipe.name,
        //   thisRecipesMealType:
        //     thisGenRecipesGenRecipeIngrdnts[0].genRecipe.availableMealType,
        //   thisRecipesAuthor:
        //     thisGenRecipesGenRecipeIngrdnts[0].genRecipe.GRFUser.handle,
        // });
      });
    // if (this.state.mealJustCreated === true) {
    //   this.setState({
    //     mealJustCreated: false,
    //   });
    // }
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
    let newNewMealIngrdnts = [];
    if (this.props.userHasChangedRecipe === true) {
      let oldMealIngrdnts = this.state.thisMealsMealIngrdntsOld;
      let newMealIngrdnts = this.state.thisMealsMealIngrdntsCurrent;
      for (let i = 0; i < newMealIngrdnts.length; i++) {
        let thisNewMealIngrdnt = newMealIngrdnts[i];
        let newMealIngrdnt = {
          qty: thisNewMealIngrdnt.qty,
          genRecipeIngredient: thisNewMealIngrdnt.genRecipeIngredient._id,
          meal: thisNewMealIngrdnt.meal._id,
        };
        // fetch("http://localhost:5000/mealIngredients/add", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newMealIngrdnt),
        // })
        axios
          .post("http://localhost:5000/mealIngredients/add", newMealIngrdnt)
          .then((response) => {
            newMealIngrdnts[i]._id = response.data._id;
            console.log(newMealIngrdnts);
          });
      }
      this.setState({
        thisMealsMealIngrdntsCurrent: newMealIngrdnts,
        thisMealsMealIngrdntsOld: newMealIngrdnts,
        thisMealsGenRecipeOld: newMealIngrdnts[0].genRecipeIngredient.genRecipe,
      });
      for (let i = 0; i < oldMealIngrdnts.length; i++) {
        let thisOldMealIngrdnt = oldMealIngrdnts[i]._id;
        // fetch("http://localhost:5000/mealIngredients/" + thisOldMealIngrdnt, {
        //   method: "DELETE",
        // })
        axios
          .delete("http://localhost:5000/mealIngredients/" + thisOldMealIngrdnt)
          .then((response) => console.log(response));
      }
    }
    const meal = {
      id: this.state.thisMealsId,
      day: this.state.thisMealsDay._id,
      genRecipe: this.state.thisMealsGenRecipeCurrent._id,
      mealType: this.state.thisMealType,
    };
    // fetch("http://localhost:5000/meals/update/" + meal.id, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(meal),
    // })
    axios
      .put("http://localhost:5000/meals/update/" + meal.id, meal)
      .then((response) => {
        // this.setState({
        //   thisMeal: response.data,
        //   userHasChangedRecipe: false,
        //   mealFormState: "viewing",
        // });
        console.log(response);
      });
  };
  handleClickDeleteMeal = (parentObj) => {
    if (parentObj === "meal") {
      let thisMealsIngrdnts = this.state.thisMealsMealIngrdntsCurrent;
      for (let i = 0; i < thisMealsIngrdnts.length; i++) {
        let thisMealIngrdnt = thisMealsIngrdnts[i]._id;
        axios
          .delete("http://localhost:5000/mealIngredients/" + thisMealIngrdnt)
          .then((response) => console.log(response));
        // axios
        //   .delete("http://localhost:5000/meals/" + this.state.thisMeal._id)
        //   .then((response) => {
        //     console.log(response);
        //   })
      }
      this.props.onDeleteMeal(this.state.thisMeal);
    } else {
      console.log("some other delete clicked");
    }
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
      .put("http://localhost:5000/genRecipes/update/" + genRecipe.id, genRecipe)
      .then(console.log("Recipe Updated"));
  };
  handleClickEdit = (parentObj) => {
    switch (parentObj) {
      case "meal":
        this.setState({
          mealFormState: "editingOrig",
        });
        break;
      case "genRecipe":
        this.setState({
          genRecipeFormState: "editingOrig",
        });
        break;
      default:
        this.setState({
          ingredientFormState: "editingOrig",
        });
    }
  };
  handleCancel = (parentObj) => {
    switch (parentObj) {
      case "meal":
        if (this.state.userHasChangedRecipe === true) {
          this.setState({
            thisMealsMealIngrdntsCurrent: this.state.thisMealsMealIngrdntsOld,
            thisMealsGenRecipeCurrent: this.state.thisMealsGenRecipeOld,
            mealFormState: "viewing",
            userHasChangedRecipe: false,
          });
        } else {
          this.setState({
            mealFormState: "viewing",
          });
        }
        break;
      case "genRecipe":
        this.setState({
          genRecipeFormState: "viewing",
        });
        break;
      default:
        this.setState({
          ingredientFormState: "viewing",
        });
    }
  };
  lockUnlockAdminMenus = () => {
    if (this.state.userType == "admin") {
      return <FontAwesomeIcon icon="fa-solid fa-lock-open" />;
    } else {
      return <FontAwesomeIcon icon="fa-solid fa-lock" />;
    }
  };
  findChangeMealIngrdntByIndex = (thisMealIngrdnt, method) => {
    let thisMealIngrdntIndex;
    let thisMealsIngrdnts = this.state.thisMealsMealIngrdntsCurrent;
    for (let i = 0; i < thisMealsIngrdnts.length; i++) {
      if (thisMealIngrdnt._id == thisMealsIngrdnts[i]._id) {
        thisMealIngrdntIndex = i;
      }
    }
    this.props.updateMealIngrdnt(
      thisMealIngrdnt,
      thisMealIngrdntIndex,
      this.state.thisMealType,
      method
    );
  };
  onChange = () => {
    console.log("Value changed");
  };
  showChangeRecipeWarning = () => {
    if (this.state.userHasChangedRecipe === false) {
      return;
    } else {
      return (
        <div className="alert alert-warning recipeWarning" role="alert">
          CAUTION: If you save a change to this Meal's Recipe, your meal
          ingredient custom qtys will be reset.
        </div>
      );
    }
  };
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  render() {
    if (
      this.state.dataLoaded === true
      // this.state.thisMealTypesGenRecipesLoaded == true &&
      // this.state.allGRFUsersLoaded == true &&
      // this.state.allDaysLoaded == true &&
      // this.state.mealsMealIngrdntsLoaded == true
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
                    this.state.thisMeal.mealType.name}
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
              <MacrosTable2
                tableType="Meal Macros"
                macrosBudget={this.state.thisMealsMacrosBudget}
                macrosCurrent={this.state.thisMealsMacrosCurrent}
                breakfastIngrdnts={
                  this.props.mealType === "Breakfast"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
                snack1Ingrdnts={
                  this.props.mealType === "Snack 1"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
                lunchIngrdnts={
                  this.props.mealType === "Lunch"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
                snack2Ingrdnts={
                  this.props.mealType === "Snack 2"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
                dinnerIngrdnts={
                  this.props.mealType === "Dinner"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
                dessertIngrdnts={
                  this.props.mealType === "Dessert"
                    ? this.state.thisMealsMealIngrdntsCurrent
                    : []
                }
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
                      userHasChangedRecipe={this.props.userHasChangedRecipe}
                      onCancel={this.handleCancel}
                      onDelete={this.handleClickDeleteMeal}
                      deleteMsg={this.state.deleteMealMsg}
                    />
                  </div>
                  <div
                    className={
                      this.state.mealJustCreated === true
                        ? "mealHeader mealHdrFcsd"
                        : "mealHeader"
                    }
                  >
                    <h5 className="recipeSelectHeader">Recipe:</h5>
                    <select
                      ref="userInput"
                      required
                      className="form-control form-select recipeSelect"
                      value={this.state.thisMealsGenRecipeCurrent._id}
                      disabled={
                        this.state.mealFormState === "viewing" ? true : false
                      }
                      onChange={this.handleChangeMealRecipe}
                    >
                      {this.props.thisMealTypesGenRecipes.map(function (
                        genRecipe
                      ) {
                        return (
                          <option key={genRecipe._id} value={genRecipe._id}>
                            {genRecipe.name}
                          </option>
                        );
                      })}
                    </select>
                    {this.showChangeRecipeWarning()}
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
                            value={this.state.thisMealsDay._id}
                            disabled={
                              this.state.mealFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={this.handleChangeMealDay}
                          >
                            {this.props.allDays.map(function (day) {
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
                            value={this.state.thisMeal._id}
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
                        this.state.thisMealRecipePic == undefined
                          ? {
                              backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                            }
                          : {
                              backgroundImage: `url(${this.state.thisMealRecipePic})`,
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
                            value={"John"}
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
                                value={"123"}
                                disabled={
                                  this.state.genRecipeFormState == "viewing"
                                    ? true
                                    : false
                                }
                                onChange={this.handleChangeThisRecipesAuthor}
                              >
                                {this.props.allGRFUsers.map(function (GRFUser) {
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
              {this.state.thisMealsMealIngrdntsCurrent.length < 1 &&
              this.state.mealJustCreated === false ? (
                <React.Fragment>
                  <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
                  <div className="mlIngrdntsCntnr">
                    <div className="form-group mt-4 mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          this.handleChangeMealRecipe(0, true);
                        }}
                      >
                        Populate Ingredients
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h5 className="mealIngdntsHdr">Meal Ingredients</h5>
                  <div className="mlIngrdntsCntnr">
                    {this.state.thisMealsMealIngrdntsCurrent.map(
                      (mealIngredient) => {
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
                            findChangeMealIngrdntByIndex={
                              this.findChangeMealIngrdntByIndex
                            }
                            onDelete={this.props.onDelete}
                            allGRFUsers={this.props.allGRFUsers}
                          />
                        );
                      }
                    )}
                  </div>
                </React.Fragment>
              )}
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
