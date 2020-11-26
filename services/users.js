const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  //@context with this method, search on mongo DB collection by a given email and return a user.
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  //@context Method that creates a user.
  async createUser({ user }) {
    //@action destructure info from given user.
    const {name, email, password} = user;
    //@action create a hashed password to insert into the db in a secure way.
    const hashedPassword = await bcrypt.hash(password, 10);

    //@action With the mongo lib action create, insert the data into the collection.
    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });

    //@action Return the id from the new user entry.
    return createUserId;
  }
}

module.exports = UsersService;
