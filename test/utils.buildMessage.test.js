//@concept BUILD MESSAGE UTILITY TESTS

//@o Require assert
const assert = require('assert');

//@o Require the functionality
const buildMessage = require('./../utils/buildMessage');

//@o With .only will run only this test suite
//describe.only('utils - buildMessage', () => {
describe('utils - buildMessage', () => {
  describe('When receive an entity and an action', () => {

    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';

      assert.strictEqual(result, expect);
    });

  });

  describe('when receives an entity and action and its a list', () => {
    it('should return the respective message with the entity in plural', () => {
      const result = buildMessage('movie', 'list');
      const expect = 'movies listed';

      assert.strictEqual(result, expect);
    })
  });
});