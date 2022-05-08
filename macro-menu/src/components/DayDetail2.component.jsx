import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import MealDetail from "./MealDetail.component";
import CreateMeal from "./CreateMeal.component";
import CreateMeal2 from "./CreateMeal2.component";
import MealOrNewMeal from "./MealOrNewMeal.component";
import MacrosTable from "./MacrosTable.component";
import MacrosTable2 from "./MacrosTable2.component";
import MealDetail2 from "./MealDetail2.component";
import _ from "lodash";

class DayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      thisFormState: "viewing",
      userType: "admin",
      mealDefaults: this.props.mealDefaults,
      thisDay: this.props.thisDay,
      breakfast: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.breakfast.thisMeal,
        // thisMeal: {
        //   _id: "missing",
        //   day: this.props.thisDay,
        //   genRecipe: {
        //     _id: "tempBreakfastRecipe1Id",
        //     name: "tempBreakfastRecipe1Name",
        //     availableMealType: {
        //       _id: "626dd6fc21888432c0fe3e90",
        //       code: "breakfast",
        //       name: "Breakfast",
        //     },
        //     GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        //     defaultPrepInstructions: "",
        //     photoUrl: "",
        //   },
        //   prepInstructions: "",
        //   mealType: {
        //     _id: "626dd6fc21888432c0fe3e90",
        //     code: "breakfast",
        //     name: "Breakfast",
        //   },
        // },
        thisMealsIngrdnts: this.props.mealDefaults.breakfast.thisMealsIngrdnts,
        // thisMealsIngrdnts: [
        //   {
        //     _id: "missing",
        //     qty: 1,
        //     genRecipeIngredient: {
        //       defaultQty: 1,
        //       ingredient: {
        //         name: "tempBreakfastIngredient1Name",
        //         calories: 1,
        //         carbs: 1,
        //         protein: 1,
        //         fat: 1,
        //         fiber: 1,
        //         unitOfMeasure: { name: "Each" },
        //         weightType: { name: "" },
        //         photoURL: "",
        //         GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        //         brand: { name: "" },
        //       },
        //       genRecipe: {
        //         _id: "tempBreakfastRecipe1Id",
        //         name: "tempBreakfastRecipe1Name",
        //         availableMealType: {
        //           _id: "626dd6fc21888432c0fe3e90",
        //           code: "breakfast",
        //           name: "Breakfast",
        //         },
        //         GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        //         defaultPrepInstructions: "",
        //         photoUrl: "",
        //       },
        //       defaultPrepInstructions: "",
        //     },
        //     meal: {
        //       _id: "missing",
        //       day: this.props.thisDay,
        //       genRecipe: {
        //         _id: "tempBreakfastRecipe1Id",
        //         name: "tempBreakfastRecipe1Name",
        //         availableMealType: {
        //           _id: "626dd6fc21888432c0fe3e90",
        //           code: "breakfast",
        //           name: "Breakfast",
        //         },
        //         GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        //         defaultPrepInstructions: "",
        //         photoUrl: "",
        //       },
        //       prepInstructions: "",
        //       mealType: {
        //         _id: "626dd6fc21888432c0fe3e90",
        //         code: "breakfast",
        //         name: "Breakfast",
        //       },
        //     },
        //   },
        // ],
        thisRecipesIngrdnts:
          this.props.mealDefaults.breakfast.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
        // thisMealsMacrosBudget: {
        //   cals:
        //     this.props.macrosBudget.cals *
        //     (this.props.mealsWeighting.breakfastWeight / 100),
        //   carbs:
        //     this.props.macrosBudget.carbs *
        //     (this.props.mealsWeighting.breakfastWeight / 100),
        //   protein:
        //     this.props.macrosBudget.protein *
        //     (this.props.mealsWeighting.breakfastWeight / 100),
        //   fat:
        //     this.props.macrosBudget.fat *
        //     (this.props.mealsWeighting.breakfastWeight / 100),
        //   fiber:
        //     this.props.macrosBudget.fiber *
        //     (this.props.mealsWeighting.breakfastWeight / 100),
        // },
      },
      breakfastOld: {},
      snack1: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.snack1.thisMeal,
        thisMealsIngrdnts: this.props.mealDefaults.snack1.thisMealsIngrdnts,
        thisRecipesIngrdnts: this.props.mealDefaults.snack1.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
      },
      snack1Old: {},
      lunch: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.lunch.thisMeal,
        thisMealsIngrdnts: this.props.mealDefaults.lunch.thisMealsIngrdnts,
        thisRecipesIngrdnts: this.props.mealDefaults.lunch.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
      },
      lunchOld: {},
      snack2: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.snack2.thisMeal,
        thisMealsIngrdnts: this.props.mealDefaults.snack2.thisMealsIngrdnts,
        thisRecipesIngrdnts: this.props.mealDefaults.snack2.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
      },
      snack2Old: {},
      dinner: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.dinner.thisMeal,
        thisMealsIngrdnts: this.props.mealDefaults.dinner.thisMealsIngrdnts,
        thisRecipesIngrdnts: this.props.mealDefaults.dinner.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
      },
      dinnerOld: {},
      dessert: {
        thisMealJustCreated: false,
        recordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisGenRecipeFormState: "viewing",
        thisMeal: this.props.mealDefaults.dessert.thisMeal,
        thisMealsIngrdnts: this.props.mealDefaults.dessert.thisMealsIngrdnts,
        thisRecipesIngrdnts:
          this.props.mealDefaults.dessert.thisRecipesIngrdnts,
        thisMealsMacrosBudget: {
          cals: 1,
          carbs: 1,
          protein: 1,
          fat: 1,
          fiber: 1,
        },
      },
      dessertOld: {},
      macrosBudget: this.props.macrosBudget,
      macrosCurrent: {
        cals: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        fiber: 0,
      },
      deleteDayMsg: "Are you sure you want to delete this Day Meal Plan?",
      hideDeleteDayBarrier: true,
    };
  }
  componentDidMount() {
    this.buildDefaultMealData();
    this.loadDataFromDB();
  }
  loadDataFromDB() {
    axios
      .get(
        "http://localhost:5000/meals/mealsofthisday/" + this.props.thisDay._id
      )
      .then((response) => this.updateMealsFromDB(response.data, [], false));
  }
  buildDefaultMealData = () => {
    let state = this.state;
    let mealTypes = this.props.mealTypes;
    let macrosBudget = this.props.macrosBudget;
    let thisDay = this.props.thisDay;
    for (let i = 0; i < mealTypes.length; i++) {
      let thisMealTypeCode = mealTypes[i].code;
      let thisMealDefaultsIngrdnts =
        state.mealDefaults[thisMealTypeCode]["thisMealsIngrdnts"];
      let mealWeightPercent =
        this.props.mealsWeighting[`${thisMealTypeCode}Weight`] / 100;
      let thisMealsMacrosBudget = {
        cals: macrosBudget.cals * mealWeightPercent,
        carbs: macrosBudget.carbs * mealWeightPercent,
        protein: macrosBudget.protein * mealWeightPercent,
        fat: macrosBudget.fat * mealWeightPercent,
        fiber: macrosBudget.fiber * mealWeightPercent,
      };
      let thisRecipesIngrdnts =
        state.mealDefaults[thisMealTypeCode]["thisRecipesIngrdnts"];
      thisMealDefaultsIngrdnts[0].meal.day = thisDay;
      state.mealDefaults[thisMealTypeCode]["thisMealsIngrdnts"] =
        thisMealDefaultsIngrdnts;
      state[thisMealTypeCode]["thisMealsIngrdnts"] = thisMealDefaultsIngrdnts;
      state.mealDefaults[thisMealTypeCode]["thisMeal"]["day"] = thisDay;
      state[thisMealTypeCode]["thisMeal"]["day"] = thisDay;
      state.mealDefaults[thisMealTypeCode]["thisMealsMacrosBudget"] =
        thisMealsMacrosBudget;
      state[thisMealTypeCode]["thisMealsMacrosBudget"] = thisMealsMacrosBudget;
      state[thisMealTypeCode]["thisRecipesIngrdnts"] = thisRecipesIngrdnts;
    }
    this.setState({ state });
  };
  updateMealsFromDB = (meals) => {
    if (meals.length === 0) {
      this.setState({ data: true });
    } else {
      let state = this.state;
      for (let i = 0; i < meals.length; i++) {
        state[meals[i].mealType.code]["thisMeal"] = meals[i];
        this.fetchDayMealsIngrdnts(meals[i]);
      }
      this.setState({ state });
    }
  };
  updateProp = (
    stateObject,
    mealType,
    propToUpdate,
    arrayIndex,
    inputType,
    e
  ) => {
    let newValue;
    if (inputType === "select" || inputType === "number") {
      newValue = JSON.parse(e.target.value);
    } else {
      newValue = e.target.value;
    }
    let state = this.state;
    switch (stateObject) {
      case "day":
        state.thisDay[propToUpdate] = newValue;
        break;
      case "meal":
        state[mealType]["thisMeal"][propToUpdate] = newValue;
        break;
      case "genRecipe":
        state[mealType]["thisMeal"]["genRecipe"][propToUpdate] = newValue;
        break;
      case "mealIngredient":
        state[mealType]["thisMealsIngrdnts"][arrayIndex][propToUpdate] =
          newValue;
        break;
      case "genRecipeIngredient":
        state[mealType]["thisMealsIngrdnts"][arrayIndex]["genRecipeIngredient"][
          propToUpdate
        ] = newValue;
        break;
      case "ingredient":
        state[mealType]["thisMealsIngrdnts"][arrayIndex]["genRecipeIngredient"][
          "ingredient"
        ][propToUpdate] = newValue;
        break;
    }
    this.setState({ state });
  };
  // updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e) => {
  //   let newValue = e.target.value;
  //   let state = this.state;
  //   let mealTypes = this.props.mealTypes;
  //   switch (stateObject) {
  //     case "day":
  //       state.thisDay[propToUpdate] = newValue;
  //       let editedDay = state.thisDay;
  //       for (let i = 0; i < mealTypes.length; i++) {
  //         let mealId = state[mealTypes[i].code]["thisMeal"]["_id"];
  //         if (mealId === "missing") {
  //           return;
  //         } else {
  //           state[mealTypes[i].code]["thisMeal"]["day"] = editedDay;
  //           let mealIngrdntsToUpdate =
  //             state[mealTypes[i].code]["thisMealsIngrdnts"];
  //           for (let i = 0; i < mealIngrdntsToUpdate.length; i++) {
  //             mealIngrdntsToUpdate[i].meal.day = editedDay;
  //           }
  //           state[mealTypes[i].code]["thisMealsIngrdnts"] =
  //             mealIngrdntsToUpdate;
  //         }
  //       }
  //       break;
  //     case "meal":
  //       state[mealType]["thisMeal"][propToUpdate] = newValue;
  //       let editedMeal = state[mealType]["thisMeal"];
  //       let mealIngrdntsToUpdateWMeal = state[mealType]["thisMealsIngrdnts"];
  //       for (let i = 0; i < mealIngrdntsToUpdateWMeal.length; i++) {
  //         mealIngrdntsToUpdateWMeal[i].meal = editedMeal;
  //       }
  //       state[mealType]["thisMealsIngrdnts"] = mealIngrdntsToUpdateWMeal;
  //       break;
  //     case "genRecipe":
  //       state[mealType]["thisMeal"]["genRecipe"][propToUpdate] = newValue;
  //       let editedRecipe = state[mealType]["thisMeal"]["genRecipe"];
  //       for (let i = 0; i < mealTypes.length; i++) {
  //         let thisMealsRecipesId =
  //           state[mealTypes[i].code]["thisMeal"]["genRecipe"]["_id"];
  //         if (thisMealsRecipesId !== editedRecipe._id) {
  //           return;
  //         } else {
  //           state[mealTypes[i].code]["thisMeal"]["genRecipe"] = editedRecipe;
  //           let mealIngrdntsToUpdateWGenRecipe =
  //             state[mealTypes[i].code]["thisMealsIngrdnts"];
  //           for (let i = 0; i < mealIngrdntsToUpdateWGenRecipe.length; i++) {
  //             mealIngrdntsToUpdateWGenRecipe[i].genRecipeIngredient.genRecipe =
  //               editedRecipe;
  //           }
  //           state[mealTypes[i].code]["thisMealsIngrdnts"] =
  //             mealIngrdntsToUpdateWGenRecipe;
  //         }
  //       }
  //       break;
  //     case "mealIngredient":
  //       state[mealType]["thisMealsIngrdnts"][arrayIndex][propToUpdate] =
  //         newValue;
  //       break;
  //     case "genRecipeIngredient":
  //       let relevantMealIngrdnts1 = state[mealType]["thisMealsIngrdnts"];
  //       let genRecipeIngrdntToUpdate =
  //         relevantMealIngrdnts1[arrayIndex].genRecipeIngredient;
  //       genRecipeIngrdntToUpdate[propToUpdate] = newValue;
  //       let editedRecipeIngrdnt = genRecipeIngrdntToUpdate;
  //       let editedRecipeIngrdntsId = editedRecipeIngrdnt._id;
  //       let editedRecipesId = editedRecipeIngrdnt.genRecipe._id;
  //       for (let i = 0; i < mealTypes.length; i++) {
  //         let thisMeal = state[mealTypes[i].code]["thisMeal"];
  //         let thisMealsRecipeId = thisMeal.genRecipe._id;
  //         if (thisMealsRecipeId !== editedRecipesId) {
  //           return;
  //         } else {
  //           let mealIngrdntsToChckUpdtWGRI =
  //             state[mealTypes[i].code]["thisMealsIngrdnts"];
  //           for (let i = 0; i < mealIngrdntsToChckUpdtWGRI.length; i++) {
  //             let thisMealIngrdntsId = mealIngrdntsToChckUpdtWGRI[i]._id;
  //             if (thisMealIngrdntsId !== editedRecipeIngrdntsId) {
  //               return;
  //             } else {
  //               mealIngrdntsToChckUpdtWGRI[i].genRecipeIngredient =
  //                 editedRecipeIngrdnt;
  //             }
  //           }
  //           state[mealTypes[i].code]["thisMealsIngrdnts"] =
  //             mealIngrdntsToChckUpdtWGRI;
  //         }
  //       }
  //       break;
  //     case "ingredient":
  //       let relevantMealIngrdnts2 = state[mealType]["thisMealsIngrdnts"];
  //       let ingrdntToUpdate =
  //         relevantMealIngrdnts2[arrayIndex].genRecipeIngredient.ingredient;
  //       ingrdntToUpdate[propToUpdate] = newValue;
  //       let editedIngrdnt = ingrdntToUpdate;
  //       let editedIngrdntsId = editedIngrdnt._id;
  //       for (let i = 0; i < mealTypes.length; i++) {
  //         let mealIngrdntsToChckUpdtWIngrdnt =
  //           state[mealTypes[i].code]["thisMealsIngrdnts"];
  //         for (let i = 0; i < mealIngrdntsToChckUpdtWIngrdnt.length; i++) {
  //           let thisMealsGRIsIngrdnt =
  //             mealIngrdntsToChckUpdtWIngrdnt[i].genRecipeIngredient.ingredient;
  //           let thisMealsGRIsIngrdntId = thisMealsGRIsIngrdnt._id;
  //           if (thisMealsGRIsIngrdntId !== editedIngrdntsId) {
  //             return;
  //           } else {
  //             mealIngrdntsToChckUpdtWIngrdnt[i].genRecipeIngredient.ingredient =
  //               editedIngrdnt;
  //           }
  //         }
  //         state[mealTypes[i].code]["thisMealsIngrdnts"] =
  //           mealIngrdntsToChckUpdtWIngrdnt;
  //       }
  //       break;
  //   }
  //   this.setState({ state });
  // };
  fetchDayMealsIngrdnts = (meal) => {
    axios
      .get(
        "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
          meal._id
      )
      .then((response) => {
        this.assignMealIngredientsToState(response.data, meal);
      });
  };
  assignMealIngredientsToState = (mealMealIngredients, meal) => {
    let thisMealType = meal.mealType.code;
    let state = this.state;
    for (let i = 0; i < mealMealIngredients.length; i++) {
      let thisIngredient =
        mealMealIngredients[i].genRecipeIngredient.ingredient;
      if (thisIngredient.weightType === undefined) {
        thisIngredient.weightType = {
          _id: "627695899fa56aa1fe318396",
          name: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        };
      }
      if (thisIngredient.unitOfMeasure === undefined) {
        thisIngredient.unitOfMeasure = {
          _id: "627691b69fa56aa1fe318393",
          name: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        };
      }
      mealMealIngredients[i].genRecipeIngredient.ingredient = thisIngredient;
    }
    state[thisMealType]["thisMealsIngrdnts"] = mealMealIngredients;
    state["data"] = true;
    this.setState({ state });
    this.fetchRecipesIngrdnts(meal);
  };
  fetchRecipesIngrdnts = (meal) => {
    let thisRecipeId = meal.genRecipe._id;
    let mealType = meal.mealType.code;
    axios
      .get(
        "http://localhost:5000/genRecipeIngredients/thisGenRecipesGenRecipeIngredients/" +
          thisRecipeId
      )
      .then((response) => {
        let thisGenRecipesGenRecipeIngrdnts = response.data.map(
          (genRecipeIngredient) => genRecipeIngredient
        );
        let state = this.state;
        state[mealType]["thisRecipesIngrdnts"] =
          thisGenRecipesGenRecipeIngrdnts;
        this.setState({ state });
      });
  };
  handleSubmitMealFormChange = (mealType) => {
    let thisMeal = this.state[mealType];
    let oldMeal = this.state[`${mealType}Old`];
    let pattern = /tempId/;
    let thisMeals1stTempIngrdntId = thisMeal.thisMealsIngrdnts[0]._id;
    let testResult = pattern.test(thisMeals1stTempIngrdntId);
    if (testResult) {
      let newMealIngrdnts = thisMeal.thisMealsIngrdnts;
      for (let i = 0; i < newMealIngrdnts.length; i++) {
        let thisNewMealIngrdnt = newMealIngrdnts[i];
        let newMealIngrdntToSave = {
          qty: thisNewMealIngrdnt.qty,
          genRecipeIngredient: thisNewMealIngrdnt.genRecipeIngredient._id,
          meal: thisNewMealIngrdnt.meal._id,
        };
        axios
          .post(
            "http://localhost:5000/mealIngredients/add",
            newMealIngrdntToSave
          )
          .then((response) => {
            newMealIngrdnts[i]._id = response.data._id;
          });
      }
      thisMeal.thisMealsIngrdnts = newMealIngrdnts;
      if (oldMeal.thisMeal !== undefined) {
        //this conditional is returning false even when it seems to be true, need to find out why...
        let oldMealIngrdnts = oldMeal.thisMealsIngrdnts;
        for (let i = 0; i < oldMealIngrdnts.length; i++) {
          let thisOldMealIngrdnt = oldMealIngrdnts[i]._id;
          axios
            .delete(
              "http://localhost:5000/mealIngredients/" + thisOldMealIngrdnt
            )
            .then((response) => console.log(response));
        }
      }
    }
    const thisMealToSave = {
      id: thisMeal.thisMeal._id,
      day: thisMeal.thisMeal.day._id,
      genRecipe: thisMeal.thisMeal.genRecipe._id,
      mealType: thisMeal.thisMeal.mealType._id,
    };
    axios
      .put(
        "http://localhost:5000/meals/update/" + thisMealToSave.id,
        thisMealToSave
      )
      .then((response) => {
        console.log(response);
      });
    thisMeal.thisMealFormState = "viewing";
    thisMeal.userChangedThisMealsRecipe = false;
    thisMeal.thisMealJustCreated = false;
    thisMeal.recordChanged = false;
    oldMeal = {};
    let state = this.state;
    state[mealType] = thisMeal;
    state[`${mealType}Old`] = oldMeal;
    this.setState({ state });
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleClickEditOnMeal = (thisMeal) => {
    let state = this.state;
    let currentMeal = _.cloneDeep(state[thisMeal]);
    state[`${thisMeal}Old`] = currentMeal;
    state[thisMeal]["thisMealFormState"] = "editingOrig";
    this.setState(state);
  };
  handleClickEditOnGenRecipe = (thisMeal) => {
    let state = this.state;
    let currentMeal = _.cloneDeep(state[thisMeal]);
    state[`${thisMeal}Old`] = currentMeal;
    state[thisMeal]["thisGenRecipeFormState"] = "editingOrig";
    this.setState(state);
  };
  handleCancelMealEdit = (thisMeal) => {
    let state = this.state;
    let currentMealRestoredToOld = _.cloneDeep(state[`${thisMeal}Old`]);
    state[thisMeal] = currentMealRestoredToOld;
    state[`${thisMeal}Old`] = {};
    this.setState(state);
  };
  handleCancelGenRecipeEdit = (thisMeal) => {
    let state = this.state;
    let currentMealRestoredToOld = _.cloneDeep(state[`${thisMeal}Old`]);
    state[thisMeal] = currentMealRestoredToOld;
    state[`${thisMeal}Old`] = {};
    this.setState(state);
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
  handleCreateMeal = (newMeal) => {
    let state = this.state;
    state[newMeal.mealType.code]["thisMeal"] = newMeal;
    state[newMeal.mealType.code]["thisMealJustCreated"] = true;
    state[newMeal.mealType.code]["thisMealFormState"] = "editingOrig";
    // state[newMeal.mealType.code]["recordChanged"] = true;
    const newMealToSave = {
      day: newMeal.day._id,
      genRecipe: newMeal.genRecipe._id,
      mealType: newMeal.mealType._id,
    };
    console.log(newMeal);
    this.setState({ state });
    axios
      .post("http://localhost:5000/meals/add", newMealToSave)
      .then((response) =>
        (() => {
          let newMealData = response.data;
          let state = this.state;
          state[newMeal.mealType.code]["thisMeal"]["_id"] = newMealData._id;
          this.setState({ state });
        })()
      );
  };
  updateMealIngrdnt = (
    thisMealIngrdnt,
    thisMealIngrdntIndex,
    thisMealType,
    method
  ) => {
    switch (thisMealType) {
      case "Breakfast":
        let breakfast = thisMealIngrdnt.meal;
        let breakfastMealIngrdnts = this.state.breakfastIngrdnts;
        if (method === "update") {
          breakfastMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
          this.setState({ breakfast: breakfast });
        } else if (method === "delete") {
          breakfastMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          breakfastIngrdnts: breakfastMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Snack 1":
        let snack1MealIngrdnts = this.state.snack1Ingrdnts;
        if (method === "update") {
          snack1MealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          snack1MealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          snack1Ingrdnts: snack1MealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Lunch":
        let lunch = thisMealIngrdnt.meal;
        let lunchMealIngrdnts = this.state.lunchIngrdnts;
        if (method === "update") {
          lunchMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
          this.setState({ lunch: lunch });
        } else if (method === "delete") {
          lunchMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          lunchIngrdnts: lunchMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Snack 2":
        let snack2MealIngrdnts = this.state.snack2Ingrdnts;
        if (method === "update") {
          snack2MealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          snack2MealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          snack2Ingrdnts: snack2MealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Dinner":
        let dinnerMealIngrdnts = this.state.dinnerIngrdnts;
        if (method === "update") {
          dinnerMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          dinnerMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          dinnerIngrdnts: dinnerMealIngrdnts,
        });
        this.totalAllMacros();
        break;
      case "Dessert":
        let dessertMealIngrdnts = this.state.dessertIngrdnts;
        if (method === "update") {
          dessertMealIngrdnts[thisMealIngrdntIndex] = thisMealIngrdnt;
        } else if (method === "delete") {
          dessertMealIngrdnts.splice(thisMealIngrdntIndex, 1);
        }
        this.setState({
          dessertIngrdnts: dessertMealIngrdnts,
        });
        this.totalAllMacros();
        break;
    }
    if (method === "delete") {
      axios
        .delete("http://localhost:5000/mealIngredients/" + thisMealIngrdnt._id)
        .then((response) => console.log(response));
    } else if (method === "update") {
      axios
        .put(
          "http://localhost:5000/mealIngredients/" + thisMealIngrdnt._id,
          thisMealIngrdnt
        )
        .then((response) => console.log(response));
    }
  };
  handleDeleteMeal = (thisMealType) => {
    let mealToDelete = this.state[thisMealType]["thisMeal"];
    let mealIngrdntsToDelete = this.state[thisMealType]["thisMealsIngrdnts"];
    for (let i = 0; i < mealIngrdntsToDelete.length; i++) {
      let thisMealIngrdnt = mealIngrdntsToDelete[i]._id;
      axios
        .delete("http://localhost:5000/mealIngredients/" + thisMealIngrdnt)
        .then((response) => console.log(response));
    }
    axios
      .delete("http://localhost:5000/meals/" + mealToDelete._id)
      .then((response) => console.log(response));
    let state = this.state;
    let mealDefaults = _.cloneDeep(state.mealDefaults);
    let oldMeal = _.cloneDeep(state[`${thisMealType}Old`]);
    state[thisMealType] = mealDefaults[thisMealType];
    state[thisMealType]["thisRecipesIngrdnts"] = oldMeal.thisRecipesIngrdnts;
    state[thisMealType]["thisMealsMacrosBudget"] =
      oldMeal.thisMealsMacrosBudget;
    state[`${thisMealType}Old`] = {};
    console.log(state);
    this.setState({ state });
  };
  handleClickDeleteDay = () => {
    if (
      this.state.breakfast.thisMealsIngrdnts.length === 0 &&
      this.state.snack1.thisMealsIngrdnts.length === 0 &&
      this.state.lunch.thisMealsIngrdnts.length === 0 &&
      this.state.snack2.thisMealsIngrdnts.length === 0 &&
      this.state.dinner.thisMealsIngrdnts.length === 0 &&
      this.state.dessert.thisMealsIngrdnts.length === 0
    ) {
      this.props.onDeleteDay(this.state.thisDay._id);
    } else {
      this.setState({ hideDeleteDayBarrier: false });
    }
  };
  populateNewMealIngredients = (mealType, thisRecipeId) => {
    let thisMeal = this.state[mealType]["thisMeal"];
    axios
      .get(
        "http://localhost:5000/genRecipeIngredients/thisGenRecipesGenRecipeIngredients/" +
          thisRecipeId
      )
      .then((response) => {
        const thisGenRecipesGenRecipeIngrdnts = response.data.map(
          (genRecipeIngredient) => genRecipeIngredient
        );
        let thisMealsNewMealIngrdnts = [];
        for (let i = 0; i < thisGenRecipesGenRecipeIngrdnts.length; i++) {
          let thisGenRecipeIngrdnt = thisGenRecipesGenRecipeIngrdnts[i];
          let newMealIngredient = {
            _id: "tempId-" + this.props.getRndInteger(10000000, 99999999),
            qty: thisGenRecipeIngrdnt.defaultQty,
            genRecipeIngredient: thisGenRecipeIngrdnt,
            meal: thisMeal,
          };
          thisMealsNewMealIngrdnts.push(newMealIngredient);
        }
        let state = this.state;
        state[mealType]["recordChanged"] = true;
        state[mealType]["thisMealsIngrdnts"] = thisMealsNewMealIngrdnts;
        state[mealType]["thisMealFormState"] = "editingOrig";
        this.setState({ state });
        this.fetchRecipesIngrdnts(thisMeal);
      });
  };
  handleChangeMealRecipe = (mealType, e) => {
    let thisRecipeId = e.target.value;
    axios
      .get("http://localhost:5000/genRecipes/" + thisRecipeId)
      .then((response) => {
        let thisRecipe = response.data;
        let state = this.state;
        state[mealType]["thisMeal"]["genRecipe"] = thisRecipe;
        state[mealType]["recordChanged"] = true;
        state[mealType]["userChangedThisMealsRecipe"] = true;
        state[mealType]["thisMealJustCreated"] = false;
        this.setState({ state });
        this.populateNewMealIngredients(mealType, thisRecipeId);
      });
  };
  // state[mealType]["thisMeal"]["genRecipe"] = thisGenRecipesGenRecipeIngrdnts[0].genRecipe;
  render() {
    if (this.state.data === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <React.Fragment>
          <div
            className="deleteWarning"
            hidden={this.state.hideDeleteDayBarrier}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteMealWarnLabel">
                    Cannot Delete Day with Meal Records
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning" role="alert">
                    Delete all day meals before attempting to delete the day
                    record
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ hideDeleteDayBarrier: true });
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3 mb-3">
            <div className="card-header">
              <h3 className="card-title">{this.props.thisDay.dayOfWeek}</h3>
              <EditOptions
                parentObj={"Day"}
                thisFormState={this.state.thisFormState}
                userType={this.state.userType}
                onSubmitFormChange={this.handleSubmitFormChange}
                onClickCopy={this.handleClickCopy}
                onClickEdit={this.handleClickEdit}
                onCancel={this.handleCancel}
                onDelete={this.handleClickDeleteDay}
                deleteMsg={this.state.deleteDayMsg}
              />
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull" + this.props.thisDay._id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader" + this.props.thisDay._id}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#dayAccrdn" + this.props.thisDay._id}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                  <div
                    id={"dayAccrdn" + this.props.thisDay._id}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#accordionHeader" + this.props.thisDay._id
                    }
                    data-bs-parent={"#accordionFull" + this.props.thisDay._id}
                  >
                    <div className="accordion-body">
                      <div className="macroTblCntnr">
                        <MacrosTable2
                          tableType="Day Macros"
                          macrosBudget={this.props.macrosBudget}
                          breakfastIngrdnts={
                            this.state.breakfast.thisMealsIngrdnts
                          }
                          snack1Ingrdnts={this.state.snack1.thisMealsIngrdnts}
                          lunchIngrdnts={this.state.lunch.thisMealsIngrdnts}
                          snack2Ingrdnts={this.state.snack2.thisMealsIngrdnts}
                          dinnerIngrdnts={this.state.dinner.thisMealsIngrdnts}
                          dessertIngrdnts={this.state.dessert.thisMealsIngrdnts}
                        />
                      </div>
                      <ul>
                        <li>Name:&nbsp;{this.props.thisDay.name}</li>
                        <li>
                          Day of Week:&nbsp;{this.props.thisDay.dayOfWeek}
                        </li>
                        <li>
                          Week Meal Plan:&nbsp;{this.props.weekMealPlanName}
                        </li>
                        <li>
                          Created:&nbsp;
                          {dayjs(this.props.thisDay.createdAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                        </li>
                        <li>
                          Last Updated:&nbsp;
                          {dayjs(this.props.thisDay.updatedAt).format(
                            "dddd, MMMM D, YYYY h:mm A"
                          )}
                        </li>
                      </ul>
                      <div className="card mt-3 mb-3">
                        <div className="card-header">
                          <h4 className="card-title">
                            {this.props.thisDay.dayOfWeek + " Meals"}
                          </h4>
                        </div>
                        <div className="card-body">
                          <div
                            className="accordion accordion-flush"
                            id={
                              "daysMealsAccordionFull" + this.props.thisDay._id
                            }
                          >
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id={
                                  "daysMealsAccordionHeader" +
                                  this.props.thisDay._id
                                }
                              >
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={
                                    "#mealsAccrdn" + this.props.thisDay._id
                                  }
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                ></button>
                              </h2>
                            </div>
                            <div
                              id={"mealsAccrdn" + this.props.thisDay._id}
                              className="accordion-collapse collapse show"
                              aria-labelledby={
                                "#daysMealsAccordionHeader" +
                                this.props.thisDay._id
                              }
                              data-bs-parent={
                                "#daysMealsAccordionFull" +
                                this.props.thisDay._id
                              }
                            >
                              <div className="accordion-body wkDaysAccrdnBdy">
                                {this.state.breakfast.thisMeal._id ===
                                "missing" ? (
                                  <CreateMeal2
                                    mealType={
                                      this.state.breakfast.thisMeal.mealType
                                    }
                                    thisDay={this.props.thisDay}
                                    getRndInteger={this.props.getRndInteger}
                                    onCreateMeal={this.handleCreateMeal}
                                  />
                                ) : (
                                  <MealDetail2
                                    key={this.state.breakfast.thisMeal._id}
                                    thisMeal={this.state.breakfast}
                                    userType={this.state.userType}
                                    onSubmitMealFormChange={
                                      this.handleSubmitMealFormChange
                                    }
                                    onClickEditOnMeal={
                                      this.handleClickEditOnMeal
                                    }
                                    onCancelMealEdit={this.handleCancelMealEdit}
                                    onClickEditOnGenRecipe={
                                      this.handleClickEditOnGenRecipe
                                    }
                                    onCancelGenRecipeEdit={
                                      this.handleCancelGenRecipeEdit
                                    }
                                    onDeleteMeal={this.handleDeleteMeal}
                                    thisMealOld={this.state.breakfastOld}
                                    onChangeMealRecipe={
                                      this.handleChangeMealRecipe
                                    }
                                    showChangeRecipeWarning={
                                      this.showChangeRecipeWarning
                                    }
                                    populateNewMealIngredients={
                                      this.populateNewMealIngredients
                                    }
                                    updateProp={this.updateProp}
                                    thisMealTypesGenRecipes={
                                      this.props.allBreakfastRecipes
                                    }
                                    onChangeMealDay={this.handleChangeMealDay}
                                    onChangeMealsType={
                                      this.handleChangeMealsType
                                    }
                                    allMealTypes={this.props.mealTypes}
                                    onUpdateMealIngrdntQty={
                                      this.handleUpdateMealIngrdntQty
                                    }
                                    findChangeMealIngrdntByIndex={
                                      this.findChangeMealIngrdntByIndex
                                    }
                                    allGRFUsers={this.props.allGRFUsers}
                                    allDays={this.props.allDays}
                                    // allGenRecipeIngredients={
                                    //   this.props.allGenRecipeIngredients
                                    // }
                                    thisRecipesIngrdnts={
                                      this.state.breakfast.thisRecipesIngrdnts
                                    }
                                    allMeals={this.props.allMeals}
                                    allIngredients={this.props.allIngredients}
                                    thisMealsTypesRecipes={
                                      this.props.allBreakfastRecipes
                                    }
                                    allUnitOfMeasures={
                                      this.props.allUnitOfMeasures
                                    }
                                    allWeightTypes={this.props.allWeightTypes}
                                    allBrands={this.props.allBrands}
                                  />
                                )}
                                {this.state.lunch.thisMeal._id === "missing" ? (
                                  <CreateMeal2
                                    mealType={
                                      this.state.lunch.thisMeal.mealType
                                    }
                                    thisDay={this.props.thisDay}
                                    getRndInteger={this.props.getRndInteger}
                                    onCreateMeal={this.handleCreateMeal}
                                  />
                                ) : (
                                  <MealDetail2
                                    key={this.state.lunch.thisMeal._id}
                                    thisMeal={this.state.lunch}
                                    userType={this.state.userType}
                                    onSubmitMealFormChange={
                                      this.handleSubmitMealFormChange
                                    }
                                    onClickEditOnMeal={
                                      this.handleClickEditOnMeal
                                    }
                                    onCancelMealEdit={this.handleCancelMealEdit}
                                    onClickEditOnGenRecipe={
                                      this.handleClickEditOnGenRecipe
                                    }
                                    onCancelGenRecipeEdit={
                                      this.handleCancelGenRecipeEdit
                                    }
                                    onDeleteMeal={this.handleDeleteMeal}
                                    thisMealOld={this.state.lunchOld}
                                    onChangeMealRecipe={
                                      this.handleChangeMealRecipe
                                    }
                                    showChangeRecipeWarning={
                                      this.showChangeRecipeWarning
                                    }
                                    populateNewMealIngredients={
                                      this.populateNewMealIngredients
                                    }
                                    updateProp={this.updateProp}
                                    thisMealTypesGenRecipes={
                                      this.props.allLunchRecipes
                                    }
                                    onChangeMealDay={this.handleChangeMealDay}
                                    onChangeMealsType={
                                      this.handleChangeMealsType
                                    }
                                    allMealTypes={this.props.mealTypes}
                                    onUpdateMealIngrdntQty={
                                      this.handleUpdateMealIngrdntQty
                                    }
                                    findChangeMealIngrdntByIndex={
                                      this.findChangeMealIngrdntByIndex
                                    }
                                    allGRFUsers={this.props.allGRFUsers}
                                    allDays={this.props.allDays}
                                    // allGenRecipeIngredients={
                                    //   this.props.allGenRecipeIngredients
                                    // }
                                    thisRecipesIngrdnts={
                                      this.state.lunch.thisRecipesIngrdnts
                                    }
                                    allMeals={this.props.allMeals}
                                    allIngredients={this.props.allIngredients}
                                    thisMealsTypesRecipes={
                                      this.props.allLunchRecipes
                                    }
                                    allUnitOfMeasures={
                                      this.props.allUnitOfMeasures
                                    }
                                    allWeightTypes={this.props.allWeightTypes}
                                    allBrands={this.props.allBrands}
                                  />
                                )}
                                {this.state.snack2.thisMeal._id ===
                                "missing" ? (
                                  <CreateMeal2
                                    mealType={
                                      this.state.snack2.thisMeal.mealType
                                    }
                                    thisDay={this.props.thisDay}
                                    getRndInteger={this.props.getRndInteger}
                                    onCreateMeal={this.handleCreateMeal}
                                  />
                                ) : (
                                  <MealDetail2
                                    key={this.state.snack2.thisMeal._id}
                                    thisMeal={this.state.snack2}
                                    userType={this.state.userType}
                                    onSubmitMealFormChange={
                                      this.handleSubmitMealFormChange
                                    }
                                    onClickEditOnMeal={
                                      this.handleClickEditOnMeal
                                    }
                                    onCancelMealEdit={this.handleCancelMealEdit}
                                    onClickEditOnGenRecipe={
                                      this.handleClickEditOnGenRecipe
                                    }
                                    onCancelGenRecipeEdit={
                                      this.handleCancelGenRecipeEdit
                                    }
                                    onDeleteMeal={this.handleDeleteMeal}
                                    thisMealOld={this.state.snack2Old}
                                    onChangeMealRecipe={
                                      this.handleChangeMealRecipe
                                    }
                                    showChangeRecipeWarning={
                                      this.showChangeRecipeWarning
                                    }
                                    populateNewMealIngredients={
                                      this.populateNewMealIngredients
                                    }
                                    updateProp={this.updateProp}
                                    thisMealTypesGenRecipes={
                                      this.props.allSnack2Recipes
                                    }
                                    onChangeMealDay={this.handleChangeMealDay}
                                    onChangeMealsType={
                                      this.handleChangeMealsType
                                    }
                                    allMealTypes={this.props.mealTypes}
                                    onUpdateMealIngrdntQty={
                                      this.handleUpdateMealIngrdntQty
                                    }
                                    findChangeMealIngrdntByIndex={
                                      this.findChangeMealIngrdntByIndex
                                    }
                                    allGRFUsers={this.props.allGRFUsers}
                                    allDays={this.props.allDays}
                                    // allGenRecipeIngredients={
                                    //   this.props.allGenRecipeIngredients
                                    // }
                                    thisRecipesIngrdnts={
                                      this.state.snack2.thisRecipesIngrdnts
                                    }
                                    allMeals={this.props.allMeals}
                                    allIngredients={this.props.allIngredients}
                                    thisMealsTypesRecipes={
                                      this.props.allSnack2Recipes
                                    }
                                    allUnitOfMeasures={
                                      this.props.allUnitOfMeasures
                                    }
                                    allWeightTypes={this.props.allWeightTypes}
                                    allBrands={this.props.allBrands}
                                  />
                                )}
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
        </React.Fragment>
      );
    }
  }
}
export default DayDetail;
