const router = require('express').Router();
const authController = require('../../controllers/authController');
const cache = require('../../../cache');
const format = require('../../../utils/format');

router.use('/', async (req, res, next) => {
  /** ****************************************************
   * MIDDLEWARE RESPONSIBILITIES
   * - Bring update user recency in cache.
   * - If user not in cache, bring into cache from database
   *  -Get user info from authController
   *
   * **************************************************
   */

  console.log('************MAIN MIDDLEWARE HIT');

  /** *********************************************
   * UPDATE CACHE FROM DATABASE IF USER NOT IN CACHE
   ************************************************ */

  const { spotifyID = null } = res.locals;
  if (!spotifyID) return next();
  // IF VALID JWT, CHECK FOR USER IN CACHE
  let cachedUser = cache.get(spotifyID);
  if (!cachedUser) {
    // IF USER IS NOT IN CACHE, RETRIEVE USER FROM DB AND UPDATE CACHE
    try {
      const userFromDatabase = await authController.getUserByID(spotifyID);
      cachedUser = cache.set(spotifyID, format.dbProfileToCache(userFromDatabase));
    } catch (err) {
      console.error('MIDDLEWARE-getuser', err);
      throw err;
    }
  }
  return next();
});

module.exports = router;
