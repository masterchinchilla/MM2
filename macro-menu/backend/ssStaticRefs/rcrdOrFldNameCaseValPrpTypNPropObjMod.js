let UnitOfMeasure=require('../models/unitOfMeasure.model');
let WeightType=require('../models/weightType.model');
let Brand=require('../models/brand.model');
let GRFUser=require('../models/GRFUser.model');
let GenRecipeIngredient=require('../models/genRecipeIngredient.model');
let GenRecipe=require('../models/genRecipe.model');
let Ingredient=require('../models/ingredient.model');
let Meal=require('../models/meal.model');
let Day=require('../models/day.model');
let WeekMealPlan=require('../models/weekMealPlan.model');
let MealIngredient=require('../models/mealIngredient.model');
let DayOfWeek=require('../models/dayOfWeek.model');
let MealType=require('../models/mealType.model');
let PantryItem=require('../models/pantryItem.model');

const rcrdOrFldNameCaseValPrpTypNPropObjMod={
      GRFUser: {nameSntncCase:"Author",propTypeForVal:"objRef",PropObjModel:GRFUser},
      weekMealPlan: {nameSntncCase:"Week Meal Plan",propTypeForVal:"objRef",PropObjModel:WeekMealPlan},
      day: {nameSntncCase:"Day",propTypeForVal:"objRef",PropObjModel:Day},
      meal: {nameSntncCase:"Meal",propTypeForVal:"objRef",PropObjModel:Meal},
      genRecipe: {nameSntncCase:"Recipe",propTypeForVal:"objRef",PropObjModel:GenRecipe},
      mealIngredient: {nameSntncCase:"Meal Ingredient",propTypeForVal:"objRef",PropObjModel:MealIngredient},
      genRecipeIngredient: {nameSntncCase:"Recipe Ingredient",propTypeForVal:"objRef",PropObjModel:GenRecipeIngredient},
      ingredient: {nameSntncCase:"Base Ingredient",propTypeForVal:"objRef",PropObjModel:Ingredient},
      unitOfMeasure: {nameSntncCase:"UOM",propTypeForVal:"objRef",PropObjModel:UnitOfMeasure},
      weightType: {nameSntncCase:"Weight Type",propTypeForVal:"objRef",PropObjModel:WeightType},
      brand: {nameSntncCase:"Brand",propTypeForVal:"objRef",PropObjModel:Brand},
      name: {nameSntncCase:"Name",propTypeForVal:"name",PropObjModel:null},
      qty: {nameSntncCase:"Qty",propTypeForVal:"float",PropObjModel:null},
      defaultQty: {nameSntncCase:"Default Qty",propTypeForVal:"float",PropObjModel:null},
      qtyHave:{nameSntncCase:"Qty Have",propTypeForVal:"float",PropObjModel:null},
      photoURL: {nameSntncCase:"Photo URL",propTypeForVal:"url",PropObjModel:null},
      dayOfWeek: {nameSntncCase:"Day of Week",propTypeForVal:"objRef",PropObjModel:DayOfWeek},
      mealType: {nameSntncCase:"Meal Type",propTypeForVal:"objRef",PropObjModel:MealType},
      defaultMealType: {nameSntncCase:"Meal Type",propTypeForVal:"objRef",PropObjModel:MealType},
      availableMealType:{nameSntncCase:"Meal Type",propTypeForVal:"objRef",PropObjModel:MealType},
      pantryItem:{nameSntncCase:"Pantry Item",propTypeForVal:"objRef",PropObjModel:PantryItem},
      prepInstructions:{nameSntncCase:"Prep Instructions",propTypeForVal:"textBox",PropObjModel:null},
      defaultPrepInstructions: {nameSntncCase:"Prep Instructions",propTypeForVal:"textBox",PropObjModel:null},
      calories: {nameSntncCase:"Calories",propTypeForVal:"float",PropObjModel:null},
      calsBudget:{nameSntncCase:"Calories Budget",propTypeForVal:"float",PropObjModel:null},
      carbs: {nameSntncCase:"Carbs",propTypeForVal:"float",PropObjModel:null},
      carbsBudget: {nameSntncCase:"Carbs Budget",propTypeForVal:"float",PropObjModel:null},
      protein: {nameSntncCase:"Protein",propTypeForVal:"float",PropObjModel:null},
      proteinBudget: {nameSntncCase:"Protein Budget",propTypeForVal:"float",PropObjModel:null},
      fat: {nameSntncCase:"Fat",propTypeForVal:"float",PropObjModel:null},
      fatBudget: {nameSntncCase:"Fat Budget",propTypeForVal:"float",PropObjModel:null},
      fiber: {nameSntncCase:"Fiber",propTypeForVal:"float",PropObjModel:null},
      fiberBudget: {nameSntncCase:"Fiber Budget",propTypeForVal:"float",PropObjModel:null},
      breakfastWeight: {nameSntncCase:"Breakfast Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      snack1Weight: {nameSntncCase:"Snack 1 Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      lunchWeight: {nameSntncCase:"Lunch Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      snack2Weight: {nameSntncCase:"Snack 2 Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      dinnerWeight: {nameSntncCase:"Dinner Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      dessertWeight: {nameSntncCase:"Dessert Weight",propTypeForVal:"floatPercent",PropObjModel:null},
      createdAt: {nameSntncCase:"Date Created",propTypeForVal:null,PropObjModel:null},
      updatedAt: {nameSntncCase:"Last Update",propTypeForVal:null,PropObjModel:null},
      _id:{nameSntncCase:"ID",propTypeForVal:null,PropObjModel:null},
      __v:{nameSntncCase:"V",propTypeForVal:null,PropObjModel:null}
}
module.exports={rcrdOrFldNameCaseValPrpTypNPropObjMod};