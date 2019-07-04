const router = require('express').Router();
const fetch = require('isomorphic-unfetch');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const cache = require('../../cache');
const { spotifyFetch, decodeCookie } = require('../../utils/fetch');
const authController = require('../controllers/authController');
const libraryController = require('../controllers/libraryController');
// require('dotenv').config();

router.route('/all').get(async (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 50;
  const query = querystring.stringify({ offset, limit });
  const { accessToken, spotifyID } = await decodeCookie(req.headers.cookie);

  let library = cache.get(spotifyID).library;
  if (library) {
    res.json({ data: library });
  } else {
  }

  library = await spotifyFetch(`https://api.spotify.com/v1/me/tracks?${query}`, accessToken);
  let data = [...library.items];
  for (let i = 0; i < 2; i++) {
    library = await spotifyFetch(library.next, accessToken);
    console.log('library data object from lib routes', data.length);
    data.push(...library.items);
  }
  res.json({ data });

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
