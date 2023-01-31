var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pantryItemSchema = new Schema(
    {
        qtyHave: { type: Number, required: true, maxLength: 100 },
        ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient', required: true},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
    },
    { timestamps: true }
);
module.exports = mongoose.model('PantryItem', pantryItemSchema);