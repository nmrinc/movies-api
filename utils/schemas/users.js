const Joi = require('joi');

//@context As we use mongo, we define an ID of a mongo collection.
//@o Mongo ID it's an alphanumeric string that goes from 0 to 9, from letter a to f, and upper A to F. And consist on a total of 24 characters.
const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

//@o Basic user schema
const userSchema = {
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

//@o Schema to create new user
const createUserSchema = {
  ...userSchema,
  isAdmin: Joi.boolean()
}

//@o Provider to create a user for oAuth2 with third party services
const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: Joi.string().required()
}

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema
};
