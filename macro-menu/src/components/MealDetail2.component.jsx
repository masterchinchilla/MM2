import axios from "axios";
import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealIngredientParent from "./MealIngredientParent.component";
import MacrosTable from "./MacrosTable.component";
import MacrosTable2 from "./MacrosTable2.component";
import dayjs from "dayjs";

const MealDetail2 = (props) => {
  let defaultFormState = props.defaultFormState;
  let defaultUserType = props.defaultUserType;
  const [hideDeleteWarning, toggleHideDeleteWarning] = useState(true);
  const [mealFormState, changeMealFormState] = useState(defaultFormState);
  const [genRecipeFormState, changeGenRecipeFormState] =
    useState(defaultFormState);
  const [mealIngrdntFormsState, changeMealIngrdntFormsState] =
    useState(defaultFormState);
  const [mealUserType, changeMealUserType] = useState(defaultUserType);
  const [genRecipeUserType, changeGenRecipeUserType] =
    useState(defaultUserType);
  const [mealIngrdntFormsUserType, changeMealIngrdntFormsUserType] =
    useState(defaultUserType);
  let deleteMsg =
    "If you delete this meal plan, your ingredient custom quantities will be deleted as well. Are you sure you want to proceed?";
  function onChange() {
    console.log("Changed");
  }
  const handleClickEditMealOrRecipe = (parentObj, stateObj) => {
    if (stateObj === "meal") {
      props.onClickEditOnMeal(parentObj, stateObj);
      changeMealFormState("editingOrig");
      changeMealUserType("author");
      changeGenRecipeFormState("viewing");
      changeGenRecipeUserType("viewer");
      changeMealIngrdntFormsState("viewing");
      changeMealIngrdntFormsUserType("viewer");
    } else if (stateObj === "genRecipe") {
      props.onClickEditOnGenRecipe(parentObj, stateObj);
      changeMealFormState("viewing");
      changeMealUserType("viewer");
      changeGenRecipeFormState("editingOrig");
      changeGenRecipeUserType("author");
      changeMealIngrdntFormsState("viewing");
      changeMealIngrdntFormsUserType("viewer");
    } else {
      changeMealFormState("viewing");
      changeMealUserType("viewer");
      changeGenRecipeFormState("viewing");
      changeGenRecipeUserType("viewer");
    }
  };
  const handleCancel = (parentObj, stateObj) => {
    if (stateObj === "meal") {
      props.onCancelMealEdit(parentObj, stateObj);
    } else if (stateObj === "genRecipe") {
      props.onCancelGenRecipeEdit(parentObj, stateObj);
    } else {
      props.onCancel(parentObj, stateObj);
    }
    changeMealFormState(defaultFormState);
    changeMealUserType(defaultUserType);
    changeGenRecipeFormState(defaultFormState);
    changeGenRecipeUserType(defaultUserType);
    changeMealIngrdntFormsState(defaultFormState);
    changeMealIngrdntFormsUserType(defaultUserType);
  };
  function renderMealIngrdnts() {
    if (
      props.thisMeal.thisMealsIngrdnts.length > 0 &&
      props.thisMeal.thisMealJustCreated !== true
    ) {
      return props.thisMeal.thisMealsIngrdnts.map((mealIngredient, index) => {
        return (
          <MealIngredientParent
            key={mealIngredient.thisMealIngrdnt._id}
            thisMealIngredient={mealIngredient}
            allGRFUsers={props.allGRFUsers}
            allGenRecipeIngredients={props.allGenRecipeIngredients}
            thisRecipesIngrdnts={props.thisRecipesIngrdnts}
            allMeals={props.allMeals}
            allIngredients={props.allIngredients}
            thisMealsTypesRecipes={props.thisMealsTypesRecipes}
            allUnitOfMeasures={props.allUnitOfMeasures}
            allWeightTypes={props.allWeightTypes}
            allBrands={props.allBrands}
            updateProp={props.updateProp}
            mealIngrdntsArrayIndex={index}
            onSubmitFormChange={props.handleSubmitMealIngredientFormChange}
            onClickEditMealIngrdntForms={handleClickEditMealOrRecipe}
            // recordChanged={props.thisMeal.recordChanged}
            onCancel={handleCancel}
            onDelete={props.onDeleteMeal}
            deleteMsg={deleteMsg}
            defaultMealIngrdntFormsState={mealIngrdntFormsState}
            defaultMealIngrdntsFormsUserType={mealIngrdntFormsUserType}
          />
        );
      });
    } else {
      if (props.userType === "viewer") {
        return <em>This meal does not have any ingredients...</em>;
      } else {
        if (
          props.thisMeal.thisRecipesIngrdnts.length < 1 ||
          props.thisMeal.thisMealJustCreated === true
        ) {
          return <em>This recipe does not have any ingredients...</em>;
        } else {
          if (props.thisMeal.thisMealJustCreated === true) {
            return;
          } else {
            return (
              <div className="form-group mt-4 mb-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    props.populateNewMealIngredients(
                      props.thisMeal.thisMeal.mealType.code,
                      props.thisMeal.thisMeal.genRecipe._id
                    );
                  }}
                >
                  Populate Ingredients
                </button>
              </div>
            );
          }
        }
      }
    }
  }
  return (
    <div
      className="accordion accordionNotFlush mealDetailTopAccrdn"
      id={"mealOuterAccordionFull" + props.thisMeal.thisMeal._id}
    >
      <div className="accordion-item accordionItemNotFlush">
        <h2
          className="accordion-header"
          id={"mealOuterAccordionHeader" + props.thisMeal.thisMeal._id}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#mealOuterAccrdn" + props.thisMeal.thisMeal._id}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5>
              {props.thisMeal.thisMeal.day.dayOfWeek +
                " " +
                props.thisMeal.thisMeal.mealType.name}
            </h5>
          </button>
        </h2>
      </div>
      <div
        id={"mealOuterAccrdn" + props.thisMeal.thisMeal._id}
        className="accordion-collapse collapse show"
        aria-labelledby={
          "#mealOuterAccordionHeader" + props.thisMeal.thisMeal._id
        }
        data-bs-parent={"#mealOuterAccordionFull" + props.thisMeal.thisMeal._id}
      >
        <div className="macroTblCntnr">
          <MacrosTable2
            key={"MTbleForMeal" + props.thisMeal.thisMeal._id}
            tableType={"Meal Macros"}
            macrosBudget={props.thisMeal.thisMealsMacrosBudget}
            breakfastIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "breakfast"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            snack1Ingrdnts={
              props.thisMeal.thisMeal.mealType.code === "snack1"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            lunchIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "lunch"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            snack2Ingrdnts={
              props.thisMeal.thisMeal.mealType.code === "snack2"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            dinnerIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "dinner"
                ? props.thisMeal.thisMealsIngrdnts
                : []
            }
            dessertIngrdnts={
              props.thisMeal.thisMeal.mealType.code === "dessert"
                ? props.thisMeal.thisMealsIngrdnts
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
                  key={"EOptionsForMeal" + props.thisMeal.thisMeal._id}
                  parentObj={props.thisMeal.thisMeal}
                  stateObj={"meal"}
                  userType={mealUserType}
                  thisFormState={mealFormState}
                  onSubmitFormChange={props.onSubmitMealFormChange}
                  onClickEdit={handleClickEditMealOrRecipe}
                  recordChanged={props.thisMeal.recordChanged}
                  onCancel={handleCancel}
                  onDelete={props.onDeleteMeal}
                  deleteMsg={deleteMsg}
                />
              </div>
              <div
                className={
                  props.thisMeal.thisMealJustCreated === true
                    ? "mealHeader mealHdrFcsd"
                    : "mealHeader"
                }
              >
                <h5 className="recipeSelectHeader">Recipe:</h5>
                <select
                  // ref="userInput": React prevents this, but I don't know what it does anyway...
                  required
                  className="form-control form-select recipeSelect"
                  value={props.thisMeal.thisMeal.genRecipe._id}
                  disabled={
                    props.thisMeal.thisMealFormState === "viewing"
                      ? true
                      : false
                  }
                  //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                  onChange={(e) =>
                    props.onChangeMealRecipe(
                      props.thisMeal.thisMeal.mealType.code,
                      e
                    )
                  }
                >
                  {props.thisMealTypesGenRecipes.map(function (genRecipe) {
                    return (
                      <option key={genRecipe._id} value={genRecipe._id}>
                        {genRecipe.name}
                      </option>
                    );
                  })}
                </select>
                {props.thisMeal.userChangedThisMealsRecipe === true &&
                props.thisMeal.thisMealJustCreated === false ? (
                  <div
                    className="alert alert-warning recipeWarning"
                    role="alert"
                  >
                    CAUTION: If you save a change to this Meal's Recipe, your
                    meal ingredient custom qtys will be reset.
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body mealCardBody">
              <div
                className="accordion accordion-flush"
                id={"mealAdminAccordionFull" + props.thisMeal.thisMeal._id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={
                      "mealAdminAccordionHeader" + props.thisMeal.thisMeal._id
                    }
                  >
                    <button
                      className="accordion-button collapsed mealAdminAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#mealAdminAccrdn" + props.thisMeal.thisMeal._id
                      }
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      disabled={genRecipeUserType === "admin" ? false : true}
                    >
                      {genRecipeUserType === "admin" ? (
                        <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-lock" />
                      )}
                    </button>
                  </h2>
                </div>
                <div
                  id={"mealAdminAccrdn" + props.thisMeal.thisMeal._id}
                  className="accordion-collapse collapse"
                  aria-labelledby={
                    "#mealAdminAccordionHeader" + props.thisMeal.thisMeal._id
                  }
                  data-bs-parent={
                    "#mealAdminAccordionFull" + props.thisMeal.thisMeal._id
                  }
                >
                  <div className="accordion-body mealInnerAccordion">
                    <div className="form-group mealImputs">
                      <label>Day</label>
                      <select
                        // ref="userInput"
                        required
                        className="form-control form-select"
                        value={JSON.stringify(props.thisMeal.thisMeal.day)}
                        disabled={
                          props.thisMeal.thisMealFormState === "viewing"
                            ? true
                            : false
                        }
                        //updateProp = (stateObj, mealType, propToUpdate, arrayIndex, e)
                        onChange={(e) =>
                          props.updateProp(
                            "meal",
                            props.thisMeal.thisMeal.mealType.code,
                            "day",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allDays.map(function (day) {
                          return (
                            <option key={day._id} value={JSON.stringify(day)}>
                              {day.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mealImputs">
                      <label>Meal Type</label>
                      <select
                        // ref="userInput"
                        required
                        className="form-control form-select"
                        value={JSON.stringify(props.thisMeal.thisMeal.mealType)}
                        disabled={
                          props.thisMeal.thisMealFormState == "viewing"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          props.updateProp(
                            "meal",
                            props.thisMeal.thisMeal.mealType.code,
                            "mealType",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allMealTypes.map(function (mealType) {
                          return (
                            <option
                              key={"allMealTypesListItem" + mealType.code}
                              value={JSON.stringify(mealType)}
                            >
                              {mealType.name}
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
                        value={props.thisMeal.thisMeal._id}
                        disabled={true}
                        onChange={onChange}
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
                  parentObj={props.thisMeal.thisMeal}
                  stateObj={"genRecipe"}
                  userType={genRecipeUserType}
                  onSubmitFormChange={props.handleSubmitRecipeFormChange}
                  thisFormState={genRecipeFormState}
                  onClickEdit={handleClickEditMealOrRecipe}
                  recordChanged={props.thisMeal.recordChanged}
                  onCancel={handleCancel}
                  onDelete={props.onDeleteMeal}
                  deleteMsg={deleteMsg}
                />
              </div>
            </div>
            <div className="card-body mealCardBody">
              <div className="mealImgNTblRow">
                <div
                  className="mealImg"
                  // style={{
                  //   backgroundImage: `url(${this.state.thisMeal.thisMeal.genRecipe.photoURL})`,
                  // }}
                  style={
                    props.thisMeal.thisMeal.genRecipe.photoURL === undefined
                      ? {
                          backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                        }
                      : {
                          backgroundImage: `url(${props.thisMeal.thisMeal.genRecipe.photoURL})`,
                        }
                  }
                  // src={this.state.thisMeal.thisMeal.genRecipe.photoURL}
                />
                <h6 className="mealPrepInst">Prep Instructions:</h6>
                <textarea
                  className="form-control mealTextArea"
                  disabled={
                    props.thisMeal.thisGenRecipeFormState === "viewing"
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    props.updateProp(
                      "genRecipe",
                      props.thisMeal.thisMeal.mealType.code,
                      "prepIntructions",
                      0,
                      "textArea",
                      e
                    )
                  }
                  value={props.thisMeal.thisMeal.genRecipe.prepInstructions}
                ></textarea>
              </div>
              <div
                className="accordion accordion-flush"
                id={"mealInnerAccordionFull" + props.thisMeal.thisMeal._id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={
                      "mealInnerAccordionHeader" + props.thisMeal.thisMeal._id
                    }
                  >
                    <button
                      className="accordion-button collapsed mealInnerAccrdnBttn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={
                        "#mealInnerAccrdn" + props.thisMeal.thisMeal._id
                      }
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"mealInnerAccrdn" + props.thisMeal.thisMeal._id}
                  className="accordion-collapse collapse"
                  aria-labelledby={
                    "#mealInnerAccordionHeader" + props.thisMeal.thisMeal._id
                  }
                  data-bs-parent={
                    "#mealInnerAccordionFull" + props.thisMeal.thisMeal._id
                  }
                >
                  <div className="accordion-body mealInnerAccordion">
                    <div className="form-group mealInputs">
                      <label>Name</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={
                          props.thisMeal.thisGenRecipeFormState === "viewing"
                            ? true
                            : false
                        }
                        value={props.thisMeal.thisMeal.genRecipe.name}
                        onChange={(e) =>
                          props.updateProp(
                            "genRecipe",
                            props.thisMeal.thisMeal.mealType.code,
                            "name",
                            0,
                            "text",
                            e
                          )
                        }
                      />
                    </div>
                    <div className="form-group mealInputs">
                      <label>Img URL</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={
                          props.thisMeal.thisGenRecipeFormState === "viewing"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          props.updateProp(
                            "genRecipe",
                            props.thisMeal.thisMeal.mealType.code,
                            "photoURL",
                            0,
                            "text",
                            e
                          )
                        }
                        value={props.thisMeal.thisMeal.genRecipe.photoURL}
                      />
                    </div>
                    <div className="form-group mealInputs">
                      <label>Author</label>
                      <select
                        className="form-control form-select"
                        value={JSON.stringify(
                          props.thisMeal.thisMeal.genRecipe.GRFUser
                        )}
                        disabled
                        onChange={(e) =>
                          props.updateProp(
                            "genRecipe",
                            props.thisMeal.thisMeal.mealType.code,
                            "GRFUser",
                            0,
                            "select",
                            e
                          )
                        }
                      >
                        {props.allGRFUsers.map(function (GRFUser) {
                          return (
                            <option
                              key={"allGRFUsersListItem" + GRFUser._id}
                              value={JSON.stringify(GRFUser)}
                            >
                              {GRFUser.handle}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div
                    className="accordion accordion-flush"
                    id={
                      "genRecipeAdminAccordionFull" +
                      props.thisMeal.thisMeal._id
                    }
                  >
                    <div className="accordion-item genRecipeAdminMenuBttn">
                      <h2
                        className="accordion-header"
                        id={
                          "genRecipeAdminAccordionHeader" +
                          props.thisMeal.thisMeal._id
                        }
                      >
                        <button
                          className="accordion-button collapsed mealAdminAccrdnBttn"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={
                            "#genRecipeAdminAccrdn" +
                            props.thisMeal.thisMeal._id
                          }
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          disabled={genRecipeUserType == "admin" ? false : true}
                        >
                          {genRecipeUserType === "admin" ? (
                            <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                          ) : (
                            <FontAwesomeIcon icon="fa-solid fa-lock" />
                          )}{" "}
                        </button>
                      </h2>
                    </div>
                    <div
                      id={"genRecipeAdminAccrdn" + props.thisMeal.thisMeal._id}
                      className="accordion-collapse collapse"
                      aria-labelledby={
                        "#genRecipeAdminAccordionHeader" +
                        props.thisMeal.thisMeal._id
                      }
                      data-bs-parent={
                        "#genRecipeAdminAccordionFull" +
                        props.thisMeal.thisMeal._id
                      }
                    >
                      <div className="accordion-body mealInnerAccordion">
                        <div className="form-group mealInputs">
                          <label>Meal Type</label>
                          <select
                            // ref="userInput"
                            required
                            className="form-control form-select"
                            value={JSON.stringify(
                              props.thisMeal.thisMeal.genRecipe.mealType
                            )}
                            disabled={
                              props.thisMeal.thisGenRecipeFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              props.updateProp(
                                "genRecipe",
                                props.thisMeal.thisMeal.mealType.code,
                                "mealType",
                                0,
                                "select",
                                e
                              )
                            }
                          >
                            {props.allMealTypes.map(function (mealType) {
                              return (
                                <option
                                  key={"allMealTypesListItem" + mealType._id}
                                  value={JSON.stringify(mealType)}
                                >
                                  {mealType.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group mealInputs">
                          <label>Author</label>
                          <select
                            // ref="userInput"
                            required
                            className="form-control form-select"
                            value={JSON.stringify(
                              props.thisMeal.thisMeal.genRecipe.GRFUser
                            )}
                            disabled={
                              props.thisMeal.thisGenRecipeFormState == "viewing"
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              props.updateProp(
                                "genRecipe",
                                props.thisMeal.thisMeal.mealType.code,
                                "GRFUser",
                                0,
                                "select",
                                e
                              )
                            }
                          >
                            {props.allGRFUsers.map(function (GRFUser) {
                              return (
                                <option
                                  key={"allGRFUsersListItem" + GRFUser._id}
                                  value={JSON.stringify(GRFUser)}
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
                            value={props.thisMeal.thisMeal.genRecipe._id}
                            disabled={true}
                            onChange={props.onChange}
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
          <div className="mlIngrdntsCntnr">{renderMealIngrdnts()}</div>
        </div>
      </div>
    </div>
  );
};
export default MealDetail2;
