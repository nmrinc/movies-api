/**
 * @concept API keys
 * @context
 * Let, from an API Key Token, get the user scopes required when sign in to firm the JWT.
*/

//@action Require the Mongo Lib.
const MongoLib = require('../lib/mongo');

//@action Create the ApiKeysService class
class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  //@action Generate a query where from the token retrieve the api key.
  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeysService;