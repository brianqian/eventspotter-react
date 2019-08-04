const { decodeCookie } = require('../../../utils/format');
const cache = require('../../../cache');
const { updateAccessToken } = require('../../services/spotifyService');
const authController = require('../../controllers/authController');

const isLoggedIn = async (req, res, next) => {
  const decodedCookie = await decodeCookie(req.headers.cookie);
  res.locals.spotifyID = decodedCookie && decodedCookie.spotifyID;
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');
  console.log('HEADERS SENT: ', res.headersSent);
  res.setHeader('X-test', '12342342342');
  console.log('HEADERS SENT: ', res.headersSent);
  console.log('HEADERS;', req.headers);

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');

  next();
};

const requiresLogin = (req, res, next) => {
  const { spotifyID = null, accessToken = null } = res.locals;
  if (!spotifyID || !accessToken) {
    res.status(401);
    res.clearCookie('userInfo');
  }
    next();

};

const updateSpotifyToken = async (req, res, next) => {
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
  console.log('PATH:', req.path);
  console.log('******************MAIN MIDDLEWARE ENDING');
  return next();
};

module.exports = {
  isLoggedIn,
  updateSpotifyToken,
  requiresLogin
};
