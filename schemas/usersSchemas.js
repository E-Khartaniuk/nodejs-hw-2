const Joi = require("joi");
const { emailRegex } = require("../constantse/phoneNumber.js");

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = { userSigninSchema, userSignupSchema, userEmailSchema };
