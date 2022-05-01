var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mealTypeSchema = new Schema(
    {
        code: { type: String, required: true, enum: ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner', 'dessert'] },
        name: { type: String, required: true, enum: ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner', 'Dessert'] }
    },
    { timestamps: true }
);

module.exports = mongoose.model('MealType', mealTypeSchema);