const { decodeCookie } = require('../../../utils/format');
const cache = require('../../../cache');
const { updateAccessToken } = require('../../services/spotifyService');
const authController = require('../../controllers/authController');
const ServerError = require('../../ServerError');
const { catchAsyncError } = require('../middleware/errorMiddleware');

const validateCookie = catchAsyncError(async (req, res, next) => {
  console.log('🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 ');
  console.log('COOKIE VALIDATION STARTING');
  if (!req.headers.cookie) return next();
  const decodedCookie = await decodeCookie(req.headers.cookie);
  res.locals.spotifyID = decodedCookie && decodedCookie.spotifyID;
  console.log('SPOTIFYID ', res.locals.spotifyID);
  next();
});

const requiresLogin = (req, res, next) => {
  console.log('✋************************✋');
  console.log('requiresLogin MIDDLEWARE HIT ');
  console.log('✋*************************✋');

  const { spotifyID = null, accessToken = null } = res.locals;
  console.log('RES.LOCALS IN requiresLogin MIDDLEWARE', res.locals);
  if (!spotifyID || !accessToken) {
    console.log('🚫 🚫 🚫 ACCESS DENIED -- REROUTING 🚫 🚫 🚫');
    throw new ServerError(req.path, 401, `Not Authorized`);
  } else {
    next();
  }
};

const updateSpotifyToken = catchAsyncError(async (req, res, next) => {
  console.log('♻~~~~~~~~~~~~~~~~~~~~~~~~~~♻');
  console.log('UPDATING SPOTIFY TOKEN START');
  const { spotifyID = null } = res.locals;
  if (!spotifyID) return next();
  const cachedUser = cache.get(spotifyID);
  const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
  console.log(`TOKEN EXPIRED: ${tokenExpired}, ${Date.now()}`, cachedUser.accessTokenExpiration);

  if (tokenExpired) {
    let newTokens;
    try {
      newTokens = await updateAccessToken(cachedUser.refreshToken);
    } catch (err) {
      return next(err);
    }
    const { accessToken, accessTokenExpiration } = newTokens;
    const updatedUser = cache.set(spotifyID, {
      ...cachedUser,
      accessToken,
      accessTokenExpiration
    });
    res.locals.accessToken = accessToken;
    authController.editUserInfo(updatedUser);
  } else {
    res.locals.accessToken = cachedUser.accessToken;
  }
  console.log('UPDATING SPOTIFY TOKEN END');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~`');
  console.log('PATH:', req.path);
  return next();
});

module.exports = {
  validateCookie,
  updateSpotifyToken,
  requiresLogin
};
