const fetch = require('isomorphic-unfetch');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { spotifyFetch, getTokens } = require('../../utils');
const authController = require('../controllers/authController');
const cache = require('../../cache');

router
  .route('/login')
  .get((req, res) => {
    const redirect_uri = encodeURIComponent('http://localhost:3000/auth/spotifyLogin');
    const scopes = encodeURIComponent('user-read-private user-read-email user-library-read');
    res.redirect(
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${
        process.env.SPOTIFY_CLIENT_ID
      }&scope=${scopes}&redirect_uri=${redirect_uri}`
    );
  })
  .post(async (req, res) => {
    /*******************
     * HANDLE JWT LOGIN
     *******************
     */
    const encodedToken = req.cookies && req.cookies.userInfo;
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);
    const { spotifyID } = decodedToken;

    if (cache.get(spotifyID)) res.json(cache.get(spotifyID));
    const userData = await authController.getUser(spotifyID);
    //UPDATE CACHE WITH INFO;
    console.log('IN AUTH ROUTE, getting user Info:', userData);

    res.json(userData);
  });

router.route('/spotifyLogin').get(async (req, res) => {
  /***********************************
   * ACQUIRE AUTH CODE FROM SPOTIFY
   **********************************
   */
  console.log('***************NOW IN /spotifyLogin ROUTE');
  const redirect_uri = 'http://localhost:3000/auth/spotifyLogin';
  const code = req.query.code || null;
  const params = {
    code,
    redirect_uri,
    grant_type: 'authorization_code',
  };
  console.log('***************PARAMS: ', params);
  const resp = await getTokens(params);

  if (resp.error) {
    if (resp.error_description === 'Authorization code expired') {
      console.log('Authorization code expired, refreshing token...');
      const { refreshToken } = await authController.getToken();
      res.send({ error: 'Authorization code expired, refreshing token...' });
      res.redirect(`/refresh_token/${refreshToken}`);
    } else if (resp.error_description === 'Invalid authorization code') {
      console.log('INVALID AUTH CODE');
    }
    res.send({ error: res.error_description });
  }
  /********************************
   * GET PROFILE DATA FROM SPOTIFY
   *********************************
   */
  const { refresh_token, access_token } = resp;
  const profile = await spotifyFetch('/me', access_token);

  //FORMATTING DATA FOR USER TOKEN
  const userInfo = {
    spotifyID: profile.id,
    displayName: profile.display_name,
    imgURL: profile.images[0].url,
  };

  const encodedToken = await jwt.sign({ userInfo }, process.env.JWT_SECRET_KEY, {
    expiresIn: '999d',
  });

  //FORMATTING DATA FOR DB ENTRY
  userInfo.refreshToken = refresh_token;
  userInfo.accessTokenExpiration = Date.now() + 1000 * 60 * 45;

  //CREATE NEW USER OR UPDATE EXISTING USER
  try {
    const user = await authController.getUser(profile.id);
    console.log('**** BACK IN AUTH ROUTES-- GET USER:', user);
    if (!user) {
      console.log('Creating new user: ' + JSON.stringify(userInfo));
      authController.createUser(userInfo);
    } else if (user.usersFound == 1) {
      authController.editUserInfo(userInfo);
    }
  } catch (err) {
    console.log(err);
    console.log(user.error);
  }

  //UPDATE CACHE WITH USER INFO
  console.log('UPDATING CACHE...');
  cache.set(profile.id, { ...userInfo, refreshToken: refresh_token });
  const test1 = cache.get(profile.id);
  console.log(test1);

  // save encoded token to cookie or localstorage?
  res.cookie('userInfo', encodedToken, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  res.redirect('http://localhost:3000/library');
});

router.route('/logout').get((req, res) => {});
router.route('/refresh_token').get((req, res) => {
  const refreshToken = cache.get();
});
router.route('/test').get(async (req, res) => {});

module.exports = router;
