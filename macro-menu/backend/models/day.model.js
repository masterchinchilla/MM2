var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var daySchema = new Schema(
    {
        // name: { type: String, required: true, unique: true, maxLength: 500 },
        dayOfWeek: {type: String, required: true, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], default: 'Sunday'},
        weekMealPlan: {type: Schema.Types.ObjectId, ref: 'WeekMealPlan', required: true},
    },
    { timestamps: true }
);
// Virtual day's URL
daySchema
    .virtual('url')
    .get(function () {
        return '/dbHome/day/' + this._id;
    });
daySchema
    .virtual('iFrameUrl')
    .get(function () {
        return '/dbHome/day/' + this._id + '/iFrame';
    });
//Export model
module.exports = mongoose.model('Day', daySchema);