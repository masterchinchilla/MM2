var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var genRecipeIngredientSchema = new Schema(
    {
        // name: { type: String, required: true, unique: true, maxLength: 500 },
        defaultQty: {type: Number, required: true, maxLength: 100},
        ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient', required: true},
        genRecipe: {type: Schema.Types.ObjectId, ref: 'GenRecipe', required: true},
        defaultPrepInstructions: {type: String, maxLength: 3000},
    },
    { timestamps: true }
);
// Virtual general recipe ingredient's URL
genRecipeIngredientSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/genRecipeIngredient/' + this._id;
    });

//Export model
module.exports = mongoose.model('GenRecipeIngredient', genRecipeIngredientSchema);