//@concept MIDDLEWARE
//@o Are pieces of software that acts like a connector between other software pieces.
//@o Also known as software glue.

//@o Require Boom dependency
const boom = require('@hapi/boom');

//@o Require debug and set a namespace for app issues.
const debug = require('debug')('app:error');

//@o require config file
const { config } = require('../../config');

//@context This function let manage if show or not the error stack depending on the environment
const withErrorStack = (error, stack) => {
  if (config.dev) {
    //@o use the spread operator on the error to get access to all the properties.
    return { ...error, stack }
  }

  return error;
}

//@context This is am error handler middleware.
//@o So this will log the error
const logErrors = (err, req, res, next) => {
  debug(err);

  //@o To call the next error middleware we need to call next() and pass the error.
  next(err);
}

//@context This middleware will analyze if the error has boom format and if not add it to the general boom format
const wrapError = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

//@context As we're developing an API, we need to return the error as json
//! Linter will highlight an error because next are not in use, but we need to pass it so express knows it's an error middleware.
//@o We can tell lint that disable this error with the comment eslint-disable-line
const errorHandler = (err, req, res, next) => { //eslint-disable-line
  //@o decompile the error properties
  const { output: { statusCode, payload } } = err;

  //@o First we need to determine the status of the error, with boom only passing the statusCode
  res.status(statusCode);

  //@o To return a json use the withErrorStack functionality passing the error and it's stack
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapError,
  errorHandler
}