const mongoose = require('mongoose');
mongoose.Schema.Types.Boolean.convertToFalse.add('');
const Schema = mongoose.Schema;
const GRFUserSchema = new Schema(
    {
       namePrefix: {type: String, maxLength: 100},
       givenName: {type: String, required: true, maxLength: 100},
       middleName: {type: String, maxLength: 100},
       familyName: {type: String, required: true, maxLength: 100},
       nameSuffix: {type: String, maxLength: 100},
       email: {type: String, required: true, match: /.+\@.+\..+/, unique: true, minLength:5,maxLength: 255},
       password: { type: String, required: true, minLength: 3, maxLength: 1024},
       handle: {type: String, required: true, unique: true, minLength: 3, maxLength: 100},
       photoURL: {type: String, maxLength: 1000},
       certURL: {type: String, maxLength: 1000},
       certName: {type: String, maxLength: 1000},
       userGroups:{type:String, required:true,enum:['GRFUser','Admin'],default:'GRFUser'},
       verified: {type: Boolean},
       isAdmin:{type:Boolean}
    },
    { timestamps: true }
);
//Virtual for users full name
GRFUserSchema
    .virtual('fullName')
    .get(function () {
        return this.givenName + " " + this.familyName;
    });
// Virtual for GRFUser's URL
GRFUserSchema
    .virtual('url')
    .get(function () {
        return '/dbHome/GRFUser/' + this._id;
    });

//Export model
module.exports = mongoose.model('GRFUser', GRFUserSchema);