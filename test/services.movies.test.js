//@concept SERVICES TESTS

//@o Require assert and proxyquire
const assert = require('assert');
const proxyquire = require('proxyquire');

//@o Require mocks
const { MongoLibMock, getAllStub, getStub, createStub, updateStub, deleteStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {

  //@o with proxyquire replace the MongoDB lib with the mongo mock lib
  const MoviesService = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  //@o Set the mock lib to the instance
  const moviesService = new MoviesService();

  //@o As this service it's async we need to emulate.
  describe('When getMovies method is called', async () => {

    //@context This will verify if this method is called inside the lib
    it('should call the getAll MongoLib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    //@context This will verify if returns the collection of data
    it('should return an array of data', async () => {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });

  });

  describe('When getMovie method is called', async () => {
    it('should call the get MongoLib method', async () => {
      await moviesService.getMovie({});
      assert.strictEqual(getStub.called, true);
    });

    it('should return the retrieved movie', async () => {
      const result = await moviesService.getMovie({});
      const expected = moviesMock[0];
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('When createMovie method is called', async () => {
    it('should call the create MongoLib method', async () => {
      await moviesService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });

    it('should return the created movie id', async () => {
      const result = await moviesService.createMovie({});
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('When updateMovie method is called', async () => {
    it('should call the update MongoLib method', async () => {
      await moviesService.updateMovie({});
      assert.strictEqual(updateStub.called, true);
    });

    it('should return the updated movie id', async () => {
      const result = await moviesService.updateMovie({});
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('When patchMovie method is called', async () => {
    it('should call the patch MongoLib method', async () => {
      await moviesService.patchMovieParam({});
      assert.strictEqual(updateStub.called, true);
    });

    it('should return the updated movie id', async () => {
      const result = await moviesService.patchMovieParam({});
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

  describe('When deleteMovie method is called', async () => {
    it('should call the create MongoLib method', async () => {
      await moviesService.deleteMovie({});
      assert.strictEqual(deleteStub.called, true);
    });

    it('should return the deleted movie id', async () => {
      const result = await moviesService.deleteMovie({});
      const expected = moviesMock[0].id;
      assert.deepStrictEqual(result, expected);
    });
  });

});