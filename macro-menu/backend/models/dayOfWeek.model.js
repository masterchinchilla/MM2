 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dayOfWeekSchema = new Schema(
    {
        code: { type: String, required: true, enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'] },
        name: { type: String, required: true, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'] }
    },
    { timestamps: true }
);

module.exports = mongoose.model('DayOfWeek', dayOfWeekSchema);