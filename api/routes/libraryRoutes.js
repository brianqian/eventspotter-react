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
  console.log(`**********ROUTING TO /ALL**********`);
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 50;
  const query = querystring.stringify({ offset, limit });
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  const cachedUser = cache.get(spotifyID);
  const { library: cachedLibrary } = cachedUser;
  if (cachedLibrary) res.json({ data: cachedLibrary });

  const spotifyLibrary = await spotifyFetch(
    `https://api.spotify.com/v1/me/tracks?${query}`,
    accessToken
  );
  console.log(spotifyLibrary);
  let data = [...spotifyLibrary.items];
  for (let i = 0; i < 2; i++) {
    spotifyLibrary = await spotifyFetch(spotifyLibrary.next, accessToken);
    data.push(...spotifyLibrary.items);
  }

  console.log('***********EXITING LIBRARY WITH DATA LENGTH: ' + data.length);
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
