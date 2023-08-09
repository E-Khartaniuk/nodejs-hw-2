const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "string.base": "the favorite field must be a string with a boolean value",
  }),
});

module.exports = { contactsAddSchema, contactUpdateFavoriteSchema };
