import React, { Component } from "react";
import axios from "axios";
import Joi from "joi";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../services/authService";
import httpService from "../services/httpService";
import CreateDay from "./CreateDay.component";
import DayDetail from "./DayDetail.component";
import WMPForm from "./WMPForm.component";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axiosCallConfig: this.props.axiosCallConfig,
      httpRouteCore: this.props.appHTMLRoot,
      backEndHtmlRoot: this.props.backEndHtmlRoot,
      frontEndHtmlRoot: this.props.frontEndHtmlRoot,
      thisUserType: "admin",
      thisGRFUser: this.props.thisGRFUser,
      thisWeekMealPlan: {
        thisWMPJustCreated: true,
        dataLoaded: false,
        thisFormState: "viewing",
        userType: "admin",
        recordChanged: false,
        hasChildren: true,
        deleteChildrenWarning:
          "This Week Meal Plan has Days connected to it which must be deleted before you can delete the Week Meal Plan.",
        thisWMP: {
          id: this.props.match.params.id,
          name: "Temp WMP",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          breakfastWeight: 1,
          snack1Weight: 1,
          lunchWeight: 1,
          snack2Weight: 1,
          dinnerWeight: 1,
          dessertWeight: 1,
          calsBudget: 1,
          carbsBudget: 1,
          proteinBudget: 1,
          fatBudget: 1,
          fiberBudget: 1,
        },
        valErrors: {
          name: null,
          breakfastWeight: null,
          snack1Weight: null,
          lunchWeight: null,
          snack2Weight: null,
          dinnerWeight: null,
          dessertWeight: null,
          calsBudget: null,
          carbsBudget: null,
          proteinBudget: null,
          fatBudget: null,
          fiberBudget: null,
        },
      },
      daysOfWeek: [
        { _id: "6287cfcbb01c53cff0db5cd8", code: "sunday", name: "Sunday" },
        { _id: "6287d032b01c53cff0db5cd9", code: "monday", name: "Monday" },
        { _id: "6287d045b01c53cff0db5cda", code: "tuesday", name: "Tuesday" },
        {
          _id: "6287d058b01c53cff0db5cdb",
          code: "wednesday",
          name: "Wednesday",
        },
        { _id: "6287d06db01c53cff0db5cdc", code: "thursday", name: "Thursday" },
        { _id: "6287d07eb01c53cff0db5cdd", code: "friday", name: "Friday" },
        { _id: "6287d08cb01c53cff0db5cde", code: "saturday", name: "Saturday" },
      ],
      allGenRecipes: [
        {
          _id: "tempGenRecipe1Id",
          name: "tempGenRecipe1Name",
          availableMealType: {
            _id: "626dd6fc21888432c0fe3e90",
            code: "breakfast",
            name: "Breakfast",
          },
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          defaultPrepInstructions: "",
          photoUrl: "",
        },
      ],
      mealTypes: [
        {
          _id: "626dd6fc21888432c0fe3e90",
          code: "breakfast",
          name: "Breakfast",
        },
        {
          _id: "626ddf9e21888432c0fe3e91",
          code: "snack1",
          name: "Snack 1",
        },
        {
          _id: "626ddfb721888432c0fe3e92",
          code: "lunch",
          name: "Lunch",
        },
        {
          _id: "626ddfcb21888432c0fe3e93",
          code: "snack2",
          name: "Snack 2",
        },
        {
          _id: "626ddfdc21888432c0fe3e94",
          code: "dinner",
          name: "Dinner",
        },
        {
          _id: "626ddfee21888432c0fe3e95",
          code: "dessert",
          name: "Dessert",
        },
      ],
      allGenRecipeIngredients: [
        {
          _id: "tempGenRecipeIngredientId1",
          defaultQty: 1,
          ingredient: {
            _id: "tempIngredientId1",
            name: "Temp Ingredient 1 Name",
            calories: 1,
            carbs: 1,
            protein: 1,
            fat: 1,
            fiber: 1,
            unitOfMeasure: {
              name: "Each",
              GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            },
            photoURL: "",
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          },
          genRecipe: {
            _id: "tempGenRecipe1Id",
            name: "tempGenRecipe1Name",
            availableMealType: {
              _id: "626dd6fc21888432c0fe3e90",
              code: "breakfast",
              name: "Breakfast",
            },
            GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
            defaultPrepInstructions: "",
            photoUrl: "",
          },
        },
      ],
      allUnitOfMeasures: [
        {
          _id: "tempUnitOfMeasureId1",
          name: "Each",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
      ],
      allWeightTypes: [
        {
          _id: "tempWeightTypeId1",
          name: "Raw",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
      ],
      allBrands: [
        {
          _id: "tempBrandId1",
          name: "Kraft",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
      ],
      thisWeeksDays: {
        sunday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          recordChanged: false,
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Sunday",
            dayOfWeek: {
              _id: "6287cfcbb01c53cff0db5cd8",
              code: "sunday",
              name: "Sunday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "Temp WMP - Sunday",
                  dayOfWeek: {
                    _id: "6287cfcbb01c53cff0db5cd8",
                    code: "sunday",
                    name: "Sunday",
                  },
                  weekMealPlan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "Temp WMP - Sunday",
                        dayOfWeek: {
                          _id: "6287cfcbb01c53cff0db5cd8",
                          code: "sunday",
                          name: "Sunday",
                        },
                        weekMealPlan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        monday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Monday",
            dayOfWeek: {
              _id: "6287d032b01c53cff0db5cd9",
              code: "monday",
              name: "Monday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - monday",
                  dayOfWeek: {
                    _id: "6287d032b01c53cff0db5cd9",
                    code: "monday",
                    name: "Monday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - monday",
                        dayOfWeek: {
                          _id: "6287d032b01c53cff0db5cd9",
                          code: "monday",
                          name: "Monday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        tuesday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Tuesday",
            dayOfWeek: {
              _id: "6287d045b01c53cff0db5cda",
              code: "tuesday",
              name: "Tuesday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - tuesday",
                  dayOfWeek: {
                    _id: "6287d045b01c53cff0db5cda",
                    code: "tuesday",
                    name: "Tuesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - tuesday",
                        dayOfWeek: {
                          _id: "6287d045b01c53cff0db5cda",
                          code: "tuesday",
                          name: "Tuesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        wednesday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Wednesday",
            dayOfWeek: {
              _id: "6287d058b01c53cff0db5cdb",
              code: "wednesday",
              name: "Wednesday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - wednesday",
                  dayOfWeek: {
                    _id: "6287d058b01c53cff0db5cdb",
                    code: "wednesday",
                    name: "Wednesday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - wednesday",
                        dayOfWeek: {
                          _id: "6287d058b01c53cff0db5cdb",
                          code: "wednesday",
                          name: "Wednesday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        thursday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Thursday",
            dayOfWeek: {
              _id: "6287d06db01c53cff0db5cdc",
              code: "thursday",
              name: "Thursday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - thursday",
                  dayOfWeek: {
                    _id: "6287d06db01c53cff0db5cdc",
                    code: "thursday",
                    name: "Thursday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - thursday",
                        dayOfWeek: {
                          _id: "6287d06db01c53cff0db5cdc",
                          code: "thursday",
                          name: "Thursday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        friday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Friday",
            dayOfWeek: {
              _id: "6287d07eb01c53cff0db5cdd",
              code: "friday",
              name: "Friday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - friday",
                  dayOfWeek: {
                    _id: "6287d07eb01c53cff0db5cdd",
                    code: "friday",
                    name: "Friday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - friday",
                        dayOfWeek: {
                          _id: "6287d07eb01c53cff0db5cdd",
                          code: "friday",
                          name: "Friday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
        saturday: {
          dataLoaded: false,
          thisFormState: "viewing",
          userType: "admin",
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Saturday",
            dayOfWeek: {
              _id: "6287d08cb01c53cff0db5cde",
              code: "saturday",
              name: "Saturday",
            },
            weekMealPlan: {},
          },
          thisDaysMeals: {
            breakfast: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626dd6fc21888432c0fe3e90",
                  code: "breakfast",
                  name: "Breakfast",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626dd6fc21888432c0fe3e90",
                        code: "breakfast",
                        name: "Breakfast",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack1: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddf9e21888432c0fe3e91",
                  code: "snack1",
                  name: "Snack 1",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddf9e21888432c0fe3e91",
                        code: "snack1",
                        name: "Snack 1",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisMealIngrdnt: {
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
                },
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            lunch: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfb721888432c0fe3e92",
                  code: "lunch",
                  name: "Lunch",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfb721888432c0fe3e92",
                        code: "lunch",
                        name: "Lunch",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            snack2: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfcb21888432c0fe3e93",
                  code: "snack2",
                  name: "Snack 2",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfcb21888432c0fe3e93",
                        code: "snack2",
                        name: "Snack 2",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dinner: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfdc21888432c0fe3e94",
                  code: "dinner",
                  name: "Dinner",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfdc21888432c0fe3e94",
                        code: "dinner",
                        name: "Dinner",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
            dessert: {
              dataLoaded: false,
              mealIngrdntsLoaded: false,
              thisMealJustCreated: false,
              mealRecordChanged: false,
              genRecipeRecordChanged: false,
              userChangedThisMealsRecipe: false,
              thisMealFormState: "viewing",
              thisMealUserType: "admin",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "admin",
              thisMeal: {
                _id: "missing",
                day: {
                  _id: "missing",
                  name: "temp wmp - saturday",
                  dayOfWeek: {
                    _id: "6287d08cb01c53cff0db5cde",
                    code: "saturday",
                    name: "Saturday",
                  },
                  weekmealplan: {},
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
                prepInstructions: "",
                mealType: {
                  _id: "626ddfee21888432c0fe3e95",
                  code: "dessert",
                  name: "Dessert",
                },
              },
              thisMealsIngrdnts: [
                {
                  thisGenRecipeIngrdntJustCreated: false,
                  thisIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                  thisMealIngrdnt: {
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
                      day: {
                        _id: "missing",
                        name: "temp wmp - saturday",
                        dayOfWeek: {
                          _id: "6287d08cb01c53cff0db5cde",
                          code: "saturday",
                          name: "Saturday",
                        },
                        weekmealplan: {},
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
                      prepInstructions: "",
                      mealType: {
                        _id: "626ddfee21888432c0fe3e95",
                        code: "dessert",
                        name: "Dessert",
                      },
                    },
                  },
                },
              ],
              thisRecipesIngrdnts: [
                {
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
              ],
              thisMealsMacrosBudget: {},
              genRecipeValErrors: {
                name: null,
                defaultPrepInstructions: null,
                photoUrl: null,
              },
            },
          },
        },
      },
      thisWeekMealPlanOld: {
        thisWMP: {
          name: "",
        },
      },
      thisWeeksDaysOld: {
        sunday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        monday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        tuesday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        wednesday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        thursday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        friday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        saturday: {
          thisDaysMeals: {
            breakfast: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack1: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            lunch: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            snack2: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dinner: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
            dessert: {
              thisMealsIngrdnts: [
                {
                  thisMealIngrdnt: {
                    genRecipeIngredient: {
                      ingredient: {
                        name: "",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    };
  }
  valSchema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
    floatPercent: Joi.number().min(0).max(100).required(),
    float: Joi.number().min(0).max(9999.99).required(),
    //string is the only primitive in Joi that doesn't allow an empty value. That's why you explicitly have to allow empty strings like this: Joi.string().allow("").
    textBox: Joi.string().trim().max(3000).allow(""),
    url: Joi.string().trim().uri().max(3000).allow(""),
  });
  validateProp = (propName, value, propTypeForVal) => {
    if (propTypeForVal !== "objRef") {
      const rule = this.valSchema.extract(propTypeForVal);
      const subSchema = Joi.object({ [propName]: rule });
      const objToValidate = { [propName]: value };
      const { error } = subSchema.validate(objToValidate);
      return error ? error.details[0].message : null;
    } else return null;
  };
  handleUpdateWeights = (weightsObj, e) => {
    e.preventDefault();
    let state = this.state;
    let thisWeekMealPlan = state.thisWeekMealPlan;
    let thisWMP = thisWeekMealPlan.thisWMP;
    thisWMP.breakfastWeight = weightsObj.breakfast;
    thisWMP.snack1Weight = weightsObj.snack1;
    thisWMP.lunchWeight = weightsObj.lunch;
    thisWMP.snack2Weight = weightsObj.snack2;
    thisWMP.dinnerWeight = weightsObj.dinner;
    thisWMP.dessertWeight = weightsObj.dessert;
    thisWeekMealPlan.thisWMP = thisWMP;
    thisWeekMealPlan.recordChanged = true;
    state.thisWeekMealPlan = thisWeekMealPlan;
    this.setState(state);
  };
  handleCopyWMP = () => {
    const pattern = /missing/;
    const newWMP = _.pick(this.state.thisWeekMealPlan.thisWMP, [
      "name",
      "breakfastWeight",
      "snack1Weight",
      "lunchWeight",
      "snack2Weight",
      "dinnerWeight",
      "dessertWeight",
      "calsBudget",
      "carbsBudget",
      "proteinBudget",
      "fatBudget",
      "fiberBudget",
    ]);
    newWMP.GRFUser = this.state.thisGRFUser;
    newWMP.name = `${this.state.thisGRFUser.handle}s copy of ${this.state.thisWeekMealPlan.thisWMP.name}`;
    const newWMPToSave = _.cloneDeep(newWMP);
    newWMPToSave.GRFUser = newWMP.GRFUser._id;
    axios
      .post("http://localhost:5000/weekMealPlans/add", newWMPToSave)
      .then((response) => {
        newWMP._id = response.data._id;
        let numOfDays = 7;
        let numOfMeals = 42;
        let numOfMealIngrdnts = 0;
        for (let i = 0; i < this.state.daysOfWeek.length; i++) {
          let thisDayOfWeek = this.state.daysOfWeek[i];
          let thisDay = this.state.thisWeeksDays[thisDayOfWeek.code]["thisDay"];
          let thisDayId = thisDay._id;
          let testResult = pattern.test(thisDayId);
          if (!testResult) {
            const newDay = {
              name: newWMP.name + " - " + thisDayOfWeek.name,
              dayOfWeek: thisDayOfWeek,
              weekMealPlan: newWMP,
            };
            const newDayToSave = {
              name: newDay.name,
              dayOfWeek: thisDayOfWeek._id,
              weekMealPlan: newWMP._id,
            };
            axios
              .post("http://localhost:5000/days/add", newDayToSave)
              .then((response) => {
                numOfDays--;
                newDay._id = response.data._id;
                for (let i = 0; i < this.state.mealTypes.length; i++) {
                  let thisMealType = this.state.mealTypes[i];
                  let thisMealStateObj =
                    this.state.thisWeeksDays[thisDayOfWeek.code][
                      "thisDaysMeals"
                    ][thisMealType.code];
                  let thisMeal = thisMealStateObj.thisMeal;
                  let thisMealId = thisMeal._id;
                  let testResult = pattern.test(thisMealId);
                  if (!testResult) {
                    const newMeal = {
                      day: newDay,
                      genRecipe: thisMeal.genRecipe,
                      prepInstructions: "",
                      mealType: thisMealType,
                    };
                    const newMealToSave = {
                      day: newDay._id,
                      genRecipe: thisMeal.genRecipe._id,
                      prepInstructions: "",
                      mealType: thisMealType._id,
                    };
                    axios
                      .post("http://localhost:5000/meals/add", newMealToSave)
                      .then((response) => {
                        newMeal._id = response.data._id;
                        let mealIngrdntsLength =
                          thisMealStateObj.thisMealsIngrdnts.length;
                        numOfMealIngrdnts += mealIngrdntsLength;
                        if (numOfMealIngrdnts === 0) {
                          numOfMeals--;
                          if (
                            numOfDays === 0 &&
                            numOfMeals === 0 &&
                            numOfMealIngrdnts === 0
                          ) {
                            window.location =
                              "/weekMealPlans/edit/" + newWMP._id;
                          }
                        } else {
                          numOfMeals--;
                          for (let i = 0; i < mealIngrdntsLength; i++) {
                            let thisMealIngrdnt =
                              thisMealStateObj.thisMealsIngrdnts[i]
                                .thisMealIngrdnt;
                            const newMealIngrdnt = _.pick(thisMealIngrdnt, [
                              "qty",
                              "genRecipeIngredient",
                            ]);
                            newMealIngrdnt.meal = newMeal;
                            const newMealIngrdntToSave = {
                              qty: newMealIngrdnt.qty,
                              genRecipeIngredient:
                                newMealIngrdnt.genRecipeIngredient._id,
                              meal: newMealIngrdnt.meal._id,
                            };
                            axios
                              .post(
                                "http://localhost:5000/mealIngredients/add",
                                newMealIngrdntToSave
                              )
                              .then((response) => {
                                newMealIngrdnt._id = response.data._id;
                                numOfMealIngrdnts--;
                                if (
                                  numOfDays === 0 &&
                                  numOfMeals === 0 &&
                                  numOfMealIngrdnts === 0
                                ) {
                                  window.location =
                                    "/weekMealPlans/edit/" + newWMP._id;
                                }
                              });
                          }
                        }
                      });
                  } else {
                    numOfMeals--;
                    if (
                      numOfDays === 0 &&
                      numOfMeals === 0 &&
                      numOfMealIngrdnts === 0
                    ) {
                      window.location = "/weekMealPlans/edit/" + newWMP._id;
                    }
                  }
                }
              });
          } else {
            numOfMeals -= 6;
            numOfDays--;
            if (
              numOfDays === 0 &&
              numOfMeals === 0 &&
              numOfMealIngrdnts === 0
            ) {
              window.location = "/weekMealPlans/edit/" + newWMP._id;
            }
          }
        }
      });
  };
  componentDidMount() {
    let thisGRFUser = authService.getCurrentUser();
    let daysOfWeek = this.state.daysOfWeek;
    let mealTypes = this.state.mealTypes;
    let thisWeeksDays = this.state.thisWeeksDays;
    for (let i = 0; i < daysOfWeek.length; i++) {
      let thisDayCode = daysOfWeek[i].code;
      thisWeeksDays[thisDayCode]["thisDay"]["_id"] =
        "missing" + this.getRndInteger(10000000, 99999999);
      for (let i = 0; i < mealTypes.length; i++) {
        let thisMealTypeCode = mealTypes[i].code;
        thisWeeksDays[thisDayCode]["thisDaysMeals"][thisMealTypeCode][
          "thisMeal"
        ]["_id"] = "missing" + this.getRndInteger(10000000, 99999999);
      }
    }
    this.setState({
      thisWeeksDays: thisWeeksDays,
      thisGRFUser: thisGRFUser.currentGRFUser,
    });
    this.loadData();
  }
  loadData() {
    this.getThisWeekMealPlan();
    this.getAllRecipes();
    this.getAllUnitOfMeasures();
    this.getAllWeightTypes();
    this.getAllBrands();
  }
  setUserType = (thisUsersId, thisObjAuthorId) => {
    if (thisObjAuthorId === thisUsersId) {
      return "author";
    } else {
      return "viewer";
    }
  };
  getThisWeekMealPlan = () => {
    let wmpIsNew = this.props.match.params.isNewWMP;
    let thisWMPJustCreated;
    if (wmpIsNew === undefined) {
      thisWMPJustCreated = false;
    } else {
      thisWMPJustCreated = true;
    }
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        let state = this.state;
        let thisWeekMealPlan = state.thisWeekMealPlan;
        thisWeekMealPlan.thisWMP = response.data;
        let userType = this.setUserType(
          this.state.thisGRFUser._id,
          thisWeekMealPlan.thisWMP.GRFUser._id
        );
        thisWeekMealPlan.userType = userType;
        thisWeekMealPlan.thisWMPJustCreated = thisWMPJustCreated;
        thisWeekMealPlan.dataLoaded = true;
        this.getThisWMPsDays(state);
      });
  };
  getThisWMPsDays = (state) => {
    axios
      .get(
        "http://localhost:5000/days/daysofthiswmp/" + this.props.match.params.id
      )
      .then((response) => {
        let daysData = response.data;
        let daysOfWeek = state.daysOfWeek;
        let thisWeeksDays = state.thisWeeksDays;
        for (let i = 0; i < daysOfWeek.length; i++) {
          let thisDayOfWeek = daysOfWeek[i];
          let thisWeekDayData = daysData.filter(
            (day) => day.dayOfWeek._id === thisDayOfWeek._id
          )[0];
          let thisDayToUpdate = thisWeeksDays[thisDayOfWeek.code];
          thisDayToUpdate.dataLoaded = true;
          if (thisWeekDayData) {
            thisDayToUpdate.thisDay = thisWeekDayData;
            let userType = this.setUserType(
              state.thisGRFUser._id,
              thisWeekDayData.weekMealPlan.GRFUser._id
            );
            thisDayToUpdate.userType = userType;
            this.getDayMeals(thisDayToUpdate, thisDayOfWeek.code);
          } else {
          }
          thisWeeksDays[thisDayOfWeek.code] = thisDayToUpdate;
        }
        let thisWMPStateObj = state.thisWeekMealPlan;
        if (thisWMPStateObj.thisWMPJustCreated === true) {
          this.handleClickEditForm(thisWMPStateObj, "weekMealPlan");
        }
        this.setState({
          thisWeeksDays: thisWeeksDays,
        });
      });
  };
  getDayMeals = (thisDayToUpdate, thisDayOfWeekCode) => {
    let thisDaysId = thisDayToUpdate.thisDay._id;
    axios
      .get("http://localhost:5000/meals/mealsofthisday/" + thisDaysId)
      .then((response) => {
        let mealsData = response.data;
        let mealTypes = this.state.mealTypes;
        let thisDaysMeals = thisDayToUpdate.thisDaysMeals;
        let thisWeeksDays = this.state.thisWeeksDays;
        for (let i = 0; i < mealTypes.length; i++) {
          let thisMealTypeCode = mealTypes[i].code;
          let thisDayMealData = mealsData.filter(
            (meal) => meal.mealType.code === thisMealTypeCode
          )[0];
          if (thisDayMealData !== undefined) {
            let thisRecipeId = thisDayMealData.genRecipe._id;
            axios
              .get(
                this.state.backEndHtmlRoot +
                  "genRecipeIngredients/thisGenRecipesGenRecipeIngredients/" +
                  thisRecipeId
              )
              .then((response) => {
                let thisMealsRecipesIngrdnts = response.data;
                thisDaysMeals[thisMealTypeCode]["thisRecipesIngrdnts"] =
                  thisMealsRecipesIngrdnts;
                thisDaysMeals[thisMealTypeCode]["thisMeal"] = thisDayMealData;
                let mealUserType = this.setUserType(
                  this.state.thisGRFUser._id,
                  thisDayMealData.day.weekMealPlan.GRFUser._id
                );
                thisDaysMeals[thisMealTypeCode]["thisMealUserType"] =
                  mealUserType;
                let genRecipeUserType = this.setUserType(
                  this.state.thisGRFUser._id,
                  thisDayMealData.genRecipe.GRFUser._id
                );
                thisDaysMeals[thisMealTypeCode]["thisGenRecipeUserType"] =
                  genRecipeUserType;
                thisDaysMeals[thisMealTypeCode]["dataLoaded"] = true;
                this.getMealIngrdnts(
                  thisDaysMeals[thisMealTypeCode],
                  thisDayOfWeekCode,
                  thisMealTypeCode
                );
              });
          } else {
            thisDaysMeals[thisMealTypeCode]["thisMeal"]["day"] =
              thisDayToUpdate.thisDay;
          }
          thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"] = thisDaysMeals;
        }
        this.setState({ thisWeeksDays: thisWeeksDays });
      });
  };
  getMealIngrdnts = (thisMealToUpdate, thisDayOfWeekCode, thisMealTypeCode) => {
    let thisGenRecipesId = thisMealToUpdate.thisMeal.genRecipe._id;
    axios
      .get(
        "http://localhost:5000/genRecipeIngredients/thisGenRecipesGenRecipeIngredients/" +
          thisGenRecipesId
      )
      .then((response) => {
        let recipesIngrdntsData = response.data;
        let thisWeeksDays = this.state.thisWeeksDays;
        thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][thisMealTypeCode][
          "thisRecipesIngrdnts"
        ] = recipesIngrdntsData;
        this.setState({ thisWeeksDays: thisWeeksDays });
      });
    let thisMealsId = thisMealToUpdate.thisMeal._id;
    axios
      .get(
        "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
          thisMealsId
      )
      .then((response) => {
        let mealIngrdntData = response.data;
        let thisMealsIngrdnts = [];
        for (let i = 0; i < mealIngrdntData.length; i++) {
          let thisMealIngrdntUserType = this.setUserType(
            this.state.thisGRFUser._id,
            mealIngrdntData[i].meal.day.weekMealPlan.GRFUser._id
          );
          let thisGenRecipeIngrdntUserType = this.setUserType(
            this.state.thisGRFUser._id,
            mealIngrdntData[i].genRecipeIngredient.genRecipe.GRFUser._id
          );
          let thisIngrdntUserType = this.setUserType(
            this.state.thisGRFUser._id,
            mealIngrdntData[i].genRecipeIngredient.ingredient.GRFUser._id
          );
          let thisMealIngrdnt = {
            thisGenRecipeIngrdntJustCreated: false,
            thisIngrdntJustCreated: false,
            mealIngrdntRecordChanged: false,
            genRecipeIngrdntRecordChanged: false,
            ingredientRecordChanged: false,
            thisMealIngrdntFormState: "viewing",
            thisMealIngrdntUserType: thisMealIngrdntUserType,
            thisGenRecipeIngrdntFormState: "viewing",
            thisGenRecipeIngrdntUserType: thisGenRecipeIngrdntUserType,
            thisIngrdntFormState: "viewing",
            thisIngrdntUserType: thisIngrdntUserType,
            mealIngrdntValErrors: {
              qty: null,
            },
            genRecipeIngrdntValErrors: {
              defaultQty: null,
            },
            ingredientValErrors: {
              name: null,
              calories: null,
              carbs: null,
              protein: null,
              fat: null,
              fiber: null,
              photoURL: null,
            },
            thisMealIngrdnt: mealIngrdntData[i],
          };
          thisMealsIngrdnts.push(thisMealIngrdnt);
        }
        thisMealToUpdate.thisMealsIngrdnts = thisMealsIngrdnts;
        let thisWeeksDays = this.state.thisWeeksDays;
        thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][thisMealTypeCode][
          "thisMealsIngrdnts"
        ] = thisMealsIngrdnts;
        thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][thisMealTypeCode][
          "mealIngrdntsLoaded"
        ] = true;
        this.setState({ thisWeeksDays });
      });
  };
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  getAllRecipes = () => {
    axios.get("http://localhost:5000/genRecipes/").then((response) => {
      this.setState({
        allGenRecipes: response.data.map((genRecipe) => genRecipe),
      });
    });
  };
  getAllGenRecipeIngredients = () => {
    axios
      .get("http://localhost:5000/genRecipeIngredients/")
      .then((response) => {
        this.setState({
          allGenRecipeIngredients: response.data.map(
            (genRecipeIngredient) => genRecipeIngredient
          ),
        });
      });
  };
  getAllUnitOfMeasures = () => {
    axios.get("http://localhost:5000/unitOfMeasures/").then((response) => {
      this.setState({
        allUnitOfMeasures: response.data.map((unitOfMeasure) => unitOfMeasure),
      });
    });
  };
  getAllWeightTypes = () => {
    axios.get("http://localhost:5000/weightTypes/").then((response) => {
      this.setState({
        allWeightTypes: response.data.map((weightType) => weightType),
      });
    });
  };
  getAllBrands = () => {
    axios.get("http://localhost:5000/brands/").then((response) => {
      let allBrands = response.data.map((brand) => brand);
      this.setState({
        allBrands: allBrands,
      });
    });
  };
  handleClickEditForm = (parentObj, objType) => {
    let state = this.state;
    let thisWMPBackup = _.cloneDeep(state.thisWeekMealPlan);
    let thisWeeksDaysBackup = _.cloneDeep(state.thisWeeksDays);
    state.thisWeekMealPlan.userType = "viewer";
    state.thisWeekMealPlan.thisFormState = "viewing";
    let initialUserType;
    let thisDayOfWeekCode;
    let thisMealTypeCode;
    let mealIngrdntsArrayIndex;
    switch (objType) {
      case "weekMealPlan":
        initialUserType = thisWMPBackup.userType;
        break;
      case "day":
        thisDayOfWeekCode = parentObj.thisDay.dayOfWeek.code;
        initialUserType = thisWeeksDaysBackup[thisDayOfWeekCode]["userType"];
        break;
      case "meal":
        thisDayOfWeekCode = parentObj.thisMeal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMeal.mealType.code;
        thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealJustCreated"] = false;
        thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["mealRecordChanged"] = false;
        initialUserType =
          thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealUserType"];
        break;
      case "genRecipe":
        thisDayOfWeekCode = parentObj.thisMeal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMeal.mealType.code;
        initialUserType =
          thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisGenRecipeUserType"];
        break;
      case "mealIngredient":
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngrdntsArrayIndex = parentObj.mealIngrdntsArrayIndex;
        initialUserType =
          thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
            "thisMealIngrdntUserType"
          ];
        break;
      case "genRecipeIngredient":
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngrdntsArrayIndex = parentObj.mealIngrdntsArrayIndex;
        initialUserType =
          thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
            "thisGenRecipeIngrdntUserType"
          ];
        break;
      case "ingredient":
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngrdntsArrayIndex = parentObj.mealIngrdntsArrayIndex;
        initialUserType =
          thisWeeksDaysBackup[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex]["thisIngrdntUserType"];
        break;
    }
    for (let i = 0; i < state.daysOfWeek.length; i++) {
      let dayOfWeekCode = state.daysOfWeek[i].code;
      state.thisWeeksDays[dayOfWeekCode]["userType"] = "viewer";
      state.thisWeeksDays[dayOfWeekCode]["thisFormState"] = "viewing";
      for (let i = 0; i < state.mealTypes.length; i++) {
        let mealTypeCode = state.mealTypes[i].code;
        let thisDayMeal =
          state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode];
        thisDayMeal["thisMealUserType"] = "viewer";
        thisDayMeal["thisGenRecipeUserType"] = "viewer";
        thisDayMeal["thisMealFormState"] = "viewing";
        thisDayMeal["thisGenRecipeFormState"] = "viewing";
        for (let i = 0; i < thisDayMeal.thisMealsIngrdnts.length; i++) {
          let thisMealIngrdnt = thisDayMeal.thisMealsIngrdnts[i];
          thisMealIngrdnt.thisMealIngrdntFormState = "viewing";
          thisMealIngrdnt.thisMealIngrdntUserType = "viewer";
          thisMealIngrdnt.thisGenRecipeIngrdntFormState = "viewing";
          thisMealIngrdnt.thisGenRecipeIngrdntUserType = "viewer";
          thisMealIngrdnt.thisIngrdntFormState = "viewing";
          thisMealIngrdnt.thisIngrdntUserType = "viewer";
          thisDayMeal.thisMealsIngrdnts[i] = thisMealIngrdnt;
        }
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode] =
          thisDayMeal;
      }
    }
    switch (objType) {
      case "weekMealPlan":
        state.thisWeekMealPlan.userType = initialUserType;
        state.thisWeekMealPlan.thisFormState = "editingOrig";
        break;
      case "day":
        state.thisWeeksDays[thisDayOfWeekCode]["userType"] = initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisFormState"] = "editingOrig";
        break;
      case "meal":
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealUserType"] = initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealFormState"] = "editingOrig";
        break;
      case "genRecipe":
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisGenRecipeUserType"] = initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisGenRecipeFormState"] = "editingOrig";
        break;
      case "mealIngredient":
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
          "thisMealIngrdntUserType"
        ] = initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
          "thisMealIngrdntFormState"
        ] = "editingOrig";
        break;
      case "genRecipeIngredient":
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
          "genRecipeIngrdntUserType"
        ] = initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex][
          "thisGenRecipeIngrdntFormState"
        ] = "editingOrig";
        break;
      case "ingredient":
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex]["thisIngrdntUserType"] =
          initialUserType;
        state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
          thisMealTypeCode
        ]["thisMealsIngrdnts"][mealIngrdntsArrayIndex]["thisIngrdntFormState"] =
          "editingOrig";
        break;
    }
    state.thisWeekMealPlanOld = thisWMPBackup;
    state.thisWeeksDaysOld = thisWeeksDaysBackup;
    this.setState(state);
  };
  handleCancelEditForm = () => {
    let state = this.state;
    let thisWMPBackup = _.cloneDeep(state.thisWeekMealPlanOld);
    let thisWeeksDaysBackup = _.cloneDeep(state.thisWeeksDaysOld);
    state.thisWeekMealPlan = thisWMPBackup;
    state.thisWeekMealPlan.thisWMPJustCreated = false;
    state.thisWeeksDays = thisWeeksDaysBackup;
    state.thisWeekMealPlanOld = {
      thisWMP: {
        name: "",
      },
    };
    state.thisWeeksDaysOld = {
      sunday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      monday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      tuesday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      wednesday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      thursday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      friday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
      saturday: {
        thisDaysMeals: {
          breakfast: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack1: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          lunch: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          snack2: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dinner: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
          dessert: {
            thisMealsIngrdnts: [
              {
                thisMealIngrdnt: {
                  genRecipeIngredient: {
                    ingredient: {
                      name: "",
                    },
                  },
                },
              },
            ],
          },
        },
      },
    };
    this.setState(state);
  };
  hndleSetVwrTypsAndFrmStates = (scenario, stateObj) => {
    let state = stateObj;
    let thisUsersId = state.thisGRFUser._id;
    let thisWeekMealPlan = state.thisWeekMealPlan;
    thisWeekMealPlan.thisWMPJustCreated = false;
    let thisWMP = thisWeekMealPlan.thisWMP;
    let thisWeeksDays = state.thisWeeksDays;
    thisWeekMealPlan.userType = this.setUserType(
      thisUsersId,
      thisWMP.GRFUser._id
    );
    thisWeekMealPlan.thisFormState = "viewing";
    thisWeekMealPlan.recordChanged = false;
    let daysOfWeek = state.daysOfWeek;
    let mealTypes = state.mealTypes;
    for (let i = 0; i < daysOfWeek.length; i++) {
      let dayOfWeekCode = daysOfWeek[i].code;
      let dayUserId = thisWMP.GRFUser._id;
      let initialDayUserType = this.setUserType(thisUsersId, dayUserId);
      if (scenario === "newMealOrIngrdnt") {
        thisWeeksDays[dayOfWeekCode]["userType"] = "viewer";
      } else {
        thisWeeksDays[dayOfWeekCode]["userType"] = initialDayUserType;
      }
      thisWeeksDays[dayOfWeekCode]["thisFormState"] = "viewing";
      for (let i = 0; i < mealTypes.length; i++) {
        let mealTypeCode = mealTypes[i].code;
        let thisDayMeal =
          thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode];
        let initialMealUserType = initialDayUserType;
        let thisGenRecipeUserId =
          thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
            "thisMeal"
          ]["genRecipe"]["GRFUser"]["_id"];
        let initialGenRecipeUserType = this.setUserType(
          thisUsersId,
          thisGenRecipeUserId
        );
        if (scenario === "newMealOrIngrdnt") {
          thisDayMeal["thisMealUserType"] = "viewer";
          thisDayMeal["thisGenRecipeUserType"] = "viewer";
        } else {
          thisDayMeal["thisMealUserType"] = initialMealUserType;
          thisDayMeal["thisGenRecipeUserType"] = initialGenRecipeUserType;
          thisDayMeal["mealRecordChanged"] = false;
          thisDayMeal["genRecipeRecordChanged"] = false;
        }
        thisDayMeal["thisMealFormState"] = "viewing";
        thisDayMeal["thisGenRecipeFormState"] = "viewing";
        if (thisDayMeal.thisMealsIngrdnts.length > 0) {
          for (let i = 0; i < thisDayMeal.thisMealsIngrdnts.length; i++) {
            let thisMealIngrdnt = thisDayMeal.thisMealsIngrdnts[i];
            let initialMealIngrdntUserType = initialMealUserType;
            let initialGenRecipeIngrdntUserType = initialGenRecipeUserType;
            let thisIngrdntUserId =
              thisMealIngrdnt.thisMealIngrdnt.genRecipeIngredient.ingredient
                .GRFUser._id;
            let initialIngrdntUserType = this.setUserType(
              thisUsersId,
              thisIngrdntUserId
            );
            if (scenario === "newMealOrIngrdnt") {
              thisMealIngrdnt.thisMealIngrdntUserType = "viewer";
              thisMealIngrdnt.thisGenRecipeIngrdntUserType = "viewer";
              thisMealIngrdnt.thisIngrdntUserType = "viewer";
            } else {
              thisMealIngrdnt.thisMealIngrdntUserType =
                initialMealIngrdntUserType;
              thisMealIngrdnt.thisGenRecipeIngrdntUserType =
                initialGenRecipeIngrdntUserType;
              thisMealIngrdnt.thisIngrdntUserType = initialIngrdntUserType;
            }
            thisMealIngrdnt.thisMealIngrdntFormState = "viewing";
            thisMealIngrdnt.thisGenRecipeIngrdntFormState = "viewing";
            thisMealIngrdnt.thisIngrdntFormState = "viewing";
            thisMealIngrdnt.thisIngrdntJustCreated = false;
            thisMealIngrdnt.ingredientRecordChanged = false;
            thisMealIngrdnt.mealIngrdntRecordChanged = false;
            thisMealIngrdnt.genRecipeIngrdntRecordChanged = false;
            thisMealIngrdnt.thisGenRecipeIngrdntJustCreated = false;
            thisDayMeal.thisMealsIngrdnts[i] = thisMealIngrdnt;
          }
        }
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode] =
          thisDayMeal;
      }
    }
    state.thisWeekMealPlan = thisWeekMealPlan;
    state.thisWeeksDays = thisWeeksDays;
    this.setState(state);
  };
  handleSaveFormChanges = (parentObj, objType) => {
    let state = this.state;
    let backEndHtmlRoot = state.backEndHtmlRoot;
    let stateObjToUpdate;
    let valErrorsObjToUpdate = {};
    let thisMealTypeCode;
    let thisDayOfWeekCode;
    let mealIngredientArrayIndex;
    let recordToSave;
    let packageUpdatedStateObjFn;
    switch (objType) {
      case "weekMealPlan":
        recordToSave = parentObj.thisWMP;
        stateObjToUpdate = state.thisWeekMealPlan;
        valErrorsObjToUpdate = stateObjToUpdate.valErrors;
        packageUpdatedStateObjFn = () => {
          stateObjToUpdate.valErrors = valErrorsObjToUpdate;
        };
        break;
      case "day":
        recordToSave = parentObj.day;
        break;
      case "meal":
        recordToSave = parentObj.thisMeal;
        thisDayOfWeekCode = parentObj.thisMeal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMeal.mealType.code;
        stateObjToUpdate = state.thisWeeksDays;
        break;
      case "genRecipe":
        recordToSave = parentObj.thisMeal.genRecipe;
        thisDayOfWeekCode = parentObj.thisMeal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMeal.mealType.code;
        stateObjToUpdate = state.thisWeeksDays;

        valErrorsObjToUpdate =
          state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["genRecipeValErrors"];
        packageUpdatedStateObjFn = () => {
          stateObjToUpdate[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["genRecipeValErrors"] = valErrorsObjToUpdate;
        };
        break;
      case "mealIngredient":
        recordToSave = parentObj.thisMealIngrdnt;
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngredientArrayIndex = parentObj.mealIngrdntsArrayIndex;
        stateObjToUpdate = state.thisWeeksDays;
        valErrorsObjToUpdate =
          state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "mealIngrdntValErrors"
          ];
        packageUpdatedStateObjFn = () => {
          stateObjToUpdate[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "mealIngrdntValErrors"
          ] = valErrorsObjToUpdate;
        };
        break;
      case "genRecipeIngredient":
        recordToSave = parentObj.thisMealIngrdnt.genRecipeIngredient;
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngredientArrayIndex = parentObj.mealIngrdntsArrayIndex;
        stateObjToUpdate = state.thisWeeksDays;
        valErrorsObjToUpdate =
          state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "genRecipeIngrdntValErrors"
          ];
        packageUpdatedStateObjFn = () => {
          stateObjToUpdate[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "genRecipeIngrdntValErrors"
          ] = valErrorsObjToUpdate;
        };
        break;
      case "ingredient":
        recordToSave = parentObj.thisMealIngrdnt.genRecipeIngredient.ingredient;
        thisDayOfWeekCode = parentObj.thisMealIngrdnt.meal.day.dayOfWeek.code;
        thisMealTypeCode = parentObj.thisMealIngrdnt.meal.mealType.code;
        mealIngredientArrayIndex = parentObj.mealIngrdntsArrayIndex;
        stateObjToUpdate = state.thisWeeksDays;
        valErrorsObjToUpdate =
          state.thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "ingredientValErrors"
          ];
        packageUpdatedStateObjFn = () => {
          stateObjToUpdate[thisDayOfWeekCode]["thisDaysMeals"][
            thisMealTypeCode
          ]["thisMealsIngrdnts"][mealIngredientArrayIndex][
            "ingredientValErrors"
          ] = valErrorsObjToUpdate;
        };
        break;
    }
    let recordId = recordToSave._id;
    let url = `${backEndHtmlRoot}${objType}s/update/${recordId}`;
    const notify = (notice, noticeType) => {
      switch (noticeType) {
        case "success":
          toast.success(notice);
          break;
        default:
          toast.error(notice);
      }
    };
    httpService
      .put(url, recordToSave, this.state.axiosCallConfig)
      .then((response) => {
        if (!response.data.ok) {
          notify("Something went wrong...", "error");
        } else {
          notify("Updated successfully", "success");
          if (
            objType === "meal" &&
            parentObj.userChangedThisMealsRecipe === true
          ) {
            this.handleSaveMealRecipeChange(
              thisDayOfWeekCode,
              thisMealTypeCode,
              state
            );
          } else {
            this.hndleSetVwrTypsAndFrmStates("savingUpdate", state);
          }
        }
      })
      .catch((err) => {
        if (err.response.data) {
          notify(err.response.data.errorMsg, "error");
          const valErrorsArray = err.response.data.valErrorsArray;
          if (valErrorsArray) {
            for (let i = 0; i < valErrorsArray.length; i++) {
              let thisValErrorObj = valErrorsArray[i];
              let thisValErrorObjKeys = Object.keys(thisValErrorObj);
              for (let i = 0; i < thisValErrorObjKeys.length; i++) {
                let thisValErrorObjKey = thisValErrorObjKeys[i];
                let thisValError = thisValErrorObj[thisValErrorObjKey];
                valErrorsObjToUpdate[thisValErrorObjKey] = thisValError;
                notify(thisValError, "error");
              }
            }
            packageUpdatedStateObjFn();
            if (objType === "weekMealPlan") {
              this.setState({ thisWeekMealPlan: stateObjToUpdate });
              state.thisWeekMealPlan = stateObjToUpdate;
            } else {
              this.setState({ thisWeeksDays: stateObjToUpdate });
              state.thisWeeksDays = stateObjToUpdate;
            }
          }
          // else {
          //   notify(err.response.data.errorMsg, "error");
          // }
        } else {
          notify("Something went wrong...", "error");
        }
      });
  };
  handleSaveMealRecipeChange = (dayOfWeekCode, mealTypeCode, stateObj) => {
    let state = stateObj;
    let thisGRFUser = state.thisGRFUser;
    let thisGRFUserId = thisGRFUser._id;
    let thisWeeksDays = state.thisWeeksDays;
    let thisWeeksDaysOld = state.thisWeeksDaysOld;
    let backEndHtmlRoot = state.backEndHtmlRoot;
    let nameOfObjRefPropJustCreated = "";
    let theseMealIngrdntsToDelete =
      thisWeeksDaysOld[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
        "thisMealsIngrdnts"
      ];
    let theseMealIngrdntsToSave =
      thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
        "thisMealsIngrdnts"
      ];
    for (let i = 0; i < theseMealIngrdntsToSave.length; i++) {
      let thisMealIngrdntStateObj = theseMealIngrdntsToSave[i];
      let thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
      let thisMealIngrdntToSave = {
        qty: thisMealIngrdntObj.qty,
        genRecipeIngredient: thisMealIngrdntObj.genRecipeIngredient,
        meal: thisMealIngrdntObj.meal,
      };
      httpService
        .post(
          `${backEndHtmlRoot}mealIngredients/add/${nameOfObjRefPropJustCreated}`,
          thisMealIngrdntToSave
        )
        .then((response) => {
          console.log("meal ingredient added");
          thisMealIngrdntObj._id = response.data._id;
          thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
          theseMealIngrdntsToSave[i] = thisMealIngrdntStateObj;
        });
    }
    thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
      "thisMealsIngrdnts"
    ] = theseMealIngrdntsToSave;
    for (let i = 0; i < theseMealIngrdntsToDelete.length; i++) {
      let thisMealIngrdntStateObj = theseMealIngrdntsToDelete[i];
      let thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
      let thisMealIngrdntId = thisMealIngrdntObj._id;
      httpService
        .delete(`${backEndHtmlRoot}mealIngredients/${thisMealIngrdntId}`)
        .then(console.log("meal ingredient deleted"));
    }
    let wmpUserId = state.thisWeekMealPlan.thisWMP.GRFUser._id;
    state.thisWeekMealPlan.userType = this.setUserType(
      thisGRFUserId,
      wmpUserId
    );
    thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
      "mealRecordChanged"
    ] = false;
    thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
      "userChangedThisMealsRecipe"
    ] = false;
    state.thisWeeksDays = thisWeeksDays;
    this.hndleSetVwrTypsAndFrmStates("changingMealRecipe", state);
  };
  deleteRecord = (recordId, objType) => {
    let url = `${this.state.backEndHtmlRoot}${objType}s/${recordId}`;
    axios.delete(url).then(toast.success("Deleted Successfully"));
  };
  handleDeleteRecord = (parentObj, objType) => {
    let getRndInteger = this.getRndInteger;
    let defaultDayNewId = "missing" + getRndInteger(10000000, 99999999);
    let mealTypes = this.state.mealTypes;
    let daysOfWeek = this.state.daysOfWeek;
    let backEndHtmlRoot = this.state.backEndHtmlRoot;
    function createRecipeIngrdntStateObj(genRecipe, mealType) {
      let genRecipeIngredient = {
        defaultQty: 1,
        ingredient: {
          name: `temp${mealType.name}Ingredient1Name`,
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
        genRecipe: genRecipe,
        defaultPrepInstructions: "",
      };
      return genRecipeIngredient;
    }
    function createDefaultMealIngrdntStateObj(thisMealChild) {
      let genRecipe = thisMealChild.genRecipe;
      let mealType = thisMealChild.mealType;
      let mealIngredient = {
        thisGenRecipeIngrdntJustCreated: false,
        thisIngrdntJustCreated: false,
        mealIngrdntRecordChanged: false,
        genRecipeIngrdntRecordChanged: false,
        ingredientRecordChanged: false,
        thisMealIngrdntFormState: "viewing",
        thisMealIngrdntUserType: "viewer",
        thisGenRecipeIngrdntFormState: "viewing",
        thisGenRecipeIngrdntUserType: "viewer",
        thisIngrdntFormState: "viewing",
        thisIngrdntUserType: "viewer",
        mealIngrdntValErrors: {
          qty: null,
        },
        genRecipeIngrdntValErrors: {
          defaultQty: null,
        },
        ingredientValErrors: {
          name: null,
          calories: null,
          carbs: null,
          protein: null,
          fat: null,
          fiber: null,
          photoURL: null,
        },
        thisMealIngrdnt: {
          _id: "missing",
          qty: 1,
          genRecipeIngredient: createRecipeIngrdntStateObj(genRecipe, mealType),
          meal: thisMealChild,
        },
      };
      return mealIngredient;
    }
    function createInnerDfltDayObj(dayOfWeek) {
      let thisDayStateObjAsInStateNow =
        thisWeeksDaysOld[dayOfWeek.code]["thisDay"];
      let thisDayStateObjAsInStateNowId = thisDayStateObjAsInStateNow._id;
      let pattern = /missing/;
      let testResult = pattern.test(thisDayStateObjAsInStateNowId);
      let innerDfltDayObj;
      if (testResult === true) {
        innerDfltDayObj = {
          _id: defaultDayNewId,
          name: `Temp WMP - ${dayOfWeek.name}`,
          dayOfWeek: dayOfWeek,
          weekMealPlan: {},
        };
      } else {
        innerDfltDayObj = _.cloneDeep(thisDayStateObjAsInStateNow);
      }
      return innerDfltDayObj;
    }
    function createDefaultMealStateObj(mealType, dayOfWeek) {
      let genRecipe = {
        _id: `temp${mealType.name}Recipe1Id`,
        name: `temp${mealType.name}Recipe1Name`,
        availableMealType: mealType,
        GRFUser: {
          _id: "62577a533813f4f21c27e1c7",
          handle: "Service",
        },
        defaultPrepInstructions: "",
        photoUrl: "",
      };
      let thisMealChild = {
        _id: "missing" + getRndInteger(10000000, 99999999),
        day: createInnerDfltDayObj(dayOfWeek),
        genRecipe: genRecipe,
        prepInstructions: "",
        mealType: mealType,
      };
      let thisMealParent = {
        dataLoaded: false,
        mealIngrdntsLoaded: false,
        thisMealJustCreated: false,
        mealRecordChanged: false,
        genRecipeRecordChanged: false,
        userChangedThisMealsRecipe: false,
        thisMealFormState: "viewing",
        thisMealUserType: "viewer",
        thisGenRecipeFormState: "viewing",
        thisGenRecipeUserType: "viewer",
        thisMeal: thisMealChild,
        thisMealsIngrdnts: [],
        thisMealsMacrosBudget: {},
        genRecipeValErrors: {
          name: null,
          defaultPrepInstructions: null,
          photoUrl: null,
        },
        thisRecipesIngrdnts: [],
      };
      return thisMealParent;
    }
    function createDefaultDayMealsStateObj(dayOfWeek) {
      let dfltDayMealsStateObj = {
        breakfast: createDefaultMealStateObj(mealTypes[0], dayOfWeek),
        snack1: createDefaultMealStateObj(mealTypes[1], dayOfWeek),
        lunch: createDefaultMealStateObj(mealTypes[2], dayOfWeek),
        snack2: createDefaultMealStateObj(mealTypes[3], dayOfWeek),
        dinner: createDefaultMealStateObj(mealTypes[4], dayOfWeek),
        dessert: createDefaultMealStateObj(mealTypes[5], dayOfWeek),
      };
      return dfltDayMealsStateObj;
    }
    function createDefaultDayStateObj(dayOfWeek) {
      let defaultDayStateObj = {
        dataLoaded: true,
        thisDay: createInnerDfltDayObj(dayOfWeek),
        thisDaysMeals: createDefaultDayMealsStateObj(dayOfWeek),
      };
      return defaultDayStateObj;
    }
    let state = this.state;
    let thisWeeksDays = state.thisWeeksDays;
    let thisWeeksDaysOld = state.thisWeeksDaysOld;

    switch (objType) {
      case "weekMealPlan":
        let thisGRFUsersId = state.thisGRFUser._id;
        let url = `${backEndHtmlRoot}${objType}s/${parentObj.thisWMP._id}`;
        axios
          .delete(url)
          .then(
            (window.location = "/weekMealPlans/usersWMPs/" + thisGRFUsersId)
          );
        break;
      case "day":
        let daysDayOfWeek = parentObj.thisDay.dayOfWeek;
        let daysDayOfWeekCode = daysDayOfWeek.code;
        let dfltDayStateObjToSave = createDefaultDayStateObj(daysDayOfWeek);
        thisWeeksDays[daysDayOfWeekCode] = dfltDayStateObjToSave;
        this.deleteRecord(parentObj.thisDay._id, "day");
        break;
      case "meal":
        let mealsDayOfWeek = parentObj.thisMeal.day.dayOfWeek;
        let mealsDayOfWeekCode = mealsDayOfWeek.code;
        let mealsMealType = parentObj.thisMeal.mealType;
        let mealsMealTypeCode = mealsMealType.code;
        let dfltMealStateObjToSave = createDefaultMealStateObj(
          mealsMealType,
          mealsDayOfWeek
        );
        let mealIngrdntsToDelete =
          thisWeeksDaysOld[mealsDayOfWeekCode]["thisDaysMeals"][
            mealsMealTypeCode
          ]["thisMealsIngrdnts"];
        for (let i = 0; i < mealIngrdntsToDelete.length; i++) {
          let thisMealIngrdntToDelete = mealIngrdntsToDelete[i];
          let thisMealIngrdntToDeleteId =
            thisMealIngrdntToDelete.thisMealIngrdnt._id;
          this.deleteRecord(thisMealIngrdntToDeleteId, "mealIngredient");
        }
        thisWeeksDays[mealsDayOfWeekCode]["thisDaysMeals"][mealsMealTypeCode] =
          dfltMealStateObjToSave;
        this.deleteRecord(parentObj.thisMeal._id, "meal");
        break;
      case "genRecipe":
        break;
      case "mealIngredient":
        let mealIngrdntsDayOfWeek =
          parentObj.thisMealIngrdnt.meal.day.dayOfWeek;

        let mealIngrdntsDayOfWeekCode = mealIngrdntsDayOfWeek.code;
        let mealIngrdntsMealType = parentObj.thisMealIngrdnt.meal.mealType;
        let mealIngrdntsMealTypeCode = mealIngrdntsMealType.code;
        let mealIngrdntIdToDelete = parentObj.thisMealIngrdnt._id;
        function removeDeletedMealIngrdnt(eachMealIngrdnt) {
          return eachMealIngrdnt.thisMealIngrdnt._id !== mealIngrdntIdToDelete;
        }
        let mealIngrdntListToFilter =
          thisWeeksDays[mealIngrdntsDayOfWeekCode]["thisDaysMeals"][
            mealIngrdntsMealTypeCode
          ]["thisMealsIngrdnts"];
        let filteredMealIngrndtList = mealIngrdntListToFilter.filter(
          removeDeletedMealIngrdnt
        );
        thisWeeksDays[mealIngrdntsDayOfWeekCode]["thisDaysMeals"][
          mealIngrdntsMealTypeCode
        ]["thisMealsIngrdnts"] = filteredMealIngrndtList;
        this.deleteRecord(parentObj.thisMealIngrdnt._id, "mealIngredient");
        break;
      case "genRecipeIngredient":
        let thisGenRecipeIngrdnt =
          parentObj.thisMealIngrdnt.genRecipeIngredient;

        let thisGenRecipe = thisGenRecipeIngrdnt.genRecipe;
        let recordId = thisGenRecipeIngrdnt._id;
        for (let i = 0; i < daysOfWeek.length; i++) {
          let thisDayOfWeek = daysOfWeek[i];
          let thisDayStateObj = thisWeeksDays[thisDayOfWeek.code];
          let thisDaysMeals = thisDayStateObj.thisDaysMeals;

          for (let i = 0; i < mealTypes.length; i++) {
            let thisMealType = mealTypes[i];
            let thisMealStateObj = thisDaysMeals[thisMealType.code];
            let thisMealsGenRecipe = thisMealStateObj.thisMeal.genRecipe;

            if (thisMealsGenRecipe._id === thisGenRecipe._id) {
              let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
              for (let i = 0; i < thisMealsIngrdnts.length; i++) {
                let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
                let thisMealIngrdntObj =
                  thisMealIngrdntStateObj.thisMealIngrdnt;
                let thisMealIngrdntsId = thisMealIngrdntObj._id;
                let thisMealIngrdntsGenRecipeIngrdnt =
                  thisMealIngrdntObj.genRecipeIngredient;

                if (thisMealIngrdntsGenRecipeIngrdnt._id === recordId) {
                  let newThisMealsIngrdnts = thisMealsIngrdnts.filter(
                    (mealIngrdnt) =>
                      mealIngrdnt.thisMealIngrdnt.genRecipeIngredient._id !==
                      recordId
                  );
                  thisMealStateObj.thisMealsIngrdnts = newThisMealsIngrdnts;
                  this.deleteRecord(thisMealIngrdntsId, "mealIngredient");
                }
              }
            }
            thisDaysMeals[thisMealType.code] = thisMealStateObj;
          }
          thisDayStateObj.thisDaysMeals = thisDaysMeals;
          thisWeeksDays[thisDayOfWeek.code] = thisDayStateObj;
        }
        let allGenRecipeIngrdnts = state.allGenRecipeIngredients;
        let newAllGenRecipeIngrdnts = allGenRecipeIngrdnts.filter(
          (genRecipeIngrdnt) => genRecipeIngrdnt._id !== recordId
        );
        state.allGenRecipeIngredients = newAllGenRecipeIngrdnts;
        this.deleteRecord(recordId, "genRecipeIngredient");
        break;
      case "ingredient":
        break;
    }
    state.thisWeeksDays = thisWeeksDays;
    this.hndleSetVwrTypsAndFrmStates("deletingObj", state);
  };
  handleUpdateProp = (
    objType,
    dayOfWeekCode,
    mealTypeCode,
    propToUpdate,
    arrayIndex,
    inputType,
    e,
    selectedFrom,
    propTypeForVal
  ) => {
    console.log({
      objType,
      dayOfWeekCode,
      mealTypeCode,
      propToUpdate,
      arrayIndex,
      inputType,
      e,
      selectedFrom,
      propTypeForVal,
    });
    let newValue;
    if (inputType === "select") {
      newValue = selectedFrom.filter(
        (option) => option._id === e.target.value
      )[0];
    } else if (inputType === "asyncReactSelect") {
      newValue = JSON.parse(e);
    } else if (inputType === "reactSelect") {
      newValue = selectedFrom.filter((option) => option._id === e)[0];
    } else {
      newValue = e.target.value;
    }
    let state = this.state;
    let thisUsersId = state.thisGRFUser._id;
    let thisWMPStateObj = state.thisWeekMealPlan;
    let thisWMPObj = thisWMPStateObj.thisWMP;
    let thisWeeksDays = state.thisWeeksDays;
    let thisDayStateObj;
    let thisDayObj;
    let thisDaysMeals;
    let thisMealStateObj;
    let thisGenRecipeObj;
    let thisMealObj;
    let thisMealsIngrdnts;
    let thisMealIngrdntStateObj;
    let thisMealIngrdntObj;
    let thisGenRecipeIngrdntObj;
    let thisIngrdntObj;
    if (objType !== "weekMealPlan") {
      thisDayStateObj = thisWeeksDays[dayOfWeekCode];
      thisDayObj = thisDayStateObj.thisDay;
      thisDaysMeals = thisDayStateObj.thisDaysMeals;
    }
    if (objType !== "day" && objType !== "weekMealPlan") {
      thisMealStateObj = thisDaysMeals[mealTypeCode];
      thisMealObj = thisMealStateObj.thisMeal;
      thisGenRecipeObj = thisMealObj.genRecipe;
      thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
    }
    if (
      objType !== "meal" &&
      objType !== "genRecipe" &&
      objType !== "day" &&
      objType !== "weekMealPlan"
    ) {
      thisMealIngrdntStateObj = thisMealsIngrdnts[arrayIndex];
      thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
      thisGenRecipeIngrdntObj = thisMealIngrdntObj.genRecipeIngredient;
      thisIngrdntObj = thisGenRecipeIngrdntObj.ingredient;
    }
    switch (objType) {
      case "weekMealPlan":
        thisWMPObj[propToUpdate] = newValue;
        thisWMPStateObj.recordChanged = true;
        if (propTypeForVal !== "objRef") {
          thisWMPStateObj.valErrors[propToUpdate] = this.validateProp(
            propToUpdate,
            newValue,
            propTypeForVal
          );
        }
        state.thisWeekMealPlan = thisWMPStateObj;
        break;
      case "day":
        thisDayObj[propToUpdate] = newValue;
        thisDayStateObj.thisDay = thisDayObj;
        thisDayStateObj.recordChanged = true;
        break;
      case "meal":
        thisMealObj[propToUpdate] = newValue;
        thisMealStateObj.mealRecordChanged = true;
        if (propToUpdate === "genRecipe") {
          thisMealStateObj.userChangedThisMealsRecipe = true;
          thisMealStateObj.thisMealJustCreated = false;
          let thisGenRecipeUserType = this.setUserType(
            thisUsersId,
            newValue.GRFUser._id
          );
          thisMealStateObj.thisGenRecipeUserType = thisGenRecipeUserType;
          this.populateNewMealIngredients(
            thisGenRecipeUserType,
            dayOfWeekCode,
            mealTypeCode,
            newValue,
            state
          );
        }
        break;
      case "genRecipe":
        thisGenRecipeObj[propToUpdate] = newValue;
        thisMealObj.genRecipe = thisGenRecipeObj;
        thisMealStateObj["genRecipeRecordChanged"] = true;
        if (propTypeForVal !== "objRef") {
          thisMealStateObj.genRecipeValErrors[propToUpdate] = this.validateProp(
            propToUpdate,
            newValue,
            propTypeForVal
          );
        }
        break;
      case "mealIngredient":
        thisMealIngrdntObj[propToUpdate] = newValue;
        thisMealIngrdntStateObj["mealIngrdntRecordChanged"] = true;
        if (propTypeForVal !== "objRef") {
          thisMealIngrdntStateObj.mealIngrdntValErrors[propToUpdate] =
            this.validateProp(propToUpdate, newValue, propTypeForVal);
        }
        break;
      case "genRecipeIngredient":
        thisGenRecipeIngrdntObj[propToUpdate] = newValue;
        thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
        thisMealIngrdntStateObj["genRecipeIngrdntRecordChanged"] = true;
        thisMealIngrdntStateObj.genRecipeIngrdntValErrors[propToUpdate] =
          this.validateProp(propToUpdate, newValue, propTypeForVal);
        if (propToUpdate === "ingredient") {
          let newIngrdntUserType = this.setUserType(
            thisUsersId,
            newValue.GRFUser._id
          );
          thisMealIngrdntStateObj["ingrdntUserType"] = newIngrdntUserType;
        }
        break;
      case "ingredient":
        thisIngrdntObj[propToUpdate] = newValue;
        thisGenRecipeIngrdntObj.ingredient = thisIngrdntObj;
        thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
        thisMealIngrdntStateObj["ingredientRecordChanged"] = true;
        if (propTypeForVal !== "objRef") {
          thisMealIngrdntStateObj.ingredientValErrors[propToUpdate] =
            this.validateProp(propToUpdate, newValue, propTypeForVal);
        }
        break;
    }
    if (objType === "meal" && propToUpdate === "genRecipe") {
      return;
    } else {
      if (
        objType !== "meal" &&
        objType !== "genRecipe" &&
        objType !== "day" &&
        objType !== "weekMealPlan"
      ) {
        thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
        thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
        thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
      }
      if (objType === "meal" && objType === "genRecipe") {
        thisMealStateObj.thisMeal = thisMealObj;
      }
      if (objType !== "day" && objType !== "weekMealPlan") {
        thisDaysMeals[mealTypeCode] = thisMealStateObj;
        thisDayStateObj.thisDaysMeals = thisDaysMeals;
      }
      if (objType !== "weekMealPlan") {
        thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
        state.thisWeeksDays = thisWeeksDays;
      }
      this.setState(state);
    }
  };
  // createRecord = (newRecordToSave, objType) => {
  //   let url = `http://localhost:5000/${objType}s/add`;
  //   axios.post(url, newRecordToSave).then((response) => {
  //     let savedRecord = response.data;
  //     let savedRecordId = savedRecord._id;
  //     return savedRecordId;
  //   });
  // };
  handleCreateRecord = (
    objType,
    dayOfWeekCode,
    mealTypeCode,
    arrayIndex,
    newRecordForState,
    newRecordToSave
  ) => {
    let state = this.state;
    let mealTypes = state.mealTypes;
    let thisUserType = state.thisUserType;
    let thisWeeksDays = state.thisWeeksDays;
    let thisDayStateObj = thisWeeksDays[dayOfWeekCode];
    let thisDayObj = thisDayStateObj.thisDay;
    let thisDaysMeals = thisDayStateObj.thisDaysMeals;
    let thisMealStateObj;
    let thisMealObj;
    let thisGenRecipeObj;
    let thisMealsIngrdnts;
    let thisMealIngrdntStateObj;
    let thisMealIngrdntObj;
    let thisGenRecipeIngrdntObj;
    let thisIngrdntObj;
    let parentObj;
    let backEndHtmlRoot = state.backEndHtmlRoot;
    if (objType !== "day") {
      thisMealStateObj = thisDaysMeals[mealTypeCode];
    }
    if (objType !== "day" && objType !== "meal" && objType !== "genRecipe") {
      thisMealsIngrdnts = [];
    }
    let savedRecordId;
    let url = `${backEndHtmlRoot}${objType}s/add/`;
    httpService
      .post(url, newRecordToSave)
      .then((response) => {
        let savedRecord = response.data;
        savedRecordId = savedRecord._id;
        newRecordForState._id = savedRecordId;
        switch (objType) {
          case "day":
            thisDayObj = newRecordForState;
            for (let i = 0; i < mealTypes.length; i++) {
              let thisDayMealStateObj = thisDaysMeals[mealTypes[i].code];
              thisDayMealStateObj.thisMealFormState = "viewing";
              thisDayMealStateObj.thisMealUserType = thisUserType;
              thisDayMealStateObj.thisGenRecipeFormState = "viewing";
              thisDayMealStateObj.thisGenRecipeUserType = "viewer";
              let thisDayMealObj = thisDayMealStateObj.thisMeal;
              thisDayMealObj.day = newRecordForState;
              thisDayMealStateObj.thisMeal = thisDayMealObj;
              let thisDayMealsIngrdnts = thisDayMealStateObj.thisMealsIngrdnts;
              for (let i = 0; i < thisDayMealsIngrdnts.length; i++) {
                let thisDayMealIngrdntStateObj = thisDayMealsIngrdnts[i];
                thisDayMealIngrdntStateObj.thisMealIngrdntFormState = "viewing";
                thisDayMealIngrdntStateObj.thisGenRecipeIngrdntFormState =
                  "viewing";
                thisDayMealIngrdntStateObj.thisIngrdntFormState = "viewing";
                thisDayMealIngrdntStateObj.thisMealIngrdntUserType = "viewer";
                thisDayMealIngrdntStateObj.thisGenRecipeIngrdntUserType =
                  "viewer";
                thisDayMealIngrdntStateObj.thisIngrdntUserType = "viewer";
                let thisDayMealIngrdntObj =
                  thisDayMealIngrdntStateObj.thisMealIngrdnt;
                thisDayMealIngrdntObj.meal.day = newRecordForState;
                thisDayMealIngrdntStateObj.thisMealIngrdnt =
                  thisDayMealIngrdntObj;
                thisDayMealsIngrdnts[i] = thisDayMealIngrdntStateObj;
              }
              thisDayMealStateObj.thisMealsIngrdnts = thisDayMealsIngrdnts;
              thisDaysMeals[i] = thisDayMealStateObj;
            }
            thisDayStateObj.dataLoaded = true;
            parentObj = thisDayStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisDayStateObj.thisDay = thisDayObj;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            this.setState(state);
            break;
          case "meal":
            thisMealObj = newRecordForState;
            thisMealStateObj.thisMealsIngrdnts = [];
            thisMealStateObj.thisRecipesIngrdnts = [];
            thisMealStateObj.mealIngrdntsLoaded = true;
            thisMealStateObj.thisMealJustCreated = true;
            thisMealStateObj.mealRecordChanged = true;
            thisMealStateObj.dataLoaded = true;

            thisMealStateObj.thisMeal = thisMealObj;
            parentObj = thisMealStateObj;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisDayStateObj.thisDay = thisDayObj;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            this.setState(state);
            this.handleClickEditForm(parentObj, objType);
            break;
          case "genRecipe":
            parentObj = thisMealStateObj;
            this.handleClickEditForm(parentObj, objType);
            thisGenRecipeObj = newRecordForState;
            state.allGenRecipes.push(newRecordForState);
            this.setState(state);
            this.handleUpdateProp(
              "meal",
              dayOfWeekCode,
              mealTypeCode,
              "genRecipe",
              arrayIndex,
              "reactSelect",
              thisGenRecipeObj._id,
              state.allGenRecipes
            );
            break;
          case "mealIngredient":
            thisMealsIngrdnts.push(newRecordForState);
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisMealStateObj.dataLoaded = true;
            parentObj = thisMealStateObj;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisDayStateObj.thisDay = thisDayObj;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            this.setState(state);
            this.handleClickEditForm(parentObj, objType);
            break;
          case "genRecipeIngredient":
            thisMealObj = thisMealStateObj.thisMeal;
            thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisGenRecipeIngrdntObj = newRecordForState;
            state.allGenRecipeIngredients.push(thisGenRecipeIngrdntObj);
            thisMealIngrdntObj = {
              _id: "",
              qty: 1,
              genRecipeIngredient: thisGenRecipeIngrdntObj,
              meal: thisMealObj,
            };
            let newInnerMealIngrdntToSave = {
              qty: 1,
              genRecipeIngredient: thisGenRecipeIngrdntObj,
              meal: thisMealObj,
            };
            httpService
              .post(
                `${backEndHtmlRoot}mealIngredients/add/genRecipeIngredient`,
                newInnerMealIngrdntToSave
              )
              .then((response) => {
                let newSavedMealIngrdnt = response.data;
                let newMealIngrdntId = newSavedMealIngrdnt._id;
                thisMealIngrdntObj._id = newMealIngrdntId;
                let newOuterMealIngrdnt = {
                  thisIngrdntJustCreated: false,
                  thisGenRecipeIngrdntJustCreated: true,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: true,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "editingOrig",
                  thisGenRecipeIngrdntUserType: thisUserType,
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
                  thisMealIngrdnt: thisMealIngrdntObj,
                  mealIngrdntsArrayIndex: arrayIndex,
                  mealIngrdntValErrors: {
                    qty: null,
                  },
                  genRecipeIngrdntValErrors: {
                    defaultQty: null,
                  },
                  ingredientValErrors: {
                    name: null,
                    calories: null,
                    carbs: null,
                    protein: null,
                    fat: null,
                    fiber: null,
                    photoURL: null,
                  },
                };
                thisMealIngrdntStateObj = newOuterMealIngrdnt;
                parentObj = thisMealIngrdntStateObj;
                thisMealsIngrdnts.push(newOuterMealIngrdnt);
                thisMealStateObj.thisMeal = thisMealObj;
                thisDaysMeals[mealTypeCode] = thisMealStateObj;
                thisDayStateObj.thisDaysMeals = thisDaysMeals;
                thisDayStateObj.thisDay = thisDayObj;
                thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
                state.thisWeeksDays = thisWeeksDays;
                this.setState(state);
                this.handleClickEditForm(parentObj, objType);
              });
            break;
          case "ingredient":
            thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisMealIngrdntStateObj = thisMealsIngrdnts[arrayIndex];
            thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
            thisGenRecipeIngrdntObj = thisMealIngrdntObj.genRecipeIngredient;
            parentObj = thisMealIngrdntStateObj;
            thisGenRecipeIngrdntObj.ingredient = newRecordForState;
            thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
            thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
            thisMealIngrdntStateObj.thisIngrdntJustCreated = true;
            if (
              thisMealIngrdntStateObj.genRecipeIngrdntRecordChanged === true
            ) {
              thisMealIngrdntStateObj.genRecipeIngrdntRecordChanged = false;
              thisMealIngrdntStateObj.thisGenRecipeIngrdntJustCreated = false;
            } else {
              thisMealIngrdntStateObj.genRecipeIngrdntRecordChanged = true;
            }
            thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            this.setState(state);
            this.handleClickEditForm(parentObj, objType);
            break;
          case "brand":
            thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisMealIngrdntStateObj = thisMealsIngrdnts[arrayIndex];
            thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
            thisGenRecipeIngrdntObj = thisMealIngrdntObj.genRecipeIngredient;
            parentObj = thisMealIngrdntStateObj;
            thisIngrdntObj = thisGenRecipeIngrdntObj.ingredient;
            let thisBrandObj = thisIngrdntObj.brand;
            thisBrandObj = newRecordForState;
            thisIngrdntObj.brand = thisBrandObj;
            thisGenRecipeIngrdntObj.ingredient = thisIngrdntObj;
            thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
            thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
            if (thisMealIngrdntStateObj.ingredientRecordChanged === true) {
              let recordToSave = thisIngrdntObj;
              let recordId = recordToSave._id;
              let url = `${backEndHtmlRoot}ingredients/update/${recordId}`;
              httpService.put(url, recordToSave).then(console.log("updated"));
              thisMealIngrdntStateObj.ingredientRecordChanged = false;
            } else {
              thisMealIngrdntStateObj.ingredientRecordChanged = true;
            }
            thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            state.allBrands.push(thisBrandObj);
            this.setState(state);
            break;
          case "unitOfMeasure":
            thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisMealIngrdntStateObj = thisMealsIngrdnts[arrayIndex];
            thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
            thisGenRecipeIngrdntObj = thisMealIngrdntObj.genRecipeIngredient;
            parentObj = thisMealIngrdntStateObj;
            thisIngrdntObj = thisGenRecipeIngrdntObj.ingredient;
            let thisUOMObj = thisIngrdntObj.unitOfMeasure;
            thisUOMObj = newRecordForState;
            thisIngrdntObj.unitOfMeasure = thisUOMObj;
            thisGenRecipeIngrdntObj.ingredient = thisIngrdntObj;
            thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
            thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
            if (thisMealIngrdntStateObj.ingredientRecordChanged === true) {
              let recordToSave = thisIngrdntObj;
              let recordId = recordToSave._id;
              let url = `${backEndHtmlRoot}ingredients/update/${recordId}`;
              httpService.put(url, recordToSave).then(console.log("updated"));
              thisMealIngrdntStateObj.ingredientRecordChanged = false;
            } else {
              thisMealIngrdntStateObj.ingredientRecordChanged = true;
            }
            thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            state.allUnitOfMeasures.push(thisUOMObj);
            this.setState(state);
            break;
          case "weightType":
            thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
            thisMealIngrdntStateObj = thisMealsIngrdnts[arrayIndex];
            thisMealIngrdntObj = thisMealIngrdntStateObj.thisMealIngrdnt;
            thisGenRecipeIngrdntObj = thisMealIngrdntObj.genRecipeIngredient;
            parentObj = thisMealIngrdntStateObj;
            thisIngrdntObj = thisGenRecipeIngrdntObj.ingredient;
            let thisWeightTypeObj = thisIngrdntObj.weightType;
            thisWeightTypeObj = newRecordForState;
            thisIngrdntObj.weightType = thisWeightTypeObj;
            thisGenRecipeIngrdntObj.ingredient = thisIngrdntObj;
            thisMealIngrdntObj.genRecipeIngredient = thisGenRecipeIngrdntObj;
            thisMealIngrdntStateObj.thisMealIngrdnt = thisMealIngrdntObj;
            if (thisMealIngrdntStateObj.ingredientRecordChanged === true) {
              let recordToSave = thisIngrdntObj;
              let recordId = recordToSave._id;
              let url = `${backEndHtmlRoot}ingredients/update/${recordId}`;
              httpService.put(url, recordToSave).then(console.log("updated"));
              thisMealIngrdntStateObj.ingredientRecordChanged = false;
            } else {
              thisMealIngrdntStateObj.ingredientRecordChanged = true;
            }
            thisMealsIngrdnts[arrayIndex] = thisMealIngrdntStateObj;
            thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
            thisDaysMeals[mealTypeCode] = thisMealStateObj;
            thisDayStateObj.thisDaysMeals = thisDaysMeals;
            thisWeeksDays[dayOfWeekCode] = thisDayStateObj;
            state.thisWeeksDays = thisWeeksDays;
            state.allWeightTypes.push(thisWeightTypeObj);
            this.setState(state);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  populateNewMealIngredients = (
    thisGenRecipeUserType,
    dayOfWeekCode,
    mealTypeCode,
    thisRecipe,
    stateObj
  ) => {
    let state = stateObj ? stateObj : this.state;
    let thisWeeksDaysBackup = _.cloneDeep(state.thisWeeksDays);
    let backEndHtmlRoot = state.backEndHtmlRoot;
    state.thisWeeksDaysOld = thisWeeksDaysBackup;
    state.thisWeekMealPlan.thisFormState = "viewing";
    state.thisWeekMealPlan.userType = "viewer";
    const daysOfWeek = state.daysOfWeek;
    const mealTypes = state.mealTypes;
    const thisUsersId = state.thisGRFUser._id;
    const thisRecipeId = thisRecipe._id;
    const thisWeeksDays = state.thisWeeksDays;
    let thisMealStateObjToUpdate =
      thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode];
    const thisMealObj = thisMealStateObjToUpdate.thisMeal;
    const thisMealInitialUserType = thisMealStateObjToUpdate.mealUserType;
    for (let i = 0; i < state.daysOfWeek.length; i++) {
      let thisDayStateObj = thisWeeksDays[daysOfWeek[i].code];
      thisDayStateObj.thisFormState = "viewing";
      thisDayStateObj.userType = "viewer";
      for (let i = 0; i < state.mealTypes.length; i++) {
        let thisMealStateObj = thisDayStateObj.thisDaysMeals[mealTypes[i].code];
        thisMealStateObj.thisMealFormState = "viewing";
        thisMealStateObj.thisMealUserType = "viewer";
        thisMealStateObj.thisGenRecipeFormState = "viewing";
        thisMealStateObj.thisGenRecipeUserType = "viewer";
        let thisMealsIngrdnts = thisMealStateObj.thisMealsIngrdnts;
        for (let i = 0; i < thisMealsIngrdnts.length; i++) {
          let thisMealIngrdntStateObj = thisMealsIngrdnts[i];
          thisMealIngrdntStateObj.thisMealIngrdntFormState = "viewing";
          thisMealIngrdntStateObj.thisMealIngrdntUserType = "viewer";
          thisMealIngrdntStateObj.thisGenRecipeIngrdntFormState = "viewing";
          thisMealIngrdntStateObj.thisGenRecipeIngrdntUserType = "viewer";
          thisMealIngrdntStateObj.thisIngrdntFormState = "viewing";
          thisMealIngrdntStateObj.thisIngrdntUserType = "viewer";
          thisMealsIngrdnts[i] = thisMealIngrdntStateObj;
        }
        thisMealStateObj.thisMealsIngrdnts = thisMealsIngrdnts;
        thisDayStateObj.thisDaysMeals[mealTypes[i].code] = thisMealStateObj;
      }
      thisWeeksDays[daysOfWeek[i].code] = thisDayStateObj;
    }
    httpService
      .get(
        `${backEndHtmlRoot}genRecipeIngredients/thisGenRecipesGenRecipeIngredients/${thisRecipeId}`
      )
      .then((response) => {
        const thisGenRecipesGenRecipeIngrdnts = response.data.map(
          (genRecipeIngredient) => genRecipeIngredient
        );
        let thisMealsNewMealIngrdnts = [];
        for (let i = 0; i < thisGenRecipesGenRecipeIngrdnts.length; i++) {
          let thisGenRecipeIngrdnt = thisGenRecipesGenRecipeIngrdnts[i];
          let newMealIngredient = {
            thisGenRecipeIngrdntJustCreated: false,
            thisIngrdntJustCreated: false,
            mealIngrdntRecordChanged: false,
            genRecipeIngrdntRecordChanged: false,
            ingredientRecordChanged: false,
            thisMealIngrdntFormState: "viewing",
            thisMealIngrdntUserType: thisMealInitialUserType,
            thisGenRecipeIngrdntFormState: "viewing",
            thisGenRecipeIngrdntUserType: thisGenRecipeUserType,
            thisIngrdntFormState: "viewing",
            thisIngrdntUserType: this.setUserType(
              thisUsersId,
              thisGenRecipeIngrdnt.ingredient.GRFUser._id
            ),
            mealIngrdntValErrors: {
              qty: null,
            },
            genRecipeIngrdntValErrors: {
              defaultQty: null,
            },
            ingredientValErrors: {
              name: null,
              calories: null,
              carbs: null,
              protein: null,
              fat: null,
              fiber: null,
              photoURL: null,
            },
            thisMealIngrdnt: {
              _id: "tempId-" + this.getRndInteger(10000000, 99999999),
              qty: thisGenRecipeIngrdnt.defaultQty,
              genRecipeIngredient: thisGenRecipeIngrdnt,
              meal: thisMealObj,
            },
          };
          thisMealsNewMealIngrdnts.push(newMealIngredient);
        }
        thisMealStateObjToUpdate.thisMealsIngrdnts = thisMealsNewMealIngrdnts;
        thisMealStateObjToUpdate.mealRecordChanged = true;
        thisMealStateObjToUpdate.userChangedThisMealsRecipe = true;
        thisMealStateObjToUpdate.thisMealFormState = "editingOrig";
        thisMealStateObjToUpdate.thisMealUserType = thisMealInitialUserType;
        thisMealStateObjToUpdate.thisRecipesIngrdnts =
          thisGenRecipesGenRecipeIngrdnts;
        thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode] =
          thisMealStateObjToUpdate;
        state.thisWeeksDays = thisWeeksDays;
        this.setState(state);
      });
  };
  renderDay = (thisDayStateObj) => {
    let pattern = /missing/;
    let weekMealPlan = this.state.thisWeekMealPlan;
    let thisWMP = weekMealPlan.thisWMP;
    let thisDayOfWeek = thisDayStateObj.thisDay.dayOfWeek;
    let dayLoadStatus = thisDayStateObj.dataLoaded;
    let mealTypes = this.state.mealTypes;
    let thisDaysMeals = thisDayStateObj.thisDaysMeals;
    let dayHasChildren = false;
    for (let i = 0; i < mealTypes.length; i++) {
      let thisMealToTest = thisDaysMeals[mealTypes[i].code];
      let testResult = pattern.test(thisMealToTest.thisMeal._id);
      if (!testResult) {
        dayHasChildren = true;
      }
    }
    if (dayLoadStatus === false) {
      return;
    } else {
      let thisStateObjOld = this.state.thisWeeksDaysOld[thisDayOfWeek.code];
      let thisObj = thisDayStateObj.thisDay;
      let thisObjsAuthorsId = thisWMP.GRFUser._id;
      let thisObjsId = thisObj._id;
      let testResult = pattern.test(thisObjsId);
      let thisUser = this.state.thisGRFUser;
      let thisUsersId = thisUser._id;
      let thisUsersUserGroups = thisUser.userGroups;
      if (testResult === true) {
        if (
          thisObjsAuthorsId === thisUsersId ||
          thisUsersUserGroups === "Admin"
        ) {
          return (
            <CreateDay
              key={thisObjsId}
              dayOfWeek={thisDayOfWeek}
              weekMealPlan={weekMealPlan}
              thisDay={thisDayStateObj}
              onCreateRecord={this.handleCreateRecord}
            />
          );
        } else {
          return (
            <div className="alert alert-secondary" role="alert">
              <em>
                <span>No {thisDayOfWeek.name}</span> Meal Plan added to this
                week...
              </em>
            </div>
          );
        }
      } else {
        return (
          <DayDetail
            //Props
            ///Data
            key={thisObj._id}
            thisStateObj={thisDayStateObj}
            thisStateObjOld={thisStateObjOld}
            hasChildren={dayHasChildren}
            thisGRFUser={this.state.thisGRFUser}
            thisWeekMealPlan={this.state.thisWeekMealPlan}
            thisDayStateObjOld={this.state.thisWeeksDaysOld[thisDayOfWeek.code]}
            mealTypes={this.state.mealTypes}
            allGenRecipes={this.state.allGenRecipes}
            backEndHtmlRoot={this.state.backEndHtmlRoot}
            allBrands={this.state.allBrands}
            allWeightTypes={this.state.allWeightTypes}
            allUnitOfMeasures={this.state.allUnitOfMeasures}
            ///Methods
            onChangeMealRecipe={this.handleChangeMealRecipe}
            onClickEditForm={this.handleClickEditForm}
            onCancelEditForm={this.handleCancelEditForm}
            onSaveFormChanges={this.handleSaveFormChanges}
            onDeleteRecord={this.handleDeleteRecord}
            onUpdateProp={this.handleUpdateProp}
            populateNewMealIngredients={this.populateNewMealIngredients}
            onCreateRecord={this.handleCreateRecord}
            getRndInteger={this.getRndInteger}
            toggleRecordChanged={this.toggleRecordChanged}
          />
        );
      }
    }
  };
  handleChangeMealPrcnt = (e, mealTypeCode) => {
    let newPrcnt = e.target.value;
    this.setState({ [`${mealTypeCode}WghtTemp`]: newPrcnt });
  };
  toggleRecordChanged = (newState, objType, dayOfWeekCode) => {
    const thisObjType = objType;
    if (thisObjType === "weekMealPlan") {
      let thisWeekMealPlan = this.state.thisWeekMealPlan;
      thisWeekMealPlan.recordChanged = newState;
      this.setState({ thisWeekMealPlan: thisWeekMealPlan });
    } else {
      let thisWeeksDays = this.state.thisWeeksDays;
      thisWeeksDays[dayOfWeekCode]["recordChanged"] = newState;
      this.setState({ thisWeeksDays: thisWeeksDays });
    }
  };
  render() {
    const daysOfWeek = this.state.daysOfWeek;
    const thisWMP = this.state.thisWeekMealPlan.thisWMP;
    const thisWMPId = this.state.thisWeekMealPlan.thisWMP._id;
    let pattern = /missing/;
    let testResults = {
      sunday: pattern.test(this.state.thisWeeksDays.sunday.thisDay._id),
      monday: pattern.test(this.state.thisWeeksDays.monday.thisDay._id),
      tuesday: pattern.test(this.state.thisWeeksDays.tuesday.thisDay._id),
      wednesday: pattern.test(this.state.thisWeeksDays.wednesday.thisDay._id),
      thursday: pattern.test(this.state.thisWeeksDays.thursday.thisDay._id),
      friday: pattern.test(this.state.thisWeeksDays.friday.thisDay._id),
      saturday: pattern.test(this.state.thisWeeksDays.saturday.thisDay._id),
    };
    let thisUser = this.state.thisGRFUser;
    let thisUsersId = thisUser._id;
    let thisUsersUserGroups = thisUser.userGroups;
    if (this.state.thisWeekMealPlan.dataLoaded === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
      return (
        <div className="container-fluid pl-4 pr-4">
          <ToastContainer autoClose={2000} />
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Week Meal Plan Detail</h1>
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull_WMPDetails" + thisWMPId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader_WMPDetails" + thisWMPId}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#dayAccrdn_WMPDetails" + thisWMPId}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <WMPForm
                  thisWeekMealPlan={this.state.thisWeekMealPlan}
                  thisWeekMealPlanOld={this.state.thisWeekMealPlanOld}
                  backEndHtmlRoot={this.state.backEndHtmlRoot}
                  onUpdateProp={this.handleUpdateProp}
                  onClickEditForm={this.handleClickEditForm}
                  onCancelEditForm={this.handleCancelEditForm}
                  onSaveFormChanges={this.handleSaveFormChanges}
                  onDeleteRecord={this.handleDeleteRecord}
                  onClickCopy={this.handleCopyWMP}
                  toggleRecordChanged={this.toggleRecordChanged}
                  onUpdateWeights={this.handleUpdateWeights}
                />
              </div>
            </div>
          </div>
          <div className="card mt-3 mb-3">
            <div className="card-header">
              <h2 className="card-title">Day Meal Plans</h2>
            </div>
            <div className="card-body">
              <div
                className="accordion accordion-flush"
                id={"accordionFull" + thisWMPId}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={"accordionHeader" + thisWMPId}
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#dayAccrdn" + thisWMPId}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                </div>
                <div
                  id={"dayAccrdn" + thisWMPId}
                  className="accordion-collapse collapse show"
                  aria-labelledby={"#accordionHeader" + thisWMPId}
                  data-bs-parent={"#accordionFull" + thisWMPId}
                >
                  <div className="accordion-body wkDaysAccrdnBdy">
                    {this.renderDay(this.state.thisWeeksDays.sunday)}
                    {this.renderDay(this.state.thisWeeksDays.monday)}
                    {this.renderDay(this.state.thisWeeksDays.tuesday)}
                    {this.renderDay(this.state.thisWeeksDays.wednesday)}
                    {this.renderDay(this.state.thisWeeksDays.thursday)}
                    {this.renderDay(this.state.thisWeeksDays.friday)}
                    {this.renderDay(this.state.thisWeeksDays.saturday)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
