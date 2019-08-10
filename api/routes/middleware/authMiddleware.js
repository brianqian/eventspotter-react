const { decodeCookie } = require('../../../utils/format');
const cache = require('../../../cache');
const { updateAccessToken } = require('../../services/spotifyService');
const authController = require('../../controllers/authController');

const validateCookie = async (req, res, next) => {
  console.log('*************************');
  console.log('COOKIE VALIDATION STARTING ');
  console.log('*************************');
  if (!req.headers.cookie) return next();
  const decodedCookie = await decodeCookie(req.headers.cookie);
  res.locals.spotifyID = decodedCookie && decodedCookie.spotifyID;
  console.log('*************************');
  console.log('COOKIE VALDIATION - SPOTIFYID ', res.locals.spotifyID);
  console.log('*************************');
  next();
};

const requiresLogin = (req, res, next) => {
  console.log('*************************');
  console.log('requiresLogin MIDDLEWARE HIT');
  console.log('*************************');

  const { spotifyID = null, accessToken = null } = res.locals;
  console.log('RES.LOCALS IN REQ LOGIN', res.locals);
  if (!spotifyID || !accessToken) {
    console.log('ACCESS DENIED REROUTING');
    res.status(401);
    res.clearCookie('userInfo');
    res.redirect(`/error?code=401`);
  } else {
    next();
  }
};

const updateSpotifyToken = async (req, res, next) => {
  const { spotifyID = null } = res.locals;
  if (!spotifyID) return next();
  const cachedUser = cache.get(spotifyID);
  const tokenExpired = Date.now() > cachedUser.accessTokenExpiration;
  console.log(`TOKEN EXPIRED: ${tokenExpired}, ${Date.now()}`, cachedUser.accessTokenExpiration);
  console.log('*************************');
  console.log('UPDATING SPOTIFY TOKEN START');
  console.log('*************************');
  if (tokenExpired) {
    let newTokens;
    try {
      newTokens = await updateAccessToken(cachedUser.refreshToken);
    } catch (err) {
      console.error('error cache middleware- get token', err);
      return next();
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
  console.log('*************************');
  console.log('UPDATING SPOTIFY TOKEN END');
  console.log('*************************');
  console.log('PATH:', req.path);
  return next();
};

module.exports = {
  validateCookie,
  updateSpotifyToken,
  requiresLogin
};
