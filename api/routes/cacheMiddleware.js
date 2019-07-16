const router = require('express').Router();
const authController = require('../controllers/authController');
const cache = require('../../cache');
const { decodeCookie, getTokens } = require('../../utils/fetch');

router.use('/', async (req, res, next) => {
  /******************************************************
   * MIDDLEWARE RESPONSIBILITIES
   * - Bring update user recency in cache.
   * - If user not in cache, bring into cache from database
   * - Update access token if expired
   *
   * **************************************************
   */
  //CHECK IF USER HAS A COOKIE
  if (!req.cookies || !req.cookies.userInfo) return next();

  console.log('************MAIN MIDDLEWARE HIT');
  try {
    const { spotifyID } = await decodeCookie(req.cookies);
    console.log('SPOTIFY ID: ' + spotifyID);
    //IF VALID JWT, CHECK FOR USER IN CACHE
    let cachedUser = cache.get(spotifyID);
    if (!cachedUser) {
      //IF USER IS NOT IN CACHE, RETRIEVE USER FROM DB AND UPDATE CACHE
      try {
        const userFromDatabase = await authController.getUser(spotifyID);
        cache.set(spotifyID, userFromDatabase);
        cachedUser = cache.get(spotifyID);
      } catch (err) {
        console.error('MIDDLEWARE-getuser', err);
        throw err;
      }
    }

    console.log('********CACHED USER:', cachedUser);
    //CHECK EXPIRATION ON ACCESS TOKEN.
    const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
    console.log('TOKEN EXPIRED: ' + tokenExpired);
    if (tokenExpired) {
      //REFRESH ACCESS TOKEN
      const params = {
        grant_type: 'refresh_token',
        refresh_token: cachedUser.refreshToken,
      };
      const { access_token } = await getTokens(params);
      const updatedCachedUser = {
        ...cachedUser,
        accessTokenExpiration: Date.now() + 1000 * 60 * 55,
        accessToken: access_token,
        refreshToken: cachedUser.refreshToken,
      };
      cache.set(spotifyID, updatedCachedUser);
      authController.editUserInfo(updatedCachedUser);
    }

    // CHECK FOR USER SETTING FOR AUTO UPDATE LIBRARY. IF AUTO UPDATE SELECTED, CONTINUE
    //FETCH FIRST 50 SONGS FROM SPOTIFY API.

    console.log('PATH:', req.path);
    console.log('******************MAIN MIDDLEWARE ENDING');
    return next();
  } catch (err) {
    console.log('error!', err);
    return next();
  }

  //COMPARE DATE ADDED OF ITEMS IN CACHE VS SPOTIFY API DATA
  // Will also need to consider items that have been deleted from spotify and exist in cache*
});

module.exports = router;
