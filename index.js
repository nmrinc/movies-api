//@concept SIMPLE EXPRESS SERVER

//@o First we require the express module
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

/**
  * @context It's recommended to change all console.log to debug express functionality.
  * @context So when we sun a debug show us te differences against different namespaces
  * ---
  * @o Require debug and set a namespace
*/
const debug = require('debug')('app:server');

//@o Then we instance the app as express()
const app = express();

//@o Require the config file to consume it.
const { config } = require('./config/index');

//@o Require the routes files
const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

//@o Add the errorHandlers Middleware.
const {
  logErrors,
  wrapError,
  errorHandler
} = require('./utils/middleware/errorHandlers');

//@o Require the not found middleware
const notFoundHandler = require('./utils/middleware/notfoundHandler');

//@o Add a Body Parser Middleware, where express will now interpret json data and parse it.
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());


//@o As it's a function we have to execute it and pass the express app.
//@context ROUTES
authApi(app);
moviesApi(app);
userMoviesApi(app);

//@context Catch 404
app.use(notFoundHandler);

//@o Use the error handler middleware
//@insight Error Middleware always has to be called at the end of the routes.
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

//@o Finally we'll indicate the port where the server will listen. In this case served from the config file.
app.listen(config.port, () => {
  debug(`Listening http://localhost:${config.port}`);
});