/**
 * @concept
 * TDD test driven development
 * @context First create the test and then the functionality.
 * @o It's recommended when the business logic it's clear.
 * @o Also when there's a bug and want to ensure that this won't happen again
*/

//@context Want to automate the response message when the routes deploy an action
const buildMessage = (entity, action) => {

  if (action === 'list') {
    //@o In this case we need to add the plural to the entity and the 'ed' to the action.
    return `${entity}s ${action}ed`;
  }

  //@o With template literals we concat the entity and the action, but adding a 'd' to turn it to past tense.
  return `${entity} ${action}d`;
}

module.exports = buildMessage;