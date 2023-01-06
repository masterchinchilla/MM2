import mealTypes from "./mealTypes";
import daysOfWeek from "./daysOfWeek";
const newGRFUser={
    namePrefix: "",
    givenName: "",
    middleName: "",
    familyName: "",
    nameSuffix: "",
    email: "",
    password: "",
    handle: "",
    photoURL: "",
    certURL: "",
    certName: "",
    userGroups:"GRFUser",
    verified: false,
    isAdmin:false
};
const defaultGRFUser={
    _id:"62577a533813f4f21c27e1c7",
    namePrefix:"",
    givenName:"Service",
    middleName:"",
    familyName:"Worker",
    nameSuffix:"",
    email:"service@grf.macromenu.com",
    password:"12345",
    handle:"Service",
    certURL:"",
    certName:"",
    verified:false,
    createdAt:"2022-04-14T01:35:15.629+00:00",updatedAt:"2022-04-14T01:35:15.629+00:00"
};
const newUnitOfMeasure={
    name: "",
    GRFUser: {}
}
const newWeightType={
    name: "",
    GRFUser: {}
}
const newBrand={
    name: "",
    GRFUser: {}
}
const defaultUnitOfMeasure={
    _id:"627691779fa56aa1fe318390",
    name:"",
    GRFUser:defaultGRFUser
}
const defaultWeightType={
    _id:"627695899fa56aa1fe318396",
    name:"",
    GRFUser:defaultGRFUser
}
const defaultBrand={
    _id:"627691b69fa56aa1fe318393",
    name:"",
    GRFUser:defaultGRFUser
}
const newIngredient={
    name: "",
    calories: 0.0,
    carbs: 0.0,
    protein: 0.0,
    fat: 0.0,
    fiber: 0.0,
    unitOfMeasure: defaultUnitOfMeasure,
    weightType: defaultWeightType,
    photoURL: "",
    GRFUser: {},
    brand:defaultBrand
}
const defaultIngredient={
    _id:"627b329721ff100fa01edcaf",
    name:"",
    calories:0.0,
    carbs:0.0,
    protein:0.0,
    fat:0.0,
    fiber:0.0,
    unitOfMeasure:defaultUnitOfMeasure,
    GRFUser:defaultGRFUser
}
const newGenRecipe={
    name: "",
    availableMealType: {},
    GRFUser: {},
    defaultPrepInstructions: "",
    photoURL: ""
}
const defaultGenRecipesByMealType={
    snack1:{
        _id:"62577a7d93011a9b47306e6f",
        name:"",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="snack1")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    },
    breakfast:{
        _id:"62577f516682e3955e98b1d0",
        name:"  ",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="breakfast")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    },
    lunch:{
        _id:"62577f666682e3955e98b1d1",
        name:"   ",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="lunch")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    },
    snack2:{
        _id:"62577f786682e3955e98b1d2",
        name:"    ",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="snack2")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    },
    dinner:{
        _id:"62577f8b6682e3955e98b1d3",
        name:"     ",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="dinner")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    },
    dessert:{
        _id:"62577f9c6682e3955e98b1d4",
        name:"      ",
        availableMealType: mealTypes.filter(mealType=>mealType.code==="dessert")[0],
        GRFUser:defaultGRFUser,
        defaultPrepInstructions:"",
        photoURL:""
    }
}
//there are NOT any preexisting default genRecipeIngredients, mealIngredients,meals,days or weekMealPlans in DB!
const newGenRcpIngrdntsByMealType={
    snack1:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.snack1
    },
    breakfast:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.breakfast
    },
    lunch:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.lunch
    },
    snack2:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.snack2
    },
    dinner:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.dinner
    },
    dessert:{
        defaultQty:0.0,
        ingredient:defaultIngredient,
        genRecipe:defaultGenRecipesByMealType.dessert
    }
}
const newWeekMealPlan={
    name: "",
    GRFUser: {},
    breakfastWeight:0.0,
    snack1Weight:0.0,
    lunchWeight:0.0,
    snack2Weight:0.0,
    dinnerWeight:0.0,
    dessertWeight:0.0,
    calsBudget:0.0,
    carbsBudget:0.0,
    proteinBudget:0.0,
    fatBudget:0.0,
    fiberBudget:0.0
}
const newDayByDayOfWeek={
    sunday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="sunday")[0],
        weekMealPlan:{},
    },
    monday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="monday")[0],
        weekMealPlan:{},
    },
    tuesday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="tuesday")[0],
        weekMealPlan:{},
    },
    wednesday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="wednesday")[0],
        weekMealPlan:{},
    },
    thursday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="thursday")[0],
        weekMealPlan:{},
    },
    friday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="friday")[0],
        weekMealPlan:{},
    },
    saturday:{
        name:"",
        dayOfWeek: daysOfWeek.filter(dayOfWeek=>dayOfWeek.code==="saturday")[0],
        weekMealPlan:{},
    },
}
const newMealByAvlMealType={
    snack1:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.snack1,
        mealType:defaultGenRecipesByMealType.snack1.availableMealType
    },
    breakfast:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.breakfast,
        mealType:defaultGenRecipesByMealType.breakfast.availableMealType
    },
    lunch:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.lunch,
        mealType:defaultGenRecipesByMealType.lunch.availableMealType
    },
    snack2:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.snack2,
        mealType:defaultGenRecipesByMealType.snack2.availableMealType
    },
    dinner:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.dinner,
        mealType:defaultGenRecipesByMealType.dinner.availableMealType
    },
    dessert:{
        day:{},
        genRecipe:defaultGenRecipesByMealType.dessert,
        mealType:defaultGenRecipesByMealType.dessert.availableMealType
    }
}
const newMealIngrdntByMealType={
    snack1:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.snack1,
        meal:{},
    },
    breakfast:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.breakfast,
        meal:{},
    },
    lunch:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.lunch,
        meal:{},
    },
    snack2:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.snack2,
        meal:{},
    },
    dinner:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.dinner,
        meal:{},
    },
    dessert:{
        qty:0,
        genRecipeIngredient:newGenRcpIngrdntsByMealType.dessert,
        meal:{},
    }
}
export default {
    newGRFUser,
    defaultGRFUser,
    newUnitOfMeasure,
    newWeightType,
    newBrand,
    defaultUnitOfMeasure,
    defaultWeightType,
    defaultBrand,
    newIngredient,
    defaultIngredient,
    newGenRecipe,
    defaultGenRecipesByMealType,
    newGenRcpIngrdntsByMealType,
    newWeekMealPlan,
    newDayByDayOfWeek,
    newMealByAvlMealType,
    newMealIngrdntByMealType
}