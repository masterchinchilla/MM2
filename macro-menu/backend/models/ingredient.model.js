var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ingredientSchema = new Schema (
    {
        name: {type: String, required: true, unique: true, maxLength: 300},
        calories: {type: Number, required: true, maxLength: 100},
        carbs: {type: Number, required: true, maxLength: 100},
        protein: {type: Number, required: true, maxLength: 100},
        fat: {type: Number, required: true, maxLength: 100},
        fiber: {type: Number, required: true, maxLength: 100},
        unitOfMeasure: {type: Schema.Types.ObjectId, ref: 'UnitOfMeasure', required: true},
        weightType: { type: Schema.Types.ObjectId, ref: 'WeightType', required: true},
        photoURL: {type: String, maxLength: 1000},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    },
    {timestamps: true}
);
// Virtual for ingredient's URL
ingredientSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/ingredient/' + this._id;
    });

//Export model
module.exports = mongoose.model('Ingredient', ingredientSchema);