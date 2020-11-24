/**
 * @concept CACHE RESPONSE
 * @context
 * As working on dev environment, sometimes we receive the same result even when we change something in code.
 * @context
 * With this functionality the cache will refresh at a given time.
*/

//@o require config
const { config } = require('./../config');

//@o Condition if working on dev environment change the age of cache.
const cacheResponse = (res, seconds) => {
  if (!config.dev) {
    //@o Set a header to change the cache age.
    res.set("Cache-Control", `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;

/**
 * @insight
 * Not every route have to have cache. Only the ones that require resources.
*/