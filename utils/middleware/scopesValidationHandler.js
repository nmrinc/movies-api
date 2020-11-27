const boom = require('@hapi/boom');

const scopesValidationHandler = (allowedScopes) => {
  return (req, res, next) => {
    //@a Verify if there's a user and if has scopes. If not, throw an unauthorized error
    if(!req.user || (req.user && !req.user.scopes)) { next(boom.unauthorized('Missing Scopes')); }

    //@a Check if the scopes in the request exists in the allowed scopes. Then return a boolean.
    const hasAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));

    //@a If there's necessary scopes return the next middleware, if not return an error.
    if(hasAccess){
      next();
    }else{
      next(boom.unauthorized('Insufficient Scopes'));
    }
  }
}

module.exports = scopesValidationHandler;
