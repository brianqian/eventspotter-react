const router = require('express').Router();
const authController = require('../controllers/authController');
const spotifyController = require('../controllers/spotifyController');
const cache = require('../../cache');
const { decodeCookie, getTokens } = require('../../utils/fetch');
const format = require('../../utils/format');

router.use('/', async (req, res, next) => {
  /** ****************************************************
   * MIDDLEWARE RESPONSIBILITIES
   * - Bring update user recency in cache.
   * - If user not in cache, bring into cache from database
   *  -Get user info from authController
   *  -Get user library from libraryController
   * - Update access token if expired
   *
   * **************************************************
   */
  // CHECK IF USER HAS A COOKIE
  if (!req.cookies || !req.cookies.userInfo) return next();

  console.log('************MAIN MIDDLEWARE HIT');

  /** *********************************************
   * UPDATE CACHE FROM DATABASE IF USER NOT IN CACHE
   ************************************************ */
  try {
    const { spotifyID } = await decodeCookie(req.cookies);
    console.log(`SPOTIFY ID: ${spotifyID}`);
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

    /** ****************************
     * CHECK AND UPDATE ACCESS TOKEN
     ***************************** */

    const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
    console.log(`TOKEN EXPIRED: ${tokenExpired}, ${Date.now()}`, cachedUser.accessTokenExpiration);
    if (tokenExpired) {
      const newTokens = await spotifyController.updateAccessToken(cachedUser.refreshToken);
      if (!newTokens.accessToken) console.error(newTokens);
      const { accessToken, refreshToken, accessTokenExpiration } = newTokens;
      const updatedUser = cache.set(spotifyID, {
        ...cachedUser,
        accessToken,
        refreshToken,
        accessTokenExpiration
      });
      authController.editUserInfo(updatedUser);
    }

    console.log('PATH:', req.path);
    console.log('******************MAIN MIDDLEWARE ENDING');
    return next();
  } catch (err) {
    console.log('error!', err);
    return next();
  }
});

module.exports = router;
