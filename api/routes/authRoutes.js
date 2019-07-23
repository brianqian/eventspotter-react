const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { spotifyFetch, getTokens } = require('../../utils/fetch');
const authController = require('../controllers/authController');
const cache = require('../../cache');
const format = require('../../utils/format');

router.route('/login').get((req, res) => {
  const redirectURI = encodeURIComponent('http://localhost:3000/api/auth/spotifyLogin');
  const scopes = encodeURIComponent('user-read-private user-read-email user-library-read');
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.SPOTIFY_CLIENT_ID
    }&scope=${scopes}&redirect_uri=${redirectURI}`
  );
});

router.route('/spotifyLogin').get(async (req, res) => {
  /** *********************************
   * ACQUIRE AUTH CODE FROM SPOTIFY
   **********************************
   */
  console.log('***************NOW IN /spotifyLogin ROUTE');
  const redirectURI = 'http://localhost:3000/api/auth/spotifyLogin';
  const code = req.query.code || null;
  const params = {
    code,
    redirect_uri: redirectURI,
    grant_type: 'authorization_code'
  };
  const userTokens = await getTokens(params);
  //* TODO: total songs info needs to be retrieved from database
  // FETCH TOKENS AND PROFILE DATA FROM SPOTIFY************

  const { refresh_token: refreshToken, access_token: accessToken } = userTokens;
  console.log('TOKENS: ', accessToken && refreshToken && 'tokens found');
  const profile = await spotifyFetch('https://api.spotify.com/v1/me', accessToken);
  // FORMATTING DATA FOR USER TOKEN*****************
  const userInfo = {
    spotifyID: profile.id,
    displayName: profile.display_name,
    imgURL: profile.images[0].url
  };

  // SAVE ENCODED TOKEN TO COOKIE ***********
  const encodedToken = await jwt.sign({ userInfo }, process.env.JWT_SECRET_KEY, {
    expiresIn: '999d'
  });
  res.cookie('userInfo', encodedToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  // FORMATTING DATA FOR DB ENTRY/CACHE***********
  userInfo.accessToken = accessToken;
  userInfo.refreshToken = refreshToken;
  userInfo.accessTokenExpiration = Date.now() + 1000 * 60 * 55;
  // CREATE NEW USER OR UPDATE EXISTING USER********
  try {
    const user = format.dbProfileToCache(await authController.getUserByID(profile.id));
    console.log('USER RETURNED FROM GETUSER:', user);
    if (!user) {
      console.log('Creating new user: ', userInfo);
      authController.createUser(userInfo);
      cache.set(profile.id, userInfo);
    } else {
      console.log('EDITING EXISTINg user', userInfo);
      authController.editUserInfo(userInfo);
      // Middleware sets cache
    }
  } catch (err) {
    console.log(err);
  }

  console.log('REDIRECTING TO LIBRARY FROM AUTH');
  res.redirect('http://localhost:3000/library');
});

router.route('/logout').get((req, res) => {
  res.clearCookie('userInfo');
  res.redirect('/');
});

// router.route('/test').get(async (req, res) => {});

module.exports = router;
