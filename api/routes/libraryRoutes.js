const router = require('express').Router();
const cache = require('../../cache');
const { decodeCookie } = require('../../utils/fetch');
const spotifyController = require('../controllers/spotifyController');
// require('dotenv').config();

router.route('/all').get(async (req, res) => {
  console.log(`**********ROUTING TO /ALL**********`);
  const { spotifyID } = await decodeCookie(req.headers.cookie);
  console.log(`************SPOTIFY ID: ${spotifyID}`);
  const { accessToken } = cache.get(spotifyID);
  console.log(`************ACCESS TOKEN: ${accessToken}`);
  const cachedUser = cache.get(spotifyID);
  const cachedLibrary =
    (cachedUser && cachedUser.library) || (await spotifyController.getAllSongs(accessToken));

  console.log('***********EXITING LIBRARY WITH DATA LENGTH: ' + cachedLibrary.length);
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
