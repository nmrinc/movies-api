/**
 *@concept Auth Strategies with Passport
 *--
 *@concept BASIC SCHEME
 *@context The Basic scheme uses a username and password to authenticate a user. These credentials are transported in plain text, so it is advised to use HTTPS when implementing this scheme.
*/

//@action Require passport, BasicStrategy, boom and bcrypt libraries
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

//@action UsersService
const UsersService = require('../../../services/users');

//@action Define the new strategy on passport
passport.use(new BasicStrategy(async (email, password, cb) => {
  //@action Instance a new usersService
  const usersService = new UsersService();

  //@action Create a try catch to get the user auth
  try {
    //@action Using the service getUser by it's email verify if the user exist
    const user = await usersService.getUser({ email });

    //@o If the user doesn't exist in the DB, return am error using boom.
    if (!user) { return cb(boom.unauthorized(), false) }

    //@o Verify if the password match. If not, throw an error using boom.
    if (!(await bcrypt.compare(password, user.password))) { return cb(boom.unauthorized(), false) }

    //@action If the verifications pass, delete the password from the user object to avoid being visible.
    delete user.password;

    //@action Return the user with a null on the error.
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
}));
