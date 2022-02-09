var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var weightTypeSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: 100},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
    },
    { timestamps: true }
);
// Virtual for weight type's URL
weightTypeSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/weightType/' + this._id;
    });

//Export model
module.exports = mongoose.model('WeightType', weightTypeSchema);