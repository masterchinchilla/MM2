var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UOMSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: 100},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
    },
    { timestamps: true }
);
// Virtual for UOM's URL
UOMSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/unitOfMeasure/' + this._id;
    });

//Export model
module.exports = mongoose.model('UnitOfMeasure', UOMSchema);