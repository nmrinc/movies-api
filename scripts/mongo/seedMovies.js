const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const { moviesMock } = require('../../utils/mocks/movies');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async movie => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} movies have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedMovies();

/**
 *@context This script insert mock movies into the mongo DB
 *--
 *@action To run this process, you have to run this line in terminal
 *@insight This project runs a different DB for production and development environments. So it's necessary to specify the env var for each.
 *--
 *@o Development
 *@test >DEBUG=app:* NODE_ENV=dev node scripts/mongo/seedMovies.js
 *--
 *@o Production
 *@test >DEBUG=app:* NODE_ENV=production node scripts/mongo/seedMovies.js
*/
