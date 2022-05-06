import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Day from "./Day.component";
import DayDetail from "./DayDetail.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOptions from "./EditOptions.component";
import CreateDay from "./CreateDay.component";
import DayDetail2 from "./DayDetail2.component";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.updateStateDayOnAdd = this.updateStateDayOnAdd.bind(this);

    const lifeCycleStages = [
      "viewing",
      "editingOrig",
      "editingCopy",
      "creating",
      "missing",
    ];

    this.state = {
      data: false,
      id: "",
      name: "",
      allGRFUsers: [
        { _id: "tempGRFUser1Id", handle: "tempGRFUser1Handle" },
        { _id: "tempGRFUser2Id", handle: "tempGRFUser2Handle" },
      ],
      GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
      thisWeeksDays: [],
      thisFormState: "viewing",
      userType: "admin",
      sun: {},
      mon: {},
      tues: {},
      wed: {},
      thurs: {},
      fri: {},
      sat: {},
      macrosBudget: { cals: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 },
      breakfastWeight: 0,
      snack1Weight: 0,
      lunchWeight: 0,
      snack2Weight: 0,
      dinnerWeight: 0,
      dessertWeight: 0,
      cals: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
      wmpDataHasLoaded: false,
      allGRFUsersHasLoaded: false,
      daysOfTheWMPHaveLoaded: false,
      allDays: [
        {
          _id: "tempDay1Id",
          name: "tempDayName1",
          dayOfWeek: "Sunday",
          weekMealPlan: "625b7e5a4451249a38449792",
        },
        {
          _id: "tempDay2Id",
          name: "tempDayName2",
          dayOfWeek: "Monday",
          weekMealPlan: "625b7e5a4451249a38449792",
        },
      ],
      allGenRecipes: [
        {
          _id: "tempGenRecipe1Id",
          name: "tempGenRecipe1Name",
          availableMealType: "Breakfast",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
        {
          _id: "tempGenRecipe2Id",
          name: "tempGenRecipe2Name",
          availableMealType: "Dessert",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allDaysLoaded: false,
      allBreakfastRecipes: [
        {
          _id: "tempGenRecipe1Id",
          name: "tempGenRecipe1Name",
          availableMealType: "Breakfast",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allSnack1Recipes: [
        {
          _id: "tempGenRecipe3Id",
          name: "tempGenRecipe3Name",
          availableMealType: "Snack 1",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allLunchRecipes: [
        {
          _id: "tempGenRecipe4Id",
          name: "tempGenRecipe4Name",
          availableMealType: "Lunch",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allSnack2Recipes: [
        {
          _id: "tempGenRecipe5Id",
          name: "tempGenRecipe5Name",
          availableMealType: "Snack 2",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allDinnerRecipes: [
        {
          _id: "tempGenRecipe5Id",
          name: "tempGenRecipe5Name",
          availableMealType: "Dinner",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      allDessertRecipes: [
        {
          _id: "tempGenRecipe2Id",
          name: "tempGenRecipe2Name",
          availableMealType: "Dessert",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      mealTypes: [],
      mealDefaults: {
        breakfast: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempBreakfastRecipe1Id",
              name: "tempBreakfastRecipe1Name",
              availableMealType: {
                _id: "626dd6fc21888432c0fe3e90",
                code: "breakfast",
                name: "Breakfast",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626dd6fc21888432c0fe3e90",
              code: "breakfast",
              name: "Breakfast",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempBreakfastIngredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempBreakfastRecipe1Id",
                  name: "tempBreakfastRecipe1Name",
                  availableMealType: {
                    _id: "626dd6fc21888432c0fe3e90",
                    code: "breakfast",
                    name: "Breakfast",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempBreakfastRecipe1Id",
                  name: "tempBreakfastRecipe1Name",
                  availableMealType: {
                    _id: "626dd6fc21888432c0fe3e90",
                    code: "breakfast",
                    name: "Breakfast",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
        snack1: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempSnack1Recipe1Id",
              name: "tempSnack1Recipe1Name",
              availableMealType: {
                _id: "626ddf9e21888432c0fe3e91",
                code: "snack1",
                name: "Snack 1",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626ddf9e21888432c0fe3e91",
              code: "snack1",
              name: "Snack 1",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempSnack1Ingredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempSnack1Recipe1Id",
                  name: "tempSnack1Recipe1Name",
                  availableMealType: {
                    _id: "626ddf9e21888432c0fe3e91",
                    code: "snack1",
                    name: "Snack 1",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempSnack1Recipe1Id",
                  name: "tempSnack1Recipe1Name",
                  availableMealType: {
                    _id: "626ddf9e21888432c0fe3e91",
                    code: "snack1",
                    name: "Snack 1",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
        lunch: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempLunchRecipe1Id",
              name: "tempLunchRecipe1Name",
              availableMealType: {
                _id: "626ddfb721888432c0fe3e92",
                code: "lunch",
                name: "Lunch",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626ddfb721888432c0fe3e92",
              code: "lunch",
              name: "Lunch",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempLunchIngredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempLunchRecipe1Id",
                  name: "tempLunchRecipe1Name",
                  availableMealType: {
                    _id: "626ddfb721888432c0fe3e92",
                    code: "lunch",
                    name: "Lunch",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempLunchRecipe1Id",
                  name: "tempLunchRecipe1Name",
                  availableMealType: {
                    _id: "626ddfb721888432c0fe3e92",
                    code: "lunch",
                    name: "Lunch",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
        snack2: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempSnack2Recipe1Id",
              name: "tempSnack2Recipe1Name",
              availableMealType: {
                _id: "626ddfcb21888432c0fe3e93",
                code: "snack2",
                name: "Snack 2",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626ddfcb21888432c0fe3e93",
              code: "snack2",
              name: "Snack 2",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempSnack2Ingredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempSnack2Recipe1Id",
                  name: "tempSnack2Recipe1Name",
                  availableMealType: {
                    _id: "626ddfcb21888432c0fe3e93",
                    code: "snack2",
                    name: "Snack 2",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempSnack2Recipe1Id",
                  name: "tempSnack2Recipe1Name",
                  availableMealType: {
                    _id: "626ddfcb21888432c0fe3e93",
                    code: "snack2",
                    name: "Snack 2",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
        dinner: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempDinnerRecipe1Id",
              name: "tempDinnerRecipe1Name",
              availableMealType: {
                _id: "626ddfdc21888432c0fe3e94",
                code: "dinner",
                name: "Dinner",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626ddfdc21888432c0fe3e94",
              code: "dinner",
              name: "Dinner",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempDinnerIngredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempDinnerRecipe1Id",
                  name: "tempDinnerRecipe1Name",
                  availableMealType: {
                    _id: "626ddfdc21888432c0fe3e94",
                    code: "dinner",
                    name: "Dinner",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempDinnerRecipe1Id",
                  name: "tempDinnerRecipe1Name",
                  availableMealType: {
                    _id: "626ddfdc21888432c0fe3e94",
                    code: "dinner",
                    name: "Dinner",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
        dessert: {
          thisMealJustCreated: false,
          recordChanged: false,
          userChangedThisMealsRecipe: false,
          thisMealFormState: "viewing",
          thisMeal: {
            _id: "missing",
            day: {},
            genRecipe: {
              _id: "tempDessertRecipe1Id",
              name: "tempDessertRecipe1Name",
              availableMealType: {
                _id: "626ddfee21888432c0fe3e95",
                code: "dessert",
                name: "Dessert",
              },
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
              defaultPrepInstructions: "",
              photoUrl: "",
            },
            prepInstructions: "",
            mealType: {
              _id: "626ddfee21888432c0fe3e95",
              code: "dessert",
              name: "Dessert",
            },
          },
          thisMealsIngrdnts: [
            {
              _id: "missing",
              qty: 1,
              genRecipeIngredient: {
                defaultQty: 1,
                ingredient: {
                  name: "tempDessertIngredient1Name",
                  calories: 1,
                  carbs: 1,
                  protein: 1,
                  fat: 1,
                  fiber: 1,
                  unitOfMeasure: { name: "Each" },
                  weightType: { name: "" },
                  photoURL: "",
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  brand: { name: "" },
                },
                genRecipe: {
                  _id: "tempDessertRecipe1Id",
                  name: "tempDessertRecipe1Name",
                  availableMealType: {
                    _id: "626ddfee21888432c0fe3e95",
                    code: "dessert",
                    name: "Dessert",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                defaultPrepInstructions: "",
              },
              meal: {
                _id: "missing",
                day: {},
                genRecipe: {
                  _id: "tempDessertRecipe1Id",
                  name: "tempDessertRecipe1Name",
                  availableMealType: {
                    _id: "626ddfee21888432c0fe3e95",
                    code: "dessert",
                    name: "Dessert",
                  },
                  GRFUser: {
                    _id: "62577a533813f4f21c27e1c7",
                    handle: "Service",
                  },
                  defaultPrepInstructions: "",
                  photoUrl: "",
                },
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
            },
          ],
          thisRecipesIngrdnts: [],
          thisMealsMacrosBudget: {},
        },
      },
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    this.getAllMealTypes();
    this.getAllDays();
    this.getAllRecipes();
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          GRFUser: response.data.GRFUser,
          breakfastWeight: response.data.breakfastWeight,
          snack1Weight: response.data.snack1Weight,
          lunchWeight: response.data.lunchWeight,
          snack2Weight: response.data.snack2Weight,
          dinnerWeight: response.data.dinnerWeight,
          dessertWeight: response.data.dessertWeight,
          cals: response.data.calsBudget,
          carbs: response.data.carbsBudget,
          protein: response.data.proteinBudget,
          fat: response.data.fatBudget,
          fiber: response.data.fiberBudget,
          wmpDataHasLoaded: true,
        });
      });
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          allGRFUsers: response.data.map((GRFUser) => GRFUser),
          allGRFUsersHasLoaded: true,
        });
      }
    });
    axios
      .get(
        "http://localhost:5000/days/daysofthiswmp/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          thisWeeksDays: response.data.map((day) => day),
          sun: response.data.filter((day) => day.dayOfWeek == "Sunday")[0],
          mon: response.data.filter((day) => day.dayOfWeek == "Monday")[0],
          tues: response.data.filter((day) => day.dayOfWeek == "Tuesday")[0],
          wed: response.data.filter((day) => day.dayOfWeek == "Wednesday")[0],
          thurs: response.data.filter((day) => day.dayOfWeek == "Thursday")[0],
          fri: response.data.filter((day) => day.dayOfWeek == "Friday")[0],
          sat: response.data.filter((day) => day.dayOfWeek == "Saturday")[0],
          daysOfTheWMPHaveLoaded: true,
        });
      });
  }
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  getAllMealTypes = () => {
    axios.get("http://localhost:5000/mealTypes/").then((response) => {
      this.setState({ mealTypes: response.data.map((mealType) => mealType) });
    });
  };
  getAllDays = () => {
    axios.get("http://localhost:5000/days/").then((response) => {
      this.setState({
        allDays: response.data.map((day) => day),
        allDaysLoaded: true,
      });
    });
  };
  getAllRecipes = () => {
    axios.get("http://localhost:5000/genRecipes/").then((response) => {
      this.setState({
        allGenRecipes: response.data.map((genRecipe) => genRecipe),
        //Note how the syntax for this combined setState and filter function must be EXACT or it produces an error - no extra brackets, paretheses, commas, semicolons, spaces, etc. It's fucking ridiculous
        allBreakfastRecipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "breakfast"
        ),
        allSnack1Recipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "snack1"
        ),
        allLunchRecipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "lunch"
        ),
        allSnack2Recipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "snack2"
        ),
        allDinnerRecipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "dinner"
        ),
        allDessertRecipes: response.data.filter(
          (genRecipe) => genRecipe.availableMealType.code === "dessert"
        ),
      });
    });
  };
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeGRFUser = (e) => {
    this.setState({
      GRFUser: e.target.value,
    });
  };
  onChangeBreakfastWeight = (e) => {
    this.setState({
      breakfastWeight: e.target.value,
    });
  };
  onChangeSnack1Weight = (e) => {
    this.setState({
      snack1Weight: e.target.value,
    });
  };
  onChangeLunchWeight = (e) => {
    this.setState({
      lunchWeight: e.target.value,
    });
  };
  onChangeSnack2Weight = (e) => {
    this.setState({
      snack2Weight: e.target.value,
    });
  };
  onChangeDinnerWeight = (e) => {
    this.setState({
      dinnerWeight: e.target.value,
    });
  };
  onChangeDessertWeight = (e) => {
    this.setState({
      dessertWeight: e.target.value,
    });
  };
  onChangeCalsBudget = (e) => {
    this.setState({
      cals: e.target.value,
    });
  };
  onChangeCarbsBudget = (e) => {
    this.setState({
      carbs: e.target.value,
    });
  };
  onChangeProteinBudget = (e) => {
    this.setState({
      protein: e.target.value,
    });
  };
  onChangeFatBudget = (e) => {
    this.setState({
      fat: e.target.value,
    });
  };
  onChangeFiberBudget = (e) => {
    this.setState({
      fiber: e.target.value,
    });
  };
  handleSubmitFormChange = () => {
    const weekMealPlan = {
      id: this.state.id,
      name: this.state.name,
      GRFUser: this.state.GRFUser,
      breakfastWeight: this.state.breakfastWeight,
      snack1Weight: this.state.snack1Weight,
      lunchWeight: this.state.lunchWeight,
      snack2Weight: this.state.snack2Weight,
      dinnerWeight: this.state.dinnerWeight,
      dessertWeight: this.state.dessertWeight,
      calsBudget: this.state.cals,
      carbsBudget: this.state.carbs,
      proteinBudget: this.state.protein,
      fatBudget: this.state.fat,
      fiberBudget: this.state.fiber,
    };
    axios
      .post(
        "http://localhost:5000/weekMealPlans/update/" + weekMealPlan.id,
        weekMealPlan
      )
      .then(console.log("updated"));
  };
  handleClickCopy = () => {
    console.log("Clicked Copy");
  };
  handleClickEdit = () => {
    this.setState({ thisFormState: "editingOrig" });
  };
  handleCancel = () => {
    this.setState({ thisFormState: "viewing" });
  };
  handleDeleteDay = (idOfRecordToDelete) => {
    function removeDeletedDays(eachDay) {
      return eachDay._id != idOfRecordToDelete;
    }
    axios
      .delete("http://localhost:5000/days/" + idOfRecordToDelete)
      .then(
        this.setState({
          thisWeeksDays: this.state.thisWeeksDays.filter(removeDeletedDays),
        })
      )
      .then(() => {
        this.setState({
          sun: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Sunday"
          )[0],
          mon: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Monday"
          )[0],
          tues: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Tuesday"
          )[0],
          wed: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Wednesday"
          )[0],
          thurs: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Thursday"
          )[0],
          fri: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Friday"
          )[0],
          sat: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Saturday"
          )[0],
        });
      });
  };
  updateStateDayOnAdd = (dayData, dayOfWeek) => {
    if (dayOfWeek == "Saturday") {
      this.setState({
        sat: dayData,
      });
    }
  };
  handleCreateDay = (dayOfWeek) => {
    const day = {
      dayOfWeek: dayOfWeek,
      weekMealPlan: this.state.id,
      name: this.state.name + " - " + dayOfWeek,
    };
    axios
      .post("http://localhost:5000/days/add", day)
      .then((response) => {
        this.setState({
          thisWeeksDays: this.state.thisWeeksDays.push(response.data),
        });
      })
      .then(() => {
        this.setState({
          sun: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Sunday"
          )[0],
          mon: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Monday"
          )[0],
          tues: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Tuesday"
          )[0],
          wed: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Wednesday"
          )[0],
          thurs: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Thursday"
          )[0],
          fri: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Friday"
          )[0],
          sat: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek == "Saturday"
          )[0],
        });
      });
  };
  renderDay = (dayToRender, dayOfWeek, dayOfWeekShort) => {
    if (dayToRender == undefined) {
      return (
        <CreateDay
          weekMealPlanId={this.state.id}
          weekMealPlanName={this.state.name}
          dayOfWeek={dayOfWeek}
          dayOfWeekShort={dayOfWeekShort}
          thisFormState="missing"
          onCreateDay={this.handleCreateDay}
          wmpUserType={this.state.userType}
          getRndInteger={this.getRndInteger}
        />
      );
    } else {
      return (
        <DayDetail
          thisDay={dayToRender}
          mealDefaults={this.state.mealDefaults}
          weekMealPlanName={this.state.name}
          onDeleteDay={this.handleDeleteDay}
          getRndInteger={this.getRndInteger}
          key={dayToRender._id}
          macrosBudget={{
            cals: this.state.cals,
            carbs: this.state.carbs,
            protein: this.state.protein,
            fat: this.state.fat,
            fiber: this.state.fiber,
          }}
          mealsWeighting={{
            breakfastWeight: this.state.breakfastWeight,
            snack1Weight: this.state.snack1Weight,
            lunchWeight: this.state.lunchWeight,
            snack2Weight: this.state.snack2Weight,
            dinnerWeight: this.state.dinnerWeight,
            dessertWeight: this.state.dessertWeight,
          }}
          allGRFUsers={this.state.allGRFUsers}
          allDays={this.state.allDays}
          allBreakfastRecipes={this.state.allBreakfastRecipes}
          allSnack1Recipes={this.state.allSnack1Recipes}
          allLunchRecipes={this.state.allLunchRecipes}
          allSnack2Recipes={this.state.allSnack2Recipes}
          allDinnerRecipes={this.state.allDinnerRecipes}
          allDessertRecipes={this.state.allDessertRecipes}
          mealTypes={this.state.mealTypes}
        />
      );
    }
  };
  render() {
    if (
      this.state.wmpDataHasLoaded == true &&
      this.state.allGRFUsersHasLoaded == true &&
      this.state.daysOfTheWMPHaveLoaded == true
    ) {
      return (
        <div className="container-fluid pl-4 pr-4">
          <h1>Week Meal Plan Detail</h1>
          <form>
            <div className="form-group">
              <label>Plan Name</label>
              <div className="inputRowWRightIcons">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  disabled={
                    this.state.thisFormState == "viewing" ? true : false
                  }
                />
                <EditOptions
                  parentObj={"WMP"}
                  userType={this.state.userType}
                  thisFormState={this.state.thisFormState}
                  onSubmitFormChange={this.handleSubmitFormChange}
                  onClickCopy={this.handleClickCopy}
                  onClickEdit={this.handleClickEdit}
                  onCancel={this.handleCancel}
                />
              </div>
            </div>
            <div hidden={true} className="form-group mt-2">
              <label>Author: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.GRFUser.handle}
                onChange={this.onChangeGRFUser}
              >
                {this.state.allGRFUsers.map(function (GRFUser) {
                  return (
                    <option key={GRFUser._id} value={GRFUser._id}>
                      {GRFUser.handle}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="card weekMealPlanFormCards mt-3 mb-3">
              <div className="card-header">
                <h2 className="card-title">Meal Macro Weighting</h2>
              </div>
              <div className="card-body">
                <div
                  className="accordion accordion-flush"
                  id={"accordionFull_MealMacroWeighting" + this.state.id}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_MealMacroWeighting" + this.state.id}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#dayAccrdn_MealMacroWeighting" + this.state.id
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_MealMacroWeighting" + this.state.id}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#accordionHeader_MealMacroWeighting" + this.state.id
                    }
                    data-bs-parent={
                      "#accordionFull_MealMacroWeighting" + this.state.id
                    }
                  >
                    <div className="accordion-body accrdnWeekMealPlanMacroBdy">
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Breakfast %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="35"
                          value={this.state.breakfastWeight}
                          onChange={this.onChangeBreakfastWeight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Snack 1 %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={this.state.snack1Weight}
                          onChange={this.onChangeSnack1Weight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Lunch %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="30"
                          value={this.state.lunchWeight}
                          onChange={this.onChangeLunchWeight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Snack 2 %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={this.state.snack2Weight}
                          onChange={this.onChangeSnack2Weight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Dinner %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="20"
                          value={this.state.dinnerWeight}
                          onChange={this.onChangeDinnerWeight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Dessert %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={this.state.dessertWeight}
                          onChange={this.onChangeDessertWeight}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card weekMealPlanFormCards mt-3 mb-3">
              <div className="card-header">
                <h2 className="card-title">Macro Daily Budget</h2>
              </div>
              <div className="card-body">
                <div
                  className="accordion accordion-flush"
                  id={"accordionFull_MacroBudget" + this.state.id}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_MacroBudget" + this.state.id}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#dayAccrdn_MacroBudget" + this.state.id
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_MacroBudget" + this.state.id}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#accordionHeader_MacroBudget" + this.state.id
                    }
                    data-bs-parent={
                      "#accordionFull_MacroBudget" + this.state.id
                    }
                  >
                    <div className="accordion-body accrdnWeekMealPlanMacroBdy">
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Calories (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="2000.00"
                          value={this.state.cals}
                          onChange={this.onChangeCalsBudget}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Carbs (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="400.00"
                          value={this.state.carbs}
                          onChange={this.onChangeCarbsBudget}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Protein (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="300"
                          value={this.state.protein}
                          onChange={this.onChangeProteinBudget}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Fat (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="100"
                          value={this.state.fat}
                          onChange={this.onChangeFatBudget}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Fiber (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="40"
                          value={this.state.fiber}
                          onChange={this.onChangeFiberBudget}
                          disabled={
                            this.state.thisFormState == "viewing" ? true : false
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="card mt-3 mb-3">
            <div className="card-header">
              <h2 className="card-title">Day Meal Plans</h2>
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull" + this.state.id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader" + this.state.id}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#dayAccrdn" + this.state.id}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"dayAccrdn" + this.state.id}
                  className="accordion-collapse collapse show"
                  aria-labelledby={"#accordionHeader" + this.state.id}
                  data-bs-parent={"#accordionFull" + this.state.id}
                >
                  <div className="accordion-body wkDaysAccrdnBdy">
                    {this.state.sun === undefined || this.state.sun === {} ? (
                      <CreateDay
                        weekMealPlanId={this.state.id}
                        weekMealPlanName={this.state.name}
                        dayOfWeek={"Sunday"}
                        dayOfWeekShort={"sun"}
                        thisFormState="missing"
                        onCreateDay={this.handleCreateDay}
                        wmpUserType={this.state.userType}
                        getRndInteger={this.getRndInteger}
                      />
                    ) : (
                      <DayDetail2
                        thisDay={this.state.sun}
                        mealDefaults={this.state.mealDefaults}
                        allGRFUsers={this.state.allGRFUsers}
                        allDays={this.state.allDays}
                        allBreakfastRecipes={this.state.allBreakfastRecipes}
                        allSnack1Recipes={this.state.allSnack1Recipes}
                        allLunchRecipes={this.state.allLunchRecipes}
                        allSnack2Recipes={this.state.allSnack2Recipes}
                        allDinnerRecipes={this.state.allDinnerRecipes}
                        allDessertRecipes={this.state.allDessertRecipes}
                        mealTypes={this.state.mealTypes}
                        macrosBudget={{
                          cals: this.state.cals,
                          carbs: this.state.carbs,
                          protein: this.state.protein,
                          fat: this.state.fat,
                          fiber: this.state.fiber,
                        }}
                        mealsWeighting={{
                          breakfastWeight: this.state.breakfastWeight,
                          snack1Weight: this.state.snack1Weight,
                          lunchWeight: this.state.lunchWeight,
                          snack2Weight: this.state.snack2Weight,
                          dinnerWeight: this.state.dinnerWeight,
                          dessertWeight: this.state.dessertWeight,
                        }}
                        getRndInteger={this.getRndInteger}
                      />
                    )}
                    <DayDetail2
                      thisDay={this.state.mon}
                      mealDefaults={this.state.mealDefaults}
                      allGRFUsers={this.state.allGRFUsers}
                      allDays={this.state.allDays}
                      allBreakfastRecipes={this.state.allBreakfastRecipes}
                      allSnack1Recipes={this.state.allSnack1Recipes}
                      allLunchRecipes={this.state.allLunchRecipes}
                      allSnack2Recipes={this.state.allSnack2Recipes}
                      allDinnerRecipes={this.state.allDinnerRecipes}
                      allDessertRecipes={this.state.allDessertRecipes}
                      mealTypes={this.state.mealTypes}
                      macrosBudget={{
                        cals: this.state.cals,
                        carbs: this.state.carbs,
                        protein: this.state.protein,
                        fat: this.state.fat,
                        fiber: this.state.fiber,
                      }}
                      mealsWeighting={{
                        breakfastWeight: this.state.breakfastWeight,
                        snack1Weight: this.state.snack1Weight,
                        lunchWeight: this.state.lunchWeight,
                        snack2Weight: this.state.snack2Weight,
                        dinnerWeight: this.state.dinnerWeight,
                        dessertWeight: this.state.dessertWeight,
                      }}
                      getRndInteger={this.getRndInteger}
                    />
                    <DayDetail2
                      thisDay={this.state.tues}
                      mealDefaults={this.state.mealDefaults}
                      allGRFUsers={this.state.allGRFUsers}
                      allDays={this.state.allDays}
                      allBreakfastRecipes={this.state.allBreakfastRecipes}
                      allSnack1Recipes={this.state.allSnack1Recipes}
                      allLunchRecipes={this.state.allLunchRecipes}
                      allSnack2Recipes={this.state.allSnack2Recipes}
                      allDinnerRecipes={this.state.allDinnerRecipes}
                      allDessertRecipes={this.state.allDessertRecipes}
                      mealTypes={this.state.mealTypes}
                      macrosBudget={{
                        cals: this.state.cals,
                        carbs: this.state.carbs,
                        protein: this.state.protein,
                        fat: this.state.fat,
                        fiber: this.state.fiber,
                      }}
                      mealsWeighting={{
                        breakfastWeight: this.state.breakfastWeight,
                        snack1Weight: this.state.snack1Weight,
                        lunchWeight: this.state.lunchWeight,
                        snack2Weight: this.state.snack2Weight,
                        dinnerWeight: this.state.dinnerWeight,
                        dessertWeight: this.state.dessertWeight,
                      }}
                      getRndInteger={this.getRndInteger}
                    />
                    {this.renderDay(this.state.wed, "Wednesday", "wed")}
                    {this.renderDay(this.state.thurs, "Thursday", "thurs")}
                    {this.renderDay(this.state.fri, "Friday", "fri")}
                    {this.renderDay(this.state.sat, "Saturday", "sat")}
                  </div>
                </div>
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
