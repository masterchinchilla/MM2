               
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mealSchema = new Schema(
    {
        // name: {type: String, required: true, unique: true, maxLength: 500},
        day: {type: Schema.Types.ObjectId, ref: 'Day', required: true},
        genRecipe: { type: Schema.Types.ObjectId, ref: 'GenRecipe', required: true},
        prepInstructions: {type: String, maxLength: 3000},
        mealType: { type: Schema.Types.ObjectId, ref: 'MealType', required: true},
    },
    { timestamps: true }
);
module.exports = mongoose.model('Meal', mealSchema);