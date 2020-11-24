const Joi = require('joi');

//@context As we use mongo, we define an ID of a mongo collection.
//@o Mongo ID it's an alphanumeric string that goes from 0 to 9, from letter a to f, and upper A to F. And consist on a total of 24 characters.
const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean()
};

module.exports = {
  userIdSchema,
  createUserSchema
};
