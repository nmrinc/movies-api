const express = require('express');

//@a Require passport library
const passport = require('passport');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');

//@action Require the JWT strategy to secure the routes
require('../utils/auth/strategies/jwt');

const userMoviesApi = (app) => {
  const router = express.Router();

  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get('/', passport.authenticate('jwt', { session: false }), validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'User Movies Listed'
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.post('/', passport.authenticate('jwt', { session: false }), validationHandler(createUserMovieSchema), async (req, res, next) => {
    const { body: userMovie } = req;

    try {
      const createdUserMovieId = await userMoviesService.createUserMovie({ userMovie });

      res.status(201).json({
        data: createdUserMovieId,
        message: 'User Movie created'
      });
    } catch (e) {
      next(e);
    }
  });

  router.delete('/:userMovieId', passport.authenticate('jwt', { session: false }), validationHandler({ userMovieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { userMovieId } = req.params;

    try {
      const deletedUserMovieId = await userMoviesService.deleteUserMovie({
        userMovieId
      });

      res.status(200).json({
        data: deletedUserMovieId,
        message: 'User Movie deleted'
      });
    } catch (e) {
      next(e);
    }
  });
};

module.exports = userMoviesApi;

/**
 * @context To test this routes, after protect them with a JWT, you need to sign in.
 * @context And then in the authorization tab select the Bearer Token option and paste the given token.
*/