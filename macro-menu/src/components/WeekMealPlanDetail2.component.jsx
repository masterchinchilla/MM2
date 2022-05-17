import React, { Component } from "react";
import axios from "axios";
import DayDetail from "./DayDetail.component";
import EditOptions from "./EditOptions.component";
import CreateDay2 from "./CreateDay2.component";
import DayDetail2 from "./DayDetail2.component";

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
      thisGRFUser: {
        _id: "60cd31910b74083490750ed0",
        namePrefix: "",
        givenName: "Jane",
        middleName: "",
        familyName: "Doe",
        nameSuffix: "",
        email: "janedoe@gmail.com",
        password: "abcd1234",
        handle: "jane_fit_1985",
        certURL: "",
        certName: "",
        userGroups: "Admin",
      },
      thisWeekMealPlan: {
        dataLoaded: false,
        thisFormState: "viewing",
        userType: "viewer",
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
      allGRFUsers: [{ _id: "tempGRFUser1Id", handle: "tempGRFUser1Handle" }],
      allDays: [
        {
          _id: "tempDay1Id",
          name: "tempDayName1",
          dayOfWeek: "Sunday",
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
      daysOfWeek: [
        { name: "Sunday", code: "sunday" },
        { name: "Monday", code: "monday" },
        { name: "Tuesday", code: "tuesday" },
        { name: "Wednesday", code: "wednesday" },
        { name: "Thursday", code: "thursday" },
        { name: "Friday", code: "friday" },
        { name: "Saturday", code: "saturday" },
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
            dayOfWeek: "Sunday",
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
      thisWeeksDays: {
        sunday: {
          dataLoaded: false,
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Sunday",
            dayOfWeek: "Sunday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
        monday: {
          dataLoaded: false,
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Monday",
            dayOfWeek: "Monday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Tuesday",
            dayOfWeek: "Tuesday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Wednesday",
            dayOfWeek: "Wednesday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Thursday",
            dayOfWeek: "Thursday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Friday",
            dayOfWeek: "Friday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
          thisDay: {
            _id: "missing",
            name: "Temp WMP - Saturday",
            dayOfWeek: "Saturday",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
              thisMealUserType: "viewer",
              thisGenRecipeFormState: "viewing",
              thisGenRecipeUserType: "viewer",
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
                  thisMealIngrdntUserType: "viewer",
                  thisGenRecipeIngrdntFormState: "viewing",
                  thisGenRecipeIngrdntUserType: "viewer",
                  thisIngrdntFormState: "viewing",
                  thisIngrdntUserType: "viewer",
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
    };
  }
  componentDidMount() {
    let daysOfWeek = this.state.daysOfWeek;
    let mealTypes = this.state.mealTypes;
    let thisWeeksDays = this.state.thisWeeksDays;
    for (let i = 0; i < thisWeeksDays.length; i++) {
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
  }
  getThisWeekMealPlan = () => {
    axios
      .get("http://localhost:5000/weekMealPlans/" + this.props.match.params.id)
      .then((response) => {
        let thisWeekMealPlan = this.state.thisWeekMealPlan;
        thisWeekMealPlan.thisWMP = response.data;
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
              (day) => day.dayOfWeek === thisDayOfWeek.name
            )[0];
            let thisDayToUpdate = thisWeeksDays[thisDayOfWeek.code];
            thisDayToUpdate.dataLoaded = true;
            if (thisWeekDayData) {
              thisDayToUpdate.thisDay = thisWeekDayData;
              this.getDayMeals(thisDayToUpdate, thisDayOfWeek.code);
            } else {
            }
            thisWeeksDays[thisDayOfWeek.code] = thisDayToUpdate;
          }
          this.setState({ thisWeeksDays });
        }
      });
  };
  getDayMeals = (thisDayToUpdate, thisDayOfWeek) => {
    let thisDaysId = thisDayToUpdate.thisDay._id;
    axios
      .get("http://localhost:5000/meals/mealsofthisday/" + thisDaysId)
      .then((response) => {
        let mealsData = response.data;
        if (mealsData.length < 1) {
          return;
        } else {
          let mealTypes = this.state.mealTypes;
          let thisDaysMeals = thisDayToUpdate.thisDaysMeals;
          let thisWeeksDays = this.state.thisWeeksDays;
          for (let i = 0; i < mealTypes.length; i++) {
            let thisMealType = mealTypes[i].code;
            let thisDayMealData = mealsData.filter(
              (meal) => meal.mealType.code === thisMealType
            )[0];
            if (thisDayMealData !== undefined) {
              thisDaysMeals[thisMealType]["thisMeal"] = thisDayMealData;
              thisDaysMeals[thisMealType]["dataLoaded"] = true;
              this.getMealIngrdnts(
                thisDaysMeals[thisMealType],
                thisDayOfWeek,
                thisMealType
              );
            } else {
            }
            thisWeeksDays[thisDayOfWeek]["thisDaysMeals"] = thisDaysMeals;
          }
          this.setState({ thisWeeksDays: thisWeeksDays });
        }
      });
  };
  getMealIngrdnts = (thisMealToUpdate, thisDayOfWeek, thisMealType) => {
    let thisMealsId = thisMealToUpdate.thisMeal._id;
    axios
      .get(
        "http://localhost:5000/mealIngredients/thisMealsMealIngredients/" +
          thisMealsId
      )
      .then((response) => {
        let mealIngrdntData = response.data;
        if (mealIngrdntData.length < 1) {
          return;
        } else {
          let thisMealsIngrdnts = [];
          for (let i = 0; i < mealIngrdntData.length; i++) {
            let thisMealIngrdnt = {
              thisMealIngrdntJustCreated: false,
              recordChanged: false,
              thisMealIngrdntFormState: "viewing",
              thisMealIngrdntUserType: "viewer",
              thisGenRecipeIngrdntFormState: "viewing",
              thisGenRecipeIngrdntUserType: "viewer",
              thisIngrdntFormState: "viewing",
              thisIngrdntUserType: "viewer",
              thisMealIngrdnt: mealIngrdntData[i],
            };
            thisMealsIngrdnts.push(thisMealIngrdnt);
          }
          thisMealToUpdate.thisMealsIngrdnts = thisMealsIngrdnts;
          let thisWeeksDays = this.state.thisWeeksDays;
          thisWeeksDays[thisDayOfWeek]["thisDaysMeals"][thisMealType][
            "thisMealsIngrdnts"
          ] = thisMealsIngrdnts;
          thisWeeksDays[thisDayOfWeek]["thisDaysMeals"][thisMealType][
            "mealIngrdntsLoaded"
          ] = true;
          this.setState({ thisWeeksDays });
        }
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
  handleClickEditForm = () => {
    console.log("Clicked Edit");
  };
  handleCancelEditForm = () => {
    console.log("Clicked Cancel");
  };
  handleSaveFormChanges = (parentObj, stateObj) => {
    let recordToSave = parentObj;
    let recordId = recordToSave._id;
    let url = `http://localhost:5000/${stateObj}s/update${recordId}`;
    axios.post(url, parentObj).then(console.log("updated"));
  };
  deleteRecord = (recordId, stateObj) => {
    let url = `http://localhost:5000/${stateObj}s/${recordId}`;
    axios.delete(url).then(console.log("deleted"));
  };
  handleDeleteRecord = (parentObj, stateObj) => {
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
    function createDefaultMealStateObj(mealType) {
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
        day: {},
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
        thisRecipesIngrdnts: [createRecipeIngrdntStateObj(genRecipe, mealType)],
        thisMealsMacrosBudget: {},
      };
      return thisMealParent;
    }
    function createDefaultDayMealsStateObj() {
      let dfltDayMealsStateObj = {
        breakfast: createDefaultMealStateObj(mealTypes[0]),
        snack1: createDefaultMealStateObj(mealTypes[1]),
        lunch: createDefaultMealStateObj(mealTypes[2]),
        snack2: createDefaultMealStateObj(mealTypes[3]),
        dinner: createDefaultMealStateObj(mealTypes[4]),
        dessert: createDefaultMealStateObj(mealTypes[5]),
      };
      return dfltDayMealsStateObj;
    }
    function createDefaultDayStateObj(dayOfWeek) {
      let defaultDayStateObj = {
        dataLoaded: false,
        thisDay: {
          _id: "missing",
          name: `Temp WMP - ${dayOfWeek.name}`,
          dayOfWeek: dayOfWeek.name,
          weekMealPlan: {},
        },
        thisDaysMeals: createDefaultDayMealsStateObj(dayOfWeek),
      };
      return defaultDayStateObj;
    }
    let thisWeeksDays = this.state.thisWeeksDays;
    switch (stateObj) {
      case "day":
        let daysDayOfWeek = parentObj.dayOfWeek;
        let daysDayOfWeekCode = daysDayOfWeek.code;
        let dfltDayStateObjToSave = createDefaultDayStateObj(daysDayOfWeek);
        thisWeeksDays[daysDayOfWeekCode] = dfltDayStateObjToSave;
        this.deleteRecord(parentObj._id, "day");
        break;
      case "meal":
        let mealsDayOfWeek = parentObj.day.dayOfWeek;
        let mealsDayOfWeekCode = mealsDayOfWeek.code;
        let mealsMealType = parentObj.mealType;
        let mealsMealTypeCode = mealsMealType.code;
        let dfltMealStateObjToSave = createDefaultMealStateObj(mealsMealType);
        thisWeeksDays[mealsDayOfWeekCode]["thisDaysMeals"][mealsMealTypeCode] =
          dfltMealStateObjToSave;
        this.deleteRecord(parentObj._id, "meal");
        break;
      case "genRecipe":
        break;
      case "mealIngredient":
        let mealIngrdntsDayOfWeek = parentObj.meal.day.dayOfWeek;
        let mealIngrdntsDayOfWeekCode = mealIngrdntsDayOfWeek.code;
        let mealIngrdntsMealType = parentObj.meal.mealType;
        let mealIngrdntsMealTypeCode = mealIngrdntsMealType.code;
        let mealIngrdntIdToDelete = parentObj._id;
        function removeDeletedMealIngrdnt(eachMealIngrdnt) {
          return eachMealIngrdnt._id !== mealIngrdntIdToDelete;
        }
        let mealIngrdntListToFilter =
          thisWeeksDays[mealsDayOfWeekCode]["thisDaysMeals"][mealsMealTypeCode][
            "thisMealsIngrdnts"
          ];
        mealIngrdntListToFilter.filter(removeDeletedMealIngrdnt);
        thisWeeksDays[mealsDayOfWeekCode]["thisDaysMeals"][mealsMealTypeCode][
          "thisMealsIngrdnts"
        ] = mealIngrdntListToFilter;
        this.deleteRecord(parentObj._id, "mealIngredient");
        break;
      case "genRecipeIngredient":
        break;
      case "ingredient":
        break;
    }
    this.setState({ thisWeeksDays });
  };
  handleUpdateProp = () => {
    console.log("Updated Prop");
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
  renderDays = () => {
    let daysOfWeek = this.state.daysOfWeek;
    let pattern = /missing/;
    for (let i = 0; i < daysOfWeek.length; i++) {
      let thisDayOfWeekCode = daysOfWeek[i].code;
      let thisDayStateObject = this.state.thisWeeksDays[thisDayOfWeekCode];
      let thisDay = thisDayStateObject.thisDay;
      console.log(thisDay);
      // let thisDaysAuthorId = thisDay.GRFUser._id;
      // let thisDaysId = thisDay._id;
      // let testResult = pattern.test(thisDaysId);
      // let thisGRFUser = this.state.thisGRFUser;
      // let thisGRFUsersId = thisGRFUser._id;
      // let thisGRFuserGroups = thisGRFUser.userGroups;
      // if (testResult) {
      //   if (
      //     thisDaysAuthorId === thisGRFUsersId ||
      //     thisGRFuserGroups === "Admin"
      //   ) {
      //     return (
      //       <CreateDay2
      //         key={thisDayStateObject.thisDay._id}
      //         thisDay={thisDayStateObject}
      //         onCreateDay={this.handleCreateDay}
      //       />
      //     );
      //   } else {
      //     return (
      //       <em>No {daysOfWeek[i].name} Meal Plan added to this week...</em>
      //     );
      //   }
      // } else {
      //   return (
      //     <h1>Day Detail</h1>
      // <DayDetail3
      //   //Specific props
      //   key={thisDayStateObject.thisDay._id}
      //   thisDay={thisDayStateObject}
      //   onChangeMealRecipe={this.handleChangeMealRecipe}
      //   //Common props
      //   //Data
      //   thisGRFUser={this.state.thisGRFUser}
      //   allGRFUsers={this.state.allGRFUsers}
      //   allDays={this.state.allDays}
      //   allGenRecipes={this.state.allGenRecipes}
      //   mealTypes={this.state.mealTypes}
      //   allIngredients={this.state.allIngredients}
      //   allGenRecipeIngredients={this.state.allGenRecipeIngredients}
      //   allMeals={this.state.allMeals}
      //   allUnitOfMeasures={this.state.allUnitOfMeasures}
      //   allWeightTypes={this.state.allWeightTypes}
      //   allBrands={this.state.allBrands}
      //   //Methods
      //   onClickEditForm={this.handleClickEditForm}
      //   onCancelEditForm={this.handleCancelEditForm}
      //   onSaveFormChanges={this.handleSaveFormChanges}
      //   onDeleteRecord={this.handleDeleteRecord}
      //   onUpdateProp={this.handleUpdateProp}
      // />
      // );
      // }
    }
  };
  render() {
    let pattern = /missing/;
    const thisWeekMealPlan = this.state.thisWeekMealPlan;
    const thisWMPId = thisWeekMealPlan.thisWMP._id;
    if (thisWeekMealPlan.dataLoaded === false) {
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
                  value={thisWeekMealPlan.thisWMP.name}
                  onChange={(e) => {
                    this.handleUpdateProp(
                      "weekMealPlan",
                      "",
                      "name",
                      0,
                      "text",
                      e
                    );
                  }}
                  disabled={
                    thisWeekMealPlan.thisFormState === "viewing" ? true : false
                  }
                />
                <EditOptions
                  parentObj={thisWeekMealPlan}
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
                className="form-control"
                value={thisWeekMealPlan.thisWMP.GRFUser.handle}
                onChange={(e) => {
                  this.handleUpdateProp(
                    "weekMealPlan",
                    "",
                    "GRFUser",
                    0,
                    "select",
                    e
                  );
                }}
                disabled={
                  thisWeekMealPlan.thisFormState === "viewing" ? true : false
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
                    {pattern.test(
                      this.state.thisWeeksDays.sunday.thisDay._id
                    ) ? (
                      <CreateDay2
                        key={this.state.thisWeeksDays.sunday.thisDay}
                        thisDay={this.state.thisWeeksDays.sunday}
                        onCreateDay={this.handleCreateDay}
                      />
                    ) : (
                      <h1>Breakfast Detail</h1>
                    )}
                    {this.renderDays()}
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
