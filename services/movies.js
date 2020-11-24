/**
 * @concept SERVICES
 * @o Takes the responsibility of serve the data.
 * @o Contains all the business logics.
**/

//@o Require the mongo library
const MongoLib = require('../lib/mongo');

//@o Create a class where the methods will be implemented
class MoviesService {
  //@o create the constructor and instance the collection and the library
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  //@o Return the mongoDB instance and call the method getAll
  async getMovies({ tags }) {
    /**
     * @o Create the query with the params from the URL
     * @o First determine if the params exists and then find the params inside the data with $in
     * @o In this case we receive the tags of the movies
    **/
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);

    //@o Return all the data. In this case the res
    //@o In case there's no data, returns an empty array to avoid conflicts
    return movies || [];
  }

  //@o With the method get pass the collection and the id from the url params
  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);

    //@o Return a the data. In this case the res
    //@o In case there's no data, returns an empty object to avoid conflicts
    return movie || {};
  }

  //@o To create pass the data with the method create
  async createMovie({ movie }) {
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId;
  }

  //@o Pass the id and the data. But define as default a blank object so if there's no data avoid a conflict
  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
    return updatedMovieId;
  }

  async patchMovieParam({ movieId, movie }) {
    const patchedMovieParam = await this.mongoDB.update(this.collection, movieId, movie);
    return patchedMovieParam;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }

}

module.exports = MoviesService;

