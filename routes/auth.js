//@concept AUTHENTICATION ROUTE

const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');

const { config } = require('../config');

//@concept Basic Strategy
require('../utils/auth/strategies/basic');

//@action Create a function that will serve as router
const authApi = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    //@action If apiKeyToken doesn't exist return an error with boom
    if (!apiKeyToken) { next(boom.unauthorized('apiKeyToken is required')); }

    //@action I exists use passport authenticate to return a signed JWT
    passport.authenticate('basic', (error, user) => {
      try {
        //@action If there's an error or the user doesn't exists, return an error with boom
        if (error || !user) { next(boom.unauthorized()); }

        //@action if user exists, pass a request with the login, passing the user and define the session as false.
        req.login(user, { session: false }, async (error) => {
          if (error) { next(error) }

          //@action Using the apiKeysService passing the apiKeyToken from the body, to get the apiKey
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          //@action If apiKey doesn't exists, pass an unauthorized error
          if (!apiKey) { next(boom.unauthorized()); }

          //@action Destructure from user
          const { _id: id, name, email } = user;

          //@action Build the payload, passing the scopes from the api token
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          }

          //@action Build the signed JWt
          //@o It's important to set an expiration to secure it.
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });

          //@action Finally return a 200 response with the json composed by the token and the user
          return res.status(200).json({ token, user: { id, name, email } });
        })
      } catch (error) {
        next(error);
      }
      //@o As authenticate it's a custom callback must end with a closure with the router firm
    })(req, res, next);

  });
}

module.exports = authApi;

/**
 * @context To test this route on postman:
 * @action Create a new Post Request, passing the route /api/auth/sign-in
 * @action On the Authorization tab, select Basic Auth and pass the user credentials.
 * @action On the Body, pass the same apiKeyToken as in the DB depending on the type of user you want.
 * --
 * @o
 * If everything it's ok, you'll receive a response with the token and user.
 * @test
 * To debug, copy the JWT and paste it on https://jwt.io
*/