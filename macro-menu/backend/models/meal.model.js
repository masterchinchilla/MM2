               
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mealSchema = new Schema(
    {
        // name: {type: String, required: true, unique: true, maxLength: 500},
        day: {type: Schema.Types.ObjectId, ref: 'Day', required: true},
        genRecipe: { type: Schema.Types.ObjectId, ref: 'GenRecipe', required: true},
        prepInstructions: {type: String, maxLength: 3000},
        mealType: { type: String, required: true, enum: ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner', 'Dessert'] },
    },
    { timestamps: true }
);
// Virtual meal's URL
mealSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/meal/' + this._id;
    });
mealSchema
    .virtual('iFrameUrl')
    .get(function () {
        return '/dbHome/meal/' + this._id + '/iFrame';
    });
//Export model
module.exports = mongoose.model('Meal', mealSchema);