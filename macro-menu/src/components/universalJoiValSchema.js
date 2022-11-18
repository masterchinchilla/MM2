import Joi from "joi";
const valSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(255),
    reactSelect:Joi.string().trim().min(3).max(255).required(),
    floatPercent: Joi.number().min(0).max(100).required(),
    float: Joi.number().min(0).max(9999.99).required(),
    //string is the only primitive in Joi that doesn't allow an empty value. That's why you explicitly have to allow empty strings like this: Joi.string().allow("").
    textBox: Joi.string().trim().max(3000).allow(""),
    url: Joi.string().trim().uri().max(3000).allow(""),
});
export default valSchema;