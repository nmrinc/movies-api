const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');

const userMoviesApi = (app) => {
  const router = express.Router();

  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get('/', validationHandler({ userId: userIdSchema }, 'query'),
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

  router.post('/', validationHandler(createUserMovieSchema), async (req, res, next) => {
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

  router.delete('/:userMovieId', validationHandler({ userMovieId: movieIdSchema }, 'params'), async (req, res, next) => {
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
