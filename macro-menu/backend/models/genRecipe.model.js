var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var genRecipeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: 300},
        availableMealType: { type: Schema.Types.ObjectId, ref: 'MealType', required: true},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
        defaultPrepInstructions: {type: String, maxLength: 3000},
        photoURL: {type: String, maxLength: 1000}
    },
    { timestamps: true }
);
module.exports = mongoose.model('GenRecipe', genRecipeSchema);