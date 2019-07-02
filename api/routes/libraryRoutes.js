const router = require('express').Router();
const fetch = require('isomorphic-unfetch');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const cache = require('../../cache');
const { spotifyFetch, fetchCookie } = require('../../utils/fetch');
const authController = require('../controllers/authController');
const libraryController = require('../controllers/libraryController');
// require('dotenv').config();

router.route('/all').get(async (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 50;
  const query = querystring.stringify({ offset, limit });
  const encodedCookie = fetchCookie(req.headers.cookie, 'userInfo');
  const {
    userInfo,
    userInfo: { accessToken },
  } = await jwt.verify(encodedCookie, process.env.JWT_SECRET_KEY);

  const library = await spotifyFetch(`/me/tracks?${query}`, accessToken);
  res.json(library);

  // if (!cachedUserLibrary) {
  //   //retrieve user library from database

  //   //and/or retrieve library from spotify API
  //   let library = spotifyFetch();
  // }
});

router.route('/top').get((req, res) => {
  const token = req.query.jwt;
  const { spotifyID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
});

module.exports = router;
