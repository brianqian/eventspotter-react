const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { spotifyFetch, getTokens, decodeCookie } = require('../../utils/fetch');
const authController = require('../controllers/authController');
const cache = require('../../cache');

router.route('/login').get((req, res) => {
  const redirect_uri = encodeURIComponent('http://localhost:3000/api/auth/spotifyLogin');
  const scopes = encodeURIComponent('user-read-private user-read-email user-library-read');
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${
      process.env.SPOTIFY_CLIENT_ID
    }&scope=${scopes}&redirect_uri=${redirect_uri}`
  );
});

router.route('/spotifyLogin').get(async (req, res) => {
  /***********************************
   * ACQUIRE AUTH CODE FROM SPOTIFY
   **********************************
   */
  console.log('***************NOW IN /spotifyLogin ROUTE');
  const redirect_uri = 'http://localhost:3000/api/auth/spotifyLogin';
  const code = req.query.code || null;
  const params = {
    code,
    redirect_uri,
    grant_type: 'authorization_code',
  };
  const userTokens = await getTokens(params);
  /********************************
   * GET PROFILE DATA FROM SPOTIFY
   *********************************
   */
  const { refresh_token, access_token } = userTokens;
  const profile = await spotifyFetch('https://api.spotify.com/v1/me', access_token);

  //FORMATTING DATA FOR USER TOKEN
  const userInfo = {
    spotifyID: profile.id,
    displayName: profile.display_name,
    imgURL: profile.images[0].url,
  };

  const encodedToken = await jwt.sign({ userInfo }, process.env.JWT_SECRET_KEY, {
    expiresIn: '999d',
  });

  //FORMATTING DATA FOR DB ENTRY/CACHE
  userInfo.refreshToken = refresh_token;
  userInfo.accessTokenExpiration = Date.now() + 1000 * 60 * 55;
  userInfo.accessToken = access_token;
  //CREATE NEW USER OR UPDATE EXISTING USER
  try {
    const user = await authController.getUser(profile.id);
    console.log('USER RETURNED FROM GETUSER:', user);
    if (!user || user.usersFound === 0) {
      console.log('Creating new user: ', userInfo);
      authController.createUser(userInfo);
    } else if (user.usersFound === 1) {
      console.log('EDITING EXISTINg user', userInfo);
      authController.editUserInfo(userInfo);
    }
  } catch (err) {
    console.log(err);
    console.log(user.error);
  }

  //UPDATE CACHE WITH USER INFO
  console.log('UPDATING CACHE...');
  cache.set(profile.id, { ...userInfo, refreshToken: refresh_token, accessToken: access_token });

  // save encoded token to cookie or localstorage?
  res.cookie('userInfo', encodedToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  console.log('REDIRECTING TO LIBRARY FROM AUTH');
  res.redirect('http://localhost:3000/library');
});

router.route('/logout').get((req, res) => {
  res.clearCookie('userInfo');
  res.redirect('/');
});

router.route('/test').get(async (req, res) => {});

module.exports = router;
