//@concept ROUTES TESTS

//@o Require assert and proxyquire
const assert = require('assert');

//@concept PROXYQUIRE
//@context Proxies nodejs's require in order to make overriding dependencies during testing easy while staying totally unobtrusive.
const proxyquire = require('proxyquire');

//@o Require mocks
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');

//@o Require the test server
const testServer = require('../utils/testServer');

//@context Describe the test specifying the test scope and passing a callback function
describe('routes - movies', () => {
  //@o To test we need to get the route
  const route = proxyquire('../routes/movies.js', {
    //@context As the file with our routes has a dependency of our real services and we don't want to use them.
    //@o with proxyquire the inclusion of this service will be replaced with a mock
    '../services/movies.js': MoviesServiceMock
  });

  //@context Create a request with the proxy route
  //@o Only passing this route to the server makes it specific for this route test.
  const request = testServer(route);

  //@context Write the description of the test
  //@o Describing what should respond and passing a callback with the assert to test
  describe('GET /movies', () => {

    //@context In this case testing the get the data
    it('Should respond with a 200 status', (done) => {
      //@o request the get to the api and passing done to finish the test
      request.get('/api/movies').expect(200, done);
    });

    //@context In this case testing get the list of movies
    it('Should respond with the list of movies', (done) => {
      //@o Because we want to test if receive data the way we need it.
      //@o End the request with the callback with the assert requested
      request.get('/api/movies').end((err, res) => {
        //@o deepStrictEqual will compare the received data with our assert
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });

        //@o Always pass the done callback to let know the test when to end.
        done();
      })
    });

  });

  describe('GET /movies/:movieId', () => {

    const movieId = 'c0b966e1-1896-49ae-94bc-b0f2b2eb0f76';

    it('Should respond with a 200 status', (done) => {
      request.get('/api/movies/' + movieId).expect(200, done);
    });

    it('Should respond with the retrieved movie', (done) => {
      request.get('/api/movies/' + movieId).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrieved'
        });

        done();
      });
    });
  });

  describe('POST /movies', () => {

    it('Should respond with a 201 status', (done) => {
      request.post('/api/movies/').expect(201, done);
    });

    it('Should respond with the created movie id', (done) => {
      request.post('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie created'
        });

        done();
      });
    });
  });

  describe('PUT /movies/:movieId', () => {

    const movieId = 'c0b966e1-1896-49ae-94bc-b0f2b2eb0f76';

    it('Should respond with a 200 status', (done) => {
      request.put('/api/movies/' + movieId).expect(200, done);
    });

    it('Should respond with the updated movie', (done) => {
      request.put('/api/movies/' + movieId).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie updated'
        });

        done();
      });
    });
  });

  describe('PATCH /movies/:movieId', () => {

    const movieId = 'c0b966e1-1896-49ae-94bc-b0f2b2eb0f76';

    it('Should respond with a 200 status', (done) => {
      request.patch('/api/movies/' + movieId).expect(200, done);
    });

    it('Should respond with the movie param patched', (done) => {
      request.patch('/api/movies/' + movieId).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie param patched'
        });

        done();
      });
    });
  });

  describe('DELETE /movies/:movieId', () => {

    const movieId = 'c0b966e1-1896-49ae-94bc-b0f2b2eb0f76';

    it('Should respond with a 200 status', (done) => {
      request.delete('/api/movies/' + movieId).expect(200, done);
    });

    it('Should respond with the deleted movie', (done) => {
      request.delete('/api/movies/' + movieId).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie deleted'
        });

        done();
      });
    });
  });

});

/**
 * @context Mocha will help to run the test. Creating a script on the package calling it.
 * @test "test": "mocha --exit"
 * @o This way mocha will find the test folder and run all the files that it contains.
 * ##-----
 * @context To run a test we only need to call it in the terminal with
 * @test %>npm run test
**/