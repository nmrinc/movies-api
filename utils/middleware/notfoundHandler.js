//@concept BOOM : HTTP-friendly error objects.

//@o Require Boom dependency
const boom = require('@hapi/boom');

//@o This middleware doesn't receive next callback because will execute at the end of the routes
//@o so there's no more middleware to call.
const notFoundHandler = (req, res) => {
  //@o with boom.notFound will return automatically the 404 error status
  const { output: { statusCode, payload } } = boom.notFound();

  //@o Return the response with the status and the json with the payload
  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;