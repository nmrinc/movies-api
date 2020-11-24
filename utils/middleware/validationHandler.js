//@concept Data validation layer.
//@o A middleware that, with an object schema validation, let the client or user how to consume the API

//@o Require Boom dependency
const boom = require('@hapi/boom');

//@o Require Joi dependency
//@concept JOI: schema description language and data validator
const Joi = require('joi');

//@context This is the validation function.
const validate = (data, schema) => {
  //@o Compare data and the schema with Joi
  const { error } = new Joi.ValidationError(schema, data);

  return error;
}

//@context The validation handler scope the request comparing its body, params or query against an object schema.
const validationHandler = (schema, check = 'body') => {
  //@o Will return a middleware firm where if the validate function return a false in the comparison throw an error
  return (req, res, next) => {
    const error = validate(req[check], schema);

    //@context If there's an error call the next callback passing the error.
    //@o With Boom use the badRequest() that will return an invalid data error.
    error ? next(boom.badRequest()) : next();

  }
}

module.exports = validationHandler;