

const initialWMPStateObj = {
      axiosCallConfig: {},
      httpRouteCore: "",
      backEndHtmlRoot: "",
      frontEndHtmlRoot: "",
      thisUserType: "viewer",
      thisGRFUser: {},
      thisWeekMealPlan: {
        thisWMPJustCreated: true,
        dataLoaded: false,
        thisFormState: "viewing",
        userType: "viewer",
        recordChanged: false,
        hasChildren: true,
        deleteChildrenWarning:
          "This Week Meal Plan has Days connected to it which must be deleted before you can delete the Week Meal Plan.",
        thisWMP: {
          id: "",
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
module.exports=initialWMPStateObj;