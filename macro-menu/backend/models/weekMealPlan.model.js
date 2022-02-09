var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var weekMealPlanSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, minLength: 3, maxLength: 300},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
    },
    {timestamps: true}
);
// Virtual for week meal plan's URL
weekMealPlanSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/weekMealPlan/' + this._id;
    });

//Export model
module.exports = mongoose.model('WeekMealPlan', weekMealPlanSchema);