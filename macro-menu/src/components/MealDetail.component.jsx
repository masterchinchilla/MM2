import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";

class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      thisMeal: {},
      thisMealsDay: {},
      thisMealType: {},
      thisFormState: "editingOrig",
      userType: "author",
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
          data: true,
          thisMealRecipePic: this.props.thisMeal.genRecipe.photoURL,
        });
        console.log(this.props);
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      this.setState({
        allGRFUsers: response.data.map((GRFUser) => GRFUser),
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
    if (!this.state.data) {
      return <div className="spinner-border text-primary" role="status"></div>;
    }
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
        <form className="mealForm">
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
                <div className="card-header mealCardHeader">
                  <h6 className="formSctnTitle">Meal</h6>
                  <hr />
                  <div className="mealHeader">
                    <div className="dropdown mealEditDDown">
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
                        {/* <li>
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
                      </li> */}
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
                    </div>
                    <h5 className="recipeSelectHeader">Recipe:</h5>
                    <select
                      ref="userInput"
                      required
                      className="form-control form-select"
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
                <div className="card-body">
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
                      <div className="accordion-body mealAdminAccordion">
                        <table className="mealInputsTbl">
                          <tr>
                            <th scope="col" className="mealInputsTh">
                              Img URL
                            </th>
                            <th scope="col" className="mealInputsTh">
                              Name
                            </th>
                          </tr>
                          <tr>
                            <td className="mealInputsTd">
                              <input
                                className="form-control mealInput"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.photoURL}
                              />
                            </td>
                            <td className="mealInputsTd">
                              <input
                                className="form-control mealInput"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.name}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="col" className="mealInputsTh">
                              Meal Type
                            </th>
                            <th scope="col" className="mealInputsTh">
                              Author
                            </th>
                          </tr>
                          <tr>
                            <td className="mealInputsTd">
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select mealInput"
                                value={this.state.thisMeal.mealType}
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
                                      key={"allMealTypesListItem" + mealType}
                                      value={mealType}
                                    >
                                      {mealType}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td className="mealInputsTd">
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select mealInput"
                                value={
                                  this.state.thisMeal.genRecipe.GRFUser.handle
                                }
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                              >
                                {this.state.allGRFUsers.map(function (GRFUser) {
                                  return (
                                    <option
                                      key={GRFUser._id}
                                      value={GRFUser._id}
                                    >
                                      {GRFUser.handle}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          </tr>
                        </table>
                        <EditOptions
                          parentObj={"meal"}
                          userType={this.state.userType}
                          thisFormState={this.state.thisFormState}
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table table-bordered mealCardTbl">
                    <tbody>
                      <td className="mealImgNTblRow">
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
                      </td>
                    </tbody>
                  </table>
                  <div
                    className="accordion accordion-flush"
                    id={"mealInnerAccordionFull" + this.state.thisMeal._id}
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id={
                          "mealInnerAccordionHeader" + this.state.thisMeal._id
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
                        "#mealInnerAccordionHeader" + this.state.thisMeal._id
                      }
                      data-bs-parent={
                        "#mealInnerAccordionFull" + this.state.thisMeal._id
                      }
                    >
                      <div className="accordion-body mealInnerAccordion">
                        <table className="mealInputsTbl">
                          <tr>
                            <th scope="col" className="mealInputsTh">
                              Img URL
                            </th>
                            <th scope="col" className="mealInputsTh">
                              Name
                            </th>
                          </tr>
                          <tr>
                            <td className="mealInputsTd">
                              <input
                                className="form-control mealInput"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.photoURL}
                              />
                            </td>
                            <td className="mealInputsTd">
                              <input
                                className="form-control mealInput"
                                type="text"
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                                value={this.state.thisMeal.genRecipe.name}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="col" className="mealInputsTh">
                              Meal Type
                            </th>
                            <th scope="col" className="mealInputsTh">
                              Author
                            </th>
                          </tr>
                          <tr>
                            <td className="mealInputsTd">
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select mealInput"
                                value={this.state.thisMeal.mealType}
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
                                      key={"allMealTypesListItem" + mealType}
                                      value={mealType}
                                    >
                                      {mealType}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td className="mealInputsTd">
                              <select
                                ref="userInput"
                                required
                                className="form-control form-select mealInput"
                                value={
                                  this.state.thisMeal.genRecipe.GRFUser.handle
                                }
                                disabled={
                                  this.state.thisFormState == "viewing"
                                    ? true
                                    : false
                                }
                              >
                                {this.state.allGRFUsers.map(function (GRFUser) {
                                  return (
                                    <option
                                      key={GRFUser._id}
                                      value={GRFUser._id}
                                    >
                                      {GRFUser.handle}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          </tr>
                        </table>
                        <EditOptions
                          parentObj={"meal"}
                          userType={this.state.userType}
                          thisFormState={this.state.thisFormState}
                        />
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
  }
}

export default MealDetail;
