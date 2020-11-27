/**
 * @concept PASSPORT-JWT
 * @context
 * A Passport strategy for authenticating with a JSON Web Token.
 * @context
 * This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
*/

//@action Require passport, BasicStrategy, boom and bcrypt libraries
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

//@action UsersService and config
const UsersService = require('../../../services/users');
const { config } = require('../../../config/index');

//@action Define the new strategy on passport
passport.use(
  new Strategy({
    //@o Define the secret from the config file.
    secretOrKey: config.authJwtSecret,
    //@o Obtain the JWT from the header as a Bearer Token.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
    //@action Define the callback function that will receive the token payload.
    async (tokenPayload, cb) => {
      const usersService = new UsersService();

      try {
        //@action Using the service getUser by email from JWT verify if the user exist
        const user = await usersService.getUser({ email: tokenPayload.email });

        //@o If the user doesn't exist in the DB, return am error using boom.
        if (!user) { return cb(boom.unauthorized(), false) }

        //@action If the verifications pass, delete the password from the user object to avoid being visible.
        delete user.password;

        //@action Return the callback with the user and the scopes from the JWT.
        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (e) {
        return cb(e);
      }
    }
  )
);
