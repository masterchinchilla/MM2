var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var brandSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: 100},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
    },
    { timestamps: true }
);
// Virtual for brand's URL
brandSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/brand/' + this._id;
    });

//Export model
module.exports = mongoose.model('Brand', brandSchema);