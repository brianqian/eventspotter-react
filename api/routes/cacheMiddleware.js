const router = require('express').Router();
const authController = require('../controllers/authController');
const cache = require('../../cache');
const { decodeCookie } = require('../../utils/fetch');

router.use('/', async (req, res, next) => {
  if (!req.cookies || !req.cookies.userInfo) return next();
  //CHECK FOR JWT IN COOKIES
  console.log('************MAIN MIDDLEWARE HIT');
  try {
    const { spotifyID } = await decodeCookie(req.cookies);
    console.log('SPOTIFY ID: ' + spotifyID);
    //IF VALID JWT, CHECK FOR USER IN CACHE
    let cachedUser = cache.get(spotifyID);
    if (!cachedUser) {
      try {
        const userFromDatabase = await authController.getUser(spotifyID);
        cache.set(spotifyID, userFromDatabase);
        cachedUser = cache.get(spotifyID);
      } catch (err) {
        throw err;
      }
      //IF USER IS NOT IN CACHE, RETRIEVE USER FROM DB AND UPDATE CACHE
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
      const tokens = await getTokens(params);
      const updatedCachedUser = {
        ...cachedUser,
        accessTokenExpiration: Date.now() + 1000 * 60 * 55,
        accessToken: tokens.access_token,
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
