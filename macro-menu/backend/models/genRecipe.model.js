var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var genRecipeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: 300},
        availableMealType: {type: String, required: true, enum: ['Breakfast', 'Snack', 'Lunch', 'Dinner', 'Dessert']},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
        defaultPrepInstructions: {type: String, maxLength: 3000},
        photoURL: {type: String, maxLength: 1000}
    },
    { timestamps: true }
);
// Virtual general recipe's URL
genRecipeSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/genRecipe/' + this._id;
    });

//Export model
module.exports = mongoose.model('GenRecipe', genRecipeSchema);