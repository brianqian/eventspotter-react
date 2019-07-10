const router = require('express').Router();
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const cache = require('../../cache');
const { spotifyFetch, decodeCookie } = require('../../utils/fetch');
const spotifyController = require('../controllers/spotifyController');
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
  // if (cachedUser)
  let cachedLibrary;
  if (cachedUser.library) {
    cachedLibrary = cachedUser.library;
  } else {
    const library = await spotifyController.getAllSongs(accessToken);
    console.log('ALL// FROM SPOTIFYCONTROLLER', library);
  }

  //LIBRARY IS  CACHEDUSER.LIBRARY

  //IF CACHEDUSER.LIBRARY DOESN'T EXIST, SET CAHCED LIBRARY FROM SPOTIFY FETCH

  //LIBRARY IS CACHEDUSER.LIBRARY;

  let spotifyLibrary = await spotifyFetch(
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
  res.json({ data: cachedLibrary });
});

router.route('/test').get(async (req, res) => {
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  let cachedLibrary;
  if (cachedUser.library) {
    cachedLibrary = cachedUser.library;
  } else {
    cachedLibrary = await spotifyController.getAllSongs(accessToken);
  }
  console.log(cachedLibrary);
});

module.exports = router;
