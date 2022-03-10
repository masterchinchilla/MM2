const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// const brandsRouter = require('./routes/brands');
const daysRouter = require('./routes/days');
// const genRecipeIngredientsRouter = require('./routes/genRecipeIngredients');
// const genRecipesRouter = require('./routes/genRecipes');
const GRFUsersRouter = require('./routes/GRFUsers');
// const ingredientsRouter = require('./routes/ingredients');
// const mealIngredientsRouter = require('./routes/mealIngredients');
// const mealsRouter = require('./routes/meals');
// const unitOfMeasuresRouter = require('./routes/unitOfMeasures');
const weekMealPlansRouter = require('./routes/weekMealPlans');
// const weightTypesRouter = require('./routes/weightTypes');

// app.use('/brands', brandsRouter);
app.use('/days', daysRouter);
// app.use('/genRecipeIngredients', genRecipeIngredientsRouter);
// app.use('/genRecipes', genRecipesRouter);
app.use('/GRFUsers', GRFUsersRouter);
// app.use('/ingredients', ingredientsRouter);
// app.use('/mealIngredients', mealIngredientsRouter);
// app.use('/meals', mealsRouter);
// app.use('/unitOfMeasures', unitOfMeasuresRouter);
app.use('/weekMealPlans', weekMealPlansRouter);
// app.use('/weightTypes', weightTypesRouter);

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});