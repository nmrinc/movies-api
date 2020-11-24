/**
 * @concept SUPERTEST
 * @o HTTP assertions made easy via superagent.
 * @o The motivation with this module is to provide a high-level abstraction for testing HTTP, while still
 * @o allowing you to drop down to the lower-level API provided by superagent.
**/

//@o require express and supertest
const express = require('express');
const supertest = require('supertest');

/**
 * @context Tests always have to be run on a test server
 * @o Only creates a simple server with less functionality
 * @o Passing a mock express app to supertest.
**/
const testServer = (route) => {
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testServer;