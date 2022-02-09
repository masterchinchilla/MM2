var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mealIngredientSchema = new Schema(
    {
        // name: { type: String, required: true, unique: true, maxLength: 500 },
        qty: {type: Number, required: true, maxLength: 100},
        genRecipeIngredient: {type: Schema.Types.ObjectId, ref: 'GenRecipeIngredient', required: true},
        meal: {type: Schema.Types.ObjectId, ref: 'Meal', required: true},
        prepInstructions: {type: String, maxLength: 3000},
    },
    { timestamps: true }
);
// Virtual general recipe ingredient's URL
mealIngredientSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/mealIngredient/' + this._id;
    });

//Export model
module.exports = mongoose.model('MealIngredient', mealIngredientSchema);