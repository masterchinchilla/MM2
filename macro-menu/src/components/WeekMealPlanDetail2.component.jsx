import React, { Component } from "react";
import axios from "axios";
import DayDetail from "./DayDetail.component";
import EditOptions from "./EditOptions.component";
import CreateDay2 from "./CreateDay2.component";
import DayDetail3 from "./DayDetail3.component";
import _ from "lodash";

export default class WeekMealPlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // thisGRFUser={props.thisGRFUser}
      // allGRFUsers={props.allGRFUsers}
      // allDays={props.allDays}
      // allGenRecipes={props.allGenRecipes}
      // mealTypes={props.mealTypes}
      // allIngredients={props.allIngredients}
      // allGenRecipeIngredients={props.allGenRecipeIngredients}
      // allMeals={props.allMeals}
      // allUnitOfMeasures={props.allUnitOfMeasures}
      // allWeightTypes={props.allWeightTypes}
      // allBrands={props.allBrands}
      thisUserType: "author",
      thisGRFUser: {
        _id: "609f3e444ee536749c75c729",
        givenName: "John",
        familyName: "Doe",
        email: "johndoe@gmail.com",
        password: "abc123",
        handle: "johnnyFood",
      },
      // thisGRFUser: {
      //   _id: "60cd31910b74083490750ed0",
      //   namePrefix: "",
      //   givenName: "Jane",
      //   middleName: "",
      //   familyName: "Doe",
      //   nameSuffix: "",
      //   email: "janedoe@gmail.com",
      //   password: "abcd1234",
      //   handle: "jane_fit_1985",
      //   certURL: "",
      //   certName: "",
      //   userGroups: "GRFUser",
      // },
      thisWeekMealPlan: {
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
      allGRFUsers: [{ _id: "tempGRFUser1Id", handle: "tempGRFUser1Handle" }],
      allDays: [
        {
          _id: "tempDay1Id",
          name: "tempDayName1",
          dayOfWeek: {
            _id: "6287cfcbb01c53cff0db5cd8",
            code: "sunday",
            name: "Sunday",
          },
          weekMealPlan: "625b7e5a4451249a38449792",
        },
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
      allIngredients: [
        {
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
          weightType: {},
          photoURL: "",
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
          brand: {},
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
      allMeals: [
        {
          _id: "tempMealId1",
          day: {
            _id: "tempDay1Id",
            name: "tempDayName1",
            dayOfWeek: {
              _id: "6287cfcbb01c53cff0db5cd8",
              code: "sunday",
              name: "Sunday",
            },
            weekMealPlan: "625b7e5a4451249a38449792",
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
          mealType: {
            _id: "626dd6fc21888432c0fe3e90",
            code: "breakfast",
            name: "Breakfast",
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
      allWMPs: [],
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
                  thisMealIngrdntJustCreated: false,
                  mealIngrdntRecordChanged: false,
                  genRecipeIngrdntRecordChanged: false,
                  ingredientRecordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
              thisRecipesIngrdnts: [
                // {
                //   defaultQty: 1,
                //   ingredient: {
                //     name: "tempBreakfastIngredient1Name",
                //     calories: 1,
                //     carbs: 1,
                //     protein: 1,
                //     fat: 1,
                //     fiber: 1,
                //     unitOfMeasure: { name: "Each" },
                //     weightType: { name: "" },
                //     photoURL: "",
                //     GRFUser: {
                //       _id: "62577a533813f4f21c27e1c7",
                //       handle: "Service",
                //     },
                //     brand: { name: "" },
                //   },
                //   genRecipe: {
                //     _id: "tempBreakfastRecipe1Id",
                //     name: "tempBreakfastRecipe1Name",
                //     availableMealType: {
                //       _id: "626dd6fc21888432c0fe3e90",
                //       code: "breakfast",
                //       name: "Breakfast",
                //     },
                //     GRFUser: {
                //       _id: "62577a533813f4f21c27e1c7",
                //       handle: "Service",
                //     },
                //     defaultPrepInstructions: "",
                //     photoUrl: "",
                //   },
                //   defaultPrepInstructions: "",
                // },
              ],
              thisMealsMacrosBudget: {},
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                    name: "monday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "monday",
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                    name: "tuesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "tuesday",
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                    name: "wednesday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "wednesday",
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                    name: "thursday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "thursday",
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                    name: "friday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "friday",
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
                    name: "saturday",
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
                  thisMealIngrdntJustCreated: false,
                  recordChanged: false,
                  thisMealIngrdntFormState: "viewing",
                  thisMealIngrdntUserType: "admin",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "admin",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "admin",
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
                          name: "saturday",
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
            },
          },
        },
      },
      thisWeekMealPlanOld: {},
      thisWeeksDaysOld: {
        sunday: {},
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
      },
    };
  }
  componentDidMount() {
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
    this.setState({ thisWeeksDays: thisWeeksDays });
    this.loadData();
  }
  loadData() {
    this.getThisWMPsDays();
    this.getThisWeekMealPlan();
    this.getAllGRFUsers();
    this.getAllDays();
    this.getAllRecipes();
    this.getAllIngredients();
    this.getAllMeals();
    this.getAllGenRecipeIngredients();
    this.getAllUnitOfMeasures();
    this.getAllWeightTypes();
    this.getAllBrands();
    this.getAllWMPs();
  }
  setUserType = (initialUserType, thisUsersId, thisObjAuthorId) => {
    if (initialUserType === "admin") {
      return "admin";
    } else {
      if (thisObjAuthorId === thisUsersId) {
        return "author";
      } else {
        return "viewer";
      }
    }
  };
  getThisWeekMealPlan = () => {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        let thisWeekMealPlan = this.state.thisWeekMealPlan;
        thisWeekMealPlan.thisWMP = response.data;
        let userType = this.setUserType(
          this.state.thisUserType,
          this.state.thisGRFUser._id,
          thisWeekMealPlan.thisWMP.GRFUser._id
        );
        thisWeekMealPlan.userType = userType;
        thisWeekMealPlan.dataLoaded = true;
        this.setState({ thisWeekMealPlan: thisWeekMealPlan });
      });
  };
  getThisWMPsDays = () => {
    axios
      .get(
        "http://localhost:5000/days/daysofthiswmp/" + this.props.match.params.id
      )
      .then((response) => {
        let daysData = response.data;
        if (daysData.length < 1) {
          return;
        } else {
          let daysOfWeek = this.state.daysOfWeek;

          let thisWeeksDays = this.state.thisWeeksDays;
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
                this.state.thisUserType,
                this.state.thisGRFUser._id,
                thisWeekDayData.weekMealPlan.GRFUser._id
              );
              thisDayToUpdate.userType = userType;
              this.getDayMeals(thisDayToUpdate, thisDayOfWeek.code);
            } else {
            }
            thisWeeksDays[thisDayOfWeek.code] = thisDayToUpdate;
          }
          this.setState({ thisWeeksDays });
        }
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
        if (mealsData.length < 1) {
          return;
        } else {
          for (let i = 0; i < mealTypes.length; i++) {
            let thisMealTypeCode = mealTypes[i].code;
            let thisDayMealData = mealsData.filter(
              (meal) => meal.mealType.code === thisMealTypeCode
            )[0];
            if (thisDayMealData !== undefined) {
              thisDaysMeals[thisMealTypeCode]["thisMeal"] = thisDayMealData;
              let mealUserType = this.setUserType(
                this.state.thisUserType,
                this.state.thisGRFUser._id,
                thisDayMealData.day.weekMealPlan.GRFUser._id
              );
              thisDaysMeals[thisMealTypeCode]["thisMealUserType"] =
                mealUserType;
              let genRecipeUserType = this.setUserType(
                this.state.thisUserType,
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
            } else {
            }
            thisWeeksDays[thisDayOfWeekCode]["thisDaysMeals"] = thisDaysMeals;
          }
          this.setState({ thisWeeksDays: thisWeeksDays });
        }
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
            this.state.thisUserType,
            this.state.thisGRFUser._id,
            mealIngrdntData[i].meal.day.weekMealPlan.GRFUser._id
          );
          let thisGenRecipeIngrdntUserType = this.setUserType(
            this.state.thisUserType,
            this.state.thisGRFUser._id,
            mealIngrdntData[i].genRecipeIngredient.genRecipe.GRFUser._id
          );
          let thisIngrdntUserType = this.setUserType(
            this.state.thisUserType,
            this.state.thisGRFUser._id,
            mealIngrdntData[i].genRecipeIngredient.ingredient.GRFUser._id
          );
          let thisMealIngrdnt = {
            thisMealIngrdntJustCreated: false,
            recordChanged: false,
            thisMealIngrdntFormState: "viewing",
            thisMealIngrdntUserType: thisMealIngrdntUserType,
            thisGenRecipeIngrdntFormState: "viewing",
            thisGenRecipeIngrdntUserType: thisGenRecipeIngrdntUserType,
            thisIngrdntFormState: "viewing",
            thisIngrdntUserType: thisIngrdntUserType,
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
  getAllGRFUsers = () => {
    axios.get("http://localhost:5000/GRFUsers/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          allGRFUsers: response.data.map((GRFUser) => GRFUser),
          allGRFUsersHasLoaded: true,
        });
      }
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
      });
    });
  };
  getAllIngredients = () => {
    axios.get("http://localhost:5000/ingredients/").then((response) => {
      this.setState({
        allIngredients: response.data.map((ingredient) => ingredient),
      });
    });
  };
  getAllMeals = () => {
    axios.get("http://localhost:5000/meals/").then((response) => {
      this.setState({
        allMeals: response.data.map((meal) => meal),
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
      this.setState({
        allBrands: response.data.map((brand) => brand),
      });
    });
  };
  getAllWMPs = () => {
    axios.get("http://localhost:5000/weekMealPlans/").then((response) => {
      this.setState({
        allWMPs: response.data.map((WMP) => WMP),
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
    state.thisWeeksDays = thisWeeksDaysBackup;
    state.thisWeekMealPlanOld = {};
    state.thisWeeksDaysOld = {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    };
    this.setState(state);
  };
  handleSaveFormChanges = (parentObj, stateObj) => {
    let recordToSave = parentObj;
    let recordId = recordToSave._id;
    let url = `http://localhost:5000/${stateObj}s/update${recordId}`;
    axios.post(url, parentObj).then(console.log("updated"));
  };
  deleteRecord = (recordId, ObjType) => {
    let url = `http://localhost:5000/${ObjType}s/${recordId}`;
    axios.delete(url).then(console.log("deleted"));
  };
  handleDeleteRecord = (parentObj, ObjType) => {
    let mealTypes = this.state.mealTypes;
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
        thisMealIngrdntJustCreated: false,
        recordChanged: false,
        thisMealIngrdntFormState: "viewing",
        thisMealIngrdntUserType: "viewer",
        thisGenRecipeIngrdntFormState: "viewing",
        thisGenRecipeIngrdntUserType: "viewer",
        thisIngrdntFormState: "viewing",
        thisIngrdntUserType: "viewer",
        thisMealIngrdnt: {
          _id: "missing",
          qty: 1,
          genRecipeIngredient: createRecipeIngrdntStateObj(genRecipe, mealType),
          meal: thisMealChild,
        },
      };
      return mealIngredient;
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
        _id: "missing",
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
        thisMealsIngrdnts: [createDefaultMealIngrdntStateObj(thisMealChild)],
        thisMealsMacrosBudget: {},
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
        dataLoaded: false,
        thisDay: createInnerDfltDayObj(dayOfWeek),
        thisDaysMeals: createDefaultDayMealsStateObj(dayOfWeek),
      };
      return defaultDayStateObj;
    }
    function createInnerDfltDayObj(dayOfWeek) {
      let innerDfltDayObj = {
        _id: "missing",
        name: `Temp WMP - ${dayOfWeek.name}`,
        dayOfWeek: dayOfWeek,
        weekMealPlan: {},
      };
      return innerDfltDayObj;
    }
    let thisWeeksDays = this.state.thisWeeksDays;
    switch (ObjType) {
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
        let dfltMealStateObjToSave = createDefaultMealStateObj(mealsMealType);
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
        console.log(thisWeeksDays);
        this.deleteRecord(parentObj.thisMealIngrdnt._id, "mealIngredient");
        break;
      case "genRecipeIngredient":
        break;
      case "ingredient":
        break;
    }
    this.setState({ thisWeeksDays });
  };
  handleUpdateProp = (
    ObjType,
    dayOfWeekCode,
    mealTypeCode,
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
    let initialUserType = state.thisUserType;
    let thisUsersId = state.thisGRFUser._id;
    switch (ObjType) {
      case "weekMealPlan":
        state.thisWeekMealPlan.thisWMP[propToUpdate] = newValue;
        state.thisWeekMealPlan.recordChanged = true;
        break;
      case "day":
        state.thisWeeksDays[dayOfWeekCode]["thisDay"][propToUpdate] = newValue;
        state.thisWeeksDays[dayOfWeekCode]["recordChanged"] = true;
        break;
      case "meal":
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMeal"
        ][propToUpdate] = newValue;
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "mealRecordChanged"
        ] = true;

        if (propToUpdate === "genRecipe") {
          state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
            "userChangedThisMealsRecipe"
          ] = true;
          state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
            "thisMealJustCreated"
          ] = false;
          let thisGenRecipeUserType = this.setUserType(
            initialUserType,
            thisUsersId,
            newValue.GRFUser._id
          );
          state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
            "thisGenRecipeUserType"
          ] = thisGenRecipeUserType;

          this.populateNewMealIngredients(
            initialUserType,
            thisUsersId,
            thisGenRecipeUserType,
            dayOfWeekCode,
            mealTypeCode,
            newValue
          );
        }
        break;
      case "genRecipe":
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMeal"
        ]["genRecipe"][propToUpdate] = newValue;
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "genRecipeRecordChanged"
        ] = true;
        break;
      case "mealIngredient":
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["thisMealIngrdnt"][propToUpdate] = newValue;
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["mealIngrdntRecordChanged"] = true;
        break;
      case "genRecipeIngredient":
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["thisMealIngrdnt"]["genRecipeIngredient"][propToUpdate] =
          newValue;
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["genRecipeIngrdntRecordChanged"] = true;
        if (propToUpdate === "ingredient") {
          let thisObjAuthorId = newValue._id;
          let newIngrdntUserType = this.setUserType(
            initialUserType,
            thisUsersId,
            thisObjAuthorId
          );
          state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
            "thisMealsIngrdnts"
          ][arrayIndex]["ingrdntUserType"] = newIngrdntUserType;
        }
        break;
      case "ingredient":
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["thisMealIngrdnt"]["genRecipeIngredient"]["ingredient"][
          propToUpdate
        ] = newValue;
        state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ][arrayIndex]["ingrdntRecordChanged"] = true;
        break;
    }
    this.setState({ state });
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
      dayOfWeek: dayOfWeek.code,
      weekMealPlan: this.state.id,
      name: this.state.name + " - " + dayOfWeek.name,
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
            (day) => day.dayOfWeek.code === "sunday"
          )[0],
          mon: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "monday"
          )[0],
          tues: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "tuesday"
          )[0],
          wed: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "wednesday"
          )[0],
          thurs: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "thursday"
          )[0],
          fri: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "friday"
          )[0],
          sat: this.state.thisWeeksDays.filter(
            (day) => day.dayOfWeek.code === "saturday"
          )[0],
        });
      });
  };
  populateNewMealIngredients = (
    initialUserType,
    thisUsersId,
    thisGenRecipeUserType,
    dayOfWeekCode,
    mealTypeCode,
    thisRecipe
  ) => {
    const thisRecipeId = thisRecipe._id;
    const thisMealObj =
      this.state.thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
        "thisMeal"
      ];
    const mealUserType = this.state.thisWeekMealPlan.userType;
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
            thisMealIngrdntJustCreated: false,
            recordChanged: false,
            thisMealIngrdntFormState: "viewing",
            thisMealIngrdntUserType: mealUserType,
            thisGenRecipeIngrdntFormState: "viewing",
            thisGenRecipeIngrdntUserType: thisGenRecipeUserType,
            thisIngrdntFormState: "viewing",
            thisIngrdntUserType: this.setUserType(
              initialUserType,
              thisUsersId,
              thisGenRecipeIngrdnt.ingredient.GRFUser._id
            ),
            thisMealIngrdnt: {
              _id: "tempId-" + this.getRndInteger(10000000, 99999999),
              qty: thisGenRecipeIngrdnt.defaultQty,
              genRecipeIngredient: thisGenRecipeIngrdnt,
              meal: thisMealObj,
            },
          };
          thisMealsNewMealIngrdnts.push(newMealIngredient);
        }
        let thisWeeksDays = this.state.thisWeeksDays;
        thisWeeksDays[dayOfWeekCode]["thisDaysMeals"][mealTypeCode][
          "thisMealsIngrdnts"
        ] = thisMealsNewMealIngrdnts;
        this.setState({ thisWeeksDays: thisWeeksDays });
      });
  };

  renderDay = (dayOfWeek) => {
    let pattern = /missing/;
    let weekMealPlan = this.state.thisWeekMealPlan;
    let thisWMP = weekMealPlan.thisWMP;
    let thisStateObj = this.state.thisWeeksDays[dayOfWeek.code];
    let dayLoadStatus = thisStateObj.dataLoaded;
    if (dayLoadStatus === false) {
      return;
    } else {
      let thisStateObjOld = this.state.thisWeeksDaysOld[dayOfWeek.code];
      let thisObject = thisStateObj.thisDay;
      let dayOfWeekName = thisObject.dayOfWeek.name;
      let thisObjectsAuthorsId = thisWMP.GRFUser._id;
      let thisObjectsId = thisObject._id;
      let testResult = pattern.test(thisObjectsId);
      let thisUser = this.state.thisGRFUser;
      let thisUsersId = thisUser._id;
      let thisUsersUserGroups = thisUser.userGroups;
      if (testResult === true) {
        if (
          thisObjectsAuthorsId === thisUsersId ||
          thisUsersUserGroups === "Admin"
        ) {
          return (
            <CreateDay2
              key={thisObjectsId}
              dayOfWeekName={dayOfWeekName}
              weekMealPlan={weekMealPlan}
              thisDay={thisStateObj}
              onCreateDay={this.handleCreateDay}
            />
          );
        } else {
          return (
            <div className="alert alert-secondary" role="alert">
              <em>
                <span>No {dayOfWeek.name}</span> Meal Plan added to this week...
              </em>
            </div>
          );
        }
      } else {
        return (
          <DayDetail3
            //Specific props
            key={thisObject._id}
            thisStateObj={thisStateObj}
            thisStateObjOld={thisStateObjOld}
            onChangeMealRecipe={this.handleChangeMealRecipe}
            thisWMP={thisWMP}
            //Common props
            //Data
            thisGRFUser={this.state.thisGRFUser}
            // hasChildren={dayHasChildren}
            allGRFUsers={this.state.allGRFUsers}
            allDays={this.state.allDays}
            allGenRecipes={this.state.allGenRecipes}
            mealTypes={this.state.mealTypes}
            allIngredients={this.state.allIngredients}
            allGenRecipeIngredients={this.state.allGenRecipeIngredients}
            allMeals={this.state.allMeals}
            allUnitOfMeasures={this.state.allUnitOfMeasures}
            allWeightTypes={this.state.allWeightTypes}
            allBrands={this.state.allBrands}
            daysOfWeek={this.state.daysOfWeek}
            allWMPs={this.state.allWMPs}
            //Methods
            onClickEditForm={this.handleClickEditForm}
            onCancelEditForm={this.handleCancelEditForm}
            onSaveFormChanges={this.handleSaveFormChanges}
            onDeleteRecord={this.handleDeleteRecord}
            onUpdateProp={this.handleUpdateProp}
            populateNewMealIngredients={this.populateNewMealIngredients}
          />
        );
      }
    }
  };
  render() {
    const daysOfWeek = this.state.daysOfWeek;
    const thisWMP = this.state.thisWeekMealPlan.thisWMP;
    const thisWMPId = this.state.thisWeekMealPlan.thisWMP._id;
    if (this.state.thisWeekMealPlan.dataLoaded === false) {
      return <div className="spinner-border text-primary" role="status"></div>;
    } else {
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
                  value={this.state.thisWeekMealPlan.thisWMP.name}
                  onChange={(e) => {
                    this.handleUpdateProp(
                      "weekMealPlan",
                      "",
                      "",
                      "name",
                      0,
                      "text",
                      e
                    );
                  }}
                  disabled={
                    this.state.thisWeekMealPlan.thisFormState === "viewing"
                      ? true
                      : false
                  }
                />
                <EditOptions
                  parentObj={this.state.thisWeekMealPlan}
                  objType="weekMealPlan"
                  thisFormState={this.state.thisWeekMealPlan.thisFormState}
                  userType={this.state.thisWeekMealPlan.userType}
                  recordChanged={this.state.thisWeekMealPlan.recordChanged}
                  onClickEditForm={this.handleClickEditForm}
                  onCancelEditForm={this.handleCancelEditForm}
                  onSaveFormChanges={this.handleSaveFormChanges}
                  onDeleteRecord={this.handleDeleteRecord}
                />
              </div>
            </div>
            <div className="form-group mt-2">
              <label>Author: </label>
              <select
                ref="userInput"
                required
                className="form-control form-select"
                value={this.state.thisWeekMealPlan.thisWMP.GRFUser.handle}
                onChange={(e) => {
                  this.handleUpdateProp(
                    "weekMealPlan",
                    "",
                    "",
                    "GRFUser",
                    0,
                    "select",
                    e
                  );
                }}
                disabled={
                  this.state.thisWeekMealPlan.thisFormState === "viewing"
                    ? true
                    : false
                }
              >
                {this.state.allGRFUsers.map(function (GRFUser) {
                  return (
                    <option key={GRFUser._id} value={GRFUser}>
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
                  id={"accordionFull_MealMacroWeighting" + thisWMPId}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_MealMacroWeighting" + thisWMPId}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#dayAccrdn_MealMacroWeighting" + thisWMPId
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_MealMacroWeighting" + thisWMPId}
                    className="accordion-collapse collapse show"
                    aria-labelledby={
                      "#accordionHeader_MealMacroWeighting" + thisWMPId
                    }
                    data-bs-parent={
                      "#accordionFull_MealMacroWeighting" + thisWMPId
                    }
                  >
                    <div className="accordion-body accrdnWeekMealPlanMacroBdy">
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Breakfast %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="35"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.breakfastWeight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "breakfastWeight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Snack 1 %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.snack1Weight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "snack1Weight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Lunch %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="30"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.lunchWeight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "lunchWeight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Snack 2 %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.snack2Weight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "snack2Weight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Dinner %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="20"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.dinnerWeight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "dinnerWeight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Dessert %</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="5"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.dessertWeight
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "dessertWeight",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
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
                  id={"accordionFull_MacroBudget" + thisWMPId}
                >
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"accordionHeader_MacroBudget" + thisWMPId}
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#dayAccrdn_MacroBudget" + thisWMPId}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      ></button>
                    </h2>
                  </div>
                  <div
                    id={"dayAccrdn_MacroBudget" + thisWMPId}
                    className="accordion-collapse collapse show"
                    aria-labelledby={"#accordionHeader_MacroBudget" + thisWMPId}
                    data-bs-parent={"#accordionFull_MacroBudget" + thisWMPId}
                  >
                    <div className="accordion-body accrdnWeekMealPlanMacroBdy">
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Calories (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="2000.00"
                          value={this.state.thisWeekMealPlan.thisWMP.calsBudget}
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "calsBudget",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ==
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Carbs (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="400.00"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.carbsBudget
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "carbsBudget",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Protein (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="300"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.proteinBudget
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "proteinBudget",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Fat (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="100"
                          value={this.state.thisWeekMealPlan.thisWMP.fatBudget}
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "fatBudget",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
                          }
                        ></input>
                      </div>
                      <div className="badge bg-primary weekMealPlanMacroBadge">
                        <h6>Fiber (g)</h6>
                        <input
                          type="number"
                          className="form-control weekMealPlanMacroInput"
                          placeholder="40"
                          value={
                            this.state.thisWeekMealPlan.thisWMP.fiberBudget
                          }
                          onChange={(e) => {
                            this.handleUpdateProp(
                              "weekMealPlan",
                              "",
                              "",
                              "fiberBudget",
                              0,
                              "number",
                              e
                            );
                          }}
                          disabled={
                            this.state.thisWeekMealPlan.thisFormState ===
                            "viewing"
                              ? true
                              : false
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
                    {this.renderDay(daysOfWeek[0])}
                    {this.renderDay(daysOfWeek[1])}
                    {this.renderDay(daysOfWeek[2])}
                    {this.renderDay(daysOfWeek[3])}
                    {this.renderDay(daysOfWeek[4])}
                    {this.renderDay(daysOfWeek[5])}
                    {this.renderDay(daysOfWeek[6])}
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
