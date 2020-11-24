//@concept MONGO LIB MOCK
//@context This will be used to test the services of the app that connect to MongoDB

/**
 * @o require Sinon
 * @concept
 * SINON : Standalone test spies, stubs and mocks for JavaScript.
*/
const sinon = require('sinon');

//@o require the mocks
const { moviesMock, filteredMoviesMock, retrieveMovieMock } = require('./movies');

/**
 * @concept
 * STUB : A small program routine that substitutes for a longer program which is possible to be loaded later or that is remotely located.
 * @context Write the stub that will mock MongoDB functionality
*/
const getAllStub = sinon.stub();
//@o Can pass arguments to resolve with an specific response
//@context In this case, when it's called with the movies library, will resolve with the mock
getAllStub.withArgs('movies').resolves(moviesMock);

//@o Create a query as the service could create it to obtain an specific data
const tagQuery = { tags: { $in: ['Drama'] } };
//@o Pass it along with the collection to the stub so it can return the data of this query
//@context In this case will use the mock request functionality created on the data mock
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getStub = sinon.stub();
const movieId = 'c0b966e1-1896-49ae-94bc-b0f2b2eb0f76';
getStub.withArgs('movies').resolves(retrieveMovieMock(movieId));

//@o Create a stub for the create functionality, that will return the id of the 1st object on the mock data
const createStub = sinon.stub().resolves(moviesMock[0].id);
const updateStub = sinon.stub().resolves(moviesMock[0].id);
const deleteStub = sinon.stub().resolves(moviesMock[0].id);

//@o Create the class with the Mongo library mock
class MongoLibMock {
  //@context Passing the MongoLib methods returning the mock stubs

  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id) {
    return getStub(collection, id);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, data) {
    return updateStub(collection, data);
  }

  patch(collection, data) {
    return updateStub(collection, data);
  }

  delete(collection, data) {
    return deleteStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
}