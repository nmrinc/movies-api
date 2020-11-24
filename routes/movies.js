//@concept ROUTES FILE
//@context Their unique responsibility its know how to receive params and how will send them to the services

//@o First we require the express module
const express = require('express');

//@o Require the service
const MoviesService = require('./../services/movies');

//@o Require the schemas
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('./../utils/schemas/movies');

//@o Require Validation handler
const validationHandler = require('./../utils/middleware/validationHandler');

//@o Require cacheResponse and TIMES
const cacheResponse = require('./../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY__MINUTES_IN_SECONDS
} = require('./../utils/time');

//@o As we now have a service, we no longer require the mock data file
//const { moviesMock } = require('../utils/mocks/movies.js');

//@o Create a function where the routes will be contained and get the express app
const moviesApi = (app) => {
  //@o Create a router from express
  const router = express.Router();

  //@o Pass the route and router to the received api
  app.use('/api/movies', router);

  //@o Instance a new service
  const moviesService = new MoviesService();

  //@o To feed the router we make a get request with a given route
  //@o As it's async code, we declare it in the callback function.
  router.get('/', async (req, res, next) => {

    //@o Add the cacheResponse and pass the res. Setting a time.
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    //@o Destructure the query from the request
    //@concept QUERY: When the route has a ?, a query name and can be concatenated.
    const { tags } = req.query;

    try {
      //@o Here we'll receive the data from the service, specifying what we need to receive
      const movies = await moviesService.getMovies({ tags });
      //@context This is an error created to test the Error Middleware
      //throw new Error('There was an error getting the movies');

      //@o Define the response status 200 and a json
      //@o where will have the structure with the data and a message so the client know what happened.
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (e) {
      //@o With next we tell express to handle an error
      next(e);
    }
  });

  //@o In this case will receive an ID from the request and resolve the movie with this ID.
  //@o Pass the validationHandler into the middleware params
  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {

    //@o Based to the business logic add more time to less frequent.
    cacheResponse(res, SIXTY__MINUTES_IN_SECONDS);

    //@concept PARAMS: Are established within the URL
    const { movieId } = req.params;

    try {
      const movies = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movies,
        message: 'movie retrieved'
      });
    } catch (e) {
      next(e);
    }
  });

  //@o Here we'll create a new movie
  router.post('/', validationHandler(createMovieSchema), async (req, res, next) => {

    //@o This will be called from the request's body. To have a more readable code we can assign an alias to that body.
    const { body: movie } = req;

    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (e) {
      next(e);
    }
  });

  //@o Here we'll update a movie. Put replaces a full resource in the specific location.
  router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {

    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie });

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      });
    } catch (e) {
      next(e);
    }
  });

  //@o Here we'll a param of a movie. PATCH updates only a part/property of the resource.
  router.patch('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {

    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const patchedMovieParam = await moviesService.patchMovieParam({ movieId, movie });

      res.status(200).json({
        data: patchedMovieParam,
        message: 'movie param patched'
      });
    } catch (e) {
      next(e);
    }
  });

  //@o Here we'll delete a movie
  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {

    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      });
    } catch (e) {
      next(e);
    }
  });

}

//@o Export the function
module.exports = moviesApi;