var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var weekMealPlanSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, minLength: 3, maxLength: 300},
        GRFUser: {type: Schema.Types.ObjectId, ref: 'GRFUser', required: true},
        breakfastWeight:{type: Number, required: true},
        snack1Weight:{type: Number, required: true},
        lunchWeight:{type: Number, required: true},
        snack2Weight:{type: Number, required: true},
        dinnerWeight:{type: Number, required: true},
        dessertWeight:{type: Number, required: true},
        calsBudget:{type: Number, required: true},
        carbsBudget:{type: Number, required: true},
        proteinBudget:{type: Number, required: true},
        fatBudget:{type: Number, required: true},
        fiberBudget:{type: Number, required: true},
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