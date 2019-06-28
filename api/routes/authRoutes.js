const fetch = require('isomorphic-unfetch');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { spotifyFetch, getTokens } = require('../utils/fetch');
const authController = require('../controllers/authController');
const cache = require('../cache');

router
  .route('/login')
  .post(async (req, res) => {
    /*******************
     * HANDLE JWT LOGIN
     *******************
     */
    const encodedToken = req.cookie && req.cookie.userInfo;
    const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);
    const { spotifyID } = decodedToken;

    if (cache[spotifyID]) res.json(cache[spotifyID]);
    const userData = await authController.getUser(spotifyID);
    //UPDATE CACHE WITH INFO;

    res.json(userData);
  })
  .get((req, res) => {
    const redirect_uri = encodeURIComponent('http://localhost:3001/auth/spotifyLogin');
    const scopes = encodeURIComponent('user-read-private user-read-email user-library-read');
    res.redirect(`https://accounts.spotify.com/authorize?
    response_type=code
    &client_id=${process.env.SPOTIFY_CLIENT_ID}
    &scope=${scopes}
    &redirect_uri=${redirect_uri}`);
  });

router.route('/spotifyLogin').get(async (req, res) => {
  /***********************************
   * ACQUIRE AUTH CODE FROM SPOTIFY
   **********************************
   */

  const code = req.query.code || null;
  const params = {
    code,
    redirect_uri,
    // state,
    grant_type: 'authorization_code',
  };
  const resp = await getTokens(params);

  if (resp.error) {
    if (resp.error_description === 'Authorization code expired') {
      console.log('Authorization code expired, refreshing token...');
      const { refreshToken } = await authController.getToken;
      res.send({ error: 'Authorization code expired, refreshing token...' });
      res.redirect(`/refresh_token/${refreshToken}`);
    }
    res.send({ error: res.error_description });
  }
  /********************************
   * GET PROFILE DATA FROM SPOTIFY
   *********************************
   */
  const profile = await spotifyFetch('/me', access_token);

  //FORMATTING DATA FOR USER TOKEN
  const userInfo = {
    spotifyID: profile.id,
    displayName: profile.display_name,
    imgURL: images[0].url,
  };
  const encodedToken = await jwt.sign({ userInfo }, process.env.JWT_SECRET_KEY, {
    expiresIn: '999d',
  });

  //FORMATTING DATA FOR DB ENTRY
  const { refresh_token, access_token } = resp;
  userInfo.refreshToken = refresh_token;
  userInfo.accessTokenExpiration = Date.now() + 1000 * 60 * 45;

  //CREATE NEW USER OR UPDATE EXISTING USER
  const user = await authController.getUser(profile.id);
  if (!user.usersFound) {
    console.log('Creating new user: ' + userInfo);
    authController.createUser(userInfo);
  } else if (user.usersFound === 1) {
    authController.editUserInfo(userInfo);
  } else {
    res.json(user.error);
  }
  //UPDATE CACHE WITH USER INFO
  cache[profile.id] = { ...userInfo, refreshToken: refresh_token };

  // save encoded token to cookie or localstorage?
  res.cookie('userInfo', userInfo, { maxAge: 1000 * 60 * 60 * 24 * 365 });
});

router.route('/logout').get((req, res) => {});

module.exports = router;
