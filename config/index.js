//@o We have to require dotenv and it's config param
//require('dotenv').config();
//@o To solve the multi mongo db challenge change the package to dotenv-flow
require('dotenv-flow').config();


const config = {
  //@o With this we'll know, through the process, if it's on development.
  dev: process.env.NODE_ENV !== 'production',

  //@o A good practice it's assign the port to an environment variable. So you can call it anywhere
  //@o And if it has to be modified the only place to change it's on this file.
  port: process.env.PORT || 3000,

  //@o Here we add the environment variables for the MONGODB connection
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  //authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
};

module.exports = { config };

/**
 * @insight It's a good practice to set an external config file so later it's easier if there's any change
**/